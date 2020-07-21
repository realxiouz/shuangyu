<template>
  <div class="page">
    <el-row class="page-tools" :gutter="30">
      <el-col :xs="11" :sm="10" :md="9" :lg="8" :xl="8">
        <el-button type="primary" style="margin-bottom:20px" size="mini" @click="rootAdd">添加</el-button>
        <el-tree
          v-loading="treeLoading"
          node-key="menuId"
          auto-expand-parent
          :data="treeData"
          :default-expanded-keys="curLine"
          :props="treeProps"
          @node-click="handleNodeClick"
        >
          <span class="tree-node" slot-scope="{ node, data }">
             <span>{{ node.data.title }}</span>
            <span>
               <span>{{ node.data.sort }}&nbsp;&nbsp;&nbsp;</span>
              <el-button type="text" size="mini" @click="nodeAdd(node, data)">添加</el-button>
              <el-button type="text" size="mini" @click="onEdit(node, data)">编辑</el-button>
              <el-button type="text" size="mini" @click="removeNode(node, data)">移除</el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :xs="13" :sm="14" :md="15" :lg="16" :xl="16">
        <edit ref="search" :apiVisible="apiVisible" :curNode="curNode"></edit>
      </el-col>
    </el-row>
    <!-- 表单对话框 -->
    <el-dialog
      :title="addFlag?'添加导航菜单':'编辑导航菜单信息'"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <el-form
        ref="routerForm"
        :rules="routerForm"
        :model="formData"
        label-width="110px"
        size="mini"
      >
        <input type="hidden" v-model="formData.menuId"/>
        <el-form-item label="标题" prop="title">
          <el-input type="text" placeholder="请输入导航路由标题(title)" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="uri">
          <el-input type="text" placeholder="请输入路由导航路径(uri)" v-model="formData.uri"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="menuName">
          <el-input type="text" placeholder="请输入路由组件名称(menuName)" v-model="formData.menuName"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input type="text" placeholder="请输入导航路由图标(icon)" v-model="formData.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input type="number" placeholder="请输入导航路由排序(sort)" v-model="formData.sort"></el-input>
        </el-form-item>
        <el-form-item label="组件" prop="component">
          <el-input type="text" placeholder="请输入路由组件名称(menuName)" v-model="formData.component"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select v-model="formData.tags" multiple placeholder="选择标签...">
            <el-option label="导航" value="NAV" />
            <el-option label="视图" value="VIEW" />
            <el-option label="事件" value="EVENT" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="formData.enable"></el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" placeholder="请输入备注(remark)" v-model="formData.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:right">
        <el-button size="mini" @click="handleCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import edit from "./Edit";

  export default {
    data() {
      return {
        addFlag: true,
        treeLoading: true,
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
        },
        routerForm: {
          title: [
            {required: true, message: "请输入导航路由标题", trigger: "blur"}
          ],
          menuName: [
            {required: true, message: "请输入路由组件名称", trigger: "blur"}
          ],
          uri: [
            {required: true, message: "请输入路由导航路径", trigger: "blur"}
          ],
          sort: [{required: true, message: "请输入路由排序", trigger: "blur"}],
          // component: [{required: true, message: "请输入组件路径", trigger: "blur"}]
        }
      };
    },
    methods: {
      /*初始化导航添加表单*/
      defaultFormData() {
        return {
          menuId: "",
          menuName: "",
          enable: true,
          uri: "",
          pid: null,
          apis: [],
          icon: "",
          title: "",
          sort: "",
          remark: "",
          tags: []
        };
      },
      /*加载导航树*/
      loadData() {
        this.$store
          .dispatch("menu/getTreeList", {filter: {}})
          .then(data => {
            if (data) {
              this.treeData = data;
            }
            this.treeLoading = false;
          })
          .catch(error => {
            this.treeLoading = false;
            console.log(error);
          });
      },
      /*点击添加顶级企业信息*/
      rootAdd() {
        this.addFlag = true;
        this.formData = this.defaultFormData();
        //判断添加的导航是否是顶级导航
        this.rootNav = true;
        this.dialogVisible = true;
      },
      /*点击添加节点企业信息*/
      nodeAdd(idx, node) {
        this.addFlag = true;
        this.formData = this.defaultFormData();
        //添加的导航菜单不是顶级菜单
        this.formData.pid = node.menuId;
        this.formData.level = node.level + 1;
        this.curLine = [];
        this.rootNav = false;
        this.dialogVisible = true;
      },
      /*对导航节点进行存储*/
      handleSave() {
        if (this.formData.menuId != "") {
          this.$store
            .dispatch("menu/updateOne", {
              id: this.formData.menuId,
              data: this.formData
            })
            .then(() => {
              this.loadData();
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              this.dialogVisible = false;
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
          this.$refs.routerForm.validate(valid => {
            if (valid) {
              this.$store
                .dispatch("menu/addOne", this.formData)
                .then(data => {
                  this.curLine.push(data);
                  this.loadData();
                  this.$message({
                    type: "success",
                    message: "添加成功！"
                  });
                  this.dialogVisible = false;
                })
                .catch(error => {
                  console.log(error);
                });
            }
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
          node.menuId,
          "此操作将删除该条导航及子导航信息, 是否继续?"
        );
      },
      /*移除导航节点*/
      remove(params) {
        this.$store
          .dispatch("menu/removeOne", {id: params})
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
      onEdit(data, node) {
        this.addFlag = false;
        this.formData = node;
        this.dialogVisible = true;
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
      }
    },
    created() {
      this.loadData();
    },
    components: {
      edit
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
