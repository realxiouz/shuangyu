<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini" style="margin-top:15px;">
      <el-row>
        <el-col :span="12">
          <el-form-item label="乘客:">
            <span>{{formatPassengers(changeData.passengers)}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="航班:">
            <span>{{changeData.flights[0].flightCode}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起飞日期:">
            <span>{{formatFlightDate(changeData.flights)}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="舱位:">
            <span>{{changeData.flights[0].cabin}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="退改说明:">
        <span v-if="this.tgqText" v-html="this.tgqText"></span>
        <span v-else>暂无数据</span>
        <span v-if="this.reason" style="color:red;">{{this.reason}}</span>
      </el-form-item>
      <el-form-item label="改签原因:">
        <el-select
          clearable
          v-model="formData.changeCauseId"
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="改签备注:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="改签费:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item v-model="formData.refundData" label-width="auto">
        <label class="el-form-item__label" style="color:#606266; width:110px;">乘车人:</label>
        <el-table
          :data="changeData.orderDetailList"
          highlight-current-row
          ref="multipleTable"
          size="mini"
          fit
          style="width: 100%;"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="cardType" :formatter="formatCardType" label="证件类型" align="center"></el-table-column>
          <el-table-column prop="cardNo" label="证件号" align="center"></el-table-column>
          <el-table-column :formatter="formatAgeType" prop="ageType" label="乘机人类型" align="center"></el-table-column>
          <el-table-column label="价格" align="center">
            <template slot-scope="scope">
              <span>{{formatAmount(scope.row.amount)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ticketNo" label="票号" align="center"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-model="formData.refundData" label-width="auto">
        <label class="el-form-item__label" style="color:#606266; width:110px;">航班信息：</label>
        <el-table ref="multipleTable" size="mini" highlight-current-row fit style="width: 100%;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" width="60" label="航班号" align="center"></el-table-column>
          <el-table-column prop="cardType" width="60" label="出发地" align="center"></el-table-column>
          <el-table-column prop="cardNum" width="60" label="目的地" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row"></span>
            </template>
          </el-table-column>
          <el-table-column prop="ageType" label="起飞时间" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row"></span>
            </template>
          </el-table-column>
          <el-table-column label="到达时间" align="center"></el-table-column>
          <el-table-column prop label="舱位" width="50" align="center"></el-table-column>
          <el-table-column prop label="数显" width="60" align="center"></el-table-column>
          <el-table-column prop label="手续费" width="60" align="center"></el-table-column>
          <el-table-column prop label="升舱费" width="60" align="center"></el-table-column>
          <el-table-column prop label="总金额" width="80" align="center"></el-table-column>
          <el-table-column prop label="儿童改签费" align="center"></el-table-column>
          <el-table-column prop label="儿童升舱费" align="center"></el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancelChange')">取 消</el-button>
      <el-button size="mini" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
import { formatAgeType, formatCardType } from "@/utils/status.js";

export default {
  name: "changeTicket",
  props: ["changeData"],
  data() {
    return {
      changeDataResult: [],
      tgqReasons: "",
      reason: "",
      tgqText: "",
      formData: {
        appKey: ""
      }
    };
  },
  methods: {
    formatCardType,
    formatAgeType,
    // 改签查询
    changeSearchData(params) {
      this.$store
        .dispatch("order/changeSearch", params)
        .then(data => {
          if (data) {
            this.formData.appKey = data.appKey;
            this.changeDataResult = data.result;
            if (data.result.length > 0) {
              if (data.result[0].changeSearchResult.tgqReasons) {
                this.tgqReasons = data.result[0].changeSearchResult.tgqReasons;
              }
              if (data.result[0].changeSearchResult.changeRuleInfo) {
                this.tgqText =
                  data.result[0].changeSearchResult.changeRuleInfo.tgqText;
              }
              if (data.result[0].changeSearchResult.reason) {
                this.reason = data.result[0].changeSearchResult.reason;
              }
            }
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 格式化日期
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    // 格式化乘客
    formatPassengers(data) {
      if (!data || data.length == 0) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item.name + " / ";
      });

      return str.substring(0, str.length - 2);
    },
    // 格式化航班日期
    formatFlightDate(data) {
      if (!data || data.length == 0) {
        return "";
      }
      return this.initDate(data[0].flightDate, "YYYY-MM-DD");
    },
    // 格式化金额
    formatAmount(amount) {
      if (!amount) {
        return "￥0.00";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    }
  },
  computed: {},
  created() {
    let params = {};
    params.purchaseOrderNo = this.changeData.sourceOrderNo;
    params.changeDptDate = this.formatFlightDate(this.changeData.flights);
    let _params = {
      purchaseOrderNo: "ted200416125445810",
      changeDptDate: "2020-04-29"
    };
    this.changeSearchData(_params);
    console.log(this.changeData);
  }
};
</script>
