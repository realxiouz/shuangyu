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
          <span>{{ scope.row.gender==0?"男":"女"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" width="110" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.birthDate">
            <i class="el-icon-time"></i>
            <span>{{$moment(scope.row.birthDate).format('YYYY-MM-DD')}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" width="150"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" align="center" width="200"></el-table-column>
      <el-table-column label="角色权限" align="center" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.roleNames.join()}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" align="center" :fit='true'></el-table-column>
      <el-table-column label="是否启用" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-switch :value="scope.row.enable" @change="onEnable(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="最后登录" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <div v-if="scope.row.lastLoginTime">
            <i class="el-icon-time"></i>
            <span>{{$moment(scope.row.lastLoginTime).format('YYYY-MM-DD hh:mm:ss')}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="280">
        <template slot-scope="scope">
          <el-button @click="onResetPwd(scope.row)" type="primary" size="mini">重置密码</el-button>
          <el-button @click="onEdit(scope.row.userId)" type="primary" size="mini">编辑</el-button>
          <el-button @click="onDel(scope.row.userId)" type="danger" size="mini">删除</el-button>
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
    mixins: [MIXIN_LIST],
    data() {
      return {
        deleteForSearch: false,
        keyId: '',
        keyName: 'userId',
        actions: {
          getPageList: 'user/getPageList',
          removeOne: 'user/removeOne'
        }
      };
    },
    components: {
      edit,
      search
    },
    methods: {
      onEnable(row) {
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
      onResetPwd(row) {
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
      }
    }
  };
</script>
