<template>
  <div class="bigBox">
    <div class="searchBox">
      <tts-scheduler-search @onSearch="handleSearch"></tts-scheduler-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        fit
        default-expand-all
        size="mini"
      >
        <el-table-column prop="cron" label="时间表达式" width="150" align="center"></el-table-column>
        <el-table-column prop="schedulerName" label="调度名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column prop="status" label="调度程序状态" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" style="color: green">启动</span>
            <span v-else style="color: red">停止</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==1"
              @click="handleStop(scope.row.schedulerId)"
              type="danger"
              size="mini"
            >停止</el-button>
            <el-button
              v-else
              @click="handleStart(scope.row.schedulerId)"
              type="primary"
              size="mini"
            >启动</el-button>
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleCopy(scope.row)" type="primary" size="mini">复制</el-button>
            <el-button
              @click.native.prevent="removeOne(scope.row.schedulerId)"
              type="danger"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ttsSchedulerSearch from "./Search.vue";

export default {
  name: "ttsSchedulerList",
  data() {
    return {
      loading: true,
      schedulerId: "",
      searchForm: {},
      tableData: []
    };
  },
  methods: {
    handleStart(schedulerId) {
      if (schedulerId) {
        this.$store
          .dispatch("ttsScheduler/start", { schedulerId: schedulerId })
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleStop(schedulerId) {
      if (schedulerId) {
        this.$store
          .dispatch("ttsScheduler/stop", { schedulerId: schedulerId })
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleEdit(row) {
      if (row.status == 1) {
        this.$confirm("是否确定停止此产品，进行编辑?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("ttsScheduler/stop", { schedulerId: row.schedulerId })
              .then(() => {
                row.copyFlag = false;
                this.$router.push({ name: "ttsSchedulerEdit", params: row });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        row.copyFlag = false;
        this.$router.push({ name: "ttsSchedulerEdit", params: row });
      }
    },
    handleCopy(row) {
      row.copyFlag = true;
      this.$router.push({ name: "ttsSchedulerEdit", params: row });
    },
    handleAdd() {
      this.$router.push("/tts/scheduler/edit");
    },
    loadData() {
      this.$store
        .dispatch("ttsScheduler/getList", {
          searchForm: this.searchForm
        })
        .then(data => {
          if (data) {
            this.tableData = data;
            this.loadData = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSearch(params) {
      this.searchForm = params;
      this.loadData();
    },
    removeOne(id) {
      this.$confirm("是否确定删除TTS调度信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("ttsScheduler/removeOne", { schedulerId: id })
            .then(() => {
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  created() {
    this.loadData();
  },
  components: {
    ttsSchedulerSearch
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
