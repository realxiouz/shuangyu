<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <el-row>
        <el-col :span="5">
          <!-- <el-button type="danger" @click="taskSubmit" size="mini">处理完成提交验证</el-button> -->
          <!-- <el-button type="primary" @click="taskCancel" size="mini">任务取消</el-button> -->
          <el-button type="warning" @click="goBack" size="mini">返回</el-button>
        </el-col>
        <!-- <el-col :span="14">
          <el-input v-model="updateRemark" placeholder="输入备注信息" class="input-with-select">
            <template slot="prepend">备注:</template>
            <el-button type="primary" @click="taskRemark" size="mini" slot="append">修改备注</el-button>
          </el-input>
        </el-col>-->
      </el-row>
    </el-card>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span style="font-size:larger;margin-left: 15px;font-weight: bolder;">销售单信息</span>
          <span style="font-size: 24px; margin: 0 20px; color: #ff4600;">{{orderDetail_orderState}}</span>
          <span style="color: #F56C6C">{{orderDetail_orderComment}}</span>
          <!-- <span v-if="taskRemarkData" style="color: red;font-size: 14px">任务备注：{{taskRemarkData}}</span> -->
        </template>
        <div style="padding: 20px">
          <el-row :gutter="20">
            <!-- <div style="margin-bottom:15px;">
              <el-button type="danger" @click="lockOrder" size="mini">锁单</el-button>
              <el-button type="primary" @click="unLockOrder" size="mini">解锁订单</el-button>
              <el-button type="warning" @click="useGoTicket" size="mini">调用出票中</el-button>
            </div>-->
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
                <el-form-item label="金额:">
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
          <el-divider content-position="left">乘客信息</el-divider>
          <el-table
            :data="passengerData"
            size="mini"
            highlight-current-row
            style="width: 100%;"
            fit
          >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
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
            <el-table-column label="价格" align="center">
              <template slot-scope="scope">
                <span>{{formatAmount(scope.row.amount)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-row style="margin-top:20px">
            <el-button
              v-if="this.tableData.orderType==10"
              type="primary"
              @click="goTicket"
              size="mini"
            >系统出票</el-button>
            <el-button type="primary" v-if="taskType!=2" @click="handleTicket" size="mini">手工出票</el-button>
          </el-row>-->
          <div style="margin-top:15px;">
            <span style="font-weight:700;font-size:15px;">退改说明：</span>
            <div style=" margin-top:10px;font-size:14px; line-height:1.5;">{{this.refundChangeRule}}</div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span style="font-size:larger;margin-left: 15px;font-weight: bolder;">销售单消息</span>
        </template>
        <div style="padding: 20px">
          <el-button type="primary" size="mini" @click="getMessage">刷新</el-button>
          <div style="margin-top:15px;" id="messageHtml">
            <span v-if="this.messageData" v-html="this.messageData"></span>
            <span v-else>暂无数据</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item v-if="this.tableData.orderType !='10'" name="3">
        <template slot="title">
          <span
            v-if="this.tableData.orderType=='30'|| this.tableData.orderType=='31'"
            style="font-size:larger;margin-left: 15px;font-weight: bolder;"
          >改签</span>
          <span v-else style="font-size:larger;margin-left: 15px;font-weight: bolder;">退票</span>
        </template>
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
        <template slot="title">
          <span style="font-size:larger;margin-left: 15px;font-weight: bolder;">采购单信息</span>
        </template>
        <div style="padding: 20px">
          <el-button type="primary" size="mini" @click="refreshPurchase">刷新</el-button>
          <el-table
            size="mini"
            :data="orderTree"
            highlight-current-row
            row-key="orderNo"
            :default-expand-all="true"
            fit
            :tree-props="{children: 'children', hasChildren: '*****'}"
          >
            <el-table-column prop="orderNo" align="center" label="订单号" width="180"></el-table-column>
            <el-table-column prop="sourceOrderNo" align="center" width="180" label="原订单"></el-table-column>
            <el-table-column prop="status" :formatter="formatStatus" label="订单状态" width="80"></el-table-column>
            <el-table-column prop="orderSource" align="center" label="供应商"></el-table-column>
            <el-table-column label="姓名" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ formatPassengers(scope.row.orderDetailList)}}</span>
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
            <!-- <el-table-column prop="address" align="center" fixed="right" width="360" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="orderTreeRemove(scope.row)"
                  v-show="scope.row.processCategory=='1'"
                  size="mini"
                >删除</el-button>
                <el-button
                  type="primary"
                  v-show="woniuPerateButton(scope.row)"
                  @click="refundTicket(scope.row)"
                  size="mini"
                >退票</el-button>
                <el-button
                  type="primary"
                  v-show="woniuPerateButton(scope.row)"
                  @click="changeTicket(scope.row)"
                  size="mini"
                >改签</el-button>
                <el-button
                  type="primary"
                  v-show="woniuPerateButton(scope.row) && taskType=='4'"
                  @click="intercept(scope.row)"
                  size="mini"
                >拦截</el-button>
                <el-button type="primary" @click="fillOutRefund(scope.row)" size="mini">补退</el-button>
                <el-button type="primary" @click="fillOutChange(scope.row)" size="mini">补改</el-button>
              </template>
            </el-table-column>-->
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {
  formatOrderType,
  formatCategory,
  formatStatus,
  formatAgeType,
  formatCardType
} from "@/utils/status.js";

