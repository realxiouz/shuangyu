<template>
  <div  class="page">
    <el-row class="page-tools" :gutter="20">
      <el-col :xl="4">
        <el-tree
          v-loading="loading"
          :data="treeData"
          :props="treeProps"
          :highlight-current="true"
          :default-expand-all="true"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
      <el-col :xl="18">
        <edit :curNode="curNode" :staffAddVisible="staffAddVisible" style="width: 100%" />
      </el-col>
    </el-row>
    
    
  </div>
</template>

<script>
import edit from "./Edit";

export default {
  data() {
    return {
      staffAddVisible: true,
      loading: true,
      curNode: null,
      treeData: [],
      treeProps: {
        label: "deptName",
        children: "children"
      }
    };
  },
  methods: {
    loadTreeData() {
      this.$store
        .dispatch("dept/getTreeList", { filters: {} })
        .then(data => {
          if (data) {
            this.treeData = data;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
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
    edit
  }
};
</script>
