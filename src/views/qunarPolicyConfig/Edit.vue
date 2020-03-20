<template>
  <div>
    <el-form :model="formData" label-width="110px">
      <el-form-item label="代理商域名">
        <el-input v-model="formData.domain"></el-input>
      </el-form-item>
      <el-form-item label="企业">
        <el-input v-model="formData.firmId"></el-input>
      </el-form-item>
      <el-form-item label="登录地址">
        <el-input v-model="formData.thirdId"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="formData.user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.pass"></el-input>
      </el-form-item>
      <el-form-item label="IP">
        <el-input v-model="formData.ip"></el-input>
      </el-form-item>
      <el-form-item label="回调地址">
        <el-input v-model="formData.callbackUrl"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark"></el-input>
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
                    domain: '',
                    firmId: '',
                    thirdId: '',
                    user: '',
                    pass: '',
                    ip: '',
                    callbackUrl: '',
                    remark: ''
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
