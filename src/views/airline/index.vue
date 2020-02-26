<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="航司二字码">
        <el-input v-model="searchForm.airlineCode" placeholder="航司二字码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-button type="primary" @click="add">添加</el-button>
    </el-form>
    <el-table :data="tableData" ref="tableData" @row-dblclick="handleEdit" style="width: 100%">
      <el-table-column
        prop="airlineName"
        label="航司名称"
      ></el-table-column>
      <el-table-column
        prop="airlineCode"
        label="航司二字码"
      ></el-table-column>
      <el-table-column
        prop="cabins"
        label="舱位"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="removeOne(scope.row.airlineCode)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right"
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
    <el-dialog title="航司舱位信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="110px" :rules="rules">
        <el-form-item prop="airlineName" label="航司名称">
          <el-input v-model="form.airlineName"></el-input>
        </el-form-item>
        <el-form-item prop="airlineCode" label="航司二字码">
          <el-input v-model="form.airlineCode"></el-input>
        </el-form-item>
        <el-form-item prop="cabins" label="舱位">
          <el-input v-model="form.cabins"></el-input>
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
    name: 'airline',
    data() {
      return {
        searchForm: {},
        form: {
          airlineName: '',
          airlineCode: '',
          cabins: ''
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
        this.resetForm();
      },
      resetForm(){
        for (let key  in this.form) {
          if (typeof(this.form[key])=='object'){
            this.form[key] = null;
          }else {
            this.form[key] = '';
          }
        }
      },
      loadData() {
        this.$store
          .dispatch('airline/list', {
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
          .dispatch('airline/total', this.searchForm)
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
      removeOne(id) {
        this.$confirm('是否确定删除航司舱位信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch('airline/removeOne', id)
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
      handleEdit(row) {
        this.dialogVisible = true;
        var obj=JSON.parse(JSON.stringify(row));
        this.form = obj;
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.$store
          .dispatch('airline/save', this.form)
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
