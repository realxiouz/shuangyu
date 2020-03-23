<template>
  <div class="order-container">
    <order-report-search @onSearch="handleSearch"></order-report-search>
    <el-row style="margin-bottom:15px;margin-left:30px">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table :data="tableData"
              size="mini"
              highlight-current-row
              style="width: 100%;"
              border
              fit>
      <el-table-column
        prop="orderNo"
        label="订单号"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="rootOrderNo"
        label="销售出票单号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="orderSource"
        label="订单来源"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="sourceOrderNo"
        label="订单来源单号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="policyCode"
        label="政策代码"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="policyType"
        label="政策类型"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="statusName"
        label="订单状态"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="receivable"
        label="应收"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="payable"
        label="应付"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="receipt"
        label="实收"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="payment"
        label="实付"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="systemProfit"
        label="利润"
        width="100">
      </el-table-column>
      <el-table-column
        label="系统利润时间"
        width="150"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.systemProfitTime" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.systemProfitTime,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="150">
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
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page="currentPage"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
    import orderReportSearch from "./Search.vue";

    export default {
        name: "orderReportList",
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                dialogVisible: false,
                tableData: [],
                searchParams: {}
            }
        },
        methods: {
            handleSizeChange: function (size) {
                this.pageSize = size;
                this.loadData(this.searchParams);
            },
            prevClick(page) {
                this.currentPage = page;
                this.loadData(this.searchParams);
            },
            nextClick(page) {
                this.currentPage = page;
                this.loadData(this.searchParams);
            },
            loadData(params) {
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
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
            loadTotal(params) {
                this.$store
                    .dispatch("orderReport/getTotal", {
                        filters: params
                    }).then(data => {
                    this.total = data;
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
                    this.searchParams = params;
                    this.loadData(this.searchParams);
                    this.loadTotal(this.searchParams);
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
                    this.searchParams = newParams;
                    this.loadData(this.searchParams);
                    this.loadTotal(this.searchParams);
                }
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
            },
            /*初始化用工列表中的生日日期格式*/
            initDate(dateStr, format) {
                if (null != dateStr) {
                    let date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return '';
                }
            }
        },
        components: {
            orderReportSearch
        },
        computed: {
            formatDate() {
                return function (dateStr, format) {
                    return this.initDate(dateStr, format);
                }
            },
        },
        created() {
            this.loadData(this.searchParams);
            this.loadTotal();
        }
    };
</script>
