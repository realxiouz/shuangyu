<template>
  <div class="app-container">
    <third-flag-search @onSearch="handSearch" @onAdd="handleAdd"></third-flag-search>
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
          <el-button @click="handleUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handleRemove(scope.row,scope.$index,tableData)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
      @prev-click="prevClick"
      @next-click="nextClick">
    </el-pagination>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <third-flag-edit v-if="dialogVisible" :third-id="flagId" @onSave="handleSave"
                       @onCancel="handleCancel"></third-flag-edit>
    </el-dialog>
  </div>
</template>

<script>
    import thirdFlagEdit from './Search'
    import thirdFlagSearch from './Edit'

    export default {
        name: 'flagList',
        data() {
            return {
                tableData: '',
                dialogVisible: false,
                flagId: ''
            }
        }
        , methods: {
            loadData() {
                this.$store
                    .dispatch("thirdFlag/getList", {})
                    .then(data => {
                        this.tableData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handSearch(keyword) {
                this.$store
                    .dispatch("thirdFlag/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: 10,
                        lastId: this.lastId,
                        flag: keyword
                    })
                    .then(data => {
                        this.tableData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
        handleAdd() {
            this.dialogVisible = true;
            this.flagId = '';
        },
        handleSave(data) {
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
                    .dispatch("thirdParty/removeOne", {flagId: row.flagId})
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
    created()
    {
    }
    ,
    components: {
        thirdFlagEdit,
            thirdFlagSearch
    }
    }
</script>
