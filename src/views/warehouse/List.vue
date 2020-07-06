<template>
  <div class="bigBox">
    <div class="searchBox">
      <warehouse-search @onSearch="handleSearch"></warehouse-search>
    </div>
    <div class="contentBox">
      <!-- 按钮组件 -->
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <!-- 表格组件 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        row-key="warehouseId"
        highlight-current-row
        style="width: 100%;margin-bottom:15px"
        size="mini"
        :load="loadChildren"
        fit
        :indent="40"
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="warehouseCode" label="仓库编码" align="center" width="180"></el-table-column>
        <el-table-column prop="warehouseName" label="仓库名称" align="center" width="180"></el-table-column>
        <el-table-column prop="contact" label="联系人" align="center" width="100"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="250">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="handleAddChild(scope.row.warehouseId)">添加</el-button>
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row.warehouseId)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.row.warehouseId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <!-- 模态窗组件 -->
      <el-dialog
        title="仓库管理"
        center
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <warehouse-edit
          v-if="dialogVisible"
          :editWarehouseId="editWarehouseId"
          :pid="pid"
          :codeEnabled="codeEnabled"
          @onSave="handleSave"
          @onCancel="handleCancel"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import warehouseEdit from "./Edit";
  import warehouseSearch from "./Search";

  export default {
    name: "warehouseContent",
    data() {
      return {
        loading: true,
        searchForm: {},
        dialogVisible: false,
        editWarehouseId: null,
        pid: null,
        tableData: [],
        pageFlag: 1,
        pageSize: 10,
        lastId: "blank",
        total: 0,
        codeEnabled: false,
        uploadData: {
          tree: null,
          treeNode: null,
          resolve: null
        }
      };
    },
    methods: {
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].warehouseId;
        this.loadData();
      },
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].warehouseId;
        this.loadData();
      },
      loadData(params = {}) {
        if (this.lastId) {
          params.lastId = this.lastId;
        }
        this.$store
          .dispatch("warehouse/getRootPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            filter: params
          })
          .then(data => {
            if (data && data.rows && data.rows.length > 0) {
              this.tableData = data.rows;
              this.total = data.total;
            } else {
              this.tableData = [];
              this.total = 0;
            }
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      loadChildren(tree, treeNode, resolve) {
        this.uploadData.tree = tree;
        this.uploadData.treeNode = treeNode;
        this.uploadData.resolve = resolve;
        let params = {};
        if(tree && tree.warehouseId){
          this.$store
            .dispatch("warehouse/getAsyncTreeList", {pid: tree.warehouseId, filter: params})
            .then(data => {
              if (data) {
                if(data && data.length > 0){
                  resolve(data);
                }else{
                  window.location.reload();
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      handleAddChild(warehouseId) {
        this.pid = warehouseId;
        this.editWarehouseId = "";
        this.codeEnabled = false;
        this.dialogVisible = true;
      },
      handleAdd() {
        this.editWarehouseId = "";
        this.pid = "";
        this.codeEnabled = false;
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
      handleUpdate(warehouseId) {
        this.editWarehouseId = warehouseId;
        this.pid = "";
        this.codeEnabled = true;
        this.dialogVisible = true;
      },
      handleRemove(warehouseId) {
        this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("warehouse/removeOne", {warehouseId: warehouseId})
              .then(() => {
                if (1 === this.tableData.length) {
                  this.handlePrevClick();
                } else {
                  this.loadData();
                  this.loadChildren(this.uploadData.tree, this.uploadData.treeNode, this.uploadData.resolve);
                }
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
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
        let method = "warehouse/addOne";
        let msg = "添加成功！";

        if(formData && formData.warehouseId){
          method = "warehouse/updateOne";
          msg = "编辑成功！";
        }

        this.$store
          .dispatch(method, formData)
          .then(() => {
            this.$message({
              type: "success",
              message: msg
            });
            this.loadData();
            this.loadChildren(this.uploadData.tree, this.uploadData.treeNode, this.uploadData.resolve);
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      }
    },
    mounted() {
      this.loadData({});
    },
    components: {
      warehouseEdit,
      warehouseSearch
    }
  };
</script>
