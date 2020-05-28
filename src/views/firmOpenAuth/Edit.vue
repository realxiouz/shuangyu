<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="平台:" prop="openCode">
        <el-select
          style="width: 100%;"
          v-model="formData.openCode"
          placeholder="请选择"
        >
          <el-option
            v-for="item in openData"
            :key="item.openCode"
            :label="item.openName"
            :value="item.openCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="openName" size="mini">
        <el-input v-model="formData.openName"></el-input>
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
                openData: [],
                formData: defaultData(),
                rules: {
                    openCode: [
                        {required: true, message: "请输入平台编码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ]
                }
            }
        },
        methods: {
            /*加载当前用户的企业角色信息*/
            loadOpenPlatform() {
                this.$store
                    .dispatch("openPlatform/getList", {})
                    .then(data => {
                        this.openData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
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
                        .dispatch("firmOpenAuth/getOne", {id: id})
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
            this.loadOpenPlatform();
        },
        props: {
            openId: String,
        }
    }
</script>
