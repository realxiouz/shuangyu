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
          <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
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
      const validateSign = (rule, value, callback) => {
        var signRe = /^[a-zA-Z_][a-zA-Z0-9_]{4,20}$/;
        if (signRe.test(value)) {
          callback();
        } else {
          callback(new Error("不能数字开头，支持中英文下划线，5-20位"));
        }
      };

      return {
        pageFlag: false,
        lastId: "",
        dialogVisible: false,
        tableData: [],
        total: 0,
        currentParamList: "",
        currentPage: 1,
        pageSize: 8,
        featureCate: [
          {id: 0, value: "属性"},
          {id: 1, value: "服务"},
          {id: 2, value: "事件"}
        ],
        cocurrentFeatureId: ""
      };
    },
    methods: {
      // 新增功能
      handleAdd() {
        this.dialogVisible = true;
      },
      // 获取列表
      getList(cb) {
        this.$store
          .dispatch("productFeature/getList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId
          })
          .then(result => {
            this.tableData = result;
            cb && cb();
          });
      },
      // 页码切换
      currentChange(nextPage) {
        const pageFlag = this.currentPage > nextPage ? -1 : 1;
        const tableData = this.tableData;
        let lastId;
        if (tableData.length) {
          if (pageFlag == 1) {
            lastId = tableData[tableData.length - 1].featureId;
          } else {
            lastId = tableData[0].featureId;
          }
        }
        this.lastId = lastId;
        this.pageFlag = pageFlag;
        this.getList(() => {
          this.currentPage = nextPage;
        });
      },
      getTotal() {
        this.$store.dispatch("productFeature/getTotal").then(result => {
          this.total = result;
        });
      },
      // 获取数据 （列表+条数）
      getData() {
        this.currentPage = 1;
        this.pageFlag = 0;
        this.getList();
        this.getTotal();
      },
      handleSearch() {
      },
      // 编辑功能
      handleEdit(data) {
        this.$refs.edit.handleEditFeature(data);
      },
      // 提示是否删除
      handleDelete(id) {
        this.dialogVisible = true;
        this.cocurrentFeatureId = id;
      },
      // 确定删除
      confirmDelete() {
        this.$store
          .dispatch("productFeature/delFeatureById", this.cocurrentFeatureId)
          .then(result => {
            this.dialogVisible = false;
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.getList();
            this.getTotal();
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
      this.getData();
    }
  };
</script>
