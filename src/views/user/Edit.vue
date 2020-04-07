<template>
  <div>
   
    <el-form ref="form" size="mini" :model="formData" label-width="110px">
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
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" @blur="isUsedForEmail"></el-input>
        <span v-if="isExistsForEmail" style="color: crimson">*该信息已被注册</span>
      </el-form-item>
      <el-form-item label="邮箱验证码">
        <el-input type="email" placeholder="请输入邮箱验证码" v-model="formData.emailCode"/>
        <el-row style="text-align:right">
          <el-button size="mini" type="text">获取</el-button>
        </el-row>
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
    <div style="text-align: center">
      <el-transfer
        v-model="formData.roles"
        :data="transData"
        :props="transferProps"
        :titles="['未分配角色列表', '已分配角色列表']"
        style="margin-top: 20px;text-align: left; display: inline-block"
      ></el-transfer>
    </div>
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
    return {
      formData: {},
      /*所有的可操作的角色信息*/
      transData: [],
      updateTempData: {},
      /*用于校验所填写的信息是否已经被使用*/
      isExistsForPhone: false,
      isExistsForEmail: false,
      transferProps: {
        key: "roleId",
        label: "roleName"
      }
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
        birthDate: "",
        phone: "",
        email: "",
        super: false,
        enable: true
      };
    },
    handleConfirm() {
      if ("number" != typeof this.formData.birthDate) {
        this.formData.birthDate = this.formData.birthDate.getTime();
      }
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
    isUsedForPhone() {
      if (
        !this.formData.phone ||
        "" == this.formData.phone ||
        this.formData.phone === this.updateTempData.phone
      ) {
        return;
      }
      this.$store
        .dispatch("user/isExist", {
          filed: this.formData.phone
        })
        .then(data => {
          this.isExistsForPhone = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
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
