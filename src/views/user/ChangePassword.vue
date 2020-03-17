<template>
  <el-card shadow="always">
    <div class="el-form-title">
      <span>首次登录请修改密码</span>
    </div>
    <el-form ref="userPwd" :model="userPwd" :rules="userRules">
      <el-form-item prop="newPwd" label="您的新密码：">
        <el-col :span="24">
          <el-input :type="inputType" v-model="userPwd.newPwd" placeholder="请输入您的新密码" show-password>
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item prop="againPwd" label="确认您的新密码">
        <el-col :span="24">
          <el-input
            :type="inputType"
            v-model="userPwd.againPwd"
            placeholder="请确认您的新密码"
            show-password
          >
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="loading" @click="goHome" round>去首页</el-button>
  </el-card>
</template>

<script>
export default {
  name: "changePassword",
  data() {
    return {
      inputType: "password",
      loading: false,
      userPwd: {
        newPwd: "",
        againPwd: ""
      },
      userRules: {
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "change" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "change"
          }
        ],
        againPwd: [
          { required: true, message: "请输入新密码", trigger: "change" },
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
    goHome() {
      this.$refs.userPwd.validate(valid => {
        if (valid) {
          if (this.userPwd.newPwd !== this.userPwd.againPwd) {
            this.$message({
              type: "error",
              message: "两次输入的密码不相同,请重新输入！"
            });
            return;
          }
          this.$router.push({ path: "index" });
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
