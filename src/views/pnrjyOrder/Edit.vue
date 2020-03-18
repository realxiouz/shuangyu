<template>
  <div>
    <el-form ref="formData" :model="formData" label-width="120px">
      <el-form-item label="导单类型">
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
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-remove="handleRemove"
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
  function defaultData() {
    return {
      thirdName: ""
    };
  };
  export default {
    name: "Export",
    data() {
      return {
        formData: defaultData(),
        fileList: [],
        formRules: {
          thirdName: [
            {required: true, message: "请输入平台名称", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove() {
        this.fileList = [];
      }
    }
  };
</script>

<style scoped>

</style>
