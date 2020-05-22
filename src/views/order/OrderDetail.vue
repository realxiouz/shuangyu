<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <el-row>
        <el-col :span="5">
          <el-button type="danger" @click="taskSubmit" size="mini">处理完成提交验证</el-button>
          <el-button type="primary" @click="taskCancel" size="mini">任务取消</el-button>
          <el-button type="warning" @click="goBack" size="mini">返回</el-button>
        </el-col>
        <el-col :span="14">
          <el-input v-model="updateRemark" placeholder="输入备注信息" class="input-with-select">
            <template slot="prepend">备注:</template>
            <el-button type="primary" @click="taskRemark" size="mini" slot="append">修改备注</el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <span class="collapse-title" slot="title">
          <span v-if="this.activeNames.indexOf('1')!=-1">收起</span>
          <span v-else>展开</span>
          <span style="font-size:larger;margin-left: 15px;font-weight: bolder;">销售单信息</span>
          <span style="font-size: 24px; margin: 0 20px; color: #ff4600;">{{orderDetail_orderState}}</span>
          <span style="color: #F56C6C">{{orderDetail_orderComment}}</span>
          <span v-if="taskRemarkData" style="color: red;font-size: 14px">任务备注：{{taskRemarkData}}</span>
        </span>
        <div style="padding: 20px">
          <el-row :gutter="20">
            <div style="margin-bottom:15px;">
              <el-button type="danger" @click="lockOrder" size="mini">锁单</el-button>
              <el-button type="primary" @click="unLockOrder" size="mini">解锁订单</el-button>
              <el-button type="warning" @click="useGoTicket" size="mini">调用出票中</el-button>
            </div>
            <div></div>
            <el-form :model="tableData" label-width="130px" size="mini">
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="订单编号:">
                  <span>{{tableData.orderNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="订单类型:">
                  <span>{{formatOrderType(tableData)}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="原单号:">
                  <span>{{tableData.sourceOrderNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="订单总金额:">
                  <span>￥{{this.$numeral(tableData.amount).format('0.00')}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="交易金额:">
                  <span>￥{{this.$numeral(tableData.transactionAmount).format('0.00')}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="订单状态:">
                  <span>{{formatStatus(tableData)}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="订单分类:">
                  <span>{{formatCategory(tableData)}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item class="deadlineTicketTime" label="最晚出票时限:">
                  <span>{{formatDate(tableData.deadlineTicketTime,'YYYY-MM-DD HH:mm:ss')}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="操作员:">
                  <span v-if="this.fullName">{{this.fullName}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="进单类型:">
                  <span>D</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="行程单:">
                  <span>否</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="URL:">
                  <span>0</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="报价类型:">
                  <span>{{0}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="fee:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="政策代码:">
                  <span>{{tableData.policyCode}}</span>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <el-divider content-position="left">航班信息</el-divider>
          <el-table :data="flightData" size="mini" highlight-current-row style="width: 100%;" fit>
            <el-table-column prop="dpt" label="出发机场" width="160" align="center"></el-table-column>
            <el-table-column prop="arr" label="到达机场" width="160" align="center"></el-table-column>
            <el-table-column prop="airlineCode" label="航司" width="50" align="center"></el-table-column>
            <el-table-column prop="flightCode" label="航班号" width="100" align="center"></el-table-column>
            <el-table-column label="机建 / 燃油" width="100" align="center">
              <template slot-scope="scope">
                <span>{{ formateConstructionFee(scope.row) }}</span>
              </template>
            </el-table-column>
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
          <el-divider content-position="left">乘机人信息</el-divider>
          <el-table
            :data="passengerDataTable"
            size="mini"
            highlight-current-row
            style="width: 100%;"
            @selection-change="handleSelectionChange"
            fit
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="乘机人" width="100" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" width="100" align="center"></el-table-column>

            <el-table-column
              prop="ageType"
              :formatter="formatAgeType"
              label="乘客类型"
              width="250"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="cardType"
              :formatter="formatCardType"
              label="证件类型"
              width="250"
              align="center"
            ></el-table-column>
            <el-table-column prop="cardNo" label="证件号码" width="300" align="center"></el-table-column>
            <el-table-column label="出生年月" width="110" align="center">
              <template slot-scope="scope">
                <span>{{ formatDate(scope.row.birthday,'YYYY-MM-DD') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="票面价" align="center">
              <template slot-scope="scope">
                <span>{{formatAmount(scope.row.viewPrice)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="应收金额" align="center">
              <template slot-scope="scope">
                <span>{{formatAmount(scope.row.amount)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="margin-top:20px">
            <el-button
              v-if="this.tableData.orderType==10"
              type="primary"
              @click="goTicket"
              size="mini"
            >系统出票
            </el-button>
            <el-button type="primary" v-if="taskType!=2" @click="handleTicket" size="mini">手工出票</el-button>
          </el-row>
          <div style="margin-top:15px;">
            <span style="font-weight:700;font-size:15px;">退改说明：</span>
            <div
              style=" margin-top:10px;font-size:14px; line-height:1.5;"
              v-html="refundChangeRule"
            ></div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <span class="collapse-title" slot="title">
          <span v-if="this.activeNames.indexOf('2')!=-1">收起</span>
          <span v-else>展开</span>
          <span style="font-size:larger;margin-left: 15px;font-weight: bolder;">销售单消息</span>
        </span>
        <div style="padding: 20px">
          <el-button type="primary" size="mini" style="margin-bottom:15px" @click="getMessage">刷新</el-button>
          <div style="margin-top:15px;" id="messageHtml">
            <span v-if="this.messageData" v-html="this.messageData"></span>
            <span v-else>暂无数据</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item v-if="this.tableData.orderType !='10'" name="3">
        <span class="collapse-title" slot="title">
          <span v-if="this.activeNames.indexOf('3')!=-1">收起</span>
          <span v-else>展开</span>
          <span
            v-if="this.tableData.orderType=='30'|| this.tableData.orderType=='31'"
            style="font-size:larger;margin-left: 15px;font-weight: bolder;"
          >改签</span>
          <span v-else style="font-size:larger;margin-left: 15px;font-weight: bolder;">退票</span>
        </span>
        <div style="padding: 20px">
          <el-button type="primary" style="margin-bottom:15px;" size="mini" @click="refreshHtml">刷新</el-button>
          <div id="changeHtmlOrderDetail">
            <span v-if="this.changeHtml" v-html="this.changeHtml"></span>
          </div>
          <div id="refundHtmlOrderDetail">
            <span v-if="this.refundHtml" v-html="this.refundHtml"></span>
          </div>
          <div>
            <span v-if="this.changeHtml&& this.refundHtml">暂无数据</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <span class="collapse-title" slot="title">
          <span v-if="this.activeNames.indexOf('4')!=-1">收起</span>
          <span v-else>展开</span>
          <span style="font-size:larger;margin-left: 15px;font-weight: bolder;">采购单信息</span>
        </span>
        <div style="padding: 20px">
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom:15px"
            @click="refreshPurchase"
          >刷新
          </el-button>
          <el-table
            size="mini"
            :data="orderTree"
            highlight-current-row
            row-key="orderNo"
            :default-expand-all="true"
            fit
            :tree-props="{children: 'children', hasChildren: '*****'}"
          >
            <el-table-column prop="orderNo" align="center" label="订单号" width="170"></el-table-column>
            <el-table-column prop="sourceOrderNo" align="center" width="150" label="源单号"></el-table-column>
            <el-table-column prop="status" :formatter="formatStatus" label="订单状态" width="80"></el-table-column>
            <el-table-column prop="orderSource" align="center" width="120" label="供应商"></el-table-column>
            <el-table-column prop="accountId" align="center" label="账号" width="100">
              <template slot-scope="scope">
                <span v-html="formatAccount(scope.row)"></span>
              </template>
            </el-table-column>
            <el-table-column label="乘机人 - 票号" align="center" width="170">
              <template slot-scope="scope">
                <span v-html="formatPassengersTicket(scope.row.orderDetailList)"></span>
              </template>
            </el-table-column>
            <el-table-column label="证件类型" align="center" width="80">
              <template slot-scope="scope">
                <span v-html="formatCardType2(scope.row.orderDetailList)"></span>
              </template>
            </el-table-column>
            <el-table-column label="证件号码" align="center" width="150">
              <template slot-scope="scope">
                <span v-html="formatCardNo(scope.row.orderDetailList)"></span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" align="center" width="90" label="出票时间">
              <template slot-scope="scope">
                <span>{{ formatDate(scope.row.createTime,'YYYY-MM-DD') }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" align="center" label="应付金额">
              <template slot-scope="scope">
                <span>{{ formatAmount(scope.row.amount)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="航班号" align="center" width="70">
              <template slot-scope="scope">
                <span>{{ formatFlightNo(scope.row.flights)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="舱位" align="center" width="60">
              <template slot-scope="scope">
                <span>{{ formatCabin(scope.row.flights)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="航班日期" align="center" width="90">
              <template slot-scope="scope">
                <span>{{ formatFlightDate(scope.row.flights)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" align="center" width="200" label="备注"></el-table-column>
            <el-table-column prop="address" align="center" fixed="right" width="400" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="orderTreeRemove(scope.row)"
                  v-show="scope.row.processCategory=='1'"
                  size="mini"
                >删除
                </el-button>
                <el-button
                  type="primary"
                  v-show="woniuPerateButton(scope.row)"
                  @click="refundTicket(scope.row)"
                  size="mini"
                >退票
                </el-button>
                <el-button
                  type="primary"
                  v-show="woniuPerateButton(scope.row)"
                  @click="changeTicket(scope.row)"
                  size="mini"
                >改签
                </el-button>
                <el-button
                  type="primary"
                  v-show="woniuPerateButton(scope.row) && taskType=='4'"
                  @click="intercept(scope.row)"
                  size="mini"
                >拦截
                </el-button>
                <el-button type="primary" @click="fillOutRefund(scope.row)" size="mini">补退</el-button>
                <el-button type="primary" @click="fillOutChange(scope.row)" size="mini">补改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
      <el-collapse-item name="5">
        <span slot="title" class="collapse-title">
          <span v-if="this.activeNames.indexOf('5')!=-1">收起</span>
          <span v-else>展开</span>
          <span style="font-size:larger;margin-left: 15px;font-weight: bolder;">操作日志</span>
        </span>
        <div style="padding: 20px">
          <el-button
            type="primary"
            @click="refreshTaskLog"
            style="margin-bottom:15px;"
            size="mini"
          >刷新
          </el-button>
          <div>
            <el-table :data="taskLogData.logs" size="mini" highlight-current-row fit>
              <el-table-column type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="name" label="操作员" width="80" align="center"></el-table-column>
              <el-table-column prop="time" align="center" width="180" label="操作时间">
                <template slot-scope="scope">
                  <span>{{ formatDate(scope.row.time,'YYYY-MM-DD HH:mm:ss') }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="content" align="left" label="操作内容"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div>
      <el-dialog
        title="手工出票"
        center
        :visible.sync="handleTicketShow"
        width="66%"
        :close-on-click-modal="false"
      >
        <handle-ticket
          v-if="handleTicketShow"
          @onCancel="onCancel"
          @onSaveTicket="handleSaveTicket"
          @onSave="handleSave"
          :passengerData="handlePassengersInfo"
          :salesAmountTotal="this.tableData.amount"
          :flightData="flightData"
          :sell-amount="ticketSellAmount"
          :task-type="taskType"
        ></handle-ticket>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="蜗牛退票申请"
        center
        :visible.sync="refundTicketShow"
        width="66%"
        :close-on-click-modal="false"
      >
        <refund-ticket
          v-if="refundTicketShow"
          @onCancel="onCancel"
          @onSaveRefund="handleSaveRefund"
          :refundChangeRule="refundChangeRule"
          :refundpassengers="refundpassengers"
          :refundData="refundData"
          :sellAmount="sellAmount"
          :getRefundHtmlData="getRefundHtmlData"
        ></refund-ticket>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="蜗牛改签申请"
        center
        :visible.sync="changeTicketShow"
        width="66%"
        :close-on-click-modal="false"
      >
        <change-ticket
          v-if="changeTicketShow"
          :refundChangeRule="refundChangeRule"
          :changeData="changeData"
          :changeDataTop="changeDataTop"
          :sellAmount="changeSellAmount"
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
        width="66%"
        :close-on-click-modal="false"
      >
        <fillOut-refund
          v-if="fillOutRefundShow"
          :fillOutRefundData="fillOutRefundData"
          :sell-amount="sellAmount"
          :task-type="taskType"
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
        width="66%"
        :close-on-click-modal="false"
      >
        <fillOut-change
          v-if="fillOutChangeShow"
          :fillOutChangeData="fillOutChangeData"
          :sell-amount="changeSellAmount"
          :task-type="taskType"
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
    <div>
      <el-dialog
        title="重贴票号"
        center
        :visible.sync="rewriteTicketShow"
        width="33%"
        :close-on-click-modal="false"
      >
        <div v-if="rewriteTicketShow">
          <el-form label-width="110px" class="demo-ruleForm">
            <el-form-item label="重新填的票号：">
              <el-input placeholder="请输入重新填的票号" v-model="ticketNoData" clearable></el-input>
            </el-form-item>
          </el-form>
          <div style="margin-top: 25px;text-align: right;">
            <el-button size="mini" @click="onCancel">取 消</el-button>
            <el-button size="mini" @click="rewriteTicketSave" type="primary">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="改签支付"
        center
        :visible.sync="changePayShow"
        width="33%"
        :close-on-click-modal="false"
      >
        <div>
          <el-form size="mini" label-width="110px" class="demo-ruleForm">
            <el-form-item label="本次改签需支付金额：">
              <span>{{changePayData.totalAmount }}</span>
            </el-form-item>
            <el-form-item label="本次改签盈亏值：">
              <span>{{systemProfitAndLossValue }}</span>
            </el-form-item>
            <el-form-item label="盈亏值：">
              <el-input v-model="profitAndLossValue" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 25px;text-align: right;">
          <el-button size="mini" @click="onCancel">取 消</el-button>
          <el-button size="mini" @click="changePaySave" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="拒绝改签原因"
        center
        :visible.sync="refuseReasonShow"
        width="33%"
        :close-on-click-modal="false"
      >
        <div>
          <el-form :model="refuseFormdata" size="mini" label-width="110px">
            <el-form-item label="拒绝改签原因">
              <el-select
                placeholder="请选择拒绝改签原因"
                v-model="refuseFormdata.refuseReasonType"
                style="width:100%;"
              >
                <el-option label="特价机票不支持改签" value="4"></el-option>
                <el-option label="改签费用不符" value="9"></el-option>
                <el-option label="建议用户联系航司改签" value="10"></el-option>
                <el-option label="无法改签-用户已自行改签或机票被使用" value="11"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入备注..."
                v-model="refuseFormdata.refuseReason"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 25px;text-align: right;">
          <el-button size="mini" @click="onCancel">取 消</el-button>
          <el-button size="mini" @click="submitRefuseReason" type="primary">确定</el-button>
        </div>
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
    formatOrderType,
    formatCategory,
    formatStatus,
    formatAgeType,
    formatCardType
  } from "@/utils/status.js";
  import {
    formatPassengers,
    formatTicketNo,
    formatFlightDate,
    formatFlightNo,
    formatCabin,
    formatFlight,
    formatAmount
  } from "@/utils/orderFormdata.js";

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
        rewriteTicketShow: false,
        refuseReasonShow: false,
        changePayShow: false,
        changePayData: {},
        systemProfitAndLossValue: 0,
        profitAndLossValue: 0,
        rootOrderNo: "",
        ticketNoData: "",
        newFromDialog: "",
        fillOutRefundData: "",
        fillOutChangeData: {},
        getRefundHtmlData: {},
        changeHtml: "",
        refundHtml: "",
        messageData: "",
        flightData: [],
        passengerDataTable: [],
        tableData: {},
        passengersInfo: [],
        handlePassengersInfo: [],
        sellOrderType: "",
        orderTree: [],
        sourceOrderNo: "",
        refundData: "",
        sellAmount: "",
        ticketSellAmount: "",
        changeSellAmount: "",
        purchaseOrderNo: "",
        refundChangeRule: "",
        refundpassengers: "",
        taskRemarkData: this.$route.query.remark,
        updateRemark: "",
        timer: null,
        changeData: "",
        orderNo: this.$route.query.orderNo,
        taskType: this.$route.query.taskType,
        taskId: this.$route.query.taskId,
        fullName: this.$route.query.fullName,
        changeDataTop: {
          reason: "",
          flight: "",
          flightDate: "",
          passagers: [],
          airDivision: "",
          arrivalTime: "",
          flightNum: "",
          departureTime: ""
        },
        refuseFormdata: {
          refuseReasonType: "",
          refuseReason: ""
        },
        rewriteTicketData: {
          orderNo: "",
          passengerId: "",
          ticketNo: "",
          groupCheckOut: "",
          groupCheckIn: "",
          lastProductId: ""
        },
        activeNames: ["1", "2", "3", "4", "5"],
        //订单详情状态
        orderDetail_orderState: "",
        //订单详情意见及备注
        orderDetail_orderComment: "",
        //订单详情触发定时器
        detailInfoTimer: null,
        taskLogData: "", //操作日志数据
        supplierAccountData: []
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
      formatOrderType,
      formatStatus,
      formatCategory,
      formatAgeType,
      formatCardType,
      formatPassengers,
      formatTicketNo,
      formatFlightDate,
      formatFlightNo,
      formatCabin,
      formatFlight,
      formatAmount,
      // 刷新任务操作日志
      refreshTaskLog() {
        this.getOneTaskLog();
      },
      //获取任务操作日志
      getOneTaskLog() {
        this.$store
          .dispatch("orderTask/getTaskInfo", this.taskId)
          .then(data => {
            if (data) {
              this.taskLogData = data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //蜗牛展示按钮
      woniuPerateButton(row) {
        var flag = false;
        if (
          row.orderSource == "QUNAR_OPEN" ||
          row.merchantId == "d381a4abdfa643fea6be8736dd11c1e1" ||
          row.merchantId == "746807b6d2ad40428d36b66d7bb8a79c"
        ) {
          flag = true;
        }
        return flag;
      },
      // 获取详情信息
      getOrderDetail(orderNo) {
        this.$store
          .dispatch("order/getOrderDetail", orderNo)
          .then(data => {
            if (data) {
              this.tableData = data;
              this.sellAmount = data.amount;
              this.refundChangeRule = data.refundChangeRule;
              this.sourceOrderNo = data.sourceOrderNo;
              this.rootOrderNo = data.rootOrderNo;
              if (data.rootOrderNo) {
                this.getOrderTree();
              }
              this.getMessage();
              this.sellOrderType = data.orderType;
              this.getMessageHtml();
              if (data.passengers) {
                this.passengerDataTable = data.passengers;
              }
              if (data.flights) {
                this.flightData = data.flights;
              }
              this.triggerDetailInfoTimer();
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
        this.rewriteTicketShow = false;
        this.changePayShow = false;
        this.refuseReasonShow = false;
      },
      // 退票弹框
      refundTicket(row) {
        this.purchaseOrderNo = row.sourceOrderNo;
        this.refundData = row;
        this.refundTicketShow = true;
      },
      // 改签弹框
      changeTicket(row) {
        this.purchaseOrderNo = row.sourceOrderNo;
        this.changeData = row;
        this.changeTicketShow = true;
      },
      // 补退弹框
      fillOutRefund(row) {
        // console.log(row)
        this.fillOutRefundData = Object.assign({}, row);
        this.fillOutRefundShow = true;
      },
      // 补改弹框
      fillOutChange(row) {
        this.fillOutChangeData = Object.assign({}, row);
        this.fillOutChangeShow = true;
      },
      // 拦截
      intercept(row) {
        let params = {};
        let arr = [];
        row.orderDetailList.forEach(item => {
          arr.push(item.name);
        });
        params.orderNo = row.sourceOrderNo;
        params.passengerNames = arr;
        this.$store
          .dispatch("order/interceptOrder", params)
          .then(data => {
            if (data) {
              console.log(data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },

      // 手工出票保存并贴票
      handleSaveTicket(params) {
        let newParams = {};
        if (params) {
          newParams.merchantId = params.merchantId;
          newParams.accountId = params.accountId;
          newParams.amount = params.amount;
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
          newParams.orderTaskId = this.$route.query.taskId;
          newParams.rootOrderNo = this.tableData.rootOrderNo;
          newParams.sourceOrderNo = params.sourceOrderNo;
          newParams.transactionAmount = params.transactionAmount;
          newParams.createTime = params.createTime;
          newParams.ticketNoFlag = params.ticketNoFlag;
        }
        this.purchaseOrder(newParams);
      },
      // 补退 补改 保存
      handleSavePurchase(params) {
        if (
          params.radio == 1 &&
          (params.orderSource == "QUNAR_OPEN" ||
            params.merchantId == "d381a4abdfa643fea6be8736dd11c1e1" ||
            params.merchantId == "746807b6d2ad40428d36b66d7bb8a79c")
        ) {
          let woniuParams = {};
          woniuParams.sourceOrderNo = params.sourceOrderNo;
          woniuParams.orderTaskId = this.$route.query.taskId;
          woniuParams.fundAccount = params.fundAccount;
          woniuParams.userNameType = params.userNameType;
          woniuParams.orderType = params.orderType;
          woniuParams.amount = params.amount;
          this.woniuOrder(woniuParams);
        } else {
          let newParams = {};
          if (params) {
            newParams.merchantId = params.merchantId;
            newParams.accountId = params.accountId;
            newParams.amount = params.amount;
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
            newParams.orderTaskId = this.$route.query.taskId;
            newParams.sourceOrderNo = params.sourceOrderNo;
            newParams.createTime = params.createTime;
            newParams.finishTime = params.finishTime;
          }
          this.purchaseOrder(newParams);
        }
      },
      // 手工出票保存
      handleSave(params) {
        if (
          params.radio == 1 &&
          (params.orderSource == "QUNAR_OPEN" ||
            params.merchantId == "d381a4abdfa643fea6be8736dd11c1e1" ||
            params.merchantId == "746807b6d2ad40428d36b66d7bb8a79c")
        ) {
          let woniuParams = {};
          woniuParams.sourceOrderNo = params.sourceOrderNo;
          woniuParams.orderTaskId = this.$route.query.taskId;
          woniuParams.fundAccount = params.fundAccount;
          woniuParams.merchantId = params.merchantId;
          woniuParams.accountId = params.accountId;
          woniuParams.userNameType = params.userNameType;
          woniuParams.orderType = params.orderType;
          woniuParams.amount = params.amount;
          this.woniuOrder(woniuParams);
        } else {
          let newParams = {};
          if (params) {
            newParams.amount = params.amount;
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
            newParams.orderTaskId = this.$route.query.taskId;
            newParams.remark = params.remark;
            newParams.rootOrderNo = this.tableData.rootOrderNo;
            newParams.sourceOrderNo = params.sourceOrderNo;
            newParams.createTime = params.createTime;
            newParams.merchantId = params.merchantId;
            newParams.accountId = params.accountId;
            if (params.ticketNoFlag) {
              newParams.ticketNoFlag = params.ticketNoFlag;
            }
          }
          this.purchaseOrder(newParams);
        }
      },
      // 非蜗牛补单
      purchaseOrder(params) {
        this.$store
          .dispatch("order/purchaseOrder", params)
          .then(data => {
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.onCancel();
              this.timeOutGetOrderTree();
            } else {
              this.$message({
                type: "success",
                message: data.msg
              });
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
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.onCancel();
              this.timeOutGetOrderTree();
            } else {
              this.$message({
                type: "success",
                message: data.msg
              });
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
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "退票申请成功！"
              });
              this.onCancel();
              this.timeOutGetOrderTree();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 改签确定申请
      handleSaveChange(params) {
        let newParams = {};
        if (params) {
          newParams.appKey = params.appKey;
          newParams.passengerIds = params.passengerIds;
          newParams.changeCauseId = String(params.changeCauseId);
          newParams.totalAmount = params.totalAmount;
          newParams.applyRemarks = params.applyRemarks;
        }
        if (params.flightData) {
          if (params.flightData[0].uniqKey) {
            newParams.uniqKey = params.flightData[0].uniqKey;
          } else {
            newParams.uniqKey = "";
          }
          if (params.flightData[0].upgradeFee) {
            newParams.upgradeFee = params.flightData[0].upgradeFee;
          } else {
            newParams.upgradeFee = "";
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
          if (params.flightData[0].changeDate) {
            newParams.startDate = params.flightData[0].changeDate;
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
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "改签申请成功！"
              });
              this.onCancel();
              this.changePay(data.data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //改签支付弹框
      changePay(params) {
        console.log("支付参数:" + JSON.stringify(params));
        this.changePayData = params;
        this.systemProfitAndLossValue =
          this.sellAmount - this.changePayData.totalAmount;
        this.changePayShow = true;
      },
      //改签支付
      changePaySave() {
        if (this.systemProfitAndLossValue != this.profitAndLossValue) {
          this.$message({
            type: "warning",
            message: "盈亏值填写错误！"
          });
          return;
        }
        this.$store
          .dispatch("order/changePay", this.changePayData)
          .then(data => {
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "改签支付成功！"
              });
              this.onCancel();
              this.timeOutGetOrderTree();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //延时获取采购树
      timeOutGetOrderTree() {
        let num = 0;
        var second = 3;
        const timer = setInterval(() => {
          if (num < second) {
            num++;
          } else {
            clearInterval(timer);
            this.getOrderTree();
          }
        }, 1000);
      },
      //拒绝改签
      rejectChange(_params) {
        this.$store
          .dispatch("order/rejectChange", {params: _params})
          .then(data => {
            if (data) {
              console.log(data);
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              this.getRefundHtml();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },

      // 受理改签
      processingChangeTicket(_params) {
        this.$store
          .dispatch("order/processingChange", {params: _params})
          .then(data => {
            if (data.code == 0) {
              console.log(data);
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              this.getMessageHtml();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 拒绝改签确认
      submitRefuseReason() {
        let passagerIds = document.querySelectorAll(
          ".box-content input[name='passagerIds']"
        );
        let paramsStr = "";
        Array.from(passagerIds).forEach(item => {
          paramsStr += "passagerIds" + "=" + item.value + "&";
        });
        let gqFeesData = document.querySelector(
          ".box-content input[name='gqFees']"
        ).value;
        let gqFeesStr = "";
        gqFeesStr += "gqFees" + "=" + gqFeesData + "&";

        let upgradeFeesData = document.querySelector(
          ".box-content input[name='upgradeFees']"
        ).value;
        let upgradeFeesStr = "";
        upgradeFeesStr += "upgradeFees" + "=" + upgradeFeesData + "&";

        let gqStatusData = document.querySelector(
          ".box-content input[name='gqStatus']"
        ).value;
        let gqStatusStr = "";
        gqStatusStr += "gqStatus" + "=" + gqStatusData + "&";

        let _paramsStr = "";
        _paramsStr +=
          "domain=" +
          this.sourceOrderNo.substring(0, 3) +
          ".trade.qunar.com" +
          "&" +
          "refuseReasonType=" +
          this.refuseFormdata.refuseReasonType +
          "&" +
          "refuseReason=" +
          this.refuseFormdata.refuseReason +
          "&" +
          paramsStr +
          gqFeesStr +
          upgradeFeesStr +
          gqStatusStr +
          "orderNo=" +
          this.sourceOrderNo;
        console.log(_paramsStr);
        this.rejectChange(_paramsStr);
        this.refuseReasonShow = false;
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
              this.getRefundHtml();
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
              this.getRefundHtml();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 乘客复选框选中处理
      handleSelectionChange(_passengersInfo) {
        console.log(_passengersInfo, "_passengersInfo");
        let ticketAmount = 0;
        _passengersInfo.forEach(item => {
          console.log(item.amount, "item.amount");

          ticketAmount += Number(item.amount);
        });
        this.ticketSellAmount = ticketAmount;
        console.log(this.ticketSellAmount, "ticketSellAmount");
        let arr = [];
        for (let i = 0; i < _passengersInfo.length; i++) {
          this.tableData.orderDetailList.forEach(item => {
            if (item.cardNo == _passengersInfo[i].cardNo) {
              arr.push(item);
            }
          });
        }
        this.passengersInfo = [...arr];
        let handleArr = [];
        handleArr = [..._passengersInfo];
        let temp = [];
        handleArr.map(item => {
          let obj = {
            ageType: item.ageType,
            birthday: item.birthday,
            cardNo: item.cardNo,
            cardType: item.cardType,
            gender: item.gender,
            name: item.name,
            viewPrice: item.viewPrice,
            _amount: item.amount
          };
          temp.push(obj);
        });
        this.handlePassengersInfo = temp;
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
              orderTaskId: this.$route.query.taskId,
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
        }
        this.handleTicketShow = true;
      },
      // 获取采购单信息
      getOrderTree() {
        let params = {};
        params.rootOrderNo = this.rootOrderNo;
        params.category = 1;
        this.$store
          .dispatch("order/getOrderTree", params)
          .then(data => {
            if (data) {
              this.orderTree = data;
              this.getSupplierAccount(data[0].merchantId);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 获取供应商账号
      getSupplierAccount(value) {
        this.$store
          .dispatch("firmAccount/getList", {
            filter: {firmId: value}
          })
          .then(data => {
            this.supplierAccountData = data;
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
          });
      },
      formatAccount(data) {
        if (data.orderSource == "QUNAR_OPEN") {
          return data.accountId;
        } else {
          let str = "";
          this.supplierAccountData.forEach(item => {
            if (item.accountId == data.accountId) {
              str += item.username;
            }
          });
          return str;
        }
      },
      // 任务提交
      taskSubmit() {
        let params = {};
        params.orderTaskId = this.$route.query.taskId;
        params.remark = this.updateRemark;
        this.$store
          .dispatch("orderTask/taskSubmit", params)
          .then(data => {
            if (data) {
              this.$message({
                type: "success",
                message: "提交验证成功！"
              });
              this.goBack();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 任务取消
      taskCancel() {
        if (!this.updateRemark) {
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
        params.remark = this.updateRemark;
        this.$store
          .dispatch("orderTask/taskCancel", params)
          .then(data => {
            if (data) {
              this.$message({
                type: "success",
                message: "取消成功"
              });
              this.goBack();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 任务备注
      taskRemark() {
        if (!this.updateRemark) {
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
        params.remark = this.updateRemark;
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
      // 退/改html刷新
      refreshHtml() {
        this.getMessageHtml();
      },
      //刷新采购单信息
      refreshPurchase() {
        this.getOrderTree();
      },
      // 获取html
      getMessageHtml() {
        if (
          this.sellOrderType == 20 ||
          this.sellOrderType == 21 ||
          this.sellOrderType == 22 ||
          this.sellOrderType == 23
        ) {
          this.getRefundHtml();
        } else if (this.sellOrderType == 30 || this.sellOrderType == 31) {
          this.getChangeHtml();
        }
      },
      // 获取销售改签信息Html
      getChangeHtml() {
        this.$store
          .dispatch("order/getChangeHtml", this.sourceOrderNo)
          .then(data => {
            if (data) {
              this.changeHtml = data;
              let _arr = [];
              this.tableData.passengers.forEach(item => {
                if (this.changeHtml.indexOf(item.name) != -1) {
                  _arr.push(item);
                }
              });
              this.changeDataTop.passagers = _arr;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 重填票号
      rewriteTicket(params) {
        this.$store
          .dispatch("order/rewriteTicket", params)
          .then(data => {
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.onCancel();
              this.getChangeHtml();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      rewriteTicketSave() {
        this.rewriteTicketData.orderNo = this.sourceOrderNo;
        this.rewriteTicketData.ticketNo = "+" + this.ticketNoData;
        this.rewriteTicket(this.rewriteTicketData);
      },
      // 获取退票改签信息Html
      getRefundHtml() {
        this.$store
          .dispatch("order/getRefundHtml", this.sourceOrderNo)
          .then(data => {
            if (data) {
              this.refundHtml = data;
              let temp = [];
              this.tableData.passengers.forEach(item => {
                if (this.refundHtml.indexOf(item.name) != -1) {
                  temp.push(item);
                }
              });
              this.refundpassengers = temp;
              console.log(this.refundpassengers, "refundpassengers");
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      qunarDetailHtml() {
        this.$store
          .dispatch("order/qunarDetailHtml", {
            sourceOrderNo: this.sourceOrderNo
          })
          .then(data => {
            if (data) {
              let el = document.createElement("div");
              el.innerHTML = data.split("script>\n")[1];
              this.orderDetail_orderState = el.querySelector(
                "#j-switch-form > div.b-bkifo.g-clear > div.e-bkifo-rt > div > h1"
              ).textContent;
              let orderComment = el.querySelector(
                "#j-switch-orderBook > form.j-passenger > div.btn-box.j-ticket-btn > span.light > div"
              ).textContent;
              if (orderComment) {
                this.orderDetail_orderComment = orderComment;
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      triggerDetailInfoTimer() {
        //先执行一次，然后触发定时器。
        this.qunarDetailHtml();
        this.detailInfoTimer = setInterval(() => {
          this.qunarDetailHtml();
        }, 30000);
      },
      // 删除
      orderTreeRemove(row) {
        let params = {};
        params.orderId = row.orderNo;
        params.orderTaskId = this.taskId;
        this.open(this.delete, params, "此操作将删除该订单的信息, 是否继续?");
      },
      // 删除
      delete(params) {
        this.$store
          .dispatch("orderTask/removeTaskOrder", params)
          .then(data => {
            if (data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.timeOutGetOrderTree();
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
      // 格式化日期
      initDate(dateStr, format) {
        if (dateStr > 0) {
          let date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      },
      formatPassengersTicket(data) {
        if (!data || data.length == 0) {
          return "";
        }
        let str = "";
        data.forEach(item => {
          str += item.name + " - " + item.ticketNo + "<br/>";
        });
        return str;
      },
      formatCardType2(data) {
        if (!data || data.length == 0) {
          return "";
        }
        let str = "";
        data.forEach(item => {
          str += this.formatCardType(item) + "<br/>";
        });
        return str;
      },
      formatCardNo(data) {
        if (!data || data.length == 0) {
          return "";
        }
        let str = "";
        data.forEach(item => {
          str += item.cardNo + "<br/>";
        });
        return str;
      },
      formateConstructionFee(data) {
        if (!data) {
          return "";
        }
        let str = "";
        str += data.constructionFee + " / " + data.fuelTax;
        return str;
      }
    },
    created() {
      this.getOrderDetail(this.orderNo);
      this.getOneTaskLog();
    },
    // 离开页面销毁定时器
    beforeDestroy() {
      if (this.timer) {
        //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
      }
      if (this.detailInfoTimer) {
        clearInterval(this.detailInfoTimer);
      }
    },
    // 获取改签html里的信息
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
        let gqFeesAmount = 0;
        document.getElementsByName("gqFees").forEach(item => {
          gqFeesAmount += Number(item.value);
        });
        let upgradeFeesAmount = 0;
        document.getElementsByName("upgradeFees").forEach(item => {
          upgradeFeesAmount += Number(item.value);
        });
        this.changeSellAmount = Number(gqFeesAmount) + Number(upgradeFeesAmount);
        let btnRewriteTickets = document.querySelectorAll(
          "#changeHtmlOrderDetail .back-form .back-form-info .g-clear .mrl10 .j-reset-ticket"
        );
        // 重贴票号按钮事件
        var that = this;
        if (btnRewriteTickets) {
          Array.from(btnRewriteTickets).forEach(item => {
            item.onclick = function () {
              that.rewriteTicketData.passengerId = item.getAttribute(
                "data-passenger-id"
              );
              that.rewriteTicketData.groupCheckOut = item.getAttribute(
                "data-group-check-out"
              );
              that.rewriteTicketData.groupCheckIn = item.getAttribute(
                "data-group-check-in"
              );
              that.rewriteTicketData.lastProductId = item.getAttribute(
                "data-last-product-id"
              );
              that.rewriteTicketShow = true;
            };
          });
        }
        //受理改签
        let changeConfirm = document.querySelector(
          '#changeHtmlOrderDetail [data-action="accept"]'
        );
        if (changeConfirm) {
          changeConfirm.onclick = function () {
            let inputData = document.querySelectorAll(
              "#changeHtmlOrderDetail .box-content input"
            );
            let _paramsStr = "";
            Array.from(inputData).forEach(item => {
              _paramsStr += [item.name] + "=" + item.value + "&";
            });
            _paramsStr +=
              "groupCheckOut=true&groupCheckIn=false&orderNo=" +
              that.sourceOrderNo;
            that.processingChangeTicket(_paramsStr);
          };
        }

        //拒绝改签弹框
        let changeReject = document.querySelector(
          '#changeHtmlOrderDetail [data-action="reject"]'
        );
        if (changeReject) {
          changeReject.onclick = function () {
            that.refuseReasonShow = true;
          };
        }
      }
      // 退票Html操作
      if (this.refundHtml) {
        this.getRefundHtmlData.reason = document.querySelector(
          "#refundHtmlOrderDetail #js_form_rm .js_box_content .refund-ticket-info-row .refund-ticket-info-coll .ticket-cell"
        ).innerText;
        this.getRefundHtmlData.refundAmount = document.querySelector(
          "#refundHtmlOrderDetail #js_form_rm #js_should_refund_fee"
        ).innerText;
        let refundConfirm = document.querySelector(
          '#refundHtmlOrderDetail [data-action="btn_confirm"]'
        );
        if (refundConfirm) {
          // 退票确认按钮事件
          var that = this;
          refundConfirm.onclick = function () {
            let refundRemark = document.querySelectorAll(
              "#refundHtmlOrderDetail #js_rticket_remark"
            )[0].value;
            let orderNo = document.querySelectorAll(
              "#refundHtmlOrderDetail #js_form_rt #orderNo"
            )[0].value;
            let form = document.querySelectorAll(
              "#refundHtmlOrderDetail #js_form_rt #js_passanger_rt tbody tr td input[type='hidden']"
            );
            let str = "";
            Array.from(form).forEach(item => {
              str += item.value + "|";
            });
            var container = document.querySelector("#js_form_rt");
            for (let i = 0; i < Array.from(form).length; i++) {
              let name = "rt" + i;
              let _status = container.querySelectorAll(
                "input[name=" + name + "]"
              );
              var ticketreturnstatus = "";
              Array.from(_status).forEach(item => {
                if (item.checked) {
                  ticketreturnstatus += item.value + "|";
                }
              });
            }

            let ticketNos = str.substring(0, str.length - 1);
            let _ticketreturnstatus = ticketreturnstatus.substring(
              0,
              ticketreturnstatus.length - 1
            );
            let params = {
              orderNo: orderNo,
              ticketNos: ticketNos,
              ticketreturnstatus: _ticketreturnstatus,
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
          refundReject.onclick = function () {
            let from = document.getElementById("js_from_reject");
            that.newFromDialog = from.innerHTML;
            that.newFromDialogShow = true;
          };
        }
        // 拒绝退款弹 框取消
        let btnRejectCancel = document.querySelector(
          "#refundTts [data-action='btn_reject_cancel']"
        );
        if (btnRejectCancel) {
          btnRejectCancel.onclick = function () {
            that.newFromDialogShow = false;
          };
        }
        //拒绝退款弹框确定
        let btnRejectAffirm = document.querySelector(
          "#refundTts [data-action='btn_reject_enter']"
        );
        if (btnRejectAffirm) {
          btnRejectAffirm.onclick = function () {
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
                message: "请选择未及时退款的原因"
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
        return function (dateStr, format) {
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
  .deadlineTicketTime label {
    color: #ff4600;
  }

  .deadlineTicketTime {
    color: #ff4600;
  }

  .el-collapse-item__header {
    background-color: #fafafa;
    height: 35px;
    font-size: 12px;
    flex: 1 0 auto;
    order: -1;
    padding-left: 15px;
  }

  .collapse-title {
    flex: 1 0 90%;
    order: 1;
  }
</style>
