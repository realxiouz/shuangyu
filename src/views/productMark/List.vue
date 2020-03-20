<template>
  <div class="app-container">
    <product-mark-search ref="user" @onSearch="handleSearch"></product-mark-search>
    <el-row style="margin-bottom:15px;">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="firmName" label="企业" align="center"></el-table-column>
      <el-table-column prop="domain" label="域名" align="center"></el-table-column>
      <el-table-column label="第三方标签" align="center">
        <template slot-scope="scope">
          <el-button @click="showFlagList(scope.row)" type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
    <el-dialog center title="接口参数信息" :visible.sync="dialogVisible" width="33%">
      <product-mark-edit
        v-if="dialogVisible"
        :markId="markId"
        @onSave="handleSave"
        @onCancel="handleCancel"
      ></product-mark-edit>
    </el-dialog>
    <el-dialog center title="接口参数信息" :visible.sync="flagListVisible" width="33%">
      <flg-list v-if="flagListVisible" :flags="flags" @onCancel="handleCancelFlagList"></flg-list>
    </el-dialog>
  </div>
</template>

<script>
import productMarkEdit from "./Edit.vue";
import productMarkSearch from "./Search.vue";
import FlgList from "./FlagList.vue";

export default {
  name: "List",
  data() {
    return {
      dialogVisible: false,
      flagListVisible: false,
      markId: null,
      flags: [],
      pageFlag: "next",
      pageSize: 10,
      lastId: "blank",
      total: 0,
      tableData: []
    };
  },
  methods: {
    loadData() {
      this.$store
        .dispatch("productMark/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: {}
        })
        .then(data => {
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTotal() {
      this.$store
        .dispatch("productMark/getTotal")
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAdd() {
      //判断添加的导航是否是顶级导航
      this.rootNav = true;
      this.dialogVisible = true;
      this.markId = "";
    },
    handleSearch(firmId) {
      this.$store
        .dispatch("productMark/getList", { firmId: firmId })
        .then(data => {
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSave(formData) {
      this.$store
        .dispatch("productMark/save", formData)
        .then(() => {
          this.loadData();
          this.total += 1;
        })
        .catch(error => {
          console.log(error);
        });

      this.dialogVisible = false;
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.markId = row.markId;
    },
    //点击查看标签列表
    showFlagList(row) {
      this.flagListVisible = true;
      this.flags = row.flags;
    },
    handleCancelFlagList() {
      this.flagListVisible = false;
    },
    handleDelete(row) {
      this.open(
        this.delete,
        row.markId,
        "此操作将删除该用户的所有信息, 是否继续?"
      );
    },
    delete(markId) {
      this.$store
        .dispatch("productMark/removeOne", markId)
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    prevClick: function() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].markId;
      this.loadData();
    },
    nextClick: function() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].markId;
      this.loadData();
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
    }
  },
  mounted() {
    this.loadData();
    this.loadTotal();
  },
  components: {
    productMarkEdit,
    productMarkSearch,
    FlgList
  }
};
</script>
