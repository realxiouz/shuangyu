<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="平台" prop="thirdId">
        <el-select v-model="formData.thirdId" style="width:100%;" filterable placeholder="请选择平台">
          <el-option
            v-for="item in partyList"
            :key="item.thirdId"
            :label="item.thirdName"
            :value="item.thirdId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参数标签" prop="label">
        <el-input v-model="formData.label"></el-input>
      </el-form-item>
      <el-form-item label="参数名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            thirdId: "",
            label: "",
            name: "",
            remark:""
        };
    };
    export default {
        name: 'flagParamEdit',
        data() {
            return {
                formData: defaultData(),
                partyList: [],
                rules: {
                    thirdId: [
                        {required: true, message: "请选择平台", trigger: "blur"}
                    ],
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
            thirdPartyList() {
                this.$store
                    .dispatch("thirdParty/getList", {
                        filters: {}
                    })
                    .then(data => {
                        this.partyList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created() {
            if (this.paramId) {
                this.handleGetOne(this.paramId);
            }
            this.thirdPartyList();
        },
        props: {
            paramId: String,
        }
    }
</script>
