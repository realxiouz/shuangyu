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
      <el-form ref="form" size="mini" :model="formData" label-width="110px">
        <input type="hidden" v-model="formData.userId"/>
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
            return {
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
                    gender: 0,
                    birthDate: 0
                };
            },
            handleConfirm() {
                let _birthData = this.formData.birthDate;
                if (_birthData && "number" != typeof _birthData) {
                    this.formData.birthDate = _birthData.getTime();
                }

                this.$store
                    .dispatch("user/updateMany", {filter: {userId: this.formData.userId}, user: this.formData})
                    .then(() => {
                        this.goBack();
                    })
                    .catch(error => {
                        console.log(error);
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
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            //跳转回列表页面
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: '/home'});
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
  }

  #title {
    font-size: 24px;
    font-weight: bold;
  }

  #content {
    height: 400px;
    width: 40%;
    padding: 40px 40px 0 0;
  }

  .goBack {
    padding: 20px;
  }
</style>
