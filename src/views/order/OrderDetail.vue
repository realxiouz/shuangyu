<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :xs="6" :sm="5" :md="4" :lg="2" :xl="2" style="margin-top:7px;">
            <span>订单详情</span>
          </el-col>
          <el-col :xs="18" :sm="16" :md="11" :lg="5" :xl="5">
            <span>
              <el-button type="danger" size="mini">处理完成提交验证</el-button>
              <el-button type="primary" size="mini">任务取消</el-button>
              <el-button type="warning" @click="goBack" size="mini">返回</el-button>
            </span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="15" :xl="17">
            <el-input placeholder="输入备注信息" class="input-with-select">
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
        <el-table-column prop="dpt" label="出发机场" width="160" align="center"></el-table-column>
        <el-table-column prop="arr" label="到达机场" width="160" align="center"></el-table-column>
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
        <div
          style=" margin-top:10px;font-size:14px; line-height:1.5;"
        >{{this.tableData.refundChangeRule}}</div>
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
        <span>出票</span>
        <span>消息</span>
      </div>
      <el-button type="primary" size="mini">刷新</el-button>
    </el-card>

    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span>采购订单信息</span>
      </div>
      <el-table
        size="mini"
        :data="orderTree"
        highlight-current-row
        row-key="orderNo"
        fit
        :tree-props="{children: 'children', hasChildren: '*****'}"
      >
        <el-table-column prop="orderNo" align="center" label="订单号"></el-table-column>
        <el-table-column prop="sourceOrderNo" align="center" label="原订单"></el-table-column>
        <el-table-column
          prop="status"
          :formatter="formateStatus"
          label="订单状态"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column prop="orderSource" align="center" label="渠道"></el-table-column>
        <el-table-column label="乘客" align="center" width="200">
          <template slot-scope="scope">
            <i v-if="scope.row.passengers"></i>
            <span>{{ formatPassengers(scope.row.passengers)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" align="center" label="订单时间">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.createTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" align="center" label="金额">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" fixed="right" label="操作"></el-table-column>
      </el-table>
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
          :flightData="flightData"
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
      orderTree: [],
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
    goBack() {
      this.$router.go(-1);
    },
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
    handleSaveTicket(params) {
      console.log(params);
      this.handleTicketShow = false;
    },
    handleSave(params) {
      console.log(params);

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
            let params = {};
            params.rootOrderNo = data.rootOrderNo;
            params.category = data.category;
            this.getOrderTree(params);
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
    },
    getOrderTree(params) {
      this.$store
        .dispatch("order/getOrderTree", params)
        .then(data => {
          if (data) {
            this.orderTree = data;
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatPassengers(data) {
      if (!data || data.length == 0) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item.name + " / ";
      });

      return str.substring(0, str.length - 2);
    },
    formatAmount(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
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
