<template>
  <div class="custom-tree-node">
    <el-container>
      <el-aside width="300px">
        <el-button type="text" @click="rootAdd">添加</el-button>
        <!--  导航树  -->
        <el-tree
          accordion
          :data="treeData"
          node-key="id"
          :expand-on-click-node="false"
          @node-click="handleNodeClick">
          <span class="tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => nodeAdd(data)">
                添加
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)">
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
          <el-table-column v-if="false"
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
    <el-dialog title="导航信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <input type="hidden" v-model="form.navId"/>
        <el-form-item label="导航名称">
          <el-input
            type="text"
            placeholder="请输入导航名称"
            v-model="form.label">
          </el-input>
        </el-form-item>
        <el-form-item label="导航路径">
          <el-input
            type="text"
            placeholder="请输入导航路径"
            v-model="form.url">
          </el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.enable"></el-switch>
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
        nodeData: {},
        rootNav: false,
        treeData: [],
        curLine: {},
        curNode: {},
        tableData: [],
        formatBoolean: true,
        form: {
          navId: '',
          label: '',
          enable: true,
          url: '',
          children:[]
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      /*点击添加顶级导航*/
      rootAdd() {
        //判断添加的导航是否是顶级导航
        this.rootNav = true;
        this.dialogVisible = true;
      },
      /*点击添加节点导航*/
      nodeAdd(data){
        //添加的导航菜单不是顶级菜单
        this.rootNav = false;
        this.nodeData = data;
        this.dialogVisible = true;
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      /*添加顶级导航*/
      rootPush(){
        let rootNav = {};
        rootNav.label = this.form.label;
        rootNav.url = this.form.url;
        rootNav.enable = this.form.enable;
        rootNav.children = [];
        this.treeData.push(rootNav);
        //将该导航分支传到后端处理
        this.$store
          .dispatch( 'nav/add', this.form)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.clearForm();
        this.dialogVisible = false;
      },
      /*添加树状节点导航*/
      append(data) {
        let _label = this.form.label;
        const newChild = {
          id: ++data.id,
          label: _label,
          url: this.form.url,
          enable: this.form.enable,
          children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
        //将该导航分支传到后端
        this.$store
            .dispatch( 'nav/updateOne',this.curLine.data)
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.log(error);
            });
        this.clearForm();
      },
      /*移除树状节点导航*/
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      handleNodeClick(data, node) {
        this.curNode = node;
        this.getCurLine();
      },
      handleSave() {
          this.dialogVisible = false;

          if (this.rootNav){
            this.rootPush();
          }else{
            this.append(this.nodeData);
          }
      },
      handleEdit(index, row) {
        this.form = row;
        this.dialogVisible = true;
      },
      handleDelete(index, row) {
        this.$store
          .dispatch('nav/delete', row.id)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.loadData();
      },
      loadData() {
        this.$store
          .dispatch('nav/getNavList')
          .then(data => {
            this.treeData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      clearForm(){
        this.form = {
          navId: '',
          label: '',
          enable: true,
          url: '',
          children:[]
        };
      },
      getCurLine(){
        let tempNode = this.curNode;
        if (tempNode.parent.id == 0){
          this.curLine = tempNode;
        }else{
          while(tempNode.parent.id != 0){
            tempNode = tempNode.parent;
            this.curLine = tempNode;
          }
        }
        console.log(this.curLine);
        console.log(this.curLine.data);
      },
  },
    mounted() {
      this.loadData();
    },

  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
