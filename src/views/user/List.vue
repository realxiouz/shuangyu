<template>
  <div class="app-container">
    <user-search @onSearch="handleSearch" @onAdd="addUser"></user-search>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" border
              default-expand-all>
      <el-table-column
        prop="nickName"
        label="昵称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="fullName"
        label="姓名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="birthDate"
        label="出生日期"
        width="150"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 3px">{{ $moment(scope.row.birthDate).format("YYYY-MM-DD") }}</span>
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
        prop="super"
        label="是否超级管理员"
        width="150"
      >
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.super"
            on-color="#00A854"
            on-text="启动"
            on-value=true
            off-color="#F04134"
            off-text="禁止"
            off-value=false
            @change="changeSwitch({ ...scope.row, super: !scope.row.super })">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="isEnable" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.enable"
            on-color="#00A854"
            on-text="启动"
            on-value=true
            off-color="#F04134"
            off-text="禁止"
            off-value=false
            @change="changeSwitch({ ...scope.row, enable: !scope.row.enable })">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="350">
        <template slot-scope="scope">
          <el-button @click="resetPwd(scope.row)" type="primary" size="mini">重置密码</el-button>
          <el-button @click="userUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="removeOne(scope.row.appId,scope.$index,tableData)" type="danger"
                     size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <user-edit ref="userEdit" :init-user-id="userId" @onSave="handleSave" @onCancel="handleCancel"></user-edit>
    </el-dialog>
  </div>
</template>

<script>
  import userEdit from "./Edit.vue";
  import userSearch from "./Search.vue";

  export default {
    name: "userList",
    data() {
      return {
        userId: 1,
        lastId: "0",
        pageFlag: "next",
        pageSize: 10,
        total: 0,
        dialogVisible: false,
        tableData: null
      };
    },
    methods: {
      goBack() {
        console.log("go back");
      },
      resetPwd(row) {
        console.log(row);
      },
      userUpdate(row) {
        this.dialogVisible = true;
      },
      addUser() {
        /*this.userId = this.userId + 1;
        this.dialogVisible = true;
        console.log(this.$refs.userEdit.formData);
        this.$refs.userEdit.formData.gender = "女";
        this.$refs.userEdit.loadForm();*/
        this.$router.push('/user/edit');
      },
      loadData() {

      },
      handleSearch(params) {
        console.log(params);
      },

      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadData();
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
      changeSwitch(data) {

      },
      loadTotal() {
        if (!this.searchForm.appName) {
          this.searchForm = {};
        }
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.dialogVisible = false;
      }
    },
    mounted() {
      this.loadData();
    },
    components: {
      userEdit,
      userSearch
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
