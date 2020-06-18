<template>
  <div>

  <el-form :model="formData" ref="form" :rules="rules" label-width="200px" size="mini">
      <input type="hidden" v-model="formData.tradeId" />
      <el-form-item label="交易编号:" prop="tradeNo">
        <el-input v-model="formData.tradeNo" placeholder="交易编号.."></el-input>
      </el-form-item>
      <el-form-item label="商家订单号:" prop="outTradeNo">
        <el-input v-model="formData.outTradeNo" placeholder="商家订单号.."></el-input>
      </el-form-item>
      <el-form-item label="交易状态:">
        <el-input v-model="formData.tradeStatus" placeholder="交易状态.."></el-input>
      </el-form-item>
      <el-form-item  label="交易订单金额:">
        <el-input v-model="formData.totalAmount" placeholder="交易订单金额.."></el-input>
      </el-form-item>
      <el-form-item  label="可打折金额:">
        <el-input v-model="formData.discountableAmount" placeholder="可打折金额"></el-input>
      </el-form-item>
      <el-form-item label="标价币种:">
        <el-select v-model="formData.tradeCurrency" style="width: 100%;" @change="selectedCategory">
          <el-option label="人民币" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单结算币种:">
        <el-select v-model="formData.settleCurrency" style="width: 100%;" @change="selectedCategory">
          <el-option label="人民币" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算币种订单金额:">
        <el-input v-model="formData.settleAmount" placeholder="请输入结算币种订单金额.."></el-input>
      </el-form-item>

      <el-form-item label="订单支付币种:">
        <el-select v-model="formData.payCurrency" style="width: 100%;" @change="selectedCategory">
          <el-option label="人民币" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付币种订单金额:">
        <el-input v-model="formData.payAmount" placeholder="请输入支付币种订单金额.."></el-input>
      </el-form-item>
      <el-form-item label="结算币种兑换标价币种汇率:">
        <el-input v-model="formData.settleTransRate" placeholder="请输入结算币种兑换标价币种汇率.."></el-input>
      </el-form-item>
      <el-form-item label="标价币种兑换支付币种汇率:">
        <el-input v-model="formData.transPayRate" placeholder="请输入标价币种兑换支付币种汇率.."></el-input>
      </el-form-item>
      <el-form-item label="买家实付金额:">
        <el-input v-model="formData.buyerPayAmount" placeholder="请输入买家实付金额.."></el-input>
      </el-form-item>
      <el-form-item label="积分支付的金额:">
        <el-input v-model="formData.pointAmount" placeholder="请输入积分支付的金额.."></el-input>
      </el-form-item>
      <el-form-item label="发票金额:">
        <el-input v-model="formData.invoiceAmount" placeholder="请输入发票金额.."></el-input>
      </el-form-item>
      <el-form-item label="本次交易打款给卖家的时间:">
        <el-date-picker v-model="formData.sendPayDate" style="width:100%" type="date" placeholder="选择日期"></el-date-picker>
        <!--<span style="color: #ff8aac;">有效期至选择日期零点(00:00:00)</span>-->
      </el-form-item>
      <el-form-item label="实收金额:">
        <el-input v-model="formData.receiptAmount" placeholder="请输入实收金额.."></el-input>
      </el-form-item>
      <el-form-item label="实收金额:">
        <el-input v-model="formData.storeId" placeholder="请输入实收金额.."></el-input>
      </el-form-item>
      <el-form-item label="商户门店编号:">
        <el-input v-model="formData.storeId" placeholder="请输入商户门店编号.."></el-input>
      </el-form-item>
      <el-form-item label="商户机具终端编号:">
        <el-input v-model="formData.terminalId" placeholder="请输入商户机具终端编号.."></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tradeId", "pid"],
  data() {
    return {
      formData: {},
     // currencyList: [],
      //subjectList: [],
      //是否显示金额
      //amountShowAble: false
      rules: {
        tradeNo: [
          { required: true, message: "请输入交易编号", trigger: "blur" }
        ],
        outTradeNo: [
          { required: true, message: "请输入商家订单号", trigger: "blur" }
        ]

      }

    };
  },
  methods: {
    /*表单默认加载数据*/
    defaultFormData() {
      return {
        //交易编号
        tradeNo: "",
        //商家订单编号
        outTradeNo: "",
        //交易状态
        tradeStatus: "",
        //交易的订单金额
        totalAmount: 0,
        //可打折金额
        discountableAmount: 0,
        //标价币种
        tradeCurrency: "",
        //订单结算币种
        settleCurrency: 0,
        //结算币种订单金额
        settleAmount: 0,
        //订单支付币种
        payCurrency: null,
        //支付币种订单金额
        payAmount: 0,
        //结算币种兑换标价币种汇率
        settleTransRate: "",
        //标价币种兑换支付币种汇率
        transPayRate: null,
        //买家实付金额
        buyerPayAmount: "",
        //积分支付的金额
        pointAmount: "",
        //发票金额
        invoiceAmount: "",
        //本次交易打款给卖家的时间
        sendPayDate: null,
        //实收金额
        receiptAmount:0,
        //商户门店编号
        storeId:"",
        //商户机具终端编号
        terminalId:""

      };
    },
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
    loadSubject() {
      this.$store
        .dispatch("accountSubject/getTreeList", { filter: {} })
        .then(data => {
          this.subjectList = this.getTreeData(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*清除表单*/
    clearForm() {
      this.formData = this.defaultFormData();
    },
    selectedCategory(category) {
      //显示权限控制
      switch (category) {
         case 0:
          this.bankAccountShowAble = false;
          this.expireShowAble = false;
          this.pointRateShowAble = false;
          this.amountShowAble = false;
          break;
        default:
          this.bankAccountShowAble = false;
          this.expireShowAble = false;
          this.pointRateShowAble = false;
          this.amountShowAble = false;
          break;
      }
    },
    /*对提交的数据进行类型格式*/
    handleConfirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          //if (this.formData.tradeNo && !"" != this.formData.tradeNo)
          this.$emit("onSave", this.formData);
        }
      });
    },
    handleGetOne(id) {
      if (id) {
        this.$store
          .dispatch("trade/getOne", { tradeId: id })
          .then(data => {
            this.formData = data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.formData = this.defaultFormData();
      }
    },
    getTreeData(data) {
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    handleSubject(subject) {
      if (subject) {
        const code = subject[subject.length - 1];
        this.formData.subjectId = code;
        this.formData.subjectCode = code;
      }
    },
    initFormData() {
      this.clearForm();
    }
  },
  created() {
    this.clearForm();
    if (this.tradeId) {
      this.handleGetOne(this.tradeId);
    }
    if (this.pid) {
      this.formData.pid = this.pid;
    }
    //this.loadCurrency();
    //this.loadSubject();
  }
};
</script>
<style>
.el-cascader-menu {
  height: 300px;
}
</style>
