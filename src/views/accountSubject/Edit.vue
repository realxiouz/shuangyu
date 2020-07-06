<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="科目编码:" prop="code">
        <el-input
          v-model="formData.code"
          onkeyup="this.value=this.value.toUpperCase()"
          placeholder="请输入科目编码..."
          :disabled="codeEnabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="科目名称:" prop="name">
        <el-input v-model.number="formData.name" placeholder="请输入科目名称..."></el-input>
      </el-form-item>
      <el-form-item label="科目类别:" prop="category">
        <el-select v-model="formData.category" placeholder="请选择科目类别" disabled style="width: 100%">
          <el-option label="资产类" :value="0"></el-option>
          <el-option label="负债类" :value="1"></el-option>
          <el-option label="权益类" :value="2"></el-option>
          <el-option label="成本类" :value="3"></el-option>
          <el-option label="损益类" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有效:">
        <el-switch v-model="formData.enable" @change="handleSwitch"></el-switch>
      </el-form-item>
      <el-form-item label="余额方向:" prop="balanceDirection">
        <el-radio-group v-model="formData.balanceDirection">
          <el-radio :label="0">借</el-radio>
          <el-radio :label="1">贷</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formData.quantityFinancing">数量核算</el-checkbox>
        <span style="margin-left: 40px">
          <el-checkbox v-model="formData.addable" style="margin-right: 10px">可新增</el-checkbox>
          <el-checkbox v-model="formData.editable" style="margin: 0 10px 0 0">可修改</el-checkbox>
          <el-checkbox v-model="formData.deletable" disabled style="margin: 0 10px 0 0">可删除</el-checkbox>
        </span>
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
            name: "",
            category: 0,
            balanceDirection: 0,
            quantityFinancing: false,
            auxiliaryFinancing: false,
            cnurrencyFinancing: false,
            enable: true,
            addable: true,
            editable: true,
            deletable: true
        };
    }

    export default {
        name: "accountSubjectEdit",
        props: ['editSubjectId', 'pid', 'category', 'codeEnabled'],
        data() {
            const codeValidator = (rule, value, callback) => {
                let reg = /^[0-9a-zA-Z]*$/g;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error("只能输入字母或数字！"));
                }
            };
            return {
                formData: defaultData(),
                firmList: [],
                newDialogVisible: false,
                rules: {
                    code: [
                        {required: true, message: "请输入科目编码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        },
                        {validator: codeValidator, trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: "请输入科目名称", trigger: "blur"},
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
            handleGetOne(subjectId) {
                if (subjectId) {
                    this.$store
                        .dispatch("accountSubject/getOne", {subjectId: subjectId})
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
                        this.formData.category = this.category;
                        this.formData.code = this.formData.code.toUpperCase();
                        this.$emit("onSave", this.formData);
                    }
                });
            },
            handleSwitch(){
                this.enable = !this.enable;
            }
        },
        created() {
            if (this.editSubjectId) {
                this.handleGetOne(this.editSubjectId);
            }
            if (this.pid) {
                this.formData.pid = this.pid;
            }
            this.formData.category = this.category;
        }
    };
</script>
