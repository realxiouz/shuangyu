<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="调度名称" align="center" prop="schedulerName" />
      <el-table-column label="xxlJobId" align="center" prop="jobInfoId" />
      <el-table-column label="时间表达式" align="center" prop="cron" />
      <el-table-column label="是否启动" align="center" prop="status">
        <template slot-scope="scope">
          <span> {{scope.row.status ? '已启动' : '未启动'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onStart(scope.row.schedulerId)" v-if="scope.row.status === 0">启动</el-button>
          <el-button size="mini" type="primary" @click="onStop(scope.row.schedulerId)" v-if="scope.row.status === 1">停止</el-button>
          <el-button size="mini" type="primary" @click="onEdit(scope.row.schedulerId)">编辑</el-button>
          <el-button size="mini" type="primary" @click="onCopy(scope.row.schedulerId)">复制</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row.schedulerId)">删除</el-button>
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
        dialogVisible: false,
        schedulerId:'',
        keyName:'schedulerId',
        editSchedulerId: null,
        actions: {
          getPageList: 'jobScheduler/getPageList',
          removeOne: 'jobScheduler/removeOne'
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
      },
      
      onStart() {
        alert("启动");
      },
      onStop() {
        alert("停止");
      },
     
    },
    components: {
      edit,
      search
    },
  };
</script>

<style>
  .page-tools {
    margin-bottom: 10px;
  }
</style>
