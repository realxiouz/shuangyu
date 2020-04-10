<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header">
        <span>出票信息</span>
        <el-button type="danger" style="margin-left:20px;" size="mini">锁单</el-button>
        <el-button type="primary" size="mini">解锁订单</el-button>
        <el-button type="primary" size="mini">调用出票中</el-button>
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
              <span>{{formateOrderType(orderData)}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单状态:">
              <span>{{formateStatus(orderData)}}</span>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单时间:">
              <span>{{orderData.createTime}}</span>
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
        <el-table-column prop="ageType" label="乘机人类型" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatAgeType(scope.row) }}</span>
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
      <el-table
        :data="orderData.flights"
        size="mini"
        highlight-current-row
        style="width: 100%;"
        fit
      >
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
        <el-table-column prop="arrTime" label="到达时间" width="100" align="center"></el-table-column>
        <el-table-column prop="refundRule" label="退票规则" align="center"></el-table-column>
        <el-table-column prop="changeRule" label="改签规则" align="center"></el-table-column>
      </el-table>
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="searchFlight" size="mini">搜索航班</el-button>
      </el-row>
    </el-card>

    <el-card class="contentBox" v-if="flightShow">
      <div>渠道信息</div>
      <el-table
        :data="flightData"
        v-loading="loading"
        size="mini"
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRowHandle"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
        fit
      >
        <el-table-column label="渠道" width="150" align="center">蜗牛</el-table-column>
        <el-table-column prop="dpt" label="起始地" align="center"></el-table-column>
        <el-table-column prop="arr" label="目的地" align="center"></el-table-column>
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
        <el-table-column prop="flightNum" label="主飞航班" align="center"></el-table-column>
        <el-table-column prop="shareFlag" label="是否共享" width="100" align="center"></el-table-column>
        <el-table-column prop="flightNum" label="航班号" align="center"></el-table-column>
        <el-table-column width="80" label="预定" align="center" type="expand">
          <template slot-scope="props">
            <el-row
              type="flex"
              justify="center"
              v-for="(item,index) in props.row.sortPrices"
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
                    @click="predetermineOrder(item)"
                    size="mini"
                  >预定</el-button>
                </span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  formateOrderType,
  formateCategory,
  formateStatus,
  formatAgeType
} from "@/utils/status.js";

export default {
  name: "goTicket",
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      flightShow: false,
      orderData: {},
      flightData: [],
      loading: true,
      expands: [],
      passengerData: JSON.parse(this.$route.query.passengersInfo),
      flightInfo: {
        arr: "",
        dpt: "",
        dptDay: "",
        dptTime: "",
        flightCode: ""
      }
    };
  },
  created() {
    this.getOrderDetail();
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  },
  methods: {
    formateOrderType,
    formateStatus,
    formatAgeType,
    formateCategory,
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

      let flightInfo2 = {
        arr: "PVG",
        dpt: "YCU",
        dptDay: "2020-04-12",
        dptTime: "13:10",
        flightCode: "MU5192"
      };
      this.flightInfo = flightInfo2;
      this.getOrderFlight(flightInfo2);
    },
    predetermineOrder(row){
      console.log(row)

    },
    getOrderFlight(flightInfo) {
      this.$store
        .dispatch("order/getOrderFlight", flightInfo)
        .then(data => {
          if (data) {
            this.$store
              .dispatch("order/getOrderMinPrice", flightInfo)
              .then(res => {
                if (res) {
                  data.forEach(item => {
                    item.minPrice = res.sortPrices[0].price;
                    let flightPrice = {
                      arr: this.orderData.flights[0].arr,
                      dpt: this.orderData.flights[0].dpt,
                      date: this.formatDate(
                        this.orderData.flights[0].flightDate,
                        "YYYY-MM-DD"
                      ),
                      ex_track: item.exTrack,
                      flightNum: this.orderData.flights[0].flightCode
                    };
                    let flightPrice2 = {
                      arr: "PVG",
                      dpt: "YCU",
                      date: "2020-04-12",
                      ex_track: item.exTrack,
                      flightNum: "MU5192"
                    };
                    this.getFlightPrice(flightPrice2);
                  });
                }
                this.flightData = data;
                this.loading = false;
              })
              .catch(error => {
                this.loading = false;
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFlightPrice(flightPrice) {
      this.$store
        .dispatch("order/getFlightPrice", flightPrice)
        .then(data => {
          if (data) {
            this.flightData.forEach(item => {
              item.sortPrices = data.sortPrices;
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRowKeys(row) {
      return row.exTrack;
    },
    clickRowHandle(row) {
      if (this.expands.includes(row.exTrack)) {
        this.expands = this.expands.filter(val => val !== row.exTrack);
      } else {
        this.expands.push(row.exTrack);
      }
    },
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (dateStr>0) {
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
