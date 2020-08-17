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
      style="width: 100%;margin-bottom:15px;"
    >
      <el-table-column
        prop="currencyCode"
        label="币种"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="currencyName"
        label="币种名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="symbol"
        label="货币符号"
        align="center"
      ></el-table-column>
      <el-table-column label="日期" align="center">
        <template slot-scope="scope">
          <span> {{ formatDate(scope.row.date, "YYYY-MM-DD") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rate"
        label="当前比率"
        align="center"
      ></el-table-column>
      <el-table-column label="是否有效" align="center">
        <template slot-scope="scope">
          <span> {{ scope.row.enable ? "有效" : "无效" }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onEdit(scope.row.currencyId)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row.currencyId)">删除</el-button>
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

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        dialogVisible: false,
        keyName: 'currencyId',
        actions: {
          getPageList: 'currency/getPageList',
          removeOne: 'currency/removeOne'
        }
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
