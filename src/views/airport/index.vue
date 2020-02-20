<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="text" @click="dialogVisible = true">添加</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
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
            width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button @click="removeOne(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <h-page-footer>
          <el-pagination
            @size-change="handleSizeChange"
            @prev-click="prevClick"
            @next-click="nextClick"
            :current-page="lastId"
            background
            layout="total,sizes,prev,next"
            prev-text="上一页"
            next-text="下一页"
            :page-size="pageSize"
            :total="total">
          </el-pagination>
        </h-page-footer>
      </el-main>
    </el-container>
    <el-dialog title="机场信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="三字码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="机场名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="机场所在城市">
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
        total:0
      };
    },
    methods: {
      loadData(lastId, pageSize,pageFlag) {
        this.$store
          .dispatch('airport/list', {pageSize, lastId,pageFlag})
          .then(data => {
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadTotal:function(){
        this.$store
          .dispatch('airport/total', {})
          .then(data => {
            this.total = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.loadData('0', this.pageSize,this.pageFlag);
      },
      prevClick:function(){
        this.pageFlag = 'prev';
        this.lastId = this.tableData[0].id;
        this.loadData(this.lastId, this.pageSize);
      },
      nextClick:function(){
        this.pageFlag = 'next';
        this.lastId = this.tableData[this.tableData.length - 1].id;
        this.loadData(this.lastId, this.pageSize,this.pageFlag);
      },
      removeOne: function (id) {
        // this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // }).then(() => {
        //   console.log("确定！"+id);
        // }).catch(() => {
        //   console.log("取消！"+id);
        // });
        this.$store
          .dispatch('airport/removeOne', id)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      edit: function (id) {
        console.log(id);
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.$store
          .dispatch('airport/add', this.form)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
    },
    mounted() {
      console.log("load:cure:" + this.lastId + ",pageSize+" + this.pageSize);
      this.loadData(this.lastId, this.pageSize);
      this.loadTotal();
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
