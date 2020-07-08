<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="handleSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="凭证字号" align="center" prop="voucherCode" />
      <el-table-column label="制单人" align="center" prop="staffName" />
      <el-table-column label="商户类型" align="center" prop="merchantType" />
      <el-table-column label="商户名称" align="center" prop="merchantName" />
      <el-table-column label="商户域名" align="center" prop="merchantDomain" />
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleRecord(scope.row.voucherInfoId)">分录</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.voucherInfoId)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.voucherInfoId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
      @prev-click="handlePrev"
      @next-click="handleNext"
    ></el-pagination>
    <record :visible.sync="queryVisible" :queryInfoId="queryInfoId" @refresh="handleRefresh"/>
    <edit :visible.sync="dialogVisible" :editInfoId="editInfoId" @refresh="handleRefresh"/>
  </div>
</template>

<script>
  import record from "./Record";
  import edit from "./Edit";
  import search from "./Search";

  export default {
    data() {
      return {
        queryVisible: false,
        dialogVisible: false,
        pageFlag: 0,
        pageSize: 10,
        lastId: "blank",
        total: 0,
        tableData: [],
        loading: true,
        queryInfoId: null,
        editInfoId: null,
        params: {},
      };
    },
    methods: {
      formatDate(dateStr, format) {
        if (null != dateStr) {
          const date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      },
      getList() {
        if (this.lastId) {
          this.params.lastId = this.lastId;
        }
        this.$store
          .dispatch("voucherInfo/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId,
            params: this.params
          })
          .then(result => {
            if (result && result.rows && result.rows.length > 0) {
              this.tableData = result.rows;
              this.total = result.total;
            } else {
              this.tableData = [];
              this.total = 0;
            }
          });
      },
      loadData() {
        this.getList();
      },
      handleSearch(params) {
        this.params = params;
        this.pageFlag = 0;
        this.lastId = null;
        this.loadData();
      },
      handleRefresh() {
        this.handleSearch();
      },
      handlePrev() {
        this.pageFlag = -1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[0].voucherInfoId;
        }
        this.loadData();
      },
      handleNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].voucherInfoId;
        }
        this.loadData();
      },
      handleAdd() {
        this.editInfoId = null;
        this.dialogVisible = true;
      },
      handleRecord(id){
        this.queryInfoId = id;
        this.queryVisible = true;
      },
      handleEdit(id) {
        this.editInfoId = id;
        this.dialogVisible = true;
      },
      handleDel(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("voucherInfo/removeOne", {voucherInfoId: id}).then(() => {
            this.handleRefresh();
            this.$message({ type: "success", message: "删除成功" });
          });
        });
      }
    },
    components: {
      record,
      edit,
      search
    },
    created() {
      this.loadData();
    }
  };
</script>
