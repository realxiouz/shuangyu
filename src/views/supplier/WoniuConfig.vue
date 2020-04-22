<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header">
        <span>蜗牛配置管理</span>
      </div>
      <el-form ref="notifyForm" :rules="rules" :model="formData" label-width="130px" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="域名:" prop="domain">
              <el-input v-model="formData.domain" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="key:" prop="key">
              <el-input v-model="formData.key"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="token:" prop="token">
              <el-input v-model="formData.token"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item>
              <el-button
                @click="saveNotify()"
                type="primary"
                size="mini"
              >保存
              </el-button>
              <el-button
                @click="removeNotify()"
                type="danger"
                size="mini"
              >删除
              </el-button>
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
                formData: {}
            }
        }
    }
</script>
