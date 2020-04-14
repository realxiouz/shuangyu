<template>
  <div class="bigBox">
    <div class="searchBox">
      <firm-search @onSearch="handleSearch"></firm-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        size="mini"
        :data="tableData"
        row-key="firmId"
        :tree-props="tableProps"
      >
        <el-table-column prop="firmName" label="供应商名称" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="firmCode" label="供应商代码" align="center" sortable width="100"></el-table-column>
        <el-table-column prop="location" label="机构所在地" align="center"></el-table-column>
        <el-table-column prop="linkPerson" label="联系人" align="center" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAppend(scope.$index, scope.row)">添加</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表单对话框 -->
      <el-dialog
        title="添加企业"
        center
        :visible.sync="dialogVisible"
        width="33%"
        :close-on-click-modal="false"
      >
        <firm-edit :curNode="curNode" @onSave="handleSave" @onCancel="handleCancel" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import firmEdit from "./Edit";
import firmSearch from "./Search";

export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      rootNav: false,
      tableData: [],
      curNode: {},
      tableProps: {
        hasChildren: "xxx",
        children: "children"
      }
    };
  },
  methods: {
    /*加载供应商列表*/
    loadData(params) {
        if(params){
            params.type = 1;
        }else {
            let newParams = {};
            newParams.type = 1;
            params = newParams;
        }
      this.$store
        .dispatch("firm/getList", { filter: params })
        .then(data => {
          if (data) {
            this.tableData = data;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    /*根据关键字进行供应商搜索*/
    handleSearch(params) {
      const newParams = {};
      if (params) {
        for (let key in params) {
          if (params[key]) {
            newParams[key] = params[key];
          }
        }
      }
      this.loadData(newParams);
      this.$message({
        type: "success",
        message: "查询成功！"
      });
    },
    handleAdd() {
      this.rootNav = true;
      this.dialogVisible = true;

      this.curNode = {};
    },
    /*供应商的添加、编辑保存*/
    handleSave(formData) {
      this.dialogVisible = false;

      if (formData.firmId != "") {
        this.$store
          .dispatch("firm/updateOne", { firm: formData })
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if (this.rootNav) {
          //如果添加的顶级企业信息，对某些属性进行初始化
          formData.level = 0;
        } else {
          formData.pid = this.curNode.firmId;
          formData.level = this.curNode.level + 1;
        }

        this.$store
          .dispatch("firm/addOne", { firm: formData })
          .then(() => {
            this.$message({
              type: "success",
              message:
                "供应商账号已添加成功!超级管理员账号为企业联系人手机号或邮箱，密码已通过邮件发送给联系人"
            });
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    /*点击添加供应商子节点按钮*/
    handleAppend(idx, row) {
      this.rootNav = false;
      this.dialogVisible = true;

      this.curNode = {};
      this.curNode.firmId = row.firmId;
      this.curNode.level = row.level;
    },
    /*点击编辑*/
    handleEdit(index, row) {
      this.curNode = row;
      this.dialogVisible = true;
    },
    /*点击删除*/
    handleDelete(index, row) {
      this.open(
        this.remove,
        row.firmId,
        "此操作将删除该供应商信息及子供应商信息, 是否继续?"
      );
    },
    /*删除企业数据*/
    remove(params) {
      this.$store
        .dispatch("firm/removeOne", { firmID: params })
        .then(() => {})
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
          this.loadData();
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
  mounted() {
    this.loadData();
  },
  components: {
    firmEdit,
    firmSearch
  }
};
</script>
