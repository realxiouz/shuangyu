<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;"
        size="mini"
      >
        <el-table-column prop="flagId" label="标签id" align="center"></el-table-column>
        <el-table-column prop="openName" label="客户" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="left"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.flagId)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button
              @click="handleRemove(scope.row,scope.$index,tableData)"
              type="text" size="mini" class="btn-danger"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Open标签" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
        <edit
          v-if="dialogVisible"
          :flag-id="flagId"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></edit>
      </el-dialog>
    </div>
</template>

<script>
     import edit from "./Edit";
  import search from "./Search";

    export default {
        name: "flagList",
        data() {
            return {
                tableData: [],
                loading: true,
                dialogVisible: false,
                flagId: "",
                total: 0
            };
        },
        methods: {
            onSearch(formData) {
                if (!formData || !formData.flag) {
                    formData = {};
                }
                this.$store
                    .dispatch("policyFlag/getList", {
                        filters: formData
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            handleAdd() {
                this.dialogVisible = true;
                this.flagId = "";
            },
            handleSave(formData) {
                console.log(formData);
                this.$store
                    .dispatch("policyFlag/save", formData)
                    .then(() => {
                        this.onSearch();
                    })
                    .catch(error => {
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
                })
                    .then(() => {
                        this.$store
                            .dispatch("policyFlag/removeOne", {flagId: row.flagId})
                            .then(data => {
                                console.log(data);
                                rows.splice(index, 1);
                                this.total--;
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            handleCancel() {
                this.dialogVisible = false;
            }
        },
        created() {
            this.onSearch();
        },
        components: {
            edit,
            search
        }
    };
</script>
