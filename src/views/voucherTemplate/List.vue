<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="handleSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="handleAdd"
        >添加</el-button
      >
    </el-row>
    <el-table class="page-table" :data="tableData" v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.voucherRecords">
            <el-table-column prop="summary" label="摘要" />
            <el-table-column prop="subjectName" label="科目" />
            <el-table-column label="借方金额">
              <template slot-scope="scope">
                {{ scope.row.borrowAmount > 0 ? scope.row.borrowAmount : "" }}
              </template>
            </el-table-column>
            <el-table-column label="贷方金额">
              <template slot-scope="scope">
                {{ scope.row.loanAmount > 0 ? scope.row.loanAmount : "" }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="凭证字号" align="center" prop="voucherCode" />
      <el-table-column label="制单人" align="center" prop="staffName" />
      <el-table-column label="制单日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.voucherDate | time("YYYY-MM-DD") }}
        </template>
      </el-table-column>
      <el-table-column width="300" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.row.templateId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="handlePrev"
      @next-click="handleNext"
      @size-change="handleSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
    />
    <edit
      :visible.sync="dialogVisible"
      :templateId="templateId"
      @refresh="handleRefresh"
    />
  </div>
</template>

<script>
import { MIXIN_TABLE } from "@/utils/mixin";
import edit from "./Edit";
import search from "./Search";

export default {
  name: "voucherTemplate",
  data() {
    return {
      beanIdName: "templateId",
      actionName: "voucherTemplate/getPageList",
      templateId: ""
    };
  },
  methods: {
  },
  components: {
    edit,
    search
  },
  mixins: [MIXIN_TABLE]
};
</script>

<style></style>
