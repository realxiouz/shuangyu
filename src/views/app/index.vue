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
            width="180"
          ></el-table-column>
          <el-table-column
            prop="appName"
            label="应用名称"
            width="180"
          ></el-table-column>
          <el-table-column prop="enable" label="是否启用"></el-table-column>

        </el-table>
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
    import { appList,addApp,removeApp,updApp } from '@/api/app'

    export default {
        name: 'app',
        data() {
            return {
                form: {
                    appId: '',
                    appName: '',
                    enable: true
                },
                dialogVisible: false,
                tableData: [{
                    appId: '1',
                    appName: '123',
                    enable: '是'
                }]
            };
        },
        methods: {
            loadData() {
                appList().then(response => {
                    this.tableData = response.data.items
                })
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave() {
                const params = this.form
                addApp(params).then(() => {
                    this.loadData();
                })
                this.dialogVisible = false;
            },
            handleDelete() {

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
