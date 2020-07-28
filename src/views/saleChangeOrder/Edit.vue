<template>
  <div class="bigBox">
    <div class="contentBox">
      <div id="goBack" @click="goBack">
        <el-page-header></el-page-header>
      </div>
      <el-form
        ref="orderForm"
        :disabled="isUpdate"
        :rules="rules"
        :model="formData"
        label-position="left"
        label-width="97px"
        style="width: 80%"
      >
        <el-row>
          <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
            <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
              <el-form-item label="客户:" prop="merchantId">
                <el-select
                  v-model="formData.merchantId"
                  filterable
                  @change="selectedCustomer"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in customerList"
                    :key="item.merchantId"
                    :label="item.firm.firmName"
                    :value="item.merchantId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="账号:" prop="accountId">
                <el-select
                  v-model="formData.accountId"
                  filterable
                  :disabled="customerSelected && !update"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in accountList"
                    :key="item.accountId"
                    :label="item.username"
                    :value="item.accountId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系人姓名:" prop="contactName">
                <el-input
                  type="text"
                  v-model="formData.contactName"
                  placeholder="请输入联系人姓名"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
            <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
              <el-form-item label="发货期限:" prop="expireDate">
                <el-date-picker
                  v-model="formData.expireDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="仓库:" prop="warehouseId">
                <el-select
                  v-model="formData.warehouseId"
                  filterable
                  placeholder="请选择"
                  @change="selectedWarehouse"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in warehouseList"
                    :key="item.warehouseCode"
                    :label="item.warehouseName"
                    :value="item.warehouseCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出入库状态:">
                <span>{{
                  formData.warehouseStatus == 2 ? "未出库" : "已出库"
                }}</span>
              </el-form-item>
              <el-form-item label="出库时间:" prop="warehouseDate">
                <el-date-picker
                  v-model="formData.warehouseDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="快递公司:" prop="expressId">
                <el-select
                  v-model="formData.expressId"
                  @change="selectedExpress"
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in expressList"
                    :key="item.merchantId"
                    :label="item.firm.firmName"
                    :value="item.merchantId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="付款方式" prop="paymentMode">
                <el-autocomplete
                  v-model="formData.paymentMode"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="付款方式"
                  @select="selectedPaymode"
                  style="width: 100%"
                >
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <goods v-model="orderDetails" @total="handleTotal" />
        <passengers v-model="passengers" />
        <!--remark-->
        <el-row style="width: 80%; margin-top: 10px">
          <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
            <el-input
              type="textarea"
              v-model="formData.remark"
              placeholder="暂无备注信息"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
            <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
              <el-form-item label="成交金额:">
                {{ formData.totalAmount }}
              </el-form-item>
              <el-form-item label="实收金额:">
                {{ formData.receiptAmount }}
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
            <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="16">
              <el-form-item label="结算账户:" prop="fundAccountId">
                <el-select
                  v-model="formData.fundAccountId"
                  filterable
                  placeholder="请选择"
                  @change="selectedFundAccount"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in funAccountList"
                    :key="item.accountId"
                    :label="item.accountName"
                    :value="item.accountId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="制单人:">
                {{ this.$store.state.loginInfo.fullName }}
              </el-form-item>
              <el-form-item label="制单时间:">
                {{ new Date() | time("YYYY-MM-DD") }}
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <!--postButton-->
        <el-row>
          <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="16">
            <div id="footer">
              <el-button type="primary" @click="handleSave">保 存 </el-button>
              <el-button type="primary" @click="confirmOrder">确 认 </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
// import productDetail from "./productDetail";
import Passengers from "@/components/Passengers";
import Goods from "@/components/Goods";

