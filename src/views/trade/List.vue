<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
     <el-row class="page-tools" >
        <!-- <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button> -->
      </el-row>
      <el-table class="page-table" size="mini" v-loading="loading" :data="tableData" style="width: 100%;">
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
        <el-table-column prop="sendPayDate" label="本次交易打款给卖家的时间" align="center" :formatter="formatSendPayDate"></el-table-column>
        <el-table-column prop="receiptAmount" label="实收金额" align="center"></el-table-column>
        <el-table-column prop="storeId" label="商户门店编号" align="center"></el-table-column>
        <el-table-column prop="terminalId" label="商户机具终端编号" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="180">
          <template slot-scope="scope" align="center" width="180" fixed="right">
            <el-button  type="text" size="mini" class="btn-primary" @click="handleUpdate(scope.row.tradeNo)">查看</el-button>
<!--            <el-button size="mini" type="primary" @click="handleUpdate(scope.row.tradeNo)">编辑</el-button>
            <el-button size="mini" type="danger" @click="onDel(scope.row.tradeNo)">删除</el-button>-->
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

      <el-dialog
        title="交易记录管理"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="24%"
      >
        <edit
          v-if="dialogVisible"
          :editTradeNo="editTradeNo"
          :codeEnabled="codeEnabled"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></edit>
      </el-dialog>
    </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

  export default {
    mixins: [MIXIN_LIST],
    name: "tradeContent",
    data() {
      return {
        searchForm: {},
        dialogVisible: false,
        editTradeNo: null,
        codeEnabled: false,
        currencyList: [],
        tradeNo:'',
        keyName:'tradeNo',
        uploadData: {
          tree: null,
          treeNode: null,
          resolve: null
        },
        actions: {
          getPageList: 'trade/getPageList',
          removeOne: 'trade/removeOne'
        }
      };
    },
    methods: {
      
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
      
     
      handleUpdate(tradeNo) {
        this.editTradeNo = tradeNo;
        this.pid = null;
        this.codeEnabled = true;
        this.dialogVisible = true;
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
      formatSendPayDate(rows) {
        if(rows && rows.sendPayDate){
          return this.formatDate(rows.sendPayDate, "YYYY-MM-DD HH：mm：ss")
        }else{
          return "";
        }
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
       edit,
      search
    }
  };
</script>

<style>
  .contentBox {
    margin-top: -10px;
    padding-top: 0;
  }
</style>
