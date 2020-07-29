<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px;margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        size="mini"
        :data="tableData"
        ref="tableData"
        @row-dblclick="onEdit"
        style="width: 100%;margin-bottom:15px;"
      >
        <el-table-column prop="airlineCode" label="航司二字码" align="center"></el-table-column>
        <el-table-column prop="cabin" label="舱位" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.ruleId)" type="primary" size="small">编辑</el-button>
            <el-button @click="onDel(scope.row.ruleId)" type="danger" size="small">删除</el-button>
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
      
      <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"></edit>
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
      ruleId: "",
      keyName:'ruleId',
      searchForm: {},
      dialogVisible: false,
      currentPage: 0,
      actions: {
          getPageList: 'refundChangeRule/getPageList',
          removeOne: 'refundChangeRule/removeOne'
        }
    };
  },
  methods: {
    
    
  },
  components: {
    edit,
      search
  }
};
</script>
