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
        style="width: 100%;margin-bottom:15px"
        v-loading="loading"
        fit
      >
        <el-table-column label="序号" type="index" width="50" align="center">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="orderNo" label="订单号" width="180" align="center"></el-table-column>
        <el-table-column prop="pid" label="pid" width="180" align="center"></el-table-column>
        <el-table-column prop="path" label="path" width="180" align="center"></el-table-column>
        <el-table-column prop="rootOrderNo" label="销售出票单号" width="180" align="center"></el-table-column>
        <el-table-column prop="linkOrderNo" label="业务订单编号" width="180" align="center"></el-table-column>

        <el-table-column
          :show-overflow-tooltip="true"
          prop="sourceOrderNo"
          label="原订单"
          align="center"
        ></el-table-column>
        <el-table-column prop="ticketNos" label="票号" width="180" align="center">
          <template slot-scope="scope">
            <span>
              {{formatTicketNo(scope.row.ticketNos)}}
            </span>
          </template>

        </el-table-column>
        <el-table-column
          prop="policyCode"
          :show-overflow-tooltip="true"
          label="政策代码"
          align="center"
        ></el-table-column>
        <el-table-column
          :formatter="formateOrderType"
          prop="orderType"
          label="订单类型"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="category"
          :formatter="formateCategory"
          label="订单分类"
          width="80"
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
        <el-table-column label="交易时间" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.transactionTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column><el-table-column label="业务完结时间" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.finishTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fundAccount" label="资金账号" width="100" align="center"></el-table-column>
        <el-table-column prop="accountId" label="平台账号" width="100" align="center"></el-table-column>
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

        <el-table-column label="乘客" align="center" width="200">
          <template slot-scope="scope">
            <i v-if="scope.row.passengers"></i>
            <span>{{ formatPassengers(scope.row.passengers)}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="voyageType"
          :formatter="formateVoyageType"
          label="航程类型"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="航班号" width="80" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flights"></i>
            <span>{{ formatFlightNo(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="航班日期" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flights"></i>
            <span>{{ formatFlightDate(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="起飞-到达" width="180" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flights"></i>
            <span>{{ formatFlight(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pnr" label="PNR" width="150" align="center"></el-table-column>
        <el-table-column label="交易金额" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.transactionAmount"></i>
            <span>{{ formatAmount(scope.row.transactionAmount)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="总价" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.amount"></i>
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
      searchParams: {}
    };
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
        if (params.ticketNo) {
          newParams.ticketNo = params.ticketNo;
        }
        if (params.pnr) {
          newParams.pnr = params.pnr;
        }
        if (params.status) {
          newParams.status = params.status;
        }
        if (params.flightDate) {
          newParams.startFlightDate = params.flightDate[0];
          newParams.endFlightDate = params.flightDate[1];
        }
        if (params.cabin) {
          newParams.cabin = params.cabin;
        }
        if (params.flightCode) {
          newParams.flightCode = params.flightCode;
        }
        if (params.orderType) {
          newParams.orderType = params.orderType;
        }
        if (params.voyageType) {
          newParams.voyageType = params.voyageType;
        }
        if (params.rootOrderNo) {
          newParams.rootOrderNo = params.rootOrderNo;
        }
        if (params.fundAccount) {
          newParams.fundAccount = params.fundAccount;
        }
        if (params.accountId) {
          newParams.accountId = params.accountId;
        }
        if (params.pid) {
          newParams.pid = params.pid;
        }
        if (params.sourceOrderNo) {
          newParams.sourceOrderNo = params.sourceOrderNo;
        }
        if (params.path) {
          newParams.path = params.path;
        }
        if (params.linkOrderNo) {
          newParams.linkOrderNo = params.linkOrderNo;
        }
        if (params.createTime) {
          newParams.startCreateTime = params.createTime[0];
          newParams.endCreateTime = params.createTime[1];
        }
        if (params.finishTime) {
          newParams.startFinishTime = params.finishTime[0];
          newParams.endFinishTime = params.finishTime[1];
        }
        if (params.DdeadlineChangeTime) {
          newParams.startTransactionTime = params.transactionTime[0];
          newParams.endTransactionTime = params.transactionTime[0];
        }
        if (params.deadlineTicketTime) {
          newParams.startDeadlineTicketTime = params.deadlineTicketTime[0];
          newParams.endDeadlineTicketTime = params.deadlineTicketTime[0];
        }
        if (params.deadlineReturnTime) {
          newParams.startDeadlineReturnTime = params.deadlineReturnTime[0];
          newParams.endDeadlineReturnTime = params.deadlineReturnTime[0];
        }
        if (params.deadlineChangeTime) {
          newParams.startDeadlineChangeTime = params.deadlineChangeTime[0];
          newParams.endDeadlineChangeTime = params.deadlineChangeTime[0];
        }
        if (params.emptyData.length > 0) {
          params.emptyData.forEach(item => {
            newParams[item] = "";
          });
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
      // let dptTime = data[0].dptTime.match(/.*(.{5})/)[1];
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
      if (data.length > 0) {
        let str = "";
        data.forEach((item, index) => {
          str += item + " / "
        });
        return str.substring(0, str.length - 2);
      } else {
        return data;
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
  components: {
    orderSearch
  },
  created() {
    this.loadData(this.searchParams);
    this.loadTotal();
  }
};
</script>
