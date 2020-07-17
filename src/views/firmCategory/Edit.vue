<template>
  <div class="page">
    <el-row type="flex" justify="space-between" style="margin-bottom:20px;" align="bottom">
      <span style="font-weight:700;color:#303133;" v-if="!dictVisible">{{this.curNode.categoryName}}</span>
      <span></span>
      <el-button type="primary" size="mini" @click="handleAdd" :disabled="dictVisible">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      size="mini"
      :data="tableData"
      fit
      highlight-current-row
      style="width: 100%;margin-bottom: 20px;"
    >
      <el-table-column prop="name" align="center" label="字典名称"></el-table-column>
      <el-table-column prop="key" align="center" label="字典键"></el-table-column>
      <el-table-column prop="value" align="center" label="字典值" width="80"></el-table-column>
      <el-table-column align="center" prop="categoryCode" label="类别编码"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="onDel(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer" 
      @size-change="onSizeChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>

    <el-dialog
      :title="isEdit?'编辑第开放平台账号信息':'添加开放平台账号信息'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      center
    >
      <el-form :model="formData" label-width="110px" size="mini">
        <input type="hidden" v-model="formData.dictId"/>
        <el-form-item label="类别">
          <el-input :placeholder="curNode.categoryName" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="类别编码">
          <el-input :placeholder="curNode.categoryCode" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="字典名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="键">
          <el-input v-model="formData.key" @input="toUpperCase"></el-input>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="formData.value"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" placeholder="请输入备注(remark)" v-model="formData.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        props: ["curNode", "dictVisible"],
        data() {
            return {
                dialogVisible: false,
                loading: false,
                isEdit: false,
                tableData: [],
                formData: {},
                categoryList: [],
                pageFlag: 1,
                pageSize: 10,
                lastId: null,
                total: 0
            };
        },
        methods: {
            defaultFormData() {
                return {
                    dictId: "",
                    name: "",
                    key: "",
                    value: "",
                    categoryId: "",
                    categoryCode: "",
                    remark: ""
                };
            },
            /*翻前页*/
            handlePrevClick() {
                this.pageFlag = -1;
                this.lastId = this.tableData[0].dictId;
                this.loadData();
            },
            /*翻后页*/
            handleNextClick() {
                this.pageFlag = 1;
                this.lastId = this.tableData[this.tableData.length - 1].dictId;
                this.loadData();
            },
            onSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.loadData();
            },
            /*加载数据列表*/
            loadData() {
                this.loading = true;
                this.$store
                    .dispatch("firmDict/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        filter: {categoryId: this.curNode.categoryId}
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data.rows;
                            this.total = data.total;
                            // this.loadTotal();
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            loadTotal() {
                this.$store
                    .dispatch("firmDict/getTotal", {
                        filter: {categoryId: this.curNode.categoryId}
                    })
                    .then(data => {
                        if (data) {
                            this.total = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadCategory() {
                this.$store
                    .dispatch("firmCategory/getList", {filter: {categoryType: 0}})
                    .then(data => {
                        this.categoryList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*添加记录*/
            handleAdd() {
                this.isEdit = false;
                this.dialogVisible = true;
                this.clearForm();
                this.formData.categoryId = this.curNode.categoryId;
                this.formData.categoryCode = this.curNode.categoryCode;
                this.formData.categoryName = this.curNode.categoryName;
            },
            /*添加记录时完成数据填写或编辑记录时，点击对数据进行保存*/
            handleSave() {
                this.dialogVisible = false;
                if (this.formData.dictId != "") {
                    this.$store
                        .dispatch("firmDict/updateOne", {dictId: this.formData.dictId, data: this.formData})
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$store
                        .dispatch("firmDict/addOne", this.formData)
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

                this.clearForm();
            },
            handleCancel() {
                this.dialogVisible = false;
                this.clearForm();
            },
            /*点击记录进行编辑*/
            onEdit(row) {
                this.isEdit = true;
                this.dialogVisible = true;
                Object.assign(this.formData, row);
            },
            /*对字典信息进行删除*/
            onDel(row) {
                this.open(this.delete, row.dictId, "此操作将删除该条字典信息, 是否继续?");
            },
            /*根据字典ID删除字典*/
            delete(dictId) {
                this.$store
                    .dispatch("firmDict/removeOne", {dictId: dictId})
                    .then(() => {
                        if (1 === this.tableData.length) {
                            this.handlePrevClick();
                        } else {
                            this.loadData();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            clearForm() {
                this.formData = this.defaultFormData();
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
            },
            toUpperCase() {
                this.formData.key = this.formData.key.toUpperCase();
            },
        },
        watch: {
            curNode() {
                this.loadCategory();
                this.loadData();
            }
        }
    };
</script>
