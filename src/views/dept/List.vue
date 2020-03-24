<template>
  <div class="bigBox">
    <div class="searchBox">
      <dept-search @onSearch="handleSearch"></dept-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:30px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        :data="tableData"
        row-key="deptId"
        highlight-current-row
        style="width: 100%;margin-bottom:15px"
        size="mini"
        border
        fit
        :tree-props="{children: 'children', hasChildren: 'test'}"
      >
        <el-table-column prop="deptName" label="部门名称"></el-table-column>
        <el-table-column prop="ddId" label="钉钉Id"></el-table-column>
        <el-table-column prop="ddParentIdId" label="钉钉父节点"></el-table-column>
        <el-table-column prop="domain" label="域名"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button @click="handleAddChild(scope.row.deptId)" type="success" size="mini">添加子级</el-button>
            <el-button @click="handleUpdate(scope.row.deptId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.deptId)"
              type="danger"
              size="mini"
            >删除</el-button>
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
        :total="total"
      ></el-pagination>
      <el-dialog
        title="部门信息"
        center
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <dept-edit
          v-if="dialogVisible"
          :edit-dept-id="editDeptId"
          :pid="pid"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></dept-edit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import deptSearch from "./Search.vue";
import deptEdit from "./Edit.vue";

export default {
  name: "dept",
  data() {
    return {
      searchForm: {},
      lastId: "0",
      pageFlag: "next",
      pageSize: 10,
      dialogVisible: false,
      editDeptId: "",
      pid: "",
      total: 0,
      tableData: []
    };
  },
  methods: {
    prevClick() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].deptId;
      this.loadData();
    },
    nextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].deptId;
      this.loadData();
    },
    loadData() {
      this.$store
        .dispatch("dept/getList", {
          filters: {}
        })
        .then(data => {
          if (data) {
            this.tableData = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTotal() {
      this.$store
        .dispatch("dept/getTotal", {
          filters: {}
        })
        .then(response => {
          this.total = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAddChild(deptId) {
      this.pid = deptId;
      this.editDeptId = "";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.editDeptId = "";
      this.pid = "";
      this.dialogVisible = true;
    },
    handleSearch(params) {
      if (!params) {
        params = {};
      }
      this.loadData(params);
      this.loadTotal(params);
    },
    handleUpdate(deptId) {
      this.editDeptId = deptId;
      this.pid = "";
      this.dialogVisible = true;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    handleRemove(id) {
      this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("dept/removeOne", { deptId: id }).then(() => {
            this.loadData("{}");
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleSave(formData) {
      this.$store
        .dispatch("dept/save", formData)
        .then(() => {
          this.handleSearch();
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogVisible = false;
    }
  },
  created() {
    this.handleSearch();
  },
  components: {
    deptSearch,
    deptEdit
  }
};
</script>
<style>
.el-cascader-menu {
  height: 200px;
}
</style>
