<template>
  <div class="page-form">
    <el-dialog :title="keyId && !pid ? '修改账号管理' : '添加账号管理'"  width="24%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="账号类别:">
          <el-select v-model="formData.category" style="width: 100%;">
            <el-option label="现金" :value="0"></el-option>
            <el-option label="银行存款" :value="1"></el-option>
            <el-option label="积分" :value="2"></el-option>
            <el-option label="优惠券" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号编码:" prop="accountCode">
          <el-input
            v-model="formData.accountCode"
            placeholder="请输入账号编码..."
            :disabled="codeEnable"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="formData.category !== 1" label="账号名称:" prop="accountName">
          <el-input v-model="formData.accountName" placeholder="请输入账号名称.."></el-input>
        </el-form-item>
        <el-form-item v-if="formData.category === 1" label="账号名称:" prop="accountName">
          <el-input v-model="formData.accountName" placeholder="示例：中国工商银行昆明官渡支行"></el-input>
        </el-form-item>
        <el-form-item v-if="formData.category === 1" label="银行账号:">
          <el-input v-model="formData.bankAccount" placeholder="请输入完整的银行账号"></el-input>
        </el-form-item>
        <el-form-item label="供应商:">
          <el-select
            style="width: 100%;"
            v-model="formData.supplierId"
            placeholder="请选择供应商..."
            filterable
            @change="handleSupplier"
          >
            <el-option
              v-for="item in firmList"
              :key="item.firm.firmId"
              :label="item.firm.firmName"
              :value="item.firm.firmId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="币种:">
          <el-select v-model="formData.currencyId" style="width: 100%;" placeholder="请选择币种..">
            <el-option
              v-for="(item, idx) in currencyList"
              :key="idx"
              :label="item.currencyName"
              :value="item.currencyId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="2 === formData.category" label="积分有效期:">
          <el-date-picker v-model="formData.expire" style="width:100%" type="date" placeholder="选择日期"></el-date-picker>
          <span style="color: #ff8aac;">有效期至选择日期零点(00:00:00)</span>
        </el-form-item>
        <el-form-item v-if="2 === formData.category" label="积分兑换比例:">
          <el-input v-model="formData.pointRate" placeholder="请输入积分兑换比例.."></el-input>
        </el-form-item>
        <el-form-item v-if="2 === formData.category" label="金额">
          <el-input v-model="formData.amount" placeholder="请输入金额.."></el-input>
        </el-form-item>
        <el-form-item v-if="3 === formData.category" label="优惠券有效期:">
          <el-date-picker v-model="formData.expire" style="width:100%" type="date" placeholder="选择日期"></el-date-picker>
          <span style="color: #ff8aac;">有效期至选择日期零点(00:00:00)</span>
        </el-form-item>
        <el-form-item label="初始余额:">
          <el-input v-model="formData.initBalance" placeholder="请输入初始余额.."></el-input>
        </el-form-item>
        <el-form-item label="余额:">
          <el-input v-model="formData.balance" placeholder="请输入余额.."></el-input>
        </el-form-item>
        <el-form-item label="科目名称:">
          <el-cascader
            v-model="formData.subjectId"
            style="width: 100%;"
            placeholder="请选择科目名称.."
            :options="subjectTree"
            :props="{ label: 'subjectName', value: 'subjectId' }"
            filterable
            @change="handleSubject"
          ></el-cascader>
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
  export default {
    mixins: [MIXIN_EDIT],
    data() {
      const codeValidator = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入字母或数字！"));
        }
      };
      return {
        dialogVisible: false,
        firmList: [],
        currencyList: [],
        subjectList: [],
        subjectTree: [],
        codeEnable: false,
        actions: {
          getOne: 'fundAccount/getOne',
          saveOne: 'fundAccount/saveOne'
        },
        rules: {
          accountCode: [
            {required: true, message: "请输入账户编码"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          accountName: [
            {required: true, message: "请输入账户名称"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            }
          ]
        }
      };
    },
    watch: {
      visible(val) {
        if (val) {
          this.loadSupplier();
          this.loadCurrency();
          this.loadSubject();
          this.loadSubjectTree();
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
          accountId: null,
          accountCode: null,
          accountName: null,
          bankAccount: null,
          initBalance: 0,
          balance: 0,
          category: 0,
          expire: null,
          pointRate: null,
          currencyId: null,
          currencyName: null,
          amount: null,
          subjectId: null,
          subjectName: null,
          supplierId: null,
          supplierName: null
        };
      },
      loadSupplier() {
        let that = this;
        that.$store
          .dispatch("firm/getSupplierList", { filter: {} })
          .then(data => {
            this.firmList = data;
          })
          .catch(error => {
            console.log(error);
          });
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
      getTreeData(data) {
        // 循环遍历json数据
        for (let i = 0; i < data.length; i++) {
          if (data[i].children.length < 1) {
            // children若为空数组，则将children设为undefined
            data[i].children = undefined;
          } else {
            // children若不为空数组，则继续 递归调用 本方法
            this.getTreeData(data[i].children);
          }
        }
        return data;
      },
      handleSupplier(supplierId) {
        let that = this;
        if (supplierId) {
          that.firmList.forEach(function(obj){
            if(supplierId === obj.firm.firmId){
              that.formData.supplierId = obj.firm.firmId;
              that.formData.supplierName =obj.firm.firmName;
            }
          });
        }
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
</style>
