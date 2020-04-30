<template>
  <div class="bigBox">
    <div class="searchBox">
      <brand-search @onSearch="loadData"></brand-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:22px;">
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
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

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

      <el-dialog title="品牌信息" center :visible.sync="dialogVisible" :close-on-click-modal="false" width="24%">
        <brand-edit
          v-if="dialogVisible"
          :cur-node="curNode"
          :update="update"
          @onSave="handleSave"
          @onCancel="handleCancel"></brand-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import brandSearch from "./Search.vue";
    import brandEdit from "./Edit.vue";

    export default {
        data() {
            return {
                loading: true,
                dialogVisible: false,
                update: false,
                searchForm: {},
                curNode: {},
                tableData: [],
                lastId: "blank",
                pageFlag: "next",
                pageSize: 10,
                total: 0
            };
        },
        methods: {
            loadData(searchForm) {
                this.searchForm = searchForm;
                this.$store.dispatch("brand/getTotal", {filter: searchForm})
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$store.dispatch("brand/getPageList", {pageFlag: this.pageFlag, pageSize: this.pageSize, lastId: this.lastId,filter: searchForm})
                    .then(data => {
                        this.tableData = data;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
            },
            handleAdd() {
                this.dialogVisible = true;
                this.curNode = {};
                this.update = false;
            },
            handleSave(formData) {
                this.dialogVisible = false;

                if (this.update) {
                    this.$store
                        .dispatch("brand/updateOne", formData)
                        .then(() => {
                            this.loadData({});
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
            handleCancel() {
                this.dialogVisible = false;
            },
            handleEdit(row) {
                this.dialogVisible = true;
                this.curNode = row;
                this.update = true;
            },
            handlePrevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].brandId;
                this.loadData(this.searchForm);
            },
            handleNextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].brandId;
                this.loadData(this.searchForm);
            },
            handleDelete(row) {
                this.open(
                    this.delete,
                    row.brandId,
                    "此操作将删除该资金账号信息, 是否继续?"
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
        mounted() {
            this.loadData({});
        },
        components: {
            brandSearch,
            brandEdit
        }
    };
</script>
