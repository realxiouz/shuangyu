<template>
  <div class="bigBox">
    <div class="searchBox">
      <accounting-subjects-search @onSearch="handleSearch"></accounting-subjects-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        size="mini"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom:15px;"
      >
        <el-table-column prop label="科目编码" align="center"></el-table-column>
        <el-table-column prop label="科目名称" align="center"></el-table-column>
        <el-table-column prop label="类别" align="center"></el-table-column>
        <el-table-column prop label="余额方向" align="center"></el-table-column>
        <el-table-column prop label="数量核算" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.initBalance)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="辅助核算" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.balance)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="外币核算" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.balance)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="期末调汇" align="center">
          <template slot-scope="scope">
            <span>{{formatAmount(scope.row.balance)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>

      <el-dialog
        title="会计科目"
        center
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="33%"
      >
        <accounting-subjects-edit
          v-if="dialogVisible"
          :cur-node="curNode"
          :update="update"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></accounting-subjects-edit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import accountingSubjectsSearch from "./Search.vue";
import accountingSubjectsEdit from "./Edit.vue";

export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      update: false,
      deleteForSearch: false,
      curNode: {},
      tableData: [],
      lastId: "blank",
      pageFlag: "next",
      pageSize: 10,
      total: 0
    };
  },
  components: {
    accountingSubjectsSearch,
    accountingSubjectsEdit
  },
  methods: {
    loadData() {
      this.$store
        .dispatch("fundAccount/getTotal", { filter: {} })
        .then(data => {
          this.total = data.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.$store
        .dispatch("fundAccount/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: {}
        })
        .then(data => {
          this.tableData = data.data;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    handleSearch(params) {
      this.deleteForSearch = true;
      this.$store
        .dispatch("fundAccount/getTotal", {
          filter: params.keyword ? { fundAccount: params.keyword } : {}
        })
        .then(data => {
          this.total = data.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.$store
        .dispatch("fundAccount/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: params.keyword ? { fundAccount: params.keyword } : {}
        })
        .then(data => {
          this.tableData = data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.curNode = {};
      this.update = false;
    },
    handleSave(formData) {
      this.dialogVisible = false;

      let url = "";
      if (this.update) {
        url = "fundAccount/updateOne";
      } else {
        url = "fundAccount/addOne";
      }
      this.$store
        .dispatch(url, formData)
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.curNode = row;
      this.update = true;
    },
    handlePrevClick() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].fundAccountId;
      this.loadData();
    },
    handleNextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].fundAccountId;
      this.loadData();
    },
    handleDelete(row) {
      this.open(
        this.delete,
        row.fundAccountId,
        "此操作将删除该资金账号信息, 是否继续?"
      );
    },
    delete(fundAccountId) {
      this.$store
        .dispatch("fundAccount/removeOne", { fundAccountId: fundAccountId })
        .then(() => {
          this.lastId = "blank";
          if (1 === this.tableData.length && !this.deleteForSearch) {
            this.handlePrevClick();
          } else {
            this.loadData();
          }
          this.deleteForSearch = false;
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
    },
    formatAmount(amount) {
      if (!amount) {
        return "0.00";
      }
      return this.$numeral(amount).format("0.00");
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
