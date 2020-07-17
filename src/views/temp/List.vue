<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
    <el-table class="page-table" :data="tableData" style="width: 100%;margin-bottom: 20px;">
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
          <span style="margin-left: 10px">{{ formatDate(scope.row.birthDate,"YYYY-MM-DD") }}</span>
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
            @change="superSwitch(scope.row.super )">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="isEnable" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.enable"
            @change="enableSwitch(scope.row.enable)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="350">
        <template slot-scope="scope">
          <el-button @click="resetPwd(scope.row)" type="primary" size="mini">重置密码</el-button>
          <el-button @click="edit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="delete(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
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
      <edit ref="userForm" :init-user-id="userId" @onSave="handleSave" @onCancel="handleCancel"></edit>
    </el-dialog>
  </div>
</template>

<script>
   import edit from "./Edit";
  import search from "./Search";

  export default {
    name: "userList",
    data() {
      return {
        userId: null,
        dialogVisible: false,
        pageFlag: "next",
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: []
      };
    },
    methods: {
      test() {

      },
      loadData() {
        this.$store
          .dispatch("user/getPageList", { pageFlag: this.pageFlag, pageSize: 1, lastId: this.lastId })
          .then(data => {
            this.tableData = data.rows;
          })
          .catch(error => {
            console.log(error);
          });
      },
      search(keyword) {
        this.$store
          .dispatch("user/getList", { username: keyword })
          .then(data => {
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      addUser() {
        this.dialogVisible = true;
        this.userId=1;
        /*this.userId = this.userId + 1;
        this.dialogVisible = true;
        console.log(this.$refs.userEdit.formData);
        this.$refs.userEdit.formData.gender = "女";
        this.$refs.userEdit.loadForm();*/
      },
      superSwitch() {
      },
      enableSwitch() {
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.dialogVisible = false;
      },
      prevClick() {
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].appId;
        this.loadData();
      },
      nextClick() {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].appId;
        this.loadData();
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
    mounted() {
      this.loadData();
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
    components: {
      edit,
      search
    }
  };
</script>
