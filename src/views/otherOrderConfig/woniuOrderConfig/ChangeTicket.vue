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
      :border="false"
    >
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="orderNo" label="订单号" width="150" align="center"></el-table-column>
      <el-table-column prop="orderStatusDesc" label="订单状态" width="110" align="center"></el-table-column>
      <el-table-column label="订单日期" prop="createTime" align="center" width="120"></el-table-column>
      <el-table-column label="乘机人" width="90" align="center">
        <template slot-scope="scope">
          <span v-html="formatPassengers(scope.row.passengerInfos)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="payStatusDesc" label="支付状态" width="110" align="center"></el-table-column>
      <el-table-column prop="changeFee" label="改签费" align="center">
        <template slot-scope="scope">
          <span v-html="formatAmount(scope.row.changeFee)"></span>
        </template>
      </el-table-column>
      <el-table-column label="票号" width="120" align="center">
        <template slot-scope="scope">
          <span v-html="formatTicketNo(scope.row.passengerInfos)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="平台账号" width="100" align="center"></el-table-column>
      <el-table-column label="原航班信息" align="center">
        <el-table-column prop="flightNo" label="航班号" width="70" align="center"></el-table-column>
        <el-table-column prop="depDate" label="航班日期" width="120" align="center"></el-table-column>
        <el-table-column prop="dep" label="起飞地" width="150" align="center"></el-table-column>
        <el-table-column prop="arr" label="到达地" width="150" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="改签航班信息" align="center">
        <el-table-column prop="flightNo" label="航班号" width="70" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlightNo(scope.row.changeFlightInfos)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="depDate" label="航班日期" width="120" align="center">
          <template slot-scope="scope">
            <span v-html="formatDepDate(scope.row.changeFlightInfos)"></span>
          </template>
        </el-table-column>
        <el-table-column label="起飞-到达" width="90" align="center">
          <template slot-scope="scope">
            <span v-html="formatFlight2(scope.row.changeFlightInfos)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="depDate" label="舱位" width="70" align="center">
          <template slot-scope="scope">
            <span v-html="formatCabin(scope.row.changeFlightInfos)"></span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button disabled @click="onEdit(scope.row)" type="primary" size="mini">查看</el-button>
          <el-button disabled @click="handleDelete(scope.row)" type="danger" size="mini">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatAmount, formatFlight2 } from "@/utils/orderFormdata.js";

export default {
  name: "changeTicketList",
  props: ["tableData", "loading"],
  data() {
    return {
      searchParams: {}
    };
  },
  components: {},
  methods: {
    formatFlight2,
    formatAmount,
    handleSave(formData) {},
    handleCancel() {},
    onEdit(row) {},
    handleDelete(row) {},
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
    formatFlightNo(data) {
      if (!data || data.length == 0) {
        return "";
      }
      return data[0].flightNo;
    },
    formatCabin(data) {
      if (!data || data.length == 0) {
        return "";
      }
      return data[0].cabin;
    },
    formatDepDate(data) {
      if (!data || data.length == 0) {
        return "";
      }
      return data[0].depDate;
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
    },

    formatChangeOrderNo(data) {
      if (!data || data.length == 0) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item.changeOrderNo + "<br/>";
      });
      return str;
    }
  },
  created() {}
};
</script>
