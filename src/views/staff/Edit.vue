<template>
  <div>
    <el-header>
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="addStaff"
        :disabled="staffAddVisible"
      >添 加
      </el-button>
    </el-header>
    <el-main>
      <!-- 员工列表 -->
      <el-table stripe size="mini" style="width: 100%;" fit :data="tableData">
        <el-table-column prop="nickName" label="昵称" width="170"></el-table-column>
        <el-table-column prop="fullName" label="姓名" width="165"></el-table-column>
        <el-table-column prop="gender" label="性别" width="165">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ initGender(scope.row.gender) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期" width="240" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.birthDate" class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.birthDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="220" align="center"></el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="240" align="center"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="permissionChange(scope.$index, scope.row)"
            >修改权限
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 员工查询弹窗 -->
      <el-dialog
        title="添加员工"
        width="37%"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
      >
        <el-form :inline="true" size="mini" label-width>
          <el-form-item>
            <el-input v-model="keyword" style="width:300px;" placeholder="请输入昵称进行查询..">
              <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" icon="el-icon-search" @click="searchUser"></el-button>
          </el-form-item>
        </el-form>
        <el-table :data="userTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="nickName" label="昵称" width="120"></el-table-column>
          <el-table-column prop="fullName" label="姓名" width="120"></el-table-column>
          <el-table-column prop="gender" label="性别" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="240"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSave">添 加</el-button>
        </span>
      </el-dialog>
      <!-- 权限修改弹窗 -->
      <el-dialog
        title="提示"
        width="37%"
        :visible.sync="permissionDialogVisible"
        :close-on-click-modal="false"
      >
        <el-transfer
          v-model="zombie.roles"
          :data="transData"
          :props="transferProps"
          style="margin-top: 20px"
        ></el-transfer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="permissionAlterCancel">取 消</el-button>
          <el-button type="primary" @click="permissionAlterSave">添 加</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
    export default {
        name: "staffEdit",
        props: ["curNode", "staffAddVisible"],
        data() {
            return {
                dialogVisible: false,
                permissionDialogVisible: false,
                /*点击部门后用于展示的员工列表*/
                tableData: [],
                /*选择用户后生成的列表*/
                prepares: [],
                /*待提交的员工列表*/
                prepareStaffs: [],
                /*进行用户查询后待选择的用户列表*/
                userTable: [],
                keyword: "",
                zombie: {
                    roles: []
                },
                transData: [],
                transferProps: {
                    key: "roleId",
                    label: "roleName"
                }
            };
        },
        methods: {
            /*获取该部门下的员工列表*/
            loadTableData() {
                this.$store
                    .dispatch("staff/getList", {
                        filter: {firmId: this.curNode.firmId, deptId: this.curNode.deptId}
                    })
                    .then(data => {
                        this.tableData = data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*点击添加按钮*/
            addStaff() {
                this.clearUsersTable();
                this.handleIconClick();
                this.searchUser();
                this.dialogVisible = true;
            },
            /*进行用户查询*/
            searchUser() {
                this.clearUsersTable();
                this.$store
                    .dispatch("staff/getPrepareUserList", {
                        firmId: this.curNode.firmId,
                        deptId: this.curNode.deptId,
                        filter: this.keyword ? {nickName: this.keyword, enable: true} : {}
                    })
                    .then(data => {
                        this.userTable = data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
            /*点击搜索栏里的icon*/
            handleIconClick() {
                this.keyword = "";
            },
            /*当用户列表的选择状态发生改变时调用*/
            handleSelectionChange(selection) {
                this.prepares = selection;
            },
            /*对待提交员工列表进行提交*/
            handleSave() {
                this.dialogVisible = false;
                this.initPreparesToStaff();

                this.$store
                    .dispatch("staff/addMany", this.prepareStaffs)
                    .then(data => {
                        console.log(data);
                        this.loadTableData();
                    })
                    .catch(error => {
                        console.log(error);
                    });

                //清除列表缓存
                this.clearPreparesList();
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            /*点击修改权限*/
            permissionChange(idx, row) {
                /*根据对应的企业ID和用户ID查询对应的用工对象*/
                this.$store
                    .dispatch("staff/getOneByFidAndUid", {
                        firmId: this.curNode.firmId,
                        userId: row.userId
                    })
                    .then(data => {
                        /*如果请求到的数据roles为null会报错*/
                        if (!data.data.roles) {
                            data.data.roles = [];
                        }
                        this.zombie = data.data;
                        /*if (data.data.roles && row.roles.length && data.data.roles.length < row.roles.length){
                            this.zombie.roles = row.roles;
                          }*/
                    })
                    .catch(error => {
                        console.log(error);
                    });

                this.permissionDialogVisible = true;
            },
            /*点击修改权限弹窗取消按钮*/
            permissionAlterCancel() {
                this.permissionDialogVisible = false;
            },
            /*点击修改权限弹窗保存按钮*/
            permissionAlterSave() {
                this.permissionDialogVisible = false;

                this.$store
                    .dispatch("staff/updateOne", this.zombie)
                    .then(data => {
                        console.log(data);
                        this.loadTableData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*对员工进行删除*/
            handleDelete(idx, row) {
                this.open(this.delete, row.userId);
            },
            /*根据对应用户ID*/
            delete(userID) {
                this.$store
                    .dispatch("staff/removeOne", {
                        firmId: this.curNode.firmId,
                        deptId: this.curNode.deptId,
                        userId: userID
                    })
                    .then(data => {
                        console.log(data);
                        this.loadTableData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            open(func, data) {
                this.$confirm("此操作将删除该企业信息及子企业信息, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        func(data);
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            /*初始化用工列表中的生日日期格式*/
            initDate(dateStr, format) {
                if (null != dateStr) {
                    let date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return "";
                }
            },
            /*格式化待提交员工列表*/
            initPreparesToStaff() {
                if (0 != this.prepares.length) {
                    this.prepares.forEach(item => {
                        let temp = {};
                        temp.userId = item.userId;
                        temp.firmId = this.curNode.firmId;
                        temp.depts = [this.curNode.deptId];
                        temp.roles = this.curNode.roles;

                        this.prepareStaffs.push(temp);
                    });
                }
            },
            clearTableData() {
                this.tableData = [];
            },
            clearRoles() {
                this.transData = [];
            },
            /*清空用户查询列表*/
            clearUsersTable() {
                this.userTable = [];
            },
            /*清除待提交员工列表的缓存*/
            clearPreparesList() {
                this.prepares = [];
                this.prepareStaffs = [];
            }
        },
        computed: {
            formatDate() {
                return function (dateStr, format) {
                    return this.initDate(dateStr, format);
                };
            },
            initGender() {
                return function (gender) {
                    return 0 == gender ? "男" : "女";
                };
            }
        },
        created() {
            this.loadRoles();
        },
        watch: {
            curNode() {
                this.clearTableData();
                this.loadTableData();
            }
        }
    };
</script>
