<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="科目编码:" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="科目名称:"  prop="name">
        <el-input v-model.number="formData.name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
function defaultData() {
  return {
    code: "",
    ddId: "",
    ddParentIdId: ""
  };
}
export default {
  name: "accountSubjectEdit",
  data() {
    return {
      formData: defaultData(),
      firmList: [],
      newDialogVisible: false,
      rules: {
        code: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          }
        ],
          name: [
          { required: true, message: "请输入域名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          }
        ],
        ddId: [
          { required: true, message: "请输入钉钉ID", trigger: "blur" },
          {
            type: "number",
            message: "钉钉ID必须为数字",
            trigger: "blur"
          }
        ],
        ddParentIdId: [
          { required: true, message: "请输入钉钉父节点", trigger: "blur" },
          {
            type: "number",
            message: "钉钉父节点必须为数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleChange(value) {
      this.formData.roles = value;
    },
    handleGetOne(id) {
      if (id) {
        this.$store
          .dispatch("accountSubject/getOne", { deptId: id })
          .then(data => {
            this.formData = data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.formData = defaultData();
      }
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("onSave", this.formData);
        }
      });
    }
  },
  created() {
    if (this.editSubjectId) {
      this.handleGetOne(this.editSubjectId);
    }
    if (this.pid) {
      this.formData.pid = this.pid;
    }
  },
  props: {
      editSubjectId: String,
    pid: String
  }
};
</script>
