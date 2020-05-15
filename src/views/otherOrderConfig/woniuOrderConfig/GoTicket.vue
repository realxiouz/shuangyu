<template>
  <div class="contentBox">
    <el-table
      :data="tableData"
      size="mini"
      highlight-current-row
      style="width: 100%;"
      v-loading="loading"
      max-height="650"
      fit
    >
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单号" width="150" align="center"></el-table-column>
      <el-table-column prop="orderStatusDesc" label="订单状态" width="150" align="center"></el-table-column>
      <el-table-column label="订单日期" prop="createTime" align="center" width="120"></el-table-column>
      <el-table-column label="乘机人" width="90" align="center">
        <template slot-scope="scope">
          <span v-html="formatPassengers(scope.row.passengerInfos)"></span>
        </template>
      </el-table-column>
      <el-table-column label="票号" width="120" align="center">
        <template slot-scope="scope">
          <span v-html="formatTicketNo(scope.row.passengerInfos)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="allPrice" label="价格" width="120" align="center">
        <template slot-scope="scope">
          <span v-html="formatAmount(scope.row.allPrice)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="账号" width="100" align="center"></el-table-column>
      <el-table-column prop="flightNo" label="航班号" width="70" align="center"></el-table-column>
      <el-table-column prop="depDate" label="航班日期" width="120" align="center"></el-table-column>
      <el-table-column prop="dep" label="起飞地" width="150" align="center"></el-table-column>
      <el-table-column prop="arr" label="到达地" width="150" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作"  width="180" align="center">
        <template slot-scope="scope">
          <el-button disabled @click="handleEdit(scope.row)" type="primary" size="mini">查看</el-button>
          <el-button disabled @click="handleDelete(scope.row)" type="danger" size="mini">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatAmount } from "@/utils/orderFormdata.js";

export default {
  name: "goTicketList",
  props: ["tableData", "loading"],
  data() {
    return {
      searchParams: {
        orderType: 10
      }
    };
  },
  components: {},
  methods: {
    formatAmount,
    handleSave(formData) {},
    handleCancel() {},
    handleEdit(row) {},
    handleDelete(row) {},
    formatDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    formatPassengers(data) {
      if (!data || data.length == 0) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item.personName + "<br/>";
      });
      return str;
    },
    formatTicketNo(data) {
      if (!data || data.length == 0) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item.tktno + "<br/>";
      });
      return str;
    }
  },
  created() {}
};
</script>
