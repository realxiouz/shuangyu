<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加项目</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="项目名称" width="300" prop="projectName"/>
      <el-table-column label="企业名称" width="100" prop="firmName"/>
      <el-table-column label="客户名称" width="100" prop="merchantName"/>
      <el-table-column label="备注" prop="description"/>
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row.projectId)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.projectId)">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :thingsProject-id="projectId" @refresh="onRefresh"/>
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
        projectId: '',
        params: {}
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
      loadData() {
        if (!this._.isEmpty(this.lastId)) {
          this.params.lastId = this.lastId;
        }
        this.$store
          .dispatch("thingsProject/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            params: this.params
          })
          .then(data => {
            this.tableData = data.rows;
            this.total = data.total;
          });
      },
      onSearch(params) {
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
          this.lastId = this.tableData[0].projectId;
        }
        this.loadData();
      },
      onNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].projectId;
        }
        this.loadData();
      },
      handleAdd() {
        this.projectId = '';
        this.dialogVisible = true;
      },
      onEdit(id) {
        this.projectId = id;
        this.dialogVisible = true;
      },
      handleDel(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("thingsProject/removeOne", {projectId: id}).then(() => {
            this.onRefresh();
            this.$message({type: "success", message: "删除成功"});
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
