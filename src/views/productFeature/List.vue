<template>
  <div class="contentBox">
    <search ref="search" @onSearch="handleSearch"/>
    <el-row type="flex" justify="space-between" style="margin-bottom:20px;" align="bottom">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加功能</el-button>
    </el-row>
    <el-table :data="tableData">
      <el-table-column label="功能类别" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ featureCate[scope.row.featureType].value}}</span>
        </template>
      </el-table-column>

      <el-table-column label="功能名称" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.featureName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="标识符" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.featureCode}}</span>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" width="180">
        <template slot-scope="scope">
              <span
                style="margin-left: 10px"
              >{{formatDate(scope.row.createTime,"YYYY-MM-DD h:mm:ss")}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.featureId)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.featureId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentChange"
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
    <edit :visible.sync="dialogVisible"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";

  export default {
    data() {
      return {
        dialogVisible: false,
        pageFlag: 1,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        loading: true
      };
    },
    methods: {
      // 新增功能
      handleAdd() {
        this.dialogVisible = true;
      },
      // 获取列表
      getList() {
        this.$store
          .dispatch("productFeature/getList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId
          })
          .then(result => {
            this.tableData = result;
          });
      },
      getTotal() {
        this.$store.dispatch("productFeature/getTotal").then(result => {
          this.total = result;
        });
      },
      // 获取数据 （列表+条数）
      loadData() {
        this.pageFlag = 0;
        this.getList();
        this.getTotal();
      },
      handleSearch() {
      },
      handleEdit(id) {
        this.dialogVisible = true;
      },
      handleDelete(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(id);
        });
      },
      // 时间格式
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
    created() {
      this.loadData();
    }
  };
</script>
