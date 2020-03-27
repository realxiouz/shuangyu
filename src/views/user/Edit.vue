<template>
  <div>
    <el-steps :space="200" :active="stepIndex" finish-status="success" simple style="background:#fff;">
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="角色管理"></el-step>
    </el-steps>
    <el-form v-show="stepIndex===0" ref="form" size="mini" :model="formData" label-width="110px">
      <input type="hidden" v-model="formData.userId"/>
      <el-form-item label="昵称">
        <el-input v-model="formData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formData.fullName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formData.gender" placeholder="请选择性别" style="width:100%">
          <el-option label="男" :value=0></el-option>
          <el-option label="女" :value=1></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.birthDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input
          placeholder="请输入手机号码"
          v-model="formData.phone"
          maxlength="11"
          show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input
          type="text"
          placeholder="请输入身份证号码"
          v-model="formData.idCardNo"
          maxlength="18"
          show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="是否超级管理员">
        <el-switch v-model="formData.super" :active-value=true :inactive-value=false></el-switch>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="formData.enable" :active-value=true :inactive-value=false></el-switch>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formData.comment"></el-input>
      </el-form-item>
    </el-form>
    <el-transfer v-show="stepIndex>0"
       v-model="formData.roles" 
       :data="transData" 
       :props="transferProps" 
       :titles="['未分配角色列表', '已分配角色列表']"
       style="margin-top: 20px">
    </el-transfer>
    <div style="margin-top: 25px;text-align: right;" >
      <el-button  size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button v-if="stepIndex===0" size="mini" type="primary" @click="nextStep">下一步</el-button>
      <el-button v-if="stepIndex>0" size="mini" type="primary" @click="prevStep">上一步</el-button>
      <el-button v-if="stepIndex===1" size="mini" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import selectRoles from "../../components/SelectRoles.vue";

  export default {
    name: "userEdit",
    props: ["userId"],
    comments: {selectRoles},
    data() {
      return {
        stepIndex: 0,
        formData: {},
        /*所有的可操作的角色信息*/
        transData: [],
        transferProps: {
          key: 'roleId',
          label: 'roleName'
        },
        /*formRules: {
          nickName: [
            { required: true, message: "请输入昵称", trigger: "blur" }
          ],
          fullName: [
            { required: true, message: "请输入姓名", trigger: "blur" }
          ],
          idCardNo: [
            { required: true, message: "请输入身份证号码", trigger: "blur" }
          ],
          phone: [
            { required: true, message: "请输入手机号码", trigger: "blur" }
          ]
        }*/
      };
    },
    methods: {
      prevStep() {
        if (this.stepIndex-- === 0) this.stepIndex = 0;
      },
      nextStep() {
        if (this.stepIndex++ > 1) this.stepIndex = 0;
      },
      /*表单默认加载数据*/
      defaultFormData() {
        return {
          userId: "",
          nickName: "",
          fullName: "",
          gender: 0,
          birthDate: '',
          phone: "",
          email: "",
          idCardNo: "",
          super: false,
          enable: true
        };
      },
      handleConfirm(){
        if ('number' != typeof this.formData.birthDate){
          this.formData.birthDate = this.formData.birthDate.getTime();
        }
        this.$emit('onSave',this.formData)
      },
      /*清除表单*/
      clearForm() {
        this.formData = this.defaultFormData();
      },
      clearRoles() {
        this.transData = [];
      },
      /*根据用户ID查询用户信息*/
      loadUser() {
        if ("" != this.userId) {
          this.$store
            .dispatch("user/getOne", {userId: this.userId})
            .then(data => {
              this.formData = data.data;
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      /*加载所有的角色信息*/
      loadRoles() {
        this.clearRoles();
        this.$store
          .dispatch('role/getAll',{})
          .then(data => {
            this.transData = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    created() {
      this.clearForm();
      this.loadUser();
      this.loadRoles();
    }
  };
</script>
