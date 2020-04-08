<template>
  <div>
    <el-form ref="formData" :rules="formRules" :model="formData" size="mini" label-width="120px">
      <el-form-item label="第三方平台名称" prop="thirdName">
        <el-input v-model="formData.thirdName" placeholder="请输入平台名称"></el-input>
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
    thirdName: ""
  };
}
export default {
  name: "thirdPartyEdit",
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
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.$emit("onSave", this.formData);
        }
      });
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
