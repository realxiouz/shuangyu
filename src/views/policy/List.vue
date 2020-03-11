<template>
  <div class="app-container">
    <policy-search @onSearch="handleSearch" @onAdd="handleAdd"></policy-search>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;"
              border>
      <el-table-column
        prop="user"
        label="用户名"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="domain"
        label="域名"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="ip"
        label="ip"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="callbackUrl"
        label="回调地址"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="300"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row.user,scope.row.domain)" type="primary" size="mini">编辑</el-button>
          <el-button @click.native.prevent="handleRemove(scope.row.appId,scope.$index,tableData)" type="danger"
                     size="mini">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog title="政策信息" :visible.sync="dialogVisible" width="30%">
      <policy-edit v-if="dialogVisible" :user="user" :domain="domain" @onSave="handleSave"
                   @onCancel="handleCancel"></policy-edit>
    </el-dialog>
  </div>
</template>
<script>
    import policySearch from "./Search.vue"
    import policyEdit from "./Edit.vue"

    export default {
        name: 'policyList',
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                user: '',
                domain: ''
            }
        },
        methods: {
            loadData() {
                this.$store
                    .dispatch("policy/getList", {
                            filters: {}
                        }
                    ).then(data => {
                    if (data) {
                        this.tableData = data;
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleSearch(params) {
                if (!params) {
                    params = {};
                }
                this.loadData(params);
            },
            handleUpdate(user, domain) {
                this.user = user;
                this.domain = domain;
                this.dialogVisible = true;
            },
            handleRemove(user, domain) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$store
                        .dispatch("policy/removeOne", {user: user, domain: domain})
                        .then(() => {
                            this.loadData("{}");
                        });
                }).catch(err => {
                    console.error(err);
                });
            }, handleCancel() {
                this.dialogVisible = false;
            },
            handleAdd() {
                this.dialogVisible = true;
            },
            handleSave(formData) {
                this.$store
                    .dispatch("policy/save", formData)
                    .then(data => {
                        console.log(data);
                        this.handleSearch();
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.dialogVisible = false;
            },

        },
        created() {
            this.handleSearch();
        },
        components: {
            policySearch,
            policyEdit
        }
    }
</script>
