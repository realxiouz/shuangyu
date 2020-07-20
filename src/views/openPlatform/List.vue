<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="平台编码" align="center" prop="openCode" />
      <el-table-column label="平台名称" align="center" prop="openName" />
      <el-table-column label="平台类型" align="center" prop="openType" :formatter="formatOpenType" />
      <el-table-column label="配置地址" align="center" prop="openUrl" />
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
      @size-change="onSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        openId:'',
        dialogVisible: false,
        deleteForSearch: false,
        keyName: 'openId',
        actions: {
          getPageList: 'openPlatform/getPageList',
          removeOne: 'openPlatform/removeOne'
        }
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
  };
</script>

<style>
  .page-tools {
    margin-bottom: 10px;
  }
</style>
