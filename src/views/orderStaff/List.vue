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
      loadTreeData() {
        if (this.$store.state.loginInfo.firm && this.$store.state.loginInfo.firm.firmId && this.$store.state.loginInfo.firm.firmId != null) {
          this.$store
            .dispatch('dept/getList', {filters: {firmId: this.$store.state.loginInfo.firm.firmId}})
            .then(data => {
              this.treeData = data;
            })
            .catch(error => {
              console.log(error);
            });
        }

      },
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
