<template>
  <div class="bigBox">
    
    <el-card class="contentBox">
      <div slot="header">
        <span>第三方账户签约</span>
      </div>
      <div class="page-back">
      <el-button-group>
        <el-button icon="el-icon-back" type="warning" @click="goBack"
          >返回</el-button
        >
        <el-button icon="el-icon-plus" type="primary" :disabled="isDisable" @click="saveSign()"
          >保存</el-button
        >
      </el-button-group>
    </div>
      <el-form
        ref="signForm"
        :rules="signRules"
        :model="signData"
        label-width="130px"
        size="mini"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="签约银行:" prop="bank">
              <el-select  placeholder="请选择签约银行">
                <el-option label="ALIPAY   支付宝" value="ALIPAY   支付宝"></el-option>
                <el-option label="PNRPAY  汇付" value="ALIPAY   支付宝"></el-option>
                <el-option label="TENPAY 财付通余额代扣" value="ALIPAY   支付宝"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="签约账号:" prop="account">
              <el-input v-model="signData.securityCode" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
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
          bank: [{required: true, message: "请选择签约银行", trigger: "blur"}],
          account: [{required: true, message: "请输入签约账号", trigger: "blur"}]
        },
      };
    },
    methods: {
      loadSign(){
        this.$store
          .dispatch("woniuConfig/getSignList",{filter:{}})
          .then(data => {
            console.log(data)
          });
      },
      //跳转回列表页面
      goBack() {
        if (this.$router.history.length <= 1) {
          this.$router.push({path: "/home"});
          return false;
        } else {
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
