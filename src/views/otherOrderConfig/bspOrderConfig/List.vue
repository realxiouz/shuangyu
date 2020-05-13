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
        <el-table-column
          prop="orderType"
          :formatter="formatOrderType"
          width="90"
          label="订单状态"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="category"
          :formatter="formatCategory"
          width="90"
          label="订单类型"
          align="center"
        ></el-table-column>
        <el-table-column prop="ticketNo" width="120" label="票号" align="center"></el-table-column>

        <el-table-column label="起飞-到达" width="110" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlight(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="constructionFee" label="机建费" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.constructionFee)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fuelTax" label="燃油费" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.fuelTax)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="出票时间" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.ticketTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="transactionTime" width="160" label="交易时间" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.transactionTime,'YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="finishTime" width="160" label="交易完成时间" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.finishTime,'YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pnr" label="PNR" align="center"></el-table-column>
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
  formatTicketNo,
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
    };
  },
  components: {
    bspOrderConfigSearch
  },
  methods: {
    formatCategory,
    formatOrderType,
    formatVoyageType,
    formatTicketNo,
    formatAmount,
    formatAmountAndPeople,
    formatQunarStatus,
    handleSizeChange(size) {
      this.pageSize = size;
      this.searchParams.pageSize = this.pageSize;
      this.loadData(this.searchParams);
    },
    prevClick(page) {
      this.currentPage = page;
      this.searchParams.pageSize = this.pageSize;
      this.searchParams.currentPage = this.currentPage;
      this.loadData(this.searchParams);
    },
    nextClick(page) {
      this.currentPage = page;
      this.searchParams.pageSize = this.pageSize;
      this.searchParams.currentPage = this.currentPage;
      this.loadData(this.searchParams);
    },
    loadData(params) {
      this.$store
        .dispatch("bspOrderConfig/getList", { filters: params })
        .then(data => {
          if (data) {
            this.loadTotal(params);
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
        .dispatch("bspOrderConfig/getTotal", { filters: params })
        .then(data => {
          if (data) {
            this.total = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatFlight(data) {
      if (!data) {
        return "";
      }
      if (data.arr && data.dpt) {
        return data.dpt + " - " + data.arr;
      } else {
        return data.dpt;
      }
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
    formatDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
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
