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
        <el-col :span="12">
          <el-form-item label="蜗牛手续费:">
            <span>{{formData.refundFeeInfo.refundFee}} / 人</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
          :data="refundData"
          highlight-current-row
          @selection-change="handleSelectionChange"
          fit
          style="width: 100%;"
        >
          <el-table-column type="selection" :selectable="selectable" width="55"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="cardType" :formatter="formatCardType" label="证件类型" align="center"></el-table-column>
          <el-table-column prop="cardNum" label="证件号" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row"
              >{{scope.row.refundSearchResult.tgqReasons[0].refundPassengerPriceInfoList[0].basePassengerPriceInfo.cardNum}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ageType" label="乘机人类型" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row"
              >{{scope.row.refundSearchResult.tgqReasons[0].refundPassengerPriceInfoList[0].basePassengerPriceInfo.passengerTypeStr}}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" align="center">
            <template slot-scope="scope">
              <span>{{formatAmount(scope.row.refundSearchResult.tgqReasons[0].refundPassengerPriceInfoList[0].basePassengerPriceInfo.ticketPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ticketNum" label="票号" align="center"></el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item label="销售退改说明:">
        <span v-if="this.showFlight">{{this.refundChangeRule}}</span>
        <div>
          <span v-if="this.showFlight">（销售航班信息：{{this.showFlight}}）</span>
          <span v-if="this.reason" style="color:red;">{{this.reason}}</span>
        </div>
      </el-form-item>
      <el-form-item label="蜗牛退改说明:">
        <span v-if="this.tgqText" v-html="this.tgqText"></span>
        <span v-else>暂无数据</span>
      </el-form-item>
    </el-form>
    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancelRefund')">取 消</el-button>
      <el-button size="mini" @click="handleSave" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
import { formatCardType } from "@/utils/status.js";

export default {
  name: "handleTicket",
  props: ["purchaseOrderNo", "refundChangeRule"],
  data() {
    return {
      tgqReasons: "",
      refundData: [],
      tgqText: "",
      showFlight: "",
      reason: "",
      flightInfo: "",
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
        ]
      }
    };
  },
  methods: {
    formatCardType,
    // 表格复选框选中处理
    handleSelectionChange(rows) {
      let str = "";
      rows.forEach(row => {
        str += row.id + ",";
      });
      str = str.substring(0, str.length - 1);
      this.formData.passengerIds = str;
    },
    // 默认选中表格复选框
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          if (row.refundSearchResult.canRefund) {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          }
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 退票申请
    handleSave() {
      this.$emit("onSaveRefund", this.formData);
    },
    // 判断是否可以退票
    selectable(row, index) {
      if (row.refundSearchResult.canRefund) {
        return true;
      } else {
        return false;
      }
    },
    // 表格复选框
    selectTgqReasons(value) {
      let code = value;
      this.tgqReasons.forEach(item => {
        if (item.code === code) {
          this.formData.refundFeeInfo =
            item.refundPassengerPriceInfoList[0].refundFeeInfo;
        }
      });
    },
    // 退票查询
    refundSearchData(purchaseOrderNo) {
      this.$store
        .dispatch("order/refundSearch", purchaseOrderNo)
        .then(data => {
          if (data) {
            this.formData.appKey = data.appKey;
            this.refundData = data.result;
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
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatAmount(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    }
  },
  computed: {},
  created() {
    this.refundSearchData(this.purchaseOrderNo);
    // this.refundSearchData("fma200415125908106");
  },
  updated() {
    this.toggleSelection(this.refundData);
  }
};
</script>
