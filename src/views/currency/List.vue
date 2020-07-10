<template>
  <div class="bigBox">
    <div class="searchBox">
      <currency-search @onSearch="loadData"></currency-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table size="mini" v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
        <el-table-column prop="currencyCode" label="币种" align="center"></el-table-column>
        <el-table-column prop="currencyName" label="币种名称" align="center"></el-table-column>
        <el-table-column prop="symbol" label="货币符号" align="center"></el-table-column>
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">
            <span> {{formatDate(scope.row.date,"YYYY-MM-DD")}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="当前比率" align="center"></el-table-column>
        <el-table-column label="是否有效" align="center">
          <template slot-scope="scope">
            <span> {{scope.row.enable ? '有效' : '无效'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.currencyId)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleRemove(scope.row.currencyId)" type="danger" size="mini">删除</el-button>
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
        title="币种管理"
        center
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="24%"
      >
        <currency-edit
          v-if="dialogVisible"
          :editCurrencyId="editCurrencyId"
          :codeEnabled="codeEnabled"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></currency-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import currencySearch from "./Search.vue";
  import currencyEdit from "./Edit.vue";

  export default {
    name: "currencyContent",
    data() {
      return {
        loading: true,
        searchForm: {},
        dialogVisible: false,
        editCurrencyId: null,
        pid: null,
        tableData: [],
        pageFlag: 1,
        pageSize: 10,
        lastId:  'blank',
        total: 0,
        codeEnabled: false,
        uploadData: {
          tree: null,
          treeNode: null,
          resolve: null
        }
      };
    },
    methods: {
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].currencyId;
        this.loadData();
      },
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].currencyId;
        this.loadData();
      },
      loadData(params = {}) {
        if (this.lastId) {
          params.lastId = this.lastId;
        }
        this.$store
          .dispatch("currency/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            filter: params
          })
          .then(data => {
            if (data && data.rows && data.rows.length > 0) {
              this.tableData = data.rows;
              this.total = data.total;
            } else {
              this.tableData = [];
              this.total = 0;
            }
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      handleAdd() {
        this.editCurrencyId = null;
        this.pid = null;
        this.codeEnabled = false;
        this.dialogVisible = true;
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
      handleUpdate(currencyId) {
        this.editCurrencyId = currencyId;
        this.pid = null;
        this.codeEnabled = true;
        this.dialogVisible = true;
      },
      handleRemove(currencyId) {
        this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("currency/removeOne", {currencyId: currencyId})
              .then(() => {
                if (1 === this.tableData.length) {
                  this.handlePrevClick();
                } else {
                  this.loadData();
                }
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
              });
          })
          .catch(err => {
            console.error(err);
          });
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave(formData) {
        let method = "currency/save";
        let msg = "添加成功！";

        if(formData && formData.currencyId){
          method = "currency/update";
          msg = "编辑成功！";
        }

        this.$store
          .dispatch(method, formData)
          .then(() => {
            this.$message({
              type: "success",
              message: msg
            });
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
      formatAmount(row, column, val) {
        if (!val) {
          return "0.00";
        }
        return this.$numeral(val).format("0.00");
      },
      formatDate(dateStr, format) {
        if (null != dateStr) {
          const date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      }
    },
    created() {
      this.loadData();
    },
    components: {
      currencySearch,
      currencyEdit
    }
  };
</script>

<style>
  .contentBox {
    margin-top: -10px;
    padding-top: 0;
  }
</style>
