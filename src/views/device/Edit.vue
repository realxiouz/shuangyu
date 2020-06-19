<template>
  <div class="page-form">
    <el-dialog title="添加" :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-form label-position="top" size="mini" :model="formData" ref="deviceForm">
        <el-col :span="24">
          <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="formData.deviceName" placeholder="请输入设备名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="设备编码" prop="deviceCode">
            <el-input v-model="formData.deviceCode" placeholder="请输入设备编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="设备Key" prop="deviceKey">
            <el-input v-model="formData.deviceKey" placeholder="请输入设备Key"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
          <el-form-item label="客户/供应商账号" prop="accountId">
            <el-input v-model="formData.accountId" placeholder="请输入客户/供应商账号"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
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
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商户(客户/供应商)姓名" prop="merchantName">
            <el-input v-model="formData.merchantName" placeholder="请选择"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商户(客户/供应商)id" prop="merchantId">
            <el-input v-model="formData.merchantId" disabled placeholder="请选择商户(客户/供应商)"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
          <el-form-item label="固件版本" prop="otaVersion">
            <el-input v-model="formData.otaVersion" placeholder="请输入固件版本"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="连接密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入连接密码" show-password type="password"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商品名称" prop="productName">
            <el-select v-model="formData.productName" placeholder="请选择" style="width:100%">
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商品编码" prop="productCode">
            <el-input v-model="formData.productCode" disabled placeholder="请选择商品"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商品id" prop="productId">
            <el-input v-model="formData.productId" disabled placeholder="请选择商品"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目id" prop="projectId">
            <el-input v-model="formData.projectId" placeholder="请输入项目id"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="formData.projectName" placeholder="请输入项目名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
          <el-form-item label="当前状态" prop="status">
            <el-select v-model="formData.status">
            </el-select>
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
      deviceId: {
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
          if (this._.isEmpty(this.deviceId)) {
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
          .dispatch("device/saveOne", this.formData)
          .then(id => {
            if (!this._.isEmpty(id)) {
              this.formData.deviceId = id;
            }
            this.dialogVisible = false;
            this.$emit('refresh');
            this.$message({type: "success", message: "保存成功"});
          });
      },
      defaultFormData() {
        return {
          deviceId: "",
          deviceName: "",
          deviceCode: "",
          deviceKey: "",
          accountId: "",
          contactId: "",
          contactName: "",
          contactPhone: "",
          domain: "",
          firmId: "",
          firmName: "",
          merchantId: "",
          merchantName: "",
          otaVersion: "",
          password: "",
          productCode: "",
          productId: "",
          productName: "",
          projectId: "",
          projectName: "",
          remark: "",
          status: 0
        };
      },
      loadData() {
        console.log(this.deviceId);
        this.$store
          .dispatch("device/getOne", {deviceId: this.deviceId})
          .then(result => {
            this.formData = result;
          });
      }
    }
  };
</script>
