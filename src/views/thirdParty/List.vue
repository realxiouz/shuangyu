<template>
  <div class="app-container">
    <thirdparty-search  @onSearch="handleSearch" @onAdd="handleAdd"></thirdparty-search>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
      <el-table-column
        prop="thirdName"
        label="平台名称"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handRemove(scope.row,scope.$index,tableData)" type="danger" size="mini">删除</el-button>
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
      <thirdparty-edit v-if="dialogVisible" ref="thirdpartyForm" :third-id="thirdId" @onSave="handleSave"
                       @onCancel="handleCancel"></thirdparty-edit>
    </el-dialog>
  </div>
</template>

<script>
    import thirdPartyEdit from "./Edit.vue";
    import thirdPartySearch from "./Search.vue";


    export default {
        name: "List",
        data() {
            return {
                thirdId: null,
                dialogVisible: false,
                pageFlag: "next",
                pageSize: 10,
                lastId: "blank",
                total: 0,
                tableData: []
            };
        },
        methods: {
            loadData() {
                this.$store
                    .dispatch("thirdParty/getPageList", {pageFlag: this.pageFlag, pageSize: 10, lastId: this.lastId})
                    .then(data => {
                        this.tableData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleSearch(keyword) {
                this.$store
                    .dispatch("thirdParty/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: 10,
                        lastId: this.lastId,
                        thirdName: keyword
                    })
                    .then(data => {
                        console.log("-----------------" + data)
                        this.tableData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleAdd() {
                this.dialogVisible = true;
                this.thirdId = '';
            },
            handRemove(row, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$store
                        .dispatch("thirdParty/removeOne", {thirdId: row.thirdId})
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
            handleUpdate(row) {
                this.dialogVisible = true;
                this.thirdId = row.thirdId;
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave(formData) {
                this.$store
                    .dispatch("thirdParty/save", formData)
                    .then(data => {
                        console.log("-----------------" + data)
                        this.loadData();
                        this.loadTotal();
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.dialogVisible = false;
            },
            prevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].thirdId;
                this.loadData();
            }
            ,
            nextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].thirdId;
                this.loadData();
            }
            ,
            loadTotal: function () {
                this.$store
                    .dispatch("thirdParty/getTotal", {thirdName: this.searchForm})
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            ,
        },
        mounted() {
            this.loadData();
            this.loadTotal();
        }
        ,
        components: {
            thirdPartyEdit,
            thirdPartySearch
        }
    }
    ;
</script>
