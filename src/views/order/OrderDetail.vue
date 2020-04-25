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
              <el-button type="danger" @click="taskSubmit" size="mini">处理完成提交验证</el-button>
              <el-button type="primary" @click="taskCancel" size="mini">任务取消</el-button>
              <el-button type="warning" @click="goBack" size="mini">返回</el-button>
            </span>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="15" :xl="17">
            <el-input v-model="taskRemarkData" placeholder="输入备注信息" class="input-with-select">
              <template slot="prepend">备注:</template>
              <el-button type="primary" @click="taskRemark" size="mini" slot="append">保存备注</el-button>
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
            <el-form-item label="原单号:">
              <span>{{tableData.sourceOrderNo}}</span>
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
        <el-button
          v-if="this.tableData.orderType==10"
          type="primary"
          @click="goTicket"
          size="mini"
        >系统出票</el-button>
        <el-button type="primary" @click="handleTicket" size="mini">手工出票</el-button>
      </el-row>
    </el-card>
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span>消息</span>
      </div>
      <el-button type="primary" size="mini" @click="getMessage">刷新</el-button>
      <div style="margin-top:15px;" id="messageHtml">
        <span v-if="this.messageData" v-html="this.messageData"></span>
        <span  v-else>暂无数据</span>
      </div>
    </el-card>
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span v-if="this.tableData.orderType=='30'|| this.tableData.orderType=='31'">改签</span>
        <span v-else-if="this.tableData.orderType=='10'">退票</span>
        <span v-else>出票</span>
      </div>
      <div id="changeHtmlOrderDetail">
        <span v-if="this.changeHtml" v-html="this.changeHtml"></span>
        <span v-else>暂无数据</span>
      </div>
      <div id="refundHtmlOrderDetail">
        <span v-if="this.refundHtml" v-html="this.refundHtml"></span>
        <span v-else>暂无数据</span>
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
            <el-button
              type="primary"
              @click="orderTreeRemove(scope.row)"
              v-show="scope.row.processCategory=='1'"
              size="mini"
            >删除</el-button>
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
            <el-button type="primary" @click="fillOutRefund(scope.row)" size="mini">补退</el-button>
            <el-button type="primary" @click="fillOutChange(scope.row)" size="mini">补改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div>
      <el-dialog
        title="手工出票"
        center
        :visible.sync="handleTicketShow"
        width="50%"
        :close-on-click-modal="false"
      >
        <handle-ticket
          @onCancel="onCancel"
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
          @onCancel="onCancel"
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
          @onCancel="onCancel"
          @onSavechange="handleSaveChange"
        ></change-ticket>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="补退"
        center
        :visible.sync="fillOutRefundShow"
        width="50%"
        :close-on-click-modal="false"
      >
        <fillOut-refund
          :fillOutRefundData="fillOutRefundData"
          @onCancel="onCancel"
          @onSave="handleSavePurchase"
        ></fillOut-refund>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="补改"
        center
        :visible.sync="fillOutChangeShow"
        width="50%"
        :close-on-click-modal="false"
      >
        <fillOut-change
          :fillOutChangeData="fillOutChangeData"
          @onCancel="onCancel"
          @onSave="handleSavePurchase"
        ></fillOut-change>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="拒绝退款"
        center
        :visible.sync="newFromDialogShow"
        width="33%"
        :close-on-click-modal="false"
      >
        <div id="refundTts" v-html="this.newFromDialog"></div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import handleTicket from "./handleTicket";
