<template>
  <div class="bigBox">
    <div class="searchBox">
      <accountSubject-search @onSearch="handleSearch"></accountSubject-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:30px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        row-key="subjectId"
        highlight-current-row
        style="width: 100%;margin-bottom:15px"
        size="mini"
        fit
        :expand-row-keys="expandRowKeys"
        :tree-props="{children: 'children', hasChildren: 'test'}"
      >
        <el-table-column prop="code" label="科目编码" align="center"></el-table-column>
        <el-table-column prop="name" label="科目名称" align="center"></el-table-column>
        <el-table-column prop="category" label="类别" align="center"></el-table-column>
        <el-table-column prop="balanceDirection" label="余额方向" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="280">
          <template slot-scope="scope">
            <el-button @click="handleAddChild(scope.row.subjectId)" type="success" size="mini">添加子级</el-button>
            <span v-show="'0' != scope.row.level" style="margin-left: 10px;">
              <el-button @click="handleUpdate(scope.row.subjectId)" type="primary" size="mini">编辑</el-button>
              <el-button
                @click.native.prevent="handleRemove(scope.row.subjectId)"
                type="danger"
                size="mini"
              >删除</el-button>
            </span>
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
        <accountSubject-edit
          v-if="dialogVisible"
          :editSubjectId="editSubjectId"
          :pid="pid"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></accountSubject-edit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import accountSubjectSearch from "./Search.vue";
import accountSubjectEdit from "./Edit.vue";

export default {
  name: "accountSubject",
  data() {
    return {
      loading: true,
      searchForm: {},
      lastId: "0",
      pageFlag: "next",
      pageSize: 10,
      dialogVisible: false,
      editSubjectId: "",
      pid: "",
      total: 0,
      tableData: [],
      expandRowKeys: []
    };
  },
  methods: {
    prevClick() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].subjectId;
      this.loadData();
    },
    nextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].subjectId;
      this.loadData();
    },
    loadData(params) {
      this.$store
        .dispatch("accountSubject/getList", {
          filters: params
        })
        .then(data => {
          if (data) {
            this.tableData = data;
            this.expandRowKeys = [];
            this.expandRowKeys.push(data[0].subjectId);
            this.loadTotal(params);
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTotal(params) {
      this.$store
        .dispatch("accountSubject/getTotal", {
          filters: params
        })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAddChild(subjectId) {
      this.pid = subjectId;
      this.editSubjectId = "";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.editSubjectId = "";
      this.pid = "";
      this.dialogVisible = true;
    },
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
    handleUpdate(subjectId) {
      this.editSubjectId = subjectId;
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
          this.$store.dispatch("accountSubject/removeOne", { subjectId: id }).then(() => {
            if (1 === this.tableData.length) {
              this.prevClick();
            } else {
              this.loadData("{}");
            }
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
        .dispatch("accountSubject/save", formData)
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogVisible = false;
    }
  },
  created() {
    this.loadData();
  },
  components: {
      accountSubjectSearch,
      accountSubjectEdit
  }
};
</script>
<style>
.el-cascader-menu {
  height: 200px;
}
</style>
