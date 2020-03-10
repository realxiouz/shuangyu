<template>
  <div class="airline-container">
    <airline-search @onSearch="handleSearch" @onAdd="handleAdd"></airline-search>
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
        align="center"
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
    <el-dialog title="航司" :visible.sync="dialogVisible" width="30%">
      <airline-edit v-if="dialogVisible" :airline-code="airlineCode" ref="form" @onSave="handleSave"
                    @onCancel="handleCancel">
      </airline-edit>
    </el-dialog>
  </div>
</template>
<script>
  import airlineSearch from './Search.vue';
  import airlineEdit from './Edit.vue';

  export default {
    data() {
      return {
        airlineCode: '',
        searchForm: {},
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
      handleAdd() {
        this.dialogVisible = true;
      },
      loadData() {
        this.$store
          .dispatch('airline/getPageList', {
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
          .dispatch('airline/getTotal', this.searchForm)
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
        this.airlineCode = row.airlineCode;
        this.dialogVisible = true;
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.dialogVisible = false;
        this.loadData();
      },
      handleSearch(params) {
        this.searchForm = params;
        this.lastId = '0';
        this.loadData();
      },
    },
    mounted() {
      this.loadData();
    },
    components: {
      airlineEdit,
      airlineSearch
    }
  }
</script>
