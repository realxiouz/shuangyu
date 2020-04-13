<template>
  <div class="bigBox">
    <div class="searchBox">
      <!-- <span style="font-size:12px;">你好 {{this.$store.state.loginInfo.fullName}}！</span> -->
      <span>
        <el-button type size="mini">
          待处理
          <el-badge :value="counts?counts.totalCount:'0'" :max="99"></el-badge>
        </el-button>
      </span>

      <div style="margin-top:10px;">
        <span>
          <el-button type size="mini">
            出票
            <el-badge :value="12"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button type size="mini">
            退票
            <el-badge :value="12"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button type size="mini">
            改签
            <el-badge :value="12"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button type size="mini">
            未出票申请退款
            <el-badge :value="12"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button type size="mini">
            消息
            <el-badge :value="12"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button type size="mini">
            消息
            <el-badge :value="12"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button type size="mini">
            补订单
            <el-badge :value="12"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button type size="mini">
            填写订单号
            <el-badge :value="12"></el-badge>
          </el-button>
        </span>
      </div>
    </div>
    <div class="contentBox">
      <order-task-search @onSearch="handleSearch"></order-task-search>
    </div>
    <div class="contentBox">
      <el-table
        :data="tableData"
        ref="tableData"
        style="width: 100%;margin-bottom:15px;"
        size="mini"
        v-loading="loading"
      >
        <el-table-column prop="taskNo" label="任务编号" align="center"></el-table-column>
        <el-table-column prop="sourceOrderNo" label="订单来源单号" align="center"></el-table-column>
        <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
        <el-table-column prop="fullName" label="员工姓名" align="center"></el-table-column>
        <el-table-column prop="taskType" label="任务类型" align="center">
          <template slot-scope="scope">
            <span>{{ formatTaskType(scope.row.taskType)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ruleType" label="规则类型" align="center">
          <template slot-scope="scope">
            <span>{{ formatTaskType(scope.row.taskType)==0?"系统":"手工"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profit" label="利润" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.profit)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态" align="center"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.startTime,'YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.endTime,'YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="持续时长" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>

        <el-table-column label="操作" align="center" width="80">
          <el-button type="primary" size="mini">处理</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
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
import orderTaskSearch from "./Search.vue";

export default {
  name: "orderTask",
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
      counts: []
    };
  },
  components: {
    orderTaskSearch
  },
  methods: {
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
            this.counts = data;
            this.counts.taskTypes.forEach((item)=>{

            })
          }
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
    formatAmount(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    },
    formatTaskType(taskType) {
      if (!taskType) {
        return "";
      } else if (taskType == 1) {
        return "出票（支付成功等待出票）";
      } else if (taskType == 2) {
        return "退票（申请退票）";
      } else if (taskType == 3) {
        return "改签（申请改签）";
      } else if (taskType == 4) {
        return "未出票申请退款（未出票申请退款）";
      } else if (taskType == 5) {
        return "消息";
      } else if (taskType == 6) {
        return "质检";
      } else if (taskType == 11) {
        return "补订单";
      } else if (taskType == 12) {
        return "填写订单号";
      } else {
        return "";
      }
    },
    handleSearch(params) {
      const newParams = {};
      if (params) {
        for (let key in params) {
          if (params[key]) {
            newParams[key] = params[key];
          }
        }
      }
      this.loadData(newParams);
      this.$message({
        type: "success",
        message: "查询成功！"
      });
    }
  },
  created() {
    this.loadData();
    this.loadPendingTotal();
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