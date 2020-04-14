<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.accountId"/>
      <el-form-item label="账号编码">
        <el-input v-model="formData.accountCode" placeholder="请输入账号编码.."></el-input>
      </el-form-item>
      <el-form-item label="账号名称">
        <el-input v-model="formData.accountName" placeholder="示例：中国工商银行昆明官渡支行"></el-input>
      </el-form-item>
      <el-form-item label="银行账号">
        <el-input v-model="formData.bankAccount" placeholder="请输入完整的银行账号"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="formData.category" style="width: 100%;">
          <el-option label="现金" :value="0"></el-option>
          <el-option label="银行存款" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="币种">
        <el-select v-model="formData.currency" style="width: 100%;">
          <el-option label="人民币" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="初始余额">
        <el-input v-model="formData.initBalance" placeholder="请输入余额.."></el-input>
      </el-form-item>
      <el-form-item label="余额">
        <el-input v-model="formData.balance" placeholder="请输入余额.."></el-input>
      </el-form-item>
      <el-form-item label="科目名称">
        <el-select v-model="formData.subjectName" style="width: 100%;">
          <el-option label="现金" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        props: ["curNode", "update"],
        data() {
            return {
                formData: {}
            };
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    accountId: "",
                    //账号编码
                    accountCode: "",
                    //账号名称
                    accountName: "",
                    //银行账号
                    bankAccount: '',
                    //类别(0:现金，1:银行存款)
                    category: 1,
                    //币种
                    currency: '',
                    //科目id
                    subjectId: '',
                    //科目编码
                    subjectCode: '',
                    //科目名称
                    subjectName: '',
                    //初始余额
                    initBalance: 0,
                    //余额
                    balance: 0
                };
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
            /*对提交的数据进行类型格式*/
            handleConfirm() {
                this.$emit("onSave", this.formData);
            },
            initFormData() {
                this.clearForm();
                if (this.update) {
                    this.formData = this.curNode;
                }
            }
        },
        created() {
            this.initFormData();
        }
    };
</script>
