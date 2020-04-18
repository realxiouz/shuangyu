<template>
  <div>
    <el-form ref="formData" :model="formData" label-width="110px" size="mini">
      <el-form-item label="第三方平台:" prop="openId">
        <el-select v-model="formData.openId" placeholder="请选择" style="width:100%">
          <el-option
            v-for="(item,idx) in openPartyList"
            :key="idx"
            :label="item.openName"
            :value="item.openId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="政策:" prop="apiId">
        <el-select v-model="formData.apiId" placeholder="请选择" style="width:100%">
          <el-option
            v-for="(item, idx) in apiList"
            :key="idx"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接口标签:" prop="label">
        <el-input v-model="formData.label" placeholder="请输入接口标签"></el-input>
      </el-form-item>
      <el-form-item label="接口名称:" prop="name">
        <el-input v-model="formData.name" placeholder="请输入接口名称"></el-input>
      </el-form-item>
      <el-form-item label="默认值:" prop="defaultValue">
        <el-input v-model="formData.defaultValue" placeholder="请输入默认值"></el-input>
      </el-form-item>
      <el-form-item label="是否必须:" >
        <el-select v-model="formData.required" placeholder="请选择" style="width:100%">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input type="textarea" :rows="3" v-model="formData.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="$emit('onSave',formData)">确 定</el-button>
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
        openPartyList: [],
        apiList: [],
        /*formRules: {
          openId: [
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
          openId: '',
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
          .dispatch("openApiParam/getThirdPartyList")
          .then(data => {
            this.openPartyList = data;
          })
          .catch(error => {
            console.log(error);
          });
        this.$store
          .dispatch("openApiParam/getApiUrlList")
          .then(data => {
            this.apiList = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getOne(paramId) {
        this.$store
          .dispatch("openApiParam/getOne", paramId)
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
