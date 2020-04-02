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
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
      >
        <el-table-column prop="nickName" label="昵称" width="100" align="center"></el-table-column>
        <el-table-column prop="fullName" label="姓名" width="100" align="center"></el-table-column>
        <el-table-column label="性别" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ initGender(scope.row.gender) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期" width="180" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.birthDate" class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.birthDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
        <el-table-column label="是否超级管理员" width="120" align="center">
          <template slot-scope="scope">
            <el-switch :value="scope.row.super" @change="superSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" align="center" width="120">
          <template slot-scope="scope">
            <el-switch :value="scope.row.enable" @change="enableSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
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
        title="用户信息"
        center
        :visible.sync="dialogVisible"
        width="33%"
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
// import  userSelectRoles from

export default {
  name: "userList",
  data() {
    return {
      dialogVisible: false,
      /*进行编辑当前用户ID*/
      userId: "",
      /*重置用户密码时记录当前用户节点信息*/
      curNode: {},
      pageFlag: "next",
      pageSize: 10,
      lastId: "blank",
      total: 0,
      tableData: [],
      loading: true
    };
  },
  methods: {
    loadData() {
      this.$store
        .dispatch("user/getTotal", { filter: {} })
        .then(data => {
          this.total = data.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.$store
        .dispatch("user/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: {}
        })
        .then(data => {
          if (data) {
            this.tableData = data.data;
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*根据关键字查询用户列表*/
    handleSearch(params) {
      this.$store
        .dispatch("user/getTotal", {
          filter: params.keyword ? { nickName: params.keyword } : {}
        })
        .then(data => {
          this.total = data.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.$store
        .dispatch("user/getList", {
          filter: params.keyword ? { nickName: params.keyword } : {}
        })
        .then(data => {
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
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
      this.$confirm("此操作将重置该用户的登录密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("user/resetPassword", { userId: row.userId })
            .then(data => {
              console.log(data);
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
          if (1 === this.tableData.length) {
            this.handlePrevClick();
          } else {
            this.loadData();
          }
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

      let url = "";
      if (this.userId) {
        url = "user/updateOne";
      } else {
        url = "user/addOne";
      }
      this.$store
        .dispatch(url, formData)
        .then(data => {
          this.loadData();
          this.$message({
            type: "success",
            message: "修改成功!"
          });
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
      this.inputType = this.inputType === "password" ? "" : "password";
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
      if (null != dateStr) {
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
    },
    initGender() {
      return function(gender) {
        return 0 == gender ? "男" : "女";
      };
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
<style>
/* .searchBox {
  padding: 15px;
  background-color: #fff;
}
.contentBox {
  padding: 15px;
  margin-top: 15px;
  background-color: #fff;
}
.bigBox {
  background-color: #f0f2f5;
} */
</style>
