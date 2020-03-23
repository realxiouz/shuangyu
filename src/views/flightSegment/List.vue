<template>
  <div class="segment-container">
    <segment-search @onSearch="handleSearch"></segment-search>
    <el-row style="margin-bottom:15px;margin-left:10px;">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table
      size="mini"
      :data="tableData"
      ref="tableData"
      @row-dblclick="handleEdit"
      style="width: 100%;margin-bottom:15px;"
    >
      <el-table-column prop="dpt" label="出发地"></el-table-column>
      <el-table-column prop="arr" label="目的地"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="removeOne(scope.row.segment)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
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
    <el-dialog
      title="航段"
      :before-close="handleClose"
      center
      :visible.sync="dialogVisible"
      width="30%"
    >
      <segment-edit
        v-if="dialogVisible"
        :segment="segment"
        ref="form"
        @onSave="handleSave"
        @onCancel="handleCancel"
      ></segment-edit>
    </el-dialog>
  </div>
</template>
<script>
import segmentSearch from "./Search.vue";
import segmentEdit from "./Edit.vue";
export default {
  data() {
    return {
      segment: "",
      searchForm: {},
      dialogVisible: false,
      tableData: [],
      lastId: "0",
      pageFlag: "next",
      pageSize: 10,
      total: 0,
      currentPage: 0
    };
  },
  methods: {
    handleAdd() {
      this.segment = "";
      this.dialogVisible = true;
    },
    loadData() {
      this.$store
        .dispatch("flightSegment/getPageList", {
          pageSize: this.pageSize,
          lastId: this.lastId,
          pageFlag: this.pageFlag,
          searchForm: this.searchForm
        })
        .then(data => {
          this.loadTotal(this.searchForm);
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTotal() {
      this.$store
        .dispatch("flightSegment/getTotal", this.searchForm)
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.lastId = "0";
      this.loadData();
    },
    prevClick() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].segment;
      this.loadData();
    },
    nextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].segment;
      this.loadData();
    },
    removeOne(id) {
      this.$confirm("是否确定删除航段信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("flightSegment/removeOne", { segment: id })
            .then(data => {
              console.log(data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleEdit(row) {
      this.segment = row.segment;
      this.dialogVisible = true;
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.$confirm("确认关闭对话框？")
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {});
    },
    handleSave() {
      this.dialogVisible = false;
      this.loadData();
    },
    handleSearch(params) {
      this.searchForm = params;
      this.lastId = "0";
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  },
  components: {
    segmentEdit,
    segmentSearch
  }
};
</script>
