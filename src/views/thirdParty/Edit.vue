<template>
  <div>
    <el-form ref="formData" :rules="formRules" :model="formData" label-width="110px">
      <el-form-item label="第三方平台名称" prop="thirdName">
        <el-input v-model="formData.thirdName" placeholder="请输入平台名称"></el-input>
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
            thirdName: ""
        };
    };
    export default {
        name: "thirdPartyEdit",
        props: ["thirdId"],
        data() {
            return {
                formData: defaultData(),
                formRules: {
                    thirdName: [
                        {required: true, message: "请输入平台名称", trigger: "blur"}
                    ]
                }
            };
        },
        methods: {
            loadData() {
                if ('' != this.thirdId) {
                    this.$store
                        .dispatch("thirdParty/getOne", {thirdId: this.thirdId})
                        .then(data => {
                            this.formData = data;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    this.dialogVisible = true;
                }
            },
            handleSave() {
                this.$refs["formData"].validate((valid) => {
                    if (valid) {
                        this.$emit("onSave", this.formData);
                    }
                });
            }
        },
        created() {
            this.loadData();
        }
    };
</script>

<style scoped>

</style>
