<template>
  <div class="tree-node">
    <el-container>
      <el-aside width="300px">
      <el-header>
          <el-button type="text" @click="rootAdd">添加</el-button>
      </el-header>
        <!--  导航树  -->
        <el-tree
          accordion
          node-key="navId"
          auto-expand-parent
          :expand-on-click-node="false"
          :data="treeData"
          :default-expanded-keys="curLine"
          :props="defaultProps"
          @node-click="handleNodeClick">
          <span class="tree-node" slot-scope="{ node, data }">
            <span>{{ node.data.navName }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="nodeAdd(node, data)">
                添加
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="removeNode(node, data)">
                移除
              </el-button>
            </span>
          </span>
        </el-tree>
        <el-row>
          <el-button @click="rootAdd" icon="el-icon-plus" circle></el-button>
        </el-row>
      </el-aside>

      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
             v-if="false"
             prop="id"
             label="主键"
             width="80"
          ></el-table-column>
          <el-table-column
            prop="roleId"
            label="角色唯一标识"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称"
            width="160"
          ></el-table-column>
          <el-table-column prop="isEnable" label="是否启用" ></el-table-column>
          <el-table-column prop="apis" label="apis"></el-table-column>
          <el-table-column prop="navs" label="导航菜单"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editRole(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="removeOne(scope.row.id,scope.$index,tableData)" type="text"
                         size="small">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <!-- 表单对话框 -->
    <el-dialog title="导航信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="formData" label-width="90px">
        <input type="hidden" v-model="formData.navId"/>
        <el-form-item label="导航名称">
          <el-input
            type="text"
            placeholder="请输入导航名称"
            v-model="formData.navName">
          </el-input>
        </el-form-item>
        <el-form-item label="导航路径">
          <el-input
            type="text"
            placeholder="请输入导航路径"
            v-model="formData.url">
          </el-input>
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
  export default {
    data() {
      return {
        dialogVisible: false,
        rootNav: false,
        treeData: [],
        tableData: [],
        curLine: [],
        curNode: {},
        formData: {
          navId: '',
          navName: '',
          enable: true,
          url: '',
          pid: null,
          api: []
        },
        defaultProps: {
          children: 'children',
          label: 'navName',
          hasChildren:'xxx'
        }
      };
    },
    methods: {
      loadData() {
        this.$store
          .dispatch('nav/getPageList')
          .then(data => {
            this.treeData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*点击添加顶级企业信息*/
      rootAdd() {
        //判断添加的导航是否是顶级导航
        this.rootNav = true;
        this.dialogVisible = true;
      },
      /*点击添加节点企业信息*/
      nodeAdd(idx, node) {
        //添加的导航菜单不是顶级菜单
        this.formData.pid = node.navId;
        this.formData.level = node.level + 1;
        this.curLine = [];

        this.rootNav = false;
        this.dialogVisible = true;
      },
      handleSave() {
        this.dialogVisible = false;

        if(this.formData.navId != ''){
          this.$store
            .dispatch( 'nav/updateOne', this.formData)
            .then(data => {
              console.log(data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          if (this.rootNav) { //如果添加的顶级企业信息，对某些属性进行初始化
            this.formData.pid = null;
            this.formData.level = 1;
          }

          this.$store
            .dispatch('nav/addOne', this.formData)
            .then(data => {
              console.log(data);
              this.curLine.push(data.data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        }
        this.clearForm();
      },
      removeNode(data,node){
        this.curLine = [];
        this.curLine.push(node.pid);
        this.open(this.remove,node.navId);
      },
      remove(params){
        this.$store
          .dispatch('nav/removeOne', params)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      open(func,data) {
        this.$confirm('此操作将删除该企业信息及子企业信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          func(data);
          this.loadData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCancel() {
        this.clearForm();
        this.dialogVisible = false;
      },
      handleNodeClick(data, node){

      },
      getCurLine(curNode){
        let tmpNode = curNode;
        if (0 != tmpNode.parent.id){
          while (0 != tmpNode.parent.id){
            tmpNode = tmpNode.parent;
          }
        }
        this.curRootNode = tmpNode;
      },
      loadApis(){
        this.$store
          .dispatch('nav/delete')
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      clearForm() {
        this.formData = {
          navId: '',
          navName: '',
          enable: true,
          url: '',
          pid: null,
          api: []
        };
      }
  },
    mounted() {
      this.loadData();
    },

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
