<template>
  <div class="contentBox">
    <el-row :gutter="20">
      <el-col :xs="11" :sm="10" :md="9" :lg="6" :xl="6">
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
      <el-col :xs="13" :sm="14" :md="15" :lg="18" :xl="18"></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <staff-form :curNode="curNode" :staffAddVisible="staffAddVisible" style="width: 100%" />
    </el-row>
  </div>
</template>

<script>
import staffForm from "./Edit";

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
    staffForm
  }
};
</script>
