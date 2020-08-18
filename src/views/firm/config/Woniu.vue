<template>
  <div class="">
      <div style="width:500px;height: 60px;line-height: 60px;font-size: 24px;border-bottom: 1px solid #ccc;margin-bottom: 20px">
        蜗牛配置管理
      </div>
      <el-form ref="form" :rules="rules" :model="formData" label-width="100px" size="mini">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="配置标识：" prop="key">
              <el-input v-model="formData.key" placeholder="请输入配置标识" />
            </el-form-item>
          </el-col>
        </el-row>
          
          <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="授权凭证：" prop="token">
              <el-input v-model="formData.token" placeholder="请输入授权凭证" />
            </el-form-item>
         </el-col>
        </el-row>
          <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="下单地址：" prop="placeOrderUrl">
              <el-input v-model="formData.placeOrderUrl" placeholder="请输入下单地址" />
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="签约地址：" prop="signUrl">
              <el-input v-model="formData.signUrl" placeholder="请输入签约地址" />
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="联系电话：" prop="contactMob">
              <el-input v-model="formData.contactMob" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="联系人员：" prop="contact">
              <el-input v-model="formData.contact" placeholder="请输入联系人员" />
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="登录账号：" prop="userName">
              <el-input v-model="formData.userName" placeholder="请输入登录账号" />
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="登录密码：" prop="password">
              <el-input v-model="formData.password" type="password" placeholder="请输入登录密码" />
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="报价类型：" prop="exTrack">
              <el-input v-model="formData.exTrack" type="textarea" :rows="3" placeholder="请输入报价类型" />
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="排除域名：" prop="excludeDomain">
              <el-input v-model="formData.excludeDomain" type="textarea" :rows="3" placeholder="请输入排除域名" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="page-back">
      <el-button-group>
        <!-- <el-button icon="el-icon-back" type="warning" @click="goBack">返回</el-button> -->
        <el-button icon="el-icon-plus" @click="save()" type="primary" size="mini">保存</el-button>
      </el-button-group>
    </div>
      </el-form>
  </div>
</template>
<script>
    export default {
        name: "woniuConfig",
        data() {
            return {
              formData: null,
              rules: {
                key: [
                  {required: true, message: "请输入配置标识"}
                ],
                token: [
                  {required: true, message: "请输入授权凭证"}
                ],
                placeOrderUrl: [
                  {required: true, message: "请输入下单地址"}
                ],
                signUrl: [
                  {required: true, message: "签约接口地址"}
                ],
                contactMob: [
                  {required: true, message: "联系电话"}
                ],
                contact: [
                  {required: true, message: "联系电话"}
                ],
                userName: [
                  {required: true, message: "登录账号"}
                ],
                password: [
                  {required: true, message: "登录密码"}
                ],
                exTrack: [
                  {required: true, message: "报价类型"}
                ],
                excludeDomain: [
                  {required: true, message: "排除域名"}
                ],
              }
            }
        },
      methods: {
        loadData(){
          this.$store
            .dispatch("woniuConfig/getOne", {firmId: this.formData.firmId, merchantId: this.formData.merchantId, openId: this.formData.openId})
            .then(data => {
              if (data) {
                this.formData = data;
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        goBack() {
          let lastName = localStorage.getItem("lastName");
          if (lastName && "undefined" !== lastName) {
            this.$router.push({name: lastName});
            localStorage.removeItem("lastName");
          } else {
            this.$router.go(-1);
          }
        },
        save() {
          this.$refs['form'].validate((valid) => {
            if(!this.formData){
              this.$message({
                type: "success",
                message: "formData为空！"
              });
              return;
            }
            if(!this.formData.firmId){
              this.$message({
                type: "warning",
                message: "firmId为空！"
              });
              return;
            }
            if(!this.formData.merchantId){
              this.$message({
                type: "warning",
                message: "merchantId为空！"
              });
              return;
            }
            if(!this.formData.openId){
              this.$message({
                type: "warning",
                message: "openId为空！"
              });
              return;
            }
            if (valid) {
              this.$store
                .dispatch("woniuConfig/save", this.formData)
                .then(() => {
                  this.$message({
                    type: "success",
                    message: "保存成功！"
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            }
          })
        },
        defaultFormData() {
          return {
            configId: null,
            key: null,
            token: null,
            firmId: null,
            merchantId: null,
            openId: null,
            placeOrderUrl: null,
            signUrl: null,
            contactMob: null,
            contact: null,
            userName: null,
            password: null,
            exTrack: null,
            excludeDomain: null
          }
        }
      },
      created() {
        this.formData = this.defaultFormData();

        let firmId = localStorage.getItem("firmId");
        let merchantId = localStorage.getItem("merchantId");
        let openId = localStorage.getItem("openId");

        if(firmId && "undefined" !== firmId){
          this.formData.firmId = firmId;
        }
        if(merchantId && "undefined" !== merchantId){
          this.formData.merchantId = merchantId;
        }
        if(openId && "undefined" !== openId){
          this.formData.openId = openId;
        }
        if(this.formData.firmId && this.formData.merchantId && this.formData.openId){
          this.loadData();
        }
      }
    }
</script>
