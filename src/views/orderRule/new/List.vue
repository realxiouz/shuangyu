<template>
  <div class="page">
    <!-- <search class="page-search" ref="search" @onSearch="onSearch"/> -->
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        :data="tableData"
        style="width: 100%;"
        default-expand-all
        size="mini"
        v-loading="loading"
      >
        <el-table-column prop="sort" label="序号" width="180" align="center"></el-table-column>
        <el-table-column prop="ruleName" label="规则名称" width="150" align="center"></el-table-column>
        <el-table-column prop="domain" label="公司域名" width="150" align="center"></el-table-column>
        <el-table-column prop="policyCodes" label="政策代码" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.policyCodes.join(",")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="removeOne(scope.row.orderRuleId)"
              type="danger"
              size="mini"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
//   import search from "./Search.vue";

  export default {
    name: "orderRuleList",
    data() {
      return {
        loading: true,
        orderRuleId: 1,
        lastId: "0",
        pageFlag: "next",
        pageSize: 10,
        total: 0,
        dialogVisible: false,
        searchForm: {},
        tableData: []
      };
    },
    methods: {
      onEdit(row) {
        // this.$router.push({name: "orderRuleNewEdit", params: row});
        this.$router.push({
          name: 'orderRuleNewEdit',
          query: {
            orderRuleId: row.orderRuleId,
          }
        })
      },
      onAdd() {
        this.$router.push({name: 'orderRuleNewEdit'});
      },
      loadData() {
        this.$store
          .dispatch("dispatchRule/getList", {
            pageSize: this.pageSize,
            lastId: this.lastId,
            pageFlag: this.pageFlag,
            searchForm: this.searchForm
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
      onSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.lastId = "0";
        this.loadData();
      },
      prevClick() {
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].orderRuleId;
        this.loadData();
      },
      nextClick() {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].orderRuleId;
        this.loadData();
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
        this.searchForm = newParams;
        this.loadData(this.searchForm);
        this.$message({
          type: "success",
          message: "查询成功！"
        });
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.dialogVisible = false;
      },
      removeOne(orderRuleId) {
        this.$confirm("是否确定删除派单规则信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("dispatchRule/removeOne", {orderRuleId})
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
      }
    },
    mounted() {
      this.loadData();
    },
    components: {
    //   search
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
