<template>
  <div class="bigBox">
    <div class="searchBox">
      <qunar-order-config-search @onSearch="handleSearch" />
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:23px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
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

        <el-table-column label="乘机人" width="90" align="center">
          <!-- <template slot-scope="scope">
            <span v-html="formatFlight(scope.row.flights)"></span>
          </template>-->
        </el-table-column>
        <el-table-column label="票号" width="90" align="center">
          <!-- <template slot-scope="scope">
            <span v-html="formatFlight(scope.row.flights)"></span>
          </template>-->
        </el-table-column>
        <el-table-column label="起飞-到达" width="90" align="center">
          <!-- <template slot-scope="scope">
            <span v-html="formatFlight(scope.row.flights)"></span>
          </template>-->
        </el-table-column>
        <el-table-column label="航班日期/航班号" width="150" align="center">
          <!-- <template slot-scope="scope">
            <span v-html="formatFlight(scope.row.flights)"></span>
          </template>-->
        </el-table-column>

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
  name: "pnrjyOrderConfig",
  data() {
    return {
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchParams: {},
      count: []
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
    handleSizeChange(){},
    prevClick() {},
    nextClick() {},
    loadData() {},
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
    this.loadData();
  }
};
</script>
