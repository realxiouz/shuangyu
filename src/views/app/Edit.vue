<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改应用管理' : '添加应用管理'"  width="24%" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="应用名称：" prop="appName">
          <el-input v-model="formData.appName" placeholder="请输入应用名称"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-switch v-model="formData.enable" @click="handleSwitch"></el-switch>
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
    data() {
      return {
        dialogVisible: false,
        actions: {
          getOne: 'app/getOne',
          saveOne: 'app/saveOne'
        },
        rules: {
          appName: [
            {required: true, message: "请输入应用名称"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            }
          ]
        }
      };
    },
    methods: {
      handleSwitch(){
        this.enable = !this.enable;
      },
      defaultFormData() {
        return {
          appId: null,
          appName: null,
          enable: false
        };
      }
    }
  };
</script>
