<template>
  <div class="bigBox">
      <div style="width:800px;height: 60px;line-height: 60px;font-size: 24px;border-bottom: 1px solid #ccc;margin-bottom: 20px">
        订单接口管理
      </div>
      
      <el-form
        ref="orderForm"
        :rules="orderRules"
        :model="orderData"
        label-width="70px"
        size="mini"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="域名:" prop="domain">
              <el-input v-model="orderData.domain" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>代理商TTS域名,系统自动读取。</span>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="用户名:" prop="user">
              <el-input v-model="orderData.user" @blur="disabledOrder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>代理商自己定义的非中文的用户名。</span>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="密码:" prop="pass">
              <el-input v-model="orderData.pass" show-password @blur="disabledOrder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>代理商自己定义的密码。</span>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="IP:" prop="ips">
              <el-input type="textarea" :rows="3" v-model="orderData.ips" @blur="disabledOrder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>代理商用于导出导入的服务器IP地址,多个IP时一行一个。</span>
          </el-col>
        </el-row>
        <div class="page-back">
      <el-button-group>
        <!-- <el-button icon="el-icon-back" type="warning" @click="goBack"
          >返回</el-button
        > -->
        <el-button icon="el-icon-plus" type="primary"  :disabled="isOrderDisable" @click="saveOrder()"
          >保存</el-button
        >
      </el-button-group>
    </div>
      </el-form>

  </div>
</template>
<script>

    export default {
        name: "config",
        data() {
            return {
                orderData: {},
                merchantId: "",
                openId: "",
                user: "",
                isOrderDisable: false,
                orderRules: {
                    domain: [{required: true, message: "域名不能为空", trigger: "blur"}],
                    user: [{required: true, message: "请输入用户名", trigger: "blur"}],
                    pass: [{required: true, message: "请输入密码", trigger: "blur"}],
                    ips: [{required: true, message: "请输入ip地址", trigger: "blur"}]
                }
            };
        },
        methods: {
            loadOrder(domain) {
                if (!domain) {
                    domain = this.orderData.domain;
                }
                this.$store.dispatch("qunarOrderConfig/getOne", {domain: domain})
                    .then(data => {
                        if (data && data.domain) {
                            this.orderData = data;
                            this.isOrderDisable = true;
                        } else {
                            this.orderData.domain = this.domain;
                        }
                        this.loading = false;
                    }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
            disabledOrder() {
                this.isOrderDisable = false;
            },
            saveOrder() {
                this.$refs["orderForm"].validate(valid => {
                    if (valid) {
                        this.$store
                            .dispatch("qunarOrderConfig/save", this.orderData)
                            .then(data => {
                                if (data) {
                                    this.isOrderDisable = true;
                                    this.$message({
                                        type: "success",
                                        message: "保存成功！"
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
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
            }
        },
        created() {
          this.domain = localStorage.getItem("merchantDomain");
          this.openId = localStorage.getItem("openId");
          this.firmId = localStorage.getItem("merchantId");
          if (this.firmId) {
            this.orderData.firmId = this.firmId;
          }
          if (this.openId) {
            this.orderData.openId = this.openId;
          }
          if (this.domain) {
            this.loadOrder(this.domain);
          }
        }
    };
</script>
<style>
 .page-back{
  margin-bottom: 10px;
}
</style>
