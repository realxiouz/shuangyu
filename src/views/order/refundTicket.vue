<template>
  <div>
    <el-form
      :rules="formRules"
      :model="formData"
      label-width="110px"
      size="mini"
      style="margin-top:15px;"
    >
      <el-form-item label="退票原因:" prop="refundCauseId">
        <el-select
          clearable
          v-model="formData.refundCauseId"
          @change="selectTgqReasons"
          placeholder="请选择退票原因"
          style="width: 100%"
        >
          <el-option
            v-for="item in tgqReasons"
            :key="item.code"
            :label="item.msg"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退票备注:">
        <el-input placeholder="请输入退票备注..." v-model="formData.refundCause"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="profit" label="利润金额:">
            <el-input placeholder="请输入利润金额..." v-model="formData.profit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="蜗牛手续费:">
            <span>{{formData.refundFeeInfo.refundFee}} / 人</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成人可退金额:">
            <span>{{formData.refundFeeInfo.returnRefundFee}} / 人</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-model="formData.refundData" label-width="auto">
        <label class="el-form-item__label" style="color:#606266; width:110px;">乘车人:</label>
        <el-table
          ref="multipleTable"
          size="mini"
          :data="passagersRefund"
          highlight-current-row
          @selection-change="handleSelectionChange"
          fit
          style="width: 100%;"
        >
          <el-table-column type="selection" :selectable="selectable" width="55"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="cardType" :formatter="formatCardType" label="证件类型" align="center"></el-table-column>
          <el-table-column prop="cardNo" label="证件号" align="center"></el-table-column>
          <el-table-column prop="ageType" :formatter="formatAgeType" label="乘机人类型" align="center"></el-table-column>
          <el-table-column label="价格" prop="amount" align="center">
            <template slot-scope="scope">
              <span>{{formatAmount(scope.row.amount)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ticketNo" label="票号" align="center"></el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item label="销售退改说明:">
        <span v-if="this.showFlight">{{this.refundChangeRule}}</span>
        <div>
          <span v-if="this.showFlight">（销售航班信息：{{this.showFlight}}）</span>
          <span v-if="this.reason" style="color:red;">{{this.reason}}</span>
        </div>
        <div v-if="this.getRefundHtmlData">
          <el-row>
            <span>退票原因：{{this.getRefundHtmlData.reason}}</span>
          </el-row>
          <el-row>
            <span>实退金额:{{this.getRefundHtmlData.refundAmount}}</span>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="蜗牛退改说明:">
        <span v-if="this.tgqText" v-html="this.tgqText"></span>
        <span v-else>暂无数据</span>
      </el-form-item>
    </el-form>
    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" @click="handleSave" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
import { formatCardType, formatAgeType } from "@/utils/status.js";

export default {
  name: "refundTicket",
  props: [
    "refundChangeRule",
    "refundpassengers",
    "refundData",
    "getRefundHtmlData",
    "sellAmount"
  ],
  data() {
    return {
      tgqReasons: "",
      tgqText: "",
      showFlight: "",
      reason: "",
      flightInfo: "",
      orderDetailList: [],
      passagersRefund: [],
      selectPassenger: [],
      formData: {
        refundCauseId: "",
        refundFeeInfo: "",
        refundCause: "",
        passengerIds: "",
        appKey: ""
      },
      formRules: {
        refundCauseId: [
          { required: true, message: "请选择退票原因", trigger: "change" }
        ],
        profit: [
          {
            required: true,
            message: "请选择填写利润金额！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    formatCardType,
    formatAgeType,
    formatCardType,
    // 表格复选框选中处理
    handleSelectionChange(rows) {
      this.selectPassenger = rows;
      let str = "";
      rows.forEach(row => {
        str += row.id + ",";
      });
      str = str.substring(0, str.length - 1);
      this.formData.passengerIds = str;
      console.log(str);
    },
    // 判断乘客是否可以可以退票
    selectable(row, index) {
      if (row.canRefund) {
        return true;
      } else {
        return false;
      }
    },
    // 退票查询
    refundSearchData(purchaseOrderNo) {
      this.$store
        .dispatch("order/refundSearch", purchaseOrderNo)
        .then(data => {
          if (data) {
            this.formData.appKey = data.appKey;
            console.log(data, "data");
            if (this.orderDetailList) {
              for (let i = 0; i < this.orderDetailList.length; i++) {
                data.result.forEach(item => {
                  if (this.orderDetailList[i].name.indexOf(item.name) != -1) {
                    this.orderDetailList[i]["id"] = item.id;
                    this.orderDetailList[i]["canRefund"] =
                      item.refundSearchResult.canRefund;
                  }
                });
              }
              this.passagersRefund = this.orderDetailList;
            }
            if (data.result.length > 0) {
              if (data.result[0].refundSearchResult.tgqReasons) {
                this.tgqReasons = data.result[0].refundSearchResult.tgqReasons;
              }
              if (data.result[0].refundSearchResult.reason) {
                this.reason = data.result[0].refundSearchResult.reason;
              }
              if (data.result[0].refundSearchResult.refundRuleInfo) {
                this.tgqText =
                  data.result[0].refundSearchResult.refundRuleInfo.tgqText;
              }
              if (data.result[0].refundSearchResult.flightSegmentList) {
                this.flightInfo =
                  data.result[0].refundSearchResult.flightSegmentList[0];

                this.showFlight =
                  this.flightInfo.dptAirport +
                  "-" +
                  this.flightInfo.arrAirport +
                  "--" +
                  this.flightInfo.flightNo +
                  "-" +
                  this.flightInfo.dptDate +
                  " " +
                  this.flightInfo.dptTime;
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 退票原因选中处理
    selectTgqReasons(value) {
      let code = value;
      this.tgqReasons.forEach(item => {
        if (item.code === code) {
          this.formData.refundFeeInfo =
            item.refundPassengerPriceInfoList[0].refundFeeInfo;
        }
      });
    },
    handleSave() {
      let _profit = 0;
      let count = this.selectPassenger.length;
      _profit =
        Number(this.formData.refundFeeInfo.returnRefundFee) * count +
        Number(this.sellAmount);
      if (_profit != this.formData.profit) {
        this.$notify({
          title: "提示",
          message: "利润金额计算错误，请重新计算！",
          type: "warning",
          duration: 4500
        });
        return;
      }
      this.$emit("onSaveRefund", this.formData);
    },

    formatAmount(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    }
  },
  created() {
    let arr = [];
    for (let i = 0; i < this.refundpassengers.length; i++) {
      this.refundData.orderDetailList.forEach(item => {
        if (this.refundpassengers[i].cardNo.indexOf(item.cardNo) != -1) {
          arr.push(item);
        }
      });
    }
    this.orderDetailList = arr;
    this.refundSearchData(this.refundData.sourceOrderNo);
  }
};
</script>
