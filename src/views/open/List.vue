<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        size="mini"
        :data="tableData"
        style="width: 100%;"
      >
        <el-table-column prop="openName" label="平台名称" align="center"></el-table-column>
        <el-table-column prop="contactPerson" label="联系人" align="center"></el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="contactEmail" label="联系邮箱" align="center"></el-table-column>
        <el-table-column label="平台类别" align="center">
          <template slot-scope="scope">
            <span>{{ formatCategory(scope.row.category) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button
              @click="handRemove(scope.row,scope.$index,tableData)"
              type="text" size="mini" class="btn-danger"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
         class="page-footer"
        @size-change="onSizeChange"
        @prev-click="onPrev"
        @next-click="onNext"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSizes[0]"
        :page-sizes="pageSizes"
         @current-change="onCurrentChange"
         :current-page.sync="currentPage"
        :total="total"
      ></el-pagination>
      <el-dialog
        title="平台信息"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <edit
          v-if="dialogVisible"
          ref="thirdForm"
          :open-id="openId"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></edit>
      </el-dialog>
    </div>
</template>

<script>
   import edit from "./Edit";
  import search from "./Search";
    import { MIXIN_LIST } from "@/utils/mixin";

    export default {
        name: "List",
        data() {
            return {
                beanIdName: "openId",
                actionName: 'open/getPageList',
                openId: "",
            };
        },
        methods: {
            
            handleAdd() {
                this.dialogVisible = true;
                this.openId = "";
            },
            handRemove(row, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store
                            .dispatch("open/removeOne", {openId: row.openId})
                            .then(res => {
                                if (res) {
                                    rows.splice(index, 1);
                                    this.total--;
                                    this.$message({
                                        type: "success",
                                        message: "删除成功！"
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            handleUpdate(row) {
                this.dialogVisible = true;
                this.openId = row.openId;
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSave(formData) {
                this.$store
                    .dispatch("open/save", formData)
                    .then(res => {
                        console.log(res);
                        if (res.code === 0) {
                            this.onSearch();
                            this.loadTotal();
                            this.$message({
                                type: "success",
                                message: "添加成功"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.dialogVisible = false;
            },
            initCategory(category) {
                switch (category) {
                    case 0:
                        return '平台';
                    case 1:
                        return '单位';
                    case 2:
                        return '个人';
                }
            }
        },
        computed: {
            formatCategory() {
                return function (category) {
                    return this.initCategory(category);
                };
            },
        },
        components: {
            openEdit,
            openSearch
        },
        mixins: [MIXIN_LIST]

    };
</script>
