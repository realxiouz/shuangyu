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
      <el-table-column prop="orderNo" label="订单号" width="180" align="center"></el-table-column>
      <el-table-column prop="orderStatusDesc" label="订单状态" width="180" align="center"></el-table-column>
      <el-table-column label="订单日期" align="center">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="乘机人" width="90" align="center">
        <template slot-scope="scope">
          <span v-html="formatPassengers(scope.row.passengerInfos)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="refundAllFee" label="退票费" align="center">
        <template slot-scope="scope">
          <span v-html="formatAmount(scope.row.refundAllFee)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="refundTypeDesc" label="退票类型" width="180" align="center"></el-table-column>
      <el-table-column label="票号" width="90" align="center">
        <template slot-scope="scope">
          <span v-html="formatTicketNo(scope.row.passengerInfos)"></span>
        </template>
      </el-table-column>
      <el-table-column label="退票单号" width="90" align="center">
        <template slot-scope="scope">
          <span v-html="formatRefundOrderNo(scope.row.passengerInfos)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="账号" width="150" align="center"></el-table-column>
      <el-table-column prop="flightNo" label="航班号" width="150" align="center"></el-table-column>
      <el-table-column prop="depDate" label="航班日期" width="150" align="center"></el-table-column>
      <el-table-column prop="dep" label="起飞地" width="90" align="center"></el-table-column>
      <el-table-column prop="arr" label="到达地" width="90" align="center"></el-table-column>
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

import { formatAmount } from "@/utils/orderFormdata.js";

export default {
  name: "refundTicketList",
  props: ["tableData", "loading"],
  data() {
    return {
      searchParams: {}
    };
  },
  components: {
    qunarOrderConfigSearch
  },
  methods: {
    formatAmount,
    handleSearch(params) {
      if (!params) {
        params = {};
        this.searchParams = params;
        this.searchParams.orderType = 20;
        this.loadData(this.searchParams);
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
        this.searchParams.orderType = 20;

        this.loadData(this.searchParams);

        this.$message({
          type: "success",
          message: "查询成功！"
        });
      }
    },
    handleSave(formData) {},
    handleCancel() {},
    handleEdit(row) {},
    handleDelete(row) {},
    formatDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    formatPassengers(data) {
      if (!data || data.length == 0) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item.personName + "<br/>";
      });
      return str;
    },
    formatTicketNo(data) {
      if (!data || data.length == 0) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item.tktno + "<br/>";
      });
      return str;
    },
    formatRefundOrderNo(data) {
      if (!data || data.length == 0) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item.personName + "-" + item.refundOrderNo + "<br/>";
      });
      return str;
    }
  },
  created() {}
};
</script>
