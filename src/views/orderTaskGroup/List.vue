<template>
  <div class="page">
    <search class="page-search" style="margin-bottom:10px" ref="search" @onSearch="onSearch" />
    <el-table
      class="page-table"
      :data="tableData"
      ref="tableData"
      style="width: 100%;"
      size="mini"
      v-loading="loading"
    >
      <!--<el-table-column prop="taskNo" label="任务编号" width="110" align="center"></el-table-column>-->
      <el-table-column type="index" width="55" align="center"></el-table-column>
      <el-table-column
        prop="taskName"
        label="任务名称"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="taskStatus"
        :formatter="formatTaskStatus"
        label="任务状态"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="fullName"
        label="操作员"
        width="70"
        align="center"
      ></el-table-column>

      <!-- <el-table-column prop="taskType" :formatter="formatTaskType" label="任务类型" align="center"></el-table-column> -->
      <el-table-column
        prop="orderNo"
        label="订单号"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sourceOrderNo"
        label="源单号"
        width="170"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="deadlineTicketTime"
        label="时限"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <div
            v-if="
              scope.row.taskType === 1 ||
                scope.row.taskType === 2 ||
                scope.row.taskType === 3
            "
          >
            <el-popover trigger="hover" placement="top">
              <span>{{ formatTimeLimit(scope.row) }}</span>
              <el-tag
                style="width:80px;"
                effect="dark"
                slot="reference"
                :color="formattimeLimitStyle(scope.row)"
              >
                {{ formatDiffTimeLimit(scope.row) }}
              </el-tag>
            </el-popover>
          </div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="ticketNos" label="票号" width="120" align="center">
        <template slot-scope="scope">
          <span v-html="formatTicketNo(scope.row.ticketNos)"></span>
        </template>
      </el-table-column>
      <el-table-column label="乘机人" align="center" width="100">
        <template slot-scope="scope">
          <span v-html="formatPassengers(scope.row.passengers)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单金额"
        prop="amount"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ formatAmount(scope.row.amount) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="transactionAmount"
        label="交易金额"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ formatAmount(scope.row.transactionAmount) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="利润" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ formatAmount(scope.row.profit) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="航班号" align="center">
        <template slot-scope="scope">
          <span>{{ formatFlightNo(scope.row.flights) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="航班日期" width="90" align="center">
        <template slot-scope="scope">
          <span>{{ formatFlightDate(scope.row.flights) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="起飞-到达" width="90" align="center">
        <template slot-scope="scope">
          <span v-html="formatFlight(scope.row.flights)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="政策代码"
        prop="policyCode"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="ruleType"
        width="80"
        label="规则类型"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.ruleType == 0 ? "系统" : "手工" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center">
        <template slot-scope="scope">
          <span>{{
            formatDate(scope.row.startTime, "YYYY-MM-DD HH:mm:ss")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center">
        <template slot-scope="scope">
          <span>{{
            formatDate(scope.row.endTime, "YYYY-MM-DD HH:mm:ss")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="duration"
        label="持续时长"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ formatDuration(scope.row.duration) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        fixed="right"
        width="200"
        label="备注"
        align="left"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="80">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.taskStatus != 3"
            type="text" size="mini" class="btn-primary"
            @click="goToDetail(scope.row)"
            >处理</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      :current-page="currentPage"
      @size-change="onSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,sizes,slot,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
    >
      <span style="font-weight: 400;color:#565656;">第{{ currentPage }}页</span>
    </el-pagination>
  </div>
</template>

<script>
import search from "./Search.vue";
import { formatTaskStatus, formatTaskType } from "@/utils/status.js";
import {
  formatPassengers,
  formatTicketNo,
  formatFlightDate,
  formatFlightNo,
  formatFlight,
  formatAmount,
  formatDuration,
  formatTimeLimit,
  formatDiffTimeLimit,
  formattimeLimitStyle,
  formatTimeLimitDuration
} from "@/utils/orderFormdata.js";

export default {
  name: "orderTaskGroup",
  data() {
    return {
      loading: true,
      currentPage: 1,
      tableData: [],
      pageSize: 10,
      createTime: 0,
      taskId: "blank",
      total: 0,
      searchParams: {},
      totalCount: 0
    };
  },
  components: {
    search
  },
  methods: {
    formatTaskStatus,
    formatTaskType,
    formatPassengers,
    formatTicketNo,
    formatFlightDate,
    formatFlightNo,
    formatFlight,
    formatAmount,
    formatDuration,
    formatTimeLimit,
    formatDiffTimeLimit,
    formattimeLimitStyle,
    formatTimeLimitDuration,
    onSizeChange(size) {
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
        .dispatch("orderTask/getGroupList", {
          filters: params
        })
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
        .dispatch("orderTask/getTotal", {
          filters: params
        })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (dateStr && dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    goToDetail(row) {
      let path = "";
      path = "/order/detail";
      this.$router.push({
        path: path,
        query: {
          orderNo: row.orderNo,
          rootOrderNo: row.rootOrderNo,
          taskId: row.taskId,
          taskType: row.taskType,
          remark: row.remark,
          fullName: row.fullName
        }
      });
    },
    onSearch(params) {
      let newParams = {};
      if (params) {
        for (let key in params) {
          if (params[key]) {
            newParams[key] = params[key];
          }
        }
      }
      newParams.pageSize = this.pageSize;
      this.currentPage = 1;
      newParams.currentPage = this.currentPage;
      this.searchParams = newParams;
      this.loadData(this.searchParams);
      this.$message({
        type: "success",
        message: "查询成功！"
      });
    }
  },
  created() {
    this.loadData();
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  }
};
</script>
<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
  padding-right: 10px;
}
</style>
