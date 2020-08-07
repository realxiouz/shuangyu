<template>
  <div class="bigBox">
    
    <el-card class="contentBox">
      <div slot="header">
        <span>去哪儿订单通知接口</span>
      </div>
      <div class="page-back">
      <el-button-group>
        <el-button icon="el-icon-back" type="warning" @click="goBack"
          >返回</el-button
        >
        <el-button icon="el-icon-plus" type="primary" :disabled="isDisable" @click="saveNotify()"
          >保存</el-button
        >
      </el-button-group>
    </div>
      <el-form
        ref="notifyForm"
        :rules="notifyRules"
        :model="notifyData"
        label-width="130px"
        size="mini"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="域名:" prop="domain">
              <el-input v-model="notifyData.domain" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>代理商TTS域名,系统自动读取。</span>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="安全码:" prop="securityCode">
              <el-input v-model="notifyData.securityCode" @blur="disabledNotify"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>作为安全标识，我们会将安全码配置在系统中。</span>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <el-form-item label="消息通知地址:" prop="url">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入消息通知地址"
                v-model="notifyData.url"
                @blur="disabledNotify"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10" :lg="9" :xl="7">
            <span>
              用于我们推送消息通知机制和您返回信息，详见《TTS消息通知机制说明文档》。
              此处可添加多个消息通知地址，以回车隔开
              必须以http://开头，并且每个URL最多输入200个字
              <br/>示例：
              <br/>http://api.abc.com/order
              <br/>http://123.123.123.1:9000
            </span>
          </el-col>
        </el-row>
        
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: "config",
    data() {
      return {
        notifyData: {},
        dialogVisible: false,
        merchantId: "",
        openId: "",
        isDisable: false,
        notifyRules: {
          domain: [{required: true, message: "域名不能为空", trigger: "blur"}],
          securityCode: [
            {required: true, message: "请输入安全码", trigger: "blur"}
          ],
          url: [{required: true, message: "请输入url", trigger: "blur"}]
        },
      };
    },
    methods: {
      loadNotify(domain) {
        if (!domain) {
          domain = this.notifyData.domain;
        } else {
          this.notifyData.domain = this.domain;
        }
        this.$store
          .dispatch("qunarOrderNotifyConfig/getOne", {domain: domain})
          .then(data => {
            if (data && data.domain) {
              this.notifyData = data;
              this.isDisable = true;
            }
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      saveNotify() {
        this.$refs["notifyForm"].validate(valid => {
          if (valid) {
            this.$store
              .dispatch("qunarOrderNotifyConfig/save", this.notifyData)
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
        });
      },
      disabledNotify() {
        this.isDisable = false;
      },
      //跳转回列表页面
      goBack() {
        if (this.$router.history.length <= 1) {
          this.$router.push({path: "/home"});
          return false;
        } else {
          this.$router.go(-1);
        }
      }
    },
    created() {
      this.domain = localStorage.getItem("merchantDomain");
      this.openId = localStorage.getItem("openId");
      this.firmId = localStorage.getItem("merchantId");
      if (this.firmId) {
        this.notifyData.firmId = this.firmId;
      }
      if (this.openId) {
        this.notifyData.openId = this.openId;
      }
      if (this.domain) {
        this.loadNotify(this.domain);
      }
    }
  };
</script>
<style>
.page-back{
  margin-bottom: 10px;
}
</style>
