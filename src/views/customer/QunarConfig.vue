<template>
  <div class="bigBox">
    <div class="searchBox" id="goBack" @click="goBack">
      <el-page-header></el-page-header>
    </div>
    <el-card class="contentBox">
      <div slot="header">
        <span>去哪儿订单通知接口</span>
      </div>
      <el-form
        ref="notifyForm"
        :rules="notifyRules"
        :model="notifyData"
        label-width="130px"
        size="mini"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="域名:" prop="domain">
              <el-input v-model="notifyData.domain" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>代理商TTS域名,系统自动读取。</span>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="安全码:" prop="securityCode">
              <el-input v-model="notifyData.securityCode" @blur="disabledNotify"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>作为安全标识，我们会将安全码配置在系统中。</span>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="消息通知地址:" prop="url">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入消息通知地址"
                v-model="notifyData.url"
                @blur="disabledNotify"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>
              用于我们推送消息通知机制和您返回信息，详见《TTS消息通知机制说明文档》。
              此处可添加多个消息通知地址，以回车隔开
              必须以http://开头，并且每个URL最多输入200个字
              <br/>示例：
              <br/>http://api.abc.com/order
              <br/>http://123.123.123.1:9000
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="7">
            <el-form-item>
              <el-button @click="saveNotify()" type="primary" size="mini" :disabled="isDisable">保存</el-button>
              <!--              <el-button @click="removeNotify()" type="danger" size="mini">删除</el-button>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="contentBox">
      <div slot="header">
        <span>去哪儿订单接口账号</span>
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
        <el-row>
          <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="7">
            <el-form-item>
              <el-button
                @click="saveOrder()"
                type="primary"
                size="mini"
                :disabled="isOrderDisable"
              >保存
              </el-button>
              <!--              <el-button @click="removeOrder()" type="danger" size="mini">删除</el-button>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="contentBox">
      <div slot="header">
        <span>去哪儿政策导入接口</span>
      </div>
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="policyAdd">添加</el-button>
      </el-row>
      <el-table highlight-current-row :data="policyData" size="mini" style="width: 100%;">
        <el-table-column prop="user" label="用户名称" width="200" align="center"></el-table-column>
        <el-table-column prop="ip" label="IP地址" width="220" align="center"></el-table-column>
        <el-table-column prop="callbackUrl" label="回调地址" width="220" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column prop="airlineCode" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="policyEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click="policyRemove(scope.row,scope.$index,policyData)"
              type="danger"
              size="mini"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog center :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
        <policy-config-edit
          v-if="dialogVisible"
          :user="user"
          :merchant-id="merchantId"
          :domain="domain"
          @onCancel="handleCancel"
          @onSave="policySave"
        ></policy-config-edit>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
    import policyConfigEdit from "./components/qunarPolicyConfigEdit.vue";

    export default {
        name: "config",
        data() {
            return {
                notifyData: {},
                orderData: {},
                policyData: [],
                dialogVisible: false,
                merchantId: "",
                openId: "",
                user: "",
                isDisable: false,
                isOrderDisable: false,
                notifyRules: {
                    domain: [{required: true, message: "域名不能为空", trigger: "blur"}],
                    securityCode: [
                        {required: true, message: "请输入安全码", trigger: "blur"}
                    ],
                    url: [{required: true, message: "请输入url", trigger: "blur"}]
                },
                orderRules: {
                    domain: [{required: true, message: "域名不能为空", trigger: "blur"}],
                    user: [{required: true, message: "请输入用户名", trigger: "blur"}],
                    pass: [{required: true, message: "请输入密码", trigger: "blur"}],
                    ips: [{required: true, message: "请输入ip地址", trigger: "blur"}]
                }
            };
        },
        methods: {
            loadNotify(domain) {
                if (!domain) {
                    domain = this.notifyData.domain;
                }
                this.$store
                    .dispatch("qunarOrderNotifyConfig/getOne", {domain: domain})
                    .then(data => {
                        if (data && data.domain) {
                            this.notifyData = data;
                            this.isDisable = true;
                        } else {
                            this.notifyData.domain = this.domain;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
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
            loadPolicy(domain, firmId) {
                this.$store
                    .dispatch("qunarPolicyConfig/getList", {
                        filters: {domain: domain, merchantId: firmId}
                    })
                    .then(data => {
                        if (data) {
                            this.policyData = data;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            saveNotify() {
                this.$refs["notifyForm"].validate(valid => {
                    if (valid) {
                        this.$store
                            .dispatch("qunarOrderNotifyConfig/save", this.notifyData)
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
                });
            },
            disabledNotify() {
                this.isDisable = false;
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
            policyAdd() {

                this.dialogVisible = true;
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            policySave(params) {
                this.dialogVisible = false;
                if (params) {
                    params.openId = this.openId;
                    params.merchantDomain = this.domain;
                    params.merchantId = this.firmId;
                }
                this.$store
                    .dispatch("qunarPolicyConfig/save", params)
                    .then(data => {
                        if (data) {
                            this.loadPolicy(this.domain, this.firmId);
                            this.$message({
                                type: "success",
                                message: "保存成功！"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            policyEdit(row) {
                this.user = row.user;
                this.merchantId = row.merchantId;
                this.dialogVisible = true;
            },
            policyRemove(row, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store
                            .dispatch("qunarPolicyConfig/removeOne", {
                                configId: row.configId
                            })
                            .then(() => {
                                rows.splice(index, 1);
                            });
                    })
                    .catch(err => {
                        console.error(err);
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
            this.domain = localStorage.getItem("merchantDomain");
            this.openId = localStorage.getItem("openId");
            this.firmId = localStorage.getItem("merchantId");
            if (this.firmId) {
                this.notifyData.firmId = this.firmId;
                this.orderData.firmId = this.firmId;
            }
            if (this.openId) {
                this.notifyData.openId = this.openId;
                this.orderData.openId = this.openId;
            }
            if (this.domain) {
                this.loadNotify(this.domain);
                this.loadOrder(this.domain);
                this.loadPolicy(this.domain, this.firmId);
            }
        },
        components: {
            policyConfigEdit
        }
    };
</script>
<style>
  #goBack {
    padding-left: 10px;
    padding-top: 10px;
  }
</style>
