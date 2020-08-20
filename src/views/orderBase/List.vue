<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" >
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;"
      size="mini"
      border
    >
      <el-table-column prop="orderNo" label="单号" />
      <el-table-column label="单据日期">
        <template slot-scope="scope">{{ scope.row.orderDate | time("YYYY-MM-DD") }}</template>
      </el-table-column>
      <el-table-column label="单据类型">
        <template v-slot="{row}">{{ row.orderType|orderType }}</template>
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
            <el-table-column prop="productCode" label="商品编码" width="200" />
            <el-table-column prop="productName" label="商品名称" align="center" />
            <el-table-column prop="brandName" label="品牌" align="center" />
            <el-table-column prop="skuName" label="属性名称" align="center" />
            <el-table-column prop="price" label="单价" align="center" />
            <el-table-column prop="quantity" label="数量" width="60" />
            <el-table-column label="库存" width="60">
              <template v-slot="{row}" >
                <el-link type="primary"
                 :disabled="row.inventoryQuantity==0&&false"
                 @click.stop="onOrderRoot(scope.row)"
                >{{row.inventoryQuantity}}</el-link>
              </template>
            </el-table-column>
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
      <el-table-column label="确认状态" width="80" >
      <template v-slot="{row}">{{ row.orderStatus|orderStatus }}</template>
      </el-table-column>
      <el-table-column
        label="发货状态"
        width="80"
      >
      <template v-slot="{row}">{{ row.warehouseStatus|warehouseStatus }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template v-slot="{ row, $index}">
          <el-button @click="onEdit(row)" type="text" size="mini" class="btn-primary">查看</el-button>
          <template v-if="params.orderType==100"></template>
          <template v-if="params.orderType==101">
            <el-button @click="onWarehouse(row)" type="text" size="mini" class="btn-primary">出库</el-button>
            <el-button @click="onGoBuy(row)" type="text" size="mini" class="btn-primary">采购</el-button>
          </template>
          <template v-if="params.orderType==102">
            <el-button @click="intercept(row)" type="text" size="mini" class="btn-primary">拦截</el-button>
          </template>
          <template v-if="params.orderType==103">
            <el-button @click="refundTicket(row)" type="text" size="mini" class="btn-primary">退款</el-button>
          </template>
          <template v-if="params.orderType==104">
            <el-button @click="changeTicket(row)" type="text" size="mini" class="btn-primary">改签</el-button>
            <el-button @click="changeTicket(row)" type="text" size="mini" class="btn-primary">退改</el-button>
          </template>
          <template v-if="params.orderType==105">
            <el-button @click="refundTicket(row)" type="text" size="mini" class="btn-primary">入库</el-button>
          </template>
          <template v-if="params.orderType==106">
            <el-button @click="changeTicket(row)" type="text" size="mini" class="btn-primary">出库</el-button>
            <el-button @click="onGoBuy(row)" type="text" size="mini" class="btn-primary">采购</el-button>
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

    <el-dialog :visible.sync="refundTicketShow" title="退款">
      <el-form
        :model="formData"
        label-width="110px"
        style="margin-top:15px;"
      >
        <el-form-item label="退票原因:" prop="refundCauseId">
          <el-select
            clearable
            v-model="formData.refundCauseId"
            placeholder="请选择退票原因"
            style="width: 100%"
          >
            <el-option
              v-for="item in []"
              :key="item.code"
              :label="item.msg"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退票备注:">
          <el-input placeholder="请输入退票备注..." v-model="formData.refundCause"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="profit" label="利润金额:">
              <!--<el-input placeholder="请输入利润金额..." v-model="formData.profit"></el-input>-->
              <el-input-number
                v-model="formData.profit"
                controls-position="right"
                :precision="2"
                placeholder="请输入利润金额..."
                style="width: 100%"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="蜗牛手续费:">
              <span>{{formData.refundFeeInfo}} / 人</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成人可退金额:">
              <span>{{formData.refundFeeInfo}} / 人</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-model="formData.refundData" label-width="auto">
          <label class="el-form-item__label" style="color:#606266; width:110px;">乘车人:</label>
          <!-- <el-table
            ref="multipleTable"
            size="mini"
            :data="passagersRefund"
            highlight-current-row
            @selection-change="handleSelectionChange"
            fit
            style="width: 100%;"
          >
            <el-table-column type="selection" :selectable="selectable" width="55"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column
              prop="cardType"
              :formatter="formatCardType"
              label="证件类型"
              align="center"
            ></el-table-column>
            <el-table-column prop="cardNo" label="证件号" align="center"></el-table-column>
            <el-table-column prop="ageType" :formatter="formatAgeType" label="乘机人类型" align="center"></el-table-column>
            <el-table-column label="价格" prop="amount" align="center">
              <template slot-scope="scope">
                <span>{{formatAmount(scope.row.amount)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ticketNo" label="票号" align="center"></el-table-column>
          </el-table> -->
        </el-form-item>

        <el-form-item label="销售退改说明:">
          <span v-if="false" v-html="refundChangeRule"></span>
          <div>
            <span v-if="false">（销售航班信息：）</span>
            <span v-if="false" style="color:red;"></span>
          </div>
          <div v-if="true">
            <el-row>
              <span>退票原因：</span>
            </el-row>
            <el-row>
              <span>实退金额:</span>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="蜗牛退改说明:">
          <span v-if="false" v-html="this.tgqText"></span>
          <span v-else>暂无数据</span>
        </el-form-item>
      </el-form>
      <div style="margin-top: 25px;text-align: right;">
        <el-button size="mini" @click="refundTicketShow=false">取 消</el-button>
        <el-button size="mini" @click="" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="changeTicketShow" title="改签">
      <change-ticket />
    </el-dialog>
  </div>
</template>

<script>
import { MIXIN_LIST } from "@/utils/mixin";
import { CARD_TYPES_MAP, AGE_TYPES_MAP } from "@/utils/const";
import {
  formatOrderStatus,
  formatOrderType,
  formatPaymentStatus,
  formatWarehouseStatus
} from "@/utils/productStatus.js";
import search from "./Search";

import ChangeTicket from './changeTicket'

export default {
  mixins: [MIXIN_LIST],
  data() {
    return {
      cardMap: CARD_TYPES_MAP,
      ageMap: AGE_TYPES_MAP,

      keyId: "",
      keyName: "orderNo",
      actions: {
        getPageList: "productOrder/getPageList",
        removeOne: "productOrder/removeOne"
      },
      params: {
        orderType: '',
        parentNo: ''
      },

      refundTicketShow: false,
      changeTicketShow: false,
      formData: {}
    };
  },
  created() {
    this.params.orderType = this.$route.query.orderType;
    this.params.parentNo = this.$route.query.parentNo
  },
  methods: {
    formatOrderStatus,
    formatOrderType,
    formatPaymentStatus,
    formatWarehouseStatus,
    onAdd() {
      this.$router.push({
        name: "orderBaseEdit",
        query: {
          orderType: this.params.orderType
        }
      });
    },
    onEdit(i) {
      this.$router.push({
        name: "orderBaseEdit",
        query: {
          orderType: this.params.orderType,
          orderNo: i.orderNo
        }
      });
    },
    // loadData() {
    //   this.loading = true;
    //   setTimeout(_ => {
    //     this.tableData = [1];
    //     this.total = 1;
    //     this.loading = false;
    //   }, 1000);
    // },
    onWarehouse(i) {
      // this.$store
      //   .dispatch("productOrder/outWarehouseOrder", {
      //     orderNo: i.orderNo,
      //     data: i
      //   })
    },
    onGoBuy(i) {
      let {passengers, orderDetails, parentNo} = i
      
      let info = this.genTicketInfo(orderDetails[0].propertyItems, ['dpt', 'arr', 'dptTime', 'flightDate', 'flightCode', 'cabin'])

      let passengersTemp = passengers.map(i => {
        delete i.orderNo
        delete i.passengerId
        return i
      })

      let orderDetailsTemp = orderDetails.map( i => {
        delete i.orderNo
        delete i.detailId
        return i
      })
      this.$store.commit('ticket/setInfo', info)
      this.$store.commit('ticket/setPassengers', passengersTemp)
      this.$store.commit('ticket/setOrderDetails', orderDetails)
      this.$store.commit('ticket/setParentNo', parentNo)
      this.$router.push({
        path: `/buyTicket/flightInfo?orderNo=${i.orderNo}`
      });
    },
    intercept(row) {
      this.$message.success("调用拦截接口");
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
    refundTicket(row) {
      // this.purchaseOrderNo = row.sourceOrderNo;
      // this.refundData = row;
      this.refundTicketShow = true;
    },
    changeTicket(row) {
      this.changeTicketShow = true
    },
    genTicketInfo(arrParent, attrArr) {
      let obj = {}
      for (const i of arrParent) {
          for(const j of attrArr) {
              if (i.code == j) {
                  obj[j] = this.getValByType(i)
              }
          }
      }
      return obj
    },
    getValByType(i) {
      switch (i.type) {
        case "String":
          return i["_string"];
        case "Boolean":
          return i["_bool"];
        case "ArrayList":
          return i["_array"].join(",");
        case "Double":
          return i["_double"];
        case "Float":
          return i["_float"];
        case "Integer":
          return i["_int"];
        case "Byte":
          return i["_byte"];
        case "Short":
          return i["_short"];
        case "Long":
          return i["_long"];
        case "Date":
          return this.$moment(i["_date"]).format(i.format || "YYYY-MM-DD");
        default:
          return i["_string"];
      }
    },
    onOrderRoot(i) {
      if (!i.rootOrderNo) {
        this.$message.error('rootOrderNo 为空')
        return
      }
      this.$router.push({
        name: 'orderRoot',
        query: {
          rootNo: i.rootOrderNo
        }
      })
    },
  },
  watch: {
    // "$route.query.orderType": {
    //   handler(val) {
    //     this.params.orderType = val;
    //     this.loadData();
    //   }
    // },
    // "$route.query.parentNo": {
    //   handler(val) {
    //     this.params.parentNo = val;
    //     this.loadData();
    //   }
    // },
    query(val) {
      this.parmas = val
      this.loadData()
    }
  },
  components: {
    search,
    ChangeTicket,
    query() {
      let q = {}
      if (this.$route.query.orderType) {
        q.orderType = this.$route.query.orderType
      }
      if (this.$route.query.parentNo) {
        q.parentNo = this.$route.query.parentNo
      }
      return q
    }
  }
};
</script>

<style>
.detail {
  display: flex;
  flex-wrap: wrap;
}
</style>
