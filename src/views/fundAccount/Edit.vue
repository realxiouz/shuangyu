<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.accountId"/>
      <el-form-item label="账号类别">
        <el-select v-model="formData.category" style="width: 100%;">
          <el-option label="现金" :value="0"></el-option>
          <el-option label="银行存款" :value="1"></el-option>
          <el-option label="积分" :value="2"></el-option>
          <el-option label="优惠券" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号编码">
        <el-input v-model="formData.accountCode" placeholder="请输入账号编码.."></el-input>
      </el-form-item>
      <el-form-item v-if="0 === formData.category" label="资金账号">
        <el-input v-model="formData.accountCode" placeholder="请输入账号编码.."></el-input>
      </el-form-item>
      <el-form-item v-if="1 === formData.category" label="账号名称">
        <el-input v-model="formData.accountName" placeholder="示例：中国工商银行昆明官渡支行"></el-input>
      </el-form-item>
      <el-form-item v-if="1 === formData.category" label="银行账号">
        <el-input v-model="formData.bankAccount" placeholder="请输入完整的银行账号"></el-input>
      </el-form-item>
      <el-form-item label="币种">
        <el-select v-model="formData.currencyCode" style="width: 100%;" placeholder="请选择币种..">
          <el-option
            v-for="(item,idx) in currencyList"
            :key="idx"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="初始余额">
        <el-input v-model="formData.initBalance" placeholder="请输入余额.."></el-input>
      </el-form-item>
      <el-form-item label="余额">
        <el-input v-model="formData.balance" placeholder="请输入余额.."></el-input>
      </el-form-item>
      <el-form-item label="科目名称">
          <el-cascader
            style="width: 100%;"
            placeholder="可通过科目名称搜索.."
            :options="subjectList"
            :props="{ label: 'name', value: 'code' }"
            filterable>
          </el-cascader>
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
        props: ['editAccountId', 'pid'],
        data() {
            return {
                formData: {},
                currencyList: [],
                subjectList: []
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
                    bankAccount: '',
                    //类别(0:现金，1:银行存款)
                    category: 1,
                    //币种
                    currencyCode: '',
                    //科目id
                    subjectId: '',
                    //科目编码
                    subjectCode: '',
                    //科目名称
                    subjectName: '',
                    //初始余额
                    initBalance: 0,
                    //余额
                    balance: 0
                };
            },
            loadCurrency() {
                this.$store.dispatch("currency/getList", {filter: {}})
                    .then(data => {
                        this.currencyList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadSubject() {
                this.$store.dispatch("accountSubject/getSelectingList", {filter: {}})
                    .then(data => {
                        this.subjectList = this.getTreeData(JSON.parse(data));
                        console.log(this.subjectList);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
            selectChange(code) {
                let obj = {};
                obj = this.subjectList.find((item) => {
                    return item.code === code;
                });
                this.formData.subjectName = obj.name;
            },
            /*对提交的数据进行类型格式*/
            handleConfirm() {
                this.$emit("onSave", this.formData);
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("fundAccount/getOne", {accountId: id})
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
            initFormData() {
                this.clearForm();

            },
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
  .el-cascader-menu {
    height: 300px;
  }
</style>
