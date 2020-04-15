<template>
  <div>
    <el-table :data="passengerData" size="mini" highlight-current-row style="width: 100%;" fit>
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
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
      <el-table-column prop="cardNo" label="乘机人证件号" align="center"></el-table-column>
    </el-table>
    <el-form :model="formData" label-width="110px" size="mini" style="margin-top:15px;">
      <el-row>
        <el-col :span="12">
          <el-form-item label="出发地:">
            <span>{{formData.dpt}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达城市:">
            <span>{{formData.arr}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="航班号:">
            <!-- <el-input type="text" v-model="formData.flightCode"></el-input> -->
            <span>{{formData.flightCode}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出发日期:">
            <!-- <el-input type="text" v-model="formData.flightDate"></el-input> -->
            <span>{{formatDate(formData.flightDate,'YYYY-MM-DD')}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出发时间:">
            <span>{{formData.dptTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达时间:">
            <span>{{formData.arrTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="仓位代码:">
            <!-- <el-input type="text" v-model="formData.cabin"></el-input> -->
            <span>{{formData.cabin}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单号:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单日期:">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="formData.finishTime"
              style="width: 100%;"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="支付金额:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="利润金额:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单状态:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渠道:">
            <el-select clearable placeholder="请选择渠道" style="width: 100%">
              <el-option label="渠道1" :value="0"></el-option>
              <el-option label="渠道2" :value="1"></el-option>
              <el-option label="渠道3" :value="2"></el-option>
              <el-option label="渠道4" :value="3"></el-option>
              <el-option label="渠道5" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用账号:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="资金平台:">
            <el-select clearable placeholder="请选择平台" style="width: 100%">
              <el-option label="平台1" :value="0"></el-option>
              <el-option label="平台2" :value="1"></el-option>
              <el-option label="平台3" :value="2"></el-option>
              <el-option label="平台4" :value="3"></el-option>
              <el-option label="平台5" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资金账号:">
            <el-select clearable placeholder="请选择资金账号" style="width: 100%">
              <el-option label="资金账号1" :value="0"></el-option>
              <el-option label="资金账号2" :value="1"></el-option>
              <el-option label="资金账号3" :value="2"></el-option>
              <el-option label="资金账号4" :value="3"></el-option>
              <el-option label="资金账号5" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('handleTicketCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSaveTicket">保存并贴票</el-button>
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { formatAgeType, formatCardType } from "@/utils/status.js";
export default {
  name: "handleTicket",
  props: ["passengerData", "flightData"],
  data() {
    return {
      formData: {
        arr: this.flightData[0].arr,
        dpt: this.flightData[0].dpt,
        flightCode: this.flightData[0].flightCode,
        dptTime: this.flightData[0].dptTime,
        arrTime: this.flightData[0].arrTime,
        flightDate: this.flightData[0].flightDate,
        cabin: this.flightData[0].cabin
      }
    };
  },
  methods: {
    formatAgeType,
    formatCardType,
    handleSaveTicket() {
      this.$emit("onSaveTicket", this.formData);
    },
    handleSave() {
      this.$emit("onSave", this.formData);
    },
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
  }
};
</script>
