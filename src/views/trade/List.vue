<template>
  <div class="bigBox">
    <div class="searchBox">
      <trade-search @onSearch="loadData"></trade-search>
    </div>
    <div class="contentBox">
<!--      <el-row style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>-->
      <el-table size="mini" v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
        <el-table-column prop="tradeNo" label="交易编号" align="center"></el-table-column>
        <el-table-column prop="outTradeNo" label="商家订单号" align="center"></el-table-column>
        <el-table-column prop="tradeStatus" label="交易状态" align="center" :formatter="formatStatusDirection"></el-table-column>
        <el-table-column prop="totalAmount" label="交易的订单金额" align="center" :formatter="formatAmount"></el-table-column>
        <el-table-column prop="discountableAmount" label="可打折金额" align="center" :formatter="formatAmount"></el-table-column>
        <el-table-column prop="tradeCurrency" label="标价币种" align="center" :formatter="formatCurrencyDirection"></el-table-column>
        <el-table-column prop="settleCurrency" label="订单结算币种" align="center" :formatter="formatCurrencyDirection"></el-table-column>
        <el-table-column prop="settleAmount" label="结算币种订单金额" align="center" :formatter="formatAmount"></el-table-column>
        <el-table-column prop="payCurrency" label="订单支付币种" align="center" :formatter="formatCurrencyDirection"></el-table-column>
        <el-table-column prop="payAmount" label="支付币种订单金额" align="center" :formatter="formatAmount"></el-table-column>
        <el-table-column prop="settleTransRate" label="结算币种兑换标价币种汇率" align="center"></el-table-column>
        <el-table-column prop="transPayRate" label="标价币种兑换支付币种汇率" align="center"></el-table-column>
        <el-table-column prop="buyerPayAmount" label="买家实付金额" align="center" :formatter="formatAmount"></el-table-column>
        <el-table-column prop="pointAmount" label="积分支付的金额" align="center" :formatter="formatAmount"></el-table-column>
        <el-table-column prop="invoiceAmount" label="发票金额" align="center" :formatter="formatAmount"></el-table-column>
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
          <template slot-scope="scope" align="center" width="180" fixed="right">
            <el-button size="mini" type="primary" @click="handleUpdate(scope.row.tradeNo)">查看</el-button>
<!--            <el-button size="mini" type="primary" @click="handleUpdate(scope.row.tradeNo)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleRemove(scope.row.tradeNo)">删除</el-button>-->
          </template>
        </el-table-column>
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

      <el-dialog
        title="交易记录管理"
        center
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="24%"
      >
        <trade-edit
          v-if="dialogVisible"
          :editTradeNo="editTradeNo"
          :codeEnabled="codeEnabled"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></trade-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import tradeSearch from "./Search.vue";
  import tradeEdit from "./Edit.vue";

  export default {
    name: "tradeContent",
    data() {
      return {
        loading: true,
        searchForm: {},
        dialogVisible: false,
        editTradeNo: null,
        pid: null,
        tableData: [],
        pageFlag: 1,
        pageSize: 10,
        lastId: null,
        total: 0,
        codeEnabled: false,
        currencyList: [],
        uploadData: {
          tree: null,
          treeNode: null,
          resolve: null
        }
      };
    },
    methods: {
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].tradeNo;
        this.loadData();
      },
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].tradeNo;
        this.loadData();
      },
      loadCurrency() {
        this.$store
          .dispatch("currency/getList", { filter: {} })
          .then(data => {
            this.currencyList = data;
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadData(params = {}) {
        if (this.lastId) {
          params.lastId = this.lastId;
        }

        this.$store
          .dispatch("trade/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            filter: params
          })
          .then(data => {
            if (data && data.rows && data.rows.length > 0) {
              this.tableData = data.rows;
              this.total = data.total;
            } else {
              this.tableData = [];
              this.total = 0;
            }
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      handleAdd() {
        this.editTradeNo = null;
        this.pid = null;
        this.codeEnabled = false;
        this.dialogVisible = true;
      },
      onSearch(params) {
        const newParams = {};
        if (params) {
          for (let key in params) {
            if (params[key]) {
              newParams[key] = params[key];
            }
          }
        }
        this.loadData(newParams);
        this.$message({
          type: "success",
          message: "查询成功！"
        });
      },
      handleUpdate(tradeNo) {
        this.editTradeNo = tradeNo;
        this.pid = null;
        this.codeEnabled = true;
        this.dialogVisible = true;
      },
      handleRemove(tradeNo) {
        this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("trade/removeOne", {tradeNo: tradeNo})
              .then(() => {
                if (1 === this.tableData.length) {
                  this.handlePrevClick();
                } else {
                  this.loadData();
                }
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
              });
          })
          .catch(err => {
            console.error(err);
          });
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave(formData) {
        let method = "trade/save";
        let msg = "添加成功！";

        if(formData && formData.tradeNo){
          method = "trade/update";
          msg = "编辑成功！";
        }

        this.$store
          .dispatch(method, formData)
          .then(() => {
            this.$message({
              type: "success",
              message: msg
            });
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
      formatStatusDirection(row) {
        if(row.tradeStatus === 'WAIT_BUYER_PAY'){
          return '交易创建，等待买家付款';
        }else if(row.tradeStatus === 'TRADE_CLOSED'){
          return '未付款交易超时关闭，或支付完成后全额退款';
        }else if(row.tradeStatus === 'TRADE_SUCCESS'){
          return '交易支付成功';
        }else if(row.tradeStatus === 'TRADE_FINISHED'){
          return '交易结束，不可退款';
        }
        return '';
      },
      formatCurrencyDirection(row, column, val) {
        let currencyName = '';
        this.currencyList.forEach(function(obj){
          if(val === obj.currencyId){
            currencyName = obj.currencyName;
          }
        });
        return currencyName;
      },
      formatAmount(row, column, val) {
        if (!val) {
          return "0.00";
        }
        return this.$numeral(val).format("0.00");
      },
      formatDate(dateStr, format) {
        if (null != dateStr) {
          const date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      }
    },
    created() {
      this.loadCurrency();
    },
    components: {
      tradeSearch,
      tradeEdit
    }
  };
</script>

<style>
  .contentBox {
    margin-top: -10px;
    padding-top: 0;
  }
</style>
