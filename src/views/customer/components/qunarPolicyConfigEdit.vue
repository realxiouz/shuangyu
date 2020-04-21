<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="代理商域名" prop="domain">
        <el-input v-model="formData.domain"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="user">
        <el-input v-model="formData.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="formData.pass"></el-input>
      </el-form-item>
      <el-form-item label="IP" prop="ip">
        <el-input v-model="formData.ip"></el-input>
      </el-form-item>
      <el-form-item label="回调地址" prop="callbackUrl">
        <el-input v-model="formData.callbackUrl"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {},
                rules: {
                    domain: [
                        {required: true, message: "域名不能为空", trigger: "blur"}
                    ],
                    user: [
                        {required: true, message: "请输入用户名", trigger: "blur"}
                    ],
                    pass: [
                        {required: true, message: "请输入密码", trigger: "blur"}
                    ],
                    ip: [
                        {required: true, message: "请输入ip", trigger: "blur"}
                    ],
                    callbackUrl: [
                        {required: true, message: "请输入回调地址", trigger: "blur"}
                    ],
                }
            };
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    domain: '',
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
            handleConfirm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$emit('onSave', this.formData);
                    }
                });
            },
            initFormData() {
                this.clearForm();
            },
            handleGetOne(domain) {
                if (domain) {
                    this.$store
                        .dispatch("api/getOne", {domain: domain})
                        .then(data => {
                            this.formData = data;
                            this.dialogVisible = true;
                        }).catch(error => {
                        console.log(error);
                    });
                } else {
                    this.formData = this.defaultFormData();
                }
            },
        },
        created() {
            if (this.domain) {
                this.handleGetOne(this.domain);
            }
        },
        props: {
            domain: String,
        }
    };
</script>
