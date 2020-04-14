<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <el-form-item label="币种编码">
        <el-input v-model="formData.code" placeholder="请输入币种编码.." :disabled="update"></el-input>
      </el-form-item>
      <el-form-item label="币种名称">
        <el-input v-model="formData.name" placeholder="示例：人民币"></el-input>
      </el-form-item>
      <el-form-item label="货币符号">
        <el-input v-model="formData.symbol" placeholder="示例：￥"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-date-picker
          v-model="formData.date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="当前比率">
        <el-input v-model="formData.rate" placeholder="当前比率.."></el-input>
      </el-form-item>
      <el-form-item label="是否有效">
        <el-switch v-model="formData.isActive" @click="handleSwitch"></el-switch>
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
                    //币种
                    code: "",
                    //币种名称
                    name: "",
                    //货币符号
                    symbol: "",
                    //日期
                    date: new Date(),
                    //当前比率
                    rate: 1,
                    //有效
                    isActive: true
                };
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
            handleSwitch(){
                this.formData.isActive = this.formData.isActive ? false : true;
            },
            /*对提交的数据进行类型格式*/
            handleConfirm() {
                if (this.formData.date && "number" != typeof this.formData.date) {
                    this.formData.date = this.formData.date.getTime();
                }
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
