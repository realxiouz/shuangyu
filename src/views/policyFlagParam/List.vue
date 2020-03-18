<template>
  <div class="app-container">
    <flag-param-search @onSearch="handleSearch" @onAdd="handleAdd"></flag-param-search>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
      <el-table-column
        prop="label"
        label="参数标签"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="参数名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="value"
        label="参数值"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="group"
        label="参数分组"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row.paramId)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handleRemove(scope.row,scope.$index,tableData)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <flag-param-edit v-if="dialogVisible" :param-id="paramId" @onSave="handleSave"
                       @onCancel="handleCancel"></flag-param-edit>
    </el-dialog>
  </div>
</template>

<script>
    import flagParamSearch from './Search'
    import flagParamEdit from './Edit'


    export default {
        name: 'flagParamList',
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                paramId: '',
                total: 0
            }
        }
        , methods: {
            handleSearch(searchForm) {
                if (!searchForm || !searchForm.name) {
                    searchForm = {}
                }
                this.$store
                    .dispatch("policyFlagParam/getList", {
                        filters: searchForm
                    })
                    .then(data => {
                        this.tableData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleAdd() {
                this.dialogVisible = true;
                this.paramId = '';
            },
            handleSave(formData) {
                this.$store
                    .dispatch("policyFlagParam/save", formData)
                    .then(() => {
                        this.handleSearch();
                    }).catch(error => {
                    console.log(error);
                });
                this.dialogVisible = false;
            },
            handleUpdate(id) {
                console.log(id);
                this.paramId = id;
                this.dialogVisible = true;
            },
            handleRemove(row, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$store
                        .dispatch("policyFlagParam/removeOne", {paramId: row.paramId})
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
            flagParamSearch,
            flagParamEdit
        }
    }
</script>
