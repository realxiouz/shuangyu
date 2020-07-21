<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加功能</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
      <el-table-column label="功能类别" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.featureType==0">属性</span>
          <span v-else-if="scope.row.featureType==1">服务</span>
          <span v-else-if="scope.row.featureType==2">事件</span>
        </template>
      </el-table-column>
      <el-table-column label="功能名称" width="300" prop="name"/>
      <el-table-column label="功能编码" width="200" prop="code"/>
      <el-table-column label="描述" prop="description"/>
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{formatDate(scope.row.createTime,"YYYY-MM-DD hh:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row.featureId)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row.featureId)">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :feature-id="featureId" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";

  export default {
    data() {
      return {
        dialogVisible: false,
        pageFlag: 0,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        loading: true,
        featureId: ''
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
      loadData() {
        if (!this._.isEmpty(this.lastId)) {
          this.params.lastId = this.lastId;
        }
        this.$store
          .dispatch("productFeature/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            params:this.params
          })
          .then(data => {
            this.tableData = data.rows;
            this.total = data.total;
          });
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
          this.lastId = this.tableData[0].featureId;
        }
        this.loadData();
      },
      onNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].featureId;
        }
        this.loadData();
      },
      handleAdd() {
        this.featureId = '';
        this.dialogVisible = true;
      },
      onEdit(id) {
        this.featureId = id;
        this.dialogVisible = true;
      },
      handleDel(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("productFeature/removeOne", {featureId: id}).then(() => {
            this.onRefresh();
            this.$message({type: "success", message: "删除成功"});
          });
        });
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
