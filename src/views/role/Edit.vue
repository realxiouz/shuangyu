<template>
  <div>
    <el-form ref="form" :model="formData" label-width="110px" size="mini" :rules="formRules">
      <el-form-item label="角色名称:" prop="roleName">
        <el-input v-model="formData.roleName" placeholder="请输入你要添加的角色名称"></el-input>
      </el-form-item>
      <el-form-item label="选择菜单:">
        <el-tree
          v-loading="loading"
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="navId"
          highlight-current
          :default-checked-keys="formData.navs"
          @check="getCheckedKeys"
          :props="{label:'title'}"
        ></el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handeleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "roleEdit",
  props: ["roleId"],
  data() {
    return {
      formData: {},
      loading: true,
      treeData: [],
      formRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handeleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("onSave", this.formData);
        }
      });
    },
    getCheckedKeys(nodes, selection) {
      let tmpList = [];
      selection.checkedNodes.forEach(item => {
        if (!item.hasChildren) {
          tmpList.push(item.navId);
        }
      });
      this.formData.navs = tmpList;
    },
    defaultFormData() {
      return {
        roleId: "",
        roleName: "",
        enable: true,
        navs: []
      };
    },
    clearForm() {
      this.formData = this.defaultFormData();
    },
    initTreeData: function() {
      this.$store
        .dispatch("nav/getTreeList", { filter: {} })
        .then(data => {
          this.treeData = data;
          this.loading = false;
        })
        .catch(error => {
            this.loading = false;
          console.log(error);
        });
    },
    loadRoleById(roleId) {
        this.$store
        .dispatch("role/getOne", { id: roleId })
        .then(data => {
          this.formData = data;
          console.log(data)
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogVisible = true;
    }
  },
  created() {
    this.clearForm();
    this.initTreeData();
    if (this.roleId) {
      this.loadRoleById(this.roleId);
    }
  }
};
</script>
