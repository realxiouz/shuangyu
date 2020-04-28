<template>
  <div class="contentBox">
    <el-row :gutter="20">
      <el-col :xs="11" :sm="10" :md="9" :lg="8" :xl="8">
        <el-row style="margin-bottom:20px;">
          <span style="font-weight:700;color:#303133;">商品类目</span>
        </el-row>
        <el-tree
          v-loading="loading"
          node-key="categoryId"
          auto-expand-parent
          :data="treeData"
          :default-expanded-keys="curLine"
          :props="treeProps"
          :highlight-current="true"
          @node-click="handleNodeClick"
        >
          <span class="tree-node" slot-scope="{ node}">
            <span>{{ node.data.categoryName }}</span>
          </span>
        </el-tree>
      </el-col>
      <el-col :xs="13" :sm="14" :md="15" :lg="16" :xl="16">
        <div class="searchBox">
          <search @onSearch="handleSearch"></search>
        </div>
        <el-row type="flex" justify="space-between" style="margin-bottom:20px;" align="bottom">
          <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
        </el-row>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%;margin-bottom: 15px;"
          size="mini"
        >
          <el-table-column prop="propertyName" label="属性名称" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="商品类目" align="center"></el-table-column>
          <el-table-column prop="isSellProperty" label="是否销售属性" align="center"></el-table-column>
          <el-table-column prop="isEnumProperty" label="是否枚举属性" align="center"></el-table-column>
          <el-table-column prop="required" label="是否必填" align="center"></el-table-column>
          <el-table-column prop="isMultiple" label="是否多选" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="350">
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.row.propertyId)" type="primary" size="mini">编辑</el-button>
              <el-button
                @click.native.prevent="handleRemove(scope.row.propertyId,scope.$index,tableData)"
                type="danger"
                size="mini"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @prev-click="prevClick"
          @next-click="nextClick"
          background
          layout="total,sizes,prev,next"
          prev-text="上一页"
          next-text="下一页"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
        <el-dialog center :visible.sync="dialogVisible" width="30%">
          <edit
            v-if="dialogVisible"
            :app-id="propertyId"
            @onSave="handleSave"
            @onCancel="handleCancel"
          ></edit>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import search from "./Search";
    import edit from "./Edit";

    export default {
        data() {
            return {
                loading: true,
                curNode: null,
                tableData: [],
                treeData: [],
                curLine: [],
                treeProps: {
                    children: "children",
                    hasChildren: "xxx"
                },
                lastId: "0",
                pageFlag: "next",
                pageSize: 10,
                dialogVisible: false,
                propertyId: "",
                total: 0
            };
        },
        methods: {
            /*加载类别树*/
            loadTreeData() {
                this.$store
                    .dispatch("category/getTreeList", {filter: {categoryType: 0}})
                    .then(data => {
                        if (data) {
                            this.treeData = data.data;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            /*点击部门树时调用*/
            handleNodeClick(data) {
                this.curNode = data;
                let searchForm = {};
                searchForm.categoryCode = data.categoryCode;
                this.loadData(searchForm);
                console.log(this.curNode)
            },
            prevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].propertyId;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].propertyId;
                this.loadData();
            },
            loadTotal(searchForm) {
                if (!searchForm || !searchForm.appName) {
                    searchForm = {};
                }
                this.$store
                    .dispatch("productProperty/getTotal", {
                        filters: searchForm
                    })
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadData(searchForm) {
                if (!searchForm || !searchForm.appName) {
                    searchForm = {};
                }
                this.$store
                    .dispatch("productProperty/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        lastId: this.lastId,
                        filter: searchForm
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                            this.loadTotal(searchForm);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleAdd() {
                let path = "";
                path = "/property/config";
                this.$router.push({
                    path: path
                });
                this.dialogVisible = true;
                this.propertyId = "";
            },
            handleUpdate(id) {
                this.propertyId = id;
                this.dialogVisible = true;
            },
            handleRemove(id, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch("productProperty/removeOne", {propertyId: id}).then(() => {
                            if (1 === this.tableData.length) {
                                this.prevClick();
                            } else {
                                this.loadData();
                            }
                            rows.splice(index, 1);
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            handleSave(formData) {
                this.$store
                    .dispatch("productProperty/save", formData)
                    .then(() => {
                        this.loadData();
                        if (this.propertyId != "") {
                            this.$message({
                                type: "success",
                                message: "修改成功！"
                            });
                        } else {
                            this.$message({
                                type: "success",
                                message: "添加成功！"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.dialogVisible = false;
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
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
                if (Object.keys(newParams).length == 0) {
                    this.lastId = 0;
                }
                this.loadData(newParams);
                this.$message({
                    type: "success",
                    message: "查询成功！"
                });
            }
        },
        created() {
            this.loadTreeData();
            this.loadData();
        },
        components: {
            search,
            edit
        }
    };
</script>
