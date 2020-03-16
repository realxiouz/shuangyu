<template>
  <div>
    <el-form :model="formData" label-width="120px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formData.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="formData.enable" @change="changeSwitch"></el-switch>
      </el-form-item>
      <el-form-item label="选择菜单">
        <el-tree
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="navId"
          highlight-current
          :default-checked-keys="formData.navs"
          @check="getCheckedKeys"
          :props="{label:'navName'}">
        </el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="$emit('onSave',formData)">确 定</el-button>
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
        treeData: [],
        /*formRules: {
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" }
          ]
        }*/
      };
    },
    methods: {
      getCheckedKeys(data, selection) {
        this.formData.navs = selection.checkedKeys;
      },
      defaultFormData() {
        return {
          roleId: '',
          roleName: '',
          enable: true,
          navs: []
        }
      },
      clearForm() {
        this.formData = this.defaultFormData();
      },
      initTreeData: function () {
        this.$store
          .dispatch("nav/getList", {filter: {}})
          .then(data => {
            this.treeData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadRoleByID(roleID) {
        this.$store
          .dispatch("role/getOne", {roleID: roleID})
          .then(data => {
            this.formData = data;
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = true;
      },
      changeSwitch() {
        this.formData.enable = this.formData.enable ? true : false;
      }
    },
    created() {
      this.clearForm();
      this.initTreeData();
      if ('' != this.roleId) {
        this.loadRoleByID(this.roleId);
      }
    }
  };
</script>
