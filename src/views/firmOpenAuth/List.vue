<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="平台编码" align="center" prop="openCode" />
      <el-table-column label="平台名称" align="center" prop="openName" />
      <el-table-column label="企业名称" align="center" prop="firmName" />
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onEdit(scope.row.authId)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row.authId)">删除</el-button>
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
        keyName: 'authId',
        actions: {
          getPageList: 'firmOpenAuth/getPageList',
          removeOne: 'firmOpenAuth/removeOne'
        }
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
