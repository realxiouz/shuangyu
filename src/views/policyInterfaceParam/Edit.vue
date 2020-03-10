<template>
  <div>
    <el-form ref="formData" :rules="formRules" :model="formData" label-width="120px">
      <el-form-item label="第三方平台" prop="thirdId">
        <el-select v-model="formData.thirdId" placeholder="请选择">
          <el-option
            v-for="item in thirdPartys"
            :key="item.thirdId"
            :label="item.thirdName"
            :value="item.thirdId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="政策" prop="policyId">
        <el-select v-model="formData.policyId" placeholder="请选择">
          <el-option
            v-for="item in policys"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接口标签" prop="label">
        <el-input v-model="formData.label" placeholder="请输入接口标签"></el-input>
      </el-form-item>
      <el-form-item label="接口名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入接口名称"></el-input>
      </el-form-item>
      <el-form-item label="默认值" prop="defaultValue">
        <el-input v-model="formData.defaultValue" placeholder="请输入默认值"></el-input>
      </el-form-item>
      <el-form-item label="是否必须">
        <el-select v-model="formData.required" placeholder="请选择">
          <el-option
            v-for="item in requiredOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "paramEdit",
    props: ["roleId"],
    data() {
      return {
        formData: {},
        thirdPartys: [],
        policys: [],
        requiredOptions: [{
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }],
        formRules: {
          thirdId: [
            {required: true, message: "请选择第三方平台", trigger: "blur"}
          ],
          policyId: [
            {required: true, message: "请选择政策", trigger: "blur"}
          ],
          label: [
            {required: true, message: "请参数标签", trigger: "blur"}
          ],
          name: [
            {required: true, message: "请选择参数名称", trigger: "blur"}
          ],
          defaultValue: [
            {required: true, message: "请输入默认值", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      defaultFormData() {
        return {
          thirdPartys: [],
          policys: [],
          thirdId: '',
          policyId: '',
          label: '',
          name: '',
          defaultValue: '',
          required: false
        }
      },
      clearForm() {
        this.formData = this.defaultFormData();
      },
      initSelectData: function () {
        this.$store
          .dispatch("policyInterfaceParam/getThirdPartyList")
          .then(data => {
            this.thirdPartys = data;
          })
          .catch(error => {
            console.log(error);
          });
        this.$store
          .dispatch("policyInterfaceParam/getPolicyEnumList")
          .then(data => {
            this.policys = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getOne(roleID) {
        this.$store
          .dispatch("role/getOne", roleID)
          .then(data => {
            this.formData = data;
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = true;
      },
      changeSwitch() {
        this.formData.enable = this.formData.enable ? true : false;
      },
      handleSave() {
        this.$refs["formData"].validate((valid) => {
          console.log("valid"+valid)
          if (valid) {
            this.$emit("onSave", this.formData);
          }
        });
      }
    },
    created() {
      this.clearForm();
      this.initSelectData();
      if ('' != this.roleId) {
        this.getOne(this.roleId);
      }
    }
  };
</script>
