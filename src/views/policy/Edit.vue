<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="90px">
      <el-form-item label="用户名" prop="user">
        <el-input v-model="formData.user"></el-input>
      </el-form-item>
      <el-form-item label="IP" prop="ip">
        <el-input v-model="formData.ip"></el-input>
      </el-form-item>
      <el-form-item label="回调地址" prop="callbackUrl">
        <el-input v-model.number="formData.callbackUrl"></el-input>
      </el-form-item>
      <el-form-item label="域名" prop="domain">
        <el-input v-model.number="formData.domain"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.number="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            user: '',
            ip: '',
            callbackUrl: '',
            remark: '',
            domain: ''
        }
    };
    export default {
        name: "policyEdit",
        data() {
            return {
                formData: defaultData(),
                rules: {
                    user: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                    ],
                    ip: [
                        {required: true, message: "请输入IP", trigger: "blur"},
                    ],
                    callbackUrl: [
                        {required: true, message: "请输入回调地址", trigger: "blur"},
                    ],
                    domain: [
                        {required: true, message: "请输入域名", trigger: "blur"},
                    ]
                }
            }
        },
        methods: {
            handleGetOne(user, domain) {
                this.$store
                    .dispatch("policy/getOne", {user: user, domain: domain})
                    .then(data => {
                        this.formData = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
        },
        created() {
            if (this.user && this.domain) {
                this.handleGetOne(this.user, this.domain);
            } else {
                this.formData = defaultData();
            }
        },
        props: {
            user: String,
            domain: String
        }
    }
</script>
