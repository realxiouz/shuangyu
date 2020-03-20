<template>
  <el-container>
    <el-main>
      <qunar-policy-config-search @onSearch="search"/>
      <el-header>
        <el-button type="primary" @click="handleAdd" style="margin-top: 10px;margin-left: 30px">添加</el-button>
      </el-header>
      <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
        <el-table-column
          prop="domain"
          label="代理商域名"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column label="企业" width="200" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatFirmData(scope.row.firmId) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平台" width="200" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatPartyData(scope.row.thirdId) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="user"
          label="用户名"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="callbackUrl"
          label="回调地址"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
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
        @prev-click="handlePrevClick"
        @next-click="handleNextClick">
      </el-pagination>

      <el-dialog title="第三方平台账号信息" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
        <qunar-policy-config-edit v-if="dialogVisible" :curNode="curNode" :update="update" :firmList="firmList"
                                  :partyList="partyList"
                                  @onSave="handleSave" @onCancel="handleCancel"/>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
    import qunarPolicyConfigSearch from './Search'
    import qunarPolicyConfigEdit from './Edit'

    export default {
        data() {
            return {
                dialogVisible: false,
                tableData: [],
                partyList: [],
                firmList: [],
                /*记录当前进行操作的节点*/
                curNode: {},
                update: false,
                pageFlag: "next",
                pageSize: 10,
                lastId: "blank",
                total: 0
            };
        },
        methods: {
            /*加载数据列表*/
            loadData() {
                this.$store
                    .dispatch('qunarPolicyConfig/getTotal', {filter: {}})
                    .then(data => {
                        this.total = data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$store
                    .dispatch('qunarPolicyConfig/getPageList', {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        lastId: this.lastId,
                        filter: {}
                    })
                    .then(data => {
                        this.tableData = data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*输入条件时可进行条件查询*/
            search(keyword) {
                this.$store
                    .dispatch('qunarPolicyConfig/getTotal', {filter: keyword ? {username: keyword} : {}})
                    .then(data => {
                        this.total = data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$store
                    .dispatch('qunarPolicyConfig/getPageList', {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        lastId: this.lastId,
                        filter: keyword ? {username: keyword} : {}
                    })
                    .then(data => {
                        this.tableData = data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*添加记录*/
            handleAdd() {
                this.dialogVisible = true;
                this.curNode = {};
                this.update = false;
            },
            /*添加记录时完成数据填写或编辑记录时，点击对数据进行保存*/
            handleSave(formData) {
                this.dialogVisible = false;

                let url = '';
                if (this.update) {
                    url = 'qunarPolicyConfig/updateOne';
                } else {
                    url = 'qunarPolicyConfig/addOne';
                }
                this.$store
                    .dispatch(url, formData)
                    .then(() => {
                        this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            /*点击记录进行编辑*/
            handleEdit(row) {
                this.dialogVisible = true;
                this.curNode = row;
                this.update = true;
            },
            /*对员工进行删除*/
            handleDelete(row) {
                this.open(this.delete, row.domain, '此操作将删除该第三方平台账号信息, 是否继续?');
            },
            /*根据用户ID删除用户*/
            delete(domain) {
                this.$store
                    .dispatch('qunarPolicyConfig/removeOne', {domain: domain})
                    .then(() => {
                        this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*前翻页*/
            handlePrevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].domain;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].domain;
                this.loadData();
            },
            open(func, data, message) {
                this.$confirm(message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    func(data);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            loadFirmData() {
                this.$store
                    .dispatch("firm/getList", {filter: {}})
                    .then(data => {
                        this.firmList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadPartyData() {
                this.$store
                    .dispatch("thirdParty/getList", {filters: {}})
                    .then(data => {
                        this.partyList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            initFirmData(firmID) {
                let firmName = '';
                for (let i = 0; i < this.firmList.length; i++) {
                    if (firmID === this.firmList[i].firmId) {
                        firmName = this.firmList[i].firmName;
                        break;
                    }
                }
                return firmName;
            },
            initPartyData(thirdID) {
                let thirdName = '';
                for (let i = 0; i < this.partyList.length; i++) {
                    if (thirdID === this.partyList[i].thirdId) {
                        thirdName = this.partyList[i].thirdName;
                        break;
                    }
                }
                return thirdName;
            }
        },
        created() {
            this.loadFirmData();
            this.loadPartyData();
            this.loadData();
        },
        computed: {
            formatFirmData() {
                return function (firmID) {
                    return this.initFirmData(firmID);
                };
            },
            formatPartyData() {
                return function (thirdID) {
                    return this.initPartyData(thirdID);
                };
            }
        },
        components: {
            qunarPolicyConfigSearch,
            qunarPolicyConfigEdit
        }
    }
</script>
