<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      row-key="deptId"
      highlight-current-row
      style="width: 100%;margin-bottom:15px"
      size="mini"
      fit
      :expand-row-keys="expandRowKeys"
      :load="loadChildren"
      lazy
      ref="table"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="deptName"
        label="部门名称"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="ddId"
        label="钉钉Id"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="ddParentIdId"
        label="钉钉父节点"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="domain"
        label="域名"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="handleRowVal=scope.row;parentId=scope.row.deptId;onAdd()" type="success" size="mini"
            >添加子部门</el-button
          >
          <span v-show="0 == scope.row.deptType" style="margin-left: 10px;">
            <el-button
              @click="handleRowVal=scope.row;parentId=scope.row.deptId;onEdit(scope.row.deptId)"
              type="primary"
              size="mini"
              >编辑</el-button
            >
            <el-button
              @click.native.prevent="handleRowVal=scope.row;onDel(scope.row.deptId)"
              type="danger"
              size="mini"
              >删除</el-button
            >
          </span>
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

    <edit
      :visible.sync="dialogVisible"
      :key-id="keyId"
      :key-name="keyName"
      :pid="parentId"
      @add="upDataChildren('add')"
      @updata="upDataChildren('updata')"
    ></edit>
  </div>
</template>
<script>
import edit from "./Edit";
import search from "./Search";
import { MIXIN_LIST } from "@/utils/mixin";

export default {
  mixins: [MIXIN_LIST],
  name: "dept",
  data() {
    return {
      childrenMaps: new Map(),
      handleRowVal: {},
      dialogVisible: false,
      editDeptId: "",
      pid: "",
      deptId: "",
      keyId: "",
      keyName: "deptId",
      tableData: [],
      expandRowKeys: [],
      lastId: null,
      total: 0,
      actions: {
        getPageList: "dept/getRootPageList",
        removeOne: "dept/removeOne"
      },

      parentId: ''
    };
  },
  methods: {
    loadChildren(tree, treeNode, resolve) {
      // tree为点击那一行的数据
      // 保存节点信息
      this.childrenMaps.set(tree.deptId, { tree, treeNode, resolve });
      this.$store
        .dispatch("dept/getAsyncTreeList", { pid: tree.deptId, filter: {} })
        .then(data => {
          if (data) {
            resolve(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //个节点新增、编辑、删除的信息更新
    upDataChildren(handleType) {
      let pid = "";
      if (handleType == "add") {
        if (this.handleRowVal.hasChildren) {
          pid = this.handleRowVal.deptId;
        } else {
          pid = this.handleRowVal.pid;
        }
      } else if (handleType == "updata") {
        pid = this.handleRowVal.pid;
      } else if (handleType == "remove") {
        pid = this.handleRowVal.pid;
      }
      if (this.childrenMaps.has(pid)) {
        const { tree, treeNode, resolve } = this.childrenMaps.get(pid);
        if (handleType == "remove") {
          this.$set(this.$refs.table.store.states.lazyTreeNodeMap, pid, []);
        }
        // tree为点击那一行的数据
        this.$store
          .dispatch("dept/getAsyncTreeList", { pid: tree.deptId, filter: {} })
          .then(data => {
            if (data) {
              resolve(data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleAddChild(row) {
      this.handleRowVal = row;
      this.pid = row.deptId;
      this.editDeptId = "";
      this.dialogVisible = true;
    },
    onDel(id) {
      if (this.actions.removeOne) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch(this.actions.removeOne, {[this.keyName]: id})
            .then(() => {
              this.$message({type: 'success', message: '删除成功'});
              this.upDataChildren('remove')
            });
        }).catch(error => {
          console.log(error);
        });
      }
    },
  },

  components: {
    edit,
    search
  }
};
</script>
<style>
.el-cascader-menu {
  height: 200px;
}
</style>
