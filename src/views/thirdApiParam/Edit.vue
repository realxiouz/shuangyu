<template>
  <div>
    <el-form ref="formData" :model="formData" label-width="120px">
      <el-form-item label="第三方平台" prop="thirdId">
        <el-select v-model="formData.thirdId" placeholder="请选择">
          <el-option
            v-for="(item,idx) in thirdPartyList"
            :key="idx"
            :label="item.thirdName"
            :value="item.thirdId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="政策" prop="apiId">
        <el-select v-model="formData.apiId" placeholder="请选择">
          <el-option
            v-for="(item, idx) in apiList"
            :key="idx"
            :label="item"
            :value="item"
          >
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
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="$emit('onSave',formData)">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "paramEdit",
    props: ["paramId"],
    data() {
      return {
        formData: {},
        thirdPartyList: [],
        apiList: [],
        /*formRules: {
          thirdId: [
            {required: true, message: "请选择第三方平台", trigger: "blur"}
          ],
          apiId: [
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
        }*/
      };
    },
    methods: {
      defaultFormData() {
        return {
          thirdId: '',
          apiId: '',
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
          .dispatch("thirdApiParam/getThirdPartyList")
          .then(data => {
            this.thirdPartyList = data;
          })
          .catch(error => {
            console.log(error);
          });
        this.$store
          .dispatch("thirdApiParam/getApiUrlList")
          .then(data => {
            this.apiList = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getOne(paramId) {
        this.$store
          .dispatch("thirdApiParam/getOne", paramId)
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
      }
    },
    created() {
      this.clearForm();
      this.initSelectData();
      if ('' != this.paramId && this.paramId != null) {
        this.getOne(this.paramId);
      }
    }
  };
</script>
