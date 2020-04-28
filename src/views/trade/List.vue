<template>
  <div class="bigBox">
    <div class="searchBox">
      <trade-search @onSearch="loadData"></trade-search>
    </div>
    <div class="contentBox">
      <el-table size="mini" v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
        <el-table-column prop="tradeNo" label="交易编号" align="center"></el-table-column>
        <el-table-column prop="outTradeNo" label="商家订单号" align="center"></el-table-column>
        <el-table-column prop="tradeStatus" label="交易状态" align="center"></el-table-column>
        <el-table-column prop="totalAmount" label="交易的订单金额" align="center"></el-table-column>
        <el-table-column prop="discountableAmount" label="可打折金额" align="center"></el-table-column>
        <el-table-column prop="tradeCurrency" label="标价币种" align="center"></el-table-column>
        <el-table-column prop="settleCurrency" label="订单结算币种" align="center"></el-table-column>
        <el-table-column prop="settleAmount" label="结算币种订单金额" align="center"></el-table-column>
        <el-table-column prop="payCurrency" label="订单支付币种" align="center"></el-table-column>
        <el-table-column prop="payAmount" label="支付币种订单金额" align="center"></el-table-column>
        <el-table-column prop="settleTransRate" label="结算币种兑换标价币种汇率" align="center"></el-table-column>
        <el-table-column prop="transPayRate" label="标价币种兑换支付币种汇率" align="center"></el-table-column>
        <el-table-column prop="buyerPayAmount" label="买家实付金额" align="center"></el-table-column>
        <el-table-column prop="pointAmount" label="积分支付的金额" align="center"></el-table-column>
        <el-table-column prop="invoiceAmount" label="发票金额" align="center"></el-table-column>
        <el-table-column prop="sendPayDate" label="本次交易打款给卖家的时间" align="center"></el-table-column>
        <el-table-column label="本次交易打款给卖家的时间" align="center">
          <template slot-scope="scope">
            <span> {{formatDate(scope.row.sendPayDate,"YYYY-MM-DD HH：mm：ss")}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiptAmount" label="实收金额" align="center"></el-table-column>
        <el-table-column prop="storeId" label="商户门店编号" align="center"></el-table-column>
        <el-table-column prop="terminalId" label="商户机具终端编号" align="center"></el-table-column>
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
    </div>
  </div>
</template>

<script>
    import tradeSearch from "./Search.vue";

    export default {
        data() {
            return {
                loading: true,
                dialogVisible: false,
                searchForm: {},
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
            };
        },
        methods: {
            loadData(params) {
                this.$store
                    .dispatch("trade/getList", {
                        filters: params
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                            this.loadTotal(params);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            loadTotal(params) {
                this.$store
                    .dispatch("trade/getTotal", {
                        filters: params
                    })
                    .then(data => {
                        if (data >= 0) {
                            this.total = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
            handleCancel() {
                this.dialogVisible = false;
            },
            handlePrevClick(page) {
                this.currentPage = page;
                this.searchParams.pageSize = this.pageSize;
                this.searchParams.currentPage = this.currentPage;
                this.loadData(this.searchParams);
            },
            handleNextClick(page) {
                this.currentPage = page;
                this.searchParams.pageSize = this.pageSize;
                this.searchParams.currentPage = this.currentPage;
                this.loadData(this.searchParams);
            }

        },
        created() {
            this.loadData(this.searchForm);
        },
        components: {
            tradeSearch
        }
    };
</script>
