<template>
  <div class="bigBox">
      <!-- <el-row>
        <el-col :span="5">
          <el-button type="warning" @click="goBack" size="mini">返回</el-button>
        </el-col>
      </el-row> -->
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <span class="collapse-title" slot="title">
          <span v-if="this.activeNames.indexOf('1')!=-1">收起</span>
          <span v-else>展开</span>
          <span style="font-size:larger;margin-left: 15px;font-weight: bolder;">订单信息</span>
        </span>
        <div style="padding: 20px">
          <el-row :gutter="20">
            <el-form :model="tableData" label-width="130px" size="mini">
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="订单号:">
                  <span>{{tableData.orderNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="订单来源:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="PNR:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="匹配政策:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="进单类型:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="行程单:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="订单状态:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="URL:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="报价类型:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="fee:">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item class="deadlineTicketTime" label="最晚出票时限:">
                  <span>{{formatDate(tableData.deadlineTicketTime,'YYYY-MM-DD HH:mm:ss')}}</span>
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
            <el-table-column label="价格" align="center">
              <template slot-scope="scope">
                <span>{{formatAmount(scope.row.amount)}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {
  formatOrderType,
  formatStatus,
  formatAgeType,
  formatCardType
} from "@/utils/status.js";

export default {
  name: "orderDetail",
  data() {
    return {
      flightData: [],
      passengerData: [],
      tableData: {},
      orderNo: this.$route.query.orderNo,
      activeNames: ["1"]
    };
  },
  components: {},
  methods: {
    formatOrderType,
    formatStatus,
    formatAgeType,
    formatCardType,
    // 获取详情信息
    getOrderDetail(orderNo) {
      this.$store
        .dispatch("order/getOrderDetail", orderNo)
        .then(data => {
          if (data) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 返回
    goBack() {
      let lastName = localStorage.getItem("lastName");
      if(lastName){
        this.$router.push({name: lastName});
        localStorage.removeItem("lastName");
      }else{
        this.$router.go(-1);
      }
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

