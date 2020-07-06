<template>
  <div>
    <el-form ref="userForm" size="mini" :model="formData" label-width="110px" :rules="formRules">
      <input type="hidden" v-model="formData.userId"/>
      <el-form-item label="昵称" prop="nickName">
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
      <el-form-item label="出生日期" prop="birthDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.birthDate"
          style="width: 100%;"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="!isEdit" label="邮箱" prop="email">
        <el-input placeholder="请输入您的邮箱" clearable v-model="formData.email"></el-input>
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
            v-for="item in roleData"
            :key="item.roleName"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formData.remark"></el-input>
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
    name: "userEdit",
    props: ["userId"],
    data() {
      var validateEmail = (rule, value, callback) => {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的邮箱！"));
        } else {
          this.$store
            .dispatch("user/isExist", {
              filed: this.formData.email
            })
            .then(data => {
              if (data) {
                callback("该信息已被注册");
              } else {
                callback();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      };

      return {
        formData: {},
        /*所有的可操作的角色信息*/
        roleData: [],
        /*用于校验所填写的信息是否已经被使用*/
        isExistsForPhone: false,
        isExistsForEmail: false,
        formRules: {
          nickName: {required: true, message: "请输入昵称", trigger: "blur"},
          email: [
            {required: true, message: "请输入邮箱", trigger: "blur"},
            {validator: validateEmail, trigger: "blur"}
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
          email: "",
          remark: ''
        };
      },
      handleConfirm() {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            this.$emit("onSave", {user: this.formData});
          }
        });
      },
      /*清除表单*/
      clearForm() {
        this.formData = this.defaultFormData();
      },
      clearRoles() {
        this.roleData = [];
      },
      /*根据用户ID查询用户信息*/
      loadUser() {
        if (this.userId != "") {
          this.$store
            .dispatch("user/getOne", {userId: this.$props.userId})
            .then(data => {
              this.formData = data;
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
          .dispatch("role/getList", {})
          .then(data => {
            this.roleData = data;
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
    },
    computed: {
      isEdit() {
        return this.userId != "";
      }
    }
  };
</script>
