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
        <el-table-column prop="firm.firmName" label="客户名称" align="center" sortable width="170"></el-table-column>
        <el-table-column prop="firm.firmCode" label="客户代码" align="center" sortable width="170"></el-table-column>
        <el-table-column prop="firm.fullName" label="联系人" align="center" width="170"></el-table-column>
        <el-table-column prop="firm.phone" label="联系人电话" align="center" width="170"></el-table-column>
        <el-table-column prop="firm.email" label="邮箱" align="center" width="200"></el-table-column>
        <el-table-column prop="firm.address" label="地址" align="center" width="200"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" :type="scope.row.staffId?'success':'info'" @click="handleAssociate(scope.$index, scope.row)">关联用户</el-button>
            <span v-show="scope.row.firm.openId && '' != scope.row.firm.openId">
            <el-button type="info" size="mini" @click="handleSupplement(scope.row)">配置管理</el-button>
                        </span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 员工查询弹窗 -->
      <el-dialog title="关联用户" width="37%" :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-table
          highlight-current-row
          size="mini"
          :data="userTableData"
          style="width: 100%"
          @row-click="handleRowClick"
        >
          <el-table-column prop="nickName" label="昵称" align="center" width="120"></el-table-column>
          <el-table-column prop="fullName" label="姓名" align="center" width="120"></el-table-column>
          <el-table-column prop="gender" label="性别" align="center" width="120">
            <template slot-scope="scope">
              <span>{{ initGender(scope.row.gender) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="电话" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSaveRelation">添 加</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import firmSearch from "./Search";

    export default {
        data() {
            return {
                loading: true,
                dialogVisible: false,
                tableData: [],
                userTableData: [],
                tmpStaff: {},
                //关联用户时用于记录当前选中的用户对象
                curRow: {}
            };
        },
        methods: {
            /*加载客户列表1：企业客户，2：个人客户*/
            loadData(params) {
                if (params) {
                    params.types = JSON.stringify([1, 2])
                } else {
                    let newParams = {};
                    newParams.types = JSON.stringify([1, 2])
                    params = newParams;
                }
                this.$store
                    .dispatch("firmMerchant/getList", {filter: params})
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
            /*进行用户查询*/
            searchUser(rowData) {
                this.clearUserTableData();
                this.$store
                // .dispatch("staff/associateUser", {filter: {phone: rowData.phone, email: rowData.email}})
                    .dispatch("staff/associateUser", {filter: {email: rowData.email}})
                    .then(data => {
                        this.userTableData.push(data.data);
                    })
                    .catch(error => {
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
                this.skipDetail(row.merchantId);
            },
            /*点击删除*/
            handleDelete(index, row) {
                this.open(
                    this.remove,
                    row.merchantId,
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
                        firmId: row.firm.firmId,
                    }
                });
            },
            /*删除企业数据*/
            remove(params) {
                this.$store
                    .dispatch("firmMerchant/removeOne", {firmId: params})
                    .then(() => {
                        this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleAssociate(index, row){
                this.$store
                    .dispatch("staff/getOne", {
                        staffId: row.merchantId
                    })
                    .then(data => {
                        this.tmpStaff = data.data;
                        this.searchUser(data.data);
                        this.dialogVisible = true;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            //当前选中用户对象
            handleRowClick(row){
                this.curRow = row;
            },
            handleSaveRelation(){
                this.tmpStaff.userId = this.curRow.userId;
                this.$store
                    .dispatch("firmMerchant/associateUser", this.tmpStaff)
                    .then(() => {
                        this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            clearUserTableData(){
                this.userTableData = [];
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
            initGender(gender) {
                return 0 == gender ? "男" : "女";
            },
            /*跳转到供应商编辑页面，merchantId用于编辑记录时进行查找。*/
            skipDetail(merchantId) {
                this.$router.push({path: '/customer/edit', query: {merchantId: merchantId}});
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
