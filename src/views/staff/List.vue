<template>
  <div class="page">
    <el-row class="page-search" :gutter="20">
      <el-col :xs="11" :sm="10" :md="9" :lg="8" :xl="8">
        <el-row style="margin-bottom:20px;">
          <!-- <span
            style="font-weight:700;color:#303133;"
            v-if="this.$store.getters.firm"
          >{{this.$store.getters.firm.firmName}}</span> -->
        </el-row>

        <el-tree
          v-loading="loading"
          node-key="deptId"
          :data="treeData"
          :props="treeProps"
          :default-expanded-keys="defaultExpandedKeys"
          :highlight-current="true"
          :expand-on-click-node="false"
          default-expand-all
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
      <el-col :xs="13" :sm="14" :md="15" :lg="16" :xl="16">
        <edit :cur-node="curNode" :staffAddVisible="staffAddVisible" style="width: 100%"/>
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
                firm:'',
                treeData: [],
                defaultExpandedKeys: [],
                treeProps: {
                    label: "deptName",
                    children: "children"
                }
            };
        },
        methods: {
            /*获取部门树*/
            loadTreeData() {
                this.$store
                    .dispatch("dept/getTreeList", {
                        filters: {}
                    })
                    .then(data => {
                        this.defaultExpandedKeys = [];
                        if (data) {
                            this.treeData = data;
                            this.defaultExpandedKeys.push(data[0].deptId);
                            this.curNode = data[0];
                        }
                        this.loading = false;
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
        created() {
            this.loadTreeData();
        },
        components: {
            edit
        }
    };
</script>
