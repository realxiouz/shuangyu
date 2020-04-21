<template>
  <div>
    <div id="goBack" @click="goBack">
      <el-page-header></el-page-header>
    </div>
    <div id="head">
      <div id="title">
        <span>客户</span>
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
            <el-form :rules="rules" :model="formData" label-position="left" label-width="130px" size="mini">
              <el-form-item label="名称" prop="firmName">
                <el-input type="text" placeholder="请输入供应商名称" v-model="formData.firmName"></el-input>
              </el-form-item>
              <el-form-item label="编码" prop="firmCode">
                <el-input type="text" placeholder="请输入供应商代码" v-model="formData.firmCode"></el-input>
              </el-form-item>
              <el-form-item label="域名" prop="domain">
                <el-input type="text" placeholder="请输入域名" v-model="formData.domain"></el-input>
              </el-form-item>
              <el-form-item label="主要联系人" prop="fullName">
                <el-input type="text" placeholder="请输入联系人" v-model="formData.fullName"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话" prop="phone">
                <el-input type="text" v-model="formData.phone" placeholder="请输入联系人电话"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="email">
                <el-input type="text" v-model="formData.email" placeholder="请输入联系人电子邮箱"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input type="text" placeholder="请输入地址" v-model="formData.address"></el-input>
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
            <el-form :model="formData" label-position="left" label-width="110px" size="mini">
              <el-form-item label="Open平台">
                <el-select v-model="formData.openId" placeholder="请选择平台">
                  <el-option v-for="(item,idx) in openList"
                             :key="idx"
                             :label="item.openName"
                             :value="item.openId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="重要性">
                <el-rate v-model="formData.degree" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"/>
              </el-form-item>
              <el-form-item label="标签">
                <el-select style="width: 100%;" clearable multiple v-model="formData.tags" placeholder="请选择">
                  <el-option
                    v-for="(item,idx) in tagList"
                    :key="idx">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="formData.remark"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-main>
      </div>
    </div>
    <div id="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="联系人">
          <other-contact :contacts="contacts"/>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="其他信息">其他信息</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import otherContact from './Contact';

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
                formData: {},
                openList: [],
                tagList: [],
                contacts: [],
                update: false,
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
            defaultFormData() {
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
                    //类型（0：企业，1：供应商，2：客户）
                    type: 2,
                    //标签
                    tags: [],
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
            loadSupplier(firmId){
                this.$store.dispatch("firm/getOne", {firmId: firmId})
                    .then(data => {
                        this.formData = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            clearForm() {
                this.formData = this.defaultFormData();
                this.openList = [];
            },
            initFormData(firmId) {
                this.clearForm();
                this.loadOpen();
                if (firmId){
                    console.log(firmId);
                    this.loadSupplier(firmId);
                    this.update = true;
                }
            },
            addSupplierClick(){
                let url = '';
                if (this.update) {
                    url = 'firm/updateOne';
                } else {
                    url = 'firm/addOne';
                }
                this.$store
                    .dispatch(url, {firm: this.formData})
                    .then(data => {
                        console.log(data);
                        let staffList =[];
                        this.contacts.forEach(item => {
                            item.firmId = data;
                            item.depts = [];
                            item.depts.push(data);
                            staffList.push(item);
                        })
                        this.$store.dispatch("staff/addMany", staffList)
                            .then(() => {
                                this.goBack();
                            }).catch(error => {
                            console.log(error);
                        });
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
            otherContact
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
