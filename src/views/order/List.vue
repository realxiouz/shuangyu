<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-table
        class="page-table"
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
        <el-table-column label="源单号" prop="sourceOrderNo" width="170" align="center"></el-table-column>
        <el-table-column prop="policyCode" label="政策代码" align="center" width="180"></el-table-column>
        <el-table-column
          :formatter="formatOrderType"
          prop="orderType"
          label="订单类型"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="category"
          :formatter="formatCategory"
          label="订单分类"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          :formatter="formatStatus"
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
        <el-table-column prop="transactionNo" label="流水号" width="100" align="center"></el-table-column>
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
        <el-table-column label="最晚改签时限" width="100" align="center">
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
        <el-table-column label="起飞-到达" width="90" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlight(scope.row.flights)"></span>
          </template>
        </el-table-column>

        <el-table-column label="乘客" align="center" width="200">
          <template slot-scope="scope">
            <span v-html="formatPassengers(scope.row.passengers)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="ticketNos" label="票号" width="120" align="center">
          <template slot-scope="scope">
            <span v-html="formatTicketNo(scope.row.ticketNos)"></span>
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
            <el-button type="danger" size="mini" @click="onDel(scope.row.orderNo)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-footer"
        background
        prev-text="上一页"
        next-text="下一页"
        :total="total"
        @prev-click="onPrev"
        @next-click="onNext"
        @size-change="onSizeChange"
        layout="total,sizes,prev,next"
        :page-size="pageSizes[0]"
        :page-sizes="pageSizes"
        @current-change="onCurrentChange"
        :current-page.sync="currentPage"
      ></el-pagination>
    </div>
</template>

<script>
  import search from "./Search.vue";
  import {MIXIN_LIST} from "@/utils/mixin";
  import {
    formatCategory,
    formatOrderType,
    formatStatus,
    formatVoyageType
  } from "@/utils/status.js";
  import {
    formatPassengers,
    formatTicketNo,
    formatFlightDate,
    formatFlightNo,
    formatFlight,
    formatAmount
  } from "@/utils/orderFormdata.js";

  export default {
    mixins: [MIXIN_LIST],
    name: "orderList",
    data() {
      return {
        dialogVisible: false,
        orderNo:'',
        keyName:'orderNo',
        count: [],
        actions: {
          getPageList: 'order/getList',
          removeOne: 'order/removeOne'
        }
      };
    },
    components: {
      search
    },
    methods: {
      formatStatus,
      formatCategory,
      formatOrderType,
      formatVoyageType,
      formatPassengers,
      formatTicketNo,
      formatFlightDate,
      formatFlightNo,
      formatFlight,
      formatAmount,
     
      exportOrder(params) {
        this.$store.dispatch("order/exportOrder", {
          filters: params
        });
      },
      
      loadCount(params) {
        this.$store
          .dispatch("order/getCount", {
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
        const {columns} = params;
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
     
      handleCancel() {
        this.dialogVisible = false;
      },
     
      handleOrderDetail(row) {
        let path = "";
        path = "/order/detail2";
        this.$router.push({
          path: path,
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
    },
    computed: {
      formatDate() {
        return function (dateStr, format) {
          return this.initDate(dateStr, format);
        };
      }
    },
  };
</script>
