<template>
  <div class="page-form">
    <el-dialog title="政策配置管理" width="24%" center :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="用户名称:" prop="userName">
          <el-input v-model="formData.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户密码:" prop="password">
          <el-input v-model="formData.password" placeholder="请输入用户密码" type="password" />
        </el-form-item>
        <el-form-item label="IP地址:" prop="ipUrl">
          <el-input v-model="formData.ipUrl" placeholder="请输入IP地址" />
        </el-form-item>
        <el-form-item label="回调地址:" prop="callbackUrl">
          <el-input v-model="formData.callbackUrl" placeholder="请输入回调地址" />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="formData.remark" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      editConfigId: {
        type: String,
        default: null
      },
      openId: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        dialogVisible: false,
        formData: this.defaultFormData(),
        merchant: null,
        rules: {
          userName: [
            {required: true, message: "请输入用户名称"},
            {
              min: 1,
              max: 20,
              message: "长度 1 到 20 个字符"
            },
          ],
          password: [
            {required: true, message: "请输入用户密码"},
            {
              min: 1,
              max: 20,
              message: "长度 1 到 20 个字符"
            },
          ],
          ipUrl: [
            {required: true, message: "请输入IP地址"}
          ],
          callbackUrl: [
            {required: true, message: "请输入回调地址"}
          ]
        }
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (val) {
          if (this._.isEmpty(this.editConfigId)) {
            this.formData = this.defaultFormData();
          } else {
            this.loadData();
          }
          if(this.openId ){
            this.loadMerchant();
          }
        }
      }
    },
    methods: {
      handleOpen() {
        this.$emit('update:visible', true);
      },
      handleClose() {
        this.$emit('update:visible', false);
      },
      handleSwitch(){
        this.defaultFlag = !this.defaultFlag;
      },
      handleSave() {
        this.$refs["form"].validate(valid => {
          if(!this.openId){
            this.$message({type: "warning", message: "开放平台主键丢失"});
            return;
          }
          if(this.merchant){
            this.formData.merchantId = this.merchant.merchantId;
          }
          if (valid) {
            this.$store
              .dispatch("qunarPolicyConfig/saveOne", this.formData)
              .then(() => {
                if (!this._.isEmpty(this.editConfigId)) {
                  this.formData.policyConfigId = this.editConfigId;
                }
                this.dialogVisible = false;
                this.$emit('refresh');
                this.$message({type: "success", message: "保存成功"});
              });
          }else{
            let that = this;
            let timer = window.setTimeout(function(){
              that.$nextTick(function () {
                that.$refs['form'].clearValidate();
                window.clearTimeout(timer);
              })
            }, 1000);
          }
        });
      },
      defaultFormData() {
        return {
          policyConfigId: null,
          userName: null,
          password: null,
          ipUrl: null,
          callbackUrl: null,
          merchantId: null
        };
      },
      loadMerchant() {
        this.$store
          .dispatch("firm/getConfigOne", {openId: this.openId})
          .then(data => {
            this.merchant = data;
          });
      },
      loadData() {
        this.$store
          .dispatch("qunarPolicyConfig/getOne", {policyConfigId: this.editConfigId})
          .then(data => {
            this.formData = data;
          });
      }
    }
  };
</script>
