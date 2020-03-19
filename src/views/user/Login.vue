<template>
  <el-card shadow="always">
    <div class="el-form-title"><span>用户登录</span></div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <el-form-item prop="username">
        <el-col :span="24">
          <el-input
            placeholder="请输入账号"
            v-model="loginForm.username"
          >
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item prop="password">
        <el-col :span="24">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      :loading="loading"
      @click="handleLogin('ruleForm')"
      round
      m
    >登录
    </el-button>
  </el-card>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loading: false,
        loginForm: {
          username: "",
          password: ""
        },
        loginRules: {
          username: [{ required: true, message: "请输入您的账号", trigger: "blur" }],
          password: [
            { required: true, message: "请输入您的密码", trigger: "change" },
            {
              min: 3,
              max: 18,
              message: "长度在 3 到 18 个字符",
              trigger: "change"
            }
          ]
        }
      };
    },
    methods: {

      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/signIn", this.loginForm)
              .then(res => {
                var flag = res.data.activateFlag;
                if (!flag) {
                  this.$router.push({ name: "changePassword" });
                } else {
                  this.$router.push({ path: this.redirect || '/index' });
                }
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            console.log("error submit!!");
            return false;
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
    height: 300px;
    width: 400px;
  }

  .el-form-title {
    text-align: center;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 30px;
    margin-top: 20px;
  }

  .el-button {
    width: 100%;
  }
</style>
