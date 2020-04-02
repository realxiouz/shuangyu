<template>
  <div class="bigBox">
    <div class="searchBox">
      <order-search @onSearch="handleSearch"></order-search>
    </div>
    <div class="contentBox">
      <!-- <el-row style="margin-bottom:15px;margin-left:40px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>-->
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
        <el-table-column
          prop="policyCode"
          :show-overflow-tooltip="true"
          label="政策代码"
          align="center"
        ></el-table-column>
        <el-table-column prop="status" label="订单状态" width="80" align="center"></el-table-column>
        <el-table-column label="订单日期" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.createTime"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.createTime,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="订单分类" width="80" align="center"></el-table-column>
        <el-table-column label="乘客" align="center" width="200">
          <template slot-scope="scope">
            <i v-if="scope.row.passengers"></i>
            <span style="margin-left: 10px">{{ formatPassengers(scope.row.passengers)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="voyageType" label="航程类型" width="80" align="center"></el-table-column>
        <el-table-column label="航班号" width="80" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flights"></i>
            <span style="margin-left: 10px">{{ formatFlightNo(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="航班日期" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flights"></i>
            <span style="margin-left: 10px">{{ formatFlightDate(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="起飞-到达" width="180" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flights"></i>
            <span style="margin-left: 10px">{{ formatFlight(scope.row.flights)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pnr" label="PNR" width="150" align="center"></el-table-column>

        <el-table-column label="总价" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.amount"></i>
            <span style="margin-left: 10px">{{ formatAmount(scope.row.amount)}}</span>
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
          newParams.flightDate = params.flightDate;
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
        if (params.createTime) {
          newParams.createTime = params.createTime;
        }
        this.searchParams = newParams;
        this.loadData(this.searchParams);
        this.loadTotal(this.searchParams);
        this.$message({
          type:'success',
          message:'查询成功！'
        })
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
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (null != dateStr) {
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
