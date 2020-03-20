<template>
  <div>
    <el-form ref="form" :model="formData" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.apiId" />
      <el-form-item label="第三方平台:">
        <el-input v-model="formData.thirdId"></el-input>
      </el-form-item>
      <el-form-item label="URL:">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="方法:">
        <el-input v-model="formData.method"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
function defaultData() {
  return {
    apiId: "",
    thirdId: "",
    url: "",
    method: ""
  };
}
export default {
  name: "apiEdit",
  data() {
    return {
      formData: defaultData()
    };
  },
  methods: {
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("onSave", this.formData);
        }
      });
    },
    handleGetOne(id) {
      if (id) {
        this.$store
          .dispatch("thirdApiService/getOne", { apiId: id })
          .then(data => {
            this.formData = data;
            this.dialogVisible = true;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.formData = defaultData();
      }
    }
  },
  created() {
    if (this.apiId) {
      this.handleGetOne(this.apiId);
    }
  },
  props: {
    apiId: String
  }
};
</script>

<style scoped>
</style>
