<template>
  <div class="contentBox">
    <el-main>
      <div @click="goBack" style="margin-bottom: 20px">
        <el-page-header></el-page-header>
      </div>
      <div style="height: 60px;line-height: 60px;font-size: 24px;border-bottom: 1px solid #ccc;margin-bottom: 20px">BSP账号配置</div>
      <el-row>
        <el-col :xs="24" :sm="15" :md="12" :lg="8" :xl="8">
          <el-form ref="configForm" :model="formData" :rules="rules" label-width="100px" size="mini">
            <el-form-item label="访问地址:" prop="loginUrl">
              <el-input v-model="formData.loginUrl" placeholder="请输入访问地址.."></el-input>
            </el-form-item>
            <el-form-item label="端口号:" prop="port">
              <el-input v-model="formData.port" placeholder="请输入访问端口号.."></el-input>
            </el-form-item>
            <el-form-item label="登录账号:" prop="username">
              <el-input v-model="formData.username" placeholder="请输入登录账号.."></el-input>
            </el-form-item>
            <el-form-item label="登录密码:" prop="password">
              <el-input v-model="formData.password" placeholder="请输入登录密码.."></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="15" :md="12" :lg="8" :xl="8">
          <el-button type="primary" @click="handleConfirm" size="mini" style="float: right">保 存</el-button>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                //是否是编辑状态
                update: false,
                formData: {},
                rules: {
                    loginUrl: [
                        {required: true, message: '请输入访问地址', trigger: 'blur'}
                    ],
                    port: [
                        {required: true, message: '请输入端口号', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            defaultFormData() {
                return {
                    //主键
                    configId: null,
                    //访问地址
                    loginUrl: null,
                    //端口号
                    port: null,
                    //账号
                    username: null,
                    //密码
                    password: null,
                    //工号
                    officeNo: null
                }
            },
            clearForm() {
                this.formData = this.defaultFormData();
            },
            handleConfirm() {
                this.$refs['configForm'].validate((valid) => {
                    if (valid) {
                        //判断添加还是更新
                        let url = '';
                        if (this.update) {
                            url = 'bspConfig/updateOne';
                        } else {
                            url = 'bspConfig/addOne';
                        }
                        //调用接口保存数据
                        this.$store
                            .dispatch(url, this.formData)
                            .then(() => {
                                this.goBack();
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        this.$message({type: "warning", message: "请完整填写数据！"});
                        return false;
                    }
                });
            },
            initFormData(merchantId){
                if (merchantId){
                    this.$store.dispatch('bspConfig/getOne', {merchantId:merchantId})
                        .then((data) => {
                            if (data && data.configId){
                                this.update = true;
                                this.formData = data;
                            } else {
                                this.update = false;
                                this.clearForm();
                                this.formData.firmId = merchantId;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            //跳转回列表页面
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: '/home'});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            }
        },
        created() {
            this.initFormData(this.$route.query.merchantId);
        }
    }
</script>
