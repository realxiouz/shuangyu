<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="text" @click="handleAdd">添加</el-button>
      </el-header>
      <el-main>
        <el-table id="table" :data="tableData" style="width: 100%">
          <el-table-column
            prop="id"
          ></el-table-column>
          <el-table-column
            prop="navId"
            label="菜单ID"
            width="400"
          ></el-table-column>
          <el-table-column
            prop="navName"
            label="菜单名称"
            width="400"
          ></el-table-column>
          <el-table-column
            label="是否启用">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isEnable"
              :active-value="true"
              :inactive-value="false"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog title="导航信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <input type="hidden" v-model="form.id"/>
        <el-form-item label="导航名称">
          <el-input
            type="text"
            placeholder="请输入导航名称"
            v-model="form.navName"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.isEnable"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>

    <!--  树状控件  -->
    <el-tree
      :data="data"
      :props="defaultProps"
      accordion
      @node-click="handleNodeClick">
    </el-tree>

    <!--分页-->
      <!--<el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>-->
    <el-pagination
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="12"
      @size-change="handleSizeChange"
      @prev-click="handlePrevChange"
      @next-click="handleNextChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'nav',
    data() {
      return {
        form: {
          id:'',
          navId: '',
          navName: '',
          isEnable: true
        },
        dialogVisible: false,
        tableData: [],
        pageFlag: 'next',
        pageSize: 5,
        lastId: 'blank'
      };
    },
    methods: {
      loadData() {
        this.$store
          .dispatch('nav/getList',{pageFlag:this.pageFlag,pageSize:this.pageSize,lastId:this.lastId})
          .then(data => {
            this.tableData = data;
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.form = {
          id:'',
          navId: '',
          navName: '',
          isEnable: true
        };
      },
      handleAdd() {
        this.dialogVisible = true;
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        let url = '';
        console.log(this.form.id);
        if(this.form.id != ''){
          url = 'nav/edit';
        }else{
          url = 'nav/add';
        }
        this.$store
          .dispatch( url, this.form)
          .then(data => {
            console.log(data);
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
      handleEdit(index, row) {
        this.form = row;
        this.dialogVisible = true;
      },
      handleDelete(index, row) {
        this.$store
          .dispatch('nav/delete', row.id)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.loadData();
      },
      handleSizeChange: function (size) {
        this.pageSize = size;
        this.loadData();
        console.log(this.pageSize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.pageNo = currentPage;
        this.loadData();
        console.log(this.pageNo)  //点击第几页
      },
      handlePrevChange: function () {
        this.pageFlag = "prev";
        // document.getElementById("table").setCurrentRow()
        this.lastId = this.tableData[0].id;
        this.loadData();
      },
      handleNextChange: function () {
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].id;
        this.loadData();
      }
    },
    mounted() {
      this.loadData();
    },

  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
