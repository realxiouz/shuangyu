<template>
  <div class="bigBox">
    <div class="searchBox">
      <apiSearch @onSearch="handleSearch"></apiSearch>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        size="mini"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
        :header-cell-style="{'text-align':'center'}"
        fit
      >
        <el-table-column prop="uri" label="URL" align="center"></el-table-column>
        <el-table-column prop="category" align="center" label="类别"></el-table-column>
        <el-table-column prop="apiName" align="center" label="api名称"></el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.createTime,'YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注" align="center" :fit='true'></el-table-column>

        <el-table-column label="是否启用" align="center" fixed="right" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" @change="handleSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.apiId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.apiId,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除
            </el-button>
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
        @next-click="handleNextClick"
      ></el-pagination>
      <el-dialog
        center
        :title="apiId!=''?'编辑Api信息':'添加Api'"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <apiEdit v-if="dialogVisible" :api-id="apiId" @onCancel="handleCancel" @onSave="handleSave"></apiEdit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import apiSearch from "./Search.vue";
    import apiEdit from "./Edit.vue";

    export default {
        name: "apiList",
        data() {
            return {
                loading: true,
                lastId: "0",
                pageFlag: 1,
                pageSize: 10,
                total: 0,
                dialogVisible: false,
                tableData: [],
                apiId: ""
            };
        },
        components: {
            apiEdit,
            apiSearch
        },
        methods: {
            /*翻前页*/
            handlePrevClick() {
                this.pageFlag = -1;
                this.lastId = this.tableData[0].apiId;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].apiId;
                this.loadData();
            },
            loadData(params = {}, callback) {
                if (this.lastId) {
                    params.lastId = this.lastId;
                }
                this.$store
                    .dispatch("api/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        filter: params
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                            this.loadTotal(params);
                        }
                        callback && callback();
                        this.loading = false;
                    });
            },
            loadTotal(params) {
                this.$store
                    .dispatch("api/getTotal", {filter: params})
                    .then(data => {
                        if (data >= 0) {
                            this.total = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleAdd() {
                this.dialogVisible = true;
                this.apiId = "";
            },
            handleSwitch(row) {
                row.enable = row.enable ? true : false;
                this.$store
                    .dispatch("api/updateOne", {apiId: row.apiId, data: row})
                    .then(() => {
                        this.$message({
                            message: "更新成功！",
                            type: "success"
                        });
                        this.loadData();
                    });
            },
            handleRemove(id, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch("api/removeOne", {id: id}).then(() => {
                            if (1 === this.tableData.length) {
                                this.prevClick();
                            } else {
                                this.loadData();
                            }
                            rows.splice(index, 1);
                            this.$message({
                                type: "success",
                                message: "删除成功！"
                            });
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            handleSave(params) {
                this.$store
                    .dispatch("api/saveOne", params)
                    .then(() => {
                        this.loadData();
                        if (this.apiId != "") {
                            this.$message({
                                type: "success",
                                message: "修改成功！"
                            });
                        } else {
                            this.$message({
                                type: "success",
                                message: "添加成功！"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.dialogVisible = false;
            },
            handleUpdate(id) {
                this.apiId = id;
                this.dialogVisible = true;
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSearch(params) {
                const newParams = {};

                if (params) {
                    for (let key in params) {
                        // 判断enable不为false
                        if (key == "enable") {
                            newParams[key] = params[key];
                        } else if (params[key]) {
                            console.log(params, key, "111");
                            newParams[key] = params[key];
                        }
                    }
                }

                this.loadData(newParams, () => {
                    this.$message({
                        type: "success",
                        message: "查询成功！"
                    });
                });
            },
            formatDate(dateStr, format) {
                if (null != dateStr) {
                    const date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return "";
                }
            }
        },
        created() {
            this.loadData();
        }
    };
</script>

<style scoped>
</style>
