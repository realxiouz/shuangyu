<template>
  <div class="bigBox">
    <div class="searchBox">
      <third-party-search @onSearch="handleSearch"></third-party-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:40px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        size="mini"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
      >
        <el-table-column prop="thirdName" label="平台名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click="handRemove(scope.row,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
        @prev-click="prevClick"
        @next-click="nextClick"
      ></el-pagination>
      <el-dialog
        title="用户信息"
        :close-on-click-modal="false"
        center
        :visible.sync="dialogVisible"
        width="30%"
      >
        <third-party-edit
          v-if="dialogVisible"
          ref="thirdpartyForm"
          :third-id="thirdId"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></third-party-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import thirdPartyEdit from "./Edit.vue";
import thirdPartySearch from "./Search.vue";

export default {
  name: "List",
  data() {
    return {
      loading: true,
      thirdId: null,
      dialogVisible: false,
      pageFlag: "next",
      pageSize: 10,
      lastId: "blank",
      total: 0,
      tableData: []
    };
  },
  methods: {
    handleSearch(formData) {
      if (!formData || !formData.thirdName) {
        formData = {};
      }
      this.$store
        .dispatch("thirdParty/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: 10,
          lastId: this.lastId,
          filters: formData
        })
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
      this.loadTotal(formData);
    },
    loadTotal(formData) {
      if (!formData || !formData.thirdName) {
        formData = {};
      }
      this.$store
        .dispatch("thirdParty/getTotal", { filters: formData })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.thirdId = "";
    },
    handRemove(row, index, rows) {
      this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("thirdParty/removeOne", { thirdId: row.thirdId })
            .then(res => {
              if (res) {
                rows.splice(index, 1);
                this.total--;
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleUpdate(row) {
      this.dialogVisible = true;
      this.thirdId = row.thirdId;
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleSave(formData) {
      this.$store
        .dispatch("thirdParty/save", formData)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.handleSearch();
            this.loadTotal();
            this.$message({
              type: "success",
              message: "添加成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogVisible = false;
    },
    prevClick() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].thirdId;
      this.handleSearch();
    },
    nextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].thirdId;
      this.handleSearch();
    }
  },
  created() {
    this.handleSearch();
    this.loadTotal();
  },
  components: {
    thirdPartyEdit,
    thirdPartySearch
  }
};
</script>
