<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改政策配置管理' : '添加政策配置管理'"  width="24%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="用户名称:" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户密码:" prop="password">
          <el-input v-model="formData.password" placeholder="请输入用户密码" type="password" />
        </el-form-item>
        <el-form-item label="IP地址:" prop="ip">
          <el-input v-model="formData.ip" placeholder="请输入IP地址" />
        </el-form-item>
        <el-form-item label="回调地址:" prop="callbackUrl">
          <el-input v-model="formData.callbackUrl" placeholder="请输入回调地址" />
        </el-form-item>
        <el-form-item label="域名地址:" prop="domain">
          <el-input v-model="formData.domain" placeholder="请输入域名地址" />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="formData.remark" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {MIXIN_EDIT} from "@/utils/mixin";
  export default {
    mixins: [MIXIN_EDIT],
    props: {
      firmId: {
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
        codeEnable: false,
        actions: {
          getOne: 'qunarPolicyConfig/getOne',
          saveOne: 'qunarPolicyConfig/saveOne'
        },
        rules: {
          username: [
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
          ip: [
            {required: true, message: "请输入IP地址"}
          ],
          callbackUrl: [
            {required: true, message: "请输入回调地址"}
          ],
          domain: [
            {required: true, message: "请输入域名地址"}
          ]
        }
      };
    },
    methods: {
      defaultFormData() {
        return {
          policyConfigId: null,
          username: null,
          password: null,
          ip: null,
          callbackUrl: null,
          domain: null
        };
      },
      validateOther() {
        let flag = false;
        let msg = '';
        if(!this.firmId){
          flag = true;
          msg = '丢失企业主键';
        }
        if(!this.openId){
          flag = true;
          msg = '丢失平台主键';
        }
        if(flag){
          this.$message({type: "warning", message: msg});
        }
        return !flag;
      },
      beforeSave(data){
        if(this.firmId){
          data.firmId = this.firmId;
        }
        if(this.openId){
          data.openId = this.openId;
        }
        return data;
      }
    }
  };
</script>
