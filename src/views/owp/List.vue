<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        highlight-current-row
        v-loading="loading"
        :data="tableData"
        ref="tableData"
        style="width: 100%;"
        size="mini"
      >
        <el-table-column prop="policyCode" label="政策前缀" align="center"></el-table-column>
        <el-table-column prop="author" label="负责人" align="center"></el-table-column>
        <el-table-column prop="startDate" label="旅行开始日期" align="center"></el-table-column>
        <el-table-column prop="endDate" label="旅行结束日期" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="330">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.id)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button @click="start(scope.row)" type="text" size="mini" class="btn-primary">启动</el-button>
            <el-button @click="stop(scope.row)" type="text" size="mini" class="btn-primary">停止</el-button>
            <el-button @click="onCopy(scope.row)" type="text" size="mini" class="btn-primary">复制</el-button>
            <el-button @click="onDel(scope.row.id)" type="text" size="mini" class="btn-danger">删除</el-button>
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
    name: "owpList",
    data() {
      return {
        dialogVisible: false,
        deleteForSearch: false,
        updateFlag: false,
        id: "",
        keyName:'id',
        actions: {
          getPageList: 'owp/getPageList',
          removeOne: 'owp/removeOne'
        }
      };
    },
    components: {
      edit,
      search
    },
    methods: {
      onCopy(row) {
        this.dialogVisible = true;
        this.updateFlag = false;
        this.id = row.id;
      },
     
      start(row) {
        this.$store
          .dispatch("xxlJob/trigger", {
            jobId: row.jobInfoId,
            filter: {
              executorParam: row.jobInfoId
            }
          })
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      stop(row) {
        this.$store
          .dispatch("xxlJob/stop", {jobId:  row.jobInfoId})
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
    

  };
</script>