export default {
  name: "orderDetail",
  data() {
    return {
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
      passengerData: [],
      tableData: {},
      passengersInfo: [],
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
      activeNames: ["1", "2", "3", "4"],
      //订单详情状态
      orderDetail_orderState: "",
      //订单详情意见及备注
      orderDetail_orderComment: "",
      //订单详情触发定时器
      detailInfoTimer: null
    };
  },
  components: {},
  methods: {
    formatOrderType,
    formatStatus,
    formatCategory,
    formatAgeType,
    formatCardType,

    //蜗牛展示按钮
    woniuPerateButton(row) {
      var flag = false;
      if (
        row.orderSource == "QUNAR_OPEN" ||
        row.merchantId == "d381a4abdfa643fea6be8736dd11c1e1"
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
              this.passengerData = data.passengers;
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
    // // 重填票号
    // rewriteTicket(params) {
    //   this.$store
    //     .dispatch("order/rewriteTicket", params)
    //     .then(data => {
    //       if (data.code == 0) {
    //         this.$message({
    //           type: "success",
    //           message: "操作成功!"
    //         });
    //         this.onCancel();
    //         this.getChangeHtml();
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    // rewriteTicketSave() {
    //   this.rewriteTicketData.orderNo = this.sourceOrderNo;
    //   this.rewriteTicketData.ticketNo = "+" + this.ticketNoData;
    //   this.rewriteTicket(this.rewriteTicketData);
    // },
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
      this.open(
        this.delete,
        row.orderNo,
        "此操作将删除该订单的信息, 是否继续?"
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
  // updated() {
  //   if (this.changeHtml) {
  //     this.changeDataTop.reason = document.querySelectorAll(
  //       ".select"
  //     )[0].innerText;
  //     this.changeDataTop.flight = document.querySelectorAll(
  //       ".pr01"
  //     )[1].innerText;
  //     this.changeDataTop.flightDate = document.getElementsByName(
  //       "departureDay"
  //     )[0].value;
  //     this.changeDataTop.departureTime = document.getElementsByName(
  //       "departureTime"
  //     )[0].value;
  //     this.changeDataTop.arrivalTime = document.getElementsByName(
  //       "arrivalTime"
  //     )[0].value;
  //     this.changeDataTop.airDivision = document.getElementsByName(
  //       "airDivision"
  //     )[0].value;
  //     this.changeDataTop.flightNum = document.getElementsByName(
  //       "flightNum"
  //     )[0].value;
  //     this.changeDataTop.cabin = document.getElementsByName("cabin")[0].value;
  //     let gqFeesAmount = 0;
  //     document.getElementsByName("gqFees").forEach(item => {
  //       gqFeesAmount += Number(item.value);
  //     });
  //     let upgradeFeesAmount = 0;
  //     document.getElementsByName("upgradeFees").forEach(item => {
  //       upgradeFeesAmount += Number(item.value);
  //     });
  //     this.changeSellAmount = Number(gqFeesAmount) + Number(upgradeFeesAmount);
  //     let btnRewriteTickets = document.querySelectorAll(
  //       "#changeHtmlOrderDetail .back-form .back-form-info .g-clear .mrl10 .j-reset-ticket"
  //     );
  //     // 重贴票号按钮事件
  //     var that = this;
  //     if (btnRewriteTickets) {
  //       Array.from(btnRewriteTickets).forEach(item => {
  //         item.onclick = function() {
  //           that.rewriteTicketData.passengerId = item.getAttribute(
  //             "data-passenger-id"
  //           );
  //           that.rewriteTicketData.groupCheckOut = item.getAttribute(
  //             "data-group-check-out"
  //           );
  //           that.rewriteTicketData.groupCheckIn = item.getAttribute(
  //             "data-group-check-in"
  //           );
  //           that.rewriteTicketData.lastProductId = item.getAttribute(
  //             "data-last-product-id"
  //           );
  //           that.rewriteTicketShow = true;
  //         };
  //       });
  //     }
  //     //受理改签
  //     let changeConfirm = document.querySelector(
  //       '#changeHtmlOrderDetail [data-action="accept"]'
  //     );
  //     if (changeConfirm) {
  //       changeConfirm.onclick = function() {
  //         let inputData = document.querySelectorAll(
  //           "#changeHtmlOrderDetail .box-content input"
  //         );
  //         let obj = {};
  //         Array.from(inputData).forEach(item => {
  //           obj[item.name] = item.value;
  //         });
  //         let params = { ...obj };
  //         params.groupCheckOut = true;
  //         params.groupCheckIn = false;
  //         params.orderNo = that.sourceOrderNo;
  //         that.processingChangeTicket(params);
  //       };
  //     }

  //     //拒绝改签
  //     let changeReject = document.querySelector(
  //       '#changeHtmlOrderDetail [data-action="reject"]'
  //     );
  //     if (changeReject) {
  //       changeReject.onclick = function() {
  //         let _inputData = document.querySelectorAll(
  //           "#changeHtmlOrderDetail .box-content input"
  //         );
  //         let _obj = {};
  //         Array.from(_inputData).forEach(item => {
  //           _obj[item.name] = item.value;
  //         });
  //         let _params = { ...obj };
  //         _params.groupCheckOut = false;
  //         _params.groupCheckIn = false;
  //         _params.orderNo = that.sourceOrderNo;
  //         that.processingChangeTicket(_params);
  //       };
  //     }
  //   }
  //   // 退票Html操作
  //   if (this.refundHtml) {
  //     this.getRefundHtmlData.reason = document.querySelector(
  //       "#refundHtmlOrderDetail #js_form_rm .js_box_content .refund-ticket-info-row .refund-ticket-info-coll .ticket-cell"
  //     ).innerText;
  //     this.getRefundHtmlData.refundAmount = document.querySelector(
  //       "#refundHtmlOrderDetail #js_form_rm #js_should_refund_fee"
  //     ).innerText;
  //     let refundConfirm = document.querySelector(
  //       '#refundHtmlOrderDetail [data-action="btn_confirm"]'
  //     );
  //     if (refundConfirm) {
  //       // 退票确认按钮事件
  //       var that = this;
  //       refundConfirm.onclick = function() {
  //         let refundRemark = document.querySelectorAll(
  //           "#refundHtmlOrderDetail #js_rticket_remark"
  //         )[0].value;
  //         let orderNo = document.querySelectorAll(
  //           "#refundHtmlOrderDetail #js_form_rt #orderNo"
  //         )[0].value;
  //         let form = document.querySelectorAll(
  //           "#refundHtmlOrderDetail #js_form_rt #js_passanger_rt tbody tr td input[type='hidden']"
  //         );
  //         let str = "";
  //         Array.from(form).forEach(item => {
  //           str += item.value + "|";
  //         });
  //         var container = document.querySelector("#js_form_rt");
  //         for (let i = 0; i < Array.from(form).length; i++) {
  //           let name = "rt" + i;
  //           let _status = container.querySelectorAll(
  //             "input[name=" + name + "]"
  //           );
  //           var ticketreturnstatus = "";
  //           Array.from(_status).forEach(item => {
  //             if (item.checked) {
  //               ticketreturnstatus += item.value + "|";
  //             }
  //           });
  //         }

  //         let ticketNos = str.substring(0, str.length - 1);
  //         let _ticketreturnstatus = ticketreturnstatus.substring(
  //           0,
  //           ticketreturnstatus.length - 1
  //         );
  //         let params = {
  //           orderNo: orderNo,
  //           ticketNos: ticketNos,
  //           ticketreturnstatus: _ticketreturnstatus,
  //           remark: refundRemark
  //         };
  //         that.affirmRefundTicket(params);
  //       };
  //     }
  //     // 拒绝退款按钮
  //     let refundReject = document.querySelector(
  //       '#refundHtmlOrderDetail [data-action="btn_reject"]'
  //     );
  //     if (refundReject) {
  //       var that = this;
  //       refundReject.onclick = function() {
  //         let from = document.getElementById("js_from_reject");
  //         that.newFromDialog = from.innerHTML;
  //         that.newFromDialogShow = true;
  //       };
  //     }
  //     // 拒绝退款弹 框取消
  //     let btnRejectCancel = document.querySelector(
  //       "#refundTts [data-action='btn_reject_cancel']"
  //     );
  //     if (btnRejectCancel) {
  //       btnRejectCancel.onclick = function() {
  //         that.newFromDialogShow = false;
  //       };
  //     }
  //     //拒绝退款弹框确定
  //     let btnRejectAffirm = document.querySelector(
  //       "#refundTts [data-action='btn_reject_enter']"
  //     );
  //     if (btnRejectAffirm) {
  //       btnRejectAffirm.onclick = function() {
  //         let refuseRefundReason = document.querySelector(
  //           "#refundTts #js_refuse_refund_reason"
  //         ).value;
  //         let refuseRemark = document.querySelector("#refundTts #js_rj_remark")
  //           .value;

  //         let _orderNo = document.querySelector(
  //           "#refundTts .refuse-cause-cont input[type='hidden']"
  //         ).value;
  //         let params = {
  //           orderNo: _orderNo,
  //           refuseRefundReason: refuseRefundReason,
  //           remark: refuseRemark
  //         };

  //         if (refuseRefundReason == 0) {
  //           that.$message({
  //             type: "info",
  //             message: "请选择未及时退款的原因"
  //           });
  //           return;
  //         }
  //         that.refundCheckRefuseReason(params);
  //         that.newFromDialogShow = false;
  //       };
  //     }
  //   }
  // },
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
.deadlineTicketTime label {
  color: #ff4600;
}

.deadlineTicketTime {
  color: #ff4600;
}
</style>
