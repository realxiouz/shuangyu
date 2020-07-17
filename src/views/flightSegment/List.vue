<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px;margin-left:10px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        size="mini"
        :data="tableData"
        ref="tableData"
        @row-dblclick="onEdit"
        highlight-current-row
        style="width: 100%;margin-bottom:15px;"
      >
        <el-table-column prop="dpt" label="出发地" align="center"></el-table-column>
        <el-table-column prop="arr" label="目的地" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="lookFlights(scope.row.flights)" type="primary" size="small">查看航班</el-button>
            <el-button @click="lookSegments(scope.row.airlines)" type="primary" size="small">查看航司</el-button>
            <el-button @click="removeOne(scope.row.segment)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-footer"
        @size-change="onSizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        :current-page="currentPage"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <el-dialog :title="segment?'编辑航段信息':'添加航段'" center :visible.sync="dialogVisible" width="30%">
        <edit
          v-if="dialogVisible"
          :segment="segment"
          ref="form"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></edit>
      </el-dialog>
      <el-dialog :title="lookTitle" center :visible.sync="showInfo" width="30%">
        <look-lnfo
          v-if="showInfo"
          :flights="flightsInfo"
          :airlines="airlinesInfo"
          :isFlights="isFlights"
          ref="form"
          @onCancel="handleCancel"
        ></look-lnfo>
      </el-dialog>
    </div>
</template>
<script>
import edit from "./Edit";
  import search from "./Search";
import LookLnfo from "./LookLnfo.vue";

export default {
  data() {
    return {
      loading: true,
      segment: "",
      searchForm: {},
      dialogVisible: false,
      showInfo: false,
      isFlights: false,
      lookTitle: "",
      flightsInfo: "",
      airlinesInfo: "",
      tableData: [],
      lastId: "0",
      pageFlag: 0,
      pageSize: 10,
      total: 0,
      currentPage: 0
    };
  },
  components: {
    edit,
      search,
    LookLnfo
  },
  methods: {
    handleAdd() {
      this.segment = "";
      this.dialogVisible = true;
    },
    loadData(params) {
      this.$store
        .dispatch("flightSegment/getPageList", {
          pageSize: this.pageSize,
          lastId: this.lastId,
          pageFlag: this.pageFlag,
          ...params
        })
        .then(data => {
          if (data) {
            this.tableData = data.rows;
            this.total = data.total;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    onSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.lastId = null;
      this.loadData();
    },
    prevClick() {
      this.pageFlag = -1;
      this.lastId = this.tableData[0].segment;
      this.loadData();
    },
    nextClick() {
      this.pageFlag = 1;
      this.lastId = this.tableData[this.tableData.length - 1].segment;
      this.loadData();
    },
    removeOne(id) {
      this.$confirm("是否确定删除航段信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("flightSegment/removeOne", { segment: id })
            .then(data => {
              console.log(data);
              if (1 === this.tableData.length) {
                this.prevClick();
              } else {
                this.loadData();
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    onEdit(row) {
      this.segment = row.segment;
      this.dialogVisible = true;
    },
    handleCancel() {
      this.dialogVisible = false;
      this.showInfo = false;
    },
    handleSave() {
      this.dialogVisible = false;
      this.loadData();
    },
    lookFlights(flights) {
      this.lookTitle = "查看航班信息";
      this.flightsInfo = flights;
      this.isFlights = true;
      this.showInfo = true;
    },
    lookSegments(airlines) {
      this.lookTitle = "查看航司信息";
      this.airlinesInfo = airlines;
      this.isFlights = false;
      this.showInfo = true;
    },
    onSearch(params) {
      const newParams = {};
      if (params) {
        for (let key in params) {
          if (params[key]) {
            newParams[key] = params[key];
          }
        }
      }
      this.loadData(newParams);
      this.$message({
        type: "success",
        message: "查询成功！"
      });
    }
  },
  created() {
    this.loadData();
  }
};
</script>
