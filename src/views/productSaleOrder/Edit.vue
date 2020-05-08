<template>
  <div class="bigBox">
    <div class="contentBox">
      <div id="goBack" @click="goBack">
        <el-page-header></el-page-header>
      </div>
      <br>
      <el-row>
        <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
          <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
            <el-form :rules="rules" :model="formData" label-position="left" label-width="87px" size="mini" style="width: 80%">
              <el-form-item label="商户:" prop="merchantId">
                <el-select v-model="formData.merchantId" filterable @change="selectedCustomer" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in customerList"
                    :key="item.merchantId"
                    :label="item.firm.firmName"
                    :value="item.merchantId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="账号:" prop="accountId">
                <el-select v-model="formData.accountId" filterable :disabled="customerSelected" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in accountList"
                    :key="item.accountId"
                    :label="item.accountId"
                    :value="item.accountId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系人姓名:" prop="contactName">
                <el-input type="text" v-model="formData.contactName" placeholder="请输入联系人姓名"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
        <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
          <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
            <el-form :rules="rules" :model="formData" label-position="left" label-width="87px" size="mini" style="width: 80%">
              <el-form-item label="发货期限:" prop="expireDate">
                <el-date-picker
                  v-model="formData.expireDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="仓库:" prop="firmName">
                <el-select v-model="formData.warehouseId" filterable placeholder="请选择" @change="selectedWarehouse"
                           style="width: 100%">
                  <el-option
                    v-for="item in warehouseList"
                    :key="item.warehouseCode"
                    :label="item.warehouseName"
                    :value="item.warehouseCode">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出入库状态:" prop="firmName">
                未出库
              </el-form-item>
              <el-form-item label="出库时间:" prop="warehouseDate">
                <el-date-picker
                  v-model="formData.warehouseDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="快递公司:" prop="firmName">
                <el-select v-model="formData.expressId" @change="selectedExpress" filterable placeholder="请选择"
                           style="width: 100%">
                  <el-option
                    v-for="item in expressList"
                    :key="item.merchantId"
                    :label="item.firm.firmName"
                    :value="item.merchantId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="付款方式" prop="firmName">
                <el-autocomplete
                  v-model="formData.paymentMode"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入联系电话"
                  @select="selectedPaymode"
                  style="width: 100%">
                </el-autocomplete>
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="16">
          <div class="title">
            <el-button type="primary" size="mini" @click="handleAddProduct">添加商品明细</el-button>
          </div>
          <el-table :data="orderDetails" height="250" border>
            <el-table-column prop="productCode" label="商品编码" align="center"></el-table-column>
            <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
            <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
            <el-table-column prop="price" label="单价" align="center"></el-table-column>
            <el-table-column prop="amount" label="金额" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEditProduct(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleRemoveProduct(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
          <el-form style="width: 80%; margin-top: 10px">
            <el-input type="textarea" v-model="formData.remark" placeholder="暂无备注信息"></el-input>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
          <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
            <el-form :rules="rules" :model="formData" label-position="left" label-width="87px" size="mini" style="width: 80%">
              <el-form-item label="成交金额:">
                <span id="totalAmount">{{computedTotalAmount(orderDetails)}}</span>
              </el-form-item>
              <el-form-item label="实收金额:">
                {{formData.receiptAmount}}
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
        <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
          <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
            <el-form :rules="rules" :model="formData" label-position="left" label-width="87px" size="mini" style="width: 80%">
              <el-form-item label="结算账户:" prop="fundAccountId">
                <el-select v-model="formData.fundAccountId" filterable placeholder="请选择" @change="selectedFundAccount" style="width: 100%">
                  <el-option
                    v-for="item in funAccountList"
                    :key="item.accountId"
                    :label="item.accountName"
                    :value="item.accountId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="制单人:">
                {{this.$store.state.loginInfo.fullName}}
              </el-form-item>
              <el-form-item label="制单时间:">
                {{formatDate("YYYY-MM-DD")}}
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="16">
          <div id="footer">
            <el-button type="primary" @click="handleSave" size="mini">保 存</el-button>
          </div>
        </el-col>
      </el-row>

      <el-dialog title="商品明细" :visible.sync="dialogVisible" :close-on-click-modal="false" width="24%">
        <order-detail v-if="dialogVisible" :curProduct="curProduct" :detailUpdate="detailUpdate"
                      @onCancel="handleCancel" @onConfirm="handleConfirm"></order-detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import orderDetail from "./orderDetail";

    export default {
        data() {
            return {
                formData: {},
                //选择客户
                customerList: [],
                accountList: [],
                warehouseList: [],
                expressList: [],
                productOrderList: [],
                orderDetails: [],
                funAccountList: [],
                dialogVisible: false,
                //是否对订单详情进行修改或添加
                detailUpdate: false,
                customerSelected: true,
                //记录当前正在修改的订单详情对象
                curProduct: {},
                //用于校验订单详情的修改。
                tempProduct: {},
                update: false,
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
                    warehouseType: '销售出库',
                    //出入库时间
                    warehouseDate: null,
                    //***************
                    //快递号码
                    expressNo: '',
                    //快递公司ID
                    expressId: '',
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
                    recordName: '',
                    //备注
                    remark: ''
                };
            },
            loadCustomers() {
                this.$store.dispatch("firmMerchant/getList", {filter: {types: JSON.stringify([1, 2])}})
                    .then(data => {
                        this.customerList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadAccounts(merchantId) {
                this.$store.dispatch("firmAccount/getList", {filter: {merchantId: merchantId}})
                    .then(data => {
                        this.accountList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadWarehouses() {
                this.$store.dispatch("warehouse/getList", {filter: {}})
                    .then(data => {
                        this.warehouseList = data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadExpress() {
                this.$store.dispatch("firmMerchant/getList", {filter: {types: JSON.stringify([0])}})
                    .then(data => {
                        this.expressList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadFundAccount(){
                this.$store.dispatch("fundAccount/getList", {filter: {}})
                    .then(data => {
                        this.funAccountList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadProduct(orderNo){
                this.$store.dispatch("productOrder/getOne", {orderNo: orderNo})
                    .then(data => {
                        this.formData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadOderDetails(orderNo){
                this.$store.dispatch("productOrderDetail/getList", {filter: {orderNo: orderNo}})
                    .then(data => {
                        this.orderDetails = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            selectedCustomer(item) {
                this.customerSelected = false;
                this.loadAccounts(item);
                this.customerList.forEach(customer => {
                    if (item === customer.merchantId) {
                        this.$store.dispatch("firmContact/getList", {
                            filter: {
                                firmId: item,
                                phone: customer.firm.phone,
                                email: customer.firm.email
                            }
                        })
                            .then(data => {
                                this.formData.contactId = data[0].contactId;
                                this.formData.contactName = customer.firm.fullName;
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                })
            },
            selectedWarehouse(item) {
                this.warehouseList.forEach(warehouse => {
                    if (item === warehouse.warehouseId) {
                        this.formData.warehouseCode = warehouse.warehouseCode;
                        this.formData.warehouseName = warehouse.warehouseName;
                    }
                })
            },
            selectedExpress(item) {
                this.expressList.forEach(express => {
                    if (item === express.merchantId) {
                        this.formData.expressName = express.firmName;
                    }
                })
            },
            selectedPaymode(item) {
                this.formData.paymentMode = item;
            },
            selectedFundAccount(item){
                this.funAccountList.forEach(fundAccount => {
                    if (item === fundAccount.accountId){
                        this.formData.accountCode = fundAccount.accountCode;
                        this.formData.accountName = fundAccount.accountName;
                    }
                });
            },
            handleAddProduct() {
                this.detailUpdate = false;
                this.dialogVisible = true;
            },
            handleEditProduct(row) {
                this.detailUpdate = true;
                this.curProduct = Object.assign({}, row);
                this.tempProduct = row;
                this.dialogVisible = true;
            },
            handleRemoveProduct(idx, row) {
                let _detailId = row.detailId;
                if (_detailId && '' != _detailId) {
                    this.$store.dispatch("orderDetail/removeOne", {detailId: _detailId})
                        .catch(error => {
                            console.log(error);
                        });
                }
                this.orderDetails.splice(idx, 1);
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleConfirm(productForm) {
                if (this.detailUpdate) {
                    //如果点击的是编辑,对原有的对象进行覆盖。
                    Object.assign(this.orderDetails[this.orderDetails.indexOf(this.tempProduct)], productForm);
                    this.dialogVisible = false;
                } else {
                    //否则新增到列表中
                    this.orderDetails.push(productForm);
                    this.dialogVisible = false;
                }
            },
            handleSave() {
                const dateItem = ['expireDate', 'warehouseDate'];
                dateItem.forEach(item => {
                    if (this.formData[item] && 'number' != typeof this.formData[item]) {
                        this.formData[item] = this.formData[item].getTime();
                    }
                });
                this.formData.totalAmount = parseFloat(document.getElementById('totalAmount').textContent);

                //判断添加还是更新
                let url = '';
                if (this.update) {
                    url = 'productOrder/updateOne';
                } else {
                    url = 'productOrder/addOne';
                }
                //接口通过map接收数据
                this.$store
                    .dispatch(url, {productOrder: this.formData, orderDetails: this.orderDetails})
                    .then(() => {
                        this.goBack();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            querySearchAsync(keyword, callBack) {
                if (keyword) {
                    this.$store.dispatch("user/getList", {filter: {email:keyword}})
                        .then(data => {
                            data.forEach(item => {
                                item.value = item.fullName;
                            });
                            callBack(data);
                        }).catch(error => {
                        console.log(error);
                    });
                } else {
                    callBack([]);
                }
            },
            clearForm() {
                this.formData = this.defaultFormData();
            },
            //跳转回列表页面
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: '/home'});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            },
            initDate(format) {
                let date = new Date();
                return this.$moment(date).format(format);
            },
            initFormData(orderNo) {
                this.update = false;
                this.clearForm();
                this.loadCustomers();
                this.loadWarehouses();
                this.loadFundAccount();
                this.loadExpress();
                if (orderNo) {
                    this.update = true;
                    this.loadProduct(orderNo);
                    this.loadOderDetails(orderNo);
                }
            },
        },
        created() {
            this.initFormData(this.$route.query.orderNo);
        },
        computed:{
            computedTotalAmount(){
                return function (_orderDetails) {
                    let _totalAmount = 0;
                    _orderDetails.forEach(item => {
                        _totalAmount += item.amount;
                    });
                    return _totalAmount.toFixed(2);
                }
            },
            formatDate() {
                return function(format) {
                    return this.initDate(format);
                };
            },
        },
        components: {
            orderDetail
        }
    };
</script>
