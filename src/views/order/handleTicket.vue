<template>
  <div>
    <el-table :data="passengerData" size="mini" highlight-current-row style="width: 100%;" fit>
      <el-table-column type="selection" width="55"></el-table-column>
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
    <el-form label-width="110px" size="mini" style="margin-top:15px;">
      <el-row>
        <el-col :span="12">
          <el-form-item label="出发地:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达城市:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="航班号:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出发日期:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出发时间:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达时间:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="仓位代码:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="到达城市:">
            <el-input></el-input>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单号:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单日期:">
            <el-input></el-input>
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
            <el-input placeholder="渠道"></el-input>
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
            <el-input placeholder="平台"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资金账号:">
            <el-input placeholder="账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSaveTicket">保存并贴票</el-button>
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import handleTicket from "./handleTicket";
import { formatAgeType, formatCardType } from "@/utils/status.js";
export default {
  name: "handleTicket",
  props: ["passengerData"],
  data() {
    return {};
  },
  methods: {
    formatAgeType,
    formatCardType,
    handleSaveTicket() {
      this.$emit("onSaveTicket");
    },
    handleSave() {
      this.$emit("onSave");
    }
  },
  created() {
    console.log(this.passengerData);
  }
};
</script>
