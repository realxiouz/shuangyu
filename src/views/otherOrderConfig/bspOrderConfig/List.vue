<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        :data="tableData"
        size="mini"
        highlight-current-row
        style="width: 100%;"
        v-loading="loading"
        max-height="650"
        fit
      >
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="订单号" width="240" align="center"></el-table-column>
        <el-table-column
          prop="status"
          :formatter="formatStatus"
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

        <el-table-column  label="起飞-到达" width="110" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlight(scope.row)"></span>
            <!--<span>{{ formatFlight(scope.row)}}</span>-->
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
            <el-button disabled @click="onEdit(scope.row)" type="text" size="mini" class="btn-primary">查看</el-button>
            <el-button disabled @click="onDel(scope.row)" type="text" size="mini" class="btn-primary">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-footer"
        @size-change="onSizeChange"
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
</template>

<script>
import search from "./Search";
import {
  formatCategory,
  formatStatus,
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
      searchParams: {}
    };
  },
  components: {
    search
  },
  methods: {
    formatCategory,
    formatStatus,
    formatVoyageType,
    formatTicketNo,
    formatAmount,
    formatAmountAndPeople,
    formatQunarStatus,
    onSizeChange(size) {
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
          if (data >= 0) {
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
    onSearch(params) {
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
    handleExport(params) {
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
        this.$store.dispatch("bspOrderConfig/exportOrder", {filters: this.searchParams})
          .then(data => {
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    formatDate(dateStr, format) {
      if (dateStr != null) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    handleAdd() {},
    handleSave(formData) {},
    handleCancel() {},
    onEdit(row) {},
    onDel(row) {}
  },
  created() {
    this.loadData(this.searchParams);
  }
};
</script>
