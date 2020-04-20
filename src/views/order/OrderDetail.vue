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
          <el-button type="danger" @click="lockOrder" size="mini">锁单</el-button>
          <el-button type="primary" @click="unLockOrder" size="mini">解锁订单</el-button>
          <el-button type="warning" @click="useGoTicket" size="mini">调用出票中</el-button>
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
        <div style=" margin-top:10px;font-size:14px; line-height:1.5;">{{this.refundChangeRule}}</div>
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
        <span>消息</span>
      </div>
      <el-button type="primary" size="mini" @click="getMessage">刷新</el-button>
    </el-card>
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span v-if="this.tableData.orderType=='30'|| this.tableData.orderType=='31'">改签</span>
        <span v-else>退票</span>
      </div>
      <div>
        <span v-if="this.changeHtml" v-html="this.changeHtml"></span>
      </div>
      <div>
        <span v-if="this.refundHtml" v-html="this.refundHtml"></span>
      </div>
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
        <el-table-column prop="orderNo" align="center" label="订单号" width="180"></el-table-column>
        <el-table-column prop="sourceOrderNo" align="center" width="180" label="原订单"></el-table-column>
        <el-table-column prop="status" :formatter="formateStatus" label="订单状态" width="80"></el-table-column>
        <el-table-column prop="orderSource" align="center" label="渠道"></el-table-column>
        <el-table-column label="姓名" align="center" width="200">
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
        <el-table-column label="航班号" align="center">
          <template slot-scope="scope">
            <span>{{ formatFlightNo(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ticketNos" label="票号" width="120" align="center">
          <template slot-scope="scope">
            <span>{{formatTicketNo(scope.row.ticketNos)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" fixed="right" width="360" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" v-show="scope.row.processCategory=='1'" size="mini">删除</el-button>
            <el-button
              type="primary"
              v-show="scope.row.orderSource=='QUNAR_OPEN'"
              @click="refundTicket(scope.row)"
              size="mini"
            >退票</el-button>
            <el-button
              type="primary"
              v-show="scope.row.orderSource=='QUNAR_OPEN'"
              @click="changeTicket(scope.row)"
              size="mini"
            >改签</el-button>
            <el-button type="primary" size="mini">补退</el-button>
            <el-button type="primary" size="mini">补改</el-button>
          </template>
        </el-table-column>
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
          @onCancel="handleTicketCancel"
          @onSaveTicket="handleSaveTicket"
          @onSave="handleSave"
          :passengerData="passengersInfo"
          :flightData="flightData"
        ></handle-ticket>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="蜗牛退票申请"
        center
        :visible.sync="refundTicketShow"
        width="50%"
        :close-on-click-modal="false"
      >
        <refund-ticket
          @onCancelRefund="refundTicketCancel"
          @onSaveRefund="handleSaveRefund"
          :purchaseOrderNo="purchaseOrderNo"
          :refundChangeRule="refundChangeRule"
        ></refund-ticket>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="蜗牛改签申请"
        center
        :visible.sync="changeTicketShow"
        width="50%"
        :close-on-click-modal="false"
      >
        <change-ticket
          :changeData="changeData"
          :changeDataTop="changeDataTop"
          @onCancelChange="changeTicketCancel"
          @onSavechange="handleSaveChange"
        ></change-ticket>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import handleTicket from "./handleTicket";
import refundTicket from "./refundTicket";
import changeTicket from "./changeTicket";

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
      refundTicketShow: false,
      changeTicketShow: false,
      changeHtml: "",
      refundHtml: "",
      flightData: [],
      passengerData: [],
      tableData: {},
      passengersInfo: [],
      orderTree: [],
      sourceOrderNo: "",
      refundData: "",
      purchaseOrderNo: "",
      refundChangeRule: "",
      changeData: "",
      orderNo: this.$route.query.orderNo,
      changeDataTop: {
        reason: "",
        flight: "",
        flightDate: "",
        passagers: [],
        airDivision: "",
        arrivalTime: "",
        flightNum: "",
        departureTime: ""
      }
    };
  },
  components: {
    handleTicket,
    refundTicket,
    changeTicket
  },
  methods: {
    formateOrderType,
    formateStatus,
    formateCategory,
    formatAgeType,
    formatCardType,
    // 返回
    goBack() {
      this.$router.go(-1);
    },

    // 手工出票弹框返回
    handleTicketCancel() {
      this.handleTicketShow = false;
    },
    // 退票弹框返回
    refundTicketCancel() {
      this.refundTicketShow = false;
    },
    // 改签弹框返回
    changeTicketCancel() {
      this.changeTicketShow = false;
    },
    // 手工出票保存并贴票
    handleSaveTicket(params) {
      this.handleTicketShow = false;
    },
    // 手工出票保存
    handleSave(params) {
      this.handleTicketShow = false;
      let newParams = {};

      if (params) {
        newParams.accountId = params.accountId;
        newParams.amount = this.tableData.amount;
        newParams.thirdId = this.tableData.thirdId;
        newParams.flights = [{
          cabin:params.cabin,
          dptTime:params.dptTime,
          arr:params.arr,
          flightCode:params.flightCode,
          flightDate:params.flightDate,
          dpt:params.dpt,

        }];
        newParams.fundAccount = params.fundAccount;
        newParams.orderSource = params.orderSource;
        newParams.orderType = this.tableData.orderType;
        newParams.passengers = params.passengers;
        newParams.pid = "";
        newParams.remark = params.remark;
        newParams.rootOrderNo = this.tableData.rootOrderNo;
        newParams.sourceOrderNo = this.tableData.sourceOrderNo;
        newParams.status = params.status;
        newParams.transactionAmount = params.transactionAmount;
        newParams.createTime = params.createTime;
        newParams.ticketNoFlag = params.ticketNoFlag;
      }
      console.log(params, "params");

      console.log(newParams, "手工出票");

      if (params.orderSource == "QUNAR_OPEN") {
        let woniuParams = {};
        woniuParams.sourceOrderNo = params.sourceOrderNo;
        woniuParams.orderTaskId = this.$route.query.taskId;
        woniuParams.fundAccount = params.fundAccount;
        woniuParams.userNameType = params.userNameType;
        woniuParams.amount = params.amount;
        woniuParams.purchaseOrderType = params.status;
        console.log(woniuParams, "woniuParams");

        this.woniuOrder(woniuParams);
      } else {
        this.purchaseOrder(newParams);
      }
    },
    purchaseOrder(params) {
      this.$store
        .dispatch("order/purchaseOrder", params)
        .then(data => {
          if (data) {
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    woniuOrder(params) {
      this.$store
        .dispatch("order/woniuOrder", params)
        .then(data => {
          if (data) {
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 退票申请
    handleSaveRefund(params) {
      let newParams = {};
      if (params) {
        newParams.appKey = params.appKey;
        newParams.passengerIds = params.passengerIds;
        newParams.refundCause = params.refundCause;
        newParams.refundCauseId = params.refundCauseId;
      }

      newParams.orderNo = this.purchaseOrderNo;
      if (this.$route.query.taskId) {
        newParams.orderTaskId = this.$route.query.taskId;
      }
      this.$store
        .dispatch("order/refundApply", newParams)
        .then(data => {
          if (data) {
            this.$message({
              type: "success",
              message: "退票申请成功！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.refundTicketShow = false;
    },
    // 改签申请
    handleSaveChange(params) {
      let newParams = {};
      if (params) {
        newParams.appKey = params.appKey;
        newParams.passengerIds = params.passengerIds;
        newParams.changeCauseId = params.changeCauseId;
        newParams.totalAmount = params.totalAmount;
        newParams.applyRemarks = params.applyRemarks;
      }
      if (params.flightData) {
        newParams.uniqKey = params.flightData[0].uniqKey;
        newParams.gqFee = params.flightData[0].gqFee;
        newParams.upgradeFee = params.flightData[0].upgradeFee;
        newParams.childUseFee = params.flightData[0].childUseFee;
        newParams.flightNo = params.flightData[0].flightNo;
        newParams.cabinCode = params.flightData[0].cabinCode;
        newParams.childExtraPrice = params.flightData[0].childExtraPrice;
        newParams.startDate = params.flightData[0].startDate;
        newParams.startTime = params.flightData[0].startTime;
        newParams.endTime = params.flightData[0].endTime;
      }
      newParams.orderNo = this.purchaseOrderNo;
      if (this.$route.query.taskId) {
        newParams.orderTaskId = this.$route.query.taskId;
      }
      this.$store
        .dispatch("order/changeApply", newParams)
        .then(data => {
          if (data) {
            console.log(data);
            this.$message({
              type: "success",
              message: "改签申请成功！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.changeTicketShow = false;
    },
    formatAmount1(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    },
    handleSelectionChange(passengersInfo) {
      let arr = [];
      for (let i = 0; i < passengersInfo.length; i++) {
        this.tableData.orderDetailList.forEach(item => {
          if (item.cardNo == passengersInfo[i].cardNo) {
            arr.push(item);
          }
        });
      }
      this.passengersInfo = arr;
    },
    // 系统出票
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

    // 手工出票
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
    // 获取详情信息
    getOrderDetail(orderNo) {
      this.$store
        .dispatch("order/getOrderDetail", orderNo)
        .then(data => {
          if (data) {
            this.tableData = data;
            let params = {};
            this.refundChangeRule = data.refundChangeRule;
            this.sourceOrderNo = data.sourceOrderNo;
            params.rootOrderNo = data.rootOrderNo;
            params.category = 1;
            this.getOrderTree(params);

            this.getMessage(this.sourceOrderNo);
            this.getMessageHtml(data.orderType, this.sourceOrderNo);
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
    // 获取采购单信息
    getOrderTree(params) {
      this.$store
        .dispatch("order/getOrderTree", params)
        .then(data => {
          if (data) {
            this.orderTree = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // tts锁单
    lockOrder() {
      this.$store
        .dispatch("order/lockOrder", this.sourceOrderNo)
        .then(data => {
          if (data) {
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // tts解锁单
    unLockOrder() {
      this.$store
        .dispatch("order/unLockOrder", this.sourceOrderNo)
        .then(data => {
          if (data) {
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 调用出票中
    useGoTicket() {
      this.$store
        .dispatch("order/useGoTicket", this.$route.query.taskId)
        .then(data => {
          if (data) {
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMessage(sourceOrderNo) {
      this.$store
        .dispatch("order/getMessageDetail", sourceOrderNo)
        .then(data => {
          if (data) {
            // console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 消息
    getMessageHtml(orderType, sourceOrderNo) {
      if (
        orderType == 10 ||
        orderType == 20 ||
        orderType == 21 ||
        orderType == 22 ||
        orderType == 23
      ) {
        this.getRefundHtml(sourceOrderNo);
      } else if (orderType == 30 || orderType == 31) {
        this.getChangeHtml(sourceOrderNo);
      } else {
        this.getChangeHtml(sourceOrderNo);
      }
    },

    // 获取销售改签信息
    getChangeHtml(sourceOrderNo) {
      this.$store
        .dispatch("order/getChangeHtml", sourceOrderNo)
        .then(data => {
          if (data) {
            this.changeHtml = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取退票改签信息
    getRefundHtml(sourceOrderNo) {
      this.$store
        .dispatch("order/getRefundHtml", sourceOrderNo)
        .then(data => {
          if (data) {
            this.refundHtml = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 退票
    refundTicket(row) {
      this.purchaseOrderNo = row.sourceOrderNo;
      this.refundTicketShow = true;
    },
    // 改签
    changeTicket(row) {
      this.purchaseOrderNo = row.sourceOrderNo;
      this.changeTicketShow = true;
      this.changeData = row;
    },
    // 格式化日期
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    //格式化乘客信息
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
    // 格式化航班信息
    formatFlightNo(data) {
      if (!data || data.length == 0) {
        return "";
      }
      return data[0].flightCode;
    },
    // 格式化票号信息
    formatTicketNo(ticketNo) {
      if (ticketNo && ticketNo.length > 0) {
        let str = "";
        ticketNo.forEach((item, index) => {
          if (item) {
            str += item + " / ";
          }
        });
        return str.substring(0, str.length - 2);
      } else {
        return (ticketNo = "");
      }
    },
    // 格式化数字
    formatAmount(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    }
  },
  created() {
    // this.getOrderDetail(this.orderNo);
    this.getOrderDetail("abc20011020042325000130");
  },
  updated() {
    if (this.changeHtml) {
      this.changeDataTop.reason = document.querySelectorAll(
        ".select"
      )[0].innerText;
      this.changeDataTop.flight = document.querySelectorAll(
        ".pr01"
      )[1].innerText;
      this.changeDataTop.flightDate = document.getElementsByName(
        "departureDay"
      )[0].value;
      this.changeDataTop.departureTime = document.getElementsByName(
        "departureTime"
      )[0].value;
      this.changeDataTop.arrivalTime = document.getElementsByName(
        "arrivalTime"
      )[0].value;
      this.changeDataTop.airDivision = document.getElementsByName(
        "airDivision"
      )[0].value;
      this.changeDataTop.flightNum = document.getElementsByName(
        "flightNum"
      )[0].value;
      this.changeDataTop.cabin = document.getElementsByName("cabin")[0].value;
      this.tableData.passengers.forEach(item => {
        if (this.changeHtml.indexOf(item.name) != -1) {
          this.changeDataTop.passagers.push(item);
        }
      });
    }
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
<style>
/* 退票html样式 */
#js_mod_rt ul {
  margin: 0;
  padding: 0;
}
#js_mod_rt .bd #js_form_rt .js_box_content .lable-title {
  float: left;
}
#js_mod_rt .bd #js_form_rt .js_box_content .ticket-cell #js_passanger_rt {
  border: 1px solid #409eff;
}
#js_mod_rwc ul {
  margin: 0;
  padding: 0;
}
#js_mod_rt li {
  width: 100%;
  list-style: none;
  margin-top: 15px;
}
#js_mod_rwc li {
  width: 100%;
  list-style: none;
}
#js_mod_rt .hd {
  display: none;
}
#js_form_rt .title-box {
  display: none;
}
#js_mod_rwc .hd {
  display: none;
}
#js_btns_rt .g-btn:not(:first-child) {
  display: none;
}
/* 改签html样式 */
.mod-public-case .hd {
  display: none;
}
.m-payinfo {
  display: none;
}
</style>