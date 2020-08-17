<template>
  <div class="page-form">
    <el-dialog :title="keyId ?'编辑Api信息':'添加Api'" width="50%" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="Api名称:" prop="apiName">
        <el-input v-model="formData.apiName"></el-input>
      </el-form-item>
      <el-form-item label="URL:" prop="uri">
        <el-input v-model="formData.uri"></el-input>
      </el-form-item>
      <el-form-item label="类别:" prop="category">
        <el-input v-model="formData.category"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right;">
      <el-button size="mini" @click="dialogVisible=false">取 消</el-button>
      <el-button size="mini" type="primary" @click="onSave">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import {MIXIN_EDIT} from "@/utils/mixin";
function defaultData() {
  return {
    apiId: "",
    uri: "",
    enable: true,
    category: ""
  };
}
export default {
  name: "apiEdit",
  mixins: [MIXIN_EDIT],
  data() {
    return {
      formData: defaultData(),
      rules: {
        apiName: [
          { required: true, message: "请输入api名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1到 10 个字符"
          }
        ],
        uri: [{ required: true, message: "请输入uri", trigger: "blur" }],
        category: [
          { required: true, message: "请输入类别", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1到 10 个字符"
          }
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      actions:{
        getOne: 'api/getOne',
          saveOne: 'api/saveOne'
      }
    };
  },

  methods: {
    
    handleGetOne(id) {
      if (id) {
        this.$store
          .dispatch("api/getOne", { id: id })
          .then(data => {
            this.formData = data;
            this.dialogVisible = true;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.formData = defaultData();
      }
    }
  },
  created() {
    if (this.apiId) {
      this.handleGetOne(this.apiId);
    }
  },
  props: {
    apiId: String
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
