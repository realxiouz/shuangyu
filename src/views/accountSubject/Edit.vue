<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="科目编码:" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="科目名称:" prop="name">
        <el-input v-model.number="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="科目类别:" prop="category">
        <el-select clearable v-model="formData.category" placeholder="全部" style="width: 100%">
          <el-option label="资产类" value="0"></el-option>
          <el-option label="负债类" value="1"></el-option>
          <el-option label="权益类" value="2"></el-option>
          <el-option label="成本类" value="3"></el-option>
          <el-option label="损益类" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="余额方向:" prop="balanceDirection">
        <el-radio-group v-model="formData.balanceDirection" style="width: 100%">
          <el-radio label="0">借</el-radio>
          <el-radio label="1">贷</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label>
        <el-checkbox v-model="formData.quantityFinancing">数量核算</el-checkbox>
      </el-form-item>
      <el-form-item label>
        <el-checkbox v-model="formData.auxiliaryFinancing">辅助核算</el-checkbox>
      </el-form-item>
      <el-form-item label>
        <el-checkbox v-model="formData.cnurrencyFinancing">外币核算</el-checkbox>
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
    ddParentIdId: "",
    name: "",
    category: "",
    balanceDirection: "",
    quantityFinancing: "",
    auxiliaryFinancing: "",
    cnurrencyFinancing: ""
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
