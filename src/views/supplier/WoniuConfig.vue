<template>
  <div class="bigBox">
    <div id="goBack" @click="goBack">
      <el-page-header></el-page-header>
    </div>
    <el-card class="contentBox">
      <div slot="header">
        <span>蜗牛配置管理</span>
      </div>
      <el-form ref="form" :rules="rules" :model="formData" label-width="130px" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="key:" prop="key">
              <el-input v-model="formData.key"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="token:" prop="token">
              <el-input v-model="formData.token"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="下单接口:" prop="placeOrderUrl">
              <el-input v-model="formData.placeOrderUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="签约接口:" prop="signUrl">
              <el-input v-model="formData.signUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="签约账号:" prop="signAccount">
              <el-input v-model="formData.signAccount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="支付方式:" prop="paymentMode">
              <el-input v-model="formData.paymentMode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="联系电话:" prop="contactMob">
              <el-input v-model="formData.contactMob"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="联系人:" prop="contact">
              <el-input v-model="formData.contact"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="排除域名:" prop="excludeDomain">
              <el-input v-model="formData.excludeDomain"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="蜗牛登录账号:" prop="userName">
              <el-input v-model="formData.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="蜗牛登录账号密码:" prop="password">
              <el-input v-model="formData.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item>
              <el-button
                @click="save()"
                type="primary"
                size="mini"
                :disabled="isDisable"
              >保存
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
    export default {
        name: "woniuConfig",
        data() {
            return {
                formData: {},
                domain: '',
                openId: '',
                isDisable: false,
                rules: {
                    key: [
                        {required: true, message: "请输入key", trigger: "blur"}
                    ],
                    token: [
                        {required: true, message: "请输入token", trigger: "blur"}
                    ],
                    placeOrderUrl: [
                        {required: true, message: "请输入下单接口", trigger: "blur"}
                    ],
                    signUrl: [
                        {required: true, message: "请输入签约接口", trigger: "blur"}
                    ],
                    signAccount: [
                        {required: true, message: "请输入签约账号", trigger: "blur"}
                    ],
                    paymentMode: [
                        {required: true, message: "请输入支付方式", trigger: "blur"}
                    ],
                    contactMob: [
                        {required: true, message: "请输入联系电话", trigger: "blur"}
                    ],
                    userName: [
                        {required: true, message: "请输入蜗牛登录账号", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入蜗牛登录密码", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            loadData(merchantId, firmId) {
                this.$store
                    .dispatch("woniuConfig/getOne", {merchantId: merchantId, firmId: firmId})
                    .then(data => {
                        if (data && data.firmId) {
                            this.formData = data;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store
                            .dispatch("woniuConfig/save", this.formData)
                            .then(data => {
                                if (data) {
                                    this.isDisable = true;
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
                })
            },
            removeNotify() {
                if (this.formData && this.formData.domain) {
                    this.$confirm("此操作将删除改记录, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            this.$store
                                .dispatch("woniuConfig/removeOne", {domain: this.formData.domain})
                                .then(() => {
                                    this.formData = {};
                                    this.$message({
                                        type: "success",
                                        message: "删除成功！"
                                    });
                                });
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
            },
            //跳转回列表页面
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: '/home'});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            },
            disabledSave() {
                this.isDisable = false;
            }
        },
        created() {
            this.merchantId = localStorage.getItem("merchantId");
            this.firmId = localStorage.getItem("firmId");
            this.openId = localStorage.getItem("openId");
            if (this.openId) {
                this.formData.openId = this.openId;
            }
            if (this.firmId && this.merchantId) {
                this.formData.firmId = this.firmId;
                this.formData.merchantId = this.merchantId;
                this.loadData(this.merchantId, this.firmId);
            }
        }
    }
</script>
