<template>
  <el-container>
    <el-aside width="200px">
      <el-tree
        :data="treeData"
        :props="treeProps"
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick">
      </el-tree>
    </el-aside>
      <staff-form :curNode="curNode" :staffAddVisible="staffAddVisible" style="width: 100%"/>
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
          .dispatch('dept/getList', {filters: {firmId: '78ac36e7f76747a7aa069cd22177577f'}})
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
