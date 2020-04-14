<template>
  <div>
    <el-table
      border
      :data="passengerData"
      size="mini"
      highlight-current-row
      style="width: 100%;"
      fit
    >
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
