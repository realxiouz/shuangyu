<template>
  <div class="page">
     <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-table
        class="page-table"
        :data="tableData"
        size="mini"
        highlight-current-row
        style="width: 100%;"
        v-loading="loading"
        show-summary
        max-height="650"
        :summary-method="getSummaries"
        fit
      >
        <el-table-column label="序号" type="index" width="50" align="center">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号" align="center" width="180"></el-table-column>
        <el-table-column label="源单号" prop="sourceOrderNo" width="160" align="center"></el-table-column>
        <el-table-column label="乘机人" align="center" width="100">
          <template slot-scope="scope">
            <span v-html="formatPassengers(scope.row.passengers)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="ticketNos" label="票号" width="120" align="center">
          <template slot-scope="scope">
            <span v-html="formatTicketNo(scope.row.ticketNos)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="policyCode" label="政策代码" width="150" align="center"></el-table-column>
        <el-table-column
          prop="category"
          :formatter="formatCategory"
          label="订单分类"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="订单日期" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.createTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="pnr" label="PNR" width="80" align="center"></el-table-column>
        <el-table-column label="航班号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatFlightNo(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="航班日期" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatFlightDate(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="起飞 -- 到达" width="90" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlight(scope.row.flights)"></span>
          </template>
        </el-table-column>

        <el-table-column label="交易金额" prop="transactionAmount" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.transactionAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="总价" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receivable" label="应收" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.receivable)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receipt" label="实收" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.receipt)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payable" label="应付" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.payable)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payment" label="实付" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.payment)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="systemProfit" label="系统利润" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.systemProfit)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shouldProfit" label="业务利润" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.shouldProfit)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profit" label="财务利润" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.profit)}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.deptId)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button @click.native.prevent="handleRemove(scope.row.deptId)" type="text" size="mini" class="btn-danger">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
         class="page-footer"
        @size-change="onSizeChange"
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
</template>
<script>
import search from "./Search.vue";
import { formatCategory, formatStatus } from "@/utils/status.js";
import {
  formatPassengers,
  formatTicketNo,
  formatFlightDate,
  formatFlightNo,
  formatFlight,
  formatAmount
} from "@/utils/orderFormdata.js";

export default {
  name: "orderReportTotal",
  data() {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      tableData: [],
      searchParams: {},
      count: []
    };
  },
  components: {
    search
  },
  methods: {
    formatStatus,
    formatCategory,
    formatPassengers,
    formatTicketNo,
    formatFlightDate,
    formatFlightNo,
    formatFlight,
    formatAmount,
    onSizeChange: function(size) {
      this.pageSize = size;
      this.searchParams.pageSize = this.pageSize;
      this.currentPage = 1;
      this.searchParams.currentPage = this.currentPage;
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
      if (params) {
        params.orderType = 0;
      } else {
        let newParams = {};
        newParams.orderType = 0;
        params = newParams;
      }
      this.$store
        .dispatch("orderReportTotal/getList", {
          filters: params
        })
        .then(data => {
          if (data) {
            this.tableData = data;
            this.loadTotal(params);
            this.loadCount(params);
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
        .dispatch("orderReportTotal/getTotal", {
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
    loadCount(params) {
      this.$store
        .dispatch("orderReportTotal/getTotalSum", {
          filters: params
        })
        .then(data => {
          if (data) {
            this.count = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSummaries(params) {
      const { columns} = params;
      const sums = [];
      columns.forEach((item, index) => {
        if (index === 0) {
          sums[index] = "统计";
          return;
        }
        switch (item.property !== "" && item.property) {
          case "amount":
            sums[index] =
              "￥" + this.$numeral(this.count.amount).format("0,0.00");
            break;
          case "transactionAmount":
            sums[index] =
              "￥" +
              this.$numeral(this.count.transactionAmount).format("0,0.00");
            break;
          case "receivable":
            sums[index] =
              "￥" + this.$numeral(this.count.receivable).format("0,0.00");
            break;

          case "receipt":
            sums[index] =
              "￥" + this.$numeral(this.count.receipt).format("0,0.00");
            break;
          case "payable":
            sums[index] =
              "￥" + this.$numeral(this.count.payable).format("0,0.00");
            break;
          case "payment":
            sums[index] =
              "￥" + this.$numeral(this.count.payment).format("0,0.00");
            break;
          case "systemProfit":
            sums[index] =
              "￥" + this.$numeral(this.count.systemProfit).format("0,0.00");
            break;
          case "shouldProfit":
            sums[index] =
              "￥" + this.$numeral(this.count.shouldProfit).format("0,0.00");
            break;
          case "profit":
            sums[index] =
              "￥" + this.$numeral(this.count.profit).format("0,0.00");
            break;
          default:
            sums[index] = "";
            break;
        }
      });
      return sums;
    },
    handleAdd() {
      this.dialogVisible = true;
    },
    onSearch(params) {
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
        this.searchParams = newParams;
        this.searchParams.pageSize = this.pageSize;
        this.currentPage = 1;
        this.searchParams.currentPage = this.currentPage;
        this.loadData(this.searchParams);
        this.$message({
          type: "success",
          message: "查询成功！"
        });
      }
    },
    handleUpdate() {},
    handleCancel() {
      this.dialogVisible = false;
    },
    handleSave() {},
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    }
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  },
  created() {
    this.loadData(this.searchParams);
  }
};
</script>
