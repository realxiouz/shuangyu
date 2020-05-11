<template>
  <div class="bigBox">
    <div class="searchBox">
      <airline-search @onSearch="handleSearch"></airline-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:26px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        :data="tableData"
        ref="tableData"
        @row-dblclick="handleEdit"
        style="width: 100%;margin-bottom:15px;"
        size="mini"
        v-loading="loading"
        highlight-current-row

      >
        <el-table-column prop="airlineName" width="180" label="航司名称" align="center"></el-table-column>
        <el-table-column prop="airlineCode" width="180" label="航司二字码" align="center"></el-table-column>
        <el-table-column prop="cabins" label="舱位" align="center">
          <template slot-scope="scope">
            <span v-html="formatcabins(scope.row.cabins)"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click="lookFlights(scope.row.flights)" type="primary" size="small">查看航班</el-button>
            <el-button @click="lookSegments(scope.row.segments)" type="primary" size="small">查看航段</el-button>
            <el-button @click="removeOne(scope.row.airlineCode)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
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
      <el-dialog
        :title="airlineCode?'编辑航司信息':'添加航司信息'"
        center
        :visible.sync="dialogVisible"
        width="30%"
      >
        <airline-edit
          v-if="dialogVisible"
          :airline-code="airlineCode"
          ref="form"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></airline-edit>
      </el-dialog>
      <el-dialog :title="lookTitle" center :visible.sync="showInfo" width="30%">
        <look-lnfo
          v-if="showInfo"
          :flights="flightsInfo"
          :segments="segmentsInfo"
          :isFlights="isFlights"
          ref="form"
          @onCancel="handleCancel"
        ></look-lnfo>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import airlineSearch from "./Search.vue";
import airlineEdit from "./Edit.vue";
import LookLnfo from "./LookLnfo.vue";

export default {
  data() {
    return {
      loading: true,
      airlineCode: "",
      lookTitle: "",
      searchForm: {},
      dialogVisible: false,
      showInfo: false,
      isFlights: false,
      tableData: [],
      lastId: "0",
      pageFlag: "next",
      pageSize: 10,
      total: 0,
      currentPage: 0,
      flightsInfo: "",
      segmentsInfo: ""
    };
  },
  components: {
    airlineEdit,
    airlineSearch,
    LookLnfo
  },
  methods: {
    handleAdd() {
      this.airlineCode = "";
      this.dialogVisible = true;
    },
    loadData(params) {
      this.$store
        .dispatch("airline/getPageList", {
          pageSize: this.pageSize,
          lastId: this.lastId,
          pageFlag: this.pageFlag,
          searchForm: params
        })
        .then(data => {
          if (data) {
            this.loadTotal(params);
            this.tableData = data;
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
        .dispatch("airline/getTotal", params)
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.lastId = "0";
      this.loadData();
    },
    prevClick() {
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].airlineCode;
      this.loadData();
    },
    nextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].airlineCode;
      this.loadData();
    },
    removeOne(id) {
      this.$confirm("是否确定删除航司舱位信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("airline/removeOne", { airlineCode: id })
            .then(() => {
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
    handleEdit(row) {
      this.airlineCode = row.airlineCode;
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
    handleSearch(params) {
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
    },
    lookFlights(flights) {
      this.lookTitle = "查看航班信息";
      this.flightsInfo = flights;
      this.isFlights = true;
      this.showInfo = true;
    },
    lookSegments(segments) {
      this.lookTitle = "查看航段信息";
      this.segmentsInfo = segments;
      this.isFlights = false;
      this.showInfo = true;
    },
    formatcabins(data) {
      if (!data) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item + " , ";
      });
      return str.substring(0, str.length - 2);
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
