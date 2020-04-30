<template>
  <div class="bigBox">
    <div class="searchBox">
      <span>
        <el-button @click="geAllData()" type size="mini">
          待处理
          <el-badge :value="totalCount?totalCount:'0'" :max="99"></el-badge>
        </el-button>
      </span>

      <div style="margin-top:10px;">
        <span>
          <el-button @click="getOtherData(1)" type size="mini">
            出票
            <el-badge :value="taskTypeCounts.taskType1?taskTypeCounts.taskType1:'0'" :max="99"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button @click="getOtherData(2)" type size="mini">
            退票
            <el-badge :value="taskTypeCounts.taskType2?taskTypeCounts.taskType2:'0'" :max="99"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button @click="getOtherData(3)" type size="mini">
            改签
            <el-badge :value="taskTypeCounts.taskType3?taskTypeCounts.taskType3:'0'" :max="99"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button @click="getOtherData(4)" type size="mini">
            未出票申请退款
            <el-badge :value="taskTypeCounts.taskType4?taskTypeCounts.taskType4:'0'" :max="99"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button @click="getOtherData(5)" type size="mini">
            消息
            <el-badge :value="taskTypeCounts.taskType5?taskTypeCounts.taskType5:'0'" :max="99"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button @click="getOtherData(6)" type size="mini">
            质检
            <el-badge :value="taskTypeCounts.taskType6?taskTypeCounts.taskType6:'0'" :max="99"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button @click="getOtherData(11)" type size="mini">
            补订单
            <el-badge :value="taskTypeCounts.taskType11?taskTypeCounts.taskType11:'0'" :max="99"></el-badge>
          </el-button>
        </span>
        <span>
          <el-button @click="getOtherData(12)" type size="mini">
            填写订单号
            <el-badge :value="taskTypeCounts.taskType12?taskTypeCounts.taskType12:'0'" :max="99"></el-badge>
          </el-button>
        </span>
      </div>
    </div>
    <div class="contentBox">
      <order-task-search @onSearch="handleSearch"></order-task-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px;">
        <el-button
          :disabled="this.btnTransfer"
          icon="el-icon-document-copy"
          type="primary"
          size="mini"
          @click="batchTaskTransfer"
        >批量转单</el-button>
      </el-row>
      <el-table
        :data="tableData"
        ref="tableData"
        style="width: 100%;margin-bottom:15px;"
        @selection-change="handleSelectionChange"
        size="mini"
        v-loading="loading"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="taskNo" label="任务编号" width="110" align="center"></el-table-column>
        <el-table-column prop="taskName" label="任务名称" width="80" align="center"></el-table-column>
        <el-table-column prop="taskType" :formatter="formatTaskType" label="任务类型" align="center"></el-table-column>
        <el-table-column prop="sourceOrderNo" label="订单来源单号" width="170" align="center"></el-table-column>
        <el-table-column prop="fullName" label="员工姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="ruleType" width="80" label="规则类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ruleType==0?"系统":"手工"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profit" label="利润" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.profit)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="taskStatus"
          :formatter="formatTaskStatus"
          label="任务状态"
          align="center"
        ></el-table-column>
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
        <el-table-column prop="duration" label="持续时长" width="80" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>

        <el-table-column label="操作" fixed="right" align="center" width="80">
          <template slot-scope="scope">
            <el-button type="primary" @click="goToDetail(scope.row)" size="mini">处理</el-button>
          </template>
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
    <div>
      <el-dialog
        title="选择转单员工"
        center
        :visible.sync="taskStaffDialog"
        width="33%"
        :close-on-click-modal="false"
      >
        <task-select-staff v-if="taskStaffDialog" @onCancel="onCancel" @onSave="handleConfirm"></task-select-staff>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import orderTaskSearch from "./Search.vue";
import taskSelectStaff from "./selectStaff";
import { formatTaskType, formatTaskStatus } from "@/utils/status.js";

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
      otherDataSearch: {},
      allDataSearch: {},
      totalCount: 0,
      taskTypeCounts: {},
      selectTask: [],
      timer: null
    };
  },
  components: {
    orderTaskSearch,
    taskSelectStaff
  },
  methods: {
    formatTaskStatus,
    formatTaskType,
    handleSizeChange(size) {
      this.pageSize = size;
      this.searchParams.pageSize = this.pageSize;
      let obj = {
        ...this.searchParams,
        ...this.allDataSearch,
        ...this.otherDataSearch
      };
      this.searchParams = obj;
      this.loadData(obj);
    },
    prevClick(page) {
      this.currentPage = page;
      this.searchParams.pageSize = this.pageSize;
      this.searchParams.currentPage = this.currentPage;
      let obj = {
        ...this.searchParams,
        ...this.allDataSearch,
        ...this.otherDataSearch
      };
      this.loadData(obj);
    },
    nextClick(page) {
      this.currentPage = page;
      this.searchParams.pageSize = this.pageSize;
      this.searchParams.currentPage = this.currentPage;
      let obj = {
        ...this.searchParams,
        ...this.allDataSearch,
        ...this.otherDataSearch
      };
      this.searchParams = obj;
      this.loadData(obj);
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
    formatAmount(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    },
    // 获得待处理总的数据
    geAllData() {
      let newParams = {};
      newParams.taskStatus = 1;
      this.allDataSearch = newParams;
      this.loadData(newParams);
    },
    // 根据顶部得到按钮得到数据（出票，退票，改签。。。。）
    getOtherData(taskType) {
      let params = {};
      params.taskType = taskType;
      this.otherDataSearch = params;
      this.loadData(params);
    },
    // 调转详情页
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
          remark:row.remark
        }
      });
    },
    handleSearch(params) {
      let newParams = {};
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
    this.geAllData();
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
