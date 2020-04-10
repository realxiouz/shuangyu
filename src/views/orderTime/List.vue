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
        <el-table-column prop="date" label="交易时间" width="100" align="center"></el-table-column>
        <el-table-column prop="amount" label="金额"  align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="transactionAmount" label="交易金额" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.transactionAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="统计" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.count)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import orderTimeSearch from "./Search.vue";

export default {
  name: "orderTime",
  data() {
    return {
      loading: false,
      countData: [],
      searchParams: {}
    };
  },
  components: {
    orderTimeSearch
  },
  methods: {
    loadData(params) {
      this.loading = true;
      this.$store
        .dispatch("order/getTimeCount", {
          filters: params
        })
        .then(data => {
          console.log(data);
          this.countData = data;
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
        this.loadCount(this.searchParams);
        this.loadData(this.searchParams);
        this.loadTotal(this.searchParams);
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