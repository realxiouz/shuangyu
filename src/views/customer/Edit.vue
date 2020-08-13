<template>
  <div class="page-form">
    <el-row>
      <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="10">
        <div class="contentBox">
          <div id="goBack" @click="goBack">
            <el-page-header></el-page-header>
          </div>
          <br>
          <p style="font-size: 30px; font-weight: bold">客户</p>
          <p style="font-size: 20px">基本信息</p>
          <hr width="40%" align="left">
          <el-form :rules="rules" :model="firmForm" ref="firmForm" label-position="left" label-width="20%" size="mini">
            <el-form-item label="客户类型" prop="firmType">
              <el-select v-model="firmForm.firmType" placeholder="请选择客户类型" @change="selectedCustomerType"
                         style="width: 50%">
                <el-option label="企业" :value="1"></el-option>
                <el-option label="个人" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户编码" prop="firmCode">
              <el-input type="text" placeholder="请输入客户代码" v-model="firmForm.firmCode"></el-input>
            </el-form-item>
            <el-form-item label="客户名称" prop="firmName">
              <el-input type="text" placeholder="请输入客户名称" v-model="firmForm.firmName"></el-input>
            </el-form-item>
            <el-form-item label="客户域名" prop="domain">
              <el-input type="text" placeholder="请输入客户域名" v-model="firmForm.domain"></el-input>
            </el-form-item>
            <el-form-item label="联系人员" prop="fullName">
              <el-input type="text" placeholder="请输入联系人员" v-model="firmForm.fullName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input type="text" v-model="firmForm.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="email">
              <el-input type="text" v-model="firmForm.email" placeholder="请输入联系邮箱"></el-input>
            </el-form-item>
            <el-form-item label="客户性别">
              <el-select v-model="firmForm.gender" placeholder="请选择客户性别" style="width: 50%">
                <el-option label="男" :value="0"></el-option>
                <el-option label="女" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker v-model="firmForm.birthDate" value-format="timestamp" type="date" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="客户地址">
              <el-input type="text" placeholder="请输入地址" v-model="firmForm.address"></el-input>
            </el-form-item>
            <el-form-item label="官网链接">
              <el-input type="text" placeholder="请输入官网" v-model="firmForm.officialUrl"></el-input>
            </el-form-item>
          </el-form>
          <br><br>
          <p style="font-size: 20px">管理信息</p>
          <hr width="40%" align="left">
          <el-form :rules="rules" :model="firmMerchantForm" ref="firmMerchantForm" label-position="left" label-width="20%" size="mini">
            <el-form-item label="标签">
            </el-form-item>
            <el-form-item label="重要性">
              <el-rate v-model="firmMerchantForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"/>
            </el-form-item>
            <el-form-item label="税率">
              <el-input type="text" v-model.number="firmMerchantForm.taxRate"></el-input>
            </el-form-item>
            <el-form-item label="税务登记号">
              <el-input type="text" v-model="firmMerchantForm.taxNo" placeholder="请输入税务登记号.."></el-input>
            </el-form-item>
            <el-form-item label="付款方式">
              <el-input type="text" v-model="firmMerchantForm.paymentType" placeholder="请输入付款方式.."></el-input>
            </el-form-item>
            <el-form-item label="资金账号:" prop="accountId">
              <el-cascader
                v-model="firmMerchantForm.accountId"
                style="width: 100%;"
                placeholder="请选择资金账号"
                :options="accountData"
                :props="{ label: 'accountName', value: 'accountId' }"
                filterable
                @change="changeAccount"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="银行账号" v-if="bankShow">
              <el-input type="text"  v-model="bankAccount" placeholder="请输入银行账号.." disabled></el-input>
            </el-form-item>
            <el-form-item label="财务联系人">
              <el-input type="text" v-model="firmMerchantForm.financeName" placeholder="请输入财务联系人.."></el-input>
            </el-form-item>
            <el-form-item label="联系人电话">
              <el-input type="text" v-model="firmMerchantForm.financePhone" placeholder="请输入联系人电话.."></el-input>
            </el-form-item>
            <el-form-item label="联系人电子邮箱">
              <el-input type="text" v-model="firmMerchantForm.financeEmail" placeholder="请输入联系人电子邮箱.."></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="firmMerchantForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="开放平台">
              <el-select v-model="firmMerchantForm.openId" placeholder="请选择平台" style="width: 50%"
                         @change="changeOpen">
                <el-option :value=null>&nbsp;- -</el-option>
                <el-option v-for="item in openData"
                           :key="item.openId"
                           :label="item.openName"
                           :value="item.openId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="24">
        <div id="tabs">
          <el-tabs type="border-card" ref="tabs">
            <el-tab-pane label="联系人">
              <other-contact :contacts="contacts"/>
            </el-tab-pane>
            <el-tab-pane label="账号配置">
              <account :accounts="accounts"/>
            </el-tab-pane>
            <el-tab-pane label="其他信息">其他信息</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="16">
        <div id="footer">
          <el-button type="primary" @click="addCustomerClick" size="mini">保 存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import otherContact from './Contact';
    import account from './Account';

    export default {
        data() {
          const codeValidator = (rule, value, callback) => {
            let reg = /^[0-9a-zA-Z_]*$/g;
            if (reg.test(value)) {
              callback();
            } else {
              callback(new Error("只能输入字母或数字！"));
            }
          };
          const validateMobile = (rule, value, callback) => {
            let mobile_mode = /^1[34578]\d{9}$/;
            if (!value) {
              callback(new Error("请输入手机号"));
            } else if (!mobile_mode.test(value)) {
              callback(new Error("您输入的手机号码格式不正确"));
            } else {
              callback();
            }
          };
          const validateEmail = (rule, value, callback) => {
            let email_mode = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (!value) {
              callback(new Error("请输入邮箱号"));
            } else if (!email_mode.test(value)) {
              callback(new Error("您输入的邮箱格式错误！"));
            } else {
              callback();
            }
          };
            return {
                firmForm: {},
                firmMerchantForm: {},
                openData: [],
                accountList:[],
                accountData:[],
                tagList: [],
                contacts: [],
                accounts: [],
                bankAccount: null,
                bankShow:false,
                update: false,
                open: {},
                rules: {
                  firmType: [
                    {required: true, message: "请选择客户类型", trigger: "change"},
                  ],
                  firmCode: [
                    {required: true, message: "请输入客户代码", trigger: "change"},
                    {
                      min: 1,
                      max: 20,
                      message: "长度在 1到 20 个字符"
                    },
                    {validator: codeValidator, trigger: 'blur'}
                  ],
                  firmName: [
                    {required: true, message: "请输入客户名称", trigger: "change"},
                    {
                      min: 1,
                      max: 20,
                      message: "长度在 1到 20 个字符"
                    }
                  ],
                  domain: [
                    {required: true, message: "请输入客户域名", trigger: "change"}
                  ],
                  fullName: [
                    {required: true, message: "请输入联系人员", trigger: "change"},
                    {
                      min: 1,
                      max: 20,
                      message: "长度在 1到 20 个字符"
                    }
                  ],
                  phone: [
                    {required: true, message: "请输入联系电话", trigger: "change"},
                    {
                      min: 1,
                      max: 20,
                      message: "长度在 1到 20 个字符"
                    },
                    {validator: validateMobile, trigger: 'blur'}
                  ],
                  email: [
                    {required: true, message: "请输入联系邮箱", trigger: "change"},
                    {
                      min: 1,
                      max: 20,
                      message: "长度在 1到 20 个字符"
                    },
                    {validator: validateEmail, trigger: 'blur'}
                  ],
                }
            };
        },
        methods: {
            defaultFirmFormData() {
                return {
                    //企业代码
                    firmCode: '',
                    //企业名称
                    firmName: '',
                    //域名
                    domain: '',
                    //开放平台
                    openId: null,
                    //联系人
                    fullName: '',
                    //联系电话
                    phone: '',
                    //电子邮箱
                    email: '',
                    //性别
                    gender: 0,
                    //出生日期
                    birthDate: 946656000000,
                    //地址
                    address: '',
                    //官网
                    officialUrl: '',
                    //类型（1：企业，2：个人）
                    firmType: 1,
                    //标签
                    tags: []
                };
            },
            defaultMerchantFormData() {
                return {
                    //类型（0：供应商，1：企业客户，2：个人客户）
                    merchantType: 1,
                    //类别编码
                    categoryCode: '',
                    //类别名称
                    categoryName: '',
                    //重要性
                    priority: 5,
                    //税率
                    taxRate: 0,
                    //税务登记号
                    taxNo: '',
                    //付款方式
                    paymentType: '',
                    //资金账号
                    accountId:'',
                    //财务联系人
                    financeName: '',
                    //联系人电话
                    financePhone: '',
                    //联系人电子邮箱
                    financeEmail: '',
                    //备注
                    remark:''
                };
            },
            //获取资金账号列表数据
            loadAccountList(){
              this.$store.dispatch("fundAccount/getList",{ filter: {} })
                  .then(data => {
                    this.accountList = data;
                  }).catch(error => {
                    console.log(error)
                })
            },
            //获取资金账号树形数据
            loadAccountTree(){
              this.$store.dispatch("fundAccount/getTreeList",{ filter: {} })
                  .then(data => {
                    this.accountData = this.getTreeData(data)
                  }).catch(error => {
                    console.log(error)
                })
            },
             getTreeData(data) {
                for (let i = 0; i < data.length; i++) {
                  if (data[i].children.length < 1) {
                    data[i].children = undefined;
                  } else {
                    this.getTreeData(data[i].children);
                  }
                }
                return data;
              },
            //加载平台信息
            loadOpen(merchantId) {
                this.$store.dispatch("firmOpenAuth/getCustomerList", {firmId: merchantId})
                    .then(data => {
                        if (data) {
                            this.openData = data;
                        } else {
                            this.openData = [];
                        }
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadContacts(merchantId) {
                this.$store.dispatch("firmContact/getList", {filter: {firmId: merchantId}})
                    .then(data => {
                        this.contacts = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadAccounts(merchantId) {
                this.$store.dispatch("firmAccount/getList", {filter: {firmId: merchantId}})
                    .then(data => {
                        this.accounts = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadOther(merchantId) {
                this.$store.dispatch("firmMerchant/getOne", {merchantId: merchantId})
                    .then(data => {
                        this.firmMerchantForm = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadCustomer(merchantId) {
                this.$store.dispatch("firm/getOne", {firmId: merchantId})
                    .then(data => {
                        this.firmForm = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            clearForm() {
                this.firmForm = this.defaultFirmFormData();
                this.firmMerchantForm = this.defaultMerchantFormData();
                this.openData = [];
            },
            selectedCustomerType(item) {
                this.firmMerchantForm.merchantType = item;
            },
            initFormData(merchantId) {
                this.clearForm();
                if(merchantId){
                  this.update = true;
                  this.loadCustomer(merchantId);
                  this.loadOther(merchantId);
                  this.loadAccounts(merchantId);
                  this.loadContacts(merchantId);
                  this.loadOpen(merchantId);
                }
            },
            changeAccount(accountIdList){
              let that = this;
              if (accountIdList) {
                let id = accountIdList[accountIdList.length - 1];
                that.accountList.forEach(function(obj){
                  if(id === obj.accountId){
                    that.firmMerchantForm.accountId = obj.accountId;
                    if(1 === obj.category){
                      that.bankShow = true
                    }else{
                      that.bankShow = false
                    }
                  }
                });
              }
            },
            changeOpen(openId) {
                for (let i = 0, len = this.openData.length; i < len; i++) {
                    if (openId === this.openData[i].openId) {
                        this.firmMerchantForm.openId = this.openData[i].openId;
                        this.firmMerchantForm.openCode = this.openData[i].openCode;
                        this.firmMerchantForm.openName = this.openData[i].openName;
                        this.firmForm.openId = this.openData[i].openId;
                        break;
                    }
                }
            },
            
            //点击保存
            addCustomerClick() {
              let isValid = true;
              this.$refs["firmForm"].validate((firmValid) => {
                if (!firmValid) {
                  isValid = false;
                  this.$refs["firmMerchantForm"].validate((merchantValid) => {
                    if (!merchantValid) {
                      isValid = false;
                    }
                  });
                }
              });
              if (isValid) {
                let accountList = [];
                this.openData.forEach(item => {
                  const _openId = this.firmForm.openId;
                  if (_openId && _openId == item.openId) {
                    this.open = item;
                  }
                });
                this.accounts.forEach(item => {
                  item.openId = this.open.openId;
                  item.openName = this.open.openName;
                  accountList.push(item);
                });
                if (this.firmForm.biethDate) {
                  this.firmForm.biethDate = this.firmForm.biethDate.getTime();
                }
                this.firmMerchantForm.firm = this.firmForm;
                this.firmMerchantForm.contacts = this.contacts;
                this.firmMerchantForm.accounts = accountList;
                if (this.update) {
                  this.$store
                    .dispatch('firmMerchant/updateOne', {
                      merchantId: this.firmMerchantForm.merchantId,
                      data: this.firmMerchantForm
                    })
                    .then(() => {
                      this.goBack();
                    })
                    .catch(error => {
                      console.log(error);
                    });
                } else {
                  this.$store
                    .dispatch('firmMerchant/addOne', this.firmMerchantForm)
                    .then(() => {
                      this.goBack();
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }
              }else{
                this.$message({
                  type: "warning",
                  message: "请检查必填项数据"
                });
              }
            },
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: '/home'});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            }
        },
        created() {
            let merchantId = null;
            if(localStorage.getItem("merchantId") && "undefined" !== localStorage.getItem("merchantId")){
              merchantId = localStorage.getItem("merchantId")
            }
            this.initFormData(merchantId);
            this.loadAccountList();
            this.loadAccountTree();
        },
        components: {
            otherContact,
            account
        }
    };
</script>

<style>
  #tabs {
    margin-top: 10px;
  }

  #tabs .el-tabs {
    border: none;
  }

  #goBack {
    padding-left: 10px;
    padding-top: 10px;
  }

  #footer {
    height: 60px;
    padding-top: 20px;
    overflow: hidden;
  }

  #footer button {
    float: right;
  }

  .title {
    font-size: 24px;
    margin: 10px 0 16px;
  }

  .title button {
    height: 80%;
    float: right;
  }

  .el-cascader-menu__list{
    margin: 0 0 20px 0;
    padding: 0;
  }

  .el-cascader__suggestion-list{
    margin: 0 0 16px 0;
    padding: 0;
  }

  .el-cascader-panel{
    height: 300px;
    overflow-y: scroll;
  }
</style>
