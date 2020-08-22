<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改账户管理' : '添加账户管理'"  width="24%" align="center"  :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="会员名称：" prop="memberId">
          <el-select
            style="width: 100%;"
            v-model="formData.memberId"
            placeholder="请选择会员名称..."
            filterable
            clearable
            @change="handleMember"
          >
            <el-option
              v-for="item in memberList"
              :key="item.memberId"
              :label="item.memberName"
              :value="item.memberId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户编号：" prop="accountNo">
          <el-input v-model="formData.accountNo" placeholder="请输入账户编号..."></el-input>
        </el-form-item>
        <el-form-item label="账户类型：" prop="accountType">
          <el-select
            style="width: 100%;"
            v-model="formData.accountType"
            placeholder="请选择账户类型..."
            filterable
            clearable
          >
            <el-option
              v-for="item in accountTypeList"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户状态：" prop="status">
          <el-select
            style="width: 100%;"
            v-model="formData.status"
            placeholder="请选择账户状态..."
            filterable
            clearable
          >
            <el-option
              v-for="item in accountStatusList"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户余额：" prop="balance">
          <el-input-number v-model="formData.balance" placeholder="请输入账户余额" :min="0" :step="1" :precision="2" style="width: 100%;" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {MIXIN_EDIT} from "@/utils/mixin";
  import { MEMBER_TYPES, MEMBER_STATUS } from '@/utils/const'
  export default {
    mixins: [MIXIN_EDIT],
    data() {
      const codeValidator = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z_]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入字母或数字！"));
        }
      };
      return {
        dialogVisible: false,
        accountTypeList: MEMBER_TYPES,
        accountStatusList: MEMBER_STATUS,
        memberList: [],
        codeEnable: false,
        actions: {
          getOne: 'memberAccount/getOne',
          saveOne: 'memberAccount/saveOne'
        },
        rules: {
          memberId: [
            {required: true, message: "请选择会员名称"}
          ],
          accountNo: [
            {required: true, message: "请输入账户编号"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          accountType: [
            {required: true, message: "请选择账户类型"}
          ],
          status: [
            {required: true, message: "请选择账户状态"}
          ]
        }
      };
    },
    watch: {
      visible(val) {
        if (val) {
          this.codeEnable = false;
          if(this.keyId){
            this.codeEnable = true;
          }
          this.getMemberList();
        }
      }
    },
    methods: {
      getMemberList(){
        this.$store
          .dispatch("member/getList", {})
          .then(data => {
            if(data && data.length > 0){
              this.memberList = data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleMember(val){
        let that = this;
        that.memberList.forEach(function(obj){
          if(val === obj.memberId){
            that.formData.memberNo = obj.memberNo;
          }
        });
      },
      defaultFormData() {
        return {
          accountId: null,
          memberId: null,
          memberNo: null,
          accountNo: null,
          accountType: null,
          status: null,
          balance: null
        };
      }
    }
  };
</script>

<style>
  .el-dialog__body{
    padding-top: 0;
  }
</style>
