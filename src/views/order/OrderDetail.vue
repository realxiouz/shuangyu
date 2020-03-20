<template>
  <div class="order-container">
    <h1>订单详情</h1>

    <el-form :inline="true" :model="orderDetail">
      <el-form-item label="订单编号:">
        <scops>{{orderDetail.orderNo}}</scops>
      </el-form-item>
      <el-form-item label="销售出票订单编号:">
        <scops>{{orderDetail.rootOrderNo}}</scops>
      </el-form-item>
      <el-form-item label="订单状态:">
        <scops>{{orderDetail.status}}</scops>
      </el-form-item>
      <el-form-item label="金额:">
        <scops>{{orderDetail.amount}}</scops>
      </el-form-item>
      <el-form-item label="航程类型:">
        <scops>{{orderDetail.voyageType}}</scops>
      </el-form-item>
      <el-form-item label="PNR:">
        <scops>{{orderDetail.pnr}}</scops>
      </el-form-item>
      <el-form-item label="大编:">
        <scops>{{orderDetail.bigPnr}}</scops>
      </el-form-item>
      <el-form-item label="业务完结时间:">
        <scops>{{orderDetail.finishTime}}</scops>
      </el-form-item>
    </el-form>
    <h1>航班</h1>
    <el-table :data="flightTableData"
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
        prop="flightDate"
        label="出发日期"
        width="100"
      ></el-table-column>
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
        prop="flightTimes"
        label="飞行时间"
        width="50"
      ></el-table-column>
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
        prop="planeType"
        label="机型"
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
    <h1>乘客</h1>
    <el-table :data="PassengerTableData"
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
        prop="birthday"
        label="出生年月"
        width="250"
      ></el-table-column>
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
                flightTableData: [],
                PassengerTableData: [],
                orderDetail: {}
            };
        },
        methods: {

        },
        created() {
            console.log(this.$route);
            const paramData = this.$route.params;
            console.log(paramData);
        }

    };
</script>

