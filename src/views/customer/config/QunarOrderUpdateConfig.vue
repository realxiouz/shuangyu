<template>
  <div class="bigBox">
    <div class="searchBox" id="goBack" @click="goBack">
      <el-page-header></el-page-header>
    </div>
    <el-card class="contentBox">
      <div slot="header">
        <span>订单更新接口账号</span>
      </div>
      <el-form
        ref="orderForm"
        :rules="orderRules"
        :model="orderData"
        label-width="130px"
        size="mini"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="域名:" prop="merchantDomain">
              <el-input v-model="orderData.merchantDomain" disabled></el-input>
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
        <el-row>
          <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="7">
            <el-form-item>
              <el-button
                @click="saveOrder()"
                type="primary"
                size="mini"
                :disabled="isOrderUpdateDisable"
              >保存
              </el-button>
              <!--              <el-button @click="removeOrder()" type="danger" size="mini">删除</el-button>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

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
                isOrderUpdateDisable: false,
                orderRules: {
                    merchantDomain: [{required: true, message: "域名不能为空", trigger: "blur"}],
                    user: [{required: true, message: "请输入用户名", trigger: "blur"}],
                    pass: [{required: true, message: "请输入密码", trigger: "blur"}],
                }
            };
        },
        methods: {
            loadOrderUpdate(merchantDomain) {
                if (!merchantDomain) {
                    merchantDomain = this.orderData.merchantDomain;
                }
              this.orderData.merchantDomain = this.merchantDomain;
                this.$store.dispatch("qunarOrderUpdateConfig/getOne", {domain: merchantDomain})
                    .then(data => {
                        if (data && data.merchantDomain) {
                            this.orderData = data;
                            this.isOrderUpdateDisable = true;
                        } else {
                            this.orderData.merchantDomain = this.merchantDomain;
                        }
                        this.loading = false;
                    }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
            disabledOrder() {
                this.isOrderUpdateDisable = false;
            },
            saveOrder() {
                this.$refs["orderForm"].validate(valid => {
                    if (valid) {
                        this.$store
                            .dispatch("qunarOrderUpdateConfig/save", this.orderData)
                            .then(data => {
                                if (data) {
                                    this.isOrderUpdateDisable = true;
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
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: "/home"});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            }
        },
        created() {
/*          this.merchantDomain = this.$route.query.domain;
          this.openId = this.$route.query.openId;
          this.merchantId = this.$route.query.firmId;*/

          this.merchantDomain = localStorage.getItem("domain");
          this.openId = localStorage.getItem("openId");
          this.merchantId = localStorage.getItem("firmId");

          if (this.firmId) {
            this.orderData.merchantId = this.firmId;
          }
          if (this.openId) {
            this.orderData.openId = this.openId;
          }
          if (this.merchantDomain) {
            this.loadOrderUpdate(this.merchantDomain);
          }
        }
    };
</script>
<style>
  #goBack {
    padding-left: 10px;
    padding-top: 10px;
  }
</style>
