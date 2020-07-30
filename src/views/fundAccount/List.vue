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
      style="width: 100%;margin-bottom:15px"
      size="mini"
      :load="loadChildren"
      fit
      :indent="40"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="类别" align="center">
        <template slot-scope="scope">
          <span>{{formatCategory(scope.row.category)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="accountCode" label="账号编码" align="center"></el-table-column>
      <el-table-column prop="accountName" label="账号名称" align="center"></el-table-column>
      <el-table-column prop="bankAccount" label="银行账号" align="center"></el-table-column>
      <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
      <el-table-column prop="initBalance" label="初始余额" align="center"></el-table-column>
      <el-table-column prop="balance" label="余额" align="center"></el-table-column>
      <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
      <el-table-column width="280" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="onAddChild(scope.row.accountId)">添加</el-button>
          <el-button size="mini" type="primary" @click="onEdit(scope.row.accountId)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row.accountId)">删除</el-button>
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
        }
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
      formatCategory(category) {
        if (0 === category) {
          return "现金";
        } else if (1 === category) {
          return "银行存款";
        } else if (2 === category) {
          return "积分";
        } else if (3 === category) {
          return "优惠券";
        } else {
          return "无";
        }
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
  .page-tools {
    margin-bottom: 10px;
  }
</style>
