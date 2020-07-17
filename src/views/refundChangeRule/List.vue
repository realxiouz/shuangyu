<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px;margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        size="mini"
        :data="tableData"
        ref="tableData"
        @row-dblclick="onEdit"
        style="width: 100%;margin-bottom:15px;"
      >
        <el-table-column prop="airlineCode" label="航司二字码" align="center"></el-table-column>
        <el-table-column prop="cabin" label="舱位" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click="removeOne(scope.row.ruleId)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-footer"
        @size-change="onSizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        :current-page="currentPage"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <el-dialog title="退改规则" center :visible.sync="dialogVisible" width="55%">
        <edit
          v-if="dialogVisible"
          :rule-id="ruleId"
          ref="form"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></edit>
      </el-dialog>
    </div>
</template>
<script>
import edit from "./Edit";
  import search from "./Search";

export default {
  data() {
    return {
      loading: true,
      ruleId: "",
      searchForm: {},
      dialogVisible: false,
      tableData: [],
      lastId: null,
      pageFlag: 0,
      pageSize: 10,
      total: 0,
      currentPage: 0
    };
  },
  methods: {
    handleAdd() {
      this.ruleId = "";
      this.dialogVisible = true;
    },
    loadData() {
      this.$store
        .dispatch("refundChangeRule/getPageList", {
          pageSize: this.pageSize,
          lastId: this.lastId,
          pageFlag: this.pageFlag,
          ...this.searchForm
        })
        .then(data => {
          if (data) {
            this.tableData = data.rows;
            this.total = data.total;
          }
            this.loading = false;

        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    onSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.lastId = null;
      this.pageFlag = 0;
      this.loadData();
    },
    prevClick() {
      this.pageFlag = -1;
      if (this.tableData.length > 0) {
        this.lastId = this.tableData[0].ruleId;
      }
      this.loadData();
    },
    nextClick() {
      this.pageFlag = 1;
      if (this.tableData.length > 0) {
        this.lastId = this.tableData[this.tableData.length - 1].ruleId;
      }
      this.loadData();
    },
    removeOne(id) {
      this.$confirm("是否确定删除退改规则信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("refundChangeRule/removeOne", { ruleId: id })
            .then(() => {
              if (1 === this.tableData.length) {
                this.prevClick();
              } else {
                this.loadData();
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
    onEdit(row) {
      this.ruleId = row.ruleId;
      this.dialogVisible = true;
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleSave() {
      this.dialogVisible = false;
      this.loadData();
    },
    onSearch(params) {
      this.searchForm = params;
      this.lastId = null;
      this.pageFlag = 0;
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  },
  components: {
    edit,
      search
  }
};
</script>
