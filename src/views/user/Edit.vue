<template>
  <div class="page-form">
    <el-dialog :title="keyId!=''?'编辑':'添加'" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form size="mini" :model="formData" :rules="formRules">
        <input type="hidden" v-model="formData.userId"/>
        <el-form-item label="昵称" prop="nickName">
          <el-input placeholder="请输入您的昵称" v-model="formData.nickName"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input placeholder="请输入您的姓名" v-model="formData.fullName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formData.gender" placeholder="请选择性别" style="width:100%">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formData.birthDate"
            style="width: 100%;"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item v-if="!this.keyId" label="邮箱" prop="email">
          <el-input placeholder="请输入您的邮箱" clearable v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select
            style="width: 100%;"
            clearable
            multiple
            v-model="formData.roles"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roleData"
              :key="item.roleName"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formData.remark"></el-input>
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
    data() {
      var validateEmail = (rule, value, callback) => {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的邮箱！"));
        } else {
          this.$store
            .dispatch("user/isExist", {
              filed: this.formData.email
            })
            .then(data => {
              if (data) {
                callback("该信息已被注册");
              } else {
                callback();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      };

      return {
        roleData: [],
        formRules: {
          nickName: {required: true, message: "请输入昵称", trigger: "blur"},
          email: [
            {required: true, message: "请输入邮箱", trigger: "blur"},
            {validator: validateEmail, trigger: "blur"}
          ]
        },
        actions: {
          getOne: 'user/getOne',
          saveOne: 'user/saveOne'
        }
      };
    },
    methods: {
      defaultFormData() {
        return {
          userId: "",
          nickName: "",
          fullName: "",
          gender: 0,
          birthDate: "",
          email: "",
          remark: '',
          roles:[]
        };
      },
      loadRoles() {
        this.$store
          .dispatch("role/getList", {})
          .then(data => {
            this.roleData = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    created() {
      this.loadRoles();
    }
  };
</script>
