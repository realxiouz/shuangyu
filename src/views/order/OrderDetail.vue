<template>
  <div class="contentBox">
    <h2>订单详情:</h2>
    <el-form :inline="true" :model="tableData">
      <el-form-item label="订单编号:">
        <span>{{tableData.orderNo}}</span>
      </el-form-item>
      <el-form-item label="销售出票订单编号:">
        <span>{{tableData.rootOrderNo}}</span>
      </el-form-item>
      <el-form-item label="订单来源:">
        <span>{{tableData.orderSource}}</span>
      </el-form-item>
      <el-form-item label="订单来源单号:">
        <span>{{tableData.sourceOrderNo}}</span>
      </el-form-item>
      <el-form-item label="政策代码:">
        <span>{{tableData.policyCode}}</span>
      </el-form-item>
      <el-form-item label="政策类型:">
        <span>{{tableData.policyType}}</span>
      </el-form-item>
      <el-form-item label="订单类型:">
        <span>{{tableData.categoryName}}</span>
      </el-form-item>
      <el-form-item label="订单状态:">
        <span>{{tableData.statusName}}</span>
      </el-form-item>
      <el-form-item label="最晚出票时限:">
        <template>
          <i v-if="tableData.deadlineTicketTime"></i>
          <span style="margin-left: 10px">{{ formatDate(tableData.deadlineTicketTime,'YYYY-MM-DD') }}</span>
        </template>
      </el-form-item>
      <el-form-item label="退改签说明:">
        <span>{{tableData.RefundChangeRule}}</span>
      </el-form-item>
      <el-form-item label="金额:">
        <span>{{tableData.amount}}</span>
      </el-form-item>
      <el-form-item label="航程类型:">
        <span>{{tableData.voyageTypeName}}</span>
      </el-form-item>
      <el-form-item label="PNR:">
        <span>{{tableData.pnr}}</span>
      </el-form-item>
      <el-form-item label="大编:">
        <span>{{tableData.bigPnr}}</span>
      </el-form-item>
      <el-form-item label="业务完结时间:">
        <template>
          <i v-if="tableData.finishTime"></i>
          <span style="margin-left: 10px">{{ formatDate(tableData.finishTime,'YYYY-MM-DD') }}</span>
        </template>
      </el-form-item>
      <el-form-item label="交易金额:">
        <span>{{tableData.transactionAmount}}</span>
      </el-form-item>
      <el-form-item label="交易编号:">
        <span>{{tableData.transactionNo}}</span>
      </el-form-item>
      <el-form-item label="业务编号:">
        <span>{{tableData.businessNo}}</span>
      </el-form-item>
      <el-form-item label="交易时间:">
        <template>
          <i v-if="tableData.transactionTime"></i>
          <span style="margin-left: 10px">{{ formatDate(tableData.transactionTime,'YYYY-MM-DD') }}</span>
        </template>
      </el-form-item>
      <el-form-item label="资金账号:">
        <span>{{tableData.fundAccount}}</span>
      </el-form-item>
      <el-form-item label="企业/单位域名:">
        <span>{{tableData.domain}}</span>
      </el-form-item>
    </el-form>
    <h2>航班信息:</h2>
    <el-table :data="flightData"
              size="mini"
              highlight-current-row
              style="width: 100%;"
              border
              fit>
      <el-table-column
        prop="cabin"
        label="舱位"
        width="160"
      ></el-table-column>
      <el-table-column
        label="出发日期"
        width="110"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.flightDate" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.flightDate,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="airlineCode"
        label="航司"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="actFlightCode"
        label="主航班号"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="flightCode"
        label="航班号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="dpt"
        label="出发地三字码"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="dptAirport"
        label="出发机场"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="dptTerminal"
        label="出发航楼站"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="dptTime"
        label="起飞时间"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="arr"
        label="到达地三字码"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="arrAirport"
        label="到达机场"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="arrTerminal"
        label="到达航楼站"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="arrTime"
        label="到达时间"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="distance"
        label="航程"
        width="50"
      ></el-table-column>
      <el-table-column
        label="飞行时间"
        width="110"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.flightTimes" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.flightTimes,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="constructionFee"
        label="机建费"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="fuelTax"
        label="燃油费"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="childFuelTax"
        label="儿童燃油费"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="planeType"
        label="机型"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="flightTypeFullName"
        label="机型全称"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="shareFlag"
        label="共享标记"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="stopFlag"
        label="经停标记"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="meal"
        label="餐食标记"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="stopCount"
        label="经停次数"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="cycle"
        label="飞行周期"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="refundRule"
        label="退票规则"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="changeRule"
        label="改签规则"
        width="50"
      ></el-table-column>
    </el-table>

    <h2>乘客信息:</h2>
    <el-table :data="PassengerData"
              size="mini"
              highlight-current-row
              style="width: 100%;"
              border
              fit>
      <el-table-column
        prop="name"
        label="姓名"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="200"
      ></el-table-column>
      <el-table-column
        label="出生年月"
        width="110"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.birthday" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.birthday,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ageType"
        label="乘机人类型 0 为成人,1 为儿童，2为婴儿"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="cardType"
        label="乘机人证件类型"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="cardNo"
        label="乘机人证件号"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="viewPrice"
        label="票面价"
        width="150"
      ></el-table-column>
    </el-table>
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
                    return '';
                }
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
                return function (dateStr, format) {
                    return this.initDate(dateStr, format);
                }
            },
        },
    };
</script>

