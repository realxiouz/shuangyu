<template>
  <div class="bigBox">
    <div class="searchBox">
      <div style="margin-top:10px;">
        <span>
          <el-button @click="geAllData()" type="info" size="mini">
            待处理
            <el-badge
              :value="totalCount ? totalCount : '0'"
              :max="99"
            ></el-badge>
          </el-button>
        </span>
        <span
          v-for="item in taskTypeValue"
          :key="item.value"
          style="margin-right:5px;"
        >
          <el-button
            style="margin-bottom:10px;"
            @click="getOtherData(item.value)"
            type
            size="mini"
          >
            {{ item.label }}
            <el-badge
              :value="
                taskTypeCounts['taskType' + item.value]
                  ? taskTypeCounts['taskType' + item.value]
                  : '0'
              "
              :max="99"
            ></el-badge>
          </el-button>
        </span>
      </div>
    </div>
    <div class="contentBox">
      <order-task-search @onSearch="onSearch" ref="search"></order-task-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px;">
        <el-button
          :disabled="this.btnTransfer"
          icon="el-icon-document-copy"
          type="primary"
          size="mini"
          @click="batchTaskTransfer"
          >批量转单</el-button
        >
      </el-row>
      <el-table
        :data="tableData"
        ref="tableData"
        style="width: 100%;margin-bottom:15px;"
        @selection-change="handleSelectionChange"
        size="mini"
        v-loading="loading"
        highlight-current-row
      >
        <el-table-column
          :selectable="selectable"
          type="selection"
          width="55"
        ></el-table-column>
        <!--<el-table-column prop="taskNo" label="任务编号" width="110" align="center"></el-table-column>-->
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
        <el-table-column
          prop="ticketNos"
          label="票号"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span v-html="formatTicketNo(scope.row.ticketNos)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fullName"
          label="操作员"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column label="乘机人" align="center" width="100">
          <template slot-scope="scope">
            <i v-if="scope.row.passengers"></i>
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
          align="center"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="80">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.taskStatus != 3"
              type="primary"
              @click="goToDetail(scope.row)"
              size="mini"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
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
        <span style="font-weight: 400;color:#565656;"
          >第{{ currentPage }}页</span
        >
      </el-pagination>
    </div>
    <div>
      <el-dialog
        title="选择转单员工"
        center
        :visible.sync="taskStaffDialog"
        width="33%"
        :close-on-click-modal="false"
        :destroy-on-close="true"
      >
        <task-select-staff
          v-if="taskStaffDialog"
          @onCancel="onCancel"
          @onSave="handleConfirm"
        ></task-select-staff>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import orderTaskSearch from "./Search.vue";
import taskSelectStaff from "./selectStaff";
import {
  formatTaskType,
  formatTaskStatus,
  taskTypeValue
} from "@/utils/status.js";
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
  name: "orderTask",
  data() {
    return {
      loading: true,
      currentPage: 1,
      btnTransfer: true,
      taskStaffDialog: false,
      tableData: [],
      pageSize: 10,
      createTime: 0,
      taskId: "blank",
      total: 0,
      searchParams: {},
      //otherDataSearch: {},
      //allDataSearch: {},
      totalCount: 0,
      taskTypeCounts: {},
      selectTask: [],
      timer: null,
      taskTypeValue: taskTypeValue
    };
  },
  components: {
    orderTaskSearch,
    taskSelectStaff
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
        .dispatch("orderTask/getPageList", {
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
    loadPendingTotal() {
      this.$store
        .dispatch("orderTask/getPendingTotal", {
          filters: {}
        })
        .then(data => {
          if (data) {
            let temp = [];
            data.taskTypes.forEach(item => {
              for (let key in item) {
                if (key == "taskType") {
                  this.taskTypeCounts[key + item[key]] = item.count;
                }
              }
            });
            this.totalCount = data.totalCount;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 表格
    handleSelectionChange(row) {
      if (row.length > 0) {
        this.btnTransfer = false;
      } else {
        this.btnTransfer = true;
      }
      this.selectTask = row;
    },
    // 批量转单弹框
    batchTaskTransfer() {
      this.taskStaffDialog = true;
    },
    // 批量转单弹框取消
    taskTransfer(params) {
      this.$store
        .dispatch("orderTask/taskTransfer", params)
        .then(data => {
          if (data) {
            setTimeout(() => {
              this.loadData();
            }, 3000);
            this.$message({
              type: "success",
              message: "转单成功！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onCancel() {
      this.taskStaffDialog = false;
    },
    handleConfirm(id) {
      let params = {
        orderTaskIds: "",
        staffId: id
      };
      let str = [];
      this.selectTask.forEach(item => {
        str.push(item.taskId);
      });
      params.orderTaskIds = str;
      this.taskTransfer(params);
      this.taskStaffDialog = false;
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
    // 获得待处理总的数据
    geAllData() {
      let newParams = {};
      newParams.taskStatus = "1";
      this.$refs.search.formData = newParams;
      newParams.pageSize = this.pageSize;
      this.currentPage = 1;
      newParams.currentPage = this.currentPage;
      this.searchParams = newParams;
      this.loadData(newParams);
    },
    // 根据顶部得到按钮得到数据（出票，退票，改签。。。。）
    getOtherData(taskType) {
      let newParams = {};
      newParams.taskType = taskType;
      newParams.taskStatus = "1";
      this.$refs.search.formData = newParams;
      newParams.pageSize = this.pageSize;
      this.currentPage = 1;
      newParams.currentPage = this.currentPage;
      this.searchParams = newParams;
      this.loadData(newParams);
    },
    // 调转详情页
    goToDetail(row) {
      console.log(JSON.stringify(row));

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
    selectable(row) {
      if (row.taskStatus == 3) {
        return false;
      } else {
        return true;
      }
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
    this.loadPendingTotal();
    this.timer = setInterval(() => {
      setTimeout(this.loadPendingTotal, 0);
    }, 10000);
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  },
  // 离开页面销毁定时器
  beforeDestroy() {
    if (this.timer) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer); //关闭
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
