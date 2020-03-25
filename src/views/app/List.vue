<template>
  <div class="bigBox">
    <div class="searchBox">
      <app-search @onSearch="handleSearch"></app-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table :data="tableData" style="width: 100%;margin-bottom: 15px;" size="mini">
        <el-table-column prop="appName" label="应用名称" align="center"></el-table-column>
        <el-table-column label="是否启用" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" @change="handleSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.appId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.appId,scope.$index,tableData)"
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
        title="应用"
        :before-close="handleClose"
        center
        :visible.sync="dialogVisible"
        width="30%"
      >
        <app-edit
          v-if="dialogVisible"
          :app-id="appId"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></app-edit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import appSearch from "./Search";
import appEdit from "./Edit";

export default {
  name: "appList",
  data() {
    return {
      lastId: "0",
      pageFlag: "next",
      pageSize: 10,
      dialogVisible: false,
      tableData: [],
      appId: "",
      total: 0
    };
  },
  methods: {
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
    loadTotal(searchForm) {
      if (!searchForm || !searchForm.appName) {
        searchForm = {};
      }
      this.$store
        .dispatch("app/getTotal", {
          filters: searchForm
        })
        .then(response => {
          this.total = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadData(searchForm) {
      if (!searchForm || !searchForm.appName) {
        searchForm = {};
      }
      this.$store
        .dispatch("app/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: searchForm
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
    handleSwitch(row) {
      row.enable = row.enable ? true : false;
      this.$store
        .dispatch("app/updateOne", row)
        .then(() => {})
        .catch(error => {
          console.log(error);
        });
    },
    handleClose() {
      this.$confirm("确认关闭对话框？")
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {});
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleAdd(params) {
      this.dialogVisible = true;
      this.appId = "";
    },
    handleUpdate(id) {
      this.appId = id;
      this.dialogVisible = true;
    },
    handleRemove(id, index, rows) {
      this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("app/removeOne", { appId: id }).then(() => {
            this.loadData();
            rows.splice(index, 1);
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleSave(formData) {
      this.$store
        .dispatch("app/save", formData)
        .then(() => {
          this.handleSearch();
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogVisible = false;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    handleSearch(params) {
      if (!params) {
        params = {};
      }
      this.loadData(params);
      this.loadTotal(params);
    }
  },
  created() {
    this.handleSearch();
  },
  components: {
    appSearch,
    appEdit
  }
};
</script>

