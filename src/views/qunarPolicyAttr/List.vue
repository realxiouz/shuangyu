<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" justify="space-between">
      <el-button icon="el-icon-back" type="warning" size="mini" @click="handleBack">返回</el-button>
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" :data="tableData">
        <el-table-column label="商户名称" align="center" prop="merchantName" />
        <el-table-column label="商户域名" align="center" prop="merchantDomain" />
        <el-table-column label="调度任务" align="center" prop="schedulerName" />
        <el-table-column label="属性分组" align="center" prop="group" />
        <el-table-column label="属性编码" align="center" prop="code" />
        <el-table-column label="属性名称" align="center" prop="name" />
        <el-table-column label="是否必填" align="center" prop="required">
          <template slot-scope="scope">
            <span> {{scope.row.required ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否只读" align="center" prop="readonly">
          <template slot-scope="scope">
            <span> {{scope.row.readonly ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否禁用" align="center" prop="disabled">
          <template slot-scope="scope">
            <span> {{scope.row.disabled ? '是' : '否'}}</span>
          </template>
        </el-table-column>
      <el-table-column label="是否隐藏" align="center" prop="hidden">
        <template slot-scope="scope">
          <span> {{scope.row.hidden ? '是' : '否'}}</span>
        </template>
      </el-table-column>
        <el-table-column width="160" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onEdit(scope.row.policyAttrId)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row.policyAttrId)">删除</el-button>
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
      @prev-click="onPrev"
      @next-click="onNext"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :editPolicyAttrId="editPolicyAttrId" :openId="openId" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";

  export default {
    data() {
      return {
        dialogVisible: false,
        pageFlag: 0,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        loading: true,
        editPolicyAttrId: null,
        openId: null,
        params: {},
      };
    },
    methods: {
      getList() {
        if (this.lastId) {
          this.params.lastId = this.lastId;
        }
        this.$store
          .dispatch("qunarPolicyAttr/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId,
            params: this.params
          })
          .then(result => {
            if (result && result.rows && result.rows.length > 0) {
              this.tableData = result.rows;
              this.total = result.total;
            } else {
              this.tableData = [];
              this.total = 0;
            }
          });
      },
      loadData() {
        this.getList();
        if(this.$route.query.openId){
          this.openId = this.$route.query.openId;
        }
      },
      onSearch(params) {
        this.params = params;
        this.pageFlag = 0;
        this.lastId = null;
        this.loadData();
      },
      onRefresh() {
        this.onSearch();
      },
      onPrev() {
        this.pageFlag = -1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[0].policyAttrId;
        }
        this.loadData();
      },
      onNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].policyAttrId;
        }
        this.loadData();
      },
      handleBack(){
        if (this.$router.history.length <= 1) {
          this.$router.push({path: '/home'});
          return false;
        } else {
          this.$router.go(-1);
        }
      },
      handleAdd() {
        this.editPolicyAttrId = null;
        this.dialogVisible = true;
      },
      onEdit(id) {
        this.editPolicyAttrId = id;
        this.dialogVisible = true;
      },
      handleDel(id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("qunarPolicyAttr/removeOne", {policyAttrId: id}).then(() => {
            this.onRefresh();
            this.$message({ type: "success", message: "删除成功" });
          });
        });
      }
    },
    components: {
      edit,
      search
    },
    created() {
      this.loadData();
    }
  };
</script>

<style>
  .page-tools {
    margin-bottom: 10px;
  }
</style>
