<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="text" @click="dialogVisible = true">添加</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="apiId"
            label="ID"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="apiName"
            label="api名称"
            width="200"
          ></el-table-column>
          <el-table-column prop="enable" label="是否启用">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enable"
                on-color="#00A854"
                on-text="启动"
                on-value=true
                off-color="#F04134"
                off-text="禁止"
                off-value=false
                @change="changeSwitch(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
              <el-button  @click.native.prevent="removeOne(scope.row.id,scope.$index,tableData)" type="text" size="small">删除</el-button>
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
            :total="1000">
          </el-pagination>
        </h-page-footer>
      </el-main>
    </el-container>
    <el-dialog title="Api信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="Api名称">
          <el-input v-model="form.apiName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.enable" :active-value=true :inactive-value=false></el-switch>
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

  // eslint-disable-next-line no-unused-vars
  import { getApiList,addApi,removeApi,updApi } from '@/api/api'

  export default {
    name: 'api',
    data() {
      return {
        currentPage: 1,
        form: {
          apiId: '',
          apiName: '',
          enable: true
        },
        dialogVisible: false,
        tableData: null,
        lastId: '0',
        pageFlag: 'next',
        pageSize: 10
      };
    },
    methods: {
      loadData() {
        getApiList(this.currentPage,this.pageSize).then(response => {
          this.tableData = response.data
        }).catch(error => {
          console.log(error);
        });
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        const params = this.form
        addApi(params).then(() => {
          this.loadData();
        }).catch(error => {
          console.log(error);
        });
        this.dialogVisible = false;
      },
      handleUpdate(row) {
        this.dialogVisible = true;
        this.form = row;
      },
      removeOne: function(id, index, rows) {
        this.$confirm('此操作将状态改为删除状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        removeApi(id).then(() => {
          this.loadData();
          rows.splice(index,1);
          })
        }).catch(err => {
          console.error(err);
        });
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (pageSize) {
        this.pageSize = pageSize;
        this.loadData('0', this.pageSize,this.pageFlag);
      },
      prevClick:function(){
        this.pageFlag = 'prev';
        this.lastId = this.tableData[0].id;
        console.log("lastId:" + this.lastId + ",pageSize+" + this.pageSize);
        this.loadData(this.lastId, this.pageSize);
      },
      nextClick:function(){
        this.pageFlag = 'next';
        this.lastId = this.tableData[this.tableData.length - 1].id;
        console.log("lastId:" + this.lastId + ",pageSize+" + this.pageSize);
        this.loadData(this.lastId, this.pageSize,this.pageFlag);
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.loadData();
      },
      changeSwitch(data) {
        console.log(data)
      }
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
