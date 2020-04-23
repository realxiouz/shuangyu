<template>
  <div class="bigBox">
    <div class="searchBox">
      <order-time-search @onSearch="handleSearch"></order-time-search>
    </div>
    <div class="contentBox">
      <el-table
        :data="countData"
        size="mini"
        highlight-current-row
        style="width: 100%;margin-bottom:15px"
        v-loading="loading"
        fit
      >
        <el-table-column prop="orderType" label="订单类型" width="150" align="center"></el-table-column>
        <el-table-column prop="category" label="订单分类" width="100" align="center"></el-table-column>
        <el-table-column prop="accountId" label="平台账号" width="200" align="center"></el-table-column>
        <el-table-column prop="date" label="交易时间" width="100" align="center"></el-table-column>
        <el-table-column prop="amount" label="金额" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="transactionAmount" label="交易金额" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.transactionAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量" align="center"></el-table-column>
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
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
    import orderTimeSearch from "./Search.vue";

    export default {
        name: "orderTime",
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                loading: false,
                countData: [],
                searchParams: {}
            };
        },
        components: {
            orderTimeSearch
        },
        methods: {
            handleSizeChange(size) {
                this.pageSize = size;
                this.searchParams.pageSize = this.pageSize;
                this.loadData(this.searchParams);
            },
            prevClick(page) {
                this.currentPage = page;
                this.searchParams.pageSize = this.pageSize;
                this.searchParams.currentPage = this.currentPage;
                this.loadData(this.searchParams);
            },
            nextClick(page) {
                this.currentPage = page;
                this.searchParams.pageSize = this.pageSize;
                this.searchParams.currentPage = this.currentPage;
                this.loadData(this.searchParams);
            },
            loadData(params) {
                this.loading = true;
                this.$store
                    .dispatch("order/getTimeCount", {
                        filters: params
                    })
                    .then(data => {
                        if (data) {
                            this.countData = data;
                            if (data[0].total) {
                                this.total = data[0].total;
                            }
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            handleSearch(params) {
                if (!params) {
                    params = {};
                    this.searchParams = params;
                    this.loadData(this.searchParams);
                } else {
                    const newParams = {};
                    for (let key in params) {
                        if (params[key] && _.isArray(params[key])) {
                            let start = "start" + key.charAt(0).toUpperCase() + key.slice(1);
                            let end = "end" + key.charAt(0).toUpperCase() + key.slice(1);
                            newParams[start] = params[key][0];
                            newParams[end] = params[key][1];
                        } else if (params[key]) {
                            newParams[key] = params[key];
                        }
                    }
                    if (params.orderType == 30 && params.category == 0) {
                        let orderTypes = "[30, 31, 32]";
                        newParams.orderTypes = orderTypes;
                        delete newParams.orderType;
                    }
                    this.searchParams = newParams;
                    this.loadData(this.searchParams);
                    this.$message({
                        type: "success",
                        message: "查询成功！"
                    });
                }
            },
            formatAmount(amount) {
                if (!amount) {
                    return "￥0.00";
                }
                return "￥" + this.$numeral(amount).format("0.00");
            }
        },
        created() {
            // this.loadData(this.searchParams);
        }
    };
</script>
