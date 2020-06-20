<template>
  <div class="page-form">
    <el-dialog title="添加" :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-form label-position="top" size="mini" :model="formData" ref="thingsProjectForm">
        <el-col :span="24">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="formData.projectName" placeholder="请输入项目名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
          <el-form-item label="客户" prop="merchantId">
            <el-input v-model="formData.merchantId" placeholder="请输入客户"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="客户名称" prop="merchantName">
            <el-input v-model="formData.merchantName" placeholder="请输入客户名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系人姓名" prop="contactId">
            <el-input v-model="formData.contactId" placeholder="请输入联系人"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系人姓名" prop="contactName">
            <el-input v-model="formData.contactName" placeholder="请输入联系人姓名"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系人电话" prop="contactPhone">
            <el-input v-model="formData.contactPhone" maxlength="11" placeholder="请输入联系人电话"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
          <el-form-item label="企业/单位域名" prop="domain">
            <el-input v-model="formData.domain" placeholder="请输入企业/单位域名"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="企业/单位名称" prop="firmName">
            <el-input v-model="formData.firmName" placeholder="请输入企业/单位名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="企业/单位id" prop="firmId">
            <el-input v-model="formData.firmId" placeholder="请输入企业/单位id"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formData.remark" placeholder="请输入备注" type="textarea"/>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      projectId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dialogVisible: false,
        formData: this.defaultFormData()
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (val) {
          if (this._.isEmpty(this.projectId)) {
            this.formData = this.defaultFormData();
          } else {
            this.loadData();
          }
        }
      }
    },
    methods: {
      handleOpen() {
        this.$emit('update:visible', true);
      },
      handleClose() {
        this.$emit('update:visible', false);
      },
      handleSave() {
        this.$store
          .dispatch("thingsProject/saveOne", this.formData)
          .then(id => {
            if (!this._.isEmpty(id)) {
              this.formData.projectId = id;
            }
            this.dialogVisible = false;
            this.$emit('refresh');
            this.$message({type: "success", message: "保存成功"});
          });
      },
      defaultFormData() {
        return {
          projectId: '',
          projectName: '',
          firmId: '',
          firmName: '',
          domain: '',
          merchantId: '',
          merchantName: '',
          accountId: '',
          contactId: '',
          contactName: '',
          contactPhone: ''
        };
      },
      loadData() {
        console.log(this.projectId);
        this.$store
          .dispatch("thingsProject/getOne", {projectId: this.projectId})
          .then(result => {
            this.formData = result;
          });
      }
    }
  };
</script>
