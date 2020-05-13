<template>
  <div class="contentBox">
    <qunar-order-config-search @onSearch="handleSearch" />
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      size="mini"
      highlight-current-row
      style="width: 100%;margin-bottom:15px"
      v-loading="loading"
      max-height="650"
      fit
    >
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="domain" label="订单号" width="180" align="center"></el-table-column>
      <el-table-column label="类型" width="100" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ formatFirmData(scope.row.firmId) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单日期" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ formatPartyData(scope.row.thirdId) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="乘机人" width="90" align="center"></el-table-column>
      <el-table-column label="票号" width="90" align="center"></el-table-column>
      <el-table-column label="起飞-到达" width="90" align="center"></el-table-column>
      <el-table-column label="航班日期/航班号" width="150" align="center"></el-table-column>
      <el-table-column prop="user" label="PNR" align="center"></el-table-column>
      <el-table-column prop="ips" label="总价/人数" align="center"></el-table-column>
      <el-table-column prop label="订单状态" align="center"></el-table-column>
      <el-table-column prop label="政策ID" align="center"></el-table-column>
      <el-table-column prop label="是否退差额" align="center"></el-table-column>
      <el-table-column prop label="锁定人" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button disabled @click="handleEdit(scope.row)" type="primary" size="mini">查看</el-button>
          <el-button disabled @click="handleDelete(scope.row)" type="danger" size="mini">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import qunarOrderConfigSearch from "./Search";
import {
  formatCategory,
  formatOrderType,
  formatVoyageType
} from "@/utils/status.js";
import {
  formatPassengers,
  formatTicketNo,
  formatFlightDate,
  formatFlightNo,
  formatFlight,
  formatAmount
} from "@/utils/orderFormdata.js";

export default {
  name: "goTicket",
  props:['tableData',"loading"],
  data() {
    return {
      searchParams: {},
    };
  },
  components: {
    qunarOrderConfigSearch
  },
  methods: {
    formatCategory,
    formatOrderType,
    formatVoyageType,
    formatPassengers,
    formatTicketNo,
    formatFlightDate,
    formatFlightNo,
    formatFlight,
    formatAmount,
    handleSearch(params) {
      if (!params) {
        params = {};
        this.searchParams = params;
        this.searchParams.orderType = 30;
        this.$emit("onLoadData", this.searchParams);
      } else {
        const newParams = {};
        for (let key in params) {
          if (params[key] && _.isArray(params[key])) {
            let start = "start" + key.charAt(0).toUpperCase() + key.slice(1);
            let end = "end" + key.charAt(0).toUpperCase() + key.slice(1);
            newParams[start] = params[key][0];
            newParams[end] = params[key][1];
          } else if (params[key]) {
            newParams[key] = params[key];
          }
        }
        this.searchParams = newParams;
        this.searchParams.pageSize = this.pageSize;
        this.searchParams.orderType = 30;
        this.$emit("onLoadData", this.searchParams);
        this.$message({
          type: "success",
          message: "查询成功！"
        });
      }
    },
    handleSave(formData) {},
    handleCancel() {},
    handleEdit(row) {},
    handleDelete(row) {}
  },
  created() {}
};
</script>
