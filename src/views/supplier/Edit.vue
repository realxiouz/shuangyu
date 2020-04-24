<template>
  <div>
    <div id="goBack" @click="goBack">
      <el-page-header></el-page-header>
    </div>
    <div id="head">
      <div id="title">
        <span>供应商</span>
        <span style="float: right; margin-right: 10%">
          <el-button type="primary" @click="addSupplierClick" size="mini" style="margin-right: -20px">保 存</el-button>
        </span>
      </div>
    </div>
    <div id="content">
      <div id="leftContent">
        <el-main>
          <div class="header">
            <span>基本信息</span>
          </div>
          <div class="form">
            <el-form :rules="rules" :model="firmForm" label-position="left" label-width="130px" size="mini">
              <el-form-item label="类型" prop="type">
                <el-select v-model="firmForm.type" placeholder="请选择平台">
                  <el-option label="企业" :value=1></el-option>
                  <el-option label="个人" :value=2></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名称" prop="firmName">
                <el-input type="text" placeholder="请输入供应商名称" v-model="firmForm.firmName"></el-input>
              </el-form-item>
              <el-form-item label="编码" prop="firmCode">
                <el-input type="text" placeholder="请输入供应商代码" v-model="firmForm.firmCode"></el-input>
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
              <el-form-item label="地址" prop="address">
                <el-input type="text" placeholder="请输入地址" v-model="firmForm.address"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-main>
      </div>
      <div id="rightContent">
        <el-main>
          <div class="header">
            <span>管理信息</span>
          </div>
          <div class="form">
            <el-form :model="firmOtherForm" label-position="left" label-width="110px" size="mini">
              <el-form-item label="标签">
                <el-select v-model="firmForm.tags" placeholder="请选择标签">
                </el-select>
              </el-form-item>
              <el-form-item label="重要性">
                <el-rate v-model="firmOtherForm.degree" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"/>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="firmOtherForm.remark"></el-input>
              </el-form-item>
              <el-form-item label="Open平台">
                <el-select v-model="firmForm.openId" placeholder="请选择平台" @change="selectedOpen">
                  <el-option :value=null>&nbsp;- -</el-option>
                  <el-option v-for="(item,idx) in openList"
                             :key="idx"
                             :label="item.openName"
                             :value="item.openId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-main>
      </div>
    </div>
    <div id="tabs">
      <el-tabs type="border-card" ref="tabs">
        <el-tab-pane label="联系人">
          <other-contact :contacts="contacts"/>
        </el-tab-pane>
        <el-tab-pane label="账号配置" :disabled="!firmForm.openId">
          <account :accounts="accounts" :alterAble="alterAble"/>
        </el-tab-pane>
        <el-tab-pane label="其他信息">其他信息</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import otherContact from './Contact';
    import account from './Account';

    export default {
        data() {
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
                firmOtherForm: {},
                openList: [],
                tagList: [],
                contacts: [],
                accounts: [],
                update: false,
                alterAble: false,
                open: {},
                activeTab: 'second',
                rules: {
                    firmName: [
                        {required: true, message: "请输入供应商名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    firmCode: [
                        {required: true, message: "请输入供应商代码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    domain: [
                        {required: true, message: "请输入域名", trigger: "blur"}
                    ],
                    fullName: [
                        {required: true, message: "请输入联系人", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    phone: [
                        {required: true, validator: validateMobile, trigger: "blur"}
                    ],
                    email: [
                        {required: true, validator: validateEmail, trigger: "blur"}
                    ]
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
                    //地址
                    address: '',
                    //类型（1：企业，2：个人）
                    type: 1,
                    //标签
                    tags: []
                };
            },
            defaultOtherFormData(){
                return {
                    //类型（0：供应商，1：企业客户，2：个人客户）
                    type: 0,
                    //类别编码
                    categoryCode: '',
                    //类别名称
                    categoryName: '',
                    //重要性
                    degree: 5
                };
            },
            //加载平台信息
            loadOpen() {
                this.$store.dispatch("open/getList", {filters: {}})
                    .then(data => {
                        this.openList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadContacts(firmId){
                this.$store.dispatch("staff/getListByFirmId", {firmId: firmId, filter: {}})
                    .then(data => {
                        this.contacts = data.data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadAccounts(firmId){
                this.$store.dispatch("openAccount/getList", {filter: {firmId: firmId}})
                    .then(data => {
                        this.accounts = data.data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadSupplier(otherId){
                this.$store.dispatch("firmOther/getOne", {otherId: otherId})
                    .then(data => {
                        this.firmOtherForm = data;
                        this.firmForm = data.firm;
                        this.loadAccounts(otherId);
                        this.loadContacts(otherId);
                    }).catch(error => {
                    console.log(error);
                });
            },
            selectedOpen(){
                if (!this.firmForm.openId){
                    this.alterAble = false;
                } else {
                    this.alterAble = true;
                }
            },
            clearForm() {
                this.firmForm = this.defaultFirmFormData();
                this.firmOtherForm = this.defaultOtherFormData();
                this.openList = [];
            },
            initFormData(firmId) {
                this.clearForm();
                this.loadOpen();
                if (firmId){
                    this.update = true;
                    this.alterAble = true;
                    this.loadSupplier(firmId);
                }
            },
            addSupplierClick(){
                //判断添加还是更新
                let url = '';
                if (this.update) {
                    url = 'firmOther/updateOne';
                } else {
                    url = 'firmOther/addOne';
                }
                //需要将联系人添加为员工数据，账号信息添加为Open账号信息
                let accountList =[];
                //只有选择了Open平台才能添加账号数据
                //否则调用接口时将传递空的账号列表
                if (this.firmForm.openId){
                    //需要补充Open账号中的数据
                    this.openList.forEach( item => {
                        const _openId = this.firmForm.openId;
                        //_openId可能为空
                        if (_openId && _openId == item.openId){
                            this.open = item;
                        }
                    })
                    this.accounts.forEach(item => {
                        item.openId = this.open.openId;
                        item.openName = this.open.openName;
                        accountList.push(item);
                    })
                }
                //接口通过map接收数据
                this.$store
                    .dispatch(url, {firm: this.firmForm, firmOther: this.firmOtherForm, contacts: this.contacts, accounts: accountList})
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
            this.initFormData(this.$route.query.firmId);
        },
        components: {
            otherContact,
            account
        }
    };
</script>

<style>
  #head {
    height: 80px;
  }

  #head #title {
    font-size: 24px;
    font-weight: bold;
    line-height: 80px;
    margin-left: 30px;
  }

  #content {
    overflow: hidden;
  }

  #leftContent {
    width: 45%;
    float: left;
    border-right: solid 2px #99a9bf;
  }

  #leftContent .el-main {
    padding-left: 30px;
  }

  .header {
    font-size: 20px;
    margin-bottom: 18px;
  }

  .form .el-form {
    width: 74%;
  }

  .form .el-form  .el-select {
    width: 100%;
  }

  #rightContent {
    width: 50%;
    display: inline-block;
  }

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
</style>
