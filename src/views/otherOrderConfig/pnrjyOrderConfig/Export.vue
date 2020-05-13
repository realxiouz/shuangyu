<template>
  <div class="contentBox">
    <el-form :rules="formRules" ref="formData" :model="formData" label-width="110px" size="mini">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="导单类型:" prop="orderType">
            <el-select v-model="formData.orderType" placeholder="请选择">
              <el-option label="出票" :value="0"></el-option>
              <el-option label="退票" :value="1"></el-option>
              <el-option label="改签" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="选择文件:">
          <el-upload
            prop="file"
            class="upload-demo"
            ref="upload"
            action="test"
            :limit="2"
            :data="formData"
            :http-request="uploadSectionFile"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="mini"
              type="success"
              @click="submitUpload"
            >上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip" style="color:red">只能上传xls/xlsx文件</div>
          </el-upload>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
function defaultData() {
  return {
    orderType: ""
  };
}
export default {
  name: "Export",
  data() {
    return {
      formData: defaultData(),
      fileList: [],
      formRules: {
        orderType: [
          { required: true, message: "导单类型必须选择", trigger: "blur" }
        ],
        file: [{ required: true, message: "没有上传文件", trigger: "blur" }]
      }
    };
  },
  methods: {
    uploadSectionFile(params) {
      console.log("---------");
      this.$refs["formData"].validate(valid => {
        console.log("---------");
        if (valid) {
          var form = new FormData();
          form.append("file", params.file);
          form.append("orderType", this.formData.orderType);
          this.$store
            .dispatch("pnrjyOrderConfig/exportOrder", form)
            .then(data => {
              this.$notify({
                title: "提示",
                message: "上传成功",
                type: "success",
                duration: 4500
              });
            })
            .catch(error => {
              this.$notify({
                title: "提示",
                message: "上传失败",
                type: "warning",
                duration: 4500
              });
            });
        }
      });
    },

    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      const isLt2M = file.size / 1024 / 1024 < 10; //这里做文件大小限制
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 xls、xlsx格式!",
          type: "warning"
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning"
        });
      }
      return extension || (extension2 && isLt2M);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    }
  }
};
</script>

<style scoped>
</style>
