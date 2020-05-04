<template>
  <div>
    <el-row type="flex" justify="space-between" style="margin-bottom:20px;" align="bottom">
      <span style="font-weight:700;color:#303133;" v-if="!staffAddVisible">{{this.curNode.deptName}}</span>
      <span></span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="addStaff"
        :disabled="staffAddVisible"
      >添 加</el-button>
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
            @click="handleAssociate(scope.$index, scope.row)"
          >关联用户</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="permissionChange(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 员工查询弹窗 -->
    <el-dialog title="关联用户" width="37%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-table
        highlight-current-row
        size="mini"
        :data="userTable"
        style="width: 100%"
        @row-click="handleRowClick"
      >
        <el-table-column prop="nickName" label="昵称" align="center" width="120"></el-table-column>
        <el-table-column prop="fullName" label="姓名" align="center" width="120"></el-table-column>
        <el-table-column prop="gender" label="性别" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ initGender(scope.row.gender) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSave">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 权限修改弹窗 -->
    <el-dialog
      center
      title="员工信息"
      width="33%"
      :visible.sync="permissionDialogVisible"
      :close-on-click-modal="false"
    >
      <el-form size="mini" label-width="120px" v-show="hasStep">
        <!--   企业ID  -->
        <input type="hidden" v-model="formData.staffId" />
        <el-form-item label="员工姓名">
          <el-input type="text" placeholder="请输入姓名" v-model="formData.fullName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formData.gender" placeholder="请选择性别" style="width:100%">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formData.birthDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="formData.idCardNo" @blur="isUsedForIDNo"></el-input>
          <span v-if="isExistsForIDNo" style="color: crimson">*信息已被使用</span>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请输入手机号码"
            v-model="formData.phone"
            maxlength="11"
            show-word-limit
            @blur="isUsedForPhone"
          ></el-input>
          <span v-if="isExistsForPhone" style="color: crimson">*信息已被使用</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" @blur="isUsedForEmail"></el-input>
          <span v-if="isExistsForEmail" style="color: crimson">*信息已被使用</span>
        </el-form-item>
      </el-form>
      <el-transfer
        v-model="formData.roles"
        :data="transData"
        :props="transferProps"
        v-show="!hasStep"
        style="margin-top: 20px"
      ></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="permissionAlterCancel">取 消</el-button>
        <el-button v-show="hasStep" size="mini" type="primary" @click="nextStep">下一步</el-button>
        <el-button v-show="!hasStep" size="mini" type="primary" @click="prevStep">上一步</el-button>
        <el-button v-show="!hasStep" size="mini" type="primary" @click="permissionAlterSave">确 定</el-button>
      </span>
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
      /*点击部门后用于展示的员工列表*/
      tableData: [],
      //当点击用户选择列表时
      curRow: {},
      /*进行用户查询后待选择的用户列表*/
      userTable: [],
      keyword: "",
      hasStep: true,
      formData: {},
      transData: [],
      updateTempData: {},
      transferProps: {
        key: "roleId",
        label: "roleName"
      },
      /*用于校验所填写的信息是否已经被使用*/
      isExistsForPhone: false,
      isExistsForIDNo: false,
      isExistsForEmail: false
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
        type: 0
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
                firmId: this.curNode.firmId,
                deptId: this.curNode.deptId,
                type: 0
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
    /*点击添加按钮*/
    addStaff() {
      this.handleIconClick();
      this.clearFormData();
      this.hasStep = true;
      this.permissionDialogVisible = true;
      this.isExistsForPhone = false;
      this.isExistsForIDNo = false;
      this.isExistsForEmail = false;
    },
    /*进行用户查询*/
    searchUser(rowData) {
      this.clearUsersTable();
      this.$store
        // .dispatch("staff/associateUser", {filter: {phone: rowData.phone, email: rowData.email}})
        .dispatch("staff/associateUser", { filter: { email: rowData.email } })
        .then(data => {
          this.userTable.push(data.data);
        })
        .catch(error => {
          console.log(error);
          /*this.$alert(error.message, '提示', {
                confirmButtonText: '确定',
                type: "warning"
            });*/
        });
    },
    /*加载所有的角色信息*/
    loadRoles() {
      this.clearRoles();
      this.$store
        .dispatch("role/getMany")
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
    /*对待提交员工列表进行提交*/
    handleSave() {
      this.dialogVisible = false;
      this.formData.userId = this.curRow.userId;

      this.$store
        .dispatch("staff/updateOne", this.formData)
        .then(() => {
          this.loadTableData();
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCancel() {
      this.dialogVisible = false;
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
          console.log(data);
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

      this.hasStep = true;
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
      //对添加的员工信息进行初始化和格式化
      if ("number" != typeof this.formData.birthDate) {
        this.formData.birthDate = this.formData.birthDate.getTime();
      }
      //如果填写的信息未通过校验，不允许保存
      if (
        this.isExistsForPhone ||
        this.isExistsForIDNo ||
        this.isExistsForEmail
      ) {
        this.$message({
          type: "warning",
          message: "请重新填写已被使用的信息!"
        });
        return;
      }

      //进行数据的保存
      let url = "";
      if ("" != this.formData.staffId) {
        url = "staff/updateOne";
      } else {
        url = "staff/addOne";
        this.formData.firmId = this.curNode.firmId;
        this.formData.depts = [this.curNode.deptId];
        this.formData.domain = this.curNode.domain;
      }

      this.$store
        .dispatch(url, this.formData)
        .then(data => {
          console.log(data);
          //数据保存成功后可以关闭弹窗
          this.permissionDialogVisible = false;
          this.loadTableData();
          this.hasStep = true;
          this.clearFormData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAssociate(idx, row) {
      this.clearFormData();
      /*根据对应的员工ID查询对应的用工对象*/
      this.$store
        .dispatch("staff/getOne", {
          staffId: row.staffId
        })
        .then(data => {
          /*如果请求到的数据roles为null会报错*/
          if (!data.data.roles) {
            data.data.roles = [];
          }
          this.searchUser(data.data);
          this.formData = data.data;
          this.dialogVisible = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*对员工进行删除*/
    handleDelete(idx, row) {
      let message = "";
      if (0 == this.curNode.level) {
        message = "此操作将删除该员工在企业下所有部门中数据，是否继续?";
      } else {
        message = "此操作将删除员工在该部门下的数据，是否继续?";
      }
      this.open(this.delete, row.staffId, message);
    },
    //选中当前行
    handleRowClick(row) {
      this.curRow = row;
    },
    /*根据对应员工ID*/
    delete(staffId) {
      this.$store
        .dispatch("staff/removeOne", {
          deptId: this.curNode.deptId,
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
    /*是否可以点击下一步*/
    nextStep() {
      this.hasStep = false;
    },
    prevStep() {
      this.hasStep = true;
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
    /*清空用户查询列表*/
    clearUsersTable() {
      this.userTable = [];
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
          filedValue: this.formData.phone,
          deptId: this.curNode.deptId
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
          filedValue: this.formData.idCardNo,
          deptId: this.curNode.deptId
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
          filedValue: this.formData.email,
          deptId: this.curNode.deptId
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
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    },
    initGender() {
      return function(gender) {
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
