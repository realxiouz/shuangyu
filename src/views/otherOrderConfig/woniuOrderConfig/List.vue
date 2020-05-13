<template>
  <div class="bigBox">
    <div class>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="出票订单" name="goTicket">
          <go-ticket @onLoadData="loadData" :tableData="tableData" ></go-ticket>
        </el-tab-pane>
        <el-tab-pane label="退票订单" name="refundTicket">
          <refund-ticket @onLoadData="loadData" :tableData="tableData"></refund-ticket>
        </el-tab-pane>
        <el-tab-pane label="改签订单" name="changeTicket">
          <change-ticket @onLoadData="loadData" :tableData="tableData"></change-ticket>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import goTicket from "./GoTicket";
import changeTicket from "./ChangeTicket";
import refundTicket from "./RefundTicket";

export default {
  name: "qunarOrderConfig",
  data() {
    return {
      activeName: "goTicket",
      tableData: [],
      searchParams: {
        orderType: 10
      }
    };
  },
  components: {
    goTicket,
    changeTicket,
    refundTicket
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.name) {
        case "goTicket":
          this.searchParams.orderType = 10;
          this.loadData(this.searchParams);
          break;
        case "refundTicket":
          this.searchParams.orderType = 20;
          this.loadData(this.searchParams);
          break;
        case "changeTicket":
          this.searchParams.orderType = 30;
          this.loadData(this.searchParams);
          break;
      }
    },
    loadData(params) {
      this.$store
        .dispatch("woniuOrderConfig/getList", { filters: params })
        .then(data => {
          if (data) {
            this.loadTotal(params);
            console.log(data, "daa");
            this.tableData = data;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    loadTotal(params) {
      this.$store
        .dispatch("woniuOrderConfig/getTotal", { filters: params })
        .then(data => {
          if (data) {
            this.total = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.loadData(this.searchParams);
  }
};
</script>
