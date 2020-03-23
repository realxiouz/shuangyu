<template>
  <div class="app-container">
    <order-rule-search @onSearch="handleSearch"></order-rule-search>
    <el-row style="margin-bottom:15px; margin-left:30px;">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 15px;"
      border
      default-expand-all
      size="mini"
    >
      <el-table-column prop="ruleName" label="规则名称"></el-table-column>
      <el-table-column prop="domain" label="公司域名"></el-table-column>
      <el-table-column prop="policyCodes" label="政策代码">
        <template slot-scope="scope">
          <span>{{scope.row.policyCodes.join(",")}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button
            @click.native.prevent="removeOne(scope.row.orderRuleId)"
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
  </div>
</template>

<script>
import orderRuleSearch from "./Search.vue";

export default {
  name: "orderRuleList",
  data() {
    return {
      orderRuleId: 1,
      lastId: "0",
      pageFlag: "next",
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      searchForm: {},
      tableData: []
    };
  },
  methods: {
    handleEdit(row) {
      this.$router.push({ name: "orderRuleEdit", params: row });
    },
    handleAdd() {
      this.$router.push("/order/rule/edit");
    },
    loadData() {
      this.$store
        .dispatch("orderRule/list", {
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
        .dispatch("orderRule/total", this.searchForm)
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
      this.lastId = this.tableData[0].airlineCode;
      this.loadData();
    },
    nextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].airlineCode;
      this.loadData();
    },
    handleSearch(params) {
      this.searchForm = params;
      this.lastId = "0";
      this.loadData();
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleSave() {
      this.dialogVisible = false;
    },
    removeOne(id) {
      this.$confirm("是否确定删除派单规则信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("orderRule/removeOne", id)
            .then(() => {
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    this.loadData();
  },
  components: {
    /*orderRuleEdit,*/
    orderRuleSearch
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
