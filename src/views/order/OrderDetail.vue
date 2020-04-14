<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <el-row :gutter="5">
          <el-col :span="3" style="margin-top:7px;">
            <span >订单详情</span>
          </el-col>
          <el-col :span="7">
            <span>
              <el-button type="danger" size="mini">处理完成提交验证</el-button>
              <el-button type="primary" size="mini">任务取消</el-button>
              <el-button type="warning" size="mini">返回</el-button>
            </span>
          </el-col>
          <el-col :span="14">
            <el-input placeholder="输入备注" class="input-with-select">
              <template slot="prepend">备注:</template>
              <el-button type="primary" size="mini" slot="append">保存备注</el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20">
        <div style="margin-bottom:15px;">
          <el-button type="danger" size="mini">锁单</el-button>
          <el-button type="primary" size="mini">解锁订单</el-button>
          <el-button type="warning" size="mini">调用出票中</el-button>
        </div>
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
        <el-table-column prop="distance" label="航程" width="50" align="center"></el-table-column>
        <el-table-column prop="refundRule" label="退票规则" align="center"></el-table-column>
        <el-table-column prop="changeRule" label="改签规则" align="center"></el-table-column>
      </el-table>
      <div style="margin-top:15px;">
        <span style="font-weight:700;font-size:15px;">退改说明：</span>
        <div style=" margin-top:10px;font-size:14px; line-height:1.5;" >
          {{this.tableData.refundChangeRule}}
        </div>
      </div>
    </el-card>
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span>乘客信息</span>
      </div>
      <el-table
        :data="passengerData"
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
        <el-table-column
          prop="cardType"
          :formatter="formatCardType"
          label="乘机人证件类型"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column prop="cardNo" label="乘机人证件号" width="300" align="center"></el-table-column>
        <el-table-column label="票面价" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.viewPrice)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="goTicket" size="mini">系统出票</el-button>
        <el-button type="primary" @click="handleTicket" size="mini">手工出票</el-button>
      </el-row>
    </el-card>
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span>改签</span>
      </div>
      <el-button type="primary" size="mini">刷新</el-button>
    </el-card>

    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span>采购订单信息</span>
      </div>
      <el-table></el-table>
    </el-card>

    <div>
      <el-dialog
        title="手工出票"
        center
        :visible.sync="handleTicketShow"
        width="33%"
        :close-on-click-modal="false"
      >
        <handle-ticket
          @onCancel="handleCancel"
          @onSaveTicket="handleSaveTicket"
          @onSave="handleSave"
          :passengerData="passengersInfo"
        ></handle-ticket>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import handleTicket from "./handleTicket";
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
      handleTicketShow: false,
      flightData: [],
      passengerData: [],
      tableData: {},
      passengersInfo: [],
      orderNo: this.$route.query.orderNo
    };
  },
  components: {
    handleTicket
  },
  methods: {
    formateOrderType,
    formateStatus,
    formateCategory,
    formatAgeType,
    formatCardType,

    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    handleCancel() {
      this.handleTicketShow = false;
    },
    handleSaveTicket() {
      this.handleTicketShow = false;
    },
    handleSave() {
      this.handleTicketShow = false;
    },
    formatAmount1(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    },
    handleSelectionChange(passengersInfo) {
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
    handleTicket() {
      if (this.passengersInfo.length < 1) {
        this.$notify({
          title: "提示",
          message: "至少选择一名要出票的乘客",
          type: "warning",
          duration: 4500
        });
        return;
      } else {
        this.handleTicketShow = true;
      }
    },
    getOrderDetail(orderNo) {
      this.$store
        .dispatch("order/getOrderDetail", orderNo)
        .then(data => {
          if (data) {
            this.tableData = data;
            if (data.passengers) {
              this.passengerData = data.passengers;
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
