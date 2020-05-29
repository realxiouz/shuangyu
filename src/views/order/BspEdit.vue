<template>
  <div class="order-container">
    <!--    <el-form :inline="true" ref="form"  :model="formData">-->
    <el-table
      ref="paramTable"
      size="mini"
      :data="tableData"
      style="width: 100%;"
      border
      default-expand-all
    >
      <el-table-column prop="label" label="乘机人" width="200" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="订单号">
        <template slot-scope="scope">
          <span>{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="票号">
        <template slot-scope="scope">
          <el-input
            placeholder="请输入内容"
            v-model="scope.row.ticketNo"
            v-bind:type="scope.row.inputType"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" style="text-align:right;">
      <el-button size="mini" type="primary" @click="$emit('onCancel')">取消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
    </div>
    <!--    </el-form>-->
  </div>
</template>
<script>
  function defaultData() {
    return {
      orderNo: '',
      rootOrderNo: ""
    };
  };
  export default {
    name: "orderEdit",
    props: ["orderDetailList"],
    data() {
      return {
        tableData: [],
        loading: false,
        formData: defaultData,
      };
    },
    methods: {
      handleSave() {
        this.$store
          .dispatch("order/updateBspTicketNo", this.tableData)
          .then(() => {
            this.goBack();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    ,
    created() {
      this.tableData = this.orderDetailList;
    }
  }
  ;
</script>

