<template>
  <div class="page-form">
    <el-form ref="formData" :rules="formRules" :model="formData" size="mini" label-width="120px">
      <el-form-item label="平台名称" prop="openName">
        <el-input v-model="formData.openName" placeholder="请输入平台名称.."></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactPerson">
        <el-input v-model="formData.contactPerson" placeholder="请输入联系人.."></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactPhone">
        <el-input v-model="formData.contactPhone" placeholder="请输入联系电话.."></el-input>
      </el-form-item>
      <el-form-item label="联系邮箱" prop="contactEmail">
        <el-input v-model="formData.contactEmail" placeholder="请输入联系邮箱.."></el-input>
      </el-form-item>
<!--      <el-form-item label="平台类别" prop="category">-->
<!--        <el-select v-model="formData.category" placeholder="请选择平台类别.." style="width: 100%">-->
<!--          <el-option label="平台" :value=0></el-option>-->
<!--          <el-option label="单位" :value=1></el-option>-->
<!--          <el-option label="个人" :value=2></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
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
            openName: "",
            contactPerson: '',
            contactPhone: '',
            contactEmail: '',
            category: 0
        };
    }

    export default {
        name: "openEdit",
        data() {
            const validateMobile = (rule, value, callback) => {
                let mobile_mode = /^1[34578]\d{9}$/;
                if (!value) {
                    callback(new Error("请输入手机号"));
                } else if (!mobile_mode.test(value)) {
                    callback(new Error("您输入的手机号码格式不正确"));
                } else {
                    callback();
                }
            };
            const validateEmail = (rule, value, callback) => {
                let email_mode = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                if (!value) {
                    callback(new Error("请输入邮箱号"));
                } else if (!email_mode.test(value)) {
                    callback(new Error("您输入的邮箱格式错误！"));
                } else {
                    callback();
                }
            };
            return {
                formData: defaultData(),
                formRules: {
                    openName: [
                        {required: true, message: "请输入平台名称", trigger: "blur"}
                    ],
                    contactPhone: [
                        {required: true, validator: validateMobile, trigger: "blur"}
                    ],
                    contactEmail: [
                        {required: true, validator: validateEmail, trigger: "blur"}
                    ],
                    contactPerson: [
                        {required: true, message: "请输入联系人", trigger: "blur"}
                    ],
                    category: [
                        {required: true, message: "请选择平台类别", trigger: "blur"}
                    ]
                }
            };
        },
        methods: {
            loadData() {
                if ("" != this.openId) {
                    this.$store
                        .dispatch("open/getOne", {openId: this.openId})
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
                this.$emit("onSave", this.formData);
            }
        },
        created() {
            this.loadData();
        },
        props: {
            openId: String
        }
    };
</script>

<style scoped>
</style>
