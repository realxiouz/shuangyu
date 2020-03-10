<template>
  <div>
    <el-form ref="formData" :rules="formRules" :model="formData" label-width="120px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formData.roleName"  placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="formData.enable"></el-switch>
      </el-form-item>
      <el-scrollbar style="height:80%">
        <el-form-item label="选择菜单" required>
          <el-tree
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current>
          </el-tree>
        </el-form-item>
      </el-scrollbar>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
  function defaultData() {
    return {
      roleId: "",
      roleName: "",
      enable: true,
      navIds: []
    };
  };
  export default {
    name: "roleEdit",
    props: ["roleId"],
    data() {
      return {
        formData: defaultData(),
        treeData: [],
        formRules: {
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" }
          ]
        }
      };
    },
    methods: {
      initTreeData: function() {
        this.$store
          .dispatch("role/getNavsTreeData")
          .then(data => {
            this.treeData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadRole() {
        if ('' != this.roleId&&null!=this.roleId) {
          this.$store
            .dispatch("role/getOne", this.roleId)
            .then(data => {
              this.formData = data;
              this.$nextTick(() => {
                this.$refs.tree.setCheckedKeys(data.navIds);
              });
            })
            .catch(error => {
              console.log(error);
            });
          this.dialogVisible = true;
        }
      },
      handleSave() {
        this.$refs["formData"].validate((valid) => {
          if (valid) {
            var navIds = [];
            this.$refs.tree.getCheckedKeys().forEach(node => {
                if (node) {
                  navIds.push(node);
                }
              }
            );
            this.formData.navIds = navIds;
            this.$emit("onSave", this.formData);
          }
        });
      }
    },
    mounted() {
      this.initTreeData();
      this.loadRole();
    }
  };
</script>

<style scoped>

</style>
