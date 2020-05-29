<template>
  <div>
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
          <el-form :rules="rules" :model="firmForm" label-position="left" label-width="20%" size="mini">
            <el-form-item label="客户类型" prop="type">
              <el-select v-model="firmForm.firmType" placeholder="请选择客户类型" @change="selectedCustomerType"
                         style="width: 50%">
                <el-option label="企业" :value=1></el-option>
                <el-option label="个人" :value=2></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="firmName">
              <el-input type="text" placeholder="请输入客户名称" v-model="firmForm.firmName"></el-input>
            </el-form-item>
            <el-form-item label="编码" prop="firmCode">
              <el-input type="text" placeholder="请输入客户代码" v-model="firmForm.firmCode"></el-input>
            </el-form-item>
            <el-form-item label="域名" prop="domain">
              <el-input type="text" placeholder="请输入域名" v-model="firmForm.domain"></el-input>
            </el-form-item>
            <el-form-item label="主要联系人" prop="fullName">
              <el-input type="text" placeholder="请输入联系人" v-model="firmForm.fullName"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" prop="phone">
              <el-input type="text" v-model="firmForm.phone" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input type="text" v-model="firmForm.email" placeholder="请输入联系人电子邮箱"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="firmForm.gender" placeholder="请选择性别.." style="width: 50%">
                <el-option label="男" :value="0"></el-option>
                <el-option label="女" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker v-model="firmForm.birthDate" type="date" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input type="text" placeholder="请输入地址" v-model="firmForm.address"></el-input>
            </el-form-item>
            <el-form-item label="官网链接" prop="officialUrl">
              <el-input type="text" placeholder="请输入官网" v-model="firmForm.officialUrl"></el-input>
            </el-form-item>
          </el-form>
          <br><br>
          <p style="font-size: 20px">管理信息</p>
          <hr width="40%" align="left">
          <el-form :model="firmMerchantForm" label-position="left" label-width="20%" size="mini">
            <el-form-item label="标签">
            </el-form-item>
            <el-form-item label="重要性">
              <el-rate v-model="firmMerchantForm.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"/>
            </el-form-item>
            <el-form-item label="税率">
              <el-input type="text" v-model="firmMerchantForm.taxRate"></el-input>
            </el-form-item>
            <el-form-item label="税务登记号">
              <el-input type="text" v-model="firmMerchantForm.taxNo" placeholder="请输入税务登记号.."></el-input>
            </el-form-item>
            <el-form-item label="付款方式">
              <el-input type="text" v-model="firmMerchantForm.paymentType" placeholder="请输入付款方式.."></el-input>
            </el-form-item>
            <el-form-item label="资金账号类型" prop="accountType">
              <el-select v-model="firmForm.accountType" placeholder="请选择账号类型.." style="width: 50%">
                <el-option label="现金" :value="0"></el-option>
                <el-option label="银行存款" :value="1"></el-option>
                <el-option label="支付宝" :value="2"></el-option>
                <el-option label="微信支付" :value="3"></el-option>
                <el-option label="汇付" :value="4"></el-option>
                <el-option label="易宝" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资金账号">
              <el-input type="text" v-model="firmMerchantForm.bankAccount" placeholder="请输入资金账号.."></el-input>
            </el-form-item>
            <el-form-item label="账号名称">
              <el-input type="text" v-model="firmMerchantForm.bankName" placeholder="请输入账号名称.."></el-input>
            </el-form-item>
            <el-form-item label="收款人户名">
              <el-input type="text" v-model="firmMerchantForm.accountName" placeholder="请输入收款人户名.."></el-input>
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
              <el-select v-model="firmMerchantForm.openCode" placeholder="请选择平台" style="width: 50%"
                         @change="changeOpen">
                <el-option :value=null>&nbsp;- -</el-option>
                <el-option v-for="item in openData"
                           :key="item.openCode"
                           :label="item.openName"
                           :value="item.openCode">
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
          <el-button type="primary" @click="addSupplierClick" size="mini">保 存</el-button>
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
            return {
                firmForm: {},
                firmMerchantForm: {},
                openData: [],
                tagList: [],
                contacts: [],
                accounts: [],
                update: false,
                open: {},
                rules: {
                    firmName: [
                        {required: true, message: "请输入客户名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    firmCode: [
                        {required: true, message: "请输入客户代码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
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
                    //资金账号类型(0:现金，1:银行存款，2:支付宝，3：微信支付，4：汇付，5：易宝)
                    accountType: 0,
                    //银行账号
                    bankAccount: '',
                    //银行名称
                    bankName: '',
                    //收款人户名
                    accountName: '',
                    //财务联系人
                    financeName: '',
                    //联系人电话
                    financePhone: '',
                    //联系人电子邮箱
                    financeEmail: ''
                };
            },
            //加载平台信息
            loadOpen() {
                this.$store.dispatch("firmOpenAuth/getList", {filters: {}})
                    .then(data => {
                        this.openData = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadContacts(firmId) {
                this.$store.dispatch("firmContact/getList", {filter: {firmId: firmId}})
                    .then(data => {
                        this.contacts = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadAccounts(firmId) {
                this.$store.dispatch("firmAccount/getList", {filter: {firmId: firmId}})
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
                this.loadOpen();
                if (merchantId) {
                    this.update = true;
                    this.loadCustomer(merchantId);
                    this.loadOther(merchantId);
                    this.loadAccounts(merchantId);
                    this.loadContacts(merchantId);
                }
            },
            changeOpen(code) {
                for (let i = 0, len = this.openData.length; i < len; i++) {
                    if (code == this.openData[i].openCode) {
                        this.firmMerchantForm.openName = this.openData[i].openName;
                        this.firmMerchantForm.openId = this.openData[i].openId;
                        this.firmMerchantForm.openCode = this.openData[i].openCode;
                        this.firmForm.openId = this.openData[i].openId;
                        break;
                    }
                }
            },
            addSupplierClick() {
                //判断添加还是更新
                let url = '';
                if (this.update) {
                    url = 'firmMerchant/updateOne';
                } else {
                    url = 'firmMerchant/addOne';
                }
                //需要将联系人添加为员工数据，账号信息添加为Open账号信息
                let accountList = [];
                //需要补充Open账号中的数据
                this.openData.forEach(item => {
                    const _openId = this.firmForm.openId;
                    //_openId可能为空
                    if (_openId && _openId == item.openId) {
                        this.open = item;
                    }
                });
                this.accounts.forEach(item => {
                    item.openId = this.open.openId;
                    item.openName = this.open.openName;
                    accountList.push(item);
                });

                //firmForm中生日日期需装换成时间戳
                if (this.firmForm.biethDate) {
                    this.firmForm.biethDate = this.firmForm.biethDate.getTime();
                }

                //接口通过map接收数据
                this.$store
                    .dispatch(url, {
                        firm: this.firmForm,
                        firmMerchant: this.firmMerchantForm,
                        contacts: this.contacts,
                        accounts: accountList
                    })
                    .then(() => {
                        this.goBack();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            //跳转回列表页面
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
            this.initFormData(this.$route.query.merchantId);
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
</style>
