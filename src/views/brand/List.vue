<template>
  <div class="contentBox">
    <search @onSearch="loadData"></search>
    <el-row type="flex" justify="space-between" style="margin-bottom:20px;" align="bottom">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table size="mini" v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
      <el-table-column prop="brandCode" label="品牌编码" align="center"></el-table-column>
      <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
      <el-table-column prop="categoryName" label="商品类目" align="center"></el-table-column>
      <el-table-column label="品牌故事" align="center">
        <template slot-scope="prop">
          <span style="text-align: left">{{prop.row.brandStory}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="prop">
          <span style="text-align: left">{{prop.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row.brandId)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :brand-id="brandId" @onSave="handleSave"/>
  </div>
</template>

<script>
    import search from "./Search.vue";
    import edit from "./Edit.vue";

    export default {
        data() {
            return {
                pageFlag: 1,
                pageSize: 10,
                lastId: null,
                total: 0,
                loading: true,
                dialogVisible: false,
                searchForm: {},
                brandId: "",
                tableData: []
            };
        },
        methods: {
            /*翻前页*/
            handlePrevClick() {
                this.pageFlag = -1;
                this.lastId = this.tableData[0].brandId;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].brandId;
                this.loadData();
            },
            onSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            // loadTotal(searchForm) {
            //     this.$store
            //         .dispatch("brand/getTotal", {
            //             filter: searchForm
            //         })
            //         .then(data => {
            //             this.total = data;
            //         })
            //         .catch(error => {
            //             console.log(error);
            //         });
            // },
            handleSave(formData) {
                if (this.brandId) {
                    this.$store
                        .dispatch("brand/updateOne", {brandId: formData.brandId, data: formData})
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$store
                        .dispatch("brand/addOne", formData)
                        .then(() => {
                            this.loadData({});
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            loadData(searchForm = {}) {
                if (this.lastId) {
                    searchForm.lastId = this.lastId;
                }
                this.$store.dispatch("brand/getPageList", {
                    pageFlag: this.pageFlag,
                    pageSize: this.pageSize,
                    filter: searchForm
                })
                    .then(data => {
                        if (data) {
                            this.tableData = data.rows;
                            this.total = data.total;
                            // this.loadTotal(searchForm);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
            },
            handleAdd() {
                this.brandId = "";
                this.dialogVisible = true;
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            onEdit(brandId) {
                this.dialogVisible = true;
                this.brandId = brandId;
            },
            handleDelete(row) {
                this.open(
                    this.delete,
                    row.brandId,
                    "此操作将删除该信息, 是否继续?"
                );
            },
            delete(brandId) {
                this.$store
                    .dispatch("brand/removeOne", {brandId: brandId})
                    .then(() => {
                        this.lastId = "blank";
                        if (1 === this.tableData.length) {
                            this.handlePrevClick();
                        } else {
                            this.loadData({});
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
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
            },
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
