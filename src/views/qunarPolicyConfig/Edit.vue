<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <el-form-item label="代理商域名">
        <el-input v-model="formData.domain"></el-input>
      </el-form-item>
      <el-form-item label="企业">
        <el-select v-model="formData.firmId" placeholder="请选择企业" style="width: 100%">
          <el-option v-for="item in firmList"
                     :key="item.firmId"
                     :label="item.firmName"
                     :value="item.firmId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台">
          <el-select v-model="formData.thirdId" placeholder="请选择平台" style="width: 100%">
            <el-option v-for="item in partyList"
              :key="item.thirdId"
              :label="item.thirdName"
              :value="item.thirdId">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="formData.user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.pass"></el-input>
      </el-form-item>
      <el-form-item label="IP">
        <el-input v-model="formData.ip"></el-input>
      </el-form-item>
      <el-form-item label="回调地址">
        <el-input v-model="formData.callbackUrl"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        props: ["curNode", "update", "firmList", "partyList"],
        data() {
            return {
                formData: {}
            };
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    domain: '',
                    firmId: '',
                    thirdId: '',
                    user: '',
                    pass: '',
                    ip: '',
                    callbackUrl: '',
                    remark: ''
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
