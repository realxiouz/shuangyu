<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px">
      <el-form-item label="应用名称" prop="appName">
        <el-input v-model="formData.appName"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="formData.enable" :active-value=true :inactive-value=false></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            appId: "",
            appName: "",
            enable: true
        }
    };
    export default {
        name: 'appEdit',
        data() {
            return {
                formData: defaultData(),
                rules: {
                    appName: [
                        {required: true, message: "请输入应用名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 10,
                            message: "长度在 1到 10 个字符"
                        }
                    ]
                }
            }
        },
        methods: {
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$emit('onSave', this.formData);
                    }
                });
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("app/getOne", {appId: id})
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
            if (this.appId) {
                this.handleGetOne(this.appId);
            }
        },
        props: {
            appId: String,
        }
    }
</script>
