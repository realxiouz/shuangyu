<template>
  <div class="page-form">
    <el-dialog :title="keyId && !pid ? '修改科目管理' : '添加科目管理'"  width="30%"  :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="科目编码:" prop="subjectCode">
          <el-input
            v-model="formData.subjectCode"
            placeholder="请输入科目编码..."
            :disabled="codeEnable"
          ></el-input>
        </el-form-item>
        <el-form-item label="科目名称:" prop="subjectName">
          <el-input v-model.number="formData.subjectName" placeholder="请输入科目名称..."></el-input>
        </el-form-item>
        <el-form-item label="科目类别:" prop="category">
          <el-select v-model="formData.category" placeholder="请选择科目类别" disabled style="width: 100%">
            <el-option label="资产类" :value="0"></el-option>
            <el-option label="负债类" :value="1"></el-option>
            <el-option label="权益类" :value="2"></el-option>
            <el-option label="成本类" :value="3"></el-option>
            <el-option label="损益类" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有效:">
          <el-switch v-model="formData.enable" @change="handleSwitch"></el-switch>
        </el-form-item>
        <el-form-item label="余额方向:" prop="balanceDirection">
          <el-radio-group v-model="formData.balanceDirection">
            <el-radio :label="0">借</el-radio>
            <el-radio :label="1">贷</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formData.quantityFinancing">数量核算</el-checkbox>
          <span style="margin-left: 40px">
          <el-checkbox v-model="formData.addable" style="margin-right: 10px">可新增</el-checkbox>
          <el-checkbox v-model="formData.editable" style="margin: 0 10px 0 0">可修改</el-checkbox>
          <el-checkbox v-model="formData.deletable" disabled style="margin: 0 10px 0 0">可删除</el-checkbox>
        </span>
        </el-form-item>
        <el-form-item label>
          <el-checkbox v-model="formData.auxiliaryFinancing">辅助核算</el-checkbox>
        </el-form-item>
        <el-form-item label>
          <el-checkbox v-model="formData.currencyFinancing">外币核算</el-checkbox>
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
      pid: {
        type: String,
        default: ''
      },
      category: {
        type: Number,
        default: null
      }
    },
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
        codeEnable: false,
        actions: {
          getOne: 'accountSubject/getOne',
          saveOne: 'accountSubject/saveOne'
        },
        rules: {
          subjectCode: [
            {required: true, message: "请输入科目编码"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          subjectName: [
            {required: true, message: "请输入科目名称"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            }
          ]
        }
      };
    },
    watch: {
      visible(val) {
        if (val) {
          this.codeEnable = false;
          if(this.keyId && !this.pid){
            this.codeEnable = true;
          }
          if(null !== this.category && '' !== this.category){
            this.formData.category = this.category;
          }
        }
      }
    },
    methods: {
      handleSwitch(){
        this.enable = !this.enable;
      },
      defaultFormData() {
        return {
          subjectCode: null,
          subjectName: null,
          category: 0,
          balanceDirection: 0,
          quantityFinancing: false,
          auxiliaryFinancing: false,
          currencyFinancing: false,
          enable: true,
          addable: true,
          editable: true,
          deletable: true
        };
      },
      beforeSave(data){
        if (this.pid) {
          data.pid = this.pid;
        }
        if(null !== this.category && '' !== this.category && this.formData.category){
          if(!data){
            data = {};
          }
          data.category = this.category;
        }
        return data;
      }
    }
  };
</script>
