<template>
  <div class="app-container">

      <!--<el-main>-->
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="姓名">
            <el-input v-model="searchForm.roleName" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addRole">添加</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
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
          <el-table-column prop="enable" label="是否启用">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enable"
                on-color="#00A854"
                on-text="启动"
                on-value=true
                off-color="#F04134"
                off-text="禁止"
                off-value=false
                @change="changeSwitch(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column  prop="navIds"  label="navIds"></el-table-column>
          <el-table-column prop="navNames" label="导航菜单"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button  @click.native.prevent="editRole(scope.row)" type="text" size="small">编辑</el-button>
              <el-button  @click.native.prevent="removeOne(scope.row.roleId,scope.$index,tableData)" type="text" size="small">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <h-page-footer>
          <el-pagination
            @size-change="handleSizeChange"
            @prev-click="prevClick"
            @next-click="nextClick"
            background
            layout="total,sizes,prev,next"
            prev-text="上一页"
            next-text="下一页"
            :page-size="pageSize"
            :total="total">
          </el-pagination>
        </h-page-footer>
      <!--</el-main>-->
    <el-dialog title="角色" :visible.sync="dialogVisible"  width="30%">
      <el-form ref="form" :model="form" label-width="95px">
        <el-input v-show="false" v-model="navs"></el-input>
        <el-input v-show="false" v-model="form.roleId"></el-input>
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.enable"></el-switch>
        </el-form-item>
        <el-scrollbar style="height:80%">
        <el-form-item label="选择菜单">
        <el-tree
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>
        </el-form-item>
        </el-scrollbar>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getPageList,getTotal} from '@/api/role';
  export default {
    name: "role",
    data() {
      return {
        form: {
          roleId: "",
          roleName: "",
          navs: "",
          enable: true
        },
        dialogVisible: false,
        tableData: [],
        searchForm: {},
        lastId: '0',
        pageSize: 10,
        pageFlag: 'next',
        navs: [],

        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };

    },
    methods: {
      loadData() {
        getPageList(this.pageFlag, this.pageSize,this.lastId,this.searchForm).then(response => {
          //把data里面的navs只显示navName
          var data = response.data;
          for (var i=0;i<data.length;i++) {
            data[i].navIds = this.handleNavIds(data[i].navs);
            data[i].navNames =  this.handleNavNames(data[i].navs);
          }
          //把nav的id保存起来，编辑的时候，显示tree的选中状态
          this.tableData = data;
        })
          .catch(error => {
            console.log(error);
          });
      },
      addRole:function(){
        this.dialogVisible = true;
        this.form.treeData = this.getNavs();
      },
      handleNavIds: function(navs) {
        if (navs == null) {
          return;
        }
        var navIds = [];
        navs.forEach((nav)=> {
          navIds.push(nav.id);
          if (nav.children != null) {
            nav.children.forEach((child) => {
              navIds.push(child.id);
              if (child.children != null) {
                child.children.forEach((childChild) => {
                  navIds.push(childChild.id);
                });
              }
            });
          }
        });
        console.log("navIds==========" + navIds.length);
        return navIds;
      },
      //将返回的nav只显示名字
      handleNavNames:function(navs){
        if (navs==null){
          return;
        }
        var navnames = "";
        navs.forEach((nav)=>{
          if(nav.label!=null) {
            navnames += "," + nav.label;
          }
          if (nav.children!=null){
            nav.children.forEach((child)=>{
              if(child.label!=null) {
                navnames += "," + child.label;
              }
              if (child.children!=null){
                child.children.forEach((childChild)=>{
                  if(childChild.label!=null){
                    navnames += ","+childChild.label;
                  }
                });
              }
            });
          }
        });
        if (navnames!=null){
          navnames = navnames.substring(1,navnames.length);
        }
        return navnames;
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function(pageSize) {
        this.pageSize = pageSize;
        this.loadData();
      },

      handleCancel() {
        this.dialogVisible = false;
      },
      save:function(data){
        this.$store
          .dispatch("role/save", data)
          .then(data => {
            console.log(data);
            this.loadData();
            this.loadTotal();
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSave() {
        console.log("this.$refs.tree.getCheckedNodes()"+JSON.stringify(this.$refs.tree.getCheckedNodes()));
        this.form.navs = this.getSelectedNavs(this.$refs.tree.getCheckedNodes());
        console.log("navsEntity:"+this.getSelectedNavs(this.$refs.tree.getCheckedNodes()));
        this.save(this.form);
        this.dialogVisible = false;
      },
      removeOne: function(roleid, index, rows) {
        this.$confirm('此操作将状态改为删除状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store
            .dispatch("role/removeOne", roleid)
            .then(data => {
              console.log(data);
              rows.splice(index,1);
              this.total--;
            })
            .catch(error => {
              console.log(error);
            });
        }).catch(err => {
          console.error(err)
        })

      },
      editRole: function(row) {
        this.getNavs();
        this.dialogVisible = true;
        this.form.roleId = row.roleId;
        this.form.roleName = row.roleName;
        this.form.enable = row.enable;
        console.log("row.navIds:"+row.navIds);
        var rowNavids = [];
        row.navIds.forEach((id)=>{
          rowNavids.push(id);
        });
        this.$refs.tree.setCheckedKeys(row.navIds);
      },
      changeSwitch:function(data) {
        this.save(data);
      },
      getNavs: function() {
        this.$store
          .dispatch("role/getNavs")
          .then(data => {
            this.navs = data;
            console.log("initTreeData======================="+JSON.stringify(data))
            this.initTreeData(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      getSelectedChildrenNavs: function(nodes, navChilds) {
        var navsEntitys = [];
        nodes.forEach((node)=> {
          navChilds.forEach((nav)=> {
            //首先对比nav和node的id是否相同，不相同，跳过
            if (nav.id == node.id) { //相同，再对比他们的children
              var navi = {};
              navi.id = nav.id;
              navi.label = nav.label;
              navi.isEnable = nav.isEnable;
              navi.uri = nav.uri;
              if (node.children != null&&nav.children!=null) {
                var navChildren = this.getSelectedChildrenNavs(node.children, nav.children);
                navi.children = navChildren;
              }
              navsEntitys.push(navi);
            }
          });
        });
        return navsEntitys;
      },
      findNavByTreeNode: function(node,navs) {
        //循环第一级nav
        var ret = null;
        for (var i = 0; i < navs.length; i++) {
          var nav = navs[i];
          if (nav.id == node.id) {
            ret = nav;
            break;
          }
        }
        //循环第二级nav
        if (!ret){
          for (let j = 0; j < navs.length; j++) {
            return this.findNavByTreeNode(node,navs[j].children);
          }
        }
        //循环第三级nav
        if (!ret){
          for (let j = 0; j < navs.length; j++) {
            if(!navs[j].children){
              navs[j].children.forEach((third)=>{
                if (!third.children){
                  return this.findNavByTreeNode(third.children);
                }
              });
            }
          }
        }
        return ret;
      },
      getSelectedNavs: function(nodes) {
        // var navs = this.getNavs()
        var navsEntitys = [];
        nodes.forEach((node) => {
          //找到与node对应的那个nav
          var nav = this.findNavByTreeNode(node, this.navs);
          if (!nav){
            return [];
          }
          var navi = {};
          navi.id = nav.id;
          navi.label = nav.label;
          navi.isEnable = nav.isEnable;
          navi.uri = nav.uri;
          if (node.children != null && nav.children != null) {
            var navChildren = this.getSelectedChildrenNavs(node.children, nav.children);
            navi.children = navChildren;
          }
          navsEntitys.push(navi);
        });
        return navsEntitys;
      },
      initChildrenNode: function(nodes) {
        var childrens = [];
        for(var i =0;i<nodes.length;i++){
          var childs = [];
          var node = nodes[i];
          var tree = {};
          tree.id = node.id;
          tree.label = node.label;
          if (node.children!=null){
            childs = this.initChildrenNode(node.children);
          }
          tree.children = childs;
          childrens.push(tree);

        }
        return childrens;
      },
      initTreeData: function(data) {
        var trees = [];
       for(var i =0;i<data.length;i++){
         var node = data[i];
          var tree = {};
          if (node.children != null) {
            var childrenNodes = this.initChildrenNode(node.children);
            tree.children = childrenNodes;
          }
          tree.id = node.id;
          tree.label = node.label;
          trees.push(tree);
        }
       this.treeData = trees;
      },
      loadTotal: function () {
        getTotal(this.searchForm)
          .then(resp => {
            this.total = resp.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      prevClick: function () {
        this.pageFlag = 'prev';
        this.lastId = this.tableData[0].roleId;
        this.loadData();
      },
      nextClick: function () {
        this.pageFlag = 'next';
        this.lastId = this.tableData[this.tableData.length - 1].roleId;
        this.loadData();
      },
      handleSearch:function() {
        this.loadData();
        this.loadTotal();
      }
    },

    mounted() {
      this.loadTotal();
      this.loadData();
    }
  };
</script>
<style scoped>
  .line {
    text-align: center;
  }
</style>
