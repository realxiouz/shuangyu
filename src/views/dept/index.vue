<template>
  <div class="dept-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="部门名称">
        <el-input v-model="searchForm.deptName" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="deptId"
              border
              :tree-props="{children: 'children', hasChildren: 'test'}"
    >
      <el-table-column
        prop="deptName"
        label="部门名称"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="firmId"
        label="企业"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="ddId"
        label="钉钉Id"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="ddParentIdId"
        label="钉钉父节点"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="domain"
        label="域名"
        width="250"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleAddChild(scope.row.deptId)" type="success" size="mini">添加子级</el-button>
          <el-button @click="handleUpdate(scope.row.deptId)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="handleRemove(scope.row.deptId)" type="danger"
                     size="mini">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <el-dialog title="部门信息" :visible.sync="dialogVisible" width="30%">
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
            filterable
            :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
          }"
            :titles="['角色', '已选角色']"
            filter-placeholder="角色名称"
            v-model="formData.roles"
            :props="{ key: 'roleId',label: 'roleName'}"
            :data="allRoles">
            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small" @click="test">测试</el-button>
          </el-transfer>
        </template>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>

    const defaultData = {
        deptName: "",
        firmId: "",
        domain: "",
        ddId: "",
        ddParentIdId: "",
        roles: []
    };
    export default {
        name: "dept",
        data() {
            return {
                searchForm: {},
                lastId: "0",
                pageFlag: "next",
                pageSize: 10,
                formData: defaultData,
                dialogVisible: false,
                total: 0,
                tableData: null,
                allRoles: [],
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
            };
        },
        methods: {
            test() {
                console.log(this.roles);
                console.log(this.formData.roles);
            },
            filterRoles() {
            },
            prevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].deptId;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].deptId;
                this.loadData();
            },
            loadData() {
                if (!this.searchForm.deptName) {
                    this.searchForm = {};
                }
                this.$store
                    .dispatch("dept/getList",
                        this.searchForm
                    ).then(data => {
                    console.log(data)
                    if (data) {
                        this.tableData = data;
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
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
            loadTotal: function () {
                if (!this.searchForm.deptName) {
                    this.searchForm = {};
                }
                this.$store
                    .dispatch("dept/getTotal", {
                        filter: this.searchForm
                    }).then(response => {
                    this.total = response.data;
                }).catch(error => {
                    console.log(error);
                });
            },
            handleAddChild(deptId) {
                this.formData.pid = deptId;
                this.loadRoles();
                this.dialogVisible = true;
            },
            handleAdd() {
                this.formData = defaultData;
                this.loadRoles();
                this.dialogVisible = true;
            },
            handleSearch() {
                this.loadData();
                this.loadTotal();
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store
                            .dispatch("dept/save", this.formData)
                            .then(() => {
                                this.handleSearch();
                            }).catch(error => {
                            console.log(error);
                        });
                        this.dialogVisible = false;
                    }
                })
            },
            handleUpdate(deptId) {
                this.$store
                    .dispatch("dept/getOne", deptId)
                    .then(data => {
                        this.formData = data;
                        this.dialogVisible = true;
                    }).catch(error => {
                    console.log(error);
                });
                this.loadRoles();
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            handleRemove(id) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$store
                        .dispatch("dept/removeOne", id)
                        .then(() => {
                            this.loadData();
                        });
                }).catch(err => {
                    console.error(err);
                });
            }
        },
        mounted() {
            this.handleSearch();
        }
    };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
