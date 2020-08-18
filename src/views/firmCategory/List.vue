<template>
  <div class="page">
    <el-row class="page-tools" :gutter="20">
      <el-col :xs="11" :sm="10" :md="9" :lg="8" :xl="6">
        <el-button type="primary" size="mini" @click="rootAdd">添加</el-button>
        <el-tree
          v-loading="loading"
          node-key="categoryId"
          auto-expand-parent
          :data="treeData"
          :default-expanded-keys="curLine"
          :props="treeProps"
          :expand-on-click-node="false"
          :highlight-current="true"
          @node-click="handleNodeClick">
          <span class="tree-node" slot-scope="{ node, data }">
            <span>{{ node.data.categoryName }}</span>
            <span>
              <el-button type="text" size="mini" @click="nodeAdd(node, data)">添加</el-button>
              <el-button type="text" size="mini" @click="onEdit(node, data)">编辑</el-button>
              <el-button type="text" size="mini" style="color:#F56C6C" @click="removeNode(node, data)">移除</el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :xs="13" :sm="14" :md="15" :lg="16" :xl="18">
        <dict-edit :dictVisible="dictVisible" :curNode="curNode"/>
      </el-col>
    </el-row>
    <el-dialog
      :title="addFlag?'添加类别':'编辑类别信息'"
      :visible.sync="dialogVisible"
      width="33%"
      center
      :close-on-click-modal="false"
    >
      <el-form :model="formData" label-width="90px" size="mini">
        <input type="hidden" v-model="formData.categoryId"/>
        <el-form-item label="类别类型">
          <el-input type="text" v-model="formData.categoryType" :disabled="typeEditAbel || update"
                    placeholder="请输入类别类型.."></el-input>
        </el-form-item>
        <el-form-item label="类别编码">
          <el-input type="text" v-model="formData.categoryCode" @input="toUpperCase" :disabled="update"
                    placeholder="请输入类别编码.."></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input type="text" v-model="formData.categoryName" placeholder="请输入类别名称.."></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input type="text" v-model="formData.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" v-model="formData.remark" placeholder="请输入备注.."></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import dictEdit from "./Edit";

    export default {
        data() {
            return {
                addFlag: true,
                loading: true,
                dialogVisible: false,
                /*是否选择类别节点，没有选择则不可编辑*/
                dictVisible: true,
                update: false,
                /*判断是否添加的是根类别节点*/
                root: false,
                /*类别树数据列表*/
                treeData: [],
                /*在添加完一条导航数据后用于展开该条类别分支*/
                curLine: [],
                /*需要进行编辑的类别节点*/
                curNode: {},
                /*类别节点添加编辑表单*/
                formData: {},
                typeEditAbel: false,
                treeProps: {
                    children: "children",
                    hasChildren: "xxx"
                }
            };
        },
        methods: {
            /*初始化类别添加表单*/
            defaultFormData() {
                return {
                    categoryId: "",
                    categoryCode: "",
                    categoryType: null,
                    categoryName: "",
                    icon: "",
                    title: "",
                    sort: "",
                    remark: ""
                };
            },
            /*加载类别树*/
            loadData() {
                this.$store
                    .dispatch("firmCategory/getTreeList", {filter: {}})
                    .then(data => {
                        if (data) {
                            this.treeData = data;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            /*点击添加顶级企业信息*/
            rootAdd() {
                this.addFlag = true;
                this.typeEditAbel = false;
                this.formData = this.defaultFormData();
                this.formData.pid = null;
                this.formData.level = 0;

                //判断添加的导航是否是顶级导航
                this.root = true;
                this.dialogVisible = true;
                this.update = false;
            },
            /*点击添加节点企业信息*/
            nodeAdd(idx, node) {
                this.addFlag = true;
                this.typeEditAbel = true;
                this.formData = this.defaultFormData();
                this.formData.pid = node.categoryId;
                this.formData.level = node.level + 1;
                this.formData.categoryType = node.categoryType;

                //添加的导航菜单不是顶级菜单
                this.root = false;
                this.dialogVisible = true;
                this.update = false;
            },
            /*对导航节点进行存储*/
            handleSave() {
                this.dialogVisible = false;
                this.curLine = [];

                if (this.formData.categoryId != "") {
                    this.$store
                        .dispatch("firmCategory/updateOne", {id: this.formData.categoryId, data: this.formData})
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$store
                        .dispatch("firmCategory/addOne", this.formData)
                        .then(data => {
                            this.curLine.push(data);
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
                this.clearForm();
            },
            /*点击移除导航节点*/
            removeNode(data, node) {
                this.curLine = [];
                if (null != node.pid) {
                    this.curLine.push(node.pid);
                } else {
                    this.curLine = [];
                }
                this.open(
                    this.remove,
                    node.categoryId,
                    "此操作将删除该类别及子类别的信息, 是否继续?"
                );
            },
            /*移除类别节点*/
            remove(params) {
                this.$store
                    .dispatch("firmCategory/removeOne", {categoryId: params})
                    .then(() => {
                        this.loadData();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*点击取消按钮*/
            handleCancel() {
                this.clearForm();
                this.dialogVisible = false;
            },
            /*选择类别节点后对该节点进行编辑*/
            handleNodeClick(data, node) {
                if (!node.data.hasChildren) {
                    this.curNode = node.data;
                    this.dictVisible = false;
                } else {
                    this.dictVisible = true;
                }
            },
            onEdit(data, node) {
                this.addFlag = false;
                this.formData = node;
                this.dialogVisible = true;
                this.update = true;

                this.curLine = [];
                if (null != node.pid) {
                    this.curLine.push(node.pid);
                } else {
                    this.curLine = [];
                }
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
                this.formData.categoryCode = this.formData.categoryCode.toUpperCase();
            }
        },
        created() {
            this.loadData();
        },
        components: {
            dictEdit
        }
    };
</script>

<style scoped>
  .tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
