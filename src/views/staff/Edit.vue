<template>
  <div>
    <el-row type="flex" justify="space-between" style="margin-bottom:20px;" align="bottom">
      <span style="font-weight:700;color:#303133;" v-if="!staffAddVisible">{{this.curNode.deptName}}</span>
      <span></span>
      <el-row>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="searchStaff"
          :disabled="staffAddVisible"
        >搜 索
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addStaff"
          :disabled="staffAddVisible"
        >添 加
        </el-button>
      </el-row>
    </el-row>
    <!-- 员工列表 -->
    <el-table
      highlight-current-row
      v-loading="loading"
      stripe
      size="mini"
      style="width: 100%;"
      fit
      :data="tableData"
    >
      <el-table-column prop="nickName" label="昵称" width="150" align="center"></el-table-column>
      <el-table-column prop="fullName" label="姓名" width="100" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ initGender(scope.row.gender) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" width="150" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.birthDate,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.userId?'success':'info'"
            :disabled="scope.row.userId?true:false"
            @click="handleAssociate(scope.row)"
          >关联用户
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="permissionChange(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog center title="关联用户" width="45%" :visible.sync="userDialogVisible" :close-on-click-modal="false">
      <el-form ref="form" :model="userData" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="昵称:">
              <span>{{userData.nickName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="姓名:">
              <span>{{userData.fullName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="性别:">
              <span>{{initGender(userData.gender) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="电话:">
              <span>{{userData.phone}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="邮箱:">
              <span>{{userData.email}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item>
              <el-button size="mini" align="center" @click="userDialogVisible = false">取 消</el-button>
              <el-button size="mini" align="center" type="primary" @click="handleSaveRelation"
              >
                确认关联
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      center
      title="员工信息"
      width="35%"
      :visible.sync="permissionDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="staffForm" :model="formData" :rules="rules" size="mini" label-width="120px">
        <!--   企业ID  -->
        <el-form-item label="员工姓名:">
          <el-input type="text" placeholder="请输入姓名" v-model="formData.fullName"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="formData.gender" placeholder="请选择性别" style="width:100%">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formData.birthDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input v-model="formData.idCardNo" @blur="isUsedForIDNo"></el-input>
          <span v-if="isExistsForIDNo" style="color: crimson">*身份证号已被使用</span>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input
            placeholder="请输入手机号码"
            v-model="formData.phone"
            maxlength="11"
            show-word-limit
            @blur="isUsedForPhone"
          ></el-input>
          <span v-if="isExistsForPhone" style="color: crimson">*手机号码已被使用</span>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email" @blur="isUsedForEmail"></el-input>
          <span v-if="isExistsForEmail" style="color: crimson">*邮箱已被使用</span>
        </el-form-item>
        <el-form-item label="角色:" prop="roles">
          <el-transfer
            v-model="formData.roles"
            :data="transData"
            :props="transferProps"
            :titles="['可选角色', '已选角色']"
          ></el-transfer>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="permissionAlterCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="permissionAlterSave">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog center title="搜索用户" width="70%" :visible.sync="searchDialogVisible" :close-on-click-modal="false">
      <el-form :inline="true" :model="searchUserForm">
        <el-form-item label="昵称:">
          <el-input clearable v-model="searchUserForm.nickName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input clearable v-model="searchUserForm.fullName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input clearable v-model="searchUserForm.phone" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input clearable v-model="searchUserForm.email" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button clearable type="primary" icon="el-icon-search" @click="handleUserSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        highlight-current-row
        v-loading="loading"
        stripe
        size="mini"
        style="width: 100%;"
        fit
        :data="searchTableData"
      >
        <el-table-column prop="nickName" label="昵称" width="150" align="center"></el-table-column>
        <el-table-column prop="fullName" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ initGender(scope.row.gender) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期" width="150" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.birthDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
        <el-table-column label="操作" width="240" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleUser(scope.row)"
            >确定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "staffEdit",
        props: ["curNode", "staffAddVisible"],
        data() {
            return {
                loading: "",
                dialogVisible: false,
                permissionDialogVisible: false,
                searchDialogVisible: false,
                tableData: [],
                userData: {},
                formData: {},
                transData: [],
                searchTableData: [],
                updateTempData: {},
                searchUserForm: {},
                transferProps: {
                    key: "roleId",
                    label: "roleName"
                },
                /*用于校验所填写的信息是否已经被使用*/
                isExistsForPhone: false,
                isExistsForIDNo: false,
                isExistsForEmail: false,
                userDialogVisible: false,
                rules: {
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur']}
                    ],
                    roles: [{required: true, message: '请选择角色', trigger: 'blur'},]
                }
            };
        },
        methods: {
            defaultFormData() {
                return {
                    staffId: "",
                    userId: "",
                    firmId: "",
                    fullName: "",
                    gender: 0,
                    birthDate: 0,
                    phone: "",
                    email: "",
                    idCardNo: "",
                    deptID: "",
                    domain: "",
                    roles: [],
                    //类型（0：员工，1：联系人）
                    staffType: 0
                };
            },
            /*获取该部门下的员工列表*/
            loadTableData(params) {
                this.loading = true;
                this.$store
                    .dispatch("staff/getList", {
                        filter: params
                            ? params
                            : {
                                deptId: this.curNode.deptId,
                                staffType: 0
                            }
                    })
                    .then(data => {
                        if (data) {
                            if (data) {
                                this.tableData = data.data;
                            }
                            this.loading = false;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            searchStaff() {
                this.searchDialogVisible = true;
            },
            handleUser(data) {
                this.permissionDialogVisible = true;
                this.formData = data;
                this.searchDialogVisible = false;
            },
            /*点击添加按钮*/
            addStaff() {
                this.clearFormData();
                this.permissionDialogVisible = true;
                this.isExistsForPhone = false;
                this.isExistsForIDNo = false;
                this.isExistsForEmail = false;
            },
            /*加载所有的角色信息*/
            loadRoles() {
                this.clearRoles();
                this.$store
                    .dispatch("role/getUserRole", {flog: 0})
                    .then(data => {
                        this.transData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleUserSearch() {
                this.$store
                    .dispatch("user/getList", {
                        filter: this.searchUserForm
                    })
                    .then(data => {
                        if (data) {
                            this.searchTableData = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*点击修改*/
            permissionChange(idx, row) {
                this.clearFormData();
                /*根据对应的员工ID查询对应的用工对象*/
                this.$store
                    .dispatch("staff/getOne", {
                        staffId: row.staffId
                    })
                    .then(data => {
                        this.loading = false;

                        /*如果请求到的数据roles为null会报错*/
                        if (!data.data.roles) {
                            data.data.roles = [];
                        }
                        this.formData = data.data;
                        Object.assign(this.updateTempData, data.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.permissionDialogVisible = true;
                this.isExistsForPhone = false;
                this.isExistsForIDNo = false;
                this.isExistsForEmail = false;
            },
            /*点击修改弹窗取消按钮*/
            permissionAlterCancel() {
                this.permissionDialogVisible = false;
            },
            /*点击修改弹窗保存按钮*/
            permissionAlterSave() {
                this.$refs['staffForm'].validate((valid) => {
                    if (valid) {
                        //对添加的员工信息进行初始化和格式化
                        if ("number" != typeof this.formData.birthDate) {
                            this.formData.birthDate = this.formData.birthDate.getTime();
                        }
                        //进行数据的保存
                        let url = "";
                        if ("" != this.formData.staffId) {
                            url = "staff/updateOne";
                        } else {
                            url = "staff/addOne";
                            this.formData.depts = [this.curNode.deptId];
                            this.formData.domain = this.curNode.domain;
                        }
                        this.$store
                            .dispatch(url, this.formData)
                            .then(() => {
                                //数据保存成功后可以关闭弹窗
                                this.permissionDialogVisible = false;
                                this.loadTableData();
                                this.clearFormData();
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        this.$message({type: "warning", message: "请完整填写数据！"});
                        return false;
                    }
                });
            },
            handleSaveRelation() {
                this.userDialogVisible = false;
                this.$store
                    .dispatch("staff/relationUser", {userId: this.userData.userId, staffId: this.userData.staffId})
                    .then(data => {
                        if (data) {
                            this.$message({
                                type: "success",
                                message: "关联成功！"
                            });
                            this.loadData();
                        } else {
                            this.$message({
                                type: "info",
                                message: "关联失败！"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleAssociate(row) {
                let params = {};
                params.phone = row.phone;
                params.email = row.email;
                this.$store
                    .dispatch("user/getFirstOne", {
                        filter: params
                    })
                    .then(data => {
                        if (data) {
                            this.userData = data;
                            this.userData.staffId = row.staffId;
                            this.userDialogVisible = true;
                        } else {
                            this.userData = {};
                            this.$message({
                                type: "info",
                                message: "没有可关联的用户!"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*对员工进行删除*/
            handleDelete(idx, row) {
                this.open(this.delete, row.staffId);
            },
            /*根据对应员工ID*/
            delete(staffId) {
                this.$store
                    .dispatch("staff/removeOne", {
                        staffId: staffId
                    })
                    .then(data => {
                        console.log(data);
                        this.loadTableData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            open(func, data, message) {
                if (!message) {
                    message = "确认要删除该数据!";
                }
                this.$confirm(message, "提示", {
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
            clearTableData() {
                this.tableData = [];
            },
            clearRoles() {
                this.transData = [];
            },
            clearFormData() {
                this.formData = this.defaultFormData();
                this.updateTempData = {};
            },
            /*校验所填写的信息是否已经被使用*/
            isUsedForPhone() {
                if (
                    !this.formData.phone ||
                    "" == this.formData.phone ||
                    this.formData.phone === this.updateTempData.phone
                ) {
                    return;
                }
                this.$store
                    .dispatch("staff/isExist", {
                        account: this.formData.phone,
                    })
                    .then(data => {
                        this.isExistsForPhone = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            isUsedForIDNo() {
                if (
                    !this.formData.idCardNo ||
                    "" == this.formData.idCardNo ||
                    this.formData.idCardNo === this.updateTempData.idCardNo
                ) {
                    return;
                }
                this.$store
                    .dispatch("staff/isExist", {
                        account: this.formData.idCardNo
                    })
                    .then(data => {
                        this.isExistsForIDNo = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            isUsedForEmail() {
                if (
                    !this.formData.email ||
                    "" == this.formData.email ||
                    this.formData.email === this.updateTempData.email
                ) {
                    return;
                }
                this.$store
                    .dispatch("staff/isExist", {
                        account: this.formData.email
                    })
                    .then(data => {
                        this.isExistsForEmail = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
            let params = {};
            this.loadTableData(params);
        },
        watch: {
            curNode() {
                this.clearTableData();
                this.loadTableData();
            }
        }
    };
</script>
