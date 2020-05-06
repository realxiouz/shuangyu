<template>
  <div>
    <div class="goBack" @click="goBack">
      <el-page-header></el-page-header>
    </div>
    <div id="main">
      <div id="title">
        修改个人信息
        <el-divider></el-divider>
      </div>
      <div id="content">
        <el-form ref="form" size="mini" :rules="formRules" :model="formData" label-width="110px">
          <input type="hidden" v-model="formData.userId" />
          <el-form-item label="昵称:">
            <el-input placeholder="请输入您的昵称" v-model="formData.nickName"></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input placeholder="请输入您的姓名" v-model="formData.fullName"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-select v-model="formData.gender" placeholder="请选择性别" style="width:100%">
              <el-option label="男" :value="0"></el-option>
              <el-option label="女" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期:">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formData.birthDate"
              style="width: 100%;"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              placeholder="请输入您的邮箱"
              clearable
              v-model="formData.email"
              @blur="isUsedForEmail"
            ></el-input>
            <span v-if="isExistsForEmail" style="color: crimson">*该信息已被注册</span>
          </el-form-item>
          <el-form-item label="验证码" prop="verificationCode">
            <el-row type="flex" justify="space-between">
              <el-col :span="14">
                <el-input clearable placeholder="请输入验证码" v-model="verificationCode" />
              </el-col>
              <el-col :span="5">
                <el-button
                  size="mini"
                  style="text-align:center;"
                  :disabled="showCount"
                  @click="getVerificationCode(formData.email)"
                  type="primary"
                >
                  <span v-show="!showCount">获取验证码</span>
                  <span v-show="showCount">{{countDown}} s后获取</span>
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div style="margin-top: 25px;text-align: right;">
          <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalEdit",
  data() {
    var validateEmail = (rule, value, callback) => {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!reg.test(value)) {
        this.isEmail = false;
        callback(new Error("请输入正确的邮箱！"));
      } else {
        this.isEmail = true;
        callback();
      }
    };
    return {
      isExistsForEmail: false,
        verificationCode: '',
      formRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ]
      },
      updateTempData: {},
      showCount: false,
      isEmail: false,
      countDown: "",
      timer: "",
      TIME_COUNT: 60,
      formData: {}
    };
  },
  methods: {
    /*表单默认加载数据*/
    defaultFormData() {
      return {
        userId: "",
        nickName: "",
        fullName: "",
        email: "",
        gender: 0,
        birthDate: 0
      };
    },
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("user/updateMany", {
              filter: { userId: this.formData.userId },
              user: this.formData,
                verificationCode: this.verificationCode
            })
            .then(() => {
              this.goBack();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    /*清除表单*/
    clearForm() {
      this.formData = this.defaultFormData();
      this.updateTempData = {};
    },
    /*根据用户ID查询用户信息*/
    loadUser(userId) {
      this.$store
        .dispatch("user/getOne", { userId: userId })
        .then(data => {
          this.formData = data.data;
          Object.assign(this.updateTempData, data.data);
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
          this.isExistsForEmail = data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取邮箱验证码
    getVerificationCode(email) {
      if (this.isEmail) {
        if (!this.isExistsForEmail) {
          if (email) {
            this.$store
              .dispatch("user/getVerificationCode", { targetEmail: email })
              .then(data => {
                this.timer = null;
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            this.$message({
              type: "warning",
              message: "请输入您的邮箱！"
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
      } else {
        this.$message({
          type: "warning",
          message: "您输入的邮箱格式错误！"
        });
        return;
      }
    },
    //跳转回列表页面
    goBack() {
      if (this.$router.history.length <= 1) {
        this.$router.push({ path: "/home" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    initFormData(userId) {
      this.clearForm();
      this.loadUser(userId);
    }
  },
  created() {
    this.initFormData(this.$route.query.userId);
  }
};
</script>

<style scoped>
#main {
  padding: 60px;
  text-align: center;
}

#title {
  font-size: 24px;
  font-weight: bold;
}

#content {
  height: 400px;
  width: 40%;
  padding: 40px 40px 0 0;
  margin: 0 auto;
  min-width: 300px;
}

.goBack {
  padding: 20px;
}
</style>
