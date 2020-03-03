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
        <el-button @click="add">添加</el-button>
      </el-header>
      <el-main>
        <!--******************************************-->
        <el-form :model="formData" label-width="80px">
          <el-form-item label="性别">
            <el-select v-model="formData.gender" placeholder="请选择性别">
              <el-option label="男" :value=0></el-option>
              <el-option label="女" :value=1></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="formData.nickName"></el-input>
          </el-form-item>
        </el-form>
        <!--******************************************-->
        <el-dialog
          title="提示"
          width="30%"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false">
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
        treeData: [],
        formData:{
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
      loadData() {
        this.$store
          .dispatch('dept/getList',{firmId:'8e0e85fae96a44b9abc64c61192a986f'})
          .then(data => {
            this.treeData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      add(){
        this.dialogVisible = true;
      },
      handleNodeClick(data, node) {
        console.log(node);
      }
    },
    mounted() {
      this.loadData();
    },

  };
</script>
