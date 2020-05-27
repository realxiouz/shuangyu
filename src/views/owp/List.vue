<template>
  <div class="bigBox">
    <div class="searchBox">
      <owp-search ref="search" @onSearch="handleSearch"></owp-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:38px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        highlight-current-row
        v-loading="loading"
        :data="tableData"
        ref="tableData"
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
      >
        <el-table-column prop="policyCode" label="政策前缀" align="center"></el-table-column>
        <el-table-column prop="author" label="负责人" align="center"></el-table-column>
        <el-table-column prop="startDate" label="旅行开始日期" align="center"></el-table-column>
        <el-table-column prop="endDate" label="旅行结束日期" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="330">
          <template slot-scope="scope">
            <el-button @click="start(scope.row)" type="primary" size="mini">启动</el-button>
            <el-button @click="stop(scope.row)" type="primary" size="mini">停止</el-button>
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleCopy(scope.row)" type="primary" size="mini">复制</el-button>
            <el-button @click="removeOne(scope.row.id)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      ></el-pagination>
      <el-dialog
        :title="updateFlag?'更新':'新增'"
        center
        :visible.sync="dialogVisible"
        width="50%"
        ref="user-edit"
        :close-on-click-modal="false"
      >
        <owp-edit
          v-if="dialogVisible"
          ref="form"
          :owp-id="id"
          :update-flag="updateFlag"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></owp-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import owpEdit from "./Edit";
  import owpSearch from "./Search";

  export default {
    name: "owpList",
    data() {
      return {
        dialogVisible: false,
        updateFlag: false,
        id: "",
        pageFlag: 1,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        loading: true
      };
    },
    components: {
      owpEdit,
      owpSearch
    },
    methods: {
      loadData(params) {
        if (this.lastId) {
          params.lastId = this.lastId;
        }
        this.$store
          .dispatch("owp/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            filter: params
          })
          .then(data => {
            if (data) {
              this.tableData = data.data;
              this.loadTotal(params);
            }
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      loadTotal(params) {
        this.$store
          .dispatch("owp/getTotal", {filter: params})
          .then(data => {
            if (data) {
              this.total = data.data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.lastId = null;
        this.loadData();
      },
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].id;
        this.loadData();
      },
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].id;
        this.loadData();
      },

      handleSearch(params) {
        if (Object.keys(params).length == 0) {
          this.lastId = null;
        }
        this.loadData(params);
      },
      handleAdd() {
        this.dialogVisible = true;
        this.updateFlag = false;
        this.id = "";
      },
      handleEdit(row) {
        this.dialogVisible = true;
        this.updateFlag = true;
        this.id = row.id;
      },
      handleCopy(row) {
        this.dialogVisible = true;
        this.updateFlag = false;
        this.id = row.id;
      },
      removeOne(id) {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("owp/removeOne", {id: id})
              .then(() => {
                this.loadData();
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.error(err);
          });
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.dialogVisible = false;
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
    created() {
      this.loadData();
    },

  };
</script>

