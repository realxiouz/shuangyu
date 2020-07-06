<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="账号类别:">
        <el-select v-model="formData.category" style="width: 100%;" @change="selectedCategory">
          <el-option label="现金" :value="0"></el-option>
          <el-option label="银行存款" :value="1"></el-option>
          <el-option label="积分" :value="2"></el-option>
          <el-option label="优惠券" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号编码:" prop="accountCode">
        <el-input v-model="formData.accountCode" placeholder="请输入账号编码.."></el-input>
      </el-form-item>
      <el-form-item v-if="!bankAccountShowAble" label="账号名称:" prop="accountName">
        <el-input v-model="formData.accountName" placeholder="请输入账号名称.."></el-input>
      </el-form-item>
      <el-form-item v-if="bankAccountShowAble" label="账号名称:" prop="accountName">
        <el-input v-model="formData.accountName" placeholder="示例：中国工商银行昆明官渡支行"></el-input>
      </el-form-item>
      <el-form-item v-if="bankAccountShowAble" label="银行账号:">
        <el-input v-model="formData.bankAccount" placeholder="请输入完整的银行账号"></el-input>
      </el-form-item>
      <el-form-item label="供应商:">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="handleFirm"
          placeholder="请输入关键字选择供应商"
          @select="handleSelect"
        >
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
          ></i>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="币种:">
        <el-select v-model="formData.currencyId" style="width: 100%;" placeholder="请选择币种..">
          <el-option
            v-for="(item,idx) in currencyList"
            :key="idx"
            :label="item.name"
            :value="item.currencyId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="2 === formData.category" label="积分有效期:">
        <el-date-picker v-model="formData.expire" style="width:100%" type="date" placeholder="选择日期"></el-date-picker>
        <span style="color: #ff8aac;">有效期至选择日期零点(00:00:00)</span>
      </el-form-item>
      <el-form-item v-if="3 === formData.category" label="优惠券有效期:">
        <el-date-picker v-model="formData.expire" style="width:100%" type="date" placeholder="选择日期"></el-date-picker>
        <span style="color: #ff8aac;">有效期至选择日期零点(00:00:00)</span>
      </el-form-item>
      <el-form-item v-if="pointRateShowAble" label="积分兑换比例:">
        <el-input v-model="formData.pointRate" placeholder="请输入积分兑换比例.."></el-input>
      </el-form-item>
      <el-form-item v-if="amountShowAble" label="金额">
        <el-input v-model="formData.amount" placeholder="请输入金额.."></el-input>
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
          placeholder="可通过科目名称搜索.."
          :options="subjectList"
          :props="{ label: 'name', value: 'subjectId'}"
          filterable
          @change="handleSubject"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
  function defaultData() {
    return {
      accountId: null,
      accountCode: null,
      accountName: null,
      bankAccount: null,
      initBalance: 0,
      balance: 0,
      category: 0,
      otherId: null,
      expire: null,
      pointRate: null,
      currencyId: null,
      amount: null,
      subjectId: null
    };
  }

  export default {
    name: "fundAccountEdit",
    props: ['editAccountId', 'pid', 'codeEnabled'],
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
        formData: defaultData(),
        state: null,
        firmList: [],
        currencyList: [],
        subjectList: [],
        bankAccountShowAble: false,
        expireShowAble: false,
        pointRateShowAble: false,
        amountShowAble: false,
        newDialogVisible: false,
        rules: {
          accountCode: [
            {required: true, message: "请输入账户编码", trigger: "blur"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          accountName: [
            {required: true, message: "请输入账户名称", trigger: "blur"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            }
          ]
        }
      };
    },
    methods: {
      selectedCategory(category) {
        switch (category) {
          case 0:
            this.bankAccountShowAble = false;
            this.expireShowAble = false;
            this.pointRateShowAble = false;
            this.amountShowAble = false;
            break;
          case 1:
            this.bankAccountShowAble = true;
            this.expireShowAble = false;
            this.pointRateShowAble = false;
            this.amountShowAble = false;
            break;
          case 2:
            this.bankAccountShowAble = false;
            this.expireShowAble = true;
            this.pointRateShowAble = true;
            this.amountShowAble = true;
            break;
          case 3:
            this.bankAccountShowAble = false;
            this.expireShowAble = true;
            this.pointRateShowAble = false;
            this.amountShowAble = false;
            break;
          default:
            this.bankAccountShowAble = false;
            this.expireShowAble = false;
            this.pointRateShowAble = false;
            this.amountShowAble = false;
            break;
        }
      },
      loadSupplier(params) {
        let that = this;
        that.$store
          .dispatch("firm/getSupplierList", { filter: params })
          .then(data => {
            if(data && data.length > 0){
              that.firmList = [];
              data.forEach(function(obj){
                if(obj.firm){
                  that.firmList.push({
                    value: obj.firm.firmName,
                    id: obj.firm.firmId
                  });
                }
              });
            }
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
          .dispatch("accountSubject/getTreeList", { filter: {} })
          .then(data => {
            this.subjectList = this.getTreeData(data);
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
      handleFirm(queryString, cb){
        let firms = [];
        if(queryString && queryString.length > 1){
          this.loadSupplier({firmName: queryString});
          firms = this.firmList;
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(firms);
        }, 1000);
      },
      handleSelect(item) {
        if(item && item.id){
          this.formData.otherId = item.id;
        }
      },
      handleSubject(subjectIdList) {
        if (subjectIdList) {
          this.formData.subjectId = subjectIdList[subjectIdList.length - 1];
        }
      },
      handleGetOne(accountId) {
        if (accountId) {
          this.$store
            .dispatch("fundAccount/getOne", {accountId: accountId})
            .then(data => {
              this.formData = data;
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.formData = defaultData();
        }
      },
      handleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.formData.accountCode = this.formData.accountCode.toUpperCase();
            this.$emit("onSave", this.formData);
          }
        });
      }
    },
    created() {
      if (this.editAccountId) {
        this.handleGetOne(this.editAccountId);
      }
      if (this.pid) {
        this.formData.pid = this.pid;
      }
      this.loadCurrency();
      this.loadSubject();
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
