<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" style="margin-bottom:15px;margin-left:40px">
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="handleAdd"
        >添加</el-button
      >
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-bottom: 15px;"
      size="mini"
    >
      <el-table-column prop="orderNo" label="单号" align="center">
      </el-table-column>
      <el-table-column prop="orderDate" label="单据日期" align="center">
        <template slot-scope="scope">
          <div @click="skipDetail(scope.row.orderNo)">
            {{ initDate(scope.row.orderDate, "YYYY-MM-DD") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderType" label="单据类型" align="center">
        <template slot-scope="scope">
          <div @click="skipDetail(scope.row.orderNo)">
            {{ formatOrderType(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="明细" align="center" width="800">
        <template slot-scope="scope">
          <el-table
            :data="scope.row.orderDetails"
            border
            size="mini"
            @row-click="skipDetail(scope.row.orderNo)"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form
                  label-position="right"
                  :inline="true"
                  label-width="120px"
                >
                  <div class="detail">
                    <div
                      :v-if="props.row.propertyItems.length > 0"
                      v-for="(i, index) in props.row.propertyItems"
                      :key="index"
                    >
                      <el-form-item :label="`${i.name}:`" v-if="!i.hidden">
                        <span>{{ getValByType(i) }}</span>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="productCode"
              label="商品编码"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="productName"
              label="商品名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="brandName"
              label="品牌"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="skuName"
              label="属性名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="price"
              label="单价"
              align="center"
            ></el-table-column>
            <el-table-column prop="quantity" label="数量" width="60" />
            <el-table-column prop="inventoryQuantity" label="库存" width="60" />
          </el-table>

          <el-table
            :data="scope.row.passengers"
            border
            style="margin-top:10px;"
          >
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
      <el-table-column
        prop="totalAmount"
        label="成交金额"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="receiptAmount"
        label="实收金额"
        align="center"
      ></el-table-column>
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
      <el-table-column fixed="right" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.orderStatus != 0"
            @click="skipDetail(scope.row.orderNo)"
            type="primary"
            size="mini"
            >查看
          </el-button>
          <el-button
            v-show="scope.row.warehouseStatus == 2"
            @click="handleWarehouse(scope.row)"
            type="primary"
            size="mini"
            >出库
          </el-button>
          <el-button v-if="" @click="onBuyTicket(scope.row)">购票</el-button>
          <el-button
            v-show="scope.row.orderStatus == 0"
            @click="onEdit(scope.row)"
            type="primary"
            size="mini"
          >
            编辑
          </el-button>
          <el-button
            v-show="scope.row.orderStatus == 0"
            @click="onDel(scope.row)"
            type="danger"
            size="mini"
          >
            删除
          </el-button>
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
    ></el-pagination>
  </div>
</template>

<script>
import search from "./Search.vue";
import {
  formatOrderStatus,
  formatOrderType,
  formatPaymentStatus,
  formatWarehouseStatus
} from "@/utils/productStatus.js";
import { CARD_TYPES_MAP, AGE_TYPES_MAP } from "@/utils/const";
import { MIXIN_LIST } from "@/utils/mixin";

export default {
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
      extraParam: {
        orderType: 101
      }
    };
  },
  methods: {
    formatOrderType,
    formatOrderStatus,
    formatWarehouseStatus,
    formatPaymentStatus,
    handleAdd() {
      this.skipDetail();
    },
    onEdit(row) {
      this.skipDetail(row.orderNo);
    },
    handleWarehouse(row) {
      this.$store
        .dispatch("productOrder/outWarehouseOrder", {
          orderNo: row.orderNo,
          data: row
        })
        .then(data => {
          this.loadData();
          if (data) {
            this.$message({
              type: "success",
              message: "出库成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: "出库失败!"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    skipDetail(orderNo) {
      this.$router.push({
        path: "/product/shipment/order/edit",
        query: { orderNo: orderNo }
      });
    },
    initOrderType(orderType) {
      switch (orderType) {
        case 1:
          return "销售";
        case 2:
          return "采购";
        case 10:
          return "销售发货单";
        case 11:
          return "销售退货单";
        case 12:
          return "销售变更单";
        case 20:
          return "采购入库单";
        case 21:
          return "采购退货单";
        case 22:
          return "采购变更单";
        default:
          return "其他";
      }
    },
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    initWarehouseStatus(warehouseStatus) {
      switch (warehouseStatus) {
        case 0:
          return "未出库";
        case 1:
          return "已出库";
      }
    },
    initPaymentStatus(paymentStatus) {
      if (0 === paymentStatus) {
        return "未付款";
      }
      return "已付款";
    },
    formatAmount(amount) {
      if (!amount) {
        return "";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    },
    onBuyTicket(i) {
      // todo
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
        path: `/buyTicket/flightInfo`
      });
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
    }
  },
  components: {
    search
  },
  mixins: [MIXIN_LIST]

};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
