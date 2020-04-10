<template>
  <div>
    <el-form ref="formData" :rules="formRules" :model="formData" size="mini" label-width="120px">
      <el-form-item label="平台名称">
        <el-input v-model="formData.thirdName" placeholder="请输入平台名称.."></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="formData.contactPerson" placeholder="请输入联系人.."></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
      <el-input v-model="formData.contactPhone" placeholder="请输入联系电话.."></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱">
      <el-input v-model="formData.contactEmail" placeholder="请输入联系邮箱.."></el-input>
      </el-form-item>
      <el-form-item label="平台类别">
        <el-select v-model="formData.category" placeholder="请选择平台类别.." style="width: 100%">
          <el-option label="平台" :value=0></el-option>
          <el-option label="单位" :value=1></el-option>
          <el-option label="个人" :value=2></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
function defaultData() {
  return {
    thirdName: "",
      contactPerson: '',
      contactPhone: '',
      contactEmail: '',
      category: 0
  };
}
export default {
  name: "thirdEdit",
  data() {
    return {
      formData: defaultData(),
      formRules: {
        thirdName: [
          { required: true, message: "请输入平台名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    loadData() {
      if ("" != this.thirdId) {
        this.$store
          .dispatch("third/getOne", { thirdId: this.thirdId })
          .then(data => {
            this.formData = data;
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = true;
      }
    },
    handleSave() {
          this.$emit("onSave", this.formData);
    }
  },
  created() {
    this.loadData();
  },
  props: {
    thirdId: String
  }
};
</script>

<style scoped>
</style>
