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
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        treeData: [],
        formData:{
          firmName: '',
          deptName: '',
          nickName: '',
          fullName: '',
          gender: null,
          birthDate: null,
          phone: '',
          email: '',
          idCardNo: '',
          headImgUrl: '',
        },
        treeProps: {
          label: 'deptName',
          children: 'children'
        }
      }
    },
    methods: {
      loadData() {

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
