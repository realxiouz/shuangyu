<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
      </div>
      <el-row :gutter="20">
        <el-form :model="tableData" label-width="130px" size="mini">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单编号:">
              <span>{{tableData.orderNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单类型:">
              <span>{{formateOrderType(tableData)}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单状态:">
              <span>{{formateStatus(tableData)}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单分类:">
              <span>{{formateCategory(tableData)}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="最晚出票时限:">
              <span>{{formatDate(tableData.deadlineTicketTime,'YYYY-MM-DD HH:mm:ss')}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="交易编号:">
              <span>{{tableData.transactionNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="交易时间:">
              <span>{{formatDate(tableData.transactionTime,'YYYY-MM-DD HH:mm:ss')}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="业务编号:">
              <span>{{tableData.businessNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="金额:">
              <span>￥{{this.$numeral(tableData.amount).format('0.00')}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="交易金额:">
              <span>￥{{this.$numeral(tableData.transactionAmount).format('0.00')}}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span>航班信息</span>
      </div>
      <el-table :data="flightData" size="mini" highlight-current-row style="width: 100%;" fit>
        <el-table-column prop="dptAirport" label="出发机场" width="160" align="center"></el-table-column>
        <el-table-column prop="arrAirport" label="到达机场" width="160" align="center"></el-table-column>
        <el-table-column prop="airlineCode" label="航司" width="50" align="center"></el-table-column>
        <el-table-column prop="flightCode" label="航班号" width="100" align="center"></el-table-column>

        <el-table-column prop="cabin" label="舱位" width="160" align="center"></el-table-column>
        <el-table-column label="出发日期" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.flightDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dptTime" label="起飞时间" width="150" align="center"></el-table-column>
        <el-table-column prop="arrTime" label="到达时间" width="100" align="center"></el-table-column>
        <el-table-column
          prop="distance"
          label="航程"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column prop="refundRule" label="退票规则" align="center"></el-table-column>
        <el-table-column prop="changeRule" label="改签规则" align="center"></el-table-column>
      </el-table>
    </el-card>
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span>乘客信息</span>
      </div>
      <el-table
        :data="PassengerData"
        size="mini"
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        fit
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="100" align="center"></el-table-column>
        <el-table-column label="出生年月" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.birthday,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="ageType"
          :formatter="formatAgeType"
          label="乘机人类型"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column prop="cardType" :formatter="formatCardType" label="乘机人证件类型" width="250" align="center"></el-table-column>
        <el-table-column prop="cardNo" label="乘机人证件号" width="300" align="center"></el-table-column>
        <el-table-column label="票面价" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.viewPrice)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="goTicket" size="mini">出票</el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import {
  formateOrderType,
  formateCategory,
  formateStatus,
  formatAgeType,
  formatCardType
} from "@/utils/status.js";
export default {
  name: "orderDetail",
  data() {
    return {
      purchaseShow: this.$route.query.purchaseShow,
      flightData: [],
      PassengerData: [],
      tableData: {},
      passengersInfo: [],
      orderNo: this.$route.query.orderNo
    };
  },
  methods: {
    formateOrderType,
    formateStatus,
    formateCategory,
    formatAgeType,
    formatCardType,
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },

    formatAmount1(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    },
    handleSelectionChange(passengersInfo) {
      // console.log(passengersInfo);
      this.passengersInfo = passengersInfo;
    },
    goTicket() {
      if (this.passengersInfo.length < 1) {
        this.$notify({
          title: "提示",
          message: "至少选择一名要出票的乘客",
          type: "warning",
          duration: 4500
        });
        return;
      } else {
        this.$router.push({
          path: "/order/detail/go/ticket",
          query: {
            orderNo: this.orderNo,
            passengersInfo: JSON.stringify(this.passengersInfo)
          }
        });
      }
    },
    getOrderDetail(orderNo) {
      this.$store
        .dispatch("order/getOrderDetail", orderNo)
        .then(data => {
          if (data) {
            this.tableData = data;
            if (data.passengers) {
              this.PassengerData = data.passengers;
            }
            if (data.flights) {
              this.flightData = data.flights;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getOrderDetail(this.orderNo);
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    },
    formatAmount() {
      return function(amount) {
        return this.formatAmount1(amount);
      };
    }
  }
};
</script>

<style scoped>
.contentBox {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
