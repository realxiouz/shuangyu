<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px;margin-left:22px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table class="page-table" size="mini" v-loading="loading" :data="tableData" style="width: 100%;margin-bottom:15px;">
        <el-table-column prop="markId" label="产品标签" align="center"></el-table-column>
        <el-table-column prop="openName" label="供应商" align="center"></el-table-column>
        <el-table-column prop="domain" label="供应商域名" align="center"></el-table-column>
        <el-table-column label="政策标签" align="center">
          <template slot-scope="props">
            <el-popover
              placement="top-start"
              title="政策标签"
              width="200"
              trigger="hover">
              <p v-for="item in props.row.policyFlags" :key="item">
                <span>{{item}}</span>
              </p>
              <el-button slot="reference">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="onDel(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-footer"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>

      <el-dialog
        title="资金账号信息"
        center
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="28%"
      >
        <edit
          v-if="dialogVisible"
          :cur-node="curNode"
          :update="update"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></edit>
      </el-dialog>
    </div>
</template>

<script>
    import edit from "./Edit";
  import search from "./Search";

    export default {
        data() {
            return {
                loading: true,
                dialogVisible: false,
                update: false,
                searchForm: {},
                curNode: {},
                tableData: [],
                lastId: null,
                pageFlag: "next",
                pageSize: 10,
                total: 0
            };
        },
        methods: {
            loadData(searchForm) {
                this.searchForm = searchForm;
                this.$store.dispatch("productMark/getTotal", {filter: searchForm})
                    .then(data => {
                        this.total = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$store.dispatch("productMark/getPageList", {pageFlag: this.pageFlag, pageSize: this.pageSize, lastId: this.lastId,filter: searchForm})
                    .then(data => {
                        this.tableData = data.rows;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
            },
            handleAdd() {
                this.dialogVisible = true;
                this.curNode = {};
                this.update = false;
            },
            handleSave(formData) {
                this.dialogVisible = false;

                if (this.update) {
                    this.$store
                        .dispatch("productMark/updateOne", formData)
                        .then(() => {
                            this.loadData({});
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$store
                        .dispatch("productMark/addOne", formData)
                        .then(() => {
                            this.loadData({});
                        })
                        .catch(error => {
                            if (501 === error.code){
                                this.$confirm("该产品标签已存在，是否覆盖已有的数据?", "提示", {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    type: "warning"
                                })
                                    .then(() => {
                                        this.$store.dispatch("productMark/updateOne", formData)
                                            .then(() => {
                                                this.loadData({});
                                            })
                                            .catch(error => {
                                                console.log(error);
                                            });
                                    })
                                    .catch(() => {
                                        this.$message({
                                            type: "info",
                                            message: "已取消覆盖!"
                                        });
                                    });
                            }
                        });
                }
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            onEdit(row) {
                this.dialogVisible = true;
                this.curNode = row;
                this.update = true;
            },
            handlePrevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].markId;
                this.loadData(this.searchForm);
            },
            handleNextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].markId;
                this.loadData(this.searchForm);
            },
            onDel(row) {
                this.open(
                    this.delete,
                    row.markId,
                    "此操作将删除该资金账号信息, 是否继续?"
                );
            },
            delete(markId) {
                this.$store
                    .dispatch("productMark/removeOne", {markId: markId})
                    .then(() => {
                        this.lastId = "blank";
                        if (1 === this.tableData.length) {
                            this.handlePrevClick();
                        } else {
                            this.loadData({});
                        }
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
            this.loadData({});
        },
        components: {
            edit,
            search
        }
    };
</script>
