<template>
  <div>
    <el-form ref="form" :model="formData" label-width="110px">
      <input type="hidden" v-model="formData.userId"/>
      <el-form-item label="昵称">
        <el-input v-model="formData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formData.fullName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formData.gender" placeholder="请选择性别">
          <el-option label="男" :value=0></el-option>
          <el-option label="女" :value=1></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input
          placeholder="请输入手机号码"
          v-model="formData.phone"
          maxlength="11"
          show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input
          type="text"
          placeholder="请输入身份证号码"
          v-model="formData.idCardNo"
          maxlength="18"
          show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="是否超级管理员">
        <el-switch v-model="formData.super" :active-value=true :inactive-value=false></el-switch>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="formData.enable" :active-value=true :inactive-value=false></el-switch>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formData.comment"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary">下一步</el-button>
      <el-button type="primary" @click="$emit('onSave',formData)">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userEdit",
    props: ["userID"],
    data() {
      return {
        formData: {}
        /*formRules: {
          nickName: [
            { required: true, message: "请输入昵称", trigger: "blur" }
          ],
          fullName: [
            { required: true, message: "请输入姓名", trigger: "blur" }
          ],
          idCardNo: [
            { required: true, message: "请输入身份证号码", trigger: "blur" }
          ],
          phone: [
            { required: true, message: "请输入手机号码", trigger: "blur" }
          ]
        }*/
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
          birthDate: null,
          phone: "",
          email: "",
          idCardNo: "",
          super: false,
          enable: true
        };
      },
      /*清除表单*/
      clearForm() {
        this.formData = this.defaultFormData();
      },
      /*根据用户ID查询用户信息*/
      loadUser() {
        if ("" != this.userID) {
          this.$store
            .dispatch("user/getOne", {userId: this.userId})
            .then(data => {
              this.formData = data.data;
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
