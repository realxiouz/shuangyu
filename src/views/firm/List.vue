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
        :load="loadChildren"
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="firmName" label="企业名称" align="left" sortable width="180"></el-table-column>
        <el-table-column prop="firmCode" label="企业代码" align="center" sortable width="100"></el-table-column>
        <el-table-column prop="fullName" label="联系人" align="center" width="180"></el-table-column>
        <el-table-column prop="phone" label="联系人电话" align="center" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" align="left" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" align="left"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="400">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAddChild(scope.row.firmId)">添加子企业</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.row.firmId)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini"
                       :type="scope.row.userId?'success':'info'"
                       :disabled="scope.row.userId?true:false"
                       @click="handleAssociate(scope.row)">关联用户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>

      <!-- 表单对话框 -->
      <el-dialog
        :title="editFirmId?'编辑企业':'添加企业'"
        center
        :visible.sync="dialogVisible"
        width="33%"
        :close-on-click-modal="false"
      >
        <firm-edit v-if="dialogVisible" :edit-firm-id="editFirmId"
                   :pid="pid" @onSave="handleSave" @onCancel="handleCancel"/>
      </el-dialog>

      <!-- 员工查询弹窗 -->
      <el-dialog center title="关联用户" width="45%" :visible.sync="userDialogVisible" :close-on-click-modal="false">
        <el-form ref="form" :model="userData" size="mini">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="昵称:">
                <span>{{userData.nickName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="姓名:">
                <span>{{userData.fullName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="性别:">
                <span>{{initGender(userData.gender) }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="电话:">
                <span>{{userData.phone}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item label="邮箱:">
                <span>{{userData.email}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item>
                <el-button size="mini" align="center" @click="userDialogVisible = false">取 消</el-button>
                <el-button size="mini" align="center" type="primary" @click="handleSaveRelation">
                  确认关联
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
                userDialogVisible: false,
                pid: "",
                staffId: "",
                editFirmId: "",
                tableData: [],
                userData: {},
                //关联用户时用于记录当前选中的用户对象
                curRow: {},
                pageFlag: 1,
                pageSize: 10,
                lastId: null,
                total: 0,
                uploadData: {
                    tree: null,
                    treeNode: null,
                    resolve: null
                }
            };
        },
        methods: {
            /*翻前页*/
            handlePrevClick() {
                this.pageFlag = -1;
                this.lastId = this.tableData[0].firmId;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].firmId;
                this.loadData();
            },
            /*加载企业列表*/
            loadData(params = {}) {
                if (this.lastId) {
                    params.lastId = this.lastId;
                }
                this.$store
                    .dispatch("firm/getRootPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        filter: params
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data.rows;
                            this.total = data.total;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },

            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            loadChildren(tree, treeNode, resolve) {
                // tree为点击那一行的数据
                this.uploadData.tree = tree;
                this.uploadData.treeNode = treeNode;
                this.uploadData.resolve = resolve;
                this.$store
                    .dispatch("firm/getAsyncTreeList", {pid: tree.firmId, filter: {}})
                    .then(data => {
                        if (data) {
                            resolve(data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            initGender(gender) {
                return gender == 0 ? "男" : "女";
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
                this.editFirmId = ''
                this.pid = ''
                this.dialogVisible = true;
            },
            //当前选中用户对象
            handleRowClick(row) {
                this.curRow = row;
            },
            handleSaveRelation() {
                this.$store
                    .dispatch("staff/relationUser", {userId: this.userData.userId, staffId: this.userData.firmId})
                    .then(data => {
                        if (data) {
                            this.$message({
                                type: "success",
                                message: "关联成功！"
                            });
                            this.loadData();
                        } else {
                            this.$message({
                                type: "info",
                                message: "关联失败！"
                            });
                        }
                        this.userDialogVisible = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleAssociate(row) {
                let params = {};
                params.phone = row.phone;
                params.email = row.email;
                this.$store
                    .dispatch("user/getFirstOne", {
                        filter: params
                    })
                    .then(data => {
                        if (data) {
                            this.userData = data;
                            this.userData.firmId = row.firmId;
                            this.userDialogVisible = true;
                        } else {
                            this.userData = {};
                            this.$message({
                                type: "info",
                                message: "没有可关联的用户!"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*企业的添加、编辑保存*/
            handleSave(formData) {
                this.dialogVisible = false;
                if (formData.firmId) {
                    this.$store
                        .dispatch("firm/updateOne", {id: formData.firmId, data: formData})
                        .then(() => {
                            this.$message({
                                type: "success",
                                message:
                                    "企业账号更新成功!"
                            });
                            this.loadData();
                            this.loadChildren(this.uploadData.tree, this.uploadData.treeNode, this.uploadData.resolve);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$store
                        .dispatch("firm/addOne", {firm: formData})
                        .then(() => {
                            this.$message({
                                type: "success",
                                message:
                                    "企业账号已添加成功!"
                            });
                            this.loadData();
                            this.loadChildren(this.uploadData.tree, this.uploadData.treeNode, this.uploadData.resolve);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
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
                        this.loadChildren(this.uploadData.tree, this.uploadData.treeNode, this.uploadData.resolve);
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
