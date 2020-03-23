<template>
  <div class="contentBox">
    <el-row style="margin-bottom:15px;">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table
      :data="tableData"
      row-key="paramId"
      size="mini"
      :tree-props="{ hasChildren: 'xxx',children: 'children'}"
    >
      <el-table-column prop="thirdName" label="第三方平台" align="center"></el-table-column>
      <el-table-column prop="apiUrl" label="接口url" align="center"></el-table-column>
      <el-table-column prop="label" label="接口标签" align="center"></el-table-column>
      <el-table-column prop="name" label="接口名称" align="center"></el-table-column>
      <el-table-column prop="defaultValue" label="默认值" align="center"></el-table-column>
      <el-table-column prop="required" label="是否必须" :formatter="formatBoolean" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleAddChild(scope.row)" type="primary" size="mini">添加</el-button>
          <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加接口"
      :before-close="handleClose"
      :close-on-click-modal="handleClose"
      center
      :visible.sync="dialogVisible"
      width="30%"
    >
      <param-edit
        v-if="dialogVisible"
        :paramId="paramId"
        @onSave="handleSave"
        @onCancel="handleCancel"
      ></param-edit>
    </el-dialog>
  </div>
</template>

<script>
import paramEdit from "./Edit.vue";

export default {
  name: "List",
  data() {
    return {
      rootNav: false,
      dialogVisible: false,
      paramId: null,
      tableData: [],
      parentNode: {}
    };
  },
  methods: {
    loadData() {
      this.$store
        .dispatch("thirdApiParam/getTotal")
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });

      this.$store
        .dispatch("thirdApiParam/getList")
        .then(data => {
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatBoolean(row, column, cellValue) {
      var ret = ""; //你想在页面展示的值
      if (cellValue) {
        ret = "是"; //根据自己的需求设定
      } else {
        ret = "否";
      }
      return ret;
    },
    handleAdd() {
      //判断添加的导航是否是顶级导航
      this.rootNav = true;
      this.dialogVisible = true;

      this.paramId = "";
    },
    handleSave(formData) {
      if (this.rootNav) {
        //如果添加的顶级企业信息，对某些属性进行初始化
        formData.level = 0;
      } else {
        formData.pid = this.parentNode.paramId;
        formData.level = this.parentNode.level + 1;
      }
      this.$store
        .dispatch("thirdApiParam/save", formData)
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });

      this.dialogVisible = false;
    },
    handleClose() {
      this.$confirm("确认关闭添加接口对话框？")
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(_ => {});
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleAddChild(row) {
      this.rootNav = false;
      this.dialogVisible = true;

      this.paramId = "";
      this.parentNode = {};
      this.parentNode.paramId = row.paramId;
      this.parentNode.level = row.level;
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.paramId = row.paramId;
    },
    changeSwitch(row) {
      row.enable = row.enable ? true : false;
      this.$store
        .dispatch("thirdApiParam/save", row)
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
      this.open(
        this.delete,
        row.paramId,
        "此操作将删除该用户的所有信息, 是否继续?"
      );
    },
    /*根据用户ID删除用户*/
    delete(paramId) {
      this.$store
        .dispatch("thirdApiParam/removeOne", paramId)
        .then(() => {
          this.loadData();
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
    paramEdit
  }
};
</script>
