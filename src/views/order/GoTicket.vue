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
        row-key="id"
        :data="flightData"
        :expand-row-keys="expandRowKeys"
        v-loading="loading"
        size="mini"
        highlight-current-row
        @row-click="clickRowHandle"
        @expand-change="expandChange"
        style="width: 100%;"
        ref="refTable"
        fit
      >
        <el-table-column prop="providerName" label="供应商" width="100" align="center"></el-table-column>
        <el-table-column prop="exTrack" label="报价类型" width="100" align="center"></el-table-column>
        <el-table-column prop="dptTime" label="出发时间" width="100" align="center"></el-table-column>
        <el-table-column prop="arrTime" label="到达时间" width="100" align="center"></el-table-column>
        <el-table-column prop="dptArrTxt" label="航段" align="center" ></el-table-column>
        <el-table-column prop="dptArr" width="300" label="出发到达机场" align="center"></el-table-column>
        <el-table-column prop="codeShare" label="是否共享" width="80" align="center">
          <template slot-scope="scope">
            <span>{{formatBoolean(scope.row.codeShare)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="carrier" label="航司" width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.flightQuotePrices.carrier}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="actFlightNum" label="主飞航班" align="center"></el-table-column>
        <el-table-column prop="flightNum" label="航班号" align="center"></el-table-column>
        <el-table-column prop="barePrice" label="采购价" width="80" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.barePrice)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="arfTof" label="机建/燃油" width="80" align="center"></el-table-column>
        <el-table-column prop="barePrice" label="采购合计" width="80" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.allBarePrice)}}</span>
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
                <el-col style="text-align:center;line-height:38px;line-width: 50px">
                  <span>舱位：{{ item.cabin }}</span>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <span>域名：{{ item.domain!=undefined?item.domain.split(".")[0]:"" }}</span>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <span>包装类型：{{ item.prtag }}</span>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <span>舱位等级：{{ formatCabinType(item.cabinType) }}</span>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <span>证件类型：{{ formatPriceCardType(item.cardType) }}</span>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <span>剩余座位数：{{ item.cabinCount }}</span>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">{{ item.returnText }}</div>
                    <el-button>退票规则</el-button>
                  </el-tooltip>

                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">{{ item.changeText }}</div>
                    <el-button>改签规则</el-button>
                  </el-tooltip>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <span>票面价：{{ formatAmount(item.vppr) }}</span>
                </el-col>
                <el-col style="text-align:center;line-height:38px;">
                  <span>采购价：{{ formatAmount(item.price) }}</span>
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
            <div v-else-if="props.row.returnCode=='F'" style="text-align: center;">无数据</div>
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
                <el-option label="支付宝" value="ALIPAY"></el-option>
                <!--<el-option label="汇付" value="PNRPAY"></el-option>-->
                <el-option label="余额代扣" value="QUNARPAY"></el-option>
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
        source: "",//采购渠道
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
        FOBookOrderData: {},
        expandRowKeys: []
      };
    },
    created() {
      this.getOrderDetail();
    },
    computed: {
      formatDate() {
        return function (dateStr, format) {
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
        //判断51还是蜗牛
        console.info("系统计算利润"+Number(this.systemProfitAndLossValue).toFixed(2)+"手工计算利润"+Number(this.profitAndLossValue).toFixed(2));
        if (Number(this.systemProfitAndLossValue).toFixed(2) != Number(this.profitAndLossValue).toFixed(2)) {
          this.$message({
            type: "warning",
            message: "盈亏值计算错误！"
          });
          return;
        }
        console.info("蜗牛支付-------++++++++++--------" + this.source);
        if (this.source == "OPEN") {
          console.info("蜗牛支付-------------------");
          let params = {
            allPrice: this.payData.noPayAmount,
            bankCode: this.payData.bankCode,
            cabin: this.predetermineOrderData.cabin,
            payOrderNo: this.payData.orderNo,
            sellOrderNo: this.orderData.sourceOrderNo,
            orderTaskId: this.$route.query.orderTaskId
          };
          console.info("蜗牛支付++++++++++++++++++++++++");
          this.openPay(params);
          this.payShow = false;
        }
        if (this.source == "51Book") {
          console.info("51支付");
          let params = {
            orderNo: this.FOBookOrderData.liantuoOrderNo,
            sellOrderNo: this.orderData.orderNo
          }
          console.info("51支付调用"+JSON.stringify(params))
          this.foPay(params);
          this.payShow = false;
        }
      },
      // 获得详情
      getOrderDetail() {
        this.$store
          .dispatch("order/getOrderDetail", this.orderNo)
          .then(data => {
            console.log(data)
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
      //蜗牛下单
      placeOpenOrder(newParams) {
        this.$store
          .dispatch("order/placeAnOpenOrder", newParams)
          .then(data => {
            if (data) {
              this.payData = data;
              let amountTotal = 0;
              this.passengerData.forEach(item => {
                amountTotal += Number(item.amount);
              });
              this.systemProfitAndLossValue = 0;
              this.systemProfitAndLossValue = (Number(amountTotal) - Number(this.payData.noPayAmount)).toFixed(2);
              this.$message({
                type: "success",
                message: "预定成功！"
              });
              this.source = "OPEN";
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
      },
      //51下单
      placeFOOrder(foPlaceOrderparams) {
        this.$store
          .dispatch("order/placeAnFOOrder", foPlaceOrderparams)
          .then(data => {
            console.info("51下单返回" + JSON.stringify(data) + "--CODE--" + data)
            if (data) {
              this.FOBookOrderData = data;
              let amountTotal = 0;
              this.passengerData.forEach(item => {
                amountTotal += Number(item.amount);
              });
              this.systemProfitAndLossValue = 0;
              this.systemProfitAndLossValue = (Number(amountTotal) - Number(this.FOBookOrderData.paymentInfo.settlePrice)).toFixed(2);
              this.$message({
                type: "success",
                message: "预定成功！"
              });
              this.source = "51Book";
              this.payShow = true;
            } else {
              this.payShow = false;
              this.$message({
                type: "warning",
                message: data.message
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //构建51下单参数
      buildFOPlaceOrcerParams: function (item, row) {
        let pnrInfo = {
          airportTax: item.airportTax,
          fuelTax: item.fuelTax,
          parPrice: item.parPrice,
          passengers: [],
          segments: []
        };
        this.passengerData.forEach(item => {
          let identityType = 6;
          if (item.cardType == "NI") {
            identityType = 1;
          }
          ;
          if (item.cardType == "PP") {
            identityType = 2;
          }
          ;
          if (item.cardType == "TB") {
            identityType = 5;
          }
          ;
          let obj = {
            birthday: this.formatDate(item.birthday, 'YYYY-MM-DD'),
            identityNo: item.cardNo,
            identityType: identityType,
            name: item.name,
            type: item.ageType
          };
          pnrInfo.passengers.push(obj);
        });
        let segment = {
          arrCode: row.arr,
          arrTime: row.arrTime.replace(":", ""),
          depCode: row.dpt,
          depDate: row.flightDate,
          depTime: row.dptTime.replace(":", ""),
          flightNo: row.flightNum,
          seatClass: item.cabin
        };
        pnrInfo.segments.push(segment);
        console.info("---------------------");
        let foPlaceOrderparams = {
          pnrInfo: pnrInfo,
          policyId: item.policyId
        };
        return foPlaceOrderparams;
      },
      //构建蜗牛下单参数
      buildOpenPlaceOrcerParams: function (row, item) {
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
        return newParams;
      },
      //构建验证重复下单参数
      buildCheckOrderParams: function (row) {
        let checkParams = {
          from: row.dpt,
          to: row.arr,
          startTime: row.flightDate,
          dptTime: row.dptTime,
          flightNum: row.actFlightNum,
          passengers: []
        };
        this.passengerData.forEach(item => {
          let obj = {
            name: item.name,
            ageType: item.ageType,
            cardType: item.cardType,
            cardNo: item.cardNo,
            price: item.viewPrice
          };
          checkParams.passengers.push(obj);
        });
        return checkParams;
      },
      // （预定）下单
      predetermineOrder(row, item) {
        this.predetermineOrderData = item;
        let checkParams = this.buildCheckOrderParams(row);
        this.$store
          .dispatch("order/checkOrder", checkParams)
          .then(data => {
            if (data == true) {
              this.$confirm("此单可能已采购，是否继续下单?", "提示", {
                confirmButtonText: "继续下单",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  if (item.source && item.source == "51Book") {
                    let foPlaceOrderparams = this.buildFOPlaceOrcerParams(item, row);
                    console.info("51下单了" + JSON.stringify(foPlaceOrderparams));
                    this.source = "51Book";
                    this.placeFOOrder(foPlaceOrderparams);
                  } else {
                    console.info("蜗牛下单了")
                    let newParams = this.buildOpenPlaceOrcerParams(row, item);
                    this.source = "OPEN";
                    this.placeOpenOrder(newParams);
                  }

                })
                .catch(() => {
                });
            } else {
              if (item.source && item.source == "51Book") {
                let foPlaceOrderparams = this.buildFOPlaceOrcerParams(item, row);
                console.info("51下单了" + JSON.stringify(foPlaceOrderparams));
                this.placeFOOrder(foPlaceOrderparams);
              } else {
                console.info("蜗牛下单了")
                let newParams = this.buildOpenPlaceOrcerParams(row, item);
                this.placeOpenOrder(newParams);
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      foPay(params) {
        this.$store
          .dispatch("order/foPay", params)
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
      openPay(params) {
        console.info("蜗牛支付参数" + JSON.stringify(params))
        this.$store
          .dispatch("order/openPay", params)
          .then(data => {
            if (data.code==0) {
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
      judgeType(obj) {
        // tostring会返回对应不同的标签的构造函数
        const toString = Object.prototype.toString;
        const map = {
          '[object Boolean]': 'boolean',
          '[object Number]': 'number',
          '[object String]': 'string',
          '[object Function]': 'function',
          '[object Array]': 'array',
          '[object Date]': 'date',
          '[object RegExp]': 'regExp',
          '[object Undefined]': 'undefined',
          '[object Null]': 'null',
          '[object Object]': 'object',
        };
        if (obj instanceof Element) {
          return 'element';
        }
        return map[toString.call(obj)];
      },
      deepClone(data) {
        const type = this.judgeType(data);
        let obj;
        if (type === 'array') {
          obj = [];
        } else if (type === 'object') {
          obj = {};
        } else {
          // 不再具有下一层次
          return data;
        }
        if (type === 'array') {
          for (let i = 0, len = data.length; i < len; i++) {
            obj.push(this.deepClone(data[i]));
          }
        } else if (type === 'object') {
          // 对原型上的方法也拷贝了....
          for (const key in data) {
            obj[key] = this.deepClone(data[key]);
          }
        }
        return obj;
      },

      // 查询航班信息
      getOrderFlight(flightInfo) {
        this.$store
          .dispatch("order/getOrderFlight", flightInfo)
          .then(data => {
            if (data) {
              var lengthData = data.length;
              for (var i = 0; i < lengthData; i++) {
                data[i].providerName = "蜗牛";
                data[i].arfTof = data[i].arf + "/" + data[i].tof;
                data[i].dptArr = data[i].dptAirport+"--"+data[i].arrAirport;
                data[i].dptArrTxt = data[i].dpt+"--"+data[i].arr;
                data[i].allBarePrice = (Number(data[i].arf)+Number(data[i].tof)+Number(data[i].barePrice)).toFixed(2);
                if (data[i].exTrack == "djjj" && !data[i].codeShare) {
                  var foflight = this.deepClone(data[i]);
                  foflight.providerName = "51Book";
                  foflight.exTrack = "51Book";
                  foflight.barePrice = "获取中";
                  foflight.arfTof = "获取中";
                  foflight.allBarePrice = "获取中";
                  let flightPrice51 = {
                    arrCode: foflight.arr,
                    depCode: foflight.dpt,
                    dateTime: foflight.flightDate,
                    cabin: this.orderData.flights[0].cabin,
                    flightNo: foflight.flightNum
                  };
                  this.$store
                    .dispatch("order/get51FlightPrice", flightPrice51)
                    .then(data => {
                      if (data) {
                        if (data.return.returnCode == "S") {
                          foflight.barePrice = (Number(data.return.flightDataList[0].seatAndPolicyList[0].ticketPrice) - Number(Number(data.return.flightDataList[0].seatAndPolicyList[0].ticketPrice) * Number(data.return.flightDataList[0].seatAndPolicyList[0].policyList[0].commisionPoint)) - Number(data.return.flightDataList[0].seatAndPolicyList[0].policyList[0].param1)).toFixed(2);
                          foflight.arfTof = Number(data.return.flightDataList[0].adultAirportTax) + "/" + Number(data.return.flightDataList[0].adultFuelTax);
                          foflight.allBarePrice = (Number(data.return.flightDataList[0].adultAirportTax)+Number(data.return.flightDataList[0].adultFuelTax)+Number(foflight.barePrice)).toFixed(2);
                        }else{
                          foflight.barePrice = "获取失败";
                          foflight.arfTof = "获取失败";
                          foflight.allBarePrice = "获取失败";
                        }
                      }
                    })
                  data.push(foflight);
                }
              }
              for (var j = 0; j < data.length; j++) {
                data[j].id = j;
              }
              this.flightData = data;
              this.loading = false;
            }
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      // 51搜素报价
      get51FlightPrice(row) {
        let flightPrice51 = {
          arrCode: row.arr,
          depCode: row.dpt,
          dateTime: row.flightDate,
          cabin: this.orderData.flights[0].cabin,
          flightNo: row.flightNum
        };
        this.$store
          .dispatch("order/get51FlightPrice", flightPrice51)
          .then(data => {
            if (data) {
              if (data.return.returnCode == "S") {
                var sortPrices = [];
                for (let i = 0; i < data.return.flightDataList[0].seatAndPolicyList[0].policyList.length; i++) {
                  var sortPrice = {
                    source: "51Book",
                    price: data.return.flightDataList[0].seatAndPolicyList[0].policyList[i].adultSettlePrice,
                    cabin: data.return.flightDataList[0].seatAndPolicyList[0].seatCode,
                    vppr: data.return.flightDataList[0].seatAndPolicyList[0].ticketPrice,
                    policyId: data.return.flightDataList[0].seatAndPolicyList[0].policyList[i].policyId,
                    airportTax: data.return.flightDataList[0].adultAirportTax,
                    fuelTax: data.return.flightDataList[0].adultFuelTax,
                    parPrice: data.return.flightDataList[0].seatAndPolicyList[0].ticketPrice
                  };
                  sortPrices.push(sortPrice);
                }

                var foDataPrice = {
                  sortPrices: sortPrices
                };
                this.$set(row, "offerPrice", foDataPrice);

              } else {
                this.$set(row, "returnCode", "F");
              }
            }
          })
          .catch(error => {
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
                if (item.flightNum == flightPrice.flightNum && item.providerName == "蜗牛") {
                  //this.$set((item["offerPrice"] = data));
                  this.$set(item, "offerPrice", data);
                }
              });
              //this.flightData = [...this.flightData];
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      getFlightPrice2(row) {
        let flightPrice = {
          arr: row.arr,
          dpt: row.dpt,
          date: row.flightDate,
          ex_track: row.exTrack,
          flightNum: row.flightNum
        };
        if (!row.offerPrice) {
          this.$store
            .dispatch("order/getFlightPrice", flightPrice)
            .then(data => {
              if (data) {
                this.$set(row, "offerPrice", data);

              }
            })
            .catch(error => {
              console.log(error);
            });
        }
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
          if (row.providerName == "蜗牛") {
            this.getFlightPrice(flightPrice);
          }
          if (row.providerName == "51Book") {
            this.get51FlightPrice(row);
          }
        }
        this.$refs.refTable.toggleRowExpansion(row);
      }
      ,
      // 点击按钮展开展开行
      expandChange(row, expanded) {
        if (expanded) {
          if (row.providerName == "蜗牛") {
            this.getFlightPrice2(row);
          }
          if (row.providerName == "51Book") {
            this.get51FlightPrice(row);
          }
        }
      }
      ,
      /*初始化用工列表中的生日日期格式*/
      initDate(dateStr, format) {
        if (dateStr > 0) {
          let date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      }
      ,
      formatAmount(amount) {
        if (amount == "获取中"||amount == "获取失败") {
          return amount;
        }
        if (!amount) {
          return "￥0.00";
        }
        return "￥" + this.$numeral(amount).format("0.00");
      },
      formatCabinType(val){
        if (val === 0) {
          return "经济舱";
        }
        if (val === 1) {
          return "头等舱";
        }
        if (val === 2) {
          return "商务舱";
        }
        if (val === 3) {
          return "经济舱精选";
        }
        if (val === 4) {
          return "经济舱y舱";
        }
        if (val === 5) {
          return "超值头等舱";
        }
        return "";
      },
      formatPriceCardType(val){
        if (val === 0) {
          return "所有证件";
        }
        if (val === 1) {
          return "身份证";
        }
        return "";
      },
      formatBoolean(param) {
        if (param) {
          return "是";
        }
        return "否";
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
