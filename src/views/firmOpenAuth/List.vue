<template>
  <div class="bigBox">
    <div class="searchBox">
      <search @onSearch="onSearch"></search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:40px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
        size="mini"
      >
        <el-table-column prop="firmName" label="企业名称" align="center"></el-table-column>
        <el-table-column prop="openCode" label="开放平台编码" align="center"></el-table-column>
        <el-table-column prop="openName" label="开放平台名称" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.authId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.authId,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="onSizeChange"
        @prev-click="onPrev"
        @next-click="onNext"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSizes[0]"
        :page-sizes="pageSizes"
        :total="total"
      ></el-pagination>
      <el-dialog center :visible.sync="dialogVisible" width="30%"
                 :close-on-click-modal="false">
        <edit
          v-if="dialogVisible"
          :open-id="authId"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></edit>
      </el-dialog>
    </div>
  </div>
</template>
<script>
    import search from "./Search";
    import edit from "./Edit";
    import {formatOpenType} from "@/utils/status.js";
    import { MIXIN_LIST } from "@/utils/mixin";


    export default {
        name: "list",
        data() {
            return {
                beanIdName: "authId",
                actionName: 'firmOpenAuth/getPageList',
                authId: "",
            };
        },
        methods: {
            formatOpenType,
            handleCancel() {
                this.dialogVisible = false;
            },
            handleAdd() {
                this.dialogVisible = true;
                this.authId = "";
            },
            handleUpdate(id) {
                this.authId = id;
                this.dialogVisible = true;
            },
            handleRemove(id, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch("firmOpenAuth/removeOne", {authId: id}).then(() => {
                            if (1 === this.tableData.length) {
                                this.onPrev();
                            } else {
                                this.loadData();
                            }
                            rows.splice(index, 1);
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            handleSave(formData) {
                if (formData.authId) {
                    this.$store
                        .dispatch("firmOpenAuth/updateOne", {id: formData.authId, data: formData})
                        .then(() => {
                            this.loadData();
                            this.$message({
                                type: "success",
                                message: "修改成功！"
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$store
                        .dispatch("firmOpenAuth/addOne", formData)
                        .then(() => {
                            this.loadData();
                            this.$message({
                                type: "success",
                                message: "添加成功！"
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

                this.dialogVisible = false;
            },
        },
        mixins: [MIXIN_LIST],
        components: {
            search,
            edit
        }
    };
</script>

