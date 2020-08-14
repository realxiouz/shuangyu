<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header">
        <span style="margin-right:15px;">出票信息</span>
        <el-button type="primary" @click="goBack" size="mini">返回</el-button>
      </div>
      <el-row :gutter="20">
        <el-form :model="orderData" label-width="80px" size="mini">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单编号:">
              <span>{{orderData.orderNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单类型:">
              <span>{{formatOrderType(orderData)}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单状态:">
              <span>{{formatStatus(orderData)}}</span>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单时间:">
              <span>{{formatDate(orderData.createTime,'YYYY-MM-DD')}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="应付金额:">
              <span>￥{{this.$numeral(orderData.amount).format('0.00')}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="政策代码:">
              <span>{{orderData.policyCode}}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="contentBox">
      <div slot="header">
        <span>乘客信息</span>
      </div>
      <el-table :data="passengerData" size="mini" highlight-current-row style="width: 100%;" fit>
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
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cardType"
          :formatter="formatCardType"
          label="乘机人证件类型"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column prop="cardNo" label="乘机人证件号" align="center"></el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="票面价" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.viewPrice)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="contentBox">
      <div slot="header" class="clearfix">
        <span>航班信息</span>
      </div>
      <el-table
        :data="orderData.flights"
        size="mini"
        highlight-current-row
        style="width: 100%;"
        fit
      >
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
        <el-table-column prop="dptTime" label="出发时间" width="100" align="center"></el-table-column>
        <el-table-column prop="refundRule" label="退票规则" align="center"></el-table-column>
        <el-table-column prop="changeRule" label="改签规则" align="center"></el-table-column>
      </el-table>
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="searchFlight" size="mini">搜索航班</el-button>
      </el-row>
    </el-card>
    <el-card class="contentBox" v-if="flightShow">
      <div>供应商信息</div>
      <el-table
        :data="flightData"
        v-loading="loading"
        size="mini"
        highlight-current-row
        @row-click="clickRowHandle"
        @expand-change="expandChange"
        style="width: 100%;"
        ref="refTable"
        fit
      >
        <el-table-column label="供应商" width="100" align="center">蜗牛</el-table-column>
        <el-table-column prop="exTrack" label="报价类型" width="100" align="center"></el-table-column>
        <el-table-column prop="dptTime" label="出发时间" width="100" align="center"></el-table-column>
        <el-table-column prop="arrTime" label="到达时间" width="100" align="center"></el-table-column>
        <el-table-column prop="dpt" width="150" label="出发机场三字码" align="center"></el-table-column>
        <el-table-column prop="dptAirport" label="出发地" align="center"></el-table-column>
        <el-table-column prop="arr" width="150" label="到达机场三字码" align="center"></el-table-column>
        <el-table-column prop="arrAirport" label="起始地" align="center"></el-table-column>
        <el-table-column prop="codeShare" label="是否共享" width="80" align="center"></el-table-column>
        <el-table-column prop="carrier" label="航司" width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.flightQuotePrices.carrier}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="flightNum" label="主飞航班" align="center"></el-table-column>
        <el-table-column prop="flightNum" label="航班号" align="center"></el-table-column>
        <el-table-column prop="barePrice" label="销售价" width="80" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.barePrice)}}</span>
          </template>
        </el-table-column>
        <el-table-column width="80" label="预定" align="center" type="expand">
          <template slot-scope="props">
            <div v-if="props.row.offerPrice">
              <el-row
                type="flex"
                justify="center"
                v-for="(item,index) in props.row.offerPrice.sortPrices"
                :key="index"
              >
                <el-col style="text-align:center;line-height:38px;">
                  <span>舱位：{{ item.cabin }}</span>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <span>票面价：{{ formatAmount(item.barePrice) }}</span>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <span>售价：{{ formatAmount(item.price) }}</span>
                </el-col>
                <el-col style="text-align:right;line-height:38px;">
                  <span>
                    <el-button
                      type="primary"
                      style="margin-top:10px;"
                      @click="predetermineOrder(props.row,item)"
                      size="mini"
                    >预定</el-button>
                  </span>
                </el-col>
              </el-row>
            </div>
            <div v-else style="text-align: center;">航班报价搜素中...</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div>
      <el-dialog
        title="支付"
        center
        :visible.sync="payShow"
        width="40%"
        :close-on-click-modal="false"
      >
        <div>
          <el-form size="mini" label-width="110px" class="demo-ruleForm">
            <el-form-item label="支付金额：">
              <span>{{payData.noPayAmount }}</span>
            </el-form-item>
            <el-form-item label="盈亏值：">
              <span>{{systemProfitAndLossValue}}</span>
            </el-form-item>
            <el-form-item label="盈亏值：">
              <el-input v-model="profitAndLossValue" clearable></el-input>
            </el-form-item>
            <el-form-item label="支付方式：">
              <el-select
                style="width:100%;"
                clearable
                v-model="payData.bankCode"
                placeholder="请选择支付方式"
              >
                <el-option label="PPM代扣" value="PNRPAY" :disabled="defaultAli"></el-option>
                <el-option label="支付宝" value="ALIPAY"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 25px;text-align: right;">
          <el-button size="mini" @click="onCancel">取 消</el-button>
          <el-button size="mini" @click="confirmPay" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
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
  name: "goTicket",
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      flightShow: false,
      payShow: false,
      orderData: {},
      flightData: [],
      loading: true,
      expands: [],
      systemProfitAndLossValue: "", //盈亏值
      profitAndLossValue: "", //盈亏值
      passengerData: JSON.parse(this.$route.query.passengersInfo),
      flightInfo: {
        arr: "",
        dpt: "",
        dptDay: "",
        dptTime: "",
        flightCode: ""
      },
      predetermineOrderData: "",
      //支付数据
      payData: {
        allPrice: 0,
        bankCode: "",
        cabin: "",
        payOrderNo: "",
        sellOrderNo: ""
      },

      defaultAli: true //sio skq ali 
    };
  },
  created() {
    this.getOrderDetail();
    let sourceOrderNo = this.passengerData[0].sourceOrderNo
    this.defaultAli = sourceOrderNo.startsWith('sio') || sourceOrderNo.startsWith('skq')
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  },
  methods: {
    formatOrderType,
    formatStatus,
    formatAgeType,
    formatCategory,
    formatCardType,
    // 取消支付弹框
    onCancel() {
      this.payShow = false;
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 显示支付弹框
    confirmPay() {
      let params = {
        allPrice: this.payData.noPayAmount,
        bankCode: this.payData.bankCode,
        cabin: this.predetermineOrderData.cabin,
        payOrderNo: this.payData.orderNo,
        sellOrderNo: this.orderData.sourceOrderNo,
        orderTaskId: this.$route.query.orderTaskId
      };
      let amountTotal = 0;
      this.passengerData.forEach(item => {
        amountTotal += Number(item.amount);
      });
      let _profitAndLossValue = 0;
      _profitAndLossValue = Number(amountTotal) - Number(params.allPrice);
      if (_profitAndLossValue != this.profitAndLossValue) {
        this.$message({
          type: "warning",
          message: "盈亏值计算错误！"
        });
        return;
      }
      this.openPay(params);
      this.payShow = false;
    },
    // 获得详情
    getOrderDetail() {
      this.$store
        .dispatch("order/getOrderDetail", this.orderNo)
        .then(data => {
          if (data) {
            this.orderData = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 搜素航班
    searchFlight() {
      this.flightShow = true;
      this.flightInfo = {
        arr: this.orderData.flights[0].arr,
        dpt: this.orderData.flights[0].dpt,
        dptDay: this.formatDate(
          this.orderData.flights[0].flightDate,
          "YYYY-MM-DD"
        ),
        dptTime: this.orderData.flights[0].dptTime.substr(-5, 5),
        flightCode: this.orderData.flights[0].flightCode
      };
      this.getOrderFlight(this.flightInfo);
    },
    // （预定）下单
    predetermineOrder(row, item) {
      this.predetermineOrderData = item;
      let newParams = {};
      newParams.flightNum = row.offerPrice.flightNum;
      newParams.domain = item.domain;
      newParams.client = item.domain;
      newParams.passengers = [];
      this.passengerData.forEach(item => {
        let obj = {
          name: item.name,
          ageType: item.ageType,
          cardType: item.cardType,
          cardNo: item.cardNo,
          price: item.viewPrice
        };
        newParams.passengers.push(obj);
      });
      newParams.ticketPrice = item.vppr;
      newParams.barePrice = item.barePrice;
      newParams.basePrice = item.basePrice;
      newParams.price = item.price;
      newParams.businessExt = item.businessExt;
      newParams.tag = item.prtag;
      newParams.cabin = item.cabin;
      newParams.policyType = item.policyType;
      newParams.policyId = item.policyId;
      newParams.wrapperId = item.wrapperId;
      newParams.carrier = row.offerPrice.carrier;
      newParams.from = row.offerPrice.from;
      newParams.to = row.offerPrice.to;
      newParams.startTime = row.offerPrice.startTime;
      newParams.dptTime = row.offerPrice.dptTime;
      newParams.orderTaskId = this.$route.query.orderTaskId;
      this.$store
        .dispatch("order/checkOrder", newParams)
        .then(data => {
          if (data == true) {
            this.$confirm("此单可能已采购，是否继续下单?", "提示", {
              confirmButtonText: "继续下单",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$store
                  .dispatch("order/placeAnOrder", newParams)
                  .then(data => {
                    if (data) {
                      this.payData = data;
                      this.payData.bankCode = this.defaultAli ? 'ALIPAY' : 'PNRPAY'
                      let amountTotal = 0;
                      this.passengerData.forEach(item => {
                        amountTotal += Number(item.amount);
                      });
                      this.systemProfitAndLossValue = 0;
                      this.systemProfitAndLossValue =
                        Number(amountTotal) - Number(this.payData.noPayAmount);
                      this.$message({
                        type: "success",
                        message: "预定成功！"
                      });
                      this.payShow = true;
                    } else {
                      this.payShow = false;
                      this.$message({
                        type: "warning",
                        message: data.msg
                      });
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
              .catch(() => {});
          } else {
            this.$store
              .dispatch("order/placeAnOrder", newParams)
              .then(data => {
                if (data) {
                  this.payData = data;
                  this.payData.bankCode = this.defaultAli ? 'ALIPAY' : 'PNRPAY'
                  let amountTotal = 0;
                  this.passengerData.forEach(item => {
                    amountTotal += Number(item.amount);
                  });
                  this.systemProfitAndLossValue = 0;
                  this.systemProfitAndLossValue =
                    Number(amountTotal) - Number(this.payData.noPayAmount);
                  this.$message({
                    type: "success",
                    message: "预定成功！"
                  });
                  this.payShow = true;
                } else {
                  this.payShow = false;
                  this.$message({
                    type: "warning",
                    message: data.msg
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    openPay(params) {
      this.$store
        .dispatch("order/openPay", params)
        .then(data => {
          if (data) {
            this.$message({
              type: "success",
              message: "支付成功！"
            });
            this.payShow = false;
            this.$router.go(-1);
          } else {
            this.$message({
              type: "warning",
              message: data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 查询航班信息
    getOrderFlight(flightInfo) {
      this.$store
        .dispatch("order/getOrderFlight", flightInfo)
        .then(data => {
          if (data) {
            this.flightData = data;
            this.loading = false;
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    // 蜗牛搜素报价
    getFlightPrice(flightPrice) {
      this.$store
        .dispatch("order/getFlightPrice", flightPrice)
        .then(data => {
          if (data) {
            this.flightData.forEach((item, index) => {
              if (item.flightNum == flightPrice.flightNum) {
                this.$set((item["offerPrice"] = data));
              }
            });
            this.flightData = [...this.flightData];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点击表格行展开展开行
    clickRowHandle(row, index, e) {
      let flightPrice = {
        arr: row.arr,
        dpt: row.dpt,
        date: row.flightDate,
        ex_track: row.exTrack,
        flightNum: row.flightNum
      };
      if (!row.offerPrice) {
        this.getFlightPrice(flightPrice);
      }
      this.$refs.refTable.toggleRowExpansion(row);
    },
    // 点击按钮展开展开行
    expandChange(row) {
      let flightPrice = {
        arr: row.arr,
        dpt: row.dpt,
        date: row.flightDate,
        ex_track: row.exTrack,
        flightNum: row.flightNum
      };
      if (!row.offerPrice) {
        this.getFlightPrice(flightPrice);
      }
    },
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    formatAmount(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
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
