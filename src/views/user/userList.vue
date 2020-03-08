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
      @prev-click="prevClick"
      @next-click="nextClick">
    </el-pagination>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <userForm v-if="dialogVisible" ref="form" :userID="userID" @onSave="handleSave" @onCancel="handleCancel"></userForm>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="pwdDialogVisible"
      width="30%">
      <el-form label-width="120px" :model="userInfo">
        <el-form-item label="请输入密码">
          <el-input v-model="userInfo.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码">
          <el-input v-model="userInfo.againPwd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pwdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="pwdDialogVisible = false">确 定</el-button>
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
        pwdDialogVisible: false,
        userID: '',
        userInfo: {
          oldPwd: '',
          newPwd: '',
          againPwd: ''
        },
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
      handleSearch(keyword) {
        this.$store
          .dispatch('user/getList', {nickName:keyword})
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleAdd() {
        this.dialogVisible = true;
        this.userID = '';
      },
      superSwitch(row){
        row.super = row.super?false:true;
      },
      enableSwitch(row){
        row.enable = row.enable?false:true;
        console.log(row);
      },
      handleResetPwd(row){
        this.$confirm('此操作将重置该用户的登录密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.pwdDialogVisible = true;
          /*this.$store
            .dispatch('user/getList', {nickName:keyword})
            .then(data => {
              this.tableData = data.data;
            })
            .catch(error => {
              console.log(error);
            });*/
        });
      },
      resetPwd(userID){

      },
      handleEdit(row){
        this.dialogVisible = true;
        this.userID = row.userId;
      },
      /*对员工进行删除*/
      handleDelete(row) {
        this.open(this.delete, row.userId,'此操作将删除该用户的所有信息, 是否继续?');
      },
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
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave(formData) {
        this.dialogVisible = false;

        let url = '';
        if (this.userID){
          url = 'user/updateOne';
        }else{
          url = 'user/addOne';
        }
        this.$store
          .dispatch(url,formData)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*翻前页*/
      prevClick() {
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].userId;
        this.loadData();
      },
      /*翻后页*/
      nextClick() {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].userId;
        this.loadData();
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
      initChildrenModel(){
        this.$refs.form.clearForm();
        this.$refs.form.initRowData();
      }
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
      // this.initChildrenModel();
    },
    components: {
      userForm,
      userSearch
    }
  };
</script>
