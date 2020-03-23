<template>
  <div class="bigBox">
    <div class="searchBox">
      <airport-search @onSearch="handleSearch"></airport-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        size="mini"
        :data="tableData"
        ref="tableData"
        @row-dblclick="handleEdit"
        style="width: 100%;margin-bottom:15px;"
      >
        <el-table-column prop="airportCode" label="三字码"></el-table-column>
        <el-table-column prop="airportName" label="机场名称"></el-table-column>
        <el-table-column prop="airportCity" label="机场所在城市"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click="removeOne(scope.row.airportCode)" type="danger" size="small">删除</el-button>
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
        title="添加机场信息"
        center
        :before-close="handleClose"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <airport-edit
          v-if="dialogVisible"
          :airport-code="airportCode"
          ref="form"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></airport-edit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import airportSearch from "./Search.vue";
import airportEdit from "./Edit.vue";

export default {
  data() {
    return {
      airportCode: "",
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
      this.airportCode = "";
      this.dialogVisible = true;
    },
    loadData() {
      this.$store
        .dispatch("airport/getPageList", {
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
        .dispatch("airport/getTotal", this.searchForm)
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
      this.lastId = this.tableData[0].airportCode;
      this.loadData();
    },
    nextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].airportCode;
      this.loadData();
    },
    removeOne(id) {
      this.$confirm("是否确定删除机场信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("airport/removeOne", { airportCode: id })
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
      this.airportCode = row.airportCode;
      this.dialogVisible = true;
    },
    handleClose() {
      this.$confirm("确认关闭添加机场信息对话框？")
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {});
    },
    handleCancel() {
      this.dialogVisible = false;
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
    airportEdit,
    airportSearch
  }
};
</script>
