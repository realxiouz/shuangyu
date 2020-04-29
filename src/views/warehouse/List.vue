<template>
  <div class="bigBox">
    <div class="searchBox">
      <warehouse-search @onSearch="handleSearch"></warehouse-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        size="mini"
        :data="tableData"
        row-key="code"
        :tree-props="tableProps"
      >
        <el-table-column prop="warehouseCode" label="仓库编码" align="center" width="260"></el-table-column>
        <el-table-column prop="warehouseName" label="仓库名称" align="center" width="260"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" width="260"></el-table-column>
        <el-table-column prop="contact" label="联系人" align="center" width="260"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center" width="260"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAppend(scope.$index, scope.row)">添加</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表单对话框 -->
      <el-dialog
        title="添加企业"
        center
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <warehouse-edit v-if="dialogVisible" :curNode="curNode" :update="update" @onSave="handleSave"
                        @onCancel="handleCancel"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import warehouseEdit from "./Edit";
    import warehouseSearch from "./Search";

    export default {
        data() {
            return {
                loading: true,
                dialogVisible: false,
                rootNav: false,
                searchForm: {},
                tableData: [],
                curNode: {},
                update: false,
                tableProps: {
                    hasChildren: "****",
                    children: "children"
                }
            };
        },
        methods: {
            /*加载企业列表*/
            loadData() {
                this.$store
                    .dispatch("warehouse/getTreeList", {filter: {}})
                    .then(data => {
                        if (data && data.data) {
                            this.tableData = data.data;
                        }
                        this.loading = false;
                    })
                    .catch(error => {

                        console.log(error);
                    });
            },
            handleSearch(searchForm) {
                console.log(searchForm);
                //如果搜索form中有搜索属性，则走搜索，否则刷新列表
                let searchFlag = false;
                for(let key in searchForm){
                    if (searchForm[key]){
                        searchFlag = true;
                    }
                }
                if (searchFlag){
                    //走搜索
                    this.$store
                        .dispatch("warehouse/getList", {filter: searchForm})
                        .then(data => {
                            this.tableData = data.data;
                            this.loading = false;
                        })
                        .catch(error => {
                            this.loading = false;
                            console.log(error);
                        });
                } else {
                    //刷新列表
                    this.loadData();
                }
            },
            //添加根节点
            handleAdd() {
                this.rootNav = true;
                this.dialogVisible = true;

                this.curNode = {};
                this.update = false;
            },
            /*企业的添加、编辑保存*/
            handleSave(formData) {
                this.dialogVisible = false;

                if (this.update) {
                    this.$store
                        .dispatch("warehouse/updateOne", formData)
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    if (this.rootNav) {
                        //如果添加的顶级企业信息，对某些属性进行初始化
                        formData.level = 0;
                    } else {
                        formData.pid = this.curNode.warehouseCode;
                        formData.level = this.curNode.level + 1;
                    }

                    this.$store
                        .dispatch("warehouse/addOne", formData)
                        .then(() => {
                            this.loadData({});
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            /*点击添加子节点按钮*/
            handleAppend(idx, row) {
                this.rootNav = false;
                this.dialogVisible = true;
                this.update = false;

                this.curNode = row;
            },
            /*点击编辑*/
            handleEdit(index, row) {
                this.curNode = row;
                this.dialogVisible = true;
                this.update = true;
            },
            /*点击删除*/
            handleDelete(index, row) {
                this.open(this.remove, row.warehouseCode, "此操作将删除该仓库信息及所有子仓库信息, 是否继续?");
            },
            /*删除企业数据*/
            remove(params) {
                this.$store
                    .dispatch("warehouse/removeOne", {warehouseCode: params})
                    .then(() => {
                        this.loadData(this.searchForm);
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
            warehouseEdit,
            warehouseSearch
        }
    };
</script>
