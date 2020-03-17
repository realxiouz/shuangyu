<template>
  <div class="app-container">
    <third-flag-search @onSearch="handleSearch" @onAdd="handleAdd"></third-flag-search>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
      <el-table-column
        prop="thirdName"
        label="平台"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="flag"
        label="标签名称"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row.flagId)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handleRemove(scope.row,scope.$index,tableData)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <third-flag-edit v-if="dialogVisible" :flag-id="flagId" @onSave="handleSave"
                       @onCancel="handleCancel"></third-flag-edit>
    </el-dialog>
  </div>
</template>

<script>
    import thirdFlagSearch from './Search'
    import thirdFlagEdit from './Edit'

    export default {
        name: 'flagList',
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                flagId: '',
                total: 0
            }
        }
        , methods: {
            handleSearch(searchForm) {
                if (!searchForm || !searchForm.flag) {
                    searchForm = {}
                }
                this.$store
                    .dispatch("thirdFlag/getList", {
                        filters: searchForm
                    })
                    .then(data => {
                        console.log(data)
                        this.tableData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleAdd() {
                this.dialogVisible = true;
                this.flagId = '';
            },
            handleSave(formData) {
                this.$store
                    .dispatch("thirdFlag/save", formData)
                    .then(() => {
                        this.handleSearch();
                    }).catch(error => {
                    console.log(error);
                });
                this.dialogVisible = false;
            },
            handleUpdate(id) {
                this.flagId = id;
                this.dialogVisible = true;
            },
            handleRemove(row, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$store
                        .dispatch("thirdFlag/removeOne", {flagId: row.flagId})
                        .then(data => {
                            console.log(data);
                            rows.splice(index, 1);
                            this.total--;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }).catch(err => {
                    console.error(err);
                });
            },
            handleCancel() {
                this.dialogVisible = false;
            }
        }
        ,
        created() {
            this.handleSearch();
        }
        ,
        components: {
            thirdFlagEdit,
            thirdFlagSearch
        }
    }
</script>
