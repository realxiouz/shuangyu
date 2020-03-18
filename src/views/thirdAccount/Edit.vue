<template>
  <div>
    <el-form :model="formData" label-width="110px">
      <el-form-item label="账号">
        <el-input v-model="formData.accoutId"></el-input>
      </el-form-item>
      <el-form-item label="登录地址">
        <el-input v-model="formData.loginUrl"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="formData.contactPerson"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formData.contactPhone"></el-input>
      </el-form-item>
      <el-form-item label="token">
        <el-input v-model="formData.token"></el-input>
      </el-form-item>
      <el-form-item label="secretKey">
        <el-input v-model="formData.secretKey"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        props: ["curNode", "update"],
        data() {
            return {
                formData: {}
            };
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    accoutId: '',
                    loginUrl: '',
                    contactPerson: '',
                    contactPhone: '',
                    token: '',
                    secretKey: ''
                };
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
            /*对提交的数据进行类型格式*/
            handleConfirm(){
                this.$emit('onSave',this.formData);
            },
            initFormData(){
                this.clearForm();
                if (this.update){
                    this.formData = this.curNode;
                }
            }
        },
        created() {
            this.initFormData();
        }
    };
</script>
