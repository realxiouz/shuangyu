<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px">
      <el-form-item label="参数标签" prop="label">
        <el-input v-model="formData.label"></el-input>
      </el-form-item>
      <el-form-item label="参数名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="参数值" prop="value">
        <el-input v-model="formData.value"></el-input>
      </el-form-item>
      <el-form-item label="参数分组" prop="group">
        <el-input v-model="formData.group"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            label: "",
            name: "",
            value: "",
            group: ""
        };
    };
    export default {
        name: 'flagParamEdit',
        data() {
            return {
                formData: defaultData(),
                partyList: [],
                rules: {
                    label: [
                        {required: true, message: "请输入参数标签", trigger: "blur"},
                    ],
                    name: [
                        {required: true, message: "请输入参数名称", trigger: "blur"},
                    ]
                }
            }
        },
        methods: {
            handleSave() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        this.$emit("onSave", this.formData);
                    }
                });
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("policyFlagParam/getOne", {paramId: id})
                        .then(data => {
                            this.formData = data;
                            this.dialogVisible = true;
                        }).catch(error => {
                        console.log(error);
                    });
                } else {
                    this.formData = defaultData();
                }
            },
        },
        created() {
            if (this.paramId) {
                this.handleGetOne(this.paramId);
            }
        },
        props: {
            paramId: String,
        }
    }
</script>
