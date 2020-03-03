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
          :props="treeProps"
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
      </el-aside>

      <el-main>
        <el-header>
          <el-button type="primary" @click="apisEdit" :disabled="apiVisible">编辑</el-button>
        </el-header>
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="apiName"
            label="API名称"
            width="240">
          </el-table-column>
          <el-table-column
            prop="category"
            label="类别"
            width="240">
          </el-table-column>
          <el-table-column
            label="是否启用"
            width="240"
            align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enable"
                disabled>
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total,prev,next"
          prev-text="上一页"
          next-text="下一页"
          :total="total"
          @prev-click="handlePrevChange"
          @next-click="handleNextChange">
        </el-pagination>
      </el-main>
    </el-container>
    <!-- 表单对话框 -->
    <el-dialog title="导航信息" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
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
    <el-dialog title="编辑" :visible.sync="ApiDialogVisible" width="33%" :close-on-click-modal="false">
      <!--穿梭框-->
      <template>
        <el-transfer v-model="transferData" :data="apiData" :props="transferProps" :titles="titles"></el-transfer>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleTransCancel">取 消</el-button>
        <el-button type="primary" @click="handleTransSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        ApiDialogVisible: false,
        apiVisible: true,
        rootNav: false,
        treeData: [],
        tableData: [],
        apiData: [],
        transferData: [],
        apis: [],
        curLine: [],
        curNode: null,
        pageFlag: 'next',
        pageSize: 10,
        lastId: '0',
        total: 0,
        formData: {
          navId: '',
          navName: '',
          enable: true,
          url: '',
          pid: null,
          apis: []
        },
        treeProps: {
          children: 'children',
          hasChildren: 'xxx'
        },
        titles:['apis','已选api'],
        transferProps: {
          key: 'apiId',
          label: 'apiName'}
      };
    },
    methods: {
      loadData() {
        this.$store
          .dispatch('nav/getList')
          .then(data => {
            this.treeData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*初始化api列表*/
      loadApis(){
        this.$store
          .dispatch('api/getAll')
          .then(data => {
            this.apiData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadNavOne(){
        this.$store
          .dispatch('nav/getOne',this.curNode.navId)
          .then(data => {
            this.curNode = data.data;
            this.tableLoad();
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
      /*对导航节点进行存储*/
      handleSave() {
        this.dialogVisible = false;

        if (this.formData.navId != '') {
          this.$store
            .dispatch('nav/updateOne', this.formData)
            .then(data => {
              console.log(data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          if (this.rootNav) { //如果添加的顶级企业信息，对某些属性进行初始化
            this.formData.pid = null;
            this.formData.level = 0;
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
      /*移除导航节点*/
      removeNode(data, node) {
        this.curLine = [];
        this.curLine.push(node.pid);
        this.open(this.remove, this.loadData, node.navId);
      },
      remove(params) {
        this.$store
          .dispatch('nav/removeOne', params)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      apisEdit(){
        this.loadApis();
        this.getTransferData();
        this.ApiDialogVisible = true;
      },
      /*更新表格数据*/
      tableLoad(){
        this.total = this.curNode.apis.length;
        this.tableData = this.curNode.apis;
        if (1 === this.tableData.length){
          this.tableData = [];
        }
      },
      /*在点击导航节点后需对apis列表进行初始化*/
      getTransferData(){
        this.curNode.apis.forEach((item) => {
          this.transferData.push(item.apiId);
        })
      },
      /*在对导航节点进行存储时需要对apis列表进行转换*/
      transApis(){
        this.apis = [];
        this.apiData.forEach((item) => {
          if (this.transferData.includes(item.apiId)){
            this.apis.push(item);
          }
        });
      },
      handleCancel() {
        this.clearForm();
        this.dialogVisible = false;
      },
      handleTransCancel(){
        this.ApiDialogVisible = false;
        this.clearTransfer();
      },
      /*在选择完成api后进行保存*/
      handleTransSave(){
        this.ApiDialogVisible = false;
        this.transApis();
        this.curNode.apis = this.apis;
        this.$store
          .dispatch('nav/updateOne',this.curNode)
          .then(data => {
            console.log(data);
            //对数据列表进行重新加载
            this.loadNavOne();
          })
          .catch(error => {
            console.log(error);
          });
        this.clearTransfer();
      },
      /*点击上一页*/
      handlePrevChange(){
        this.pageFlag = "prev";
        this.lastId = this.tableData[0].id;
        this.loadData();
      },
      /*点击下一页*/
      handleNextChange(){
        this.pageFlag = "next";
        this.lastId = this.tableData[this.tableData.length - 1].id;
        this.loadData();
      },
      /*选择导航节点后对该节点进行编辑*/
      handleNodeClick(data, node) {
        /*加载该节点所有的api数据*/
        this.curNode = node.data;
        this.apiVisible = false;
        this.tableLoad();
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
      },
      clearTransfer(){
          this.apiData = [];
          this.transferData = [];
      },
      open(func, loadFunc, data) {
        this.$confirm('此操作将删除该企业信息及子企业信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          func(data);
          loadFunc();
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
