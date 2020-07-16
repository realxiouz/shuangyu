<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"></search>
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
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
          <span style="margin-left: 10px">{{ scope.row.birthDate | time('YYYY-MM-DD')}}</span>
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
      <el-table-column label="是否启用" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-switch :value="scope.row.enable" @change="enableSwitch(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="最后登录" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <i v-if="scope.row.lastLoginTime" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.lastLoginTime | time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="280">
        <template slot-scope="scope">
          <el-button @click="handleResetPwd(scope.row)" type="primary" size="mini">重置密码</el-button>
          <el-button @click="onEdit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
      @size-change="onSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
    />
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

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
        deleteForSearch: false,
        keyId: "",
        keyName: "userId",
        actionName: "user/getPageList",
      };
    },
    components: {
      edit,
      search
    },
    methods: {
      enableSwitch(row) {
        row.enable = !row.enable;
        this.$store
          .dispatch("user/updateOne", {
            userId: row.userId,
            data: {
              enable: row.enable
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
      handleResetPwd(row) {
        this.$confirm("此操作将重置该用户的登录密码, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("user/resetPassword", {userId: row.userId})
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
          .catch(() => {
          });
      },
      handleDelete(row) {
        this.open(
          this.delete,
          row.userId,
          "此操作将删除该用户的所有信息, 是否继续?"
        );
      },
      delete(userId) {
        this.$store
          .dispatch("user/removeOne", {userId: userId})
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
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave(formData) {
        this.dialogVisible = false;
        let url = "";
        let requestData = {};
        if (this.userId) {
          url = "user/updateOne";
          requestData = {userId: formData.user.userId, data: formData.user};
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
      }
    },
    mixins: [MIXIN_LIST]
  };
</script>
