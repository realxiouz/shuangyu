<template>
  <div>
    <el-form
      :model="formData"
      ref="handleTicketForm"
      :rules="formRules"
      label-width="120px"
      size="mini"
      style="margin-top:15px;"
    >
      <el-row style="margin-bottom:15px;" :gutter="15">
        <el-col :span="6">
          <span>销售单金额：</span>
          <span style="color:red;">{{formatAmount(this.salesAmountTotal)}}</span>
        </el-col>
        <el-col v-for="item in passengerData" :key="item.cardNo" :span="5">
          <span>{{item.name}} :</span>
          <span style="color:red;">{{formatAmount(item._amount)}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item v-show="this.isWoniu">
            <el-radio-group @change="radioChange" v-model="formData.radio" style="width:100%">
              <el-radio label="1">导单</el-radio>
              <el-radio label="2">补单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="供应商:" prop="merchantId">
            <el-select
              clearable
              filterable
              @change="selectSupplier"
              placeholder="请选择供应商"
              v-model="formData.merchantId"
              style="width: 100%"
            >
              <el-option
                v-for="item in supplierData"
                :key="item.merchantId"
                :label="item.firm.firmName"
                :value="item.merchantId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商账号:">
            <el-select
              clearable
              filterable
              @change="selectAccount"
              placeholder="请选择供应商账号"
              v-model="formData.accountId"
              style="width: 100%"
            >
              <el-option
                v-for="item in supplierAccountData"
                :key="item.accountId"
                :label="item.username"
                :value="item.accountId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单号:">
            <el-input clearable v-model="formData.sourceOrderNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="this.isWoniu && this.isWoniuTicket">
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单类型:" prop="orderType">
              <el-select
                v-model="formData.orderType"
                clearable
                placeholder="订单类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="金额:" prop="amount">
              <el-input clearable v-model="formData.amount"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="资金账号:" prop="fundAccount">
              <el-select
                v-model="formData.fundAccount"
                filterable
                clearable
                placeholder="请选择资金账号"
                style="width: 100%"
              >
                <el-option
                  v-for="item in accountData"
                  :key="item.accountId"
                  :label="item.accountName"
                  :value="item.accountId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单日期:" prop="createTime">
              <el-date-picker
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择日期"
                v-model="formData.createTime"
                style="width: 100%;"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单类型:" prop="orderType">
              <el-select
                v-model="formData.orderType"
                clearable
                placeholder="订单类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付金额:" prop="amount">
              <el-input clearable v-model="formData.amount"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="利润金额:" prop="profit">
              <el-input clearable v-model="formData.profit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务完结时间:" prop="finishTime">
              <el-date-picker
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择业务完结时间"
                v-model="formData.finishTime"
                style="width: 100%;"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资金账号:" prop="fundAccount">
              <el-select
                v-model="formData.fundAccount"
                filterable
                clearable
                placeholder="请选择资金账号"
                style="width: 100%"
              >
                <el-option
                  v-for="item in accountData"
                  :key="item.accountId"
                  :label="item.accountName"
                  :value="item.accountId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出发地:" prop="dpt">
              <el-input clearable v-model="formData.dpt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到达城市:" prop="arr">
              <el-input clearable v-model="formData.arr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="航班号:" prop="flightCode">
              <el-input clearable v-model="formData.flightCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出发日期:" prop="flightDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.flightDate"
                style="width: 100%;"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出发时间:" prop="dptTime">
              <el-time-select
                v-model="formData.dptTime"
                :picker-options="{
                start: '00:00',
                step: '00:05',
                end: '23:55'}"
                placeholder="出发时间"
                style="width: 100%;"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到达时间:">
              <el-time-select
                v-model="formData.arrTime"
                :picker-options="{
                start: '00:00',
                step: '00:05',
                end: '23:55'}"
                placeholder="到达时间"
                style="width: 100%;"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="舱位代码:">
              <el-input clearable v-model="formData.cabin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注:">
              <el-input type="textarea" :rows="2" clearable v-model="formData.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-table
          :data="formData.passengers"
          size="mini"
          highlight-current-row
          style="width: 100%;"
          fit
        >
          <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>
          <el-table-column prop="gender" label="性别" width="50" align="center"></el-table-column>
          <el-table-column
            prop="ageType"
            :formatter="formatAgeType"
            label="乘机人类型"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="cardType"
            :formatter="formatCardType"
            label="乘机人证件类型"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column prop="amount" label="价格" align="center" width="150">
            <template slot-scope="scope">
              <el-input clearable v-model="scope.row.amount" required="required"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="cardNo" label="乘机人证件号" align="center" width="220">
            <template slot-scope="scope">
              <el-input clearable v-model="scope.row.cardNo"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="ticketNo" label="票号" align="center">
            <template slot-scope="scope">
              <el-input clearable v-model="scope.row.ticketNo"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button
        size="mini"
        v-if="!(this.isWoniu && this.radio==1)"
        type="primary"
        @click="handleSaveTicket"
      >保存并贴票</el-button>
      <el-button
        size="mini"
        type="primary"
        v-if="this.isWoniu && this.radio==1"
        @click="handleSave"
      >保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  formatAgeType,
  formatCardType,
  statusData,
  orderType
} from "@/utils/status.js";
import { formatAmount } from "@/utils/orderFormdata.js";

