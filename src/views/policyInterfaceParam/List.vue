<template>
  <div class="app-container">
    <param-search ref="user" @onSearch="handleSearch" @onAdd="addParam"></param-search>
    <el-table
      :data="tableData"
      row-key="tableProps"
      :tree-props=" {
          hasChildren: 'xxx',
          children: 'children'
        }">
      <el-table-column prop="thirdName" label="第三方平台" align="center"></el-table-column>
      <el-table-column prop="policyName" label="政策" align="center"></el-table-column>
      <el-table-column prop="label" label="接口标签" align="center"></el-table-column>
      <el-table-column prop="name" label="接口名称" align="center"></el-table-column>
      <el-table-column prop="defaultValue" label="默认值" align="center"></el-table-column>
      <el-table-column prop="required" label="是否必须" align="center"></el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleAddChild(scope.row)" type="text" size="small">添加</el-button>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
      :total="total">
    </el-pagination>
    <el-dialog title="接口参数信息" :visible.sync="dialogVisible" width="30%">
      <param-edit v-if="dialogVisible" :pid="pid" :paramId="paramId" @onSave="handleSave" @onCancel="handleCancel">
      </param-edit>
    </el-dialog>
  </div>
</template>

<script>
  import paramEdit from "./Edit.vue";
  import paramSearch from "./Search.vue";

  export default {
    name: "List",
    data() {
      return {
        paramId: null,
        dialogVisible: false,
        pageFlag: "next",
        pageSize: 10,
        lastId: "blank",
        total: 0,
        tableData: []
      };
    },
    methods: {
      /*对员工进行删除*/
      handleDelete(row) {
        this.open(this.delete, row.paramId, '此操作将删除该用户的所有信息, 是否继续?');
      },
      /*根据用户ID删除用户*/
      delete(paramId) {
        this.$store
          .dispatch('policyInterfaceParam/removeOne', paramId)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleAddChild(row) {
        this.dialogVisible = true;
        this.pid = row.paramId;
        this.paramId = '';
      },
      handleEdit(row) {
        this.dialogVisible = true;
        this.paramId = row.paramId;
        this.pid = '';
      },
      changeSwitch(row) {
        row.enable = row.enable ? true : false;
        this.$store
          .dispatch('policyInterfaceParam/save', row)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      prevClick: function () {
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].paramId;
        this.loadData();
      },
      nextClick: function () {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].paramId;
        this.loadData();
      },
      addParam: function () {
        this.paramId = '';
        this.dialogVisible = true;
      },
      loadData() {
        this.$store
          .dispatch("policyInterfaceParam/getTotal")
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });

        this.$store
          .dispatch("policyInterfaceParam/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId
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
          .dispatch("policyInterfaceParam/save", formData)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });

        this.dialogVisible = false;
      },
      handleCancel: function () {
        this.dialogVisible = false;
      },
      handleSearch: function () {
        this.$store
          .dispatch("policyInterfaceParam/getList")
          .then(data => {
            this.tableData = data;
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
      paramEdit,
      paramSearch
    }
  }
</script>
