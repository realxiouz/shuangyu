<template>
  <div>
    <el-form ref="formData" :model="formData" label-width="100px" size="mini">
      <el-form-item label="客户:">
        <el-select v-model="formData.merchantId" placeholder="请选择客户.." style="width: 100%">
          <el-option
            v-for="item in merchantList"
            :key="item.merchantId"
            :label="item.merchantName"
            :value="item.merchantId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户域名" prop="merchantDomain">
        <el-input v-model="formData.merchantDomain"></el-input>
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
    <div slot="footer" class="dialog-footer" style="text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="$emit('onUpdate', formData)">确 定</el-button>
    </div>
  </div>
</template>
<script>
  function defaultData() {
    return {
      configId: '',
      merchantId: '',
      merchantDomain: '',
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
        merchantList: []
      };
    },
    methods: {
      handleSave() {
        this.$emit("onSave", this.formData);
      },
      handleGetOne(configId) {
        this.$store
          .dispatch("qunarPolicyConfig/getOne",{configId: configId})
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
      handleCancel() {
        this.paramDialogVisible = false;
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
