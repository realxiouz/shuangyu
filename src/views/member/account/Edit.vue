<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改会员管理' : '添加会员管理'"  width="24%" align="center"  :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="会员编号：" prop="memberNo">
          <el-input v-model="formData.memberNo" placeholder="请输入会员编号..." :disabled="codeEnable"></el-input>
        </el-form-item>
        <el-form-item label="会员名称：" prop="memberName">
          <el-input v-model="formData.memberName" placeholder="请输入会员名称..."></el-input>
        </el-form-item>
        <el-form-item label="会员类型：" prop="memberType">
          <el-select
            style="width: 100%;"
            v-model="formData.memberType"
            placeholder="请选择会员类型..."
            filterable
            clearable
          >
            <el-option
              v-for="item in memberTypeList"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员状态：" prop="status">
          <el-select
            style="width: 100%;"
            v-model="formData.status"
            placeholder="请选择会员状态..."
            filterable
            clearable
          >
            <el-option
              v-for="item in memberStatusList"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
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
  import { MEMBER_TYPES, MEMBER_STATUS } from '@/utils/const'
  export default {
    mixins: [MIXIN_EDIT],
    data() {
      const codeValidator = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z_]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入字母或数字！"));
        }
      };
      return {
        dialogVisible: false,
        memberTypeList: MEMBER_TYPES,
        memberStatusList: MEMBER_STATUS,
        codeEnable: false,
        actions: {
          getOne: 'member/getOne',
          saveOne: 'member/saveOne'
        },
        rules: {
          memberNo: [
            {required: true, message: "请输入会员编号"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          memberName: [
            {required: true, message: "请输入会员名称"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            }
          ],
          memberType: [
            {required: true, message: "请选择会员类型"}
          ],
          status: [
            {required: true, message: "请选择会员状态"}
          ]
        }
      };
    },
    watch: {
      visible(val) {
        if (val) {
          this.codeEnable = false;
          if(this.keyId){
            this.codeEnable = true;
          }
        }
      }
    },
    methods: {
      defaultFormData() {
        return {
          memberId: null,
          memberNo: null,
          memberName: null,
          memberType: null,
          status: null,
        };
      }
    }
  };
</script>

<style>
  .el-dialog__body{
    padding-top: 0;
  }
</style>
