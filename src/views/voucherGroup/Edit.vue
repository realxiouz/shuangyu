<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改凭证字管理' : '添加凭证字管理'"  width="24%" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="凭证字：" prop="voucherGroupName">
          <el-input v-model="formData.voucherGroupName" placeholder="请输入凭证字" />
        </el-form-item>
        <el-form-item label="标题：" prop="voucherGroupTitle">
          <el-input v-model="formData.voucherGroupTitle" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="是否默认：" prop="defaultFlag">
          <el-switch v-model="formData.defaultFlag" @click="handleSwitch"></el-switch>
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
      const chineseValidator = (rule, value, callback) => {
        let reg = /^[\u4e00-\u9fa5]+$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入中文！"));
        }
      };
      return {
        dialogVisible: false,
        codeEnable: false,
        actions: {
          getOne: 'voucherGroup/getOne',
          saveOne: 'voucherGroup/saveOne'
        },
        rules: {
          voucherGroupName: [
            {required: true, message: "请输入凭证字"},
            {
              min: 1,
              max: 1,
              message: "长度 1 个字符"
            },
            {validator: chineseValidator, trigger: 'blur'}
          ],
          voucherGroupTitle: [
            {required: true, message: "请输入标题"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: chineseValidator, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSwitch(){
        this.defaultFlag = !this.defaultFlag;
      },
      defaultFormData() {
        return {
          voucherGroupId: null,
          voucherGroupName: null,
          voucherGroupTitle: null,
          defaultFlag: null
        };
      }
    }
  };
</script>
