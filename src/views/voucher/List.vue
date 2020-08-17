<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      <el-button icon="el-icon-download" type="primary" size="mini" @click="onExport">导出</el-button>
    </el-row>

    <el-table class="page-table" :data="tableData" @selection-change="onSelectionChange">>
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
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onEdit(scope.row.voucherId)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row.voucherId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
      @size-change="onSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
      @current-change="onCurrentChange"
      :current-page.sync="currentPage"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";
  import {exportExcel} from '@/utils/export';

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        dialogVisible: false,
        keyName: 'voucherId',
        actions: {
          getPageList: 'voucher/getPageList',
          removeOne: 'voucher/removeOne',
        },
        selectIds: [],
        exportUrl: '/finance/export/voucher/excel'
      };
    },
    methods: {
      onSelectionChange(data) {
        if (data && data.length > 0) {
          let that = this;
          for (const key in data) {
            let object = data[key];
            for (const field in object) {
              if (field === that.keyName) {
                that.selectIds.push(object[field]);
              }
            }
          }
        }
      },
      onExport() {
        if (!this.selectIds || this.selectIds.length < 1) {
          this.$message({type: 'warning', message: '请先选择要导出的凭证！'});
          return;
        }
        if (!this.actions || !this.exportUrl) {
          this.$message({type: 'warning', message: '丢失导出地址！'});
          return;
        }
        exportExcel(
          this,
          'get',
          this.actions.exportUrl,
          {ids: this.selectIds},
          '凭证文件'
        );
      }
    },
    components: {
      edit,
      search
    },
  };
</script>

<style>
</style>
