<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <!--   企业ID  -->
      <input type="hidden" v-model="formData.firmId"/>
      <el-form-item label="客户名称" prop="firmName">
        <el-input type="text" placeholder="请输入客户名称" v-model="formData.firmName"></el-input>
      </el-form-item>
      <el-form-item label="客户代码" prop="firmCode">
        <el-input type="text" placeholder="请输入客户代码" v-model="formData.firmCode"></el-input>
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
        props: ["curNode"],
        data() {
            return {
                /*所有的可操作的角色信息*/
                transData: [],
                formData: {},
                updateTempData: {},
                transferProps: {
                    key: "roleId",
                    label: "roleName"
                },
                rules: {
                    firmName: [
                        {required: true, message: "请输入客户名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    firmCode: [
                        {required: true, message: "请输入客户代码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    domain: [
                        {required: true, message: "请输入域名", trigger: "blur"}
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
                        {required: true, message: "请输入联系人电话", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 11 个字符"
                        }
                    ],
                    email: [
                        {required: true, message: "请输入联系邮箱", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
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
                    type: 0
                };
            },
            /*清除穿梭框内的数据*/
            clearRoles() {
                this.transData = [];
            },
            clearForm() {
                this.formData = this.defaultFormData();
                this.updateTempData = {};
            },
            /*初始化表单*/
            initFormData() {
                if (this.curNode.firmName) {
                    this.formData = this.curNode;
                    Object.assign(this.updateTempData, this.curNode);
                } else {
                    this.clearForm();
                }
            },
            handleSave() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.formData.type = 2;
                        this.$emit("onSave", this.formData);
                    }
                });
            }
        },
        watch: {
            curNode() {
                this.initFormData();
            }
        },
        created() {
            this.initFormData();
        }
    };
</script>