import refundTicket from "./refundTicket";
import changeTicket from "./changeTicket";
import fillOutChange from "./fillOutChange";
import fillOutRefund from "./fillOutRefund";
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
      fillOutChangeShow: false,
      fillOutRefundShow: false,
      newFromDialogShow: false,
      newFromDialog: "",
      fillOutRefundData: "",
      fillOutChangeData: "",
      changeHtml: "",
      refundHtml: "",
      messageData: "",
      flightData: [],
      passengerData: [],
      tableData: {},
      passengersInfo: [],
      orderTree: [],
      sourceOrderNo: "",
      refundData: "",
      purchaseOrderNo: "",
      refundChangeRule: "",
      taskRemarkData: "",
      timer: null,
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
    changeTicket,
    fillOutChange,
    fillOutRefund
  },
  methods: {
    formateOrderType,
    formateStatus,
    formateCategory,
    formatAgeType,
    formatCardType,
    // 获取详情信息
    getOrderDetail(orderNo) {
      this.$store
        .dispatch("order/getOrderDetail", orderNo)
        .then(data => {
          if (data) {
            this.tableData = data;
            this.refundChangeRule = data.refundChangeRule;
            this.sourceOrderNo = data.sourceOrderNo;
            this.getMessage();
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
    // 返回
    goBack() {
      this.$router.go(-1);
    },

    // 手工出票弹框返回
    onCancel() {
      this.handleTicketShow = false;
      this.fillOutRefundShow = false;
      this.fillOutChangeShow = false;
      this.changeTicketShow = false;
      this.refundTicketShow = false;
    },
    // 手工出票保存并贴票
    handleSaveTicket(params) {
      if (params.radio == 1 && params.orderSource == "QUNAR_OPEN") {
        let woniuParams = {};
        woniuParams.sourceOrderNo = params.sourceOrderNo;
        woniuParams.orderTaskId = this.$route.query.taskId;
        woniuParams.fundAccount = params.fundAccountId;
        woniuParams.userNameType = params.userNameType;
        woniuParams.orderType = params.orderType;
        woniuParams.amount = params.amount;
        woniuParams.ticketNoFlag = params.ticketNoFlag;
        this.woniuOrder(woniuParams);
      } else {
        let newParams = {};
        if (params) {
          newParams.accountId = params.accountId;
          newParams.amount = this.tableData.amount;
          newParams.thirdId = this.tableData.thirdId;
          newParams.flights = [
            {
              cabin: params.cabin,
              dptTime: params.dptTime,
              arr: params.arr,
              flightCode: params.flightCode,
              flightDate: params.flightDate,
              dpt: params.dpt
            }
          ];
          newParams.fundAccount = params.fundAccount;
          newParams.orderSource = params.orderSource;
          newParams.orderType = params.orderType;
          newParams.passengers = params.passengers;
          newParams.pid = "";
          newParams.remark = params.remark;
          newParams.rootOrderNo = this.tableData.rootOrderNo;
          newParams.sourceOrderNo = this.tableData.sourceOrderNo;
          newParams.transactionAmount = params.transactionAmount;
          newParams.createTime = params.createTime;
          newParams.ticketNoFlag = params.ticketNoFlag;
        }
        this.purchaseOrder(newParams);
      }
      this.handleTicketShow = false;
    },
    // 补退 补改 保存
    handleSavePurchase(params) {
      if (params.radio == 1 && params.orderSource == "QUNAR_OPEN") {
        let woniuParams = {};
        woniuParams.sourceOrderNo = params.sourceOrderNo;
        woniuParams.orderTaskId = this.$route.query.taskId;
        woniuParams.fundAccount = params.fundAccountId;
        woniuParams.userNameType = params.userNameType;
        woniuParams.orderType = params.orderType;
        woniuParams.amount = params.amount;
        this.woniuOrder(woniuParams);
      } else {
        if (params) {
          let newParams = {};
          newParams.accountId = params.accountId;
          newParams.amount = params.amount;
          newParams.thirdId = params.thirdId;
          newParams.flights = [
            {
              cabin: params.cabin,
              dptTime: params.dptTime,
              arr: params.arr,
              flightCode: params.flightCode,
              flightDate: params.flightDate,
              dpt: params.dpt
            }
          ];
          newParams.fundAccount = params.fundAccount;
          newParams.orderSource = params.orderSource;
          newParams.orderType = params.orderType;
          newParams.passengers = params.orderDetailList;
          newParams.pid = params.pid;
          newParams.remark = params.remark;
          newParams.rootOrderNo = params.rootOrderNo;
          newParams.sourceOrderNo = params.sourceOrderNo;
          newParams.transactionAmount = params.transactionAmount;
          newParams.createTime = params.createTime;
        }
        this.purchaseOrder(newParams);
      }
      this.fillOutRefundShow = false;
      this.fillOutChangeShow = false;
    },

    // 手工出票保存
    handleSave(params) {
      if (params.radio == 1 && params.orderSource == "QUNAR_OPEN") {
        let woniuParams = {};
        woniuParams.sourceOrderNo = params.sourceOrderNo;
        woniuParams.orderTaskId = this.$route.query.taskId;
        woniuParams.fundAccount = params.fundAccountId;
        woniuParams.userNameType = params.userNameType;
        woniuParams.orderType = params.orderType;
        woniuParams.amount = params.amount;
        this.woniuOrder(woniuParams);
      } else {
        let newParams = {};
        if (params) {
          newParams.accountId = params.accountId;
          newParams.amount = this.tableData.amount;
          newParams.thirdId = this.tableData.thirdId;
          newParams.flights = [
            {
              cabin: params.cabin,
              dptTime: params.dptTime,
              arr: params.arr,
              flightCode: params.flightCode,
              flightDate: params.flightDate,
              dpt: params.dpt
            }
          ];
          newParams.fundAccount = params.fundAccount;
          newParams.orderSource = params.orderSource;
          newParams.orderType = this.tableData.orderType;
          newParams.passengers = params.passengers;
          newParams.pid = "";
          newParams.remark = params.remark;
          newParams.rootOrderNo = this.tableData.rootOrderNo;
          newParams.sourceOrderNo = this.tableData.sourceOrderNo;
          newParams.transactionAmount = params.transactionAmount;
          newParams.createTime = params.createTime;
          if (params.ticketNoFlag) {
            newParams.ticketNoFlag = params.ticketNoFlag;
          }
        }
        this.purchaseOrder(newParams);
      }
      this.handleTicketShow = false;
    },
    // 非蜗牛补单
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
    // 蜗牛补单
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

    // 退票确定申请
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
    // 改签确定申请
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
        if (params.flightData[0].uniqKey) {
          newParams.uniqKey = params.flightData[0].uniqKey;
        } else {
          newParams.uniqKey = "";
        }

        if (params.flightData[0].gqFee) {
          newParams.gqFee = params.flightData[0].gqFee;
        } else {
          newParams.gqFee = "";
        }
        if (params.flightData[0].childUseFee) {
          newParams.childUseFee = params.flightData[0].childUseFee;
        } else {
          newParams.childUseFee = "";
        }
        if (params.flightData[0].flightNo) {
          newParams.flightNo = params.flightData[0].flightNo;
        } else {
          newParams.flightNo = "";
        }
        if (params.flightData[0].cabinCode) {
          newParams.cabinCode = params.flightData[0].cabinCode;
        } else {
          newParams.cabinCode = "";
        }
        if (params.flightData[0].childExtraPrice) {
          newParams.childExtraPrice = params.flightData[0].childExtraPrice;
        } else {
          newParams.childExtraPrice = "";
        }
        if (params.flightData[0].startDate) {
          newParams.startDate = params.flightData[0].startDate;
        } else {
          newParams.startDate = "";
        }
        if (params.flightData[0].startTime) {
          newParams.startTime = params.flightData[0].startTime;
        } else {
          newParams.startTime = "";
        }
        if (params.flightData[0].endTime) {
          newParams.endTime = params.flightData[0].endTime;
        } else {
          newParams.endTime = "";
        }
      }
      newParams.orderNo = this.purchaseOrderNo;
      if (this.$route.query.taskId) {
        newParams.orderTaskId = this.$route.query.taskId;
      }
      this.$store
        .dispatch("order/changeApply", newParams)
        .then(data => {
          if (data) {
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
    // 确认退票信息
    affirmRefundTicket(params) {
      this.$store
        .dispatch("order/affirmRefund", params)
        .then(data => {
          if (data.code == 0) {
            console.log(data);
            this.$message({
              type: "success",
              message: "确认退票成功！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 拒绝退款
    refundCheckRefuseReason(params) {
      this.$store
        .dispatch("order/refundCheckRefuseReason", params)
        .then(data => {
          if (data.code == 0) {
            console.log(data);
            this.$message({
              type: "success",
              message: "拒绝退款成功！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 乘客复选框选中处理
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
    // 系统出票跳转
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
    // 手工出票弹框
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

    // 任务提交
    taskSubmit() {
      let params = {};
      params.orderTaskId = this.$route.query.taskId;
      params.remark = this.taskRemarkData;
      this.$store
        .dispatch("orderTask/taskSubmit", params)
        .then(data => {
          if (data) {
            this.$message({
              type: "success",
              message: "改签申请成功！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 任务取消
    taskCancel() {
      if (!this.taskRemarkData) {
        this.$notify({
          title: "提示",
          message: "请填写取消任务的备注信息",
          type: "warning",
          duration: 4500
        });
        return;
      }
      let params = {};
      params.orderTaskId = this.$route.query.taskId;
      params.remark = this.taskRemarkData;
      this.$store
        .dispatch("orderTask/taskCancel", params)
        .then(data => {
          if (data) {
            this.$message({
              type: "success",
              message: "取消成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 任务备注
    taskRemark() {
      if (!this.taskRemarkData) {
        this.$notify({
          title: "提示",
          message: "请填写备注信息",
          type: "warning",
          duration: 4500
        });
        return;
      }
      let params = {};
      params.orderTaskId = this.$route.query.taskId;
      params.remark = this.taskRemarkData;
      this.$store
        .dispatch("orderTask/taskRemark", params)
        .then(data => {
          if (data) {
            this.$message({
              type: "success",
              message: "保存成功"
            });
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
    // 消息刷新
    getMessage() {
      this.$store
        .dispatch("order/getMessageDetail", this.sourceOrderNo)
        .then(data => {
          if (data) {
            this.messageData = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 获取html
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

    // 获取销售改签信息Html
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
    // 重填票号
    autoRewriteTicket(params) {
      this.$store
        .dispatch("order/autoRewriteTicket", params)
        .then(data => {
          if (data) {
            this.changeHtml = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取退票改签信息Html
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
    // 删除
    orderTreeRemove(row) {
      this.open(
        this.delete,
        row.orderNo,
        "此操作将删除该用户的所有信息, 是否继续?"
      );
    },
    // 删除
    delete(orderNo) {
      this.$store
        .dispatch("order/removeOne", { orderNo: orderNo })
        .then(data => {
          if (data) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message({
              type: "info",
              message: "删除失败!"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除提示
    open(func, data, message) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          func(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 退票弹框
    refundTicket(row) {
      this.purchaseOrderNo = row.sourceOrderNo;
      this.refundTicketShow = true;
    },
    // 改签弹框
    changeTicket(row) {
      this.purchaseOrderNo = row.sourceOrderNo;
      this.changeTicketShow = true;
      this.changeData = row;
    },
    // 补退弹框
    fillOutRefund(row) {
      this.fillOutRefundData = row;
      this.fillOutRefundShow = true;
    },
    // 补改弹框
    fillOutChange(row) {
      this.fillOutChangeData = row;
      this.fillOutChangeShow = true;
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
    this.getOrderDetail(this.orderNo);
    let params = {};
    if (this.$route.query.rootOrderNo) {
      params.rootOrderNo = this.$route.query.rootOrderNo;
    }
    params.category = 1;
    this.getOrderTree(params);
    this.timer = setInterval(() => {
      setTimeout(this.getOrderTree(params), 0);
    }, 5000);
  },
  // 离开页面销毁定时器
  beforeDestroy() {
    if (this.timer) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer); //关闭
    }
  },
  updated() {
    // 获取改签html里的信息
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

      let btnRewriteTicket = document.querySelector(
        "#changeHtmlOrderDetail .back-form .back-form-info .g-clear .mrl10"
      );
      // 重贴票号按钮事件
      var that = this;
      if (btnRewriteTicket) {
        btnRewriteTicket.onclick = function() {
          let params = {
            orderNo: that.sourceOrderNo,
            passengerName: "",
            ticketNo: ""
          };
          // that.autoRewriteTicket(params);
          console.log("重贴票号按钮事件");
        };
      }
    }
    if (this.refundHtml) {
      let refundConfirm = document.querySelector(
        '#refundHtmlOrderDetail [data-action="btn_confirm"]'
      );
      if (refundConfirm) {
        // 退款确认按钮事件
        var that = this;
        refundConfirm.onclick = function() {
          let refundRemark = document.querySelectorAll(
            "#refundHtmlOrderDetail #js_rticket_remark"
          )[0].value;
          let orderNo = document.querySelectorAll(
            "#refundHtmlOrderDetail #js_form_rt #orderNo"
          )[0].value;
          let ticketreturnstutas = document.querySelectorAll(
            "#refundHtmlOrderDetail #J_RefundStatus"
          )[0].value;
          let form = document.querySelectorAll(
            "#refundHtmlOrderDetail #js_form_rt #js_passanger_rt tbody tr td input[type='hidden']"
          );
          let str = "";
          Array.from(form).forEach(item => {
            str += item.value + "|";
          });
          let ticketNos = str.substring(0, str.length - 1);
          let params = {
            orderNo: orderNo,
            ticketNos: ticketNos,
            ticketreturnstutas: ticketreturnstutas,
            remark: refundRemark
          };
          that.affirmRefundTicket(params);
        };
      }
      // 拒绝退款按钮
      let refundReject = document.querySelector(
        '#refundHtmlOrderDetail [data-action="btn_reject"]'
      );
      if (refundReject) {
        var that = this;
        refundReject.onclick = function() {
          let from = document.getElementById("js_from_reject");
          that.newFromDialog = from.innerHTML;
          that.newFromDialogShow = true;
        };
      }
      // 拒绝退款弹框取消
      let btnRejectCancel = document.querySelector(
        "#refundTts [data-action='btn_reject_cancel']"
      );
      if (btnRejectCancel) {
        btnRejectCancel.onclick = function() {
          that.newFromDialogShow = false;
        };
      }
      //拒绝退款弹框确定
      let btnRejectAffirm = document.querySelector(
        "#refundTts [data-action='btn_reject_enter']"
      );
      if (btnRejectAffirm) {
        btnRejectAffirm.onclick = function() {
          let refuseRefundReason = document.querySelector(
            "#refundTts #js_refuse_refund_reason"
          ).value;
          let refuseRemark = document.querySelector("#refundTts #js_rj_remark")
            .value;

          let _orderNo = document.querySelector(
            "#refundTts .refuse-cause-cont input[type='hidden']"
          ).value;
          let params = {
            orderNo: _orderNo,
            refuseRefundReason: refuseRefundReason,
            remark: refuseRemark
          };

          if (refuseRefundReason == 0) {
            that.$message({
              type: "info",
              message: "请选择未及时退款原因"
            });
            return;
          }
          that.refundCheckRefuseReason(params);
          that.newFromDialogShow = false;
        };
      }
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