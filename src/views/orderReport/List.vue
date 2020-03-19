<template>
  <div class="order-container">
    <order-report-search @onSearch="handleSearch" @onAdd="handleAdd"></order-report-search>
    <el-row style="margin-bottom:15px;">
      <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table :data="tableData"
              highlight-current-row
              style="width: 100%;"
              border
              fit>
      <el-table-column
        prop="receivable"
        label="应收"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="payable"
        label="应付"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="receipt"
        label="实收"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="payment"
        label="实付"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="systemProfit"
        label="利润"
        width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            @click="handleUpdate(scope.row.deptId)"
            type="primary"
            size="mini"
          >编辑
          </el-button
          >
          <el-button
            @click.native.prevent="handleRemove(scope.row.deptId)"
            type="danger"
            size="mini"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
    import orderReportSearch from "./Search.vue";

    export default {
        name: "orderReportList",
        data() {
            return {
                total: 0,
                dialogVisible: false,
                tableData: [],
            }
        },
        methods: {
            loadData(params) {
                this.$store
                    .dispatch("orderReport/getList", {
                            filters: params
                        }
                    ).then(data => {
                    if (data) {
                        this.tableData = data;
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleAdd() {
                this.dialogVisible = true;
            },
            handleSearch(params) {
                if (!params) {
                    params = {};
                    this.loadData(params);
                } else {
                    const newParams = {};
                    if (params.receivable) {
                        newParams.receivable = params.receivable;
                    }
                    if (params.payable) {
                        newParams.payable = params.payable;
                    }
                    if (params.orderNo) {
                        newParams.orderNo = params.orderNo.toLocaleLowerCase();
                    }
                    if (params.receipt) {
                        newParams.receipt = params.receipt;
                    }
                    if (params.payment) {
                        newParams.payment = params.payment;
                    }
                    if (params.systemProfit) {
                        newParams.systemProfit = params.systemProfit;
                    }

                    this.loadData(newParams);
                }
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
            },
        },
        components: {
            orderReportSearch
        },
        created() {
            this.handleSearch();
        }
    };
</script>
