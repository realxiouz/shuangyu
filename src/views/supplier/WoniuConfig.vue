<template>
  <div class="bigBox">
    <div id="goBack" @click="goBack">
      <el-page-header></el-page-header>
    </div>
    <el-card class="contentBox">
      <div slot="header">
        <span>蜗牛配置管理</span>
      </div>
      <el-form ref="form" :rules="rules" :model="formData" label-width="130px" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="key:" prop="key">
              <el-input v-model="formData.key" @blur="disabledSave"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="token:" prop="token">
              <el-input v-model="formData.token" @blur="disabledSave"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item>
              <el-button
                @click="save()"
                type="primary"
                size="mini"
                :disabled="isDisable"
              >保存
              </el-button>
              <!--              <el-button-->
              <!--                @click="remove()"-->
              <!--                type="danger"-->
              <!--                size="mini"-->
              <!--              >删除-->
              <!--              </el-button>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
    export default {
        name: "woniuConfig",
        data() {
            return {
                formData: {},
                domain: '',
                openId: '',
                isDisable: false,
                rules: {
                    key: [
                        {required: true, message: "请输入key", trigger: "blur"}
                    ],
                    token: [
                        {required: true, message: "请输入token", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            loadData(firmId) {
                if (!firmId) {
                    firmId = this.formData.firmId;
                }
                this.$store
                    .dispatch("woniuConfig/getOne", {firmId: firmId})
                    .then(data => {
                        if (data && data.firmId) {
                            this.formData = data;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store
                            .dispatch("woniuConfig/save", this.formData)
                            .then(data => {
                                if (data) {
                                    this.isDisable = true;
                                    this.$message({
                                        type: "success",
                                        message: "保存成功！"
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                })
            },
            removeNotify() {
                if (this.formData && this.formData.domain) {
                    this.$confirm("此操作将删除改记录, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            this.$store
                                .dispatch("woniuConfig/removeOne", {domain: this.formData.domain})
                                .then(() => {
                                    this.formData = {};
                                    this.$message({
                                        type: "success",
                                        message: "删除成功！"
                                    });
                                });
                        })
                        .catch(err => {
                            console.error(err);
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
            },
            disabledSave() {
                this.isDisable = false;
            }
        },
        created() {
            this.firmId = this.$route.query.firmId;
            this.openId = this.$route.query.openId;
            if (this.openId) {
                this.formData.openId = this.openId;
            }
            if (this.firmId) {
                this.formData.firmId = this.firmId;
                this.loadData(this.firmId);
            }
        }
    }
</script>
