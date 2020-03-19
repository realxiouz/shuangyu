<template>
  <el-card shadow="always">
    <div class="el-form-title">
      <span>首次登录请修改密码</span>
    </div>
    <el-form ref="form1" :model="formData" :rules="formRules">
      <el-form-item prop="newPwd" label="您的新密码：">
        <el-col :span="24">
          <el-input v-model="formData.newPassword" placeholder="请输入您的新密码" show-password>
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item prop="againPwd" label="确认您的新密码">
        <el-col :span="24">
          <el-input
            v-model="formData.confirmPassword"
            placeholder="请确认您的新密码"
            show-password
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="loading" @click="handleSave" round>确定</el-button>
  </el-card>
</template>

<script>
  export default {
    name: "changePassword",
    data() {
      var validatePassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.formData.newPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        formData: {
          newPassword: "",
          confirmPassword: ""
        },
        formRules: {
          newPassword: [
            { required: true, message: "请输入新密码", trigger: "change" },
            {
              min: 3,
              max: 18,
              message: "长度在 3 到 18 个字符",
              trigger: "change"
            }
          ],
          confirmPassword: [
            { required: true, message: "请输入确认密码", trigger: "change" },
            {
              min: 3,
              max: 18,
              message: "长度在 3 到 18 个字符",
              trigger: "change"
            },
            { validator: validatePassword, trigger: "blur" }
          ]
        }
      };
    },
    methods: {
      handleSave() {
        this.$refs.form1.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/activate", { newPassword: this.formData.newPassword })
              .then(res => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "修改成功！"
                });
                this.loading = false;
                this.$router.push({ name: "login" });
              })
              .catch(() => {
                this.loading = false;
              });
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-card {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -200px;
    height: 370px;
    width: 400px;
  }

  .el-form-title {
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
    font-weight: 700;
    font-size: 30px;
  }

  .el-button {
    width: 100%;
  }
</style>
