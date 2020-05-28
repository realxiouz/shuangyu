<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="平台名称" prop="openName" size="mini">
        <el-input v-model="formData.openName"></el-input>
      </el-form-item>
      <el-form-item label="平台编码" prop="openCode" size="mini">
        <el-input v-model="formData.openCode"></el-input>
      </el-form-item>
      <el-form-item label="平台类型" prop="openType">
        <el-select v-model="formData.openType" placeholder="请选择平台类型" style="width: 50%">
          <el-option label="客户" :value=-1></el-option>
          <el-option label="客户/供应商" :value=0></el-option>
          <el-option label="供应商" :value=1></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            openName: "",
            openCode: "",
            openType: null
        }
    };
    export default {
        name: 'edit',
        data() {
            return {
                formData: defaultData(),
                rules: {
                    openName: [
                        {required: true, message: "请输入平台名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    openCode: [
                        {required: true, message: "请输入平台编码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    openType: [
                        {required: true, message: "请x选择平台类型", trigger: "blur"}
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
                        .dispatch("openPlatform/getOne", {id: id})
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
            if (this.openId) {
                this.handleGetOne(this.openId);
            }
        },
        props: {
            openId: String,
        }
    }
</script>
