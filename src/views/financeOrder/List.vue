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
        :summary-method="getSummaries"
        fit
      >
        <el-table-column label="序号" type="index" width="50" align="center">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号" align="center" width="160"></el-table-column>
        <el-table-column prop="policyCode" label="政策代码" width="150" align="center"></el-table-column>
        <el-table-column
          :formatter="formatOrderType"
          prop="orderType"
          label="订单类型"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="category"
          :formatter="formatCategory"
          label="订单分类"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          :formatter="formatStatus"
          label="订单状态"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column label="订单日期" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.createTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
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
        <el-table-column label="起飞 -- 到达" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatFlight(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pnr" label="PNR" width="80" align="center"></el-table-column>
        <el-table-column label="乘客" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ formatPassengers(scope.row.passengers)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="transactionAmount" label="交易金额" width="150" align="center">
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
            <el-button
              @click.native.prevent="handleRemove(scope.row.deptId)"
              type="text" size="mini" class="btn-danger"
            >删除</el-button>
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
import {
  formatStatus,
  formatCategory,
  formatOrderType
} from "@/utils/status.js";

export default {
  name: "orderReportList",
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
  methods: {
    formatStatus,
    formatCategory,
    formatOrderType,
    onSizeChange: function(size) {
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
      this.$store
        .dispatch("orderReport/getList", {
          filters: params
        })
        .then(data => {
          if (data) {
            this.tableData = data;
            this.loadCount(params);
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
        .dispatch("orderReport/getTotal", {
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
        .dispatch("orderReport/getCount", {
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
      const { columns } = params;
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
        this.loadData(this.searchParams);
        this.$message({
          type: "success",
          message: "查询成功！"
        });
      }
    },
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
    },
    formatFlightDate(data) {
      if (!data || data.length == 0) {
        return "";
      }
      return this.initDate(data[0].flightDate, "YYYY-MM-DD");
    },
    formatFlightNo(data) {
      if (!data || data.length == 0) {
        return "";
      }
      return data[0].flightCode;
    },
    formatFlight(data) {
      if (!data || data.length == 0) {
        return "";
      }
      return (
        data[0].dpt +
        " " +
        data[0].dptTime +
        " - " +
        data[0].arr +
        " " +
        data[0].arrTime
      );
    },
    formatPassengers(data) {
      if (!data || data.length == 0) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item.name + " / ";
      });

      return str.substring(0, str.length - 2);
    },
    formatAmount(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    }
  },
  components: {
    search
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
    this.loadTotal();
    this.loadCount();
  }
};
</script>
