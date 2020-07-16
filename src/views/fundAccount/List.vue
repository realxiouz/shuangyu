<template>
  <div class="bigBox">
    <div class="searchBox">
      <fund-account-search @onSearch="onSearch"></fund-account-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        row-key="accountId"
        highlight-current-row
        style="width: 100%;margin-bottom:15px"
        size="mini"
        :load="loadChildren"
        fit
        :indent="40"
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="类别" align="center">
          <template slot-scope="scope">
            <span>{{initCategory(scope.row.category)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="accountCode" label="账号编码" align="center"></el-table-column>
        <el-table-column prop="accountName" label="账号名称" align="center"></el-table-column>
        <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
        <el-table-column prop="initBalance" label="初始余额" align="center"></el-table-column>
        <el-table-column prop="balance" label="余额" align="center"></el-table-column>
        <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="280">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="handleAddChild(scope.row.accountId)">添加</el-button>
            <el-button @click="handleUpdate(scope.row.accountId)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleRemove(scope.row.accountId)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        backgrund
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <el-dialog
        title="资金账号管理"
        center
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="30%"
      >
        <fund-account-edit
          v-if="dialogVisible"
          :editAccountId="editAccountId"
          :pid="pid"
          :codeEnabled="codeEnabled"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></fund-account-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import fundAccountSearch from "./Search.vue";
  import fundAccountEdit from "./Edit.vue";

  export default {
    name: "fundAccountContent",
    data() {
      return {
        loading: true,
        searchForm: {},
        dialogVisible: false,
        editAccountId: null,
        pid: null,
        tableData: [],
        pageFlag: 1,
        pageSize: 10,
        lastId: null,
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
      formatBalanceDirection(row) {
        return row.balanceDirection === 0 ? "借" : "贷";
      },
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].accountId;
        this.loadData();
      },
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].accountId;
        this.loadData();
      },
      loadData(params = {}) {
        if(null != this.category){
          params.category = this.category;
        }
        if (this.lastId) {
          params.lastId = this.lastId;
        }

        this.$store
          .dispatch("fundAccount/getRootPageList", {
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
      loadChildren(tree, treeNode, resolve) {
        this.uploadData.tree = tree;
        this.uploadData.treeNode = treeNode;
        this.uploadData.resolve = resolve;
        let params = {};
        if(tree && tree.accountId){
          this.$store
            .dispatch("fundAccount/getAsyncTreeList", {pid: tree.accountId, filter: params})
            .then(data => {
              if (data && data.length > 0) {
                let children = [];
                data.forEach(function(obj){
                  if(obj.attributes){
                    children.push(obj.attributes);
                  }
                });
                resolve(children);
              }else{
                window.location.reload();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      handleAddChild(accountId) {
        this.pid = accountId;
        this.editAccountId = null;
        this.codeEnabled = false;
        this.dialogVisible = true;
      },
      handleAdd() {
        this.editAccountId = null;
        this.pid = null;
        this.codeEnabled = false;
        this.dialogVisible = true;
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
      },
      handleUpdate(accountId) {
        this.editAccountId = accountId;
        this.pid = null;
        this.codeEnabled = true;
        this.dialogVisible = true;
      },
      handleRemove(accountId) {
        this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("fundAccount/removeOne", {accountId: accountId})
              .then(() => {
                if (1 === this.tableData.length) {
                  this.handlePrevClick();
                } else {
                  this.loadData();
                  this.loadChildren(this.uploadData.tree, this.uploadData.treeNode, this.uploadData.resolve);
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
        formData.category = this.category;
        let method = "fundAccount/save";
        let msg = "添加成功！";

        if(formData && formData.accountId){
          method = "fundAccount/update";
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
            this.loadChildren(this.uploadData.tree, this.uploadData.treeNode, this.uploadData.resolve);
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
      initCategory(category) {
        if (0 === category) {
          return "现金";
        } else if (1 === category) {
          return "银行存款";
        } else if (2 === category) {
          return "积分";
        } else if (3 === category) {
          return "优惠券";
        } else {
          return "无";
        }
      },
      /*初始化用工列表中的生日日期格式*/
      formatDate(dateStr, format) {
        if (dateStr > 0) {
          let date = new Date(dateStr);
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
      fundAccountSearch,
      fundAccountEdit
    }
  };
</script>

<style>
  .contentBox {
    margin-top: -10px;
    padding-top: 0;
  }
</style>
