<template>
  <div class="bigBox">
    <div class="searchBox">
      <role-search ref="user" @onSearch="handleSearch"></role-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:50px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width:100%;margin-bottom:15px;"
        size="mini"
      >
        <el-table-column prop="roleName" label="角色名称" align="left" width="200"></el-table-column>
        <el-table-column label="角色类型" align="center" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.roleType==0">平台</span>
            <span v-else-if="scope.row.roleType==1">企业</span>
            <span v-else-if="scope.row.roleType==-1">默认</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" :fit='true'></el-table-column>
        <el-table-column label="是否启用" align="center" fixed="right" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" @change="changeSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @prev-click="prevClick"
        @next-click="nextClick"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <el-dialog :title="roleId?'编辑角色信息':'添加新角色'" center :visible.sync="dialogVisible" width="30%"
                 :close-on-click-modal="false">
        <role-edit v-if="dialogVisible" :roleId="roleId" @onSave="onSave" @onCancel="handleCancel"></role-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import roleEdit from "./Edit.vue";
    import roleSearch from "./Search.vue";

    export default {
        name: "roleList",
        data() {
            return {
                roleId: "",
                dialogVisible: false,
                loading: true,
                deleteForSearch: false,
                pageFlag: 1,
                pageSize: 10,
                lastId: "",
                total: 0,
                tableData: []
            };
        },
        methods: {
            /*对员工进行删除*/
            handleDelete(row) {
                this.open(
                    this.delete,
                    row.roleId,
                    "此操作将删除该用户的所有信息, 是否继续?"
                );
            },
            /*根据用户ID删除用户*/
            delete(roleID) {
                this.$store
                    .dispatch("role/removeOne", {id: roleID})
                    .then(() => {
                        this.lastId = "0";
                        if (1 === this.tableData.length && !this.deleteForSearch) {
                            this.prevClick();
                        } else {
                            this.loadData();
                        }
                        this.deleteForSearch = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleEdit(row) {
                this.dialogVisible = true;
                this.roleId = row.roleId;
            },
            changeSwitch(row) {
                row.enable = row.enable ? true : false;
                this.$store
                    .dispatch("role/updateOne", {
                        roleId: row.roleId,
                        data: {
                            enable: row.enable
                        }
                    })
                    .then(() => {
                        this.$message({
                            message: "更新成功",
                            type: "success"
                        });
                        this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            prevClick() {
                this.pageFlag = -1;
                this.lastId = this.tableData[0].roleId;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].roleId;
                this.loadData();
            },
            handleAdd() {
                this.roleId = "";
                this.dialogVisible = true;
            },
            loadData(params) {
                let filter = {};
                if (this.lastId) {
                    filter.lastId = this.lastId;
                }
                this.$store
                    .dispatch("role/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        filter
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                            this.loadTotal(params);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                    });
            },
            loadTotal(params) {
                this.$store
                    .dispatch("role/getTotal", {filter: params})
                    .then(data => {
                        if (data >= 0) {
                            this.total = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // 新增或存储新的角色
            onSave(formData) {
                /** test end **/
                const isEdit = !!this.roleId;
                const message = isEdit ? "修改成功！" : "添加成功！";
                this.$store.dispatch("role/saveOne", formData).then(() => {
                    this.loadData();
                    this.$message({
                        type: "success",
                        message
                    });
                });
                this.dialogVisible = false;
            },
            handleCancel: function () {
                this.dialogVisible = false;
            },
            handleSearch(params) {
                this.deleteForSearch = true;
                let newParams = {};
                if (params) {
                    for (let key in params) {
                        if (params[key]) {
                            newParams[key] = params[key];
                        }
                    }
                }
                this.$store
                    .dispatch("role/getList", {
                        filter: newParams
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                            this.loadTotal(params);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                    });

                this.$message({
                    type: "success",
                    message: "查询成功!"
                });
            },
            open(func, data, message) {
                this.$confirm(message, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        func(data);
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            }
        },
        created() {
            this.loadData();
        },
        components: {
            roleEdit,
            roleSearch
        }
    };
</script>
