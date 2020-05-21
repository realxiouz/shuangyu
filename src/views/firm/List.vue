<template>
  <div class="bigBox">
    <div class="searchBox">
      <firm-search @onSearch="handleSearch"></firm-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        highlight-current-row
        v-loading="loading"
        size="mini"
        :data="tableData"
        row-key="firmId"
        :tree-props="tableProps"
      >
        <el-table-column prop="firmName" label="企业名称" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="firmCode" label="企业代码" align="center" sortable width="100"></el-table-column>
        <el-table-column prop="fullName" label="联系人" align="center" width="180"></el-table-column>
        <el-table-column prop="phone" label="联系人电话" align="center" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAddChild(scope.row.firmId)">添加子企业</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.row.firmId)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表单对话框 -->
      <el-dialog
        title="添加企业"
        center
        :visible.sync="dialogVisible"
        width="33%"
        :close-on-click-modal="false"
      >
        <firm-edit v-if="dialogVisible" :edit-firm-id="editFirmId"
                   :pid="pid" @onSave="handleSave" @onCancel="handleCancel"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import firmEdit from "./Edit";
    import firmSearch from "./Search";

    export default {
        data() {
            return {
                loading: true,
                dialogVisible: false,
                rootNav: false,
                pid: "",
                editFirmId: "",
                tableData: [],
                curNode: {},
                tableProps: {
                    hasChildren: "xxx",
                    children: "children"
                }
            };
        },
        methods: {
            /*加载企业列表*/
            loadData(params) {
                this.$store
                    .dispatch("firm/getTreeList", {filters: params})
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
            /*根据关键字进行企业搜索*/
            handleSearch(params) {
                const newParams = {};
                if (params) {
                    for (let key in params) {
                        if (params[key]) {
                            newParams[key] = params[key];
                        }
                    }
                }
                this.loadData(newParams);
                this.$message({
                    type: "success",
                    message: "查询成功！"
                });
            },
            handleAdd() {
                this.rootNav = true;
                this.dialogVisible = true;

                this.curNode = {};
            },
            /*企业的添加、编辑保存*/
            handleSave(formData) {
                this.dialogVisible = false;
                this.$store
                    .dispatch("firm/saveOne", {firm: formData})
                    .then(() => {
                        this.$message({
                            type: "success",
                            message:
                                "企业账号已添加成功!超级管理员账号为企业联系人手机号或邮箱，密码已通过邮件发送给联系人"
                        });
                        this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            /*点击添加企业子节点按钮*/
            handleAddChild(firmId) {
                this.pid = firmId;
                this.editFirmId = "";
                this.dialogVisible = true;
            },
            /*点击编辑*/
            handleEdit(firmId) {
                this.editFirmId = firmId;
                this.pid = "";
                this.dialogVisible = true;
            },
            /*点击删除*/
            handleDelete(index, row) {
                this.open(
                    this.remove,
                    row.firmId,
                    "此操作将删除该企业信息及子企业信息, 是否继续?"
                );
            },
            /*删除企业数据*/
            remove(params) {
                this.$store
                    .dispatch("firm/removeOne", {firmID: params})
                    .then(() => {
                        this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
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
                        this.loadData();
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
        mounted() {
            this.loadData();
        },
        components: {
            firmEdit,
            firmSearch
        }
    };
</script>
