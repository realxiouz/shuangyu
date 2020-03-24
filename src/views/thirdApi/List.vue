<template>
  <div class="bigBox">
    <div class="searchBox">
      <apiSearch @onSearch="handleSearch"></apiSearch>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:15px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table size="mini" :data="tableData" style="width: 100%;margin-bottom: 20px;" border>
        <el-table-column prop="thirdId" label="第三方平台" width="300"></el-table-column>
        <el-table-column prop="url" label="url" width="300"></el-table-column>
        <el-table-column prop="method" label="方法名称" ></el-table-column>
        <el-table-column label="是否启用" align="center" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" @change="handleSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.apiId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.apiId,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <el-dialog title="第三方Api信息" center :visible.sync="dialogVisible" width="33%">
        <api-edit
          ref="apiFrom"
          v-if="dialogVisible"
          :api-id="apiId"
          @onCancel="handleCancel"
          @onSave="handleSave"
        ></api-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import apiSearch from "./Search.vue";
import apiEdit from "./Edit.vue";

export default {
  name: "thirdApiList",
  data() {
    return {
      lastId: "blank",
      pageFlag: "next",
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      tableData: [],
      apiId: ""
    };
  },
  methods: {
    prevClick() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].apiId;
      this.loadData();
    },
    nextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].apiId;
      this.loadData();
    },
    loadData(params) {
      if (!params || !params.apiName) {
        params = {};
      }
      this.$store
        .dispatch("thirdApiService/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filters: params
        })
        .then(data => {
          if (data) {
            this.tableData = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTotal: function(params) {
      if (!params || !params.apiName) {
        params = {};
      }
      this.$store
        .dispatch("thirdApiService/getTotal", { filters: params })
        .then(response => {
          this.total = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.apiId = "";
    },
    handleSwitch(row) {
      row.enable = row.enable ? true : false;
      this.$store
        .dispatch("thirdApiService/updateOne", row)
        .then(() => {})
        .catch(error => {
          console.log(error);
        });
    },
    handleRemove(id, index, rows) {
      this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("thirdApiService/removeOne", { apiId: id })
            .then(() => {
              this.loadData();
              rows.splice(index, 1);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    handleSave(params) {
      this.$store
        .dispatch("thirdApiService/addApi", params)
        .then(() => {
          this.handleSearch();
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogVisible = false;
    },
    handleUpdate(id) {
      this.apiId = id;
      this.dialogVisible = true;
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleSearch(params) {
      if (!params) {
        params = {};
      }
      this.loadData(params);
      this.loadTotal(params);
    }
  },
  created() {
    this.handleSearch();
  },
  components: {
    apiEdit,
    apiSearch
  }
};
</script>

<style scoped>
</style>
