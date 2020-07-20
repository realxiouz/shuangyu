<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="handleSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="平台编码" align="center" prop="openCode" />
      <el-table-column label="平台名称" align="center" prop="openName" />
      <el-table-column label="平台类型" align="center" prop="openType" :formatter="formatOpenType" />
      <el-table-column label="配置地址" align="center" prop="openUrl" />
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.openId)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.openId)">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :editOpenId="editOpenId" @refresh="handleRefresh"/>
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
        editOpenId: null,
        params: {},
      };
    },
    methods: {
      formatOpenType(rows) {
        let openTypeDesc = '';
        if(rows.openType && rows.openType === -1){
          openTypeDesc = '客户';
        }else if(rows.openType && rows.openType === 0){
          openTypeDesc = '客户/供应商';
        }else if(rows.openType && rows.openType === 1){
          openTypeDesc = '供应商';
        }
        return openTypeDesc;
      },
      getList() {
        if (this.lastId) {
          this.params.lastId = this.lastId;
        }
        this.$store
          .dispatch("openPlatform/getPageList", {
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
          this.lastId = this.tableData[0].openId;
        }
        this.loadData();
      },
      handleNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].openId;
        }
        this.loadData();
      },
      handleAdd() {
        this.editOpenId = null;
        this.dialogVisible = true;
      },
      handleEdit(id) {
        this.editOpenId = id;
        this.dialogVisible = true;
      },
      handleDel(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("openPlatform/removeOne", {openId: id}).then(() => {
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
