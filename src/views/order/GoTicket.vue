<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header">
        <span>订单详情</span>
      </div>
      <el-row :gutter="20">
        <el-form :model="orderData" label-width="130px" size="mini">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单编号:">
              <span>{{orderData.orderNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单类型:">
              <span v-if="orderData.orderType==10">出票</span>
              <span v-if="orderData.orderType==20">退票</span>
              <span v-if="orderData.orderType==30">改签</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="交易金额:">
              <span>￥{{this.$numeral(orderData.transactionAmount).format('0.00')}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="金额:">
              <span>￥{{this.$numeral(orderData.amount).format('0.00')}}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card class="contentBox">
      <div slot="header">
        <span>乘客信息</span>
      </div>
      <el-table :data="PassengerData" size="mini" highlight-current-row style="width: 100%;" fit>
        <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="100" align="center"></el-table-column>
        <el-table-column label="出生年月" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.birthday,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ageType" label="乘机人类型" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatAgeType(scope.row.ageType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardType" label="乘机人证件类型" width="250" align="center"></el-table-column>
        <el-table-column prop="cardNo" label="乘机人证件号" align="center"></el-table-column>
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
        <!-- <el-table-column prop="dptTime" label="起飞时间" width="150" align="center"></el-table-column> -->
        <el-table-column prop="arrTime" label="到达时间" width="100" align="center"></el-table-column>
        <!-- <el-table-column prop="distance" label="航程" width="50" align="center"></el-table-column> -->
        <el-table-column prop="refundRule" label="退票规则" align="center"></el-table-column>
        <el-table-column prop="changeRule" label="改签规则" align="center"></el-table-column>
      </el-table>
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="goTicket" size="mini">搜索航班</el-button>
      </el-row>
    </el-card>

    <el-card class="contentBox" v-if="flightShow">
      <div slot="header">
        <span>渠道信息</span>
      </div>
      <el-table
        :data="newFlightData1"
        size="mini"
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRowHandle"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
        @expand-change="expandChange"
        lazy
        fit
      >
        <el-table-column label="渠道" width="150" align="center">蜗牛</el-table-column>
        <el-table-column prop="dptAirport" label="起始地" align="center"></el-table-column>
        <el-table-column prop="arrAirport" label="目的地" align="center"></el-table-column>
        <el-table-column prop="minPrice" label="最低价" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.minPrice)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="airlineCode" label="航司" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.flightQuotePrices.arrAirport}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="actFlightCode" label="主飞航班" align="center"></el-table-column>
        <el-table-column prop="shareFlag" label="是否共享" width="100" align="center"></el-table-column>
        <el-table-column prop label="到达机场" width="160" align="center"></el-table-column>
        <el-table-column prop="flightCode" label="航班号" align="center"></el-table-column>
        <el-table-column prop="refundRule" label="退票规则" align="center"></el-table-column>
        <el-table-column prop="changeRule" label="改签规则" align="center"></el-table-column>
        <el-table-column width="80" label="预定" align="center" type="expand">
          <template v-if="flightPrice.length">
            <el-row type="flex" justify="center" v-for="(item,index) in flightPrice" :key="index">
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
                    @click="handlePay"
                    size="mini"
                  >预定</el-button>
                </span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div>
      <el-dialog title="支付" center :visible.sync="showPay" width="30%">
        <el-row type="flex" class="row-bg" justify="center" align="center">
          <span style="margin-right:20px;line-height:28px;">金额：￥0.00</span>
          <el-button type="primary" size="mini">去付款</el-button>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="handleCancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "goTicket",
  data() {
    return {
      showPay: false,
      flightShow: false,
      purchaseShow: true,
      load: false,
      flightData: [],
      flightPrice: [],
      newFlightData: [],
      newFlightData1: "",
      expands: [],
      PassengerData: [],
      orderData: {},
      orderNo: this.$route.query.orderNo,
      PassengerData: JSON.parse(this.$route.query.passengersInfo),
      getRowKeys(row) {
        return row.exTrack;
      }
    };
  },
  methods: {
    getOrderDetail() {
      this.$store
        .dispatch("order/getOrderDetail", this.orderNo)
        .then(data => {
          if (data) {
            this.orderData = data;
            if (data.flights) {
              this.flightData = data.flights;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handlePay() {
      this.showPay = true;
    },
    handleCancel() {
      this.showPay = false;
    },
    handleSave() {
      this.showPay = true;
    },
    goTicket() {
      this.flightShow = true;
      let dptDay = this.formatDate(this.flightData[0].flightDate, "YYYY-MM-DD");
      let flightInfo = {
        arr: this.flightData[0].arr,
        dpt: this.flightData[0].dpt,
        dptDay: dptDay,
        dptTime: this.flightData[0].dptTime.substr(-5, 5),
        flightCode: this.flightData[0].flightCode
      };

      let flightInfo2 = {
        arr: "CTU",
        dpt: "CGO",
        dptDay: "2020-04-03",
        dptTime: "19:10",
        flightCode: "8L9678"
      };
      this.getOrderMinPrice(flightInfo2);
      this.getOrderFlight(flightInfo2);
    },
    clickRowHandle(row) {
      let dptDay = this.formatDate(this.flightData[0].flightDate, "YYYY-MM-DD");
      let _flightInfo = {
        arr: this.flightData[0].arr,
        dpt: this.flightData[0].dpt,
        date: dptDay,
        ex_track: row.exTrack,
        flightNum: this.flightData[0].flightCode
      };

      let _flightInfo2 = {
        arr: "SHA",
        dpt: "KMG",
        date: "2020-04-03",
        ex_track: "djjj",
        flightNum: "HO1122"
      };
      this.getFlightPrice(_flightInfo2);
      if (this.expands.includes(row.exTrack)) {
        this.expands = this.expands.filter(val => val !== row.exTrack);
      } else {
        this.expands.push(row.exTrack);
      }
    },
    expandChange(row,expandedRows ){
      let dptDay = this.formatDate(this.flightData[0].flightDate, "YYYY-MM-DD");
      let _flightInfo = {
        arr: this.flightData[0].arr,
        dpt: this.flightData[0].dpt,
        date: dptDay,
        ex_track: row.exTrack,
        flightNum: this.flightData[0].flightCode
      };

      let _flightInfo2 = {
        arr: "SHA",
        dpt: "KMG",
        date: "2020-04-03",
        ex_track: "djjj",
        flightNum: "HO1122"
      };
      this.getFlightPrice(_flightInfo2);
    },
    getOrderFlight(flightInfo) {
      this.$store
        .dispatch("order/getOrderFlight", flightInfo)
        .then(data => {
          if (data) {
            this.newFlightData = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getOrderMinPrice(flightInfo) {
      this.$store
        .dispatch("order/getOrderMinPrice", flightInfo)
        .then(data => {
          if (data) {
            this.newFlightData.forEach(item => {
              item.minPrice = data.sortPrices[0].price;
            });
            this.newFlightData1 = this.newFlightData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFlightPrice(flightInfo) {
      this.$store
        .dispatch("order/getFlightPrice", flightInfo)
        .then(data => {
          if (data) {
            console.log(data, "getFlightPrice");
            this.flightPrice = [...data.sortPrices];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (null != dateStr) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    formatAgeType(ageType) {
      if (ageType == 0) {
        return (ageType = "成人");
      } else if (ageType == 1) {
        return (ageType = "儿童");
      } else {
        return (ageType = "婴儿");
      }
    },
    formatAmount1(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    }
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
  },
  created() {
    this.getOrderDetail();
  }
};
</script>

<style scoped>
.contentBox {
  padding-top: 0px !important;
}
</style>
