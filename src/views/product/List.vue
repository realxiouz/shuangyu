<template>
  <div class="bigBox">
    <div class="searchBox">
      <search @onSearch="handleSearch"></search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加商品</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
        size="mini"
      >
        <el-table-column prop="productCode" label="商品编码" align="center"></el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="商品类目" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
        <el-table-column prop="specification" label="规格" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column prop="wholesalePrice" label="批发价" align="center"></el-table-column>
        <el-table-column prop="retailPrice" label="零售价" align="center"></el-table-column>
        <el-table-column prop="costPrice" label="成本价" align="center"></el-table-column>
        <el-table-column prop="specialPrice" label="特价" align="center"></el-table-column>
        <el-table-column prop="price" label="单价" align="center"></el-table-column>
        <el-table-column prop="originalPrice" label="原价" align="center"></el-table-column>
        <el-table-column prop="isSku" label="isSku" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.productId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.productId,scope.$index,tableData)"
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
    </div>
  </div>
</template>
<script>
    import search from "./Search";
    import edit from "./Edit";

    export default {
        name: "list",
        data() {
            return {
                lastId: "blank",
                pageFlag: "next",
                pageSize: 10,
                dialogVisible: false,
                loading: true,
                tableData: [],
                productId: "",
                total: 0
            };
        },
        methods: {
            prevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].productId;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].productId;
                this.loadData();
            },
            loadTotal(searchForm) {
                if (!searchForm || !searchForm.appName) {
                    searchForm = {};
                }
                this.$store
                    .dispatch("product/getTotal", {
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
                    .dispatch("product/getPageList", {
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
                path = "/product/config";
                this.$router.push({
                    path: path
                });
            },
            handleUpdate(id) {
                console.log(id);
                let path = "";
                path = "/product/config";
                this.$router.push({
                    path: path,
                    query: {
                        productId: id
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
                        this.$store.dispatch("product/removeOne", {productId: id}).then(() => {
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
            this.loadData();
        },
        components: {
            search,
            edit
        }
    };
</script>

