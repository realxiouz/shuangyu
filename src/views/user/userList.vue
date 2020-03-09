<template>
  <div class="app-container">
    <userSearch ref="search" @onSearch="handleSearch" @onAdd="handleAdd"></userSearch>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
      <el-table-column
        prop="nickName"
        label="昵称"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="fullName"
        label="姓名"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        label="性别"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span>{{ initGender(scope.row.gender) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="出生日期"
        width="150"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.birthDate" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.birthDate,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="电子邮箱"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="idCardNo"
        label="身份证号"
        width="150"
      ></el-table-column>
      <el-table-column
        label="是否超级管理员"
        width="150">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.super"
            @change="superSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.enable"
            @change="enableSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="350">
        <template slot-scope="scope">
          <el-button @click="handleResetPwd(scope.row)" type="primary" size="mini">重置密码</el-button>
          <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick">
    </el-pagination>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <userForm v-if="dialogVisible" ref="form" :userID="userID" @onSave="handleSave"
                @onCancel="handleCancel"></userForm>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="pwdDialogVisible"
      width="30%">
      <el-form label-width="120px" :model="userPwd">
        <el-form-item label="请输入密码">
          <el-input :type="inputType" v-model="userPwd.newPwd">
            <i class="el-icon-view"
               slot="suffix"
               @click="handleIconClick">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="再次输入密码">
          <el-input :type="inputType" v-model="userPwd.againPwd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="resetPwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import userForm from './userEdit';
  import userSearch from './userSearch';

  export default {
    name: "userList",
    data() {
      return {
        dialogVisible: false,
        /*是否弹出重置用户密码弹窗*/
        pwdDialogVisible: false,
        /*重置用户密码时的input类型*/
        inputType: 'password',
        /*进行编辑当前用户ID*/
        userID: '',
        /*记录当前进行密码重置新密码和再次输入密码*/
        userPwd: {},
        /*重置用户密码时记录当前用户节点信息*/
        curNode: {},
        pageFlag: "next",
        pageSize: 10,
        lastId: "blank",
        total: 0,
        tableData: []
      };
    },
    methods: {
      loadData() {
        this.$store
          .dispatch('user/getTotal')
          .then(data => {
            this.total = data.data;
          })
          .catch(error => {
            console.log(error);
          });
        this.$store
          .dispatch('user/getPageList', {pageFlag: this.pageFlag, pageSize: this.pageSize, lastId: this.lastId})
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*根据关键字查询用户列表*/
      handleSearch(keyword) {
        this.$store
          .dispatch('user/getList', {nickName: keyword})
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*添加用户按钮*/
      handleAdd() {
        this.dialogVisible = true;
        this.userID = '';
      },
      /*修改是否超级管理员状态*/
      superSwitch(row) {
        row.super = row.super ? false : true;

        this.$store
          .dispatch("user/updateOne", row)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*修改是否启用状态*/
      enableSwitch(row) {
        row.enable = row.enable ? false : true;

        this.$store
          .dispatch("user/updateOne", row)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*确认重置用户密码*/
      handleResetPwd(row) {
        this.$confirm('此操作将重置该用户的登录密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.pwdDialogVisible = true;
          this.clearUserPwd();
          this.curNode = row;
        }).catch(() => {
        });
      },
      /*重置用户密码*/
      resetPwd() {
        if (this.userPwd.newPwd !== this.userPwd.againPwd) {
          this.$message({
            type: 'error',
            message: '两次输入的密码不相同,请重新输入！'
          });
        } else {
          this.curNode.password = this.userPwd.againPwd;

          this.$store
            .dispatch("user/updateOne", this.curNode)
            .then(data => {
              console.log(data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });

          this.pwdDialogVisible = false;
        }
        this.clearUserPwd();
      },
      /*点击用户编辑按钮*/
      handleEdit(row) {
        this.dialogVisible = true;
        this.userID = row.userId;
      },
      /*对员工进行删除*/
      handleDelete(row) {
        this.open(this.delete, row.userId, '此操作将删除该用户的所有信息, 是否继续?');
      },
      /*根据用户ID删除用户*/
      delete(userID) {
        this.$store
          .dispatch('user/removeOne', userID)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*点击弹窗按钮*/
      handleCancel() {
        if (this.dialogVisible) {
          this.dialogVisible = false;
        } else {
          this.pwdDialogVisible = false;
          this.clearUserPwd();
        }
      },
      /*添加保存用户*/
      handleSave(formData) {
        this.dialogVisible = false;

        let url = '';
        if (this.userID) {
          url = 'user/updateOne';
        } else {
          url = 'user/addOne';
        }
        this.$store
          .dispatch(url, formData)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*翻前页*/
      handlePrevClick() {
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].userId;
        this.loadData();
      },
      /*翻后页*/
      handleNextClick() {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].userId;
        this.loadData();
      },
      handleIconClick() {
        this.inputType = this.inputType === 'password' ? '' : 'password';
      },
      /*清除修改密码表单*/
      clearUserPwd() {
        this.userPwd = {
          newPwd: '',
          againPwd: ''
        }
      },
      open(func, data, message) {
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          func(data);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /*初始化用工列表中的生日日期格式*/
      initDate(dateStr, format) {
        if (null != dateStr) {
          let date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return '';
        }
      },
    },
    computed: {
      formatDate() {
        return function (dateStr, format) {
          return this.initDate(dateStr, format);
        }
      },
      initGender() {
        return function (gender) {
          return 0 == gender ? '男' : '女';
        }
      }
    },
    mounted() {
      this.loadData();
    },
    components: {
      userForm,
      userSearch
    }
  };
</script>
