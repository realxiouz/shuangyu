<template>
  <el-card shadow="always">
    <div class="el-form-title">
      <span>用户登录</span>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <el-form-item v-if="verificationShow" prop="account">
        <el-col :span="24">
          <el-input placeholder="请输入邮箱或手机号" v-model="loginForm.account" clearable>
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-else prop="username">
        <el-col :span="24">
          <el-input placeholder="请输入账号" v-model="loginForm.username" clearable>
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-if="verificationShow" prop="verification">
        <el-row :gutter="10">
          <el-col :span="18">
            <el-input
              @keyup.enter.native="handleLogin('ruleForm')"
              placeholder="请输入验证码"
              clearable
              v-model="loginForm.verification"
            >
              <i slot="prefix" class="el-input__icon el-icon-notebook-2"></i>
            </el-input>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <el-button
              style="width:100%;"
              @click="getVerificationCode(loginForm.account)"
              :disabled="showCount"
              type="primary"
              size="mini"
            >
              <span v-show="!showCount">获取验证码</span>
              <span v-show="showCount">{{countDown}} s 后获取</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-else prop="password">
        <el-col :span="24">
          <el-input
            @keyup.enter.native="handleLogin('ruleForm')"
            placeholder="请输入密码"
            clearable
            v-model="loginForm.password"
            show-password
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-col>
      </el-form-item>
      <span style="text-align:left;">
        <el-button v-if="verificationShow" @click="verificationLogin" type="text" size="mini">账号密码登陆</el-button>
        <el-button v-else @click="passwordLogin" type="text" size="mini">验证码登陆</el-button>
      </span>
    </el-form>
    <el-button
      style="width:100%;margin-top:15px;"
      type="primary"
      :loading="loading"
      @click="handleLogin('ruleForm')"
      round
      m
    >登录</el-button>
  </el-card>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validateCode = (rule, value, callback) => {
      var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!regEmail.test(value) && !regPhone.test(value)) {
        callback(new Error("请输入格式正确的邮箱或手机号！"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      verificationShow: false,
      showCount: false,
      countDown: "",
      timer: "",
      TIME_COUNT: 60,
      loginForm: {
        username: "",
        password: "",
        account: "",
        verification: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入您的账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "change" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "change"
          }
        ],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        account: [
          {
            required: true,
            message: "请输入你的邮箱或者手机号",
            trigger: "blur"
          },
          { validator: validateCode, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (!this.verificationShow) {
            let params = {};
            params.username = this.loginForm.username;
            params.password = this.loginForm.password;
            this.$store
              .dispatch("user/signIn", params)
              .then(res => {
                var flag = res.data.activate;
                if (!flag) {
                  this.$router.push({ name: "changePassword" });
                } else {
                  this.$router.push({ path: this.redirect || "/index" });
                }
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            let params = {};
            params.username = this.loginForm.account;
            params.password = this.loginForm.verification;
            this.$store
              .dispatch("user/signInCode", params)
              .then(res => {
                this.$router.push({ path: this.redirect || "/index" });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    passwordLogin() {
      this.verificationShow = !this.verificationShow;
    },
    verificationLogin() {
      this.verificationShow = !this.verificationShow;
    },
    getVerificationCode(account) {
      if (account) {
        this.$store
          .dispatch("user/getVerification", { target: account })
          .then(data => {
            this.timer = null;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$message({
          type: "warning",
          message: "请输入您的手机号或者邮箱！"
        });
        this.timer = true;
      }
      if (!this.timer) {
        this.countDown = this.TIME_COUNT;
        this.showCount = true;
        this.timer = setInterval(() => {
          if (this.countDown > 0 && this.countDown <= this.TIME_COUNT) {
            this.countDown--;
          } else {
            this.showCount = false;
            clearInterval(this.timer); // 清除定时器
            this.timer = null;
          }
        }, 1000);
      }
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
  height: 320px;
  width: 400px;
}

.el-form-title {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 30px;
  margin-top: 20px;
}
</style>
