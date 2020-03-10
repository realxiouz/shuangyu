<template>
  <div>
    <el-form ref="form" :rules="formRules" :model="formData" label-width="110px">
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="formData.nickName"></el-input>
        <span>{{initUserId}}</span>
      </el-form-item>
      <el-form-item label="姓名" prop="fullName">
        <el-input v-model="formData.fullName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="formData.gender" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          type="text"
          placeholder="请输入手机号码"
          v-model="formData.phone"
          maxlength="11"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" prop="email"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idCardNo">
        <el-input
          type="text"
          placeholder="请输入身份证号码"
          v-model="formData.idCardNo"
          maxlength="18"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="是否超级管理员" prop="super">
        <el-switch v-model="formData.super" :active-value=true :inactive-value=false></el-switch>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch v-model="formData.enable" :active-value=true :inactive-value=false></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input type="textarea" v-model="formData.comment"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">重 置</el-button>
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
  function defaultData() {
    return {
      nickName: "",
      fullName: "",
      gender: "男",
      birthDate: "",
      phone: "",
      email: "",
      idCardNo: "",
      super: false,
      enable: true,
      headImgUrl: "",
      comment: ""
    };
  };
  export default {
    name: "userEdit",
    props: ["initUserId"],
    data() {
      return {
        formData: defaultData(),
        formRules: {
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
          // phone: [
          //   { required: true, message: '请输入手机号码', trigger: 'blur' }
          // ]
        }
      };
    },
    computed: {
      userId: function() {
        return this.initUserId;
      }
    },
    watch: {
      userId: function(newValue, oldValue) {
        console.log(newValue);
      }
    },
    methods: {
      resetForm() {
        this.formData = defaultData();
        console.log(defaultData());
      },
      loadForm() {
        console.log("loadForm");
      },
      handleSave() {
        const params = this.formData;
        this.$emit("onSave");
      }
    },
    mounted() {
      if (this.initUserId) {
        //load
      }
    }
  };
</script>

<style scoped>

</style>
