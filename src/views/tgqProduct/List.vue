<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;"
        fit
        default-expand-all
        size="mini"
      >
        <el-table-column prop="cron" label="时间表达式" width="150" align="center"></el-table-column>
        <el-table-column prop="schedulerName" label="调度名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="left"></el-table-column>
        <el-table-column prop="status" label="调度程序状态" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" style="color: green">启动</span>
            <span v-else style="color: red">停止</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button
              v-if="scope.row.status==1"
              @click="handleStop(scope.row.schedulerId)"
              type="text" size="mini" class="btn-primary"
            >停止</el-button>
            <el-button
              v-else
              @click="handleStart(scope.row.schedulerId)"
              type="text" size="mini" class="btn-primary"
            >启动</el-button>
            <el-button @click="handleCopy(scope.row)" type="text" size="mini" class="btn-primary">复制</el-button>
            <el-button
              @click.native.prevent="removeOne(scope.row.schedulerId)"
              type="text" size="mini" class="btn-danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import search from "./Search.vue";

export default {
  name: "tgqProductList",
  data() {
    return {
      loading: true,
      schedulerId: "",
      searchForm: {},
      tableData: []
    };
  },
  methods: {
    handleStart(schedulerId) {
      if (schedulerId) {
        this.$store
          .dispatch("tgqProduct/start", { schedulerId: schedulerId })
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleStop(schedulerId) {
      if (schedulerId) {
        this.$store
          .dispatch("tgqProduct/stop", { schedulerId: schedulerId })
          .then(() => {
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    onEdit(row) {
      if (row.status == 1) {
        this.$confirm("是否确定停止此产品编辑?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("tgqProduct/stop", { schedulerId: row.schedulerId })
              .then(() => {
                row.copyFlag = false;
                this.$router.push({ name: "tgqProductEdit", params: row });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        row.copyFlag = false;
        this.$router.push({ name: "tgqProductEdit", params: row });
      }
    },
    handleCopy(row) {
      row.copyFlag = true;
      this.$router.push({ name: "tgqProductEdit", params: row });
    },
    handleAdd() {
      this.$router.push("/tgq/product/edit");
    },
    loadData() {
      this.$store
        .dispatch("tgqProduct/getList", {
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
    onSearch(params) {
      this.searchForm = params;
      this.loadData();
    },
    removeOne(id) {
      this.$confirm("是否确定删除TGQ信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("tgqProduct/removeOne", { schedulerId: id })
            .then(() => {
              this.loadData();
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
  created() {
    this.loadData();
  },
  components: {
    search
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
