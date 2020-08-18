<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改币别管理' : '添加币别管理'"  width="24%"  :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="币种编码：" prop="currencyCode">
          <el-input
            v-model="formData.currencyCode"
            placeholder="请输入币种编码..."
            :disabled="codeEnable"
          ></el-input>
        </el-form-item>
        <el-form-item label="币种名称：" prop="currencyName">
          <el-input v-model="formData.currencyName" placeholder="示例：人民币"></el-input>
        </el-form-item>
        <el-form-item label="货币符号：" prop="symbol">
          <el-input v-model="formData.symbol" placeholder="示例：￥"></el-input>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="formData.date"
            style="width:100%;"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="当前比率：">
          <el-input
            v-model="formData.rate"
            v-on:change="formatRate()"
            placeholder="当前比率.."
          ></el-input>
        </el-form-item>
        <el-form-item label="是否有效：">
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
        firmList: [],
        currencyList: [],
        subjectList: [],
        subjectTree: [],
        codeEnable: false,
        actions: {
          getOne: 'currency/getOne',
          saveOne: 'currency/saveOne'
        },
        rules: {
          currencyCode: [
            {required: true, message: "请输入币种编码"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          currencyName: [
            {required: true, message: "请输入币种名称"},
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
          if(this.keyId){
            this.codeEnable = true;
          }
        }
      }
    },
    methods: {
      formatRate(){
        if(isNaN(this.formData.rate)){
          this.formData.rate = 1;
          this.$message({
            type: "warning",
            message: "请输入数字！"
          });
          return;
        }
        if(parseFloat(this.formData.rate) <= 0){
          this.formData.rate = 1;
          this.$message({
            type: "warning",
            message: "请输入大于0的数字！"
          });
          return;
        }
        this.formData.rate = parseFloat(this.formData.rate);
      },
      handleSwitch(){
        this.enable = !this.enable;
      },
      beforeSave(data) {
        if(data.date){
          data.date = new Date(data.date).getTime();
        }
        return data;
      },
      defaultFormData() {
        return {
          currencyId: null,
          currencyCode: null,
          currencyName: null,
          symbol: null,
          date: new Date(),
          rate: 1,
          enable: true,
          editable: true,
          deletable: true
        };
      }
    }
  };
</script>
