<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header">
        <span>订单详情</span>
      </div>
      <el-row :gutter="20">
        <el-form :model="tableData" label-width="130px" size="mini">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单编号:">
              <span>{{tableData.orderNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单类型:">
              <span>{{tableData.categoryName}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="交易金额:">
              <span>￥{{this.$numeral(tableData.transactionAmount).format('0.00')}}</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="金额:">
              <span>￥{{this.$numeral(tableData.amount).format('0.00')}}</span>
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
      <el-row style="margin-top:20px">
        <el-button type="primary" @click="goTicket" size="mini">下单</el-button>
      </el-row>
    </el-card>
    <el-card class="contentBox" v-if="flightShow">
      <div slot="header">
        <span>航班信息</span>
      </div>
      <el-table :data="flightData" size="mini" highlight-current-row style="width: 100%;" fit>
        <el-table-column prop label="渠道" width="160" align="center"></el-table-column>
        <el-table-column prop="dptAirport" label="起始地" align="center"></el-table-column>
        <el-table-column prop="arrAirport" label="目的地" align="center"></el-table-column>
        <el-table-column prop="airlineCode" label="航司" width="100" align="center"></el-table-column>
        <el-table-column prop="actFlightCode" label="主飞航班" align="center"></el-table-column>
        <el-table-column prop="shareFlag" label="是否共享" width="100" align="center"></el-table-column>
        <el-table-column prop="flightCode" label="航班号" align="center"></el-table-column>
        <el-table-column prop label="到达机场" width="160" align="center"></el-table-column>
        <el-table-column prop="refundRule" label="退票规则" align="center"></el-table-column>
        <el-table-column prop="changeRule" label="改签规则" align="center"></el-table-column>
        <el-table-column prop="changeRule" width="80" label="预定" align="center" type="expand">
          <template slot-scope="props">
            <el-row type="flex" justify="center">
              <el-col style="text-align:center;line-height:28px;">
                舱位:
                <span>{{ props.row.cabin }}</span>
              </el-col>
              <el-col style="text-align:center;line-height:28px;">
                票面价:
                <span>{{ props.row.viewPrice }}</span>
              </el-col>
              <el-col style="text-align:center;line-height:28px;">
                售价:
                <span>{{ props.row.viewPrice }}</span>
              </el-col>
              <el-col style="text-align:right;line-height:28px;">
                <span>
                  <el-button type="primary" @click="handlePay" size="mini">支付</el-button>
                </span>
              </el-col>
            </el-row>

            <!-- <el-form style="background-color:#CCC" label-position="left" inline class="demo-table-expand">
              <el-form-item label="舱位: ">
                <span>{{ props.row.dptAirport }}</span>
              </el-form-item>
              <el-form-item label="票面价: ">
                <span>{{ props.row.dptAirport }}</span>
              </el-form-item>
              <el-form-item label="售价: ">
                <span>{{ props.row.dptAirport }}</span>
              </el-form-item>
              <el-form-item label="操作: ">
                <span>
                  <el-button type="primary" @click="handlePay" size="mini">支付</el-button>
                </span>
              </el-form-item>
            </el-form>-->
            <!-- <el-table :data="flightData1">
              <el-table-column prop="cabin" label="舱位" width="50" align="center"></el-table-column>
              <el-table-column prop label="售价" width="100" align="center"></el-table-column>
              <el-table-column label="操作" width="80" align="center">
                <el-button type="primary" @click="handlePay" size="mini">支付</el-button>
              </el-table-column>
            </el-table>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-row style="margin-top:20px">
          <el-button type="primary" size="mini">下单</el-button>
          <el-button type="primary" size="mini">手动下单</el-button>
      </el-row>-->
    </el-card>
    <div>
      <el-dialog title="支付" center :visible.sync="showPay" width="30%">
        <el-row type="flex" class="row-bg" justify="center" align="center">
          <span style="margin-right:20px;">金额：￥0.00</span>
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
      flightData: [],
      // flightData1: [
      //   {
      //     dptAirport: "云南",
      //     cabin: "M",
      //     sall: "￥100.00",
      //     sall1: "￥100.00"
      //   },
      //   {
      //     dptAirport: "昆明",
      //     cabin: "Y",
      //     sall: "￥200.00",
      //     sall1: "￥210.00"
      //   }
      // ],

      PassengerData: [],
      tableData: {},
      orderNo: this.$route.query.orderNo,
      PassengerData: this.$route.query.passengersInfo
    };
  },
  methods: {
    getOrderDetail() {
      this.$store
        .dispatch("order/getOrderDetail", this.orderNo)
        .then(data => {
          if (data) {
            this.tableData = data;
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
</style>
