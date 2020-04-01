<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.fundAccountId"/>
      <el-form-item label="资金账号平台">
        <el-input v-model="formData.platform" placeholder="请输入资金账号平台.."></el-input>
      </el-form-item>
      <el-form-item label="资金账号">
        <el-input v-model="formData.fundAccount" placeholder="请输入资金账号.."></el-input>
      </el-form-item>
      <el-form-item label="初始余额">
        <el-input v-model="formData.initBalance" placeholder="请输入初始余额.."></el-input>
      </el-form-item>
      <el-form-item label="余额">
        <el-input v-model="formData.balance" placeholder="请输入余额.."></el-input>
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
                    fundAccountId: '',
                    platform: '',
                    fundAccount: '',
                    initBalance: 0,
                    balance: 0
                };
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
            /*对提交的数据进行类型格式*/
            handleConfirm(){
                this.$emit('onSave',this.formData);
            },
            initFormData(){
                this.clearForm();
                if (this.update){
                    this.formData = this.curNode;
                }
            }
        },
        created() {
            this.initFormData();
        }
    };
</script>