export default {
  data() {
    return {
      formData: {
        orderDetails: []
      },
      customerList: [],
      accountList: [],
      warehouseList: [],
      expressList: [],
      productOrderList: [],
      orderDetails: [],
      funAccountList: [],
      dialogVisible: false,
      customerSelected: true,
      update: false,
      isUpdate: true,
      defaultDate: new Date().getTime(),
      rules: {
        contactName: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        paymentMode: [
          { required: true, message: "请输入付款方式", trigger: "blur" }
        ]
        // fundAccountId: [
        //     {required: true, message: "请选择结算账户", trigger: "blur"}
        // ]
      },

      passengers: []
    };
  },
  methods: {
    defaultFormData() {
      return {
        //单号
        orderNo: "",
        //父单号
        parentNo: "",
        //外部单号
        sourceNo: "",
        //商户(客户/供应商)
        merchantId: "",
        //客户/供应商账号
        accountId: "",
        //联系人ID
        contactId: "",
        //联系人姓名
        contactName: "",
        //发票号
        invoiceNo: "",
        //***************
        //到期日期
        expireDate: this.defaultDate,
        //单据日期
        orderDate: this.defaultDate,
        //100：销售单，101 销售出库单，102 销售退款单，103销售退票入库单，104销售改签单，105销售改签入库单，106 销售改签出库单，
        orderType: 104,
        //***************
        //仓库
        warehouseId: "",
        //仓库编码
        warehouseCode: "",
        //仓库名称
        warehouseName: "",
        //出入库状态（0：未入库，1：已入库，2：未出库，3：已出库）
        warehouseStatus: 2,
        //出入库时间
        warehouseDate: this.defaultDate,
        //***************
        //快递号码
        expressNo: "",
        //快递公司ID
        expressId: "",
        //快递公司名称
        expressName: "",
        //快递状态
        expressStatus: 0,
        //***************
        //交易单号
        tradeNo: "",
        //付款状态（0：未付款，1：已付款）
        paymentStatus: 0,
        //付款方式
        paymentMode: "",
        //成交金额
        totalAmount: 0,
        //实收金额
        receiptAmount: 0,
        //***************
        //结算账户
        fundAccountId: "",
        //结算账户编码
        fundAccountCode: "",
        //结算账户名称
        fundAccountName: "",
        //备注
        remark: "",
        //订单状态
        orderStatus: 0,
        //制单时间
        recordDate: this.defaultDate
      };
    },
    loadCustomers() {
      this.$store
        .dispatch("firmMerchant/getCustomerList", {})
        .then(data => {
          this.customerList = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadAccounts(merchantId) {
      this.$store
        .dispatch("firmAccount/getList", { filter: { firmId: merchantId } })
        .then(data => {
          this.accountList = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadWarehouses() {
      this.$store
        .dispatch("warehouse/getList", { filter: {} })
        .then(data => {
          this.warehouseList = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadExpress() {
      this.$store
        .dispatch("firmMerchant/getSupplierList", {})
        .then(data => {
          this.expressList = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadFundAccount() {
      this.$store
        .dispatch("fundAccount/getList", { filter: {} })
        .then(data => {
          this.funAccountList = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadProduct(orderNo) {
      this.$store
        .dispatch("productOrder/getOne", { orderNo: orderNo })
        .then(data => {
          if (data) {
            if (data.orderStatus === 0) {
              this.isUpdate = false;
            }
            this.formData = data;
            this.passengers = this.formData.passengers;
            this.orderDetails = this.formData.orderDetails;
            if (data.merchantId) {
              this.loadAccounts(data.merchantId);
            }
          }
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
          this.formData.merchantType = customer.merchantType;
          this.$store
            .dispatch("firmContact/getList", {
              filter: {
                firmId: item,
                phone: customer.firm.phone,
                email: customer.firm.email
              }
            })
            .then(data => {
              if (data.length > 0) {
                this.formData.contactId = data[0].contactId;
                this.formData.contactName = customer.firm.fullName;
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    selectedWarehouse(item) {
      this.warehouseList.forEach(warehouse => {
        if (item === warehouse.warehouseId) {
          this.formData.warehouseCode = warehouse.warehouseCode;
          this.formData.warehouseName = warehouse.warehouseName;
        }
      });
    },
    selectedExpress(item) {
      this.expressList.forEach(express => {
        if (item === express.merchantId) {
          this.formData.expressName = express.firmName;
        }
      });
    },
    selectedPaymode(item) {
      this.formData.paymentMode = item;
    },
    selectedFundAccount(item) {
      this.funAccountList.forEach(fundAccount => {
        if (item === fundAccount.accountId) {
          this.formData.accountCode = fundAccount.accountCode;
          this.formData.accountName = fundAccount.accountName;
        }
      });
    },
    handleSave() {
      this.$refs["orderForm"].validate(valid => {
        if (valid) {
          const dateItem = ["expireDate", "warehouseDate"];
          dateItem.forEach(item => {
            if (this.formData[item] && "number" != typeof this.formData[item]) {
              this.formData[item] = this.formData[item].getTime();
            }
          });

          this.formData.orderDetails = this.orderDetails;
          this.formData.passengers = this.passengers;
          this.$store
            .dispatch("productOrder/saveOrder", this.formData)
            .then(() => {
              this.goBack();
            })
            .catch(error => {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "保存草稿成功！"
          });
        }
      });
    },
    confirmOrder() {
      this.$refs["orderForm"].validate(valid => {
        if (valid) {
          const dateItem = ["expireDate", "warehouseDate"];
          dateItem.forEach(item => {
            if (this.formData[item] && "number" != typeof this.formData[item]) {
              this.formData[item] = this.formData[item].getTime();
            }
          });
          this.formData.orderDetails = this.orderDetails;
          this.formData.passengers = this.passengers;
          this.$store
            .dispatch("productOrder/confirmOrder", this.formData)
            .then(() => {
              this.goBack();
            })
            .catch(error => {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "确认成功！"
          });
        }
      });
    },
    querySearchAsync(keyword, callBack) {
      if (keyword) {
        this.$store
          .dispatch("user/getList", { filter: { email: keyword } })
          .then(data => {
            data.forEach(item => {
              item.value = item.fullName;
            });
            callBack(data);
          })
          .catch(error => {
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
        this.$router.push({ path: "/home" });
        return false;
      } else {
        this.$router.go(-1);
      }
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
      } else {
        this.isUpdate = false;
        this.passengers = [];
        this.orderDetails = [];
      }
    },
    handleTotal(val) {
      this.formData.totalAmount = val;
    }
  },
  created() {
    this.initFormData(this.$route.query.orderNo);
  },
  components: {
    Passengers,
    Goods
  }
};
</script>
