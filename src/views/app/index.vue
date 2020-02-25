<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="应用名称">
        <el-input v-model="searchForm.appName" placeholder="应用名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addApp">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%"
              border
              default-expand-all>
      <el-table-column
        prop="appId"
        label="应用唯一标识"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="appName"
        label="应用名称"
        width="300"
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
        width="350">
        <template slot-scope="scope">
          <el-button @click="appUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="removeOne(scope.row.appId,scope.$index,tableData)" type="danger"
                     size="mini">删除
          </el-button>
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
    import {getAppList, getAppTotal, removeApp, saveOrUpd, updApp} from '@/api/app'

    export default {
        name: 'app',
        data() {
            return {
                searchForm: {},
                lastId: '0',
                pageFlag: 'next',
                pageSize: 10,
                form: {
                    appId: '',
                    appName: '',
                    enable: true
                },
                dialogVisible: false,
                tableData: null,
                total: 0
            };
        },
        methods: {
            addApp(){
                this.form = {};
                this.dialogVisible= true;
            },
            handleSearch() {
                this.loadData();
                this.loadTotal();
            },
            loadData() {
                if (!this.searchForm.appName) {
                    this.searchForm = {};
                }
                getAppList(this.pageFlag, this.pageSize, this.lastId, this.searchForm).then(response => {
                    if (response.data) {
                        this.tableData = response.data
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
                const params = this.form
                saveOrUpd(params).then(() => {
                    this.loadData();
                    this.loadTotal();
                }).catch(error => {
                    console.log(error);
                });
                this.dialogVisible = false;
            },
            appUpdate(row) {
                this.dialogVisible = true;
                this.form = row;
            },
            removeOne(id, index, rows) {
                this.$confirm('此操作将状态改为删除状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeApp(id).then(() => {
                        this.loadData();
                        rows.splice(index, 1);
                    })
                }).catch(err => {
                    console.error(err)
                })
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            prevClick() {
                this.pageFlag = 'prev';
                this.lastId = this.tableData[0].appId;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = 'next';
                this.lastId = this.tableData[this.tableData.length - 1].appId;
                this.loadData();
            },
            changeSwitch(data) {
                updApp(data).then(() => {
                    this.loadData();
                }).catch(error => {
                    console.log(error);
                });
            },
            loadTotal() {
                if (!this.searchForm.appName) {
                    this.searchForm = {};
                }
                getAppTotal(this.searchForm).then(response => {
                    this.total = response.data;
                }).catch(error => {
                    console.log(error);
                });
            },
        },
        mounted() {
            this.loadData();
            this.loadTotal();
        }
    };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
