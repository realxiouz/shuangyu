<template>
  <el-container>
    <el-aside width="200px">
      <el-tree
        :data="treeData"
        :props="treeProps"
        @node-click="handleNodeClick">

      </el-tree>
    </el-aside>
    <el-container>
      <el-header>
        <el-button @click="add" :disabled="staffAddVisible">添加</el-button>
      </el-header>
      <el-main>
        <el-table
              stripe
              :data="tableData">
          <el-table-column
            prop="nickName"
            label="昵称"
            width="170">
          </el-table-column>
          <el-table-column
            prop="fullName"
            label="姓名"
            width="165">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="165">
          </el-table-column>
          <el-table-column
            label="出生日期"
            width="240"
            align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.birthDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="220"
            align="center">
          </el-table-column>
          <el-table-column
            prop="email"
            label="电子邮箱"
            width="240"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- form弹窗 -->
        <el-dialog
                title="提示"
                width="30%"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false">
          <el-form :model="formData" label-width="80px">
            <input type="hidden" v-model="formData.staffId"/>
            <el-form-item label="企业名称">
              <el-input v-model="formData.firmName" disabled></el-input>
            </el-form-item>
            <el-form-item label="部门名称">
              <el-input v-model="formData.deptName" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="formData.nickName"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formData.fullName"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="formData.gender" placeholder="请选择性别">
                <el-option label="男" :value=0></el-option>
                <el-option label="女" :value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-col>
                <el-date-picker type="date" v-model="formData.birthDate" placeholder="选择日期"/>
              </el-col>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="formData.idCardNo"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        staffAddVisible: true,
        treeData: [],
        tableData: [],
        curNode: null,
        formData:{
          staffId: '',
          userId: '',
          firmId: '',
          roles:[],
          domain: '',
          firmName: '',
          deptName: '',
          nickName: '',
          fullName: '',
          gender: 0,
          birthDate: null,
          phone: '',
          email: '',
          idCardNo: '',
          headImgUrl: ''
        },
        treeProps: {
          label: 'deptName',
          children: 'children'
        }
      }
    },
    methods: {
      loadTreeData() {
        this.$store
          .dispatch('dept/getList',{firmId:'8e0e85fae96a44b9abc64c61192a986f'})
          .then(data => {
            this.treeData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadTableData(){
        this.$store
          .dispatch('staff/getList',{firmId: this.curNode.firmId, deptName: this.curNode.deptName})
          .then(data => {
            this.tableData = data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      add(){
        this.dialogVisible = true;
      },
      handleSave(){
        this.dialogVisible = false;

        let url = null;
        if ('' != this.formData.staffId){
          url = 'staff/updateOne';
        }else{
          url = 'staff/addOne';
        }
        this.$store
          .dispatch(url,this.formData)
          .then(data => {
            console.log(data);
            this.loadTableData();
          })
          .catch(error => {
            console.log(error);
          });

        this.clearForm();
      },
      handleCancel(){
        this.dialogVisible = false;
        this.clearForm();
      },
      handleEdit(idx,row){
        this.dialogVisible = true;
        this.formData = row;
      },
      handleDelete(idx,row){
        this.open(this.delete, row.staffId);
      },
      delete(staffID){
        this.$store
          .dispatch('staff/removeOne',staffID)
          .then(data => {
            console.log(data);
            this.loadTableData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleNodeClick(data) {
        this.staffAddVisible = false;
        this.curNode = data;
        this.initFormData();
        this.loadTableData();
      },
      initFormData(){
        this.formData.deptName = this.curNode.deptName;
        this.formData.deptId = this.curNode.deptId;
        this.formData.firmId = this.curNode.firmId;
      },
      clearForm(){
        this.formData = {
          staffId: '',
          userId: '',
          firmId: '',
          roles:[],
          domain: '',
          firmName: '',
          deptName: '',
          nickName: '',
          fullName: '',
          gender: 0,
          birthDate: null,
          phone: '',
          email: '',
          idCardNo: '',
          headImgUrl: ''
        };
        this.initFormData();
      },
      open(func, data) {
        this.$confirm('此操作将删除该企业信息及子企业信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          func(data);
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
      this.loadTreeData();
    },

  };
</script>
