<template>
  <div>
    <el-form ref="formData" :model="formData" label-width="120px">
      <el-form-item label="导单类型" prop="orderType">
        <el-select v-model="formData.orderType" placeholder="请选择">
          <el-option label="出票" :value="0"></el-option>
          <el-option label="退票" :value="1"></el-option>
          <el-option label="改签" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="导单类型">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="test"
          :limit="1"
          :data="formData"
          :http-request="uploadSectionFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios';
  function defaultData() {
    return {
      orderType: ""
    };
  };
  export default {
    name: "Export",
    data() {
      return {
        formData: defaultData(),
        fileList: [],
        formRules: {
          orderType: [
            {required: true, message: "导单类型必须选择", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      uploadSectionFile(params) {
        var form = new FormData();
        form.append("file", params.file);
        form.append("orderType",this.formData.orderType);
        this.$store
          .dispatch('pnrjyOrder/exportOrder',form)
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error);
          });
      },

      beforeUpload(file) {
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 10     //这里做文件大小限制
        if (!extension && !extension2) {
          this.$message({
            message: '上传文件只能是 xls、xlsx格式!',
            type: 'warning'
          });
        }
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 10MB!',
            type: 'warning'
          });
        }
        return extension || extension2 && isLt2M
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  };
</script>

<style scoped>

</style>
