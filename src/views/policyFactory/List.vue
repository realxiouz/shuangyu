<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="调度名称" align="center" prop="schedulerName" />
      <el-table-column label="xxlJobId" align="center" prop="jobInfoId" />
      <el-table-column label="时间表达式" align="center" prop="cron" />
      <el-table-column label="是否启动" align="center" prop="status">
        <template slot-scope="scope">
          <span> {{scope.row.status ? '已启动' : '未启动'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleStart(scope.row.schedulerId)" v-if="scope.row.status === 0">启动</el-button>
          <el-button size="mini" type="primary" @click="handleStop(scope.row.schedulerId)" v-if="scope.row.status === 1">停止</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.schedulerId)">编辑</el-button>
          <el-button size="mini" type="primary" @click="handleCopy(scope.row.schedulerId)">复制</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.schedulerId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :editSchedulerId="editSchedulerId" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";

  export default {
    data() {
      return {
        dialogVisible: false,
        pageFlag: 0,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        loading: true,
        editSchedulerId: null,
        params: {},
      };
    },
    methods: {
      formatDate(dateStr, format) {
        if (null != dateStr) {
          const date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      },
      getList() {
        if (this.lastId) {
          this.params.lastId = this.lastId;
        }
        this.params.tagCode = 'policyFactory';
        this.$store
          .dispatch("jobScheduler/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            params: this.params
          })
          .then(result => {
            if (result && result.rows && result.rows.length > 0) {
              this.tableData = result.rows;
              this.total = result.total;
            } else {
              this.tableData = [];
              this.total = 0;
            }
          });
      },
      loadData() {
        this.getList();
      },
      onSearch(params) {
        if(!params){
          params = {};
        }
        this.params = params;
        this.pageFlag = 0;
        this.lastId = null;
        this.loadData();
      },
      onRefresh() {
        this.onSearch();
      },
      onPrev() {
        this.pageFlag = -1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[0].schedulerId;
        }
        this.loadData();
      },
      onNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].schedulerId;
        }
        this.loadData();
      },
      handleStart() {
        alert("启动");
      },
      handleStop() {
        alert("停止");
      },
      handleAdd() {
        this.editSchedulerId = null;
        this.dialogVisible = true;
      },
      handleEdit(id) {
        this.editSchedulerId = id;
        this.dialogVisible = true;
      },
      handleDel(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("jobScheduler/removeOne", {schedulerId: id}).then(() => {
            this.onRefresh();
            this.$message({ type: "success", message: "删除成功" });
          });
        });
      }
    },
    components: {
      edit,
      search
    },
    created() {
      this.loadData();
    }
  };
</script>

<style>
  .page-tools {
    margin-bottom: 10px;
  }
</style>
