<template>
  <div class="bigBox">
    <div class="searchBox">
      <dept-search @onSearch="handleSearch"></dept-search>
    </div>
    <div class="contentBox">
      <el-table
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
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="deptName" label="部门名称" align="left"></el-table-column>
        <el-table-column prop="ddId" label="钉钉Id" align="center"></el-table-column>
        <el-table-column prop="ddParentIdId" label="钉钉父节点" align="center"></el-table-column>
        <el-table-column prop="domain" label="域名" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="280">
          <template slot-scope="scope">
            <el-button @click="handleAddChild(scope.row)" type="success" size="mini">添加子部门</el-button>
            <span v-show="0 == scope.row.deptType" style="margin-left: 10px;">
              <el-button @click="handleUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button
                @click.native.prevent="handleRemove(scope.row)"
                type="danger"
                size="mini"
              >删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <el-dialog
        title="部门信息"
        center
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <dept-edit
          v-if="dialogVisible"
          :editDeptId="editDeptId"
          :pid="pid"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></dept-edit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import deptSearch from "./Search.vue";
  import deptEdit from "./Edit.vue";

  export default {
    name: "dept",
    data() {
      return {
        childrenMaps: new Map(),
        loading: true,
        handleRowVal:{},
        searchForm: {},
        dialogVisible: false,
        editDeptId: "",
        pid: "",
        tableData: [],
        expandRowKeys: [],
        pageFlag: 1,
        pageSize: 10,
        lastId: null,
        total: 0
      };
    },
    methods: {
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadData();
      },
      /*翻前页*/
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].deptId;
        this.loadData();
      },
      /*翻后页*/
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].deptId;
        this.loadData();
      },
      loadData(params = {}) {
        if (this.lastId) {
          params.lastId = this.lastId;
        }
        this.$store
          .dispatch("dept/getRootPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            filter: params
          })
          .then(data => {
            if (data) {
              this.tableData = data;
              this.expandRowKeys = [];
              this.expandRowKeys.push(data[0].deptId);
              this.loadTotal(params);
            }
            this.loading = false;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadTotal(params) {
        this.$store
          .dispatch("dept/getRootTotal", {filter: params})
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadChildren(tree, treeNode, resolve) {
        // tree为点击那一行的数据
        // 保存节点信息
        this.childrenMaps.set(tree.deptId,{tree, treeNode, resolve});
        this.$store
          .dispatch("dept/getAsyncTreeList", {pid: tree.deptId, filter: {}})
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
        let pid='';
        if(handleType=='add'){
          if(this.handleRowVal.hasChildren){
            pid = this.handleRowVal.deptId;
          }else{
            pid = this.handleRowVal.pid;
          }
        }else if(handleType=='updata'){
          pid = this.handleRowVal.pid;
        }else if(handleType=='remove'){
          pid = this.handleRowVal.pid;
        }
        if(this.childrenMaps.has(pid)){
          const {tree,treeNode,resolve}=this.childrenMaps.get(pid);
          if(handleType=='remove'){
            this.$set(this.$refs.table.store.states.lazyTreeNodeMap, pid, []);
          }
          // tree为点击那一行的数据
          this.$store
            .dispatch("dept/getAsyncTreeList", {pid: tree.deptId, filter: {}})
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
      handleSearch(params) {
        const newParams = {};
        if (params) {
          for (let key in params) {
            if (params[key]) {
              newParams[key] = params[key];
            }
          }
        }
        this.loadData(newParams);
        this.$message({
          type: "success",
          message: "查询成功！"
        });
      },
      handleUpdate(row) {
        this.handleRowVal = row;
        this.editDeptId = row.deptId;
        this.pid = "";
        this.dialogVisible = true;
      },
      handleRemove(row) {
        this.handleRowVal = row;
        this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$store.dispatch("dept/removeOne", {deptId: row.deptId}).then(() => {
            if (1 === this.tableData.length) {
              this.upDataChildren('remove');
            } else {
              this.loadData("{}");
            }
          });
        })
          .catch(err => {
            console.error(err);
          });
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave(formData) {
        if (formData.deptId) {
          this.$store
            .dispatch("dept/updateOne", {id: formData.deptId, data: formData})
            .then(() => {
              this.$message({
                type: "success",
                message:
                  "部门信息保存成功!"
              });
              this.loadData();
              this.upDataChildren('updata');
            })
            .catch(error => {
              console.log(error);
            });
          this.dialogVisible = false;
        } else {
          this.$store
            .dispatch("dept/addOne", formData)
            .then(() => {
              this.$message({
                type: "success",
                message:
                  "部门信息保存成功!"
              });
              this.loadData();
              this.upDataChildren('add');
            })
            .catch(error => {
              console.log(error);
            });
          this.dialogVisible = false;
        }

      }
    },
    created() {
      this.loadData();
    },
    components: {
      deptSearch,
      deptEdit
    }
  };
</script>
<style>
  .el-cascader-menu {
    height: 200px;
  }
</style>
