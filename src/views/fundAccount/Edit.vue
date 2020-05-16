<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.accountId" />
      <el-form-item label="账号类别:">
        <el-select v-model="formData.category" style="width: 100%;" @change="selectedCategory">
          <el-option label="现金" :value="0"></el-option>
          <el-option label="银行存款" :value="1"></el-option>
          <el-option label="积分" :value="2"></el-option>
          <el-option label="优惠券" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商:">
        <el-select v-model="formData.otherId" style="width: 100%;" placeholder="请选择供应商..">
          <el-option label="现金" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号编码:">
        <el-input v-model="formData.accountCode" placeholder="请输入账号编码.."></el-input>
      </el-form-item>
      <el-form-item v-if="!bankAccountShowAble" label="账号名称:">
        <el-input v-model="formData.accountName" placeholder="请输入账号名称.."></el-input>
      </el-form-item>
      <el-form-item v-if="bankAccountShowAble" label="账号名称:">
        <el-input v-model="formData.accountName" placeholder="示例：中国工商银行昆明官渡支行"></el-input>
      </el-form-item>
      <el-form-item v-if="bankAccountShowAble" label="银行账号:">
        <el-input v-model="formData.bankAccount" placeholder="请输入完整的银行账号"></el-input>
      </el-form-item>
      <el-form-item label="币种:">
        <el-select v-model="formData.currency" style="width: 100%;" placeholder="请选择币种..">
          <el-option
            v-for="(item,idx) in currencyList"
            :key="idx"
            :label="item.name"
            :value="item.code"
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
        <el-input v-model="formData.amount" placeholder="请输入积分兑换比例.."></el-input>
      </el-form-item>
      <el-form-item label="初始余额:">
        <el-input v-model="formData.initBalance" placeholder="请输入初始余额.."></el-input>
      </el-form-item>
      <el-form-item label="余额:">
        <el-input v-model="formData.balance" placeholder="请输入余额.."></el-input>
      </el-form-item>
      <el-form-item label="科目名称:">
        <el-cascader
          v-model="formData.subjectCode"
          style="width: 100%;"
          placeholder="可通过科目名称搜索.."
          :options="subjectList"
          :props="{ label: 'name', value: 'code' }"
          filterable
          @change="handleSubject"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["editAccountId", "pid"],
  data() {
    return {
      formData: {},
      currencyList: [],
      subjectList: [],
      //是否显示银行账号
      bankAccountShowAble: false,
      //是否显示积分/优惠券有效期
      expireShowAble: false,
      //是否显示积分兑换比例
      pointRateShowAble: false,
      //是否显示金额
      amountShowAble: false
    };
  },
  methods: {
    /*表单默认加载数据*/
    defaultFormData() {
      return {
        accountId: "",
        //账号编码
        accountCode: "",
        //账号名称
        accountName: "",
        //银行账号
        bankAccount: null,
        //初始余额
        initBalance: 0,
        //余额
        balance: 0,
        //类别(0:现金，1:银行存款，2:积分，3：优惠券)
        category: 0,
        //供应商
        otherId: "",
        //积分/优惠券有效期
        expire: null,
        //积分兑换比例
        pointRate: null,
        //币种
        currency: "",
        //金额
        amount: null,
        //科目id
        subjectId: "",
        //科目编码
        subjectCode: "",
        //科目名称
        subjectName: ""
      };
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
    /*清除表单*/
    clearForm() {
      this.formData = this.defaultFormData();
    },
    selectedCategory(category) {
      //显示权限控制
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
    /*对提交的数据进行类型格式*/
    handleConfirm() {
      if (this.formData.expire) {
        this.formData.expire = this.formData.expire.getTime();
      }
      this.$emit("onSave", this.formData);
    },
    handleGetOne(id) {
      if (id) {
        this.$store
          .dispatch("fundAccount/getOne", { accountId: id })
          .then(data => {
            this.formData = data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.formData = this.defaultFormData();
      }
    },
    getTreeData(data) {
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {
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
    handleSubject(subject) {
      if (subject) {
        const code = subject[subject.length - 1];
        this.formData.subjectId = code;
        this.formData.subjectCode = code;
      }
    },
    initFormData() {
      this.clearForm();
    }
  },
  created() {
    this.clearForm();
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
.el-cascader-menu {
  height: 300px;
}
</style>
