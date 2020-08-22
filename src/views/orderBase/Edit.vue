<template>
  <div class="page">
    <sticky :top="15">
      <div class="order-header">
        <el-page-header @click.native="goBack" />
        <div style="flex:1;"></div>
        <template v-if="formData.orderStatus!='DRAFT'">
          <el-button v-if="formData.orderType=='SELL'" type="primary" @click="onGoSellOut">出库单</el-button>
          <el-button v-else-if="formData.orderType=='BUY'" type="primary" @click="onGoBuyIn">入库单</el-button>
          <el-button v-else-if="formData.orderType=='SELL_CHANGE_IN'" type="primary" @click="onGoSellChangeOut">改签出库单</el-button>
          <el-button v-else-if="formData.orderType=='BUY_CHANGE_OUT'" type="primary" @click="onGoBuyChangeIn">改签入库单</el-button>
        </template>
      </div>
    </sticky>
    <el-form
      ref="orderForm"
      :disabled="canNotEdit"
      :rules="rules"
      :model="formData"
      label-position="top"
      label-width="97px"
      size="mini"
      style="width: 100%"
    >
      <card title="订单信息">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="订单类型:">
              <el-tag>{{this.formData.orderType|orderType}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态:">
              <el-tag>{{this.formData.orderStatus|orderStatus}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$route.query.orderType.startsWith('SELL') ? '客户' : '供应商'" prop="merchantId">
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
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货期限:" prop="expireDate">
              <el-date-picker
                v-model="formData.expireDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出入库状态:">
              <el-tag>{{formData.warehouseStatus|warehouseStatus}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库时间:" prop="warehouseDate">
              <el-date-picker
                v-model="formData.warehouseDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方式" prop="paymentMode">
              <el-input
                v-model="formData.paymentMode"
                :fetch-suggestions="querySearchAsync"
                placeholder="付款方式"
                @select="selectedPaymode"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交金额:">{{ formData.totalAmount }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实收金额:">{{ formData.receiptAmount }}</el-form-item>
          </el-col>
          
          <el-col :span="8">
            <el-form-item label="制单人:">{{ this.$store.getters.fullName }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制单时间:">{{ new Date() | time("YYYY-MM-DD") }}</el-form-item>
          </el-col>
        </el-row>
      </card>

      <card title="商品信息">
        <goods v-model="orderDetails" @total="handleTotal" ref="goods" />
      </card>
      <card title="改签商品信息" v-if="orderDetailsForChange.length||formData.orderType=='SELL_CHANGE_IN'">
        <goods v-model="orderDetailsForChange" />
      </card>
      <card title="乘客信息">
        <passengers v-model="passengers" />
      </card>
    </el-form>

    <sticky :bottom="15">
      <div class="order-header">
        <el-button-group v-if="formData.orderType=='SELL'">
          <el-button type="primary" v-if="formData.orderStatus=='DRAFT'" @click="onSave">保 存</el-button>
          <el-button type="primary"  @click="confirmOrder">确 认</el-button>
        </el-button-group>
        <el-button-group v-if="formData.orderType=='SELL_OUT'">
          <el-button type="primary" v-if="formData.orderStatus=='DRAFT'" @click="onSave">保 存</el-button>
          <el-button type="primary"  @click="confirmOrder">确 认</el-button>
        </el-button-group>
        <el-button-group v-if="formData.orderType=='SELL_REFUND_IN'">
          <el-button type="primary" v-if="formData.orderStatus=='DRAFT'" @click="onSave">保 存</el-button>
          <el-button type="primary" @click="onSellRefundIn">入 库</el-button>
        </el-button-group>
        <el-button-group v-if="formData.orderType=='SELL_CHANGE_IN'">
          <el-button type="primary" v-if="formData.orderStatus=='DRAFT'" @click="onSave">保 存</el-button>
          <el-button type="primary" @click="onSellChangeIn">入 库</el-button>
        </el-button-group>
        <el-button-group v-if="formData.orderType=='SELL_CHANGE_OUT'">
          <el-button type="primary" v-if="formData.orderStatus=='DRAFT'" @click="onSave">保 存</el-button>
          <el-button type="primary"  @click="confirmOrder">确 认</el-button>
        </el-button-group>
        <div style="flex:1;"></div>
        <template v-if="formData.orderStatus!='DRAFT'">
          <template v-if="formData.orderType=='SELL'">
            <template v-if="formData.orderStatus=='COMPLETED'">
              <el-button @click="onGoSellRefundIn" type="primary">退</el-button>
              <el-button @click="onGoSellChangeIn" type="primary">改</el-button>
            </template>
          </template>
          <template v-if="formData.orderType=='BUY'">
            <template v-if="formData.orderStatus=='COMPLETED'">
              <el-button @click="onGoBuyRefundOut" type="primary">退</el-button>
              <el-button @click="onShowSellChange" type="primary">改</el-button>
            </template>
          </template>
          <template v-if="formData.orderType=='BUY_IN'">
            <template v-if="formData.orderStatus!='DRAFT'">
              <el-button type="primary" @click="onBuyIn">入库</el-button>
            </template>
          </template>

          <template v-if="formData.orderType=='BUY_REFUND_OUT'">
            <template v-if="formData.orderStatus!='DRAFT'">
              <el-button type="primary" @click="onSellOut">出库</el-button>
            </template>
          </template>

          <template >

          </template>
        </template>
      </div>
    </sticky>  

    <el-dialog :visible.sync="showRefund" title="退票">
      <refund ref="refund" :ps="psRefund" @refund="comfirmRefund"/>
    </el-dialog>

    <el-dialog :visible.sync="showChange" title="改签">
      <change ref="change" :ps="psChange" :goods="goodsChange" @changeOrder="comfirmChange"/>
    </el-dialog>
  </div>
</template>

<script>
import Goods from "@/components/Goods";
import Passengers from "@/components/Passengers";
import Refund from './refund'
import Change from './change'

export default {
  data() {
    return {
      formData: {
        orderDetails: []
      },
      customerList: [],
      orderDetails: [],
      orderDetailsForChange: [],
      funAccountList: [],
      canNotEdit: true, //只有草稿可以编辑整个表单
      productIdList: [],
      defaultDate: new Date().getTime(),
      rules: {
        merchantId: [
          {required: true, message: "必须选择", trigger: "blur"}
        ],
        paymentMode: [
          { required: true, message: "请输入付款方式", trigger: "blur" }
        ]
      },

      passengers: [],

      showRefund: false,
      psRefund: [], //可供选择退款人员列表
      showChange: false, //
      psChange: [],
      goodsChange: [],
    };
  },
  methods: {
    defaultFormData() {
      return {
        orderNo: "",
        parentNo: "",
        sourceNo: "",
        merchantId: "",
        contactId: "",
        invoiceNo: "",
        expireDate: this.defaultDate,
        orderDate: this.defaultDate,
        orderType: "",
        warehouseCode: "",
        warehouseName: "",
        warehouseStatus: "OUT",
        warehouseDate: this.defaultDate,
        expressNo: "",
        expressId: "",
        expressName: "",
        expressStatus: 0,
        tradeNo: "",
        paymentStatus: "0",
        paymentMode: "",
        totalAmount: 0,
        receiptAmount: 0,
        fundAccountId: "",
        fundAccountCode: "",
        fundAccountName: "",
        remark: "",
        orderStatus: "DRAFT",
        recordDate: this.defaultDate
      };
    },
    loadCustomers() {
      let actionName = this.$route.query.orderType.startsWith("SELL") ? 'firmMerchant/getCustomerList' : 'firmMerchant/getSupplierList'
      this.$store
        .dispatch(actionName, {})
        .then(data => {
          this.customerList = data;
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
            if (data.orderStatus === "DRAFT") {
              this.canNotEdit = false;
            }
            this.formData = data;
            this.passengers = this.formData.passengers;
            this.orderDetails = data.orderDetails.filter(i => !i.changeFlag);

            this.orderDetailsForChange = data.orderDetails.filter(i => i.changeFlag)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadProductByParent(no) {
      this.$store
        .dispatch("productOrder/getOne", { orderNo: no })
        .then(data => {
          if (data) {
            this.formData = data

            this.formData.orderNo = null
            this.formData.orderType = this.$route.query.orderType
            this.formData.orderStatus = 'DRAFT'
            if(this.formData.orderType.startsWith("SELL")) {
              this.formData.orderCategory = 0
              this.formData.warehouseStatus = 'OUT'
            } else {
              this.formData.orderCategory = 1
              this.formData.warehouseStatus = 'IN'
            }

            this.passengers = data.passengers;
            this.orderDetails = data.orderDetails.filter(i => !i.changeFlag);

            this.orderDetailsForChange = data.orderDetails.filter(i => i.changeFlag)

            this.$nextTick(_ => {
              this.$refs.goods.calcTotal()
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectedCustomer(item) {
      // this.loadAccounts(item);
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
              }
            })
            .catch(error => {
              console.log(error);
            });
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
    onSave() {
      this.$refs["orderForm"].validate(valid => {
        if (valid) {
          this.formData.orderDetails = this.orderDetails;
          this.formData.passengers = this.passengers;

          let data = {
            ...this.formData,
          }
          data.parentNo = data.parentNo || this.$route.query.parentNo
          data.rootOrderNo = data.rootOrderNo || this.$route.query.parentNo

          switch(this.formData.orderType) {
            case 'SELL':
            case 'SELL_OUT':
            case 'SELL_CHANGE_OUT':
            case 'BUY_CHANGE_OUT':
            case 'BUY_REFUND_OUT':
              data.warehouseStatus = 'OUT'
              break
            case 'SELL_REFUND_IN':
            case 'SELL_CHANGE_IN':
            case 'BUY':
            case 'BUY_IN':
            case 'BUY_CHANGE_IN':
              data.warehouseStatus = 'IN'
              break
          }
          this.$store
            .dispatch("productOrder/saveOrder", data)
            .then(() => {
              this.$message({
                type: "success",
                message: "保存草稿成功！"
              });
              this.goBack();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    confirmOrder() {
      this.$refs["orderForm"].validate(valid => {
        if (valid) {
          this.formData.parentNo = this.formData.orderNo || this.formData.parentNo;
          this.formData.orderNo = null;
          this.formData.orderDetails = this.orderDetails;
          this.formData.passengers = this.passengers;

          this.$store
            .dispatch("productOrder/confirmOrder", this.formData)
            .then(() => {
              this.goBack();
              this.$message({
                type: "success",
                message: "订单已确认！"
              });
            })
            .catch(error => {
              console.log(error);
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
    goBack() {
      if (this.$router.history.length <= 1) {
        this.$router.push({ path: "/home" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },

    handleTotal(val) {
      this.formData.totalAmount = val;
    },
    onGoSellOut() {
      this.$router.push({
        name: "orderBaseList",
        query: {
          orderType: "SELL_OUT",
          parentNo: this.formData.orderNo
        }
      });
    },
    onShowSellRefund() {
      this.psRefund = JSON.parse(JSON.stringify(this.formData.passengers))
      this.showRefund = true
      this.$nextTick(_ => {
        this.$refs.refund.allSelect()
      })
    },
    comfirmRefund(val) {
      let data = {
        ...this.formData,
        passengers: val
      }
      data.parentNo = data.orderNo;
      data.orderNo = null;
      this.$store.dispatch('productOrder/orderRefund', data)
        .then(data => {
          this.$message.success('退票成功')
          this.goBack()
        })
    },
    onShowSellChange() {
      this.psChange = JSON.parse(JSON.stringify(this.formData.passengers))
      this.goodsChange = JSON.parse(JSON.stringify(this.formData.orderDetails))
      this.showChange = true
    },
    comfirmChange(val) {
      let data = {
        ...this.formData,
        ...val
      }
      data.parentNo = data.orderNo;
      data.orderNo = null;
      this.$store.dispatch('productOrder/orderChange', data)
        .then(data => {
          this.$message.success('改签成功')
          this.goBack()
        })
    },
    onSellOut() {

      this.$store
        .dispatch("productOrder/outWarehouseOrder", {
          orderNo: this.formData.orderNo,
          data: this.formData
        })
        .then(data => {
          if (data) {
            this.$message.success('出库成功');
            this.goBack();
          } else {
            this.$message({
              type: "error",
              message: "出库失败!"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onGoBuyIn() {
      this.$router.push({
        name: "orderBaseList",
        query: {
          orderType: "BUY_IN",
          parentNo: this.formData.orderNo
        }
      });
    },
    onBuyIn() {
      
      this.$store
        .dispatch("productOrder/inWarehouseOrder", {
          orderNo: this.formData.orderNo,
          data: this.formData
        })
        .then(data => {
          if (data) {
            this.$message.success('入库成功');
            this.goBack();
          } else {
            this.$message({
              type: "error",
              message: "出库失败!"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onGoBuy() {
      this.$router.push({
        name: "orderBaseEdit",
        query: {
          orderType: 'BUY',
          parentNo: this.formData.orderNo
        }
      })
    },
    onGoSellChangeOut() {
      this.$router.push({
        name: "orderBaseList",
        query: {
          orderType: "SELL_CHANGE_OUT",
          parentNo: this.formData.orderNo
        }
      });
    },
    onGoBuyChangeIn() {
      this.$router.push({
        name: "orderBaseList",
        query: {
          orderType: "BUY_CHANGE_IN",
          parentNo: this.formData.orderNo
        }
      });
    },
    onGoBuyRefundOut() {
      this.$router.push({
        name: 'orderBaseEdit',
        query: {
          orderType: "BUY_REFUND_OUT",
          parentNo: this.formData.orderNo
        }
      })
    },
    onGoSellChangeIn() {
      this.$router.push({
        name: 'orderBaseEdit',
        query: {
          orderType: "SELL_CHANGE_IN",
          parentNo: this.formData.orderNo
        }
      })
    },
    onGoSellRefundIn() {
      this.$router.push({
        name: 'orderBaseEdit',
        query: {
          orderType: "SELL_REFUND_IN",
          parentNo: this.formData.orderNo
        }
      })
    },
    getData() {
      this.loadCustomers();
      this.loadFundAccount();

      if (this.$route.query.orderNo) {
        this.loadProduct(this.$route.query.orderNo);
      } else {
        this.canNotEdit = false;
      }

      this.formData = this.defaultFormData();
      
      this.formData.orderType = this.$route.query.orderType;
      if (!this.$route.query.orderNo) {
        if(this.formData.orderType.startsWith("SELL")) {
          this.formData.orderCategory = 0
          this.formData.warehouseStatus = 'OUT'
        } else {
          this.formData.orderCategory = 1
          this.formData.warehouseStatus = 'IN'
        }
      }

      if (this.$route.query.parentNo) {
        this.formData.parentNo = this.$route.query.parentNo
        this.loadProductByParent(this.$route.query.parentNo)
      }
      console.log(this.formData);
    },

    onSellRefundIn() {
      let data = {
        ...this.formData,
      }
      data.orderDetails = this.orderDetails;
      data.passengers = this.passengers;
      data.parentNo = data.parentNo || this.$route.query.parentNo
      data.rootOrderNo = data.rootOrderNo || this.$route.query.parentNo
      if (!data.parentNo) {
        this.$message.error('退票parentNo为空')
        return
      }
      if (!data.rootOrderNo) {
        this.$message.error('rootOrderNo')
        return
      }
      this.$store.dispatch('productOrder/orderRefund', data)
        .then(data => {
          this.$message.success('退票入库成功')
          this.goBack()
        })
    },
    onSellChangeIn() {
      let data = {
        ...this.formData,
      }
      data.orderDetails = [...this.orderDetails, ...this.orderDetailsForChange.map(i => {
        i.changeFlag = true
        i.changeProductId = i.productId
        return i
      })];
      data.passengers = this.passengers;
      data.parentNo = data.parentNo || this.$route.query.parentNo
      data.rootOrderNo = data.rootOrderNo || this.$route.query.parentNo
      this.$store.dispatch('productOrder/orderChange', data)
        .then(data => {
          this.$message.success('改签入库成功')
          this.goBack()
        })
    }
  },
  created() {
    this.getData()
  },
  components: {
    Goods,
    Passengers,
    Refund,
    Change,
  },
  watch: {
    '$route.query': {
      handler(val) {
        console.warn('reload')
        this.getData()
      }
    }
  },
  computed: {
    disableForm() {
      if (this.formData.orderType != 'DRAFT') {
        return true
      }
      return false
    },
  }
};
</script>

<style lang="scss" scoped>
.order-header{
  padding: 15px;
  display: flex;
  align-items: center;
  padding: 15px;
  background: #fff;
  margin-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
