<template>
  <div>
    <el-form ref="form" :model="formData" label-width="110px" size="mini" :rules="formRules">
      <el-form-item label="角色名称:" prop="roleName">
        <el-input v-model="formData.roleName" placeholder="请输入你要添加的角色名称"></el-input>
      </el-form-item>

      <el-form-item label="备注:" prop="remark">
        <el-input v-model="formData.remark" placeholder="备注" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="选择菜单:">
        <el-tree
          v-loading="loading"
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="navId"
          ref="tree"
          highlight-current
          :default-checked-keys="formData.navs"
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
        formData: {
          remark: ""
        },
        loading: true,
        treeData: [],
        formRules: {
          roleName: [
            {required: true, message: "请输入角色名称", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      handeleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.formData.navs = this.$refs.tree.getCheckedKeys();
            this.$emit("onSave", this.formData);
          }
        });
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
      loadNavs: function () {
        this.$store
          .dispatch("nav/getTreeList", {filter: {}})
          .then(data => {
            this.treeData = data;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      loadData(roleId) {
        this.$store
          .dispatch("role/getOne", {id: roleId})
          .then(data => {
            this.formData = data;
            this.loadNavs();
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisible = true;
      }
    },
    created() {
      this.clearForm();
      if (this.roleId) {
        this.loadData(this.roleId);
      }
    }
  };
</script>
