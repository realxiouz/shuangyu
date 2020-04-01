<template>
  <div class="contentBox">
    <el-row :gutter="20">
      <el-col :xs="11" :sm="10" :md="9" :lg="8" :xl="8">
        <el-tree
          v-loading="loading"
          :data="treeData"
          :props="treeProps"
          :highlight-current="true"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
      <el-col :xs="13" :sm="14" :md="15" :lg="16" :xl="16">
        <staff-form
          :tableLoading="tableLoading"
          :curNode="curNode"
          :staffAddVisible="staffAddVisible"
          style="width: 100%"
        />
      </el-col>
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
      tableLoading: false,
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
        .dispatch("dept/getList", { filters: {} })
        .then(data => {
          if (data) {
            this.treeData = data;
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleNodeClick(data) {
      this.staffAddVisible = false;
      this.curNode = data;
      this.tableLoading = true;
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
