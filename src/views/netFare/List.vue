<template>
  <div class="bigBox">
    <div class="searchBox">
      <net-fare-search @onSearch="onSearch" />
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:20px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        size="mini"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
        fit
      >
        <el-table-column prop="flightCode" label="航班号" width="300" align="center"></el-table-column>
        <el-table-column label="票价标签" width="300" align="center">
          <template slot-scope="scope">
            <span>{{initDiscountTag(scope.row.tag)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="折扣" width="300" align="center">
          <template slot-scope="scope">
            <span>{{initDiscount(scope.row.tag, scope.row.discount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束日期" width="300" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.endDate" class="el-icon-time"></i>
            <span>{{initDate(scope.row.endDate,'YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="onDel(scope.row)" type="danger" size="mini">删除</el-button>
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
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      ></el-pagination>

      <el-dialog
        :title="update?'编辑净票价信息':'添加净票价'"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
        center
      >
        <net-fare-edit
          v-if="dialogVisible"
          :curNode="curNode"
          :update="update"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></net-fare-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import netFareSearch from "./Search";
import netFareEdit from "./Edit";

export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      tableData: [],
      /*记录当前进行操作的节点*/
      curNode: {},
      update: false,
      deleteForSearch: false,
      searchForm: {},
      pageFlag: 0,
      pageSize: 10,
      lastId: null,
      total: 0
    };
  },
  components: {
    netFareSearch,
    netFareEdit
  },
  methods: {
    /*加载数据列表*/
    loadData(params) {
      this.$store
        .dispatch("netFare/getPageList", {
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
    /*输入条件时可进行条件查询*/
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
    },
    /*添加记录*/
    handleAdd() {
      this.dialogVisible = true;
      this.curNode = {};
      this.update = false;
    },
    /*添加记录时完成数据填写或编辑记录时，点击对数据进行保存*/
    handleSave(formData) {
      this.dialogVisible = false;

      let url = "";
      if (this.update) {
        url = "netFare/updateOne";
      } else {
        url = "netFare/addOne";
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
    /*点击记录进行编辑*/
    onEdit(row) {
      this.dialogVisible = true;
      this.curNode = row;
      this.update = true;
    },
    /*对员工进行删除*/
    onDel(row) {
      this.open(
        this.delete,
        row.flightCode,
        "此操作将删除该第三方平台账号信息, 是否继续?"
      );
    },
    /*根据用户ID删除用户*/
    delete(flightCode) {
      this.$store
        .dispatch("netFare/removeOne", { flightCode: flightCode })
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
    /*前翻页*/
    handlePrevClick() {
      this.pageFlag = -1;
      this.lastId = this.tableData[0].flightCode;
      this.onSearch(this.searchForm);
    },
    /*翻后页*/
    handleNextClick() {
      this.pageFlag = 1;
      this.lastId = this.tableData[this.tableData.length - 1].flightCode;
      this.onSearch(this.searchForm);
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
    initDate(dateStr, format) {
      if (dateStr && dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    initDiscountTag(tag) {
      if ("0" === tag) {
        return "折扣";
      } else {
        return "反点";
      }
    },
    initDiscount(tag, discount) {
      if ("0" === tag) {
        return 1 === discount ? "全价" : " " + discount * 10 + " 折";
      } else {
        return discount;
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>
