<template>
  <div>
    <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
      <el-form :rules="rules" :model="formData" label-position="left" label-width="20%" size="mini">
        <el-form-item label="名称" prop="firmName">
          <el-select v-model="formData.merchantId" filterable placeholder="请选择" @change="selectedCustomer">
            <el-option
              v-for="item in customerList"
              :key="item.merchantId"
              :label="item.firm.firmName"
              :value="item.merchantId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="firmName">
          <el-input type="text" placeholder="请输入供应商名称" v-model="formData.firmName"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
      <el-form :rules="rules" :model="formData" label-position="left" label-width="20%" size="mini">
        <el-form-item label="名称" prop="firmName">
          <el-input type="text" placeholder="请输入供应商名称" v-model="firmForm.firmName"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
    export default {
        props: ["curNode", "update"],
        data() {
            return {
                formData: {},
                //选择客户
                customerList: [],
                //用于记录和查找所选中的商品类别
                tempCategoryList: [],
                rules: {
                    brandName: [
                        {required: true, message: "请输入品牌名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    categoryCode: [
                        {required: true, message: "请输入品牌名称", trigger: "blur"},
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
            defaultFormData() {
                return {
                    //单号
                    orderNo: '',
                    //父单号
                    parentNo: '',
                    //外部单号
                    sourceNo: '',
                    //商户(客户/供应商)
                    merchantId: '',
                    //客户/供应商账号
                    accountId: '',
                    //联系人ID
                    contactId: '',
                    //联系人姓名
                    contactName: '',
                    //发票号
                    invoiceNo: '',
                    //***************
                    //到期日期
                    expireDate: null,
                    //单据日期
                    orderDate: null,
                    //单据类型（0：其他，1：销售，2：采购，10：销售发货单，11：销售退货单，12：销售变更单，20：采购入库单，21：采购退货单，22：采购变更单）
                    orderType: 1,
                    //***************
                    //仓库
                    warehouseId: '',
                    //仓库编码
                    warehouseCode: '',
                    //仓库名称
                    warehouseName: '',
                    //出入库状态（0：未出库，1：已出库）
                    warehouseStatus: 0,
                    //出入库类型（委外，生产，赠送，销售出库，采购入库）
                    warehouseType: '',
                    //出入库时间
                    warehouseDate: null,
                    //***************
                    //快递号码
                    expressNo: '',
                    //快递公司名称
                    expressName: '',
                    //快递状态
                    expressStatus: 0,
                    //***************
                    //交易单号
                    tradeNo: '',
                    //付款状态（0：未付款，1：已付款）
                    paymentStatus: 0,
                    //付款方式
                    paymentMode: '',
                    //成交金额
                    totalAmount: 0,
                    //实收金额
                    receiptAmount: 0,
                    //***************
                    //结算账户
                    fundAccountId: '',
                    //结算账户编码
                    fundAccountCode: '',
                    //结算账户名称
                    fundAccountName: '',
                    //制单人
                    recordId: '',
                    //制单时间
                    recordDate: new Date(),
                    //制单人姓名
                    recordName: ''
                };
            },
            loadCustomer() {
                this.$store.dispatch("firmMerchant/getList", {filter: {types: JSON.stringify([1, 2])}})
                    .then(data => {
                        this.customerList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            selectedCustomer(item){
                this.$store.dispatch("firmAccount/getOne", {filter: {}})
                    .then(data => {
                        this.customerList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            clearForm() {
                this.formData = this.defaultFormData();
            },
            handleConfirm() {
                this.$emit("onSave", this.formData);
            },
            selectedCategory(selected) {
                //选取最后的节点
                const code = selected[selected.length - 1];
                this.formData.categoryCode = code;
                //找到所选择的对象
                this.tempCategoryList.forEach(item => {
                    if (code == item.categoryCode) {
                        this.formData.categoryName = item.categoryName;
                        this.formData.categoryPath = item.path;
                    }
                })
            },
            initFormData() {
                this.clearForm();
                this.loadCategory();
                if (this.update) {
                    Object.assign(this.formData, this.curNode);
                }
            },
        },
        created() {
            this.initFormData();
        }
    };
</script>
