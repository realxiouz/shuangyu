<template>
  <div>
    <el-form :model="formData" ref="form" :rules="rules" label-width="200px" size="mini">
      <el-form-item label="交易编号:" prop="tradeNo">
        <el-input v-model="formData.tradeNo"
                  onkeyup="this.value=this.value.toUpperCase()"
                  placeholder="请输入交易编号..."
                  :disabled="codeEnabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="商家订单号:" prop="outTradeNo">
        <el-input v-model="formData.outTradeNo"
                  onkeyup="this.value=this.value.toUpperCase()"
                  placeholder="请输入商家订单号..."
                  :disabled="codeEnabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="交易状态:">
        <el-select v-model="formData.tradeStatus" placeholder="请选择交易状态" style="width: 100%">
          <el-option label="交易创建，等待买家付款" :value="'WAIT_BUYER_PAY'"></el-option>
          <el-option label="未付款交易超时关闭，或支付完成后全额退款" :value="'TRADE_CLOSED'"></el-option>
          <el-option label="交易支付成功" :value="'TRADE_SUCCESS'"></el-option>
          <el-option label="交易结束，不可退款" :value="'TRADE_FINISHED'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易订单金额:">
        <el-input v-model="formData.totalAmount" placeholder="交易订单金额.." v-on:change="formatNumber"></el-input>
      </el-form-item>
      <el-form-item label="可打折金额:">
        <el-input v-model="formData.discountableAmount" placeholder="可打折金额" v-on:change="formatNumber"></el-input>
      </el-form-item>
      <el-form-item label="标价币种:">
        <el-select v-model="formData.tradeCurrency" style="width: 100%;">
          <el-option
            v-for="(item,idx) in currencyList"
            :key="idx"
            :label="item.currencyName"
            :value="item.currencyId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单结算币种:">
        <el-select v-model="formData.settleCurrency" style="width: 100%;">
          <el-option
            v-for="(item,idx) in currencyList"
            :key="idx"
            :label="item.currencyName"
            :value="item.currencyId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算币种订单金额:">
        <el-input v-model="formData.settleAmount" placeholder="请输入结算币种订单金额.." v-on:change="formatNumber"></el-input>
      </el-form-item>
      <el-form-item label="订单支付币种:">
        <el-select v-model="formData.payCurrency" style="width: 100%;">
          <el-option
            v-for="(item,idx) in currencyList"
            :key="idx"
            :label="item.currencyName"
            :value="item.currencyId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付币种订单金额:">
        <el-input v-model="formData.payAmount" placeholder="请输入支付币种订单金额.." v-on:change="formatNumber"></el-input>
      </el-form-item>
      <el-form-item label="结算币种兑换标价币种汇率:">
        <el-input v-model="formData.settleTransRate" placeholder="请输入结算币种兑换标价币种汇率.." v-on:change="formatNumber()"></el-input>
      </el-form-item>
      <el-form-item label="标价币种兑换支付币种汇率:">
        <el-input v-model="formData.transPayRate" placeholder="请输入标价币种兑换支付币种汇率.." v-on:change="formatNumber()"></el-input>
      </el-form-item>
      <el-form-item label="买家实付金额:">
        <el-input v-model="formData.buyerPayAmount" placeholder="请输入买家实付金额.." v-on:change="formatNumber"></el-input>
      </el-form-item>
      <el-form-item label="积分支付的金额:">
        <el-input v-model="formData.pointAmount" placeholder="请输入积分支付的金额.." v-on:change="formatNumber"></el-input>
      </el-form-item>
      <el-form-item label="发票金额:">
        <el-input v-model="formData.invoiceAmount" placeholder="请输入发票金额.." v-on:change="formatNumber"></el-input>
      </el-form-item>
      <el-form-item label="本次交易打款给卖家的时间:">
        <el-date-picker v-model="formData.sendPayDate" style="width:100%" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="实收金额:">
        <el-input v-model="formData.receiptAmount" placeholder="请输入实收金额.." v-on:change="formatNumber"></el-input>
      </el-form-item>
      <el-form-item label="商户门店编号:">
        <el-input v-model="formData.storeId" placeholder="请输入商户门店编号.."></el-input>
      </el-form-item>
      <el-form-item label="商户机具终端编号:">
        <el-input v-model="formData.terminalId" placeholder="请输入商户机具终端编号.."></el-input>
      </el-form-item>
    </el-form>
<!--    <div style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
    </div>-->
  </div>
</template>

<script>
  function defaultData() {
    return {
      tradeNo: null,
      outTradeNo: null,
      tradeStatus: null,
      totalAmount: 0,
      discountableAmount: 0,
      tradeCurrency: null,
      settleCurrency: null,
      settleAmount: 0,
      payCurrency: null,
      payAmount: 0,
      settleTransRate: null,
      transPayRate: null,
      buyerPayAmount: null,
      pointAmount: null,
      invoiceAmount: null,
      sendPayDate: null,
      receiptAmount: 0,
      storeId: null,
      terminalId: null
    };
  }

  export default {
    props: ["editTradeNo", "codeEnabled"],
    data() {
      const codeValidator = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入字母或数字！"));
        }
      };
      return {
        formData: defaultData(),
        currencyList: [],
        newDialogVisible: false,
        rules: {
          tradeNo: [
            {required: true, message: "请输入交易编号", trigger: "change"},
            {
              min: 1,
              max: 30,
              message: "长度在 1到 30 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          outTradeNo: [
            {required: true, message: "请输入商家订单号", trigger: "change"},
            {
              min: 1,
              max: 30,
              message: "长度在 1到 30 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      loadCurrency() {
        this.$store
          .dispatch("currency/getList", { filter: {} })
          .then(data => {
            this.currencyList = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleGetOne(tradeNo) {
        if (tradeNo) {
          this.$store
            .dispatch("trade/getOne", {tradeNo: tradeNo})
            .then(data => { 
              this.formData = data;
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.formData = defaultData();
        }
      },
      handleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.formData.sendPayDate && "number" != typeof this.formData.sendPayDate) {
              this.formData.sendPayDate = this.formData.sendPayDate.getTime();
            }
            this.formData.tradeNo = this.formData.tradeNo.toUpperCase();
            this.formData.outTradeNo = this.formData.outTradeNo.toUpperCase();
            this.$emit("onSave", this.formData);
          }
        });
      },
      handleSwitch(){
        this.enable = !this.enable;
      },
      formatNumber(){
        if(isNaN(this.formData.rate)){
          this.formData.rate = 1;
          this.$message({
            type: "warning",
            message: "请输入数字！"
          });
          return;
        }
        if(parseFloat(this.formData.rate) <= 0){
          this.formData.rate = 1;
          this.$message({
            type: "warning",
            message: "请输入大于0的数字！"
          });
          return;
        }
        this.formData.rate = parseFloat(this.formData.rate);
      }
    },
    created() {
      if (this.editTradeNo) {
        this.handleGetOne(this.editTradeNo);
      }
      this.loadCurrency();
    }
  };
</script>
