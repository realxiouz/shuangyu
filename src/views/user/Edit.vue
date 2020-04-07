<template>
  <div>
    <el-form ref="form" size="mini" :model="formData" label-width="110px" :rules="formRules">
      <input type="hidden" v-model="formData.userId" />
      <el-form-item label="昵称">
        <el-input v-model="formData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formData.fullName"></el-input>
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
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" @blur="isUsedForEmail"></el-input>
        <span v-if="isExistsForEmail" style="color: crimson">*该信息已被注册</span>
      </el-form-item>
      <el-form-item label="验证码" prop="emailCode">
        <el-row :gutter="20">
          <el-col style="padding-left:0;padding-right:0;" :span="20">
            <el-input placeholder="请输入邮箱验证码" v-model="formData.emailCode" />
          </el-col>
          <el-col :span="2">
            <el-button size="mini" type="primary">获取</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="角色:">
        <el-select
          style="width: 100%;"
          clearable
          multiple
          v-model="formData.roles"
          placeholder="请选择"
        >
          <el-option
            v-for="item in transData"
            :key="item.roleName"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否超级管理员">
        <el-switch v-model="formData.super" :active-value="true" :inactive-value="false"></el-switch>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="formData.enable" :active-value="true" :inactive-value="false"></el-switch>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formData.comment"></el-input>
      </el-form-item>
    </el-form>
    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
import selectRoles from "../../components/SelectRoles.vue";

export default {
  name: "userEdit",
  props: ["userId"],
  comments: { selectRoles },
  data() {
    var validateEmail = (rule, value, callback) => {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(value)) {
        callback(new Error("邮箱输入格式错误！"));
      } else {
        callback();
      }
    };

    return {
      formData: {},
      /*所有的可操作的角色信息*/
      transData: [],
      updateTempData: {},
      /*用于校验所填写的信息是否已经被使用*/
      isExistsForPhone: false,
      isExistsForEmail: false,
      formRules: {
        emailCode: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ]
      }
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
        birthDate: "",
        emailCode: "",
        email: "",
        super: false,
        enable: true
      };
    },
    handleConfirm() {
      if ("number" != typeof this.formData.birthDate) {
        this.formData.birthDate = this.formData.birthDate.getTime();
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("onSave", this.formData);
        }
      });
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
    },
    /*加载所有的角色信息*/
    loadRoles() {
      this.clearRoles();
      this.$store
        .dispatch("role/getAll", {})
        .then(data => {
          this.transData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*校验所填写的信息是否已经被使用*/
    isUsedForEmail() {
      if (
        !this.formData.email ||
        "" == this.formData.email ||
        this.formData.email === this.updateTempData.email
      ) {
        return;
      }
      this.$store
        .dispatch("user/isExist", {
          filed: this.formData.email
        })
        .then(data => {
          this.isExistsForEmail = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.clearForm();
    this.loadUser();
    this.loadRoles();
  }
};
</script>
