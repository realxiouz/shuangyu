<template>
  <div class="bigBox">
    <div class="searchBox">
      <airport-search @onSearch="search"></airport-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
        <el-table-column prop="airportCode" label="三字码" align="center"></el-table-column>
        <el-table-column label="机场名称" align="center">
          <template slot-scope="scope">
            <span>{{ formatAirport(scope.row.airportName) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="airportCity" label="机场所在城市" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click="onDel(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>

      <el-dialog
        title="机场信息"
        center
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="24%"
      >
        <airport-edit
          v-if="dialogVisible"
          :cur-node="curNode"
          :update="update"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></airport-edit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import airportSearch from "./Search.vue";
import airportEdit from "./Edit.vue";

export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      update: false,
      deleteForSearch: false,
      curNode: {},
      tableData: [],
      lastId: null,
      pageFlag: 0,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    loadData(params) {
      this.$store
        .dispatch("airport/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: params
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
    
    search(searchForm) {
      this.deleteForSearch = false;
      if (searchForm.airportName || searchForm.airportCode) {
        let url = "";
        let params = {};
        if (searchForm.airportName) {
          url = "airport/getOneByAirportName";
          params = { airportName: searchForm.airportName };
        } else {
          url = "airport/getOne";
          params = { airportCode: searchForm.airportCode };
        }
        this.$store
          .dispatch(url, params)
          .then(data => {
            this.tableData = [];
            if (data) {
              this.tableData.push(data);
            }
            this.total = 1;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.loadData();
      }
    },
    handleAdd() {
      this.dialogVisible = true;
      this.curNode = {};
      this.update = false;
    },
    handleSave(formData) {
      this.dialogVisible = false;

      let url = "";
      if (this.update) {
        url = "airport/updateOne";
      } else {
        url = "airport/addOne";
      }
      this.$store
        .dispatch(url, formData)
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    onEdit(row) {
      this.dialogVisible = true;
      this.curNode = row;
      this.update = true;
    },
    handlePrevClick() {
      this.pageFlag = -1;
      this.lastId = this.tableData[0].airportCode;
      this.loadData();
    },
    handleNextClick() {
      this.pageFlag = 1;
      this.lastId = this.tableData[this.tableData.length - 1].airportCode;
      this.loadData();
    },
    onDel(row) {
      this.open(
        this.delete,
        row.airportCode,
        "此操作将删除该三字码数据和机场信息, 是否继续?"
      );
    },
    delete(airportCode) {
      this.$store
        .dispatch("airport/removeOne", { airportCode: airportCode })
        .then(() => {
          this.lastId = "blank";
          if (1 === this.tableData.length && !this.deleteForSearch) {
            this.handlePrevClick();
          } else {
            this.loadData();
          }
          this.deleteForSearch = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    open(func, data, message) {
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          func(data);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    initAirport(airportList) {
      if (null != airportList && airportList.length < 5) {
        let nameString = "";
        airportList.forEach(item => {
          nameString = nameString + item + ", ";
        });
        return nameString.substring(0, nameString.length - 2);
      } else if (null != airportList && airportList.length > 5) {
        let nameString = "";
        for (let i = 0; i < 5; i++) {
          nameString = nameString + airportList[i];
        }
        return nameString.substring(0, nameString.length - 2) + "...";
      } else {
        return "";
      }
    }
  },
  created() {
    this.loadData();
  },
  computed: {
    formatAirport() {
      return function(airportList) {
        return this.initAirport(airportList);
      };
    }
  },
  components: {
    airportEdit,
    airportSearch
  }
};
</script>
