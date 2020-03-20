<template>
  <div class="order-container">
    <order-search @onSearch="handleSearch"></order-search>
    <el-row style="margin-bottom:15px;">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table :data="tableData"
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
        width="50"
      ></el-table-column>
      <el-table-column
        prop="sourceOrderNo"
        label="订单来源单号"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="policyCode"
        label="政策代码"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="policyType"
        label="政策类型"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="statusName"
        label="订单状态"
        width="50"
      ></el-table-column>
      <el-table-column
        label="最晚出票时限"
        width="110"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.deadlineTicketTime" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.deadlineTicketTime,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="RefundChangeRule"
        label="退改签说明"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="0：销售订单,1：采购订单"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="voyageTypeName"
        label="航程类型"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="amount"
        label="金额"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="pnr"
        label="PNR"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="bigPnr"
        label="大编"
        width="50"
      ></el-table-column>
      <el-table-column
        label="业务完结时间"
        width="110"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.finishTime" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.finishTime,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="transactionAmount"
        label="交易金额"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="transactionNo"
        label="交易编号"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="businessNo"
        label="业务编号"
        width="50"
      ></el-table-column>
      <el-table-column
        label="交易时间"
        width="110"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.transactionTime" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.transactionTime,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <!--     操作  按钮  需要 编辑 添加 删除  -->
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            @click="handleOrderDetail(scope.row.orderNo)"
            type="primary"
            size="mini"
          >详情
          </el-button
          >
          <el-button type="danger" size="mini" @click="handleRemove(scope.row.orderNo)">删除</el-button>
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
    import orderSearch from "./Search.vue";

    export default {
        name: "orderList",
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                dialogVisible: false,
                tableData: [],
                searchParams: {}
            };
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
                params.page = this.currentPage;
                params.rows = this.pageSize;
                this.$store
                    .dispatch("order/getList", {
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
                    .dispatch("order/getTotal", {
                        filters: params
                    }).then(data => {
                    this.total = data;
                }).catch(error => {
                    console.log(error);
                });
            },
            handleSearch(params) {
                if (!params) {
                    params = {};
                    this.searchParams = params;
                    this.loadData(this.searchParams);
                    this.loadTotal(this.searchParams);
                } else {
                    const newParams = {};
                    if (params.name) {
                        newParams.name = params.name;
                    }
                    if (params.cardNo) {
                        newParams.cardNo = params.cardNo;
                    }
                    if (params.orderNo) {
                        newParams.orderNo = params.orderNo;
                    }
                    if (params.rootOrderNo) {
                        newParams.rootOrderNo = params.rootOrderNo.toLocaleLowerCase();
                    }
                    if (params.pnr) {
                        newParams.pnr = params.pnr.toLocaleLowerCase();
                    }
                    if (params.status) {
                        newParams.status = params.status;
                    }
                    if (params.flightDate) {
                        newParams.flightDate = params.flightDate;
                    }
                    if (params.cabin) {
                        newParams.cabin = params.cabin;
                    }
                    if (params.flightCode) {
                        newParams.flightCode = params.flightCode;
                    }
                    if (params.orderSource) {
                        newParams.orderSource = params.orderSource;
                    }
                    if (params.voyageType) {
                        newParams.voyageType = params.voyageType;
                    }
                    this.searchParams = newParams;
                    this.loadData(this.searchParams);
                    this.loadTotal(this.searchParams);

                }
            },
            handleRemove(orderNo) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$store
                        .dispatch("order/removeOne", {orderNo: orderNo})
                        .then(() => {
                            this.loadData(this.searchParams);
                            this.loadTotal();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }).catch(err => {
                    console.error(err);
                });
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
            },
            handleAdd() {
                this.dialogVisible = true;
            },
            handleOrderDetail(row) {
                this.$router.push({name:'orderDetail',params:row});
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
        computed: {
            formatDate() {
                return function (dateStr, format) {
                    return this.initDate(dateStr, format);
                }
            },
        },
        components: {
            orderSearch
        },
        created() {
            this.loadData(this.searchParams);
            this.loadTotal();
        },
    };
</script>
