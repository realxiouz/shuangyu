<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table class="page-table" size="mini" v-loading="loading" :data="tableData" style="width: 100%;" fit>
        <el-table-column prop="openName" label="平台" width="220" align="center"></el-table-column>
        <el-table-column prop="username" label="账号" width="220" align="center"></el-table-column>
        <el-table-column prop="loginUrl" label="登录地址" width="300" align="center"></el-table-column>
        <el-table-column prop="contactPerson" label="联系人" width="200" align="center"></el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" width="240" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button @click="onDel(scope.row)" type="text" size="mini" class="btn-danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-footer"
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
        title="开放平台账号信息"
        :visible.sync="dialogVisible"
        width="30%"
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
 import edit from "./Edit";
  import search from "./Search";

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
      pageFlag: "next",
      pageSize: 10,
      lastId: null,
      total: 0
    };
  },
  methods: {
    /*加载数据列表*/
    loadData() {
      this.$store
        .dispatch("openAccount/getTotal", { filter: {} })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
      this.$store
        .dispatch("openAccount/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          filter: {}
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
    onSearch(params) {
        this.deleteForSearch = true;
      this.$store
        .dispatch("openAccount/getTotal", { filter: params ? params : {} })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
      this.$store
        .dispatch("openAccount/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          lastId: this.lastId,
          // filter: keyword ? {username: keyword} : {}
          filter: params ? params : {}
        })
        .then(data => {
          this.tableData = data.rows;
        })
        .catch(error => {
          console.log(error);
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
        url = "openAccount/updateOne";
      } else {
        url = "openAccount/addOne";
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
        row.accountId,
        "此操作将删除该Open平台账号信息, 是否继续?"
      );
    },
    /*根据用户ID删除用户*/
    delete(openAccountId) {
      this.$store
        .dispatch("openAccount/removeOne", { openAccountId: openAccountId })
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
      this.pageFlag = "prev";
      this.lastId = this.tableData[0].accountId;
      this.loadData();
    },
    /*翻后页*/
    handleNextClick() {
      this.pageFlag = "next";
      this.lastId = this.tableData[this.tableData.length - 1].accountId;
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
    }
  },
  created() {
    this.loadData();
  },
  components: {
    openAccountSearch,
    openAccountEdit
  }
};
</script>
