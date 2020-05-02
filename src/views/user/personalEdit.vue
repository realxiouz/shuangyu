<template>
  <div>
    <el-form ref="form" size="mini" :model="formData" label-width="110px">
      <input type="hidden" v-model="formData.userId" />
      <el-form-item label="昵称">
        <el-input placeholder="请输入您的昵称" v-model="formData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input placeholder="请输入您的姓名" v-model="formData.fullName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formData.gender" placeholder="请选择性别" style="width:100%">
          <el-option label="男" :value="0"></el-option>
          <el-option label="女" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.birthDate"
          style="width: 100%;"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalEdit",
  props: ["userId"],
  data() {
    return {
      formData: {},
      updateTempData: {},
      formRules: {}
    };
  },
  methods: {
    /*表单默认加载数据*/
    defaultFormData() {
      return {
        userId: "",
        nickName: "",
        fullName: "",
        gender: 0,
        birthDate: ""
      };
    },
    handleConfirm() {
      this.$emit("onSave", this.formData);
    },
    /*清除表单*/
    clearForm() {
      this.formData = this.defaultFormData();
      this.updateTempData = {};
    },
    clearRoles() {
      this.transData = [];
    },
    /*根据用户ID查询用户信息*/
    loadUser() {
      if ("" != this.userId) {
        this.$store
          .dispatch("user/getOne", { userId: this.userId })
          .then(data => {
            this.formData = data.data;
            Object.assign(this.updateTempData, data.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  created() {
    this.clearForm();
    this.loadUser();
  }
};
</script>
