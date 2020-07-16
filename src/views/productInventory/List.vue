<template>
  <div class="bigBox">
    <div class="searchBox">
      <search @onSearch="onSearch"></search>
    </div>
    <div class="contentBox">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
        size="mini"
      >
        <el-table-column prop="productCode" label="商品编码" align="center"></el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="商品类目" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
        <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
        <el-table-column prop="maxStockQuantity" label="库存上线" align="center"></el-table-column>
        <el-table-column prop="minStockQuantity" label="库存下线" align="center"></el-table-column>
        <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
        <el-table-column prop="price" label="单价" align="center"></el-table-column>
        <el-table-column prop="cost" label="成本" align="center"></el-table-column>
        <el-table-column prop="skuName" label="属性名称" align="center"></el-table-column>
        <el-table-column prop="skuId" label="sku" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.inventoryId)" type="primary" size="mini">查看</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.inventoryId,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="onSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
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
                pageFlag: 1,
                pageSize: 10,
                lastId: null,
                total: 0,
                dialogVisible: false,
                loading: true,
                tableData: []
            };
        },
        methods: {
            /*翻前页*/
            handlePrevClick() {
                this.pageFlag = -1;
                this.lastId = this.tableData[0].inventoryId;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].inventoryId;
                this.loadData();
            },
            loadData(searchForm = {}) {
                if (this.lastId) {
                    searchForm.lastId = this.lastId;
                }
                this.$store
                    .dispatch("productInventory/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        filter: searchForm
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data.rows;
                            this.total = data.total;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            handleRemove(id, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch("productInventory/removeOne", {inventoryId: id}).then(() => {
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
            onSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            onSearch(params) {
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
            },
            handleUpdate(id) {
                let path = "";
                path = "/product/inventory/config";
                this.$router.push({
                    path: path,
                    query: {
                        inventoryId: id
                    }
                });
            }
        },
        created() {
            this.loadData();
        },
        components: {
            search,
          //  edit
        }
    };
</script>

