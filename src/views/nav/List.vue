<template>
  <div class="tree-node">
    <el-container>
      <el-aside width="300px">
        <el-header>
          <el-button type="primary" size="mini" @click="rootAdd">添加</el-button>
        </el-header>
        <!--  导航树  -->
        <el-tree
          accordion
          node-key="navId"
          auto-expand-parent
          :expand-on-click-node="false"
          :data="treeData"
          :default-expanded-keys="curLine"
          :props="treeProps"
          @node-click="handleNodeClick"
        >
          <span class="tree-node" slot-scope="{ node, data }">
            <span>{{ node.data.navName }}</span>
            <span>
              <el-button type="text" size="mini" @click="nodeAdd(node, data)">添加</el-button>
              <el-button type="text" size="mini" @click="handleEdit(node, data)">修改</el-button>
              <el-button type="text" size="mini" @click="removeNode(node, data)">移除</el-button>
            </span>
          </span>
        </el-tree>
      </el-aside>
      <el-main>
        <navEdit ref="search" :apiVisible="apiVisible" :curNode="curNode"></navEdit>
      </el-main>
    </el-container>
    <!-- 表单对话框 -->
    <el-dialog title="导航信息" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <el-form ref="form" :model="formData" label-width="90px">
        <input type="hidden" v-model="formData.navId"/>
        <el-form-item label="导航名称">
          <el-input type="text" placeholder="请输入导航名称" v-model="formData.navName"></el-input>
        </el-form-item>
        <el-form-item label="导航路径">
          <el-input type="text" placeholder="请输入导航路径" v-model="formData.uri"></el-input>
        </el-form-item>
        <el-form-item label="组件地址">
          <el-input type="text" placeholder="请输入组件地址" v-model="formData.view"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="formData.enable"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import navEdit from "./Edit";

    export default {
        data() {
            return {
                dialogVisible: false,
                /*是否选择导航节点，没有选择则不可编辑*/
                apiVisible: true,
                /*判断是否添加的是根导航节点*/
                rootNav: false,
                /*导航树数据列表*/
                treeData: [],
                /*在添加完一条导航数据后用于展开该条导航分支*/
                curLine: [],
                /*需要进行编辑的导航节点*/
                curNode: null,
                /*导航节点添加编辑表单*/
                formData: {},
                treeProps: {
                    children: "children",
                    hasChildren: "xxx"
                }
            };
        },
        methods: {
            /*初始化导航添加表单*/
            defaultFormData() {
                return {
                    navId: "",
                    navName: "",
                    enable: true,
                    uri: "",
                    pid: null,
                    apis: [],
                    view: ""
                };
            },
            /*加载导航树*/
            loadData() {
                this.$store
                    .dispatch("nav/getList", {})
                    .then(data => {
                        this.treeData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*点击添加顶级企业信息*/
            rootAdd() {
                this.formData = this.defaultFormData();

                //判断添加的导航是否是顶级导航
                this.rootNav = true;
                this.dialogVisible = true;
            },
            /*点击添加节点企业信息*/
            nodeAdd(idx, node) {
                this.formData = this.defaultFormData();

                //添加的导航菜单不是顶级菜单
                this.formData.pid = node.navId;
                this.formData.level = node.level + 1;
                this.curLine = [];

                this.rootNav = false;
                this.dialogVisible = true;
            },
            /*对导航节点进行存储*/
            handleSave() {
                this.dialogVisible = false;

                if (this.formData.navId != "") {
                    this.$store
                        .dispatch("nav/updateOne", {nav: this.formData})
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    if (this.rootNav) {
                        //如果添加的顶级企业信息，对某些属性进行初始化
                        this.formData.pid = null;
                        this.formData.level = 0;
                    }

                    this.$store
                        .dispatch("nav/addOne", {nav: this.formData})
                        .then(data => {
                            this.curLine.push(data.data);
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
                    node.navId,
                    "此操作将删除该条导航及子导航信息, 是否继续?"
                );
            },
            /*移除导航节点*/
            remove(params) {
                this.$store
                    .dispatch("nav/removeOne", {navId: params})
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
            /*选择导航节点后对该节点进行编辑*/
            handleNodeClick(data, node) {
                /*加载该节点所有的api数据*/
                this.curNode = node.data;
                this.apiVisible = false;
            },
            handleEdit(data, node) {
                this.formData = node;
                this.dialogVisible = true;

                this.curLine = [];
                this.curLine.push(node.navId);
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
            }
        },
        mounted() {
            this.loadData();
        },
        components: {
            navEdit
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
