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
        <!--        <div class="searchBox">-->
        <!--          <search @onSearch="handleSearch"></search>-->
        <!--        </div>-->
        <el-row type="flex" justify="space-between" style="margin-bottom:20px;" align="bottom">
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd" :disabled="dialogVisible">添加属性
          </el-button>
        </el-row>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%;margin-bottom: 15px;"
          size="mini"
        >
          <el-table-column prop="categoryName" label="商品类目" align="center"></el-table-column>
          <el-table-column prop="name" label="属性名称" align="center"></el-table-column>
          <el-table-column prop="code" label="属性编码" align="center"></el-table-column>
          <el-table-column prop="isSku" label="是否销售属性" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.sku" disabled></el-switch>
            </template>
          </el-table-column>
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
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          background
          layout="total,sizes,prev,next"
          prev-text="上一页"
          next-text="下一页"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import search from "./Search";

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
                dialogVisible: true,
                propertyId: "",
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
                this.lastId = this.tableData[0].propertyId;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].propertyId;
                this.loadData();
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            /*加载类别树*/
            loadTreeData() {
                this.$store
                    .dispatch("firmCategory/getTreeList", {filter: {categoryType: 'PRODUCT'}})
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
                this.dialogVisible = false;
                this.curNode = data;
                let searchForm = {};
                searchForm.categoryCode = data.categoryCode;
                this.loadData(searchForm);
            },
            loadTotal(searchForm) {
                this.$store
                    .dispatch("productProperty/getTotal", {
                        filter: searchForm
                    })
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadData(searchForm = {}) {
                if (this.lastId) {
                    searchForm.lastId = this.lastId;
                }
                this.$store
                    .dispatch("productProperty/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
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
            handleAdd() {
                let path = "";
                path = "/property/config";
                this.$router.push({
                    path: path,
                    query: {
                        categoryCode: this.curNode.categoryCode,
                        categoryName: this.curNode.categoryName,
                        categoryPath: this.curNode.path
                    }
                });
            },
            handleUpdate(id) {
                let path = "";
                path = "/property/config";
                this.$router.push({
                    path: path,
                    query: {
                        propertyId: id
                    }
                });
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
        },
        created() {
            this.loadTreeData();
            this.loadData();
        },
        components: {
            search
        }
    };
</script>
