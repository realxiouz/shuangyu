<template>
  <div class="app-container">
    <user-search ref="user" @onSearch="search" @onAdd="addUser"></user-search>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
      <el-table-column
        prop="thirdName"
        label="平台名称"
        width="180"
        align="center"
      ></el-table-column>
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
      <user-edit ref="userForm" :init-user-id="userId" @onSave="handleSave" @onCancel="handleCancel"></user-edit>
    </el-dialog>
  </div>
</template>

<script>
  import userEdit from "./Edit.vue";
  import thirdpartySearch from "./Search.vue";

  export default {
    name: "userList",
    data() {
      return {
        userId: null,
        dialogVisible: false,
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
          .dispatch("thirdparty/getPageList", { pageFlag: this.pageFlag, pageSize: 10, lastId: this.lastId })
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      search(keyword) {
        this.$store
          .dispatch("thirdparty/getPageList", {pageFlag: this.pageFlag, pageSize: 10, lastId: this.lastId, username: keyword })
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      addUser() {
        this.dialogVisible = true;
        this.userId=1;
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
      loadTotal: function() {
        this.$store
          .dispatch("role/getTotal", this.searchForm)
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
    mounted() {
      this.loadData();
    },
    components: {
      userEdit,
      thirdpartySearch
    }
  };
</script>
