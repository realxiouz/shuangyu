<template>
  <div class="bigBox">
    <div class="searchBox">
      <currency-search @onSearch="loadData"></currency-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table size="mini" v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
        <el-table-column prop="code" label="币种" align="center"></el-table-column>
        <el-table-column prop="name" label="币种名称" align="center"></el-table-column>
        <el-table-column prop="symbol" label="货币符号" align="center"></el-table-column>
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">
            <span> {{formatDate(scope.row.date,"YYYY-MM-DD")}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="当前比率" align="center"></el-table-column>
        <el-table-column label="是否有效" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.active" disabled>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
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

      <el-dialog
        title="资金账号信息"
        center
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="24%"
      >
        <currency-edit
          v-if="dialogVisible"
          :cur-node="curNode"
          :update="update"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></currency-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import currencySearch from "./Search.vue";
    import currencyEdit from "./Edit.vue";

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
                this.$store.dispatch("currency/getTotal", {filter: searchForm})
                    .then(data => {
                        this.total = data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$store.dispatch("currency/getPageList", {pageFlag: this.pageFlag, pageSize: this.pageSize, lastId: this.lastId,filter: searchForm})
                    .then(data => {
                        this.tableData = data.data;
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
                        .dispatch("currency/updateOne", formData)
                        .then(() => {
                            this.loadData({});
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$store
                        .dispatch("currency/addOne", formData)
                        .then(() => {
                            this.loadData({});
                        })
                        .catch(error => {
                            if (501 === error.code){
                                this.$confirm("该币种编码已存在，是否覆盖?", "提示", {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    type: "warning"
                                })
                                    .then(() => {
                                        this.$store.dispatch("currency/updateOne", formData)
                                            .then(() => {
                                                this.loadData({});
                                            })
                                            .catch(error => {
                                                console.log(error);
                                            });
                                    })
                                    .catch(() => {
                                        this.$message({
                                            type: "info",
                                            message: "已取消覆盖!"
                                        });
                                    });
                            }
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
                this.lastId = this.tableData[0].code;
                this.loadData(this.searchForm);
            },
            handleNextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].code;
                this.loadData(this.searchForm);
            },
            handleDelete(row) {
                this.open(
                    this.delete,
                    row.code,
                    "此操作将删除该资金账号信息, 是否继续?"
                );
            },
            delete(code) {
                this.$store
                    .dispatch("currency/removeOne", {code: code})
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
            formatAmount(amount) {
                if (!amount) {
                    return "0.00";
                }
                return this.$numeral(amount).format("0.00");
            },
            /*初始化用工列表中的生日日期格式*/
            formatDate(dateStr, format) {
                if (null != dateStr) {
                    const date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return "";
                }
            },
        },
        mounted() {
            this.loadData(this.searchForm);
        },
        components: {
            currencySearch,
            currencyEdit
        }
    };
</script>
