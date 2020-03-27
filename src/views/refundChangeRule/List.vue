<template>
  <div class="bigBox">
    <div class="searchBox">
      <refund-change-rule-search @onSearch="handleSearch"></refund-change-rule-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        size="mini"
        :data="tableData"
        ref="tableData"
        @row-dblclick="handleEdit"
        style="width: 100%;margin-bottom:15px;"
      >
        <el-table-column prop="airlineCode" label="航司二字码" align="center"></el-table-column>
        <el-table-column prop="cabin" label="舱位" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click="removeOne(scope.row.ruleId)" type="danger" size="small">删除</el-button>
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
        title="退改规则"
        center
        :visible.sync="dialogVisible"
        width="55%"
      >
        <refund-change-rule-edit
          v-if="dialogVisible"
          :rule-id="ruleId"
          ref="form"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></refund-change-rule-edit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import refundChangeRuleSearch from "./Search.vue";
import refundChangeRuleEdit from "./Edit.vue";

export default {
  data() {
    return {
      ruleId: "",
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
      this.ruleId = "";
      this.dialogVisible = true;
    },
    loadData() {
      this.$store
        .dispatch("refundChangeRule/getPageList", {
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
        .dispatch("refundChangeRule/getTotal", this.searchForm)
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
      this.lastId = this.tableData[0].ruleId;
      this.loadData();
    },
    nextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].ruleId;
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
                if (1 === this.tableData.length){
                    this.prevClick();
                }else{
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
    handleEdit(row) {
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
    refundChangeRuleEdit,
    refundChangeRuleSearch
  }
};
</script>
