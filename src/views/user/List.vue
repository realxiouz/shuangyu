<template>
  <div class="bigBox">
    <div class="searchBox">
      <userSearch ref="search" @onSearch="handleSearch"></userSearch>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:38px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        highlight-current-row
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
      >
        >
        <el-table-column prop="nickName" label="昵称" width="120" align="center"></el-table-column>
        <el-table-column prop="fullName" label="姓名" width="120" align="center"></el-table-column>
        <el-table-column label="性别" width="50" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gender|initGender }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期" width="110" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.birthDate" class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.birthDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center" width="150"></el-table-column>
        <el-table-column prop="email" label="电子邮箱" align="center" width="200"></el-table-column>
        <el-table-column label="角色权限" align="center" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.roleNames | roles}}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" prop="remark" align="center" :fit='true'></el-table-column>
        <el-table-column label="是否启用" align="center" width="100"  fixed="right" >
          <template slot-scope="scope">
            <el-switch :value="scope.row.enable" @change="enableSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="280">
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
        @next-click="handleNextClick"
      ></el-pagination>
      <el-dialog
        :title="userId?'编辑用户信息':'添加新用户'"
        center
        :visible.sync="dialogVisible"
        width="33%"
        ref="user-edit"
        :close-on-click-modal="false"
      >
        <userForm
          v-if="dialogVisible"
          ref="form"
          :userId="userId"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></userForm>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import userForm from "./Edit";
import userSearch from "./Search";

export default {
  name: "userList",
  filters: {
    roles(roleList) {
      if (roleList instanceof Array) {
        return roleList.toString();
      } else {
        return "";
      }
    },
    initGender(gender) {
      return gender == 0 ? "男" : "女";
    }
  },
  data() {
    return {
      dialogVisible: false,
      deleteForSearch: false,
      /*进行编辑当前用户ID*/
      userId: "",
      /*重置用户密码时记录当前用户节点信息*/
      curNode: {},
      pageFlag: 1,
      pageSize: 10,
      lastId: null,
      total: 0,
      tableData: [],
      loading: true,
      roleData: []
    };
  },
  components: {
    userForm,
    userSearch
  },
  methods: {
    loadData(params = {}, callback) {
      if (this.lastId) {
        params.lastId = this.lastId;
      }
      this.$store
        .dispatch("user/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          filter: params
        })
        .then(data => {
          if (data) {
            this.tableData = data.data;
            this.loadTotal(params);
          }
          callback && callback(data);
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    loadTotal(params) {
      this.$store
        .dispatch("user/getTotal", { filter: params })
        .then(data => {
          if (data) {
            this.total = data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    /*加载所有的角色信息*/
    loadRoles() {
      this.$store
        .dispatch("role/getList", {})
        .then(data => {
          this.roleData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    /*根据关键字查询用户列表*/
    handleSearch(params) {
      this.deleteForSearch = true;
      const newParams = {};
      if (params) {
        for (let key in params) {
          // 判断enable不为false
          if (key == "enable") {
            newParams[key] = params[key];
          } else if (params[key]) {
            console.log(params,key,'111')
            newParams[key] = params[key];
          }
        }
      }
      if (Object.keys(newParams).length == 0) {
        this.lastId = null;
      }
      this.loadData(newParams, () => {
        this.$message({
          type: "success",
          message: "查询成功!"
        });
      });
    },
    /*添加用户按钮*/
    handleAdd() {
      this.dialogVisible = true;
      this.userId = "";
    },
    /*修改是否超级管理员状态*/
    superSwitch(row) {
      row.super = row.super ? false : true;
      this.$store
        .dispatch("user/updateOne", row)
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*修改是否启用状态*/
    enableSwitch(row) {
      row.enable = !row.enable;
      this.$store
        .dispatch("user/updateOne", {
          userId: row.userId,
          data: {
            enable: row.enable
            // comment: `备注测试.${Math.random().toFixed(2)}`
          }
        })
        .then(() => {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*确认重置用户密码*/
    handleResetPwd(row) {
      this.$confirm("此操作将重置该用户的登录密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("user/resetPassword", { userId: row.userId })
            .then(() => {
              this.loadData();
              this.$message({
                type: "success",
                message: "新密码已通过邮件发送给用户!"
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {});
    },
    /*点击用户编辑按钮*/
    handleEdit(row) {
      this.dialogVisible = true;
      this.userId = row.userId;
    },
    /*对员工进行删除*/
    handleDelete(row) {
      this.open(
        this.delete,
        row.userId,
        "此操作将删除该用户的所有信息, 是否继续?"
      );
    },
    /*根据用户ID删除用户*/
    delete(userId) {
      this.$store
        .dispatch("user/removeOne", { userId: userId })
        .then(() => {
          this.lastId = null;
          if (this.tableData.length === 1 && !this.deleteForSearch) {
            this.handlePrevClick();
          } else {
            this.loadData();
          }
          this.deleteForSearch = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*点击弹窗按钮*/
    handleCancel() {
      this.dialogVisible = false;
    },
    /*添加保存用户*/
    handleSave(formData) {
      this.dialogVisible = false;
      let url = "";
      let requestData = {};
      if (this.userId) {
        url = "user/updateOne";
        requestData = { userId: formData.user.userId, data: formData.user };
      } else {
        url = "user/addOne";
        requestData = formData;
      }
      this.$store
        .dispatch(url, requestData)
        .then(() => {
          this.loadData();
          if (this.userId != "") {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
          } else {
            this.$message({
              type: "success",
              message: "添加成功！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*翻前页*/
    handlePrevClick() {
      this.pageFlag = -1;
      this.lastId = this.tableData[0].userId;
      this.loadData();
    },
    /*翻后页*/
    handleNextClick() {
      this.pageFlag = 1;
      this.lastId = this.tableData[this.tableData.length - 1].userId;
      this.loadData();
    },
    open(func, data, message) {
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
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    }
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style>
</style>
