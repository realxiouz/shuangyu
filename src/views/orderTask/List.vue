<template>
  <div class="bigBox">
    <div class="searchBox">
      <order-task-search  @onSearch="handleSearch"></order-task-search>
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
      searchParams: {}
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
    prevClick() {
      if (parseInt(this.total / this.pageSize) == 1) {
        this.taskId = "blank";
        this.createTime = 0;
        this.loadData();
      } else {
        this.taskId = this.tableData[0].taskId;
        this.createTime = this.tableData[0].createTime;
        this.loadData();
      }
    },
    nextClick() {
      this.taskId = this.tableData[this.tableData.length - 1].taskId;
      this.createTime = this.tableData[this.tableData.length - 1].createTime;
      this.loadData();
    },
    loadData() {
      this.$store
        .dispatch("orderTask/getPageList", {
          pageSize: this.pageSize,
          createTime: this.createTime,
          taskId: this.taskId
        })
        .then(data => {
          if (data) {
            this.tableData = data;
          }
          this.loading = false;
        })
        .catch(error => {
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
      if (null != dateStr && dateStr != 0) {
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
      // 任务类型，1:出票（支付成功等待出票），
      // 2：退票（申请退票），
      // 3：改签（申请改签），
      // 4：未出票申请退款（未出票申请退款）
      // ，5：消息，
      // 6：质检，11：补订单，12：填写订单号
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
    handleSearch(params){
      console.log(params)

    }
  },
  created() {
    this.loadData();
    this.loadTotal();
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
