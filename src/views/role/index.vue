<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="text" @click="dialogVisible = true">添加</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-if="false"
            prop="id"
            label="主键"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="roleId"
            label="角色唯一标识"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称"
            width="160"
          ></el-table-column>
          <el-table-column prop="isEnable" label="是否启用"  :formatter="formatBoolean"></el-table-column>
          <el-table-column prop="apis" label="apis"></el-table-column>
          <el-table-column prop="navs" label="导航菜单"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button @click="removeOne(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <!--分页-->
        <h-page-footer>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
        </h-page-footer>
      </el-main>
    </el-container>
    <el-dialog title="角色" :visible.sync="dialogVisible" width="80%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="角色唯一标识">
          <el-input v-model="form.roleId"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.enable"></el-switch>
        </el-form-item>
        <el-form-item label="apis">
          <el-input v-model="form.apis"></el-input>
        </el-form-item>
        <el-form-item label="导航菜单">
          <el-input v-model="form.navs"></el-input>
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
    name: 'role',
    data() {
      return {
        form: {
          roleId: '',
          roleName: '',
          apis: '',
          navs: '',
          enable: true
        },
        dialogVisible: false,
        tableData: [],
        currentPage: 1,
        pageSize: 10
      };

    },
    methods: {
      loadData(currentPage,pageSize) {
        this.$store
          .dispatch('role/list',{currentPage,pageSize})
          .then(data => {
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },

      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        console.log("cure:"+this.currentPage+",pageSize+"+this.pageSize);
        this.loadData(this.currentPage,this.pageSize);
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log("cure:"+this.currentPage+",pageSize+"+this.pageSize);
        this.loadData(this.currentPage,this.pageSize);
      },

      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.$store
          .dispatch('role/add', this.form)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = false;
      },
      removeOne: function(id) {
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
          .dispatch('role/removeOne',id)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    edit:function(id){
      console.log(id);
    },
    formatBoolean: function (row, column, cellValue){
      console.log("llll+"+cellValue);
      var ret = ''  //你想在页面展示的值
      if (cellValue) {
        ret = "是"  //根据自己的需求设定
      } else {
        ret = "否"
      }
      return ret;
    },
    mounted() {
      console.log("load:cure:"+this.currentPage+",pageSize+"+this.pageSize);
      this.loadData(this.currentPage,this.pageSize);
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
