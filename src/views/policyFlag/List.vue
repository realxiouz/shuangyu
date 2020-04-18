<template>
  <div class="bigBox">
    <div class="searchBox">
      <policy-flag-search @onSearch="handleSearch"></policy-flag-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:10px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
      >
        <el-table-column prop="flagId" label="标签id" align="center"></el-table-column>
        <el-table-column prop="openName" label="客户" align="center"></el-table-column>
        <el-table-column prop="domain" label="客户域名" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.flagId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click="handleRemove(scope.row,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="第三方标签" :visible.sync="dialogVisible" width="50%" center :close-on-click-modal="false">
        <policy-flag-edit
          v-if="dialogVisible"
          :flag-id="flagId"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></policy-flag-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import policyFlagSearch from "./Search";
    import policyFlagEdit from "./Edit";

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
            handleSearch(formData) {
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
                        this.handleSearch();
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
            this.handleSearch();
        },
        components: {
            policyFlagEdit,
            policyFlagSearch
        }
    };
</script>
