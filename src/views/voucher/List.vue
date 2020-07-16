<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      <el-button icon="el-icon-download" type="primary" size="mini" @click="handleExport">导出</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData" @selection-change="handleSelectionChange">>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.voucherRecords" border>
            <el-table-column prop="summary" label="摘要" />
            <el-table-column prop="subjectName" label="科目" />
            <el-table-column label="借方金额">
              <template slot-scope="scope">
                {{ scope.row.borrowAmount > 0 ? scope.row.borrowAmount : '' }}
              </template>
            </el-table-column>
            <el-table-column label="贷方金额">
              <template slot-scope="scope">
                {{ scope.row.loanAmount > 0 ? scope.row.loanAmount : '' }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="凭证字号" align="center" prop="voucherCode" />
      <el-table-column label="制单人" align="center" prop="originatorName" />
      <el-table-column label="制单日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.voucherDate | time("YYYY-MM-DD") }}
        </template>
      </el-table-column>
      <el-table-column width="300" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onEdit(scope.row.voucherId)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.voucherId)">删除</el-button>
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
      @prev-click="onPrev"
      @next-click="onNext"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :editVoucherId="editVoucherId" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import { exportExcel } from '@/utils/export';

  export default {
    data() {
      return {
        queryVisible: false,
        dialogVisible: false,
        pageFlag: 0,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        loading: true,
        queryVoucherId: null,
        editVoucherId: null,
        exportIds: [],
        params: {},
      };
    },
    methods: {
      getList() {
        if (this.lastId) {
          this.params.lastId = this.lastId;
        }
        this.$store
          .dispatch("voucher/getPageList", {
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
      onSearch(params) {
        this.params = params;
        this.pageFlag = 0;
        this.lastId = null;
        this.loadData();
      },
      onRefresh() {
        this.onSearch();
      },
      onPrev() {
        this.pageFlag = -1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[0].voucherId;
        }
        this.loadData();
      },
      onNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].voucherId;
        }
        this.loadData();
      },
      handleAdd() {
        this.editVoucherId = null;
        this.dialogVisible = true;
      },
      handleExport() {
        if(!this.exportIds || this.exportIds.length < 1){
          this.$message({ type: "warning", message: "请先选择要导出的凭证！" });
          return;
        }
        exportExcel(this, 'get', '/finance/export/voucher/excel', { ids: this.exportIds }, '凭证文件');
      },
      onEdit(id) {
        this.editVoucherId = id;
        this.dialogVisible = true;
      },
      handleDel(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("voucher/removeOne", {voucherId: id}).then(() => {
            this.onRefresh();
            this.$message({ type: "success", message: "删除成功！" });
          });
        });
      },
      handleSelectionChange(data) {
        if(data && data.length > 0){
          let that = this;
          that.exportIds = [];
          data.forEach(function(obj){
            that.exportIds.push(obj.voucherId);
          });
        }
      }
    },
    components: {
      edit,
      search
    },
    created() {
      this.loadData();
    }
  };
</script>

<style>
  .page-tools {
    margin-bottom: 10px;
  }
</style>
