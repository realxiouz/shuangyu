<template>
  <div class="bigBox">
    <div class="searchBox">
      <role-search ref="user" @onSearch="handleSearch"></role-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:50px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table :data="tableData" style="width:100%;margin-bottom:15px;" size="mini">
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column label="是否启用" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" @change="changeSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @prev-click="prevClick"
        @next-click="nextClick"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <el-dialog title="角色信息" center :visible.sync="dialogVisible" width="30%">
        <role-edit
          v-if="dialogVisible"
          :roleId="roleId"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></role-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import roleEdit from "./Edit.vue";
import roleSearch from "./Search.vue";

export default {
  name: "List",
  data() {
    return {
      roleId: null,
      dialogVisible: false,
      pageFlag: "next",
      pageSize: 10,
      lastId: "0",
      total: 0,
      tableData: []
    };
  },
  methods: {
    /*对员工进行删除*/
    handleDelete(row) {
      this.open(
        this.delete,
        row.roleId,
        "此操作将删除该用户的所有信息, 是否继续?"
      );
    },
    /*根据用户ID删除用户*/
    delete(roleID) {
      this.$store
        .dispatch("role/removeOne", { roleID: roleID })
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.roleId = row.roleId;
    },
    changeSwitch(row) {
      row.enable = row.enable ? true : false;

      this.$store
        .dispatch("role/save", { role: row })
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    prevClick: function() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].roleId;
      this.loadData();
    },
    nextClick: function() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].roleId;
      this.loadData();
    },
    handleAdd() {
      this.roleId = "";
      this.dialogVisible = true;
    },
    loadData() {
      this.$store
        .dispatch("role/getTotal", {})
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });

      this.$store
        .dispatch("role/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: {}
        })
        .then(data => {
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSave(formData) {
      this.$store
        .dispatch("role/save", { role: formData })
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });

      this.dialogVisible = false;
    },
    handleCancel: function() {
      this.dialogVisible = false;
    },
    handleSearch(keyword) {
      this.$store
        .dispatch("role/getTotal", {
          filter: keyword ? { roleName: keyword } : {}
        })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });

      this.$store
        .dispatch("role/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: keyword ? { roleName: keyword } : {}
        })
        .then(data => {
          this.tableData = data;
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
  created() {
    this.loadData();
  },
  components: {
    roleEdit,
    roleSearch
  }
};
</script>
