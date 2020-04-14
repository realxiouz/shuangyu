<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.accountId"/>
      <el-form-item label="平台:">
        <el-select v-model="formData.thirdId" placeholder="请选择平台.." style="width: 100%">
          <el-option
              v-for="item in thirdList"
              :key="item.thirdId"
              :label="item.thirdName"
              :value="item.thirdId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号:">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="formData.password" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="联系人:">
        <el-input v-model="formData.contactPerson"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input v-model="formData.contactPhone"></el-input>
      </el-form-item>
      <el-form-item label="登录地址:">
        <el-input v-model="formData.loginUrl"></el-input>
      </el-form-item>
      <el-form-item label="资金账号">
        <el-select v-model="formData.fundAccountId" placeholder="请选择资金账号.." style="width: 100%">
          <el-option
            v-for="item in fundAccountList"
            :key="item.fundAccountId"
            :label="item.fundAccount + '(' +item.platform + ')'"
            :value="item.fundAccountId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="token:">
        <el-input v-model="formData.token"></el-input>
      </el-form-item>
      <el-form-item label="secretKey:">
        <el-input v-model="formData.secretKey"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        props: ["curNode", "update"],
        data() {
            return {
                formData: {},
                thirdList: [],
                fundAccountList: []
            };
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    accountId: '',
                    thirdId: null,
                    fundAccountId: null,
                    username: '',
                    password: '',
                    loginUrl: '',
                    token: '',
                    secretKey: ''
                };
            },
            //加载平台信息
            loadThirdParty(){
                this.$store.dispatch("third/getList", { filters: {} })
                    .then(data => {
                        this.thirdList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            //加载资金账号信息
            loadFundAccount(){
                this.$store.dispatch("fundAccount/getList", { filter: {} })
                    .then(data => {
                        this.fundAccountList = data.data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
                this.thirdList = [];
                this.fundAccountList = [];
            },
            /*对提交的数据进行类型格式*/
            handleConfirm(){
                this.$emit('onSave',this.formData);
            },
            initFormData(){
                this.clearForm();
                this.loadThirdParty();
                this.loadFundAccount();
                if (this.update){
                    Object.assign(this.formData,this.curNode);
                }
            }
        },
        created() {
            this.loadThirdParty();
            this.loadFundAccount();
            this.initFormData();
        }
    };
</script>
