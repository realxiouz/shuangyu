<template>
  <div class="app-container">
    <role-search ref="user" @onSearch="handleSearch" @onAdd="addRole"></role-search>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="roleName"
        label="角色名称"
      ></el-table-column>
      <el-table-column prop="enable" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            on-color="#00A854"
            on-text="启动"
            on-value=true
            off-color="#F04134"
            off-text="禁止"
            off-value=false
            @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="navNames" label="导航菜单" align="center"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editRole(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="removeOne(scope.row.roleId,scope.$index,tableData)" type="text"
                     size="small">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
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

    <el-dialog title="角色信息" :visible.sync="dialogVisible" width="30%">
      <role-edit v-if="dialogVisible" ref="roleForm" :role-id="roleId" @onSave="handleSave"
                 @onCancel="handleCancel"></role-edit>
    </el-dialog>

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
        lastId: "blank",
        total: 0,
        tableData: []
      };
    },
    methods: {
      removeOne: function (roleid, index, rows) {
        this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$store
            .dispatch("role/removeOne", roleid)
            .then(data => {
              console.log(data);
              rows.splice(index, 1);
              this.total--;
            })
            .catch(error => {
              console.log(error);
            });
        }).catch(err => {
          console.error(err);
        });

      }
      ,
      editRole: function (row) {
        this.dialogVisible = true;
        this.roleId = row.roleId;
      }
      ,
      changeSwitch: function (data) {
        this.save(data);
      }
      ,
      initTreeData: function () {
        this.$store
          .dispatch("role/getNavsTreeData")
          .then(data => {
            this.treeData = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
      ,
      prevClick: function () {
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].roleId;
        this.loadData();
      }
      ,
      nextClick: function () {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].roleId;
        this.loadData();
      }
      ,

      addRole: function () {
        this.dialogVisible = true;
      },

      loadData() {
        var params = {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId
        };
        this.$store
          .dispatch("role/getPageList", params)
          .then(data => {
            data.forEach(e => {
              var navNames1 = "";
              if (e.navNames){
                e.navNames.forEach (nav=>{
                  navNames1 += ", " + nav;
                });
                if (navNames1) {
                  navNames1 = navNames1.substring(1, navNames1.length);
                }
                e.navNames = navNames1;
                console.log("namNames:" + navNames1);
              }
            });
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
      ,
      loadTotal: function () {
        this.$store
          .dispatch("role/getTotal", this.searchForm)
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
      ,

      handleSave(data) {
        this.$store
          .dispatch("role/save", {
            roleId: data.roleId,
            roleName: data.roleName,
            enable: data.enable,
            navIds: data.navIds
          })
          .then(data => {
            console.log(data);
            this.loadData();
            this.loadTotal();
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
      handleCancel: function () {
        this.dialogVisible = false;
      }
      ,
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadData();
      }
      ,
      handleSearch: function (keyword) {
        this.$store
          .dispatch("role/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: 10,
            lastId: this.lastId,
            filter: keyword
          })
          .then(data => {
            data.forEach(e => {
            var navNames1 = "";
            if (e.navNames){
              e.navNames.forEach (nav=>{
                navNames1 += ", " + nav;
              });
              if (navNames1) {
                navNames1 = navNames1.substring(1, navNames1.length);
              }
              e.navNames = navNames1;
              console.log("namNames:" + navNames1);
            }
          });
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    mounted() {
      this.loadTotal();
      this.loadData();
    }
    ,
    components: {
      roleEdit,
      roleSearch
    }
  }
</script>

<style scoped>

</style>
