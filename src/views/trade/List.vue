<template>

  <div class="bigBox">
   <div class="searchBox"><search ref="search" @onSearch="handleSearch"/></div>
    <div class="contentBox">
    <el-row type="flex" justify="space-between" style="margin-bottom:20px;" align="bottom">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加功能</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
      <el-table-column label="序号" type="index" width="50" align="center">
        <template slot-scope="scope">
          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
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

      <el-table-column label="操作" fixed="right" align="center" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.tradeId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @prev-click="handlePrev"
        @next-click="handleNext"
      ></el-pagination>
      <edit :visible.sync="dialogVisible" :trade-id="tradeId" :cur-node="curNode" :update="update" @refresh="handleRefresh"/>
  </div>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";

  export default {
    data() {
      return {
        dialogVisible: false,
        pageFlag: 0,
        pageSize: 10,
        currentPage: 1,
        lastId: null,
        total: 0,
        tableData: [],
        loading: true,
        tradeId: '',
        curNode:{},
        update: false
      };
    },
    methods: {
      // 时间格式
      formatDate(dateStr, format) {
        if (null != dateStr) {
          const date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      },
      getList(params) {
        this.$store
          .dispatch("trade/getList", {
            filter: params
          })
          .then(result => {
            this.tableData = result;
          });
      },
      getTotal(params) {
        this.$store.dispatch("trade/getTotal", {
          filter: params
        }).then(result => {
          this.total = result;
        });
      },
      // 获取数据 （列表+条数）
      loadData() {
        this.getList();
        this.getTotal();
      },
      handleSearch(param) {
        this.pageFlag = 0;
        this.lastId = null;
        this.loadData();
      },
      handleRefresh() {
        this.handleSearch();
      },
      handlePrev(page) {
        this.pageFlag = -1;
        this.currentPage = page;
        this.searchParams.currentPage = this.currentPage;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[0].tradeId;
        }
        this.loadData();
      },
      handleNext(page) {
        this.pageFlag = 1;
        this.currentPage = page;
        this.searchParams.currentPage = this.currentPage;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].tradeId;
        }
        this.loadData();
      },
      handleAdd() {
        this.dialogVisible = true;
        this.tradeId = "";
        this.curNode = {};
        this.update = false;
      },
      handleEdit(row) {
        this.dialogVisible = true;
        this.tradeId = "";
        this.curNode = row;
        this.update = true;
      },
      handleDelete(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("trade/removeOne", {tradeId: id}).then(() => {
            this.handleRefresh();
            this.$message({type: "success", message: "删除成功"});
          });
        });
      }
    },
    components: {
      edit,
      search
    },
    created() {
      this.loadData();
    }
  };
</script>
