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
                lastId: "blank",
                pageFlag: "next",
                pageSize: 10,
                total: 0
            };
        },
        methods: {
            loadData(searchForm) {
                this.searchForm = searchForm;
                this.$store.dispatch("trade/getTotal", {filter: searchForm})
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$store.dispatch("trade/getPageList", {
                    pageFlag: this.pageFlag,
                    pageSize: this.pageSize,
                    lastId: this.lastId,
                    filter: searchForm
                })
                    .then(data => {
                        this.tableData = data;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
            },

            handleCancel() {
                this.dialogVisible = false;
            },
            handlePrevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].tradeId;
                this.loadData(this.searchForm);
            },
            handleNextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].tradeId;
                this.loadData(this.searchForm);
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
