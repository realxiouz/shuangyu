<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="三字码">
        <el-input v-model="searchForm.code" placeholder="三字码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-button type="primary" @click="add">添加</el-button>
    </el-form>
    <el-table :data="tableData" style="width: 100%" @row-dbclick = "edit">
      <el-table-column
        prop="code"
        label="三字码"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="机场名称"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="city"
        label="机场所在城市"
        width="300"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="removeOne(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page="currentPage"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <el-dialog title="机场信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item prop="code" label="三字码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="机场名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="city" label="机场所在城市">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'airport',
    data() {
      return {
        searchForm: {},
        form: {
          code: '',
          name: '',
          city: ''
        },
        dialogVisible: false,
        tableData: [],
        lastId: '0',
        pageFlag: 'next',
        pageSize: 10,
        total: 0,
        currentPage: 0
      };
    },
    methods: {
      add() {
        this.dialogVisible = true;
      },
      loadData() {
        this.$store
          .dispatch('airport/list', {
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
          .dispatch('airport/total', this.searchForm)
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
        this.lastId = this.tableData[0].id;
        this.loadData();
      },
      nextClick() {
        this.pageFlag = 'next';
        this.lastId = this.tableData[this.tableData.length - 1].id;
        this.loadData();
      },
      removeOne(id) {
        this.$confirm('是否确定删除机场信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch('airport/removeOne', id)
            .then(data => {
              console.log(data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        }).catch(err => {
          console.error(err);
        });
      },
      edit(row, event, column) {
        console.log(event,column);
        this.dialogVisible = true;
        this.form = row;
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.$store
          .dispatch('airport/save', this.form)
          .then(data => {
            console.log(data);
            this.lastId = '0';
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
      handleSearch() {
        this.lastId = '0';
        this.loadData();
      },
    },
    mounted() {
      this.loadData();
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
