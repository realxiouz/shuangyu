<template>
  <div class="app-container">
    <product-mark-search ref="user" @onSearch="handleSearch" @onAdd="addOne"></product-mark-search>
    <el-table
      :data="tableData"
      row-key="markId"
      :tree-props="{ hasChildren: 'xxx',children: 'children'}">
      <el-table-column prop="thirdName" label="第三方平台" align="center"></el-table-column>
      <el-table-column prop="apiUrl" label="接口url" align="center"></el-table-column>
      <el-table-column prop="label" label="接口标签" align="center"></el-table-column>
      <el-table-column prop="name" label="接口名称" align="center"></el-table-column>
      <el-table-column prop="defaultValue" label="默认值" align="center"></el-table-column>
      <el-table-column prop="required" label="是否必须" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleAddChild(scope.row)" type="text" size="small">添加</el-button>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="接口参数信息" :visible.sync="dialogVisible" width="30%">
      <product-mark-edit v-if="dialogVisible" :markId="markId" @onSave="handleSave" @onCancel="handleCancel">
      </product-mark-edit>
    </el-dialog>
  </div>
</template>

<script>
  import productMarkEdit from "./Edit.vue";
  import productMarkSearch from "./Search.vue";

  export default {
    name: "List",
    data() {
      return {
        rootNav: false,
        dialogVisible: false,
        markId: null,
        tableData: [],
        parentNode: {}
      };
    },
    methods: {
      loadData() {
        this.$store
          .dispatch("productMark/getTotal")
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });

        this.$store
          .dispatch("productMark/getList")
          .then(data => {
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      addOne() {
        //判断添加的导航是否是顶级导航
        this.rootNav = true;
        this.dialogVisible = true;
        this.markId = '';
      },
      handleSearch: function (keyword) {
        this.$store
          .dispatch("productMark/getList", {filter: keyword ? {roleName: keyword} : {}})
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSave(formData) {
        if (this.rootNav) { //如果添加的顶级企业信息，对某些属性进行初始化
          formData.level = 0;
        } else {
          formData.pid = this.parentNode.markId;
          formData.level = this.parentNode.level + 1;
        }
        this.$store
          .dispatch('productMark/save', formData)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });

        this.dialogVisible = false;
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleAddChild(row) {
        this.rootNav = false;
        this.dialogVisible = true;

        this.markId = '';
        this.parentNode = {};
        this.parentNode.markId = row.markId;
        this.parentNode.level = row.level;
      },
      handleEdit(row) {
        this.dialogVisible = true;
        this.markId = row.markId;
      },
      changeSwitch(row) {
        row.enable = row.enable ? true : false;
        this.$store
          .dispatch('productMark/save', row)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*对员工进行删除*/
      handleDelete(row) {
        this.open(this.delete, row.markId, '此操作将删除该用户的所有信息, 是否继续?');
      },
      /*根据用户ID删除用户*/
      delete(markId) {
        this.$store
          .dispatch('productMark/removeOne', markId)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      open(func, data, message) {
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          func(data);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    mounted() {
      this.loadData();
    },
    components: {
      productMarkEdit,
      productMarkSearch
    }
  }
</script>
