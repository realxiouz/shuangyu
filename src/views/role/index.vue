<template>
  <div class="app-container">

    <!--<el-main>-->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addRole">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="roleId"
        label="角色唯一标识"
      ></el-table-column>
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
    <h-page-footer>
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
    </h-page-footer>
    <!--</el-main>-->
    <el-dialog title="角色" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="formData" label-width="95px">
        <el-input v-show="false" v-model="formData.roleId"></el-input>
        <el-form-item label="角色名称">
          <el-input v-model="formData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="formData.enable"></el-switch>
        </el-form-item>
        <el-scrollbar style="height:80%">
          <el-form-item label="选择菜单">
            <el-tree
              :data="treeData"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </el-form-item>
        </el-scrollbar>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  const defaultData = {
    roleId: "",
    roleName: "",
    enable: true
  };

  export default {
    name: "role",
    data() {
      return {
        searchForm: {},
        lastId: "0",
        pageSize: 10,
        pageFlag: "next",
        total: 0,
        formData: defaultData,
        dialogVisible: false,
        tableData: [],
        treeData: [],

        defaultProps: {
          children: "children",
          label: "label"
        }
      };
    },
    methods: {
      save: function(data) {
        console.log("saveData"+JSON.stringify(data));
        this.$store
          .dispatch("role/save", data)
          .then(data => {
            console.log(data);
            this.loadData();
            this.loadTotal();
          })
          .catch(error => {
            console.log(error);
          });
      },
      removeOne: function(roleid, index, rows) {
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

      },
      editRole: function(row) {
        this.initTreeData();
        this.$store
          .dispatch("role/getOne", row.roleId)
          .then(data => {
            this.formData = data;
            var selectedNavIds = [];
            data.navs.forEach(e=>{
              selectedNavIds.push(e.navId);
            });
            this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys(selectedNavIds);
            });
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = true;
      },
      changeSwitch: function(data) {
        this.save(data);
      },
      initTreeData: function() {
        this.$store
          .dispatch("role/getNavsTreeData")
          .then(data => {
            this.treeData = data;
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

      addRole: function() {
        this.dialogVisible = true;
        this.formData.treeData = this.initTreeData();
      },

      loadData() {
        var params = {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          searchForm: this.searchForm
        };
        this.$store
          .dispatch("role/getPageList", params)
          .then(data => {
            //处理展示的菜单名称
            data.forEach(e => {
              var navNames = "";
              e.navs.forEach(nav => {
                navNames += ", "+nav.navName;
              });
              if (navNames){
                navNames = navNames.substring(1,navNames.length);
              }
              e.navNames = navNames;
              console.log("namNames:" + navNames);
            });
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
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

      handleSave() {
        console.log("this.$refs.tree.getCheckedNodes()" + JSON.stringify(this.$refs.tree.getCheckedKeys()));
        var navs = [];
        this.$refs.tree.getCheckedKeys().forEach(node => {
            if (node) {
              navs.push({ navId: node });
            }
          }
        );
        this.formData.navs = navs;
        this.save(this.formData);
        this.dialogVisible = false;
      },
      handleCancel: function() {
        this.dialogVisible = false;
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadData();
      },
      handleSearch: function() {
        this.loadData();
        this.loadTotal();
      }
    },

    mounted() {
      this.loadTotal();
      this.loadData();
    }
  };
</script>
<style scoped>
  .line {
    text-align: center;
  }
</style>
