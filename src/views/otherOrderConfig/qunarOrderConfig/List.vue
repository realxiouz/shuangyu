<template>
  <div class="bigBox">
    <div class="searchBox">
      <qunar-order-config-search @onSearch="handleSearch" @onExport="handleExport"/>
    </div>
    <div class="contentBox">
      <!--<el-row style="margin-bottom:15px;margin-left:23px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>-->
      <el-table
        :data="tableData"
        size="mini"
        highlight-current-row
        style="width: 100%;margin-bottom:15px"
        v-loading="loading"
        max-height="650"
        fit
      >
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="订单号" width="160" align="center"></el-table-column>
        <el-table-column prop="createTime" width="150" label="订单日期" align="center"></el-table-column>
        <el-table-column
          prop="status"
          width="150"
          label="订单状态"
          :formatter="formatQunarStatus"
          align="center"
        ></el-table-column>
        <el-table-column label="乘机人" width="90" align="center">
          <template slot-scope="scope">
            <span v-html="formatPassengers(scope.row.passenger)"></span>
          </template>
        </el-table-column>
        <el-table-column label="起飞-到达" width="90" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlight2(scope.row.flight)"></span>
          </template>
        </el-table-column>
        <el-table-column label="航班日期/航班号" width="110" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlighCode(scope.row.flight)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="pnr" label="PNR" align="center"></el-table-column>
        <el-table-column label="总价/人数" width="120" align="center">
          <template slot-scope="scope">
            <span v-html="formatAmountAndPeople(scope.row.passenger)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="policySource" label="政策ID" width="200" align="center"></el-table-column>
        <el-table-column prop label="是否退差额" align="center"></el-table-column>
        <el-table-column prop label="锁定人" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button disabled @click="handleOrderDetail(scope.row)" type="primary" size="mini">查看</el-button>
            <el-button @click="lookLogInfo(scope.row)" type="primary" size="mini">查看日志</el-button>

            <el-button disabled type="danger" size="mini">处理</el-button>
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
    <div>
      <el-dialog
        title="查看日志"
        :visible.sync="dialogVisible"
        width="35%"
        center
        :close-on-click-modal="false"
      >
        <div v-if="dialogVisible">
          <el-table :data="logData.log" size="mini" highlight-current-row fit>
            <el-table-column type="index" width="50" align="center"></el-table-column>
            <el-table-column prop="operator" label="操作员" width="80" align="center"></el-table-column>
            <el-table-column prop="time" align="center" width="180" label="操作时间"></el-table-column>
            <el-table-column prop="action" align="left" label="操作内容"></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer" style="text-align:right ;margin-top:15px">
            <el-button size="mini" @click="handleCancel">返 回</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import qunarOrderConfigSearch from "./Search";

  import {
    formatOrderType,
    formatVoyageType,
    formatCategory
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
        dialogVisible: false,
        logData: {}
      };
    },
    components: {
      qunarOrderConfigSearch
    },
    methods: {
      formatOrderType,
      formatVoyageType,
      formatCategory,
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
          .dispatch("qunarOrderConfig/getList", {filters: params})
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
          .dispatch("qunarOrderConfig/getTotal", {filters: params})
          .then(data => {
            if (data >= 0) {
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
          this.$store.dispatch("qunarOrderConfig/Export", {filters: this.searchParams})
            .then(data => {
          })
            .catch(error => {
              console.log(error);
            });
        }
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleOrderDetail(row) {
        let path = "";
        path = "/qunar/order/detail";
        this.$router.push({
          path: path,
          query: {
            orderNo: row.orderNo
          }
        });
      },
      lookLogInfo(row) {
        if (row.log) {
          this.logData = row;
        }
        this.dialogVisible = true;
      }
    },
    created() {
      this.loadData(this.searchParams);
    }
  };
</script>
