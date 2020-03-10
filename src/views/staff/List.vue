<template>
  <el-container>
    <el-aside width="200px">
      <el-tree
        :data="treeData"
        :props="treeProps"
        :highlight-current="true"
        @node-click="handleNodeClick">
      </el-tree>
    </el-aside>
    <el-container>
      <staff-form :curNode="curNode" :staffAddVisible="staffAddVisible"/>
    </el-container>
  </el-container>
</template>

<script>
  import staffForm from "./Edit";

  export default {
    data() {
      return {
        staffAddVisible: true,
        curNode: null,
        treeData: [],
        treeProps: {
          label: 'deptName',
          children: 'children'
        }
      }
    },
    methods: {
      /*获取部门树*/
      loadTreeData() {
        this.$store
          .dispatch('dept/getList', {filters: {firmId: '8e0e85fae96a44b9abc64c61192a986f'}})
          .then(data => {
            this.treeData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      /*点击部门树时调用*/
      handleNodeClick(data) {
        this.staffAddVisible = false;
        this.curNode = data;
      }
    },
    mounted() {
      this.loadTreeData();
    },
    components: {
      staffForm
    }
  };
</script>
