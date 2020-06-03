<template>
  <div class="bigBox">
    <div class="searchBox">
      <order-report-search @onSearch="handleSearch"></order-report-search>
    </div>
    <div class="contentBox">
      <el-table
        :data="tableData"
        size="mini"
        highlight-current-row
        style="width: 100%;margin-bottom:15px"
        v-loading="loading"
        show-summary
        :summary-method="getSummaries"
        fit
      >
        <el-table-column label="序号" type="index" width="50" align="center">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号" align="center" width="180"></el-table-column>
        <el-table-column
          prop="orderStatus"
          :formatter="formatOrderStatus"
          label="订单状态"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column label="航班号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatFlightNo(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="航司" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAirlineCode(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="出发日期" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatFlightDate(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="起飞 -- 到达" width="100" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlight(scope.row.flights)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80" align="center"></el-table-column>
        <el-table-column prop="ticketNo" label="票号" align="center"></el-table-column>
        <el-table-column prop="status" label="票号状态" width="100" align="center"></el-table-column>
        <el-table-column prop="amount" label="金额" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.orderAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              disabled
              @click="handleUpdate(scope.row.deptId)"
              type="primary"
              size="mini"
            >编辑</el-button>
            <el-button
              disabled
              @click.native.prevent="handleRemove(scope.row.deptId)"
              type="danger"
              size="mini"
            >删除</el-button>
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
import orderReportSearch from "./Search.vue";
import {
  formatOrderStatus,
  formatCategory,
  formatOrderType
} from "@/utils/status.js";

import {
  formatTicketNo,
  formatFlightDate,
  formatFlightNo,
  formatFlight,
  formatAmount,
  formatAirlineCode
} from "@/utils/orderFormdata.js";

export default {
  name: "orderReportList",
  data() {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      tableData: [],
      searchParams: {},
      count: []
    };
  },
  methods: {
    formatOrderStatus,
    formatCategory,
    formatOrderType,
    formatTicketNo,
    formatFlightDate,
    formatFlightNo,
    formatFlight,
    formatAmount,
    formatAirlineCode,
    handleSizeChange: function(size) {
      this.pageSize = size;
      this.searchParams.pageSize = this.pageSize;
      this.currentPage = 1;
      this.searchParams.currentPage = this.currentPage;
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
        .dispatch("ticket/getList", {
          filters: params
        })
        .then(data => {
          if (data) {
            this.tableData = data;
            this.loadTotal(params);
            this.loadCount(params);
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
        .dispatch("ticket/getTotal", {
          filters: params
        })
        .then(data => {
            this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadCount(params) {
      this.$store
        .dispatch("ticket/getCount", {
          filters: params
        })
        .then(data => {
          if (data) {
            this.count = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSummaries(params) {
      const { columns, data } = params;
      const sums = [];
      columns.forEach((item, index) => {
        if (index === 0) {
          sums[index] = "统计";
          return;
        }
        switch (item.property !== "" && item.property) {
          case "amount":
            sums[index] =
              "￥" + this.$numeral(this.count.amount).format("0,0.00");
            break;
          case "orderAmount":
            sums[index] =
              "￥" + this.$numeral(this.count.orderAmount).format("0,0.00");
            break;
          default:
            sums[index] = "";
            break;
        }
      });
      return sums;
    },
    handleAdd() {
      this.dialogVisible = true;
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
            if (key === "emptyData") {
              params[key].forEach(item => {
                newParams[item] = "";
              });
            } else {
              let start = "start" + key.charAt(0).toUpperCase() + key.slice(1);
              let end = "end" + key.charAt(0).toUpperCase() + key.slice(1);
              newParams[start] = params[key][0];
              newParams[end] = params[key][1];
            }
          } else if (params[key]) {
            newParams[key] = params[key];
          }
        }
        newParams.pageSize = this.pageSize;
        this.currentPage = 1;
        newParams.currentPage = this.currentPage;
        this.searchParams = newParams;
        this.loadData(this.searchParams);
      }
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleSave() {},
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    }
  },
  components: {
    orderReportSearch
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  },
  created() {
    this.loadData(this.searchParams);
  }
};
</script>
