<template>
  <div>
    <el-form :model="formData" ref="form" :rules="rules" label-width="110px" size="mini">
      <el-form-item label="币种编码：" prop="code">
        <el-input
          v-model="formData.code"
          onkeyup="this.value=this.value.toUpperCase()"
          placeholder="请输入币种编码..."
          :disabled="codeEnabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="币种名称：" prop="name">
        <el-input v-model="formData.name" placeholder="示例：人民币"></el-input>
      </el-form-item>
      <el-form-item label="货币符号：" prop="symbol">
        <el-input v-model="formData.symbol" placeholder="示例：￥"></el-input>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
          v-model="formData.date"
          style="width:100%;"
          type="date"
          placeholder="选择日期">
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
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
  function defaultData() {
    return {
      code: "",
      name: "",
      symbol: "",
      date: new Date(),
      rate: 1,
      enable: true,
      editable: true,
      deletable: true
    };
  }

  export default {
    props: ["editCurrencyId", "codeEnabled"],
    data() {
      const codeValidator = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入字母或数字！"));
        }
      };
      return {
        formData: defaultData(),
        firmList: [],
        newDialogVisible: false,
        rules: {
          code: [
            {required: true, message: "请输入币种编码", trigger: "blur"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          name: [
            {required: true, message: "请输入币种名称", trigger: "blur"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            }
          ]
        }
      }
    },
    methods: {
      handleGetOne(currencyId) {
        if (currencyId) {
          this.$store
            .dispatch("currency/getOne", {currencyId: currencyId})
            .then(data => {
              this.formData = data;
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.formData = defaultData();
        }
      },
      handleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.formData.date && "number" != typeof this.formData.date) {
              this.formData.date = this.formData.date.getTime();
            }
            this.formData.code = this.formData.code.toUpperCase();
            this.$emit("onSave", this.formData);
          }
        });
      },
      handleSwitch(){
        this.enable = !this.enable;
      },
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
      }
    },
    created() {
      if (this.editCurrencyId) {
        this.handleGetOne(this.editCurrencyId);
      }
    }
  };
</script>
