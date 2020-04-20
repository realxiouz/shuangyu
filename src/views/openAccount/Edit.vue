<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.accountId"/>
      <el-form-item label="平台:">
        <el-select v-model="formData.openId" placeholder="请选择平台.." @change="handleThirdSelect" style="width: 100%">
          <el-option
              v-for="item in openList"
              :key="item.openId"
              :label="item.openName"
              :value="item.openId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="域名">
        <el-input v-model="formData.domain" disabled></el-input>
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
                openList: [],
            };
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    accountId: '',
                    openId: null,
                    fundAccountId: null,
                    username: '',
                    password: '',
                    loginUrl: '',
                    token: '',
                    secretKey: '',
                    domain: ''
                };
            },
            //加载平台信息
            loadOpenParty(){
                this.$store.dispatch("firm/getList", { filters: {pid: this.$store.state.loginInfo.firm.firmId} })
                    .then(data => {
                        this.openList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
                this.openList = [];
            },
            /*对提交的数据进行类型格式*/
            handleConfirm(){
                this.$emit('onSave',this.formData);
            },
            handleThirdSelect(openId){
                this.openList.forEach( item => {
                    if (openId === item.openId){
                        this.formData.domain = item.domain;
                    }
                })
            },
            initFormData(){
                this.clearForm();
                this.loadOpenParty();
                if (this.update){
                    Object.assign(this.formData,this.curNode);
                }
            }
        },
        created() {
            this.initFormData();
        }
    };
</script>
