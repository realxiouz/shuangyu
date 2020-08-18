<template>
  <div class="bigBox">
     <div style="width:550px;height: 60px;line-height: 60px;font-size: 24px;border-bottom: 1px solid #ccc;margin-bottom: 20px">
        第三方账户签约
      </div>
      
      <el-form
        ref="signForm"
        :rules="signRules"
        :model="signData"
        label-width="90px"
        size="mini"
      >
        <el-row >
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item  label="签约银行:" prop="bankCode">
              <el-select v-model="signData.bankCode"  placeholder="请选择签约银行">
                <el-option label="ALIPAY_SN   支付宝" :value="1"></el-option>
                <el-option label="PNRPAY_SN  汇付" :value="2"></el-option>
                <el-option label="TENPAY_SN 财付通余额代扣" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="6">
            <el-form-item label="签约账号:" prop="signedAccount">
              <el-input v-model="signData.signedAccount" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="page-back">
      <el-button-group>
        <!-- <el-button icon="el-icon-back" type="warning" @click="goBack"
          >返回</el-button
        > -->
        <el-button icon="el-icon-plus" type="primary" :disabled="isDisable" @click="saveSign()"
          >保存</el-button
        >
      </el-button-group>
    </div>
  </div>
</template>
<script>
  export default {
    name: "signAccount",
    data() {
      return {
        signData: {},
        dialogVisible: false,
        isDisable: false,
        signRules: {
          bankCode: [{required: true, message: "请选择签约银行", trigger: "blur"}],
          signedAccount: [{required: true, message: "请输入签约账号", trigger: "blur"}]
        },
      };
    },
    methods: {
      loadSign(bankCode,signedAccount){
        this.$store
          .dispatch("woniuConfig/getSignList",{bankCode:this.signData.bankCode,signedAccount:this.signData.signedAccount})
          .then(data => {
            console.log(data)
          });
      },
      //跳转回列表页面
      goBack() {
        let lastName = localStorage.getItem("lastName");
        if(lastName){
          this.$router.push({name: lastName});
          localStorage.removeItem("lastName");
        }else{
          this.$router.go(-1);
        }
      },
      saveSign(){

      }
    },
    created(){
      this.loadSign()
    }
    
  };
</script>
<style>
.page-back{
  margin-bottom: 10px;
}
</style>
