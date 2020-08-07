<template>
  <div class="contentBox">
    <div class="page-back">
      <el-button-group>
        <el-button icon="el-icon-back" type="warning" @click="goBack"
          >返回</el-button
        >
        <el-button icon="el-icon-plus" type="primary" :disabled="isDisable" @click="saveNotify()"
          >保存</el-button
        >
      </el-button-group>
    </div>
    <el-row style="margin-bottom:20px; margin-left:20px;">
      <el-radio-group v-model="radio">
        <el-radio :label="1">原始单号导单</el-radio>
        <!-- <el-radio :label="2">lastId增量导单</el-radio> -->
        <el-radio :label="3">文件导单</el-radio>
      </el-radio-group>
    </el-row>

    <!-- 根据原始单号导单 -->
    <el-form
      v-if="radio==1"
      ref="formData1"
      :model="formData"
      label-width="110px"
      size="mini"
      :rules="formRules"
      style="margin-top:-400px"
    >
      <el-row :gutter="15">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="源单号:" prop="sourceOrderNo">
            <el-input v-model="formData.sourceOrderNo" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-button type="primary" :loading="loadingOrderNo" size="mini" @click="exportOrderNo">导入</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!--  根据lastId增量导单-->
    <!-- <el-form
      v-if="radio==2"
      ref="formData2"
      :model="formData"
      size="mini"
      label-width="120px"
      :rules="formRules"
    >
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="域名:" prop="domain">
            <el-input v-model="formData.domain" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="开始导单lastid:" prop="fromLastId">
            <el-input v-model="formData.fromLastId" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="截止导单lastId:" prop="toLastId">
            <el-input v-model="formData.toLastId" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-button type="primary" size="mini" :loading="loadingLastId" @click="exportLastId">导入</el-button>
    </el-form> -->

    <!-- 根据文件导单 -->
    <el-form
      v-if="radio==3"
      :rules="formRules"
      ref="formData3"
      :model="formData"
      label-width="110px"
      size="mini"
      style="margin-top:-400px"
    >
      <el-row>
        <el-form-item label="选择文件:" prop="file">
          <el-upload
            class="upload-demo"
            :before-upload="beforeUpload"
            ref="upload"
            :limit="1"
            :data="formData"
            action="test"
            :http-request="uploadSectionFile"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="mini"
              type="success"
              @click="submitUpload"
              :loading="loading"
            >导单</el-button>
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
    sourceOrderNo: "",
    domain: "",
    fromLastId: "",
    toLastId: ""
  };
}
export default {
  name: "Export",
  data() {
    return {
      formData: defaultData(),
      fileList: [],
      radio: 1,
      loading: false,
      loadingOrderNo: false,
      loadingLastId: false,
      fileName: "",
      formRules: {
        sourceOrderNo: [
          { required: true, message: "源单号必须填写", trigger: "blur" }
        ],
        domain: [
          { required: true, message: "域名号必须填写", trigger: "blur" }
        ],
        fromLastId: [
          {
            required: true,
            message: "开始导单的lastid必须填写",
            trigger: "blur"
          }
        ],
        toLastId: [
          { required: true, message: "截止导单lastId必须填写", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      const isLt10M = file.size / 1024 / 1024 < 10; //这里做文件大小限制
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 xls、xlsx格式!",
          type: "warning"
        });
      }
      if (!isLt10M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning"
        });
      }
      return extension || (extension2 && isLt2M);
    },
    submitUpload() {
      if (this.$refs.upload.fileList.length > 0) {
        this.$refs.upload.submit();
      } else {
        this.$notify({
          title: "提示",
          message: "请选择你要导入的excel文件",
          type: "warning",
          duration: 4500
        });
      }
    },

    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },

    // 根据原始单号导单
    exportOrderNo() {
      this.$refs["formData1"].validate(valid => {
        if (valid) {
          this.loadingOrderNo = true;
          this.$store
            .dispatch(
              "qunarOrderConfig/exportOrderNo",
              this.formData.sourceOrderNo
            )
            .then(data => {
              if (data) {
                this.$message({
                  type: "success",
                  message: data
                });
                this.loadingOrderNo = false;
              } else {
                this.$message({
                  type: "warning",
                  message: data
                });
                this.loadingOrderNo = false;
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    // 根据lastId增量导单
    exportLastId() {
      this.$refs["formData2"].validate(valid => {
        if (valid) {
          this.loadingLastId = true;
          let params = {};
          params.domain = this.formData.domain;
          params.fromLastId = this.formData.fromLastId;
          params.toLastId = this.formData.toLastId;
          this.$store
            .dispatch("qunarOrderConfig/exportLastId", params)
            .then(data => {
              if (data) {
                this.$message({
                  type: "success",
                  message: "导入成功！"
                });
                this.loadingLastId = false;
              }
            })
            .catch(error => {
              console.log(error);
              this.loadingLastId = false;
            });
        }
      });
    },

    // 根据文件导单
    uploadSectionFile(params) {
      this.loading = true;
      if (this.fileName == params.file.name) {
        this.$notify({
          title: "提示",
          message: "请勿重复上传文件",
          type: "warning",
          duration: 4500
        });
        this.loading = false;
        return;
      }
      var form = new FormData();
      form.append("file", params.file);
      this.$store
        .dispatch("qunarOrderConfig/exportOrderFile", form)
        .then(data => {
          this.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
            duration: 4500
          });
          this.loading = false;
          this.fileName = params.file.name;
        })
        .catch(error => {
          this.$notify({
            title: "提示",
            message: "上传失败",
            type: "warning",
            duration: 4500
          });
          this.loading = false;
          this.fileName = "";
        });
    }
  }
};
</script>

<style scoped>
.page-back{
  margin-bottom: 20px;
}
</style>
