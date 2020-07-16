<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="handleSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="开放平台编码" align="center" prop="openCode" />
      <el-table-column label="开放平台名称" align="center" prop="openName" />
      <el-table-column label="企业名称" align="center" prop="firmName" />
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.authId)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.authId)">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :editAuthId="editAuthId" @refresh="handleRefresh"/>
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
        editAuthId: null,
        params: {},
      };
    },
    methods: {
      getList() {
        if (this.lastId) {
          this.params.lastId = this.lastId;
        }
        this.$store
          .dispatch("firmOpenAuth/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId,
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
          this.lastId = this.tableData[0].authId;
        }
        this.loadData();
      },
      handleNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].authId;
        }
        this.loadData();
      },
      handleAdd() {
        this.editAuthId = null;
        this.dialogVisible = true;
      },
      handleEdit(id) {
        this.editAuthId = id;
        this.dialogVisible = true;
      },
      handleDel(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("firmOpenAuth/removeOne", {authId: id}).then(() => {
            this.handleRefresh();
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
