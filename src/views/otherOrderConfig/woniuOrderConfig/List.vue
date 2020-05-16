<template>
  <div class="bigBox">
    <div>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <div style="margin-top:10px;">
          <qunar-order-config-search
            ref="qunarOrderConfigSearch"
            :orderType="orderType"
            @onSearch="handleSearch"
          />
        </div>
        <el-divider></el-divider>
        <el-tab-pane label="出票订单" name="goTicket">
          <go-ticket
            v-if="orderType==10"
            @onLoadData="loadData"
            :tableData="tableData"
            :loading="loading"
          ></go-ticket>
        </el-tab-pane>
        <el-tab-pane label="退票订单" name="refundTicket">
          <refund-ticket
            v-if="orderType==20"
            @onLoadData="loadData"
            :tableData="tableData"
            :loading="loading"
          ></refund-ticket>
        </el-tab-pane>
        <el-tab-pane label="改签订单" name="changeTicket">
          <change-ticket
            v-if="orderType==30"
            @onLoadData="loadData"
            :tableData="tableData"
            :loading="loading"
          ></change-ticket>
        </el-tab-pane>
        <el-pagination
          style="margin-left:15px;"
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
      </el-tabs>
    </div>
  </div>
</template>

<script>
import goTicket from "./GoTicket";
import changeTicket from "./ChangeTicket";
import refundTicket from "./RefundTicket";
import qunarOrderConfigSearch from "./Search";

export default {
  name: "qunarOrderConfig",
  data() {
    return {
      activeName: "goTicket",
      loading: true,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      orderType: 10,
      searchParams: {}
    };
  },
  components: {
    goTicket,
    changeTicket,
    refundTicket,
    qunarOrderConfigSearch
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.searchParams.pageSize = this.pageSize;
      this.searchParams.orderType = this.orderType;
      this.loadData(this.searchParams);
    },
    prevClick(page) {
      this.currentPage = page;
      this.searchParams.pageSize = this.pageSize;
      this.searchParams.currentPage = this.currentPage;
      this.searchParams.orderType = this.orderType;
      this.loadData(this.searchParams);
    },
    nextClick(page) {
      this.currentPage = page;
      this.searchParams.pageSize = this.pageSize;
      this.searchParams.currentPage = this.currentPage;
      this.searchParams.orderType = this.orderType;
      this.loadData(this.searchParams);
    },
    handleClick(tab, event) {
      switch (tab.name) {
        case "goTicket":
          this.searchParams = {};
          this.$refs.qunarOrderConfigSearch.handleClear();
          this.orderType = 10;
          this.searchParams.orderType = this.orderType;
          this.loadData(this.searchParams);
          break;
        case "refundTicket":
          this.searchParams = {};
          this.$refs.qunarOrderConfigSearch.handleClear();
          this.orderType = 20;
          this.searchParams.orderType = this.orderType;
          this.loadData(this.searchParams);
          break;
        case "changeTicket":
          this.searchParams = {};
          this.$refs.qunarOrderConfigSearch.handleClear();
          this.orderType = 30;
          this.searchParams.orderType = this.orderType;
          this.loadData(this.searchParams);
          break;
      }
    },
    loadData(params) {
      this.$store
        .dispatch("woniuOrderConfig/getList", { filters: params })
        .then(data => {
          if (data) {
            this.loadTotal(params);
            // console.log(data, "woniuData");
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
        .dispatch("woniuOrderConfig/getTotal", { filters: params })
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
        this.searchParams.orderType = this.orderType;
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
        this.searchParams.orderType = this.orderType;
        this.loadData(this.searchParams);
        this.$message({
          type: "success",
          message: "查询成功！"
        });
      }
    }
  },
  created() {
    this.searchParams.orderType = this.orderType;
    this.loadData(this.searchParams);
  }
};
</script>
