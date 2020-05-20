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
      <div style="width:400px;margin:0 auto;">
        <el-form ref="form" size="mini" :rules="formRules" :model="formData" label-width="110px">
          <input type="hidden" v-model="formData.userId"/>
          <el-row>
            <el-col :span="24">
              <el-form-item label="昵称:">
                <el-input placeholder="请输入您的昵称" v-model="formData.nickName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="姓名:">
                <el-input placeholder="请输入您的姓名" v-model="formData.fullName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="性别:">
                <el-select v-model="formData.gender" placeholder="请选择性别" style="width:100%">
                  <el-option label="男" :value="0"></el-option>
                  <el-option label="女" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="出生日期:">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formData.birthDate"
                  style="width: 100%;"
                  value-format="timestamp"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-row>
            <el-col :span="24">
              <el-form-item label="邮箱" prop="email">
                <el-input
                  placeholder="请输入您的邮箱"
                  clearable
                  v-model="formData.email"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item label="验证码" prop="verificationCode">
              <el-row :gutter="10">
                <el-col :span="15">
                  <el-input clearable placeholder="请输入验证码" v-model="formData.code"/>
                </el-col>
                <el-col :span="8">
                  <el-button
                    size="mini"
                    :disabled="showCount"
                    style="width:100%;"
                    @click="getVerifyCode()"
                    type="primary"
                  >
                    <span v-show="!showCount">获取验证码</span>
                    <span v-show="showCount">{{countDown}} s后获取</span>
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>-->
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
          callback(new Error("请输入正确的邮箱！"));
        } else {
          callback();
        }
      };
      return {
        formRules: {
          code: [
            {required: true, message: "请输入邮箱验证码", trigger: "blur"}
          ],
          email: [
            {required: true, message: "请输入邮箱", trigger: "blur"},
            {validator: validateEmail, trigger: "blur"}
          ]
        },
        showCount: false,
        countDown: "",
        timer: null,
        TIME_COUNT: 60,
        formData: {},
        initData: {}
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
          birthDate: 0
        };
      },
      handleConfirm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$store
              .dispatch("user/updateOne", {
                userId: this.formData.userId,
                data: this.formData
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
      },
      /*根据用户ID查询用户信息*/
      loadUser(userId) {
        this.$store
          .dispatch("user/getOne", {userId: userId})
          .then(data => {
            this.formData = data.data;
            Object.assign(this.initData, data.data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      //获取邮箱验证码
      async getVerifyCode() {
        if (!this.formData.email) {
          this.$message({
            message: '邮箱号不能为空',
            type: 'warning'
          });
          return;
        }
        if (this.formData.email === this.initData.email) {
          this.$message({
            message: '邮箱号没有变化',
            type: 'warning'
          });
          return;
        }
        let res = await this.$store.dispatch("user/isExist", {filed: this.formData.email});
        if (res.code === 0 && res.data === false) {
          if (!this.timer) {
            this.countDown = this.TIME_COUNT;
            this.showCount = true;
            this.timer = setInterval(() => {
              if (this.countDown > 0 && this.countDown <= this.TIME_COUNT) {
                this.countDown--;
              } else {
                this.clearTimer();
              }
            }, 1000);
          }
          this.$store
            .dispatch("user/getVerifyCode", {target: this.formData.email})
            .then(() => {
              this.clearTimer();
            })
            .catch(() => {
              this.clearTimer();
            });
        } else {
          this.$message({
            message: '邮箱号已被注册',
            type: 'warning'
          });
        }
      },
      clearTimer() {
        if (this.timer) {
          this.showCount = false;
          clearInterval(this.timer); // 清除定时器
          this.timer = null;
        }
      },
      //跳转回列表页面
      goBack() {
        if (this.$router.history.length <= 1) {
          this.$router.push({path: "/home"});
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

  .goBack {
    padding: 20px;
  }
</style>
