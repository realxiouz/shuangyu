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
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
      >
        <el-table-column prop="policyCode" label="政策前缀" width="120" align="center"></el-table-column>
        <el-table-column prop="author" label="负责人" width="120" align="center"></el-table-column>
        <el-table-column prop="startDate" label="旅行开始日期" width="120" align="center"></el-table-column>
        <el-table-column prop="endDate" label="旅行结束日期" width="120" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="280">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
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
        :title="id?'编辑用户信息':'添加新用户'"
        center
        :visible.sync="dialogVisible"
        width="33%"
        ref="user-edit"
        :close-on-click-modal="false"
      >
        <owp-edit
          v-if="dialogVisible"
          ref="form"
          :id="id"
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
        deleteForSearch: false,
        id: "",
        curNode: {},
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
      loadData(params = {}, callback) {
        if (this.lastId) {
          params.lastId = this.lastId;
        }
        this.$store
          .dispatch("user/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            filter: params
          })
          .then(data => {
            if (data) {
              this.tableData = data.data;
              this.loadTotal(params);
            }
            callback && callback(data);
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      loadTotal(params) {
        this.$store
          .dispatch("user/getTotal", { filter: params })
          .then(data => {
            if (data) {
              this.total = data.data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },


      /*根据关键字查询用户列表*/
      handleSearch(params) {
        this.deleteForSearch = true;
        const newParams = {};
        if (params) {
          for (let key in params) {
            // 判断enable不为false
            if (key == "enable") {
              newParams[key] = params[key];
            } else if (params[key]) {
              console.log(params,key,'111')
              newParams[key] = params[key];
            }
          }
        }
        if (Object.keys(newParams).length == 0) {
          this.lastId = null;
        }
        this.loadData(newParams, () => {
          this.$message({
            type: "success",
            message: "查询成功!"
          });
        });
      },

      handleAdd() {
        this.dialogVisible = true;
        this.id = "";
      },

      superSwitch(row) {
        row.super = row.super ? false : true;
        this.$store
          .dispatch("user/updateOne", row)
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },

      /*点击用户编辑按钮*/
      handleEdit(row) {
        this.dialogVisible = true;
        this.id = row.id;
      },
      /*对员工进行删除*/
      handleDelete(row) {
        this.open(
          this.delete,
          row.id,
          "是否确认删除?"
        );
      },

      delete(id) {
        this.$store
          .dispatch("owp/removeOne", { id: id })
          .then(() => {
            this.lastId = null;
            if (this.tableData.length === 1 && !this.deleteForSearch) {
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

      handleCancel() {
        this.dialogVisible = false;
      },

      handleSave(formData) {
        this.dialogVisible = false;
        let url = "";
        let requestData = {};
        if (this.id) {
          url = "owp/updateOne";
          requestData = { id: formData.user.userId, data: formData.user };
        } else {
          url = "owp/addOne";
          requestData = formData;
        }
        this.$store
          .dispatch(url, requestData)
          .then(() => {
            this.loadData();
            if (this.userId != "") {
              this.$message({
                type: "success",
                message: "修改成功！"
              });
            } else {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*翻前页*/
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].id;
        this.loadData();
      },
      /*翻后页*/
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].id;
        this.loadData();
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
        if (dateStr > 0) {
          let date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      }
    },
    computed: {
      formatDate() {
        return function(dateStr, format) {
          return this.initDate(dateStr, format);
        };
      }
    },
    created() {
      this.loadData();
    }
  };
</script>