export default {
  name: "handleTicket",
  props: [
    "passengerData",
    "flightData",
    "sellAmount",
    "taskType",
    "salesAmountTotal"
  ],
  data() {
    return {
      isWoniu: false,
      accountData: [],
      supplierData: [],
      supplierAccountData: [],
      orderType: orderType,
      isWoniuTicket: true,
      formData: {
        arr: this.flightData[0].arr,
        dpt: this.flightData[0].dpt,
        flightCode: this.flightData[0].flightCode,
        dptTime: this.flightData[0].dptTime,
        arrTime: this.flightData[0].arrTime,
        flightDate: this.flightData[0].flightDate,
        cabin: this.flightData[0].cabin,
        remark: "",
        orderSource: "",
        fundAccount: "",
        createTime: "",
        passengers: this.passengerData,
        ticketNoFlag: "0",
        userNameType: 0,
        amount: "",
        accountId: "",
        radio: "2",
        profit: "",
        orderType: 10,
        merchantId: ""
      },
      statusData: statusData,
      formRules: {
        orderType: [{ required: true, message: "必填项", trigger: "change" }],
        merchantId: [{ required: true, message: "必填项", trigger: "change" }],
        amount: [{ required: true, message: "必填项！", trigger: "blur" }],
        finishTime: [{ required: true, message: "必填项！", trigger: "blur" }],
        createTime: [{ required: true, message: "必填项！", trigger: "blur" }],
        fundAccount: [{ required: true, message: "必填项！", trigger: "blur" }],
        profit: [{ required: true, message: "必填项！", trigger: "blur" }],
        dpt: [{ required: true, message: "必填项！", trigger: "blur" }],
        arr: [{ required: true, message: "必填项！", trigger: "blur" }],
        flightCode: [{ required: true, message: "必填项！", trigger: "blur" }],
        flightDate: [{ required: true, message: "必填项！", trigger: "blur" }],
        dptTime: [{ required: true, message: "必填项！", trigger: "blur" }]
      }
    };
  },
  methods: {
    formatAgeType,
    formatCardType,
    formatAmount,
    // 保存并贴票
    handleSaveTicket() {
      var validFlag = false;
      this.$refs["handleTicketForm"].validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          validFlag = true;
          return false;
        }
      });
      if (validFlag) {
        return;
      }
      this.formData.ticketNoFlag = "1";
      this.formData.flightData = this.flightData;
      if (this.taskType == 1) {
        let amountTotal = 0;
        var flag = false;
        this.formData.passengers.forEach(item => {
          if (item.amount && item.amount != "" && Number(item.amount) < 0) {
            amountTotal += Number(item.amount);
          } else {
            flag = true;
          }
        });
        /*if (flag) {
          this.$notify({
            title: "提示",
            message: "填写人的金额，需填写负数！",
            type: "warning",
            duration: 4500
          });
          return;
        }*/
        if (amountTotal != this.formData.amount) {
          this.$notify({
            title: "提示",
            message: "金额填写错误，请重新填写！",
            type: "warning",
            duration: 4500
          });
          return;
        }
        let _profit = 0;
        _profit = Number(this.formData.amount) + Number(this.sellAmount);
        if (_profit != this.formData.profit) {
          this.$notify({
            title: "提示",
            message: "利润金额计算错误，请重新计算！",
            type: "warning",
            duration: 4500
          });
          return;
        }
      }
      this.$emit("onSaveTicket", this.formData);
    },
    //判断是蜗牛导单还是出票
    radioChange(value) {
      if (value == "2") {
        this.radio = "2";
        this.isWoniuTicket = false;
      } else {
        this.radio = "1";
        this.isWoniuTicket = true;
        let userTypeFlag = false;
        for (var i = 0; i < this.supplierAccountData.length; i++) {
          if (
            this.supplierAccountData[i].accountId == this.formData.accountId &&
            this.isWoniu &&
            this.isWoniuTicket
          ) {
            if (
              this.supplierAccountData[i].username == "13064220090 " ||
              this.supplierAccountData[i].username == "15025130712"
            ) {
              this.formData.userNameType = 1;
              userTypeFlag = true;
              break;
            } else if (this.supplierAccountData[i].username == "13700600184") {
              this.formData.userNameType = 2;
              userTypeFlag = true;
              break;
            }
          }
        }
        if (!userTypeFlag) {
          delete this.formData.userNameType;
        }
      }
    },
    // 判断选中渠道是否是蜗牛
    selectAccount(value) {
      for (var i = 0; i < this.supplierAccountData.length; i++) {
        if (
          this.supplierAccountData[i].accountId == value &&
          this.isWoniu &&
          this.isWoniuTicket
        ) {
          if (
            this.supplierAccountData[i].username == "13064220090 " ||
            this.supplierAccountData[i].username == "15025130712"
          ) {
            this.formData.userNameType = 1;
          } else if (this.supplierAccountData[i].username == "13700600184") {
            this.formData.userNameType = 2;
          } else {
            delete this.formData.userNameType;
          }
          break;
        } else {
          delete this.formData.userNameType;
        }
      }
      console.log(this.formData.userNameType);
    },
    // 获取资金账号
    getFinance() {
      this.$store
        .dispatch("fundAccount/getList", {
          filter: {}
        })
        .then(data => {
          this.accountData = data;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    // 获取供应商
    getSupplier() {
      this.$store
        .dispatch("firmMerchant/getList", {
          filter: { merchantType: 0 }
        })
        .then(data => {
          this.supplierData = data;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    // 获取供应商账号
    getSupplierAccount(value) {
      this.$store
        .dispatch("firmAccount/getList", {
          filter: { firmId: value }
        })
        .then(data => {
          this.supplierAccountData = data;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    // 判断选中渠道是否是蜗牛
    selectSupplier(value) {
      delete this.formData.userNameType;
      this.formData.accountId = "";
      for (var i = 0; i < this.supplierData.length; i++) {
        if (this.supplierData[i].merchantId == value) {
          this.formData.orderSource = this.supplierData[i].firm.firmName;
          break;
        }
      }
      if (value == "d381a4abdfa643fea6be8736dd11c1e1" || value == "746807b6d2ad40428d36b66d7bb8a79c") {
        this.isWoniu = true;
        if (this.formData.radio == "1") {
          this.isWoniuTicket = true;
        } else {
          this.isWoniuTicket = false;
        }
        this.formData.orderSource = "QUNAR_OPEN";
      } else {
        this.isWoniu = false;
      }
      this.getSupplierAccount(value);
    },
    // 保存
    handleSave() {
      var validFlag = false;
      this.$refs["handleTicketForm"].validate(valid => {
        if (!valid) {
          validFlag = true;
          return false;
        }
      });
      if (validFlag) {
        return;
      }
      this.formData.ticketNoFlag = "0";
      this.formData.flightData = this.flightData;
      if (this.formData.radio != "1" && this.taskType == 1) {
        let amountTotal = 0;
        var flag = false;
        this.formData.passengers.forEach(item => {
          if (item.amount && item.amount != "" && Number(item.amount) < 0) {
            amountTotal += Number(item.amount);
          } else {
            flag = true;
          }
        });
        /*if (flag) {
          this.$notify({
            title: "提示",
            message: "填写人的金额，需填写负数！",
            type: "warning",
            duration: 4500
          });
          return;
        }*/
        if (amountTotal != this.formData.amount) {
          this.$notify({
            title: "提示",
            message: "金额填写错误，请重新填写！",
            type: "warning",
            duration: 4500
          });
          return;
        }
        let _profit = 0;
        console.log("this.formData.amount" + this.formData.amount);
        console.log("this.sellAmount" + this.sellAmount);
        _profit = Number(this.formData.amount) + Number(this.sellAmount);
        console.log("_profit" + _profit);
        console.log("this.formData.profit" + this.formData.profit);
        if (_profit != Number(this.formData.profit)) {
          this.$notify({
            title: "提示",
            message: "利润金额计算错误，请重新计算！",
            type: "warning",
            duration: 4500
          });
          return;
        }
      }
      console.log(this.formData);
      this.$emit("onSave", this.formData);
    },
    // 日期格式化
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    }
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  },

  created() {
    this.getFinance();
    this.getSupplier();
  }
};
</script>
