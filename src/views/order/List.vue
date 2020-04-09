<template>
  <div class="bigBox">
    <div class="searchBox">
      <order-search @onSearch="handleSearch"></order-search>
    </div>
    <div class="contentBox">
      <el-table
        :data="tableData"
        size="mini"
        highlight-current-row
        max-height="650"
        style="width: 100%;margin-bottom:15px"
        v-loading="loading"
        fit
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column label="序号" type="index" width="50" align="center">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号" width="175" align="center"></el-table-column>
        <el-table-column prop="policyCode" label="政策代码" align="center" width="180"></el-table-column>
        <el-table-column
          :formatter="formateOrderType"
          prop="orderType"
          label="订单类型"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="category"
          :formatter="formateCategory"
          label="订单分类"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          :formatter="formateStatus"
          label="订单状态"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="订单日期" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.createTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fundAccount" label="资金账号" width="100" align="center"></el-table-column>
        <el-table-column prop="accountId" label="平台账号" width="100" align="center"></el-table-column>
        <el-table-column prop="rootOrderNo" label="销售出票单号" width="100" align="center"></el-table-column>
        <el-table-column prop="linkOrderNo" label="业务订单编号" width="100" align="center"></el-table-column>
        <el-table-column prop="sourceOrderNo" label="原订单" align="center"></el-table-column>
        <el-table-column prop="pid" label="pid" align="center"></el-table-column>
        <el-table-column prop="path" label="path" width="100" align="center"></el-table-column>

        <el-table-column label="交易时间" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.transactionTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务完结时间" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.finishTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最晚出票时限" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.deadlineTicketTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最晚退票时限" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.deadlineReturnTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最晚退票时限" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.deadlineChangeTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="pnr" label="PNR" width="150" align="center"></el-table-column>

        <el-table-column label="航班号" align="center">
          <template slot-scope="scope">
            <span>{{ formatFlightNo(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="航班日期" width="90" align="center">
          <template slot-scope="scope">
            <span>{{ formatFlightDate(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="起飞-到达" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ formatFlight(scope.row.flights)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="乘客" align="center" width="200">
          <template slot-scope="scope">
            <i v-if="scope.row.passengers"></i>
            <span>{{ formatPassengers(scope.row.passengers)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ticketNos" label="票号" width="120" align="center">
          <template slot-scope="scope">
            <span>{{formatTicketNo(scope.row.ticketNos)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="交易金额" prop="transactionAmount" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.transactionAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总价" prop="amount" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.amount)}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="handleOrderDetail(scope.row)" type="primary" size="mini">查看</el-button>
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
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import orderSearch from "./Search.vue";
import {
  formateStatus,
  formateCategory,
  formateOrderType,
  formateVoyageType
} from "@/utils/status.js";

export default {
  name: "orderList",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: true,
      dialogVisible: false,
      tableData: [],
      searchParams: {},
      count: []
    };
  },
  components: {
    orderSearch
  },
  methods: {
    formateStatus,
    formateCategory,
    formateOrderType,
    formateVoyageType,
    handleSizeChange: function(size) {
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
        .dispatch("order/getList", {
          filters: params
        })
        .then(data => {
          if (data) {
            this.tableData = data;
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
        .dispatch("order/getTotal", {
          filters: params
        })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadCount(params) {
      this.$store
        .dispatch("order/getCount", {
          filters: params
        })
        .then(data => {
          this.count = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSummaries(params) {
      const { columns, data } = params;
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
          default:
            sums[index] = "";
            break;
        }
      });
      return sums;
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
            if (key === "emptyData") {
              params[key].forEach(item => {
                newParams[item] = "";
              });
            } else {
              let start = "start" + key.charAt(0).toUpperCase() + key.slice(1);
              let end = "end" + key.charAt(0).toUpperCase() + key.slice(1);
              newParams[start] = params[key][0];
              newParams[end] = params[key][1];
            }
          } else if (params[key]) {
            newParams[key] = params[key];
          }
        }
        this.searchParams = newParams;
        this.loadData(this.searchParams);
        this.loadTotal(this.searchParams);
        this.$message({
          type: "success",
          message: "查询成功！"
        });
      }
    },
    handleRemove(orderNo) {
      this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("order/removeOne", { orderNo: orderNo })
            .then(() => {
              if (1 === this.tableData.length) {
                this.prevClick();
              } else {
                this.loadData(this.searchParams);
              }
              this.loadTotal();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleSave() {},
    handleAdd() {
      this.dialogVisible = true;
    },
    handleOrderDetail(row) {
      this.$router.push({
        path: "/order/detail",
        query: {
          orderNo: row.orderNo
        }
      });
    },
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
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
    formatTicketNo(data) {
      if (data != "" && data.length > 0) {
        let str = "";
        data.forEach((item, index) => {
          if (item) {
            str += item + " / ";
          }
        });
        return str.substring(0, str.length - 2);
      } else {
        return (data = "");
      }
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
