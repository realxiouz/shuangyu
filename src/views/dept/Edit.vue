<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="90px">
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="formData.deptName"></el-input>
      </el-form-item>
      <el-form-item label="企业" prop="firmId">
        <el-input v-model="formData.firmId"></el-input>
      </el-form-item>
      <el-form-item label="域名" prop="domain">
        <el-input v-model="formData.domain"></el-input>
      </el-form-item>
      <el-form-item label="钉钉Id" prop="ddId">
        <el-input v-model.number="formData.ddId"></el-input>
      </el-form-item>
      <el-form-item label="钉钉父节点" prop="ddParentIdId">
        <el-input v-model.number="formData.ddParentIdId"></el-input>
      </el-form-item>
      <template>
        <el-transfer
          :titles="['全部角色', '已选角色']"
          filter-placeholder="角色名称"
          v-model="formData.roles"
          @change="handleChange"
          :props="{ key: 'roleId',label: 'roleName' }"
          :data="allRoles">
        </el-transfer>
      </template>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            deptName: "",
            firmId: "",
            domain: "",
            ddId: "",
            ddParentIdId: "",
            roles: []
        }
    };
    export default {
        name: 'deptEdit',
        data() {
            return {
                formData: defaultData(),
                allRoles: [],
                paramsRoles: [],
                newDialogVisible: false,
                rules: {
                    deptName: [
                        {required: true, message: "请输入部门名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: '长度在 1到 20 个字符'
                        }
                    ],
                    firmId: [
                        {required: true, message: "请输入企业", trigger: "blur"}
                    ],
                    domain: [
                        {required: true, message: "请输入域名", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: '长度在 1到 20 个字符'
                        }
                    ],
                    ddId: [
                        {required: true, message: "请输入钉钉ID", trigger: "blur"},
                        {
                            type: 'number',
                            message: '钉钉ID必须为数字',
                            trigger: 'blur'
                        }
                    ],
                    ddParentIdId: [
                        {required: true, message: "请输入钉钉父节点", trigger: "blur"},
                        {
                            type: 'number',
                            message: '钉钉父节点必须为数字',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        methods: {
            loadRoles() {
                this.$store
                    .dispatch("role/getRoleList")
                    .then(data => {
                        this.allRoles = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleChange(value) {
                this.formData.roles = value;
            },
            handleGetOne(deptId) {
                if (deptId) {
                    this.$store
                        .dispatch("dept/getOne", deptId)
                        .then(data => {
                            this.formData = data;
                        }).catch(error => {
                        console.log(error);
                    });
                } else {
                    this.formData = defaultData();
                }
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (this.paramsRoles && this.paramsRoles.length > 0) {
                            this.formData.roles = this.paramsRoles;
                        }
                        this.$emit('onSave', this.formData);
                    }
                });
            }
        },
        created() {
            this.loadRoles();
            if (this.editDeptId) {
                this.handleGetOne(this.editDeptId);
            }
            if (this.pid) {
                this.formData.pid = this.pid;
            }
        },
        props: {
            editDeptId: String,
            pid: String
        }
    }

</script>
