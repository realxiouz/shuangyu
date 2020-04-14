<template>
  <div>
    <el-form size="mini" label-width="120px" v-show="hasStep">
      <!--   企业ID  -->
      <input type="hidden" v-model="formData.firmId"/>
      <el-form-item label="企业名称">
        <el-input type="text" placeholder="请输入企业名称" v-model="formData.firmName"></el-input>
      </el-form-item>
      <el-form-item label="企业代码">
        <el-input type="text" placeholder="请输入企业代码" v-model="formData.firmCode"></el-input>
      </el-form-item>
      <el-form-item label="域名">
        <el-input type="text" placeholder="请输入域名" v-model="formData.domain"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input type="text" placeholder="请输入联系人" v-model="formData.fullName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input type="text" v-model="formData.phone" placeholder="请输入联系电话" @blur="isUsedForPhone"></el-input>
        <span v-if="isExistsForPhone" style="color: crimson">*该信息已被注册</span>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input type="text" v-model="formData.email" placeholder="请输入联系电子邮箱" @blur="isUsedForEmail"></el-input>
        <span v-if="isExistsForEmail" style="color: crimson">*该信息已被注册</span>
      </el-form-item>
      <el-form-item label="机构所在地">
        <el-input type="text" placeholder="请输入机构所在地" v-model="formData.location"></el-input>
      </el-form-item>
      <el-form-item label="行政区代码">
        <el-input type="text" placeholder="请输入行政区代码" v-model="formData.districtCode"></el-input>
      </el-form-item>
      <el-form-item label="行政区">
        <el-input type="text" placeholder="请输入行政区" v-model.number="formData.distinct"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-transfer
        style="text-align: left; display: inline-block"
        v-model="formData.roles"
        :data="transData"
        :props="transferProps"
        v-show="!hasStep"
        :titles="['未分配列表', '已分配列表']"
      />
    </div>
    <div slot="footer" class="dialog-footer" style="margin-top:10px;text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button v-show="hasStep" size="mini" type="primary" @click="nextStep">下一步</el-button>
      <el-button v-show="!hasStep" size="mini" type="primary" @click="prevStep">上一步</el-button>
      <el-button v-show="!hasStep" size="mini" type="primary" @click="handleSave">确 定</el-button>
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
                hasStep: true,
                updateTempData: {},
                /*用于校验所填写的信息是否已经被使用*/
                isExistsForPhone: false,
                isExistsForEmail: false,
                transferProps: {
                    key: "roleId",
                    label: "roleName"
                }
            };
        },
        methods: {
            defaultFormData() {
                return {
                    firmId: "",
                    firmName: "",
                    firmCode: "",
                    location: "",
                    districtCode: "",
                    distinct: null,
                    fullName: "",
                    phone: "",
                    email: "",
                    deleteFlag: true,
                    domain: "",
                    type: 0,
                    roles: []
                };
            },
            /*加载所有的角色信息*/
            loadRoles() {
                this.clearRoles();
                this.$store
                    .dispatch("role/getAll", {})
                    .then(data => {
                        this.transData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            nextStep() {
                this.hasStep = false;
            },
            prevStep() {
                this.hasStep = true;
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
                this.hasStep = true;
                this.initChecked();
                if (this.curNode.firmName) {
                    this.formData = this.curNode;
                    Object.assign(this.updateTempData, this.curNode);
                } else {
                    this.clearForm();
                }
                this.loadRoles();
            },
            //重置校验
            initChecked() {
                this.isExistsForPhone = false;
                this.isExistsForEmail = false;
            },
            handleSave() {
                if (this.isExistsForPhone || this.isExistsForEmail) {
                    return;
                } else {
                    this.formData.type = 0;
                    this.$emit("onSave", this.formData);
                }
            },
            /*校验所填写的信息是否已经被使用*/
            isUsedForPhone() {
                if (!this.formData.phone || "" == this.formData.phone || this.formData.phone === this.updateTempData.phone) {
                    return;
                }
                this.$store
                    .dispatch("staff/isExist", {
                        filedValue: this.formData.phone,
                        deptId: null
                    })
                    .then(data => {
                        this.isExistsForPhone = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            isUsedForEmail() {
                if (!this.formData.email || "" == this.formData.email || this.formData.email === this.updateTempData.email) {
                    return;
                }
                this.$store
                    .dispatch("staff/isExist", {
                        filedValue: this.formData.email,
                        deptId: null
                    })
                    .then(data => {
                        this.isExistsForEmail = data;
                    })
                    .catch(error => {
                        console.log(error);
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
