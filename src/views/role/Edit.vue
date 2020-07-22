<template>
  <div class="page-form">
    <el-dialog :title="keyId!=''?'编辑角色信息':'添加新角色'" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" :model="formData" label-width="110px" size="mini" :rules="formRules">
        <el-form-item label="角色名称:" prop="roleName">
          <el-input v-model="formData.roleName" placeholder="请输入你要添加的角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-select v-model="formData.roleType" placeholder="请选择角色类型" style="width: 50%">
            <el-option label="默认角色" :value="-1"></el-option>
            <el-option label="平台角色" :value="0"></el-option>
            <el-option label="企业角色" :value="1"></el-option>
          </el-select>
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
            node-key="menuId"
            ref="tree"
            highlight-current
            :default-checked-keys="formData.menus"
            :props="{label:'title'}"
          ></el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {MIXIN_EDIT} from "@/utils/mixin";

  export default {
    mixins: [MIXIN_EDIT],
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
        },
        actions: {
          getOne: 'role/getOne',
          saveOne: 'role/saveOne'
        }
      };
    },
    methods: {
      defaultFormData() {
        return {
          roleId: "",
          roleName: "",
          roleType: "",
          enable: true,
          menus: [],

        };
      },
      clearForm() {
        this.formData = this.defaultFormData();
      },
      loadNavs: function () {
        this.$store
          .dispatch("menu/getTreeList", {filter: {}})
          .then(data => {
            this.treeData = data;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      beforeSave(data) {
        data.menus = this.$refs.tree.getCheckedKeys();
        return data;
      },
    },
    created() {
      this.clearForm();
      if (this.roleId) {
        this.loadData(this.roleId);
      } else {
        this.loadNavs();
      }
    }
  };
</script>
