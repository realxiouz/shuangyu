<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini" style="margin-top:15px;">
      <el-row>
        <el-col :span="12">
          <el-form-item label="渠道:">
            <el-select
              clearable
              filterable
              @change="selectSource"
              placeholder="请选择渠道"
              v-model="formData.orderSource"
              style="width: 100%"
            >
              <el-option label="蜗牛" value="QUNAR_OPEN"></el-option>
              <el-option label="BSP" value="bsp"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原单号:">
            <el-input clearable v-model="formData.sourceOrderNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="订单日期:">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="formData.createTime"
              style="width: 100%;"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="订单状态:">
            <el-select
              v-model="formData.status"
              clearable
              placeholder="请选择订单状态"
              style="width: 100%"
            >
              <el-option
                v-for="item in statusData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="this.sourceFlag" label="蜗牛单类型:">
            <el-select
              v-model="formData.purchaseOrderType"
              clearable
              placeholder="请选择蜗牛单类型"
              @change="selectStatusData"
              style="width: 100%"
            >
              <el-option
                v-for="item in purchaseOrderTypeStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="this.sourceFlag" :label="this.selectStatusDataFlag?'应收:':'应付:'">
            <el-input clearable v-model="formData.amount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="订单类型:">
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
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="备注:">
            <el-input clearable v-model="formData.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="支付金额:">
            <el-input clearable v-model="formData.transactionAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="利润金额:">
            <el-input clearable v-model="formData.profit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="使用账号:">
            <el-input clearable v-model="formData.fundAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资金账号:">
            <el-select
              v-model="formData.accountId"
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
        <el-col :span="12">
          <el-form-item v-show="this.sourceFlag" label="蜗牛账号:">
            <el-select
              v-model="formData.userNameType"
              filterable
              clearable
              placeholder="请选择蜗牛账号"
              style="width: 100%"
            >
              <el-option label="15025130712" value="1"></el-option>
              <el-option label="13700600184" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="出发地:">
            <el-input clearable v-model="formData.dpt"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="到达城市:">
            <el-input clearable v-model="formData.arr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="航班号:">
            <el-input clearable v-model="formData.flightCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="出发日期:">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formData.flightDate"
              style="width: 100%;"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="出发时间:">
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
        <el-col :span="12">
          <el-form-item v-show="!this.sourceFlag" label="到达时间:">
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
      </el-row>
      <el-row>
        <el-col v-show="!this.sourceFlag" :span="12">
          <el-form-item label="舱位代码:">
            <el-input clearable v-model="formData.cabin"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      v-show="!this.sourceFlag"
      :data="passengerData"
      size="mini"
      highlight-current-row
      style="width: 100%;"
      fit
    >
      <el-table-column prop="name" label="姓名" width="80" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" width="50" align="center"></el-table-column>
      <el-table-column
        prop="ageType"
        :formatter="formatAgeType"
        label="乘机人类型"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column prop="cardType" :formatter="formatCardType" label="乘机人证件类型" align="center"></el-table-column>
      <el-table-column prop="cardNo" label="乘机人证件号" align="center">
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
    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button
        size="mini"
        v-if="this.passengerData[0].orderSource=='QUNAR_OPEN'"
        type="primary"
        @click="handleSaveTicket"
      >保存并贴票</el-button>
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  formatAgeType,
  formatCardType,
  orderType,
  statusData,
  purchaseOrderTypeStatus
} from "@/utils/status.js";
export default {
  name: "handleTicket",
  props: ["passengerData", "flightData"],
  data() {
    return {
      sourceFlag: false,
      selectStatusDataFlag: false,
      accountData: [],
      orderType: orderType,
      formData: {
        arr: this.flightData[0].arr,
        dpt: this.flightData[0].dpt,
        flightCode: this.flightData[0].flightCode,
        dptTime: this.flightData[0].dptTime,
        arrTime: this.flightData[0].arrTime,
        flightDate: this.flightData[0].flightDate,
        cabin: this.flightData[0].cabin,
        status: "",
        remark: "",
        orderSource: "",
        fundAccount: "",
        createTime: "",
        ticketNoFlag: "0",
        userNameType: "",
        amount: "",
        purchaseOrderType: ""
      },
      purchaseOrderTypeStatus: purchaseOrderTypeStatus,
      statusData: statusData
    };
  },
  methods: {
    formatAgeType,
    formatCardType,
    // 保存并贴票
    handleSaveTicket() {
      this.formData.ticketNoFlag = "1";
      this.$emit("onSaveTicket", this.formData);
    },
    // 判断选中渠道是否是蜗牛
    selectSource(value) {
      // console.log(value);
      if (value == "QUNAR_OPEN") {
        this.sourceFlag = true;
      } else {
        this.sourceFlag = false;
      }
    },
    // 订单状态判断是否退票显示应收
    selectStatusData(value) {
      if (value == 2) {
        this.selectStatusDataFlag = true;
      } else {
        this.selectStatusDataFlag = false;
      }
    },
    // 获取资金账号
    getFinance() {
      this.$store
        .dispatch("fundAccount/getList", {
          filter: {}
        })
        .then(data => {
          this.accountData = data.data;
          // console.log(data);
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    // 保存
    handleSave() {
      this.formData.flightData = this.flightData;
      this.formData.passengers = this.passengerData;
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
    // console.log(this.passengerData);
  }
};
</script>
