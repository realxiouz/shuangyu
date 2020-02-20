<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="text" @click="dialogVisible = true">添加</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="appId"
            label="应用唯一标识"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="appName"
            label="应用名称"
            width="200"
          ></el-table-column>
          <el-table-column prop="enable" label="是否启用"></el-table-column>
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
    <el-dialog title="应用信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="应用名称">
          <el-input v-model="form.appName"></el-input>
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
    import { getAppList,addApp,removeApp,updApp } from '@/api/app'

    export default {
        name: 'app',
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                form: {
                    appId: '',
                    appName: '',
                    enable: true
                },
                dialogVisible: false,
                tableData: null
            };
        },
        methods: {
            loadData() {
                getAppList(this.currentPage,this.pageSize).then(response => {
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
                addApp(params).then(() => {
                    this.loadData();
                }).catch(error => {
                    console.log(error);
                });
                this.dialogVisible = false;
            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            removeOne(id, index, rows) {
                this.$confirm('此操作将状态改为删除状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //点击确定的操作(调用接口)
                    removeApp(id).then(() => {
                        this.loadData();
                        rows.splice(index,1);
                    })
                }) .catch(err => { console.error(err) })
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.loadData();
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
