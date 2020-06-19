<template>
  <div>
    <el-dialog title="添加" :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-row type="flex" justify="space-between">
        <el-col :span="24">
          <el-form label-position="top" size="mini" :rules="formRules" :model="formData" ref="featureForm">
            <input type="hidden" v-model="formData.tradeId"/>
            <el-form-item label="交易编号:" prop="tradeNo">
              <el-input v-model="formData.tradeNo" placeholder="交易编号.."></el-input>
            </el-form-item>
            <el-form-item label="商家订单号:" prop="outTradeNo">
              <el-input v-model="formData.outTradeNo" placeholder="商家订单号.."></el-input>
            </el-form-item>
            <el-form-item label="交易状态:">
              <el-input v-model="formData.tradeStatus" placeholder="交易状态.."></el-input>
            </el-form-item>
            <el-form-item label="交易订单金额:">
              <el-input v-model="formData.totalAmount" placeholder="交易订单金额.."></el-input>
            </el-form-item>
            <el-form-item label="可打折金额:">
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
              <el-date-picker v-model="formData.sendPayDate" style="width:100%" type="date"
                              placeholder="选择日期"></el-date-picker>
              <!--<span style="color: #ff8aac;">有效期至选择日期零点(00:00:00)</span>-->
            </el-form-item>
            <el-form-item label="实收金额:">
              <el-input v-model="formData.receiptAmount" placeholder="请输入实收金额.."></el-input>
            </el-form-item>
            <el-form-item label="商户门店编号:">
              <el-input v-model="formData.storeId" placeholder="请输入商户门店编号.."></el-input>
            </el-form-item>
            <el-form-item label="商户机具终端编号:">
              <el-input v-model="formData.terminalId" placeholder="请输入商户机具终端编号.."></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
    </span>
    </el-dialog>
   <!-- <param-dialog :visible.sync="paramDialogVisible" :index="paramIndex" :param-type="paramType" :param-data="paramData"
                  @action-param="handleActionParam"/>-->
  </div>
</template>

<script>
  //import paramDialog from "./Param";
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      tradeId: {
        type: String,
        default: ''
      },
      curNode:{
      },
      update:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: this.visible,
        paramDialogVisible: false,
        paramIndex: -1,
        paramType: 0,
        paramData: {},
        formData: this.defaultFormData(),
        formRules: {
          tradeNo: [
            {required: true, message: "请输入交易编号", trigger: "blur"}
          ],
          outTradeNo: [
            {required: true, message: "请输入商家订单号", trigger: "blur"}
          ]
        }
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        //console.error("this.update"+this.update)
       /* if (!this._.isEmpty(this.tradeId)) {
          this.loadData();
        }*/
        //console.error("this.update"+this.update)
        if (this.update) {
          Object.assign(this.formData, this.curNode);
        }else{
          this.formData = this.defaultFormData()
        }
      }
    },
    methods: {
      handleActionParam(param) {
        if (param) {
          if (param.type === 0) {
            if (param.index > -1) {
              this.formData.inputParams.splice(param.index, 1, param.data);
            } else {
              this.formData.inputParams.push(param.data);
            }
          }
          if (param.type === 1) {
            if (param.index > -1) {
              this.formData.outputParams.splice(param.index, 1, param.data);
            } else {
              this.formData.outputParams.push(param.data);
            }
          }
        }
      },

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
          receiptAmount: 0,
          //商户门店编号
          storeId: "",
          //商户机具终端编号
          terminalId: ""
        };
      },
      selectedCategory(category) {
        //显示权限控制
        switch (category) {
          case 0:
            this.bankAccountShowAble = false;
            break;
          default:
            this.bankAccountShowAble = false;
            break;
        }
      },
      loadData() {
        this.getList();
        this.getTotal();
      },
      handleOpen() {
        this.$emit('update:visible', true);
      },
      handleClose() {
        this.$emit('update:visible', false);
      },
      handleSave() {
        this.$store
          .dispatch("trade/saveOne", this.formData)
          .then(id => {
            if (!this._.isEmpty(id)) {
              this.formData.tradeId = id;
            }
            this.dialogVisible = false;
            this.$emit('refresh');
            this.$message({type: "success", message: "保存成功"});
          });
      }
    },
    components: {
      //paramDialog
    }

  };
</script>

<style>
  .el-dialog {
    width: 500px;
    min-width: 500px;
  }
</style>
