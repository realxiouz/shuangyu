<template>
  <div class="bigBox">
    <div class="searchBox">
      <fund-account-search @onSearch="loadData"></fund-account-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table size="mini" v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
        <el-table-column prop="accountCode" label="账号编码" align="center"></el-table-column>
        <el-table-column prop="accountName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="bankAccount" label="银行账号" align="center"></el-table-column>
        <el-table-column label="币种" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.currency.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别" align="center">
          <template slot-scope="scope">
            <span>{{initCategory(scope.row.category)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="初始余额" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.currency.symbol + " " }}{{ formatAmount(scope.row.initBalance)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="余额" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.currency.symbol + " " }}{{ formatAmount(scope.row.balance)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="资金账号信息"
        center
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="24%"
      >
        <fund-account-edit
          v-if="dialogVisible"
          :cur-node="curNode"
          :update="update"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></fund-account-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import fundAccountSearch from "./Search.vue";
    import fundAccountEdit from "./Edit.vue";

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
                this.$store.dispatch("fundAccount/getTreeList", {filter: searchForm})
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

                let url = "";
                if (this.update) {
                    url = "fundAccount/updateOne";
                } else {
                    url = "fundAccount/addOne";
                }
                this.$store
                    .dispatch(url, formData)
                    .then(() => {
                        this.loadData({});
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
                this.lastId = this.tableData[0].accountId;
                this.loadData(this.searchForm);
            },
            handleNextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].accountId;
                this.loadData(this.searchForm);
            },
            handleDelete(row) {
                this.open(
                    this.delete,
                    row.accountId,
                    "此操作将删除该资金账号信息, 是否继续?"
                );
            },
            delete(accountId) {
                this.$store
                    .dispatch("fundAccount/removeOne", {accountId: accountId})
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
            initCategory(category) {
                if (0 === category) {
                    return '现金';
                } else {
                    return '银行存款';
                }
            }
        },
        mounted() {
            this.loadData(this.searchForm);
        },
        components: {
            fundAccountEdit,
            fundAccountSearch
        }
    };
</script>
