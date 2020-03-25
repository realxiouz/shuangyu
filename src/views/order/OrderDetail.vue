<template>
  <div class="bigBox">
    <div class="searchBox">
      <el-row type="flex" justify="center">
        <h2>订单详情:</h2>
      </el-row>
      <el-row :gutter="20">
        <el-form :model="tableData" label-width="130px" size="mini">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单编号:">
              <el-input v-if="!tableData.orderNo" placeholder="暂无数据" :disabled="true"></el-input>
              <el-input v-else v-model="tableData.orderNo" style="width: 100%" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="销售出票订单编号:">
              <el-input v-model="tableData.rootOrderNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单来源:">
              <el-input v-if="!tableData.orderSource" placeholder="暂无数据" :disabled="true"></el-input>
              <el-input v-else v-model="tableData.orderSource" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单来源单号:">
              <el-input v-model="tableData.sourceOrderNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="政策代码:">
              <el-input v-model="tableData.policyCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="政策类型:">
              <el-input v-model="tableData.policyType" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单类型:">
              <el-input v-model="tableData.categoryName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单状态:">
              <el-input v-model="tableData.statusName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="最晚出票时限:">
              <el-date-picker
                :disabled="true"
                v-model="tableData.deadlineTicketTime"
                format="yyyy-MM-DD"
                style="width: 100%"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="退改签说明:">
              <el-input v-model="tableData.RefundChangeRule" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="金额:">
              <!-- <el-input  :placeholder="'￥'+ this.$numeral(tableData.amount).format('0.00')" :disabled="true"></el-input> -->

              <el-input
                :value="'￥'+ this.$numeral(tableData.amount).format('0.00')"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="航程类型:">
              <el-input v-model="tableData.voyageTypeName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="PNR:">
              <el-input v-model="tableData.pnr" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="大编:">
              <el-input v-model="tableData.bigPnr" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="业务完结时间:">
              <el-date-picker
                :disabled="true"
                style="width: 100%"
                v-model="tableData.finishTime"
                format="yyyy-MM-DD"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="交易金额:">
              <el-input
                :value="'￥'+ this.$numeral(tableData.transactionAmount).format('0.00')"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="交易编号:">
              <el-input v-model="tableData.transactionNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="业务编号:">
              <el-input v-model="tableData.businessNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="交易时间:">
              <el-date-picker
                :disabled="true"
                style="width: 100%"
                v-model="tableData.transactionTime"
                format="yyyy-MM-DD"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="资金账号:">
              <el-input v-model="tableData.fundAccount" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="企业/单位域名:">
              <el-input v-model="tableData.domain" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="contentBox">
      <el-row type="flex" justify="center">
        <h2>航班信息:</h2>
      </el-row>
      <el-table
        :data="flightData"
        size="mini"
        highlight-current-row
        style="width: 100%;"
        border
        fit
      >
        <el-table-column prop="cabin" label="舱位" width="160" align="center"></el-table-column>
        <el-table-column label="出发日期" width="110" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flightDate" class="el-icon-time"></i>
            <span>{{ formatDate(scope.row.flightDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="airlineCode" label="航司" width="50" align="center"></el-table-column>
        <el-table-column prop="actFlightCode" label="主航班号" width="80" align="center"></el-table-column>
        <el-table-column prop="flightCode" label="航班号" width="100" align="center"></el-table-column>
        <el-table-column prop="dpt" label="出发地三字码" width="150" align="center"></el-table-column>
        <el-table-column prop="dptAirport" label="出发机场" width="50" align="center"></el-table-column>
        <el-table-column prop="dptTerminal" label="出发航楼站" width="80" align="center"></el-table-column>
        <el-table-column prop="dptTime" label="起飞时间" width="50" align="center"></el-table-column>
        <el-table-column prop="arr" label="到达地三字码" width="100" align="center"></el-table-column>
        <el-table-column prop="arrAirport" label="到达机场" width="50" align="center"></el-table-column>
        <el-table-column prop="arrTerminal" label="到达航楼站" width="50" align="center"></el-table-column>
        <el-table-column prop="arrTime" label="到达时间" width="50" align="center"></el-table-column>
        <el-table-column prop="distance" label="航程" width="50" align="center"></el-table-column>
        <el-table-column label="飞行时间" width="110" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flightTimes" class="el-icon-time"></i>
            <span>{{ formatDate(scope.row.flightTimes,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="constructionFee" label="机建费" width="50" align="center"></el-table-column>
        <el-table-column prop="fuelTax" label="燃油费" width="50" align="center"></el-table-column>
        <el-table-column prop="childFuelTax" label="儿童燃油费" width="50" align="center"></el-table-column>
        <el-table-column prop="planeType" label="机型" width="50" align="center"></el-table-column>
        <el-table-column prop="flightTypeFullName" label="机型全称" width="50" align="center"></el-table-column>
        <el-table-column prop="shareFlag" label="共享标记" width="50" align="center"></el-table-column>
        <el-table-column prop="stopFlag" label="经停标记" width="50" align="center"></el-table-column>
        <el-table-column prop="meal" label="餐食标记" width="50" align="center"></el-table-column>
        <el-table-column prop="stopCount" label="经停次数" width="50" align="center"></el-table-column>
        <el-table-column prop="cycle" label="飞行周期" width="50" align="center"></el-table-column>
        <el-table-column prop="refundRule" label="退票规则" width="50" align="center"></el-table-column>
        <el-table-column prop="changeRule" label="改签规则" width="50" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="contentBox">
      <el-row type="flex" justify="center">
        <h2>乘客信息:</h2>
      </el-row>
      <el-table
        :data="PassengerData"
        size="mini"
        highlight-current-row
        style="width: 100%;"
        border
        fit
      >
        <el-table-column prop="name" label="姓名" width="250" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="200" align="center"></el-table-column>
        <el-table-column label="出生年月" width="110" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.birthday" class="el-icon-time"></i>
            <span>{{ formatDate(scope.row.birthday,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ageType" label="乘机人类型 0 为成人,1 为儿童，2为婴儿" width="250" align="center">
          <template slot-scope="scope">
            <span>{{ formatAgeType(scope.row.ageType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardType" label="乘机人证件类型" width="250" align="center"></el-table-column>
        <el-table-column prop="cardNo" label="乘机人证件号" width="300" align="center"></el-table-column>
        <el-table-column label="票面价" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.viewPrice"></i>
            <span>{{formatAmount(scope.row.viewPrice)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderDetail",
  data() {
    return {
      flightData: [],
      PassengerData: [],
      tableData: {}
    };
  },
  methods: {
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
  created() {
    const paramData = this.$route.params;
    if (paramData) {
      this.tableData = paramData;
      if (paramData.passengers) {
        this.PassengerData = paramData.passengers;
      }
      if (paramData.flights) {
        this.flightData = paramData.flights;
      }
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
  }
};
</script>

