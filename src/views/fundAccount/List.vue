<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      row-key="accountId"
      highlight-current-row
      style="width: 100%;"
      size="mini"
      :load="loadChildren"
      fit
      :indent="40"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="category" label="账号类别" align="center" :formatter="formatCategory"></el-table-column>
      <el-table-column prop="accountCode" label="账号编码" align="center"></el-table-column>
      <el-table-column prop="accountName" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="subjectName" label="科目名称" align="center"></el-table-column>
      <el-table-column prop="currencyName" label="币种名称" align="center"></el-table-column>
      <el-table-column prop="initBalance" label="初始余额" align="center"></el-table-column>
      <el-table-column prop="balance" label="余额" align="center"></el-table-column>
      <el-table-column width="280" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" class="btn-primary" @click="onAddChild(scope.row.accountId)">添加</el-button>
          <el-button type="text" size="mini" class="btn-primary" @click="onEdit(scope.row.accountId)">修改</el-button>
          <el-button type="text" size="mini" class="btn-danger" @click="onDel(scope.row.accountId)">删除</el-button>
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
      @current-change="onCurrentChange"
      :current-page.sync="currentPage"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" :pid="pid" @refresh="handleRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";
  import {CATEGORY_MAP} from '@/utils/const'

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        dialogVisible: false,
        pid: null,
        keyName: 'accountId',
        actions: {
          getPageList: 'fundAccount/getRootPageList',
          removeOne: 'fundAccount/removeOne'
        },
        uploadData: {
          tree: null,
          treeNode: null,
          resolve: null
        },
        categoryList: CATEGORY_MAP
      };
    },
    methods: {
      onAddChild(accountId) {
        this.pid = accountId;
        this.dialogVisible = true;
      },
      loadChildren(tree, treeNode, resolve) {
        this.uploadData.tree = tree;
        this.uploadData.treeNode = treeNode;
        this.uploadData.resolve = resolve;
        let params = {};
        if(tree && tree.accountId){
          this.$store
            .dispatch("fundAccount/getAsyncTreeList", {pid: tree.accountId, filter: params})
            .then(data => {
              if (data && data.length > 0) {
                let children = [];
                data.forEach(function(obj){
                  if(obj.attributes){
                    children.push(obj.attributes);
                  }
                });
                resolve(children);
              }else{
                window.location.reload();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      formatCategory(row) {
        let that = this;
        let categoryName = '';
        if(row && null != row.category && '' !== row.category && that.categoryList && that.categoryList.length > 0){
          that.categoryList.forEach(function(obj){
            if(row.category === obj.code){
              categoryName = obj.value;
            }
          });
        }
        return categoryName;
      },
      handleRefresh() {
        this.onRefresh();
        this.loadChildren(this.uploadData.tree, this.uploadData.treeNode, this.uploadData.resolve);
      }
    },
    components: {
      edit,
      search
    },
  };
</script>

<style>
</style>
