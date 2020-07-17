<template>
  <div class="page-form">
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="企业" prop="firmId" size="mini">
        <el-select
          style="width: 100%;"
          v-model="formData.firmId"
          placeholder="请选择"
          @change="changeFirm"
        >
          <el-option
            v-for="item in firmData"
            :key="item.firmId"
            :label="item.firmName"
            :value="item.firmId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台:" prop="openCode">
        <el-select
          style="width: 100%;"
          v-model="formData.openCode"
          placeholder="请选择"
          @change="changeOpen"
        >
          <el-option
            v-for="item in openData"
            :key="item.openCode"
            :label="item.openName"
            :value="item.openCode"
          ></el-option>
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
                openData: [],
                firmData: [],
                formData: defaultData(),
                rules: {
                    openCode: [
                        {required: true, message: "请选择平台", trigger: "blur"}
                    ],
                    firmId: [
                        {required: true, message: "请选择企业", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            changeFirm(code) {
                for (let i = 0, len = this.firmData.length; i < len; i++) {
                    if (code == this.firmData[i].firmId) {
                        this.formData.firmName = this.firmData[i].firmName;
                        break;
                    }
                }
            },
            changeOpen(code) {
                for (let i = 0, len = this.openData.length; i < len; i++) {
                    if (code == this.openData[i].openCode) {
                        this.formData.openName = this.openData[i].openName;
                        this.formData.openId = this.openData[i].openId;
                        break;
                    }
                }
            },
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
            /*加载当前用户的企业角色信息*/
            loadFirm() {
                this.$store
                    .dispatch("firm/getList", {})
                    .then(data => {
                        this.firmData = data;
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
            this.loadFirm();
        },
        props: {
            openId: String,
        }
    }
</script>
