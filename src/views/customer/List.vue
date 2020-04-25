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
        v-loading="loading"
        size="mini"
        :data="tableData"
        row-key="firm.firmId"
      >
        <el-table-column prop="firm.firmName" label="客户名称" align="center" sortable width="200"></el-table-column>
        <el-table-column prop="firm.firmCode" label="客户代码" align="center" sortable width="200"></el-table-column>
        <el-table-column prop="firm.fullName" label="联系人" align="center" width="180"></el-table-column>
        <el-table-column prop="firm.phone" label="联系人电话" align="center" width="180"></el-table-column>
        <el-table-column prop="firm.email" label="邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="firm.address" label="地址" align="center" width="180"></el-table-column>
        <el-table-column prop="firm.remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-show="scope.row.firm.openId && '' != scope.row.firm.openId">
              <el-button type="info" size="mini" @click="handleSupplement(scope.row)">配置管理</el-button>
            </span>
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import firmSearch from "./Search";

    export default {
        data() {
            return {
                loading: true,
                tableData: []
            };
        },
        methods: {
            /*加载客户列表1：企业客户，2：个人客户*/
            loadData(params) {
                if (params) {
                    params.type = JSON.stringify([1, 2])
                } else {
                    let newParams = {};
                    newParams.type = JSON.stringify([1, 2])
                    params = newParams;
                }
                this.$store
                    .dispatch("firmOther/getList", {filter: params})
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
            /*根据关键字进行客户搜索*/
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
                this.skipDetail();
            },
            /*点击编辑*/
            handleEdit(index, row) {
                this.skipDetail(row.otherId);
            },
            /*点击删除*/
            handleDelete(index, row) {
                this.open(
                    this.remove,
                    row.otherId,
                    "此操作将删除该客户信息及子客户信息, 是否继续?"
                );
            },
            handleSupplement(row) {
                let path = "";
                path = "/qunar/config";
                this.$router.push({
                    path: path,
                    query: {
                        domain: row.firm.domain,
                        openId: row.firm.openId,
                        firmId: row.otherId,
                    }
                });
            },
            /*删除企业数据*/
            remove(params) {
                this.$store
                    .dispatch("firmOther/removeOne", {firmId: params})
                    .then(() => {
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
            },
            /*跳转到供应商编辑页面，addRoot用于判断添加的是否是根节点，firmId用于编辑记录时进行查找。*/
            skipDetail(firmId) {
                this.$router.push({path: '/customer/edit', query: {firmId: firmId}});
            }
        },
        created() {
            this.loadData();
        },
        components: {
            firmSearch
        }
    };
</script>
