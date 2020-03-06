<template>
  <div>

<!--    -->

<!--    -->

      <el-form ref="form" :rules="rules" :model="formData" label-width="110px">
        <el-form-item label="Api名称" prop="apiName">
          <el-input v-model="formData.apiName"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="uri">
          <el-input v-model="formData.uri"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-input v-model="formData.category"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="formData.enable" :active-value=true :inactive-value=false></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('onCancel')">取 消</el-button>
        <el-button type="primary"   @click="$emit('onSave',formData)">确 定</el-button>
      </div>

  </div>
</template>
<script>

    // eslint-disable-next-line no-unused-vars

    function defaultData() {
      return{
        apiId: '',
        apiName: "",
        uri: "",
        enable: true,
        category: "",
      };
    };
    export default {
        name: 'apiEdit',

        data() {
            return {
                formData: defaultData(),
                rules: {
                    apiName: [
                        {required: true, message: "请输入api名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1到 10 个字符'
                        }
                    ],
                    uri: [
                        {required: true, message: "请输入uri", trigger: "blur"}
                    ],
                    category: [
                        {required: true, message: "请输入类别", trigger: "blur"},
                        {
                            min: 1,
                            max: 10,
                            message: '长度在 1到 10 个字符'
                        }
                    ]
                }
            };
        },

        methods: {


        },

    };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
