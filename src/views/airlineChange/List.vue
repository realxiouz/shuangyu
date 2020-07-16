<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" style="margin-bottom:15px;margin-left:22px;">
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="handleAdd"
        >添加</el-button
      >
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-bottom:15px;"
    >
      <el-table-column
        prop="airline"
        label="航司"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="airlines"
        label="可迁转航司"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="before"
        label="非自愿改签之前"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="after"
        label="非自愿改签之后"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="airline"
        label="航司"
        align="center"
      ></el-table-column>
      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
          <span>{{ formatEnable(scope.row.enable) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" type="primary" size="mini"
            >编辑</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="danger" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="!update ? '添加航司迁转信息' : '编辑航司迁转信息'"
      center
      :visible.sync="dialogVisible"
      width="33%"
      :close-on-click-modal="false"
    >
      <edit
        v-if="dialogVisible"
        :curNode="curNode"
        :update="update"
        @onSave="handleSave"
        @onCancel="handleCancel"
      ></edit>
    </el-dialog>
  </div>
</template>

<script>
import search from "./Search";
import edit from "./Edit";

export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      tableData: [],
      /*记录当前进行操作的节点*/
      curNode: {},
      update: false,
      deleteValue: false,
      searchForm: {}
    };
  },
  components: {
    search,
    edit
  },
  methods: {
    /*加载数据列表*/
    loadData(params) {
      this.$store
        .dispatch("airlineChange/getList", {
          params
        })
        .then(data => {
          if (data) {
            this.tableData = data;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },

    /*输入条件时可进行条件查询*/
    search(params) {
      this.deleteValue = true;
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
        url = "airlineChange/saveOne";
      } else {
        url = "airlineChange/addOne";
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
    /*对航司迁转信息进行删除*/
    handleDelete(row) {
      this.open(
        this.delete,
        row.airline,
        "此操作将删除航司迁转信息, 是否继续?"
      );
    },
    /*根据航司删除航司迁转信息*/
    delete(flightId) {
      this.$store
        .dispatch("flight/removeOne", { flightId: flightId })
        .then(() => {
          this.lastId = "0";
          if (1 === this.tableData.length && !this.deleteValue) {
            this.handlePrevClick();
            this.deleteValue = false;
          } else {
            this.loadData();
            this.deleteValue = false;
          }
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
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (dateStr && dateStr > 0) {
        const date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    formatEnable(enable) {
      if (enable) {
        return "启用";
      }
      return "未启用";
    }
  },
  created() {
    this.loadData();
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
