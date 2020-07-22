<template>
  <div class="page-form">
    <el-dialog :title="keyId!=''?'编辑部门信息':'添加部门信息'" :visible.sync="dialogVisible" @open="onOpen" @close="onClose" width="30%">
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="部门名称:" prop="deptName">
        <el-input v-model="formData.deptName"></el-input>
      </el-form-item>
      <el-form-item label="钉钉Id:">
        <el-input v-model.number="formData.ddId"></el-input>
      </el-form-item>
      <el-form-item label="钉钉父节点:">
        <el-input v-model.number="formData.ddParentIdId"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="onSave">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
    import {MIXIN_EDIT} from "@/utils/mixin";
    function defaultData() {
        return {
            deptName: "",
            ddId: "",
            ddParentIdId: "",
        };
    }

    export default {
        mixins: [MIXIN_EDIT],
        name: "deptEdit",
        data() {
            return {
                formData: defaultData(),
                firmList: [],
                newDialogVisible: false,
                actions: {
                    getOne: 'dept/getOne',
                    saveOne: 'dept/updateOne'
                },
                rules: {
                    deptName: [
                        {required: true, message: "请输入部门名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    domain: [
                        {required: true, message: "请输入域名", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    ddId: [
                        {required: true, message: "请输入钉钉ID", trigger: "blur"},
                        {
                            type: "number",
                            message: "钉钉ID必须为数字",
                            trigger: "blur"
                        }
                    ],
                    ddParentIdId: [
                        {required: true, message: "请输入钉钉父节点", trigger: "blur"},
                        {
                            type: "number",
                            message: "钉钉父节点必须为数字",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
            loadFirms() {
                this.$store
                    .dispatch("firm/getTreeList", {
                        filters: {}
                    })
                    .then(data => {
                        this.firmList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleChange(value) {
                this.formData.roles = value;
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("dept/getOne", {deptId: id})
                        .then(data => {
                            this.formData = data;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.formData = defaultData();
                }
            },
            handleSave() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.$emit("onSave", this.formData);
                    }
                });
            }
        },
        created() {
            this.loadFirms();
            if (this.editDeptId) {
                this.handleGetOne(this.editDeptId);
            }
            if (this.pid) {
                this.formData.pid = this.pid;
                this.formData.deptType = 0;
            }
        },
        props: {
            editDeptId: String,
            pid: String
        }
    };
</script>
