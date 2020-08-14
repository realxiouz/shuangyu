<template>
  <div class="contentBox">
    <el-main>
      <div class="page-back">
        <el-button-group>
          <el-button icon="el-icon-back" type="warning" @click="handleBack"
          >返回
          </el-button
          >
          <el-button icon="el-icon-plus" type="primary" @click="handleConfirm"
          >保存
          </el-button
          >
        </el-button-group>
      </div>
      <div style="height: 60px;line-height: 60px;font-size: 24px;border-bottom: 1px solid #ccc;margin-bottom: 20px">
        BSP账号配置
      </div>
      <el-row>
        <el-col :xs="24" :sm="15" :md="12" :lg="8" :xl="8">
          <el-form ref="configForm" :model="formData" :rules="rules" label-width="100px" size="mini">
            <el-form-item label="访问地址:" prop="loginUrl">
              <el-input v-model="formData.loginUrl" placeholder="请输入访问地址.."></el-input>
            </el-form-item>
            <el-form-item label="端口号:" prop="port">
              <el-input v-model="formData.port" placeholder="请输入访问端口号.."></el-input>
            </el-form-item>
            <el-form-item label="OFFICE:" prop="officeNo">
              <el-input v-model="formData.officeNo" placeholder="请输入OFFICE.."></el-input>
            </el-form-item>
            <el-form-item label="工作号:" prop="jobNumber">
              <el-input v-model="formData.jobNumber" placeholder="请输入工作号，多个用/分隔"></el-input>
            </el-form-item>
            <el-form-item label="登录账号:" prop="username">
              <el-input v-model="formData.username" placeholder="请输入登录账号.."></el-input>
            </el-form-item>
            <el-form-item label="登录密码:" prop="password">
              <el-input v-model="formData.password" show-password placeholder="请输入登录密码.."></el-input>
            </el-form-item>
            <el-form-item label="联系人:" prop="contactName">
              <el-input v-model="formData.contactName" placeholder="请输入联系人.."></el-input>
            </el-form-item>
            <el-form-item label="联系人电话:" prop="contactPhone">
              <el-input v-model="formData.contactPhone" placeholder="请输入联系人电话.."></el-input>
            </el-form-item>
          </el-form>
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
                    ],
                    contactName: [
                        {required: true, message: '请输入联系人', trigger: 'blur'}
                    ],
                    contactPhone: [
                        {required: true, message: '请输入联系人电话', trigger: 'blur'}
                    ],
                    officeNo: [
                        {required: true, message: '请输入OFFICE', trigger: 'blur'}
                    ],
                    jobNumber: [
                        {required: true, message: '请输入工作号，多个用/分隔', trigger: 'blur'}
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
            initFormData(merchantId, firmId) {
                if (merchantId && firmId) {
                    this.$store.dispatch('bspConfig/getOne', {merchantId: merchantId, firmId: firmId})
                        .then((data) => {
                            if (data && data.configId) {
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
            handleBack() {
                let lastName = localStorage.getItem("lastName");
                if (lastName) {
                    this.$router.push({name: lastName});
                    localStorage.removeItem("lastName");
                } else {
                    this.$router.go(-1);
                }
            },
        },
        created() {
            this.initFormData(localStorage.getItem("merchantId"), localStorage.getItem("firmId"));
        }
    }
</script>
