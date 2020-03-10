<template>
  <div class="tree-node">
    <el-container>
      <el-row>
        <firm-search @onSearch="search"></firm-search>
      </el-row>
      <el-header>
        <el-button type="text" @click="rootAdd">添加</el-button>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          row-key="firmId"
          :tree-props="tableProps">
          <el-table-column
            prop="firmName"
            label="企业名称"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="firmCode"
            label="企业代码"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="location"
            label="机构所在地"
            width="360">
          </el-table-column>
          <el-table-column
            prop="linkPerson"
            label="联系人"
            width="220">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleAppend(scope.$index, scope.row)">添加
              </el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <!-- 表单对话框 -->
    <el-dialog title="导航信息" :visible.sync="dialogVisible" width="33%" :close-on-click-modal="false">
      <firm-edit :curNode="curNode" @onSave="handleSave" @onCancel="handleCancel"/>
    </el-dialog>
  </div>
</template>

<script>
  import firmEdit from "./Edit";
  import firmSearch from "./Search";

  export default {
    data() {
      return {
        dialogVisible: false,
        /*用于判断是否添加的是根节点*/
        rootNav: false,
        tableData: [],
        /*记录当前进行操作的节点数据*/
        curNode: {},
        tableProps: {
          hasChildren: 'xxx',
          children: 'children'
        }
      };
    },
    methods: {
      /*加载企业列表*/
      loadData() {
        this.$store
          .dispatch('firm/getTotal',{filter:{}})
          .then(data => {
            this.total = data.data;
          })
          .catch(error => {
            console.log(error);
          });
        this.$store
          .dispatch('firm/getList',{filter:{}})
          .then(data => {
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*根据关键字进行企业搜索*/
      search(keyword) {
        this.$store
          .dispatch('firm/getList', {firmName: keyword})
          .then(data => {
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*点击根节点添加按钮*/
      rootAdd() {
        //判断添加的导航是否是顶级导航
        this.rootNav = true;
        this.dialogVisible = true;

        this.curNode = {};
      },
      /*企业的添加、编辑保存*/
      handleSave(formData) {
        this.dialogVisible = false;
        /*更新*/
        if (formData.firmId != '') {
          this.$store
            .dispatch('firm/updateOne', {firm:formData})
            .then(data => {
              console.log(data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          /*添加*/
          if (this.rootNav) { //如果添加的顶级企业信息，对某些属性进行初始化
            formData.level = 0;
          }else{
            formData.pid = this.curNode.firmId;
            formData.level = this.curNode.level + 1;
          }

          this.$store
            .dispatch('firm/addOne', {firm:formData})
            .then(data => {
              console.log(data);
              this.loadData();
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      /*点击添加企业子节点按钮*/
      handleAppend(idx, row) {
        this.rootNav = false;
        this.dialogVisible = true;

        this.curNode = {};
        this.curNode.firmId = row.firmId;
        this.curNode.level = row.level;
      },
      /*点击编辑*/
      handleEdit(index, row) {
        this.curNode = row;
        this.dialogVisible = true;
      },
      /*点击删除*/
      handleDelete(index, row) {
        this.open(this.remove, row.firmId, '此操作将删除该企业信息及子企业信息, 是否继续?');
      },
      /*删除企业数据*/
      remove(params) {
        this.$store
          .dispatch('firm/removeOne', {firmID:params})
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      open(func, data, message) {
        this.$confirm(message, '提示', {
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
      }
    },
    mounted() {
      this.loadData();
    },
    components: {
      firmEdit,
      firmSearch
    }
  };
</script>
