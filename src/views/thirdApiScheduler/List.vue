<template>
  <div class="app-container">
    <third-api-scheduler-search @onSearch="handleSearch" @onAdd="add"></third-api-scheduler-search>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" border
              default-expand-all>
      <el-table-column
        prop="schedulerName"
        label="调度名称"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" @click="handleStart(scope.row.schedulerId)" type="primary" size="mini">停止</el-button>
          <el-button  v-else @click="handleStop(scope.row.schedulerId)" type="primary" size="mini">启动</el-button>
          <el-button @click.native.prevent="removeOne(scope.row.schedulerId)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import thirdApiSchedulerSearch from "./Search.vue";

  export default {
    name: "thirdApiSchedulerList",
    data() {
      return {
        schedulerId: 1,
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
      handleEdit(row) {
        this.$router.push({name:'thirdApiSchedulerEdit',params:row});
      },
      add() {
        this.$router.push('/third/api/scheduler/edit');
      },
      loadData() {
        this.$store
          .dispatch('thirdApiScheduler/list', {
            pageSize: this.pageSize,
            lastId: this.lastId,
            pageFlag: this.pageFlag,
            searchForm: this.searchForm
          })
          .then(data => {
            this.loadTotal(this.searchForm);
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadTotal() {
        this.$store
          .dispatch('thirdApiScheduler/total', this.searchForm)
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.lastId = '0';
        this.loadData();
      },
      prevClick() {
        this.pageFlag = 'prev';
        this.lastId = this.tableData[0].airlineCode;
        this.loadData();
      },
      nextClick() {
        this.pageFlag = 'next';
        this.lastId = this.tableData[this.tableData.length - 1].airlineCode;
        this.loadData();
      },
      handleSearch(params) {
        this.searchForm = params;
        this.lastId = '0';
        this.loadData();
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.dialogVisible = false;
      },
      removeOne(id) {
        this.$confirm('是否确定删除派单规则信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch('thirdApiScheduler/removeOne', id)
            .then(() => {
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        }).catch(err => {
          console.error(err);
        });
      },
    },
    mounted() {
      this.loadData();
    },
    components: {
      thirdApiSchedulerSearch
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
