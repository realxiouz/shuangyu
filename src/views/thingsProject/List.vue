<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="handleSearch"/>
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
          <el-button size="mini" @click="handleEdit(scope.row.projectId)">修改</el-button>
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
      @prev-click="handlePrev"
      @next-click="handleNext"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :thingsProject-id="projectId" @refresh="handleRefresh"/>
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
      getList() {
        this.$store
          .dispatch("thingsProject/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId,
            params: this.params
          })
          .then(result => {
            this.tableData = result;
          });
      },
      getTotal() {
        this.$store.dispatch("thingsProject/getTotal").then(result => {
          this.total = result;
        });
      },
      loadData() {
        this.getList();
        this.getTotal();
      },
      handleSearch(params) {
        this.params = params;
        this.pageFlag = 0;
        this.lastId = null;
        this.loadData();
      },
      handleRefresh() {
        this.handleSearch();
      },
      handlePrev() {
        this.pageFlag = -1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[0].projectId;
        }
        this.loadData();
      },
      handleNext() {
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
      handleEdit(id) {
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
            this.handleRefresh();
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
