<template>
  <div class="page-form">
    <el-dialog :title="keyId && !pid ? '修改账号管理' : '添加账号管理'"  width="24%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="账号类别:" prop="category">
          <el-select v-model="formData.category" style="width: 100%;" placeholder="请选择账号类别" @change="handleCurrency">
            <el-option
              v-for="(item, idx) in categoryList"
              :key="idx"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号编码:" prop="accountCode">
          <el-input
            v-model="formData.accountCode"
            placeholder="请输入账号编码"
            :disabled="codeEnable"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号名称:" prop="accountName" v-if="formData.category !== 1">
          <el-input v-model="formData.accountName" placeholder="请输入账号名称"></el-input>
        </el-form-item>
        <el-form-item label="账号名称:" prop="accountName" v-if="formData.category === 1">
          <el-input v-model="formData.accountName" placeholder="示例：中国工商银行昆明官渡支行"></el-input>
        </el-form-item>
        <el-form-item label="科目名称:" prop="subjectId">
          <el-cascader
            v-model="formData.subjectId"
            style="width: 100%;"
            placeholder="请选择科目名称"
            :options="subjectTree"
            :props="{ label: 'subjectName', value: 'subjectId' }"
            filterable
            @change="handleSubject"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="银行账号:" v-if="formData.category === 1">
          <el-input v-model="formData.bankAccount" placeholder="请输入完整的银行账号"></el-input>
        </el-form-item>
        <el-form-item label="币种:">
          <el-select v-model="formData.currencyId" style="width: 100%;" placeholder="请选择币种" @change="handleCurrency">
            <el-option
              v-for="(item, idx) in currencyList"
              :key="idx"
              :label="item.currencyName"
              :value="item.currencyId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="积分有效期:" v-if="formData.category === 6">
          <el-date-picker v-model="formData.expire" style="width:100%" type="date" placeholder="选择日期"></el-date-picker>
          <span style="color: #ff8aac;">有效期至选择日期零点(00:00:00)</span>
        </el-form-item>
        <el-form-item label="积分兑换比例:" v-if="formData.category === 6">
          <el-input v-model="formData.pointRate" placeholder="请输入积分兑换比例"></el-input>
        </el-form-item>
        <el-form-item label="积分金额:" v-if="formData.category === 6">
          <el-input v-model="formData.amount" placeholder="请输入积分金额"></el-input>
        </el-form-item>
        <el-form-item label="优惠券有效期:" v-if="formData.category === 7">
          <el-date-picker v-model="formData.expire" style="width:100%" type="date" placeholder="请输入优惠券有效期"></el-date-picker>
          <span style="color: #ff8aac;">有效期至选择日期零点(00:00:00)</span>
        </el-form-item>
        <el-form-item label="初始余额:">
          <el-input v-model="formData.initBalance" placeholder="请输入初始余额"></el-input>
        </el-form-item>
        <el-form-item label="余额:">
          <el-input v-model="formData.balance" placeholder="请输入余额"></el-input>
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
  import {CATEGORY_MAP} from '@/utils/const'

  export default {
    mixins: [MIXIN_EDIT],
    props: {
      pid: {
        type: String,
        default: ''
      }
    },
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
        categoryList: CATEGORY_MAP,
        subjectList: [],
        subjectTree: [],
        currencyList: [],
        codeEnable: false,
        actions: {
          getOne: 'fundAccount/getOne',
          saveOne: 'fundAccount/saveOne'
        },
        rules: {
          category: [
            {required: true, message: "请选择账号类别"}
          ],
          accountCode: [
            {required: true, message: "请输入账号编码"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          accountName: [
            {required: true, message: "请输入账号名称"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            }
          ],
          subjectId: [
            {required: true, message: "请选择科目名称"}
          ]
        }
      };
    },
    watch: {
      visible(val) {
        if (val) {
          this.loadSubject();
          this.loadSubjectTree();
          this.loadCurrency();
          this.codeEnable = false;
          if(this.keyId && !this.pid){
            this.codeEnable = true;
          }
        }
      }
    },
    methods: {
      defaultFormData() {
        return {
          category: null,
          accountId: null,
          accountCode: null,
          accountName: null,
          bankAccount: null,
          currencyId: null,
          currencyName: null,
          subjectId: null,
          subjectName: null,
          expire: null,
          initBalance: 0,
          balance: 0
        };
      },
      loadSubject() {
        this.$store
          .dispatch("accountSubject/getList", { filter: {} })
          .then(data => {
            this.subjectList = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadSubjectTree() {
        this.$store
          .dispatch("accountSubject/getTreeList", { filter: {} })
          .then(data => {
            this.subjectTree = this.getTreeData(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSubject(subjectIdList) {
        let that = this;
        if (subjectIdList) {
          let id = subjectIdList[subjectIdList.length - 1];
          that.subjectList.forEach(function(obj){
            if(id === obj.subjectId){
              that.formData.subjectId = obj.subjectId;
              that.formData.subjectName = obj.subjectName;
            }
          });
        }
      },
      loadCurrency() {
        this.$store
          .dispatch("currency/getList", { filter: {} })
          .then(data => {
            this.currencyList = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleCurrency(currencyId){
        let that = this;
        if(currencyId){
          that.currencyList.forEach(function(obj){
            if(currencyId === obj.currencyId){
              that.formData.currencyId = obj.currencyId;
              that.formData.currencyName = obj.currencyName;
            }
          });
        }
      },
      getTreeData(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].children.length < 1) {
            data[i].children = undefined;
          } else {
            this.getTreeData(data[i].children);
          }
        }
        return data;
      },
      beforeSave(data){
        if (this.pid) {
          data.pid = this.pid;
        }
        return data;
      }
    }
  };
</script>

<style>
  .el-autocomplete-suggestion__list{
    margin: 0 0 18px 0;
    padding: 0;
  }
  .el-cascader-menu__list{
    margin: 0 0 20px 0;
    padding: 0;
  }
  .el-cascader__suggestion-list{
    margin: 0 0 16px 0;
    padding: 0;
  }
  .el-cascader-panel{
    height: 300px;
    overflow-y: scroll;
  }
</style>
