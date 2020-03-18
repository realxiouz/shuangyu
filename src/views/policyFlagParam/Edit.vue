<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px">
      <el-form-item label="平台" prop="thirdId">
        <el-select v-model="formData.thirdId" filterable placeholder="请选择平台">
          <el-option
            v-for="item in partyList"
            :key="item.thirdId"
            :label="item.thirdName"
            :value="item.thirdId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="flag">
        <el-input v-model="formData.flag"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="formData.enable" :active-value=true :inactive-value=false></el-switch>
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
            thirdId: "",
            flag: ""
        };
    };
    export default {
        name: 'flagParamEdit',
        data() {
            return {
                formData: defaultData(),
                partyList:[],
                rules: {
                    thirdId: [
                        {required: true, message: "请选择平台", trigger: "blur"},
                    ],
                    flag: [
                        {required: true, message: "请输入标签名称", trigger: "blur"},
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
                        .dispatch("policyFlagParam/getOne", {flagId: id})
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
            if (this.flagId) {
                this.handleGetOne(this.flagId);
            }
        },
        props: {
            flagId: String,
        }
    }
</script>
