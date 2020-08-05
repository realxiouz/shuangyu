<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
    <el-row class="page-tools" style="margin-bottom:15px;margin-left:40px">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-bottom: 15px;"
      size="mini"
      border
    >
      <!-- <el-table-column prop="orderNo" label="单号" />
      <el-table-column label="单据日期">
        <template slot-scope="scope">{{ scope.row.orderDate | time("YYYY-MM-DD") }}</template>
      </el-table-column>
      <el-table-column label="单据类型">
        <template slot-scope="scope">{{ formatOrderType(scope.row) }}</template>
      </el-table-column>
      <el-table-column label="明细" width="800">
        <template slot-scope="scope">
          <el-table :data="scope.row.orderDetails" border>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="right" :inline="true" label-width="120px">
                  <div class="detail">
                    <div
                      v-if="props.row.propertyItems.length > 0"
                      v-for="(i, index) in props.row.propertyItems"
                      :key="index"
                    >
                      <el-form-item :label="`${i.name}:`" v-if="!i.hidden">
                        <span>{{ i | typeVal }}</span>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="productCode" label="商品编码" width="200"></el-table-column>
            <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
            <el-table-column prop="skuName" label="属性名称" align="center"></el-table-column>
            <el-table-column prop="price" label="单价" align="center"></el-table-column>
            <el-table-column prop="quantity" label="数量" width="60" />
          </el-table>

          <el-table :data="scope.row.passengers" border style="margin-top:10px;">
            <el-table-column label="乘客类型" width="70">
              <template v-slot="{ row }">
                <el-tag type="primary">{{ ageMap[row.ageType] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" />
            <el-table-column label="电话" prop="phone" width="120" />
            <el-table-column label="证件类型" width="90">
              <template v-slot="{ row }">
                <el-tag type="primary">{{ cardMap[row.idCardType] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="证件号" prop="idCardNo" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="成交金额" />
      <el-table-column prop="receiptAmount" label="实收金额" />
      <el-table-column prop="orderStatus" :formatter="formatOrderStatus" label="确认状态" width="80" />
      <el-table-column
        prop="warehouseStatus"
        :formatter="formatWarehouseStatus"
        label="发货状态"
        width="80"
      /> -->
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template v-slot="{ row, $index}">
          <template v-if="extraParam.orderType==100"></template>
          <template v-if="extraParam.orderType==101">
            <el-button @click="onGoBuy(row)">采购</el-button>
          </template>
          <template v-if="extraParam.orderType==102">
            <el-button @click="intercept(row)">拦截</el-button>
          </template>
          <template v-if="extraParam.orderType==103">
            <el-button @click="onGoBuy(row)">退款</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
      @size-change="onSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script>
import { MIXIN_LIST } from '@/utils/mixin'
import { CARD_TYPES_MAP, AGE_TYPES_MAP } from '@/utils/const'
import {
  formatOrderStatus,
  formatOrderType,
  formatPaymentStatus,
  formatWarehouseStatus
} from '@/utils/productStatus.js'
import search from './Search'

export default {
  mixins: [MIXIN_LIST],
  data() {
    return {
      cardMap: CARD_TYPES_MAP,
      ageMap: AGE_TYPES_MAP,

      keyId: '',
      keyName: 'orderNo',
      actions: {
        getPageList: 'productOrder/getPageList',
        removeOne: 'productOrder/removeOne'
      },
      extraParam: {
        orderType: -1
      }
    }
  },
  created() {
    this.extraParam.orderType = this.$route.query.orderType
  },
  methods: {
    formatOrderStatus,
    formatOrderType,
    formatPaymentStatus,
    formatWarehouseStatus,
    onAdd() {
      this.$router.push({
        name: 'orderBaseEdit',
        query: {
          orderType: this.extraParam.orderType
        }
      })
    },
    loadData() {
      this.loading = true
      setTimeout(_ => {
        this.tableData = [1]
        this.total = 1
        this.loading = false
      }, 1000)
    },
    onGoBuy(i) {
      this.$router.push({
        path: `/buyTicket/flightInfo`
      })
    },
    intercept(row) {
      this.$message.success('调用拦截接口')
        // let params = {};
        // let arr = [];
        // row.orderDetailList.forEach(item => {
        //   arr.push(item.name);
        // });
        // params.orderNo = row.sourceOrderNo;
        // params.passengerNames = arr;
        // this.$store
        //   .dispatch("order/interceptOrder", params)
        //   .then(data => {
        //     if (data.ret&&data.msg=="SUCCESS") {
        //       console.log(data);
        //       this.$message({
        //         type: "success",
        //         message: "拦截成功！"
        //       });
        //     }else {
        //       this.$message({
        //         type: "success",
        //         message: "拦截失败！"
        //       });
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      },
  },
  watch: {
    '$route.query.orderType': {
      handler(val) {
        this.extraParam.orderType = val
        this.loadData()
      }
    }
  },
  components: {
    search
  }
}
</script>

<style>
.detail {
  display: flex;
  flex-wrap: wrap;
}
</style>
