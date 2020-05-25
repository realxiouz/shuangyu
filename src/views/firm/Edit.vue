<template>
  <div>
    <el-form ref="form" :rules="formRules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="企业名称" prop="firmName">
        <el-input type="text" placeholder="请输入企业名称" v-model="formData.firmName"></el-input>
      </el-form-item>
      <el-form-item label="企业代码" prop="firmCode">
        <el-input type="text" placeholder="请输入企业代码" v-model="formData.firmCode"></el-input>
      </el-form-item>
      <el-form-item label="域名" prop="domain">
        <el-input type="text" placeholder="请输入域名" v-model="formData.domain"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="fullName">
        <el-input type="text" placeholder="请输入联系人" v-model="formData.fullName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input type="text" v-model="formData.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input type="text" v-model="formData.email" placeholder="请输入联系电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input type="text" placeholder="请输入联系地址" v-model="formData.address"></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="roles">
        <el-select
          style="width: 100%;"
          clearable
          multiple
          v-model="formData.roles"
          placeholder="请选择"
        >
          <el-option
            v-for="item in roleData"
            :key="item.roleName"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top:10px;text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        /*当前进行操作的企业节点*/
        props: {
            editFirmId: String,
            pid: String
        },
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
            const codeValidator = (rule, value, callback) => {
                let reg = /^[0-9a-zA-Z]*$/g;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error("只能输入字母或数字！"));
                }
            };
            return {
                /*所有的可操作的角色信息*/
                transData: [],
                formData: {},
                updateTempData: {},
                roleData: [],
                formRules: {
                    firmName: [
                        {required: true, message: "请输入企业名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    firmCode: [
                        {required: true, message: "请输入企业代码", trigger: "blur"},
                        {
                            min: 1,
                            max: 30,
                            message: "长度在 1到30 个字符"
                        },
                        {validator: codeValidator, trigger: 'blur'}
                    ],
                    domain: [
                        {required: true, message: "请输入域名", trigger: "blur"},
                        {
                            min: 1,
                            max: 30,
                            message: "长度在 1到 30 个字符"
                        },
                        {validator: codeValidator, trigger: 'blur'}
                    ],
                    fullName: [
                        {required: true, message: "请输入联系人", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    phone: [
                        {required: true, validator: validateMobile, trigger: "blur"}
                    ],
                    email: [
                        {required: true, validator: validateEmail, trigger: "blur"}
                    ],
                }
            };
        },
        methods: {
            defaultFormData() {
                return {
                    firmId: "",
                    firmName: "",
                    firmCode: "",
                    fullName: "",
                    phone: "",
                    email: "",
                    address: "",
                    deleteFlag: true,
                    domain: "",
                    type: 0,
                    roles: []
                };
            },
            clearForm() {
                this.formData = this.defaultFormData();
                this.updateTempData = {};
            },
            handleSave() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.formData.type = 0;
                        this.$emit("onSave", this.formData);
                    }
                });
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("firm/getOne", {firmId: id})
                        .then(data => {
                            this.formData = data;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.formData = this.defaultFormData();
                }
            },
            clearRoles() {
                this.roleData = [];
            },
            /*加载当前用户的企业角色信息*/
            loadRoles() {
                this.clearRoles();
                this.$store
                    .dispatch("role/getUserRole", {flog: 1})
                    .then(data => {
                        this.roleData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created() {
            if (this.editFirmId) {
                this.handleGetOne(this.editFirmId);
            }
            if (this.pid) {
                this.formData.pid = this.pid;
            }
            this.loadRoles();
        }
    };
</script>
