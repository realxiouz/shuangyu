<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" :category="category"/>
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table class="page-table"
              v-loading="loading"
              :data="tableData"
              row-key="subjectCode"
              highlight-current-row
              style="width: 100%;"
              size="mini"
              :load="loadChildren"
              fit
              :indent="40"
              lazy
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="subjectCode" label="科目编码" align="center"></el-table-column>
      <el-table-column prop="subjectName" label="科目名称" align="center"></el-table-column>
      <el-table-column prop="category" label="类别" align="center" :formatter="subjectCategory"></el-table-column>
      <el-table-column
        prop="balanceDirection"
        label="余额方向"
        align="center"
        :formatter="formatBalanceDirection"
      ></el-table-column>
      <el-table-column width="280" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" class="btn-success" size="mini" @click="onAddChild(scope.row.subjectId)">添加</el-button>
          <el-button type="text" class="btn-primary" size="mini" @click="onEdit(scope.row.subjectId)">修改</el-button>
          <el-button type="text" class="btn-danger" size="mini" @click="onDel(scope.row.subjectId)">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" :pid="pid" :category="category"
          @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import {subjectCategory} from "@/utils/status.js";
  import {MIXIN_LIST} from "@/utils/mixin";

  export default {
    mixins: [MIXIN_LIST],
    props: {
      category: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        dialogVisible: false,
        pid: null,
        keyName: 'subjectId',
        actions: {
          getPageList: 'accountSubject/getRootPageList',
          removeOne: 'accountSubject/removeOne'
        },
        params: {
          category: this.category
        },
        uploadData: {
          tree: null,
          treeNode: null,
          resolve: null
        }
      };
    },
    methods: {
      subjectCategory,
      formatBalanceDirection(row) {
        return row.balanceDirection === 0 ? "借" : "贷";
      },
      onAddChild(subjectId) {
        this.pid = subjectId;
        this.dialogVisible = true;
      },
      loadChildren(tree, treeNode, resolve) {
        this.uploadData.tree = tree;
        this.uploadData.treeNode = treeNode;
        this.uploadData.resolve = resolve;
        let params = {};
        if (tree && tree.subjectId) {
          this.$store
            .dispatch("accountSubject/getAsyncTreeList", {pid: tree.subjectId, filter: params})
            .then(data => {
              if (data && data.length > 0) {
                let children = [];
                data.forEach(function (obj) {
                  if (obj.attributes) {
                    children.push(obj.attributes);
                  }
                });
                resolve(children);
              } else {
                window.location.reload();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      onRefresh() {
        this.loadData();
        this.loadChildren(this.uploadData.tree, this.uploadData.treeNode, this.uploadData.resolve);
      }
    },
    components: {
      edit,
      search
    }
  };
</script>

<style>
</style>
