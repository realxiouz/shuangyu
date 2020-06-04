<template>
  <div class="bigBox">
    <div class="searchBox">
      <warehouse-search @onSearch="handleSearch"></warehouse-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        size="mini"
        :data="tableData"
        row-key="code"
        :load="loadChildren"
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
            <el-button type="primary" size="mini" @click="handleAppend(scope.$index, scope.row)">添加</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <!-- 表单对话框 -->
      <el-dialog
        title="添加企业"
        center
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <warehouse-edit
          v-if="dialogVisible"
          :curNode="curNode"
          :update="update"
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
        data() {
            return {
                loading: true,
                dialogVisible: false,
                rootNav: false,
                searchForm: {},
                tableData: [],
                curNode: {},
                update: false,
                pageFlag: 1,
                pageSize: 10,
                lastId: null,
                total: 0
            };
        },
        methods: {
            /*翻前页*/
            handlePrevClick() {
                this.pageFlag = -1;
                this.lastId = this.tableData[0].warehouseId;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].warehouseId;
                this.loadData();
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            /*加载企业列表*/
            loadData(params = {}) {
                if (this.lastId) {
                    params.lastId = this.lastId;
                }
                this.$store
                    .dispatch("warehouse/getRootPageList", {
                            pageFlag: this.pageFlag,
                            pageSize: this.pageSize,
                            filter: params
                        }
                    )
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                            this.loadTotal(params);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            loadTotal(params) {
                this.$store
                    .dispatch("warehouse/getRootTotal", {filter: params})
                    .then(data => {
                        if (data) {
                            this.total = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadChildren(tree, treeNode, resolve) {
                // tree为点击那一行的数据
                this.uploadData.tree = tree;
                this.uploadData.treeNode = treeNode;
                this.uploadData.resolve = resolve;
                this.$store
                    .dispatch("warehouse/getAsyncTreeList", {pid: tree.warehouseId, filter: {}})
                    .then(data => {
                        if (data) {
                            resolve(data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
            }
            ,
            //添加根节点
            handleAdd() {
                this.rootNav = true;
                this.dialogVisible = true;

                this.curNode = {};
                this.update = false;
            },
            /*企业的添加、编辑保存*/
            handleSave(formData) {
                this.dialogVisible = false;
                if (this.update) {
                    this.$store
                        .dispatch("warehouse/updateOne", {id: formData.warehouseId, data: formData})
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    if (this.rootNav) {
                        //如果添加的顶级企业信息，对某些属性进行初始化
                        formData.level = 0;
                    } else {
                        formData.pid = this.curNode.warehouseCode;
                        formData.level = this.curNode.level + 1;
                    }

                    this.$store
                        .dispatch("warehouse/addOne", formData)
                        .then(() => {
                            this.loadData({});
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
            ,
            handleCancel() {
                this.dialogVisible = false;
            }
            ,
            /*点击添加子节点按钮*/
            handleAppend(idx, row) {
                this.rootNav = false;
                this.dialogVisible = true;
                this.update = false;

                this.curNode = row;
            }
            ,
            /*点击编辑*/
            handleEdit(index, row) {
                this.curNode = row;
                this.dialogVisible = true;
                this.update = true;
            }
            ,
            /*点击删除*/
            handleDelete(index, row) {
                this.open(
                    this.remove,
                    row.warehouseCode,
                    "此操作将删除该仓库信息及所有子仓库信息, 是否继续?"
                );
            }
            ,
            /*删除企业数据*/
            remove(params) {
                this.$store
                    .dispatch("warehouse/removeOne", {warehouseCode: params})
                    .then(() => {
                        this.loadData(this.searchForm);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            ,
            open(func, data, message) {
                this.$confirm(message, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        func(data);
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            }
        },
        mounted() {
            this.loadData({});
        }
        ,
        components: {
            warehouseEdit,
            warehouseSearch
        }
    }
    ;
</script>
