<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" >
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;"
    >
      <el-table-column prop="orderNo" label="单号" align="center"></el-table-column>
      <el-table-column prop="orderDate" label="单据日期" align="center">
        <template slot-scope="scope">
          <div
            @click="skipDetail(scope.row.orderNo)"
          >{{ scope.row.orderDate | time("YYYY-MM-DD") }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="orderType" label="单据类型" align="center">
        <template slot-scope="scope">
          <div @click="skipDetail(scope.row.orderNo)">{{ formatOrderType(scope.row) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="明细" align="center" width="800">
        <template slot-scope="scope">
          <el-table
            :data="scope.row.orderDetails"
            border
            @row-click="skipDetail(scope.row.orderNo)"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="right" :inline="true" label-width="120px">
                  <div class="detail">
                    <div
                      :v-if="props.row.propertyItems.length > 0"
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
            <el-table-column label="乘客类型" width="80">
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
      <el-table-column prop="totalAmount" label="成交金额" align="center"></el-table-column>
      <el-table-column prop="receiptAmount" label="实收金额" align="center"></el-table-column>
      <el-table-column
        prop="orderStatus"
        :formatter="formatOrderStatus"
        label="确认状态"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="warehouseStatus"
        :formatter="formatWarehouseStatus"
        label="发货状态"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.orderStatus != 0"
            @click="skipDetail(scope.row.orderNo)"
           type="text" size="mini" class="btn-primary"
          >查看</el-button>
          <el-button
            v-show="scope.row.orderStatus == 0"
            @click="onEdit(scope.row)"
            type="text" size="mini" class="btn-primary"
          >编辑</el-button>
          <el-button v-show="scope.row.orderStatus == 0" @click="onDel(scope.row)" type="text" size="mini" class="btn-danger">删除</el-button>
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
      :current-page.sync="currentPage"
    />
  </div>
</template>

<script>
import search from './Search.vue'
import {
  formatOrderStatus,
  formatOrderType,
  formatPaymentStatus,
  formatWarehouseStatus
} from '@/utils/productStatus.js'

import { CARD_TYPES_MAP, AGE_TYPES_MAP } from '@/utils/const'
import { MIXIN_LIST } from '@/utils/mixin'

export default {
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
      params: {
        orderType: 100
      }
    }
  },
  methods: {
    formatOrderType,
    formatOrderStatus,
    formatWarehouseStatus,
    formatPaymentStatus,
    handleAdd() {
      this.skipDetail()
    },
    onEdit(row) {
      this.skipDetail(row.orderNo)
    },
    skipDetail(orderNo) {
      this.$router.push({
        path: '/product/sale/order/edit',
        query: { orderNo: orderNo }
      })
    }
  },
  components: {
    search
  },
  mixins: [MIXIN_LIST]
}
</script>

<style>
.detail {
  display: flex;
  flex-wrap: wrap;
}
</style>
