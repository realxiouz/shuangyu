<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="100px" size="mini">
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
    <div slot="footer" class="dialog-footer" style="text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
  function defaultData() {
    return {
      configId: '',
      merchantId: '',
      merchantDomain: '',
      schedulerId: '',
      user: '',
      pass: '',
      ip: '',
      callbackUrl: '',
      remark: ''
    };
  }

  export default {
    name: "configEdit",
    props: ["configId"],
    data() {
      return {
        formData: defaultData(),
        merchantList: [],
        schedulerList: [],
        rules: {
          schedulerId: [
            {required: true, message: '请选择调度任务', trigger: 'blur'}
          ],
          user: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          ip: [
            {required: true, message: '请输入IP', trigger: 'blur'}
          ],
          callbackUrl: [
            {required: true, message: '请输入回调地址', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$emit("onSave", this.formData);
          }
        });
      },
      handleGetOne(configId) {
        this.$store
          .dispatch("qunarPolicyConfig/getOne", configId)
          .then(data => {
            this.formData = data;
            this.dialogVisible = true;
          })
          .catch(error => {
            console.log(error);
          });
      },
      clearForm() {
        this.paramFormData = this.defaultParamForm();
      },
      addParams() {
        this.paramDialogVisible = true;
      },
      handleConfirm() {

      },
      handleClose(idx) {
        this.paramList.splice(idx, 1);
      }
    },
    created() {
      if (this.configId) {
        this.handleGetOne(this.configId);
      }
    }
  };
</script>
