<template>
  <div>
    <el-form ref="form" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.firmId" />
      <el-form-item label="企业名称:">
        <el-input type="text" placeholder="请输入企业名称" v-model="formData.firmName"></el-input>
      </el-form-item>
      <el-form-item label="企业代码:">
        <el-input type="text" placeholder="请输入企业代码" v-model="formData.firmCode"></el-input>
      </el-form-item>
      <el-form-item label="机构所在地:">
        <el-input type="text" placeholder="请输入机构所在地" v-model="formData.location"></el-input>
      </el-form-item>
      <el-form-item label="类别:">
        <el-input type="text" placeholder="请输入类别" v-model="formData.type"></el-input>
      </el-form-item>
    </el-form>
    <el-transfer v-model="formData.roles" :data="transData" :props="transferProps"></el-transfer>
    <div slot="footer" class="dialog-footer" style="margin-top:10px;text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="$emit('onSave',formData)">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  /*当前进行操作的企业节点*/
  props: ["curNode"],
  data() {
    return {
      /*所有的可操作的角色信息*/
      transData: [],
      formData: {},
      transferProps: {
        key: "roleId",
        label: "roleName"
      }
    };
  },
  methods: {
    defaultFormData() {
      return {
        firmId: "",
        firmName: "",
        firmCode: "",
        location: "",
        type: null,
        roles: []
      };
    },
    /*加载所有的角色信息*/
    loadRoles() {
      this.clearRoles();
      this.$store
        .dispatch("role/getAll", {})
        .then(data => {
          this.transData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*清除穿梭框内的数据*/
    clearRoles() {
      this.transData = [];
    },
    clearForm() {
      this.formData = this.defaultFormData();
    },
    /*初始化表单*/
    initFormData() {
      if (this.curNode.firmName) {
        this.formData = this.curNode;
      } else {
        this.clearForm();
      }
      this.loadRoles();
    }
  },
  watch: {
    curNode() {
      this.initFormData();
    }
  },
  created() {
    this.initFormData();
  }
};
</script>
