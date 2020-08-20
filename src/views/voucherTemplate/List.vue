<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      size="mini"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;"
    >
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
      <el-table-column prop="templateName" label="模板名称" align="center"/>
      <el-table-column label="模板类型" align="center">
        <template v-slot="{ row }">
          {{ tempMap[row.templateType] }}
        </template>
      </el-table-column>
      <el-table-column label="凭证字号" align="center" prop="voucherCode" />
      <el-table-column label="制单人" align="center" prop="originatorName" />
      <el-table-column label="制单日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.voucherDate | time("YYYY-MM-DD") }}
        </template>
      </el-table-column>
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" class="btn-primary" @click="onEdit(scope.row.templateId)">修改</el-button>
          <el-button type="text" size="mini" class="btn-danger" @click="onDel(scope.row.templateId)">删除</el-button>
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
  import { VOUCHCHER_TEMPLATE_MAP } from "@/utils/const";

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        dialogVisible: false,
        keyName: 'templateId',
        actions: {
          getPageList: 'voucherTemplate/getPageList',
          removeOne: 'voucherTemplate/removeOne'
        },
        tempMap: VOUCHCHER_TEMPLATE_MAP,
      };
    },
    methods: {
    },
    components: {
      edit,
      search
    },
  };
</script>

<style>
</style>
