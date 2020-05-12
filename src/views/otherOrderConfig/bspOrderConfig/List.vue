<template>
  <div class="bigBox">
    <div class="searchBox">
      <bsp-order-config-search @onSearch="handleSearch" />
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:23px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
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
        <el-table-column prop="orderNo" label="订单号" width="240" align="center"></el-table-column>
        <el-table-column prop="createTime" width="90" label="订单日期" align="center"></el-table-column>
        <el-table-column label="乘机人" width="90" align="center">
          <template slot-scope="scope">
            <span v-html="formatPassengers(scope.row.passenger)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="ticketNo" width="90" label="票号" align="center"></el-table-column>

        <el-table-column label="起飞-到达" width="90" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlight2(scope.row.flight)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="pnr" label="PNR" align="center"></el-table-column>
        <el-table-column prop="status" label="订单状态" :formatter="formatQunarStatus" align="center"></el-table-column>
        <el-table-column prop="policySource" label="政策ID" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button disabled @click="handleEdit(scope.row)" type="primary" size="mini">查看</el-button>
            <el-button disabled @click="handleDelete(scope.row)" type="danger" size="mini">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        :current-page="currentPage"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import bspOrderConfigSearch from "./Search";
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
  formatFlight2,
  formatFlighCode,
  formatAmount,
  formatAmountAndPeople,
  formatQunarStatus
} from "@/utils/orderFormdata.js";

export default {
  name: "qunarOrderConfig",
  data() {
    return {
      loading: true,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchParams: {},
      count: []
    };
  },
  components: {
    bspOrderConfigSearch
  },
  methods: {
    formatCategory,
    formatOrderType,
    formatVoyageType,
    formatPassengers,
    formatTicketNo,
    formatFlightDate,
    formatFlightNo,
    formatFlight2,
    formatFlighCode,
    formatAmount,
    formatAmountAndPeople,
    formatQunarStatus,
    handleSizeChange(size) {
      this.pageSize = size;
      this.searchParams.pageSize = this.pageSize;
      this.loadData(this.searchParams);
    },
    prevClick() {},
    nextClick() {},
    loadData(params) {
      this.$store
        .dispatch("bspOrderConfig/getList", {
          filters: params
        })
        .then(data => {
          if (data) {
            this.loadTotal(params);
            console.log(data,"daa")
            this.tableData = data;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    loadTotal(params) {
      this.$store
        .dispatch("bspOrderConfig/getTotal", {
          filters: params
        })
        .then(data => {
          if (data) {
            this.total = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSearch(params) {
      if (!params) {
        params = {};
        this.searchParams = params;
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
        this.loadData(this.searchParams);
        this.$message({
          type: "success",
          message: "查询成功！"
        });
      }
    },
    handleAdd() {},
    handleSave(formData) {},
    handleCancel() {},
    handleEdit(row) {},
    handleDelete(row) {}
  },
  created() {
    this.loadData(this.searchParams);
  }
};
</script>
