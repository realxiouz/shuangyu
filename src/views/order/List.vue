<template>
  <div class="order-container">
    <!--    <orderEdit > </orderEdit>-->
    <order-search @onSearch="handleSearch" @onAdd="handleAdd"></order-search>
    <el-table
      :data="tableData"
      border="true"
      size="mini"
    >
      <el-table-column
        prop="orderNo"
        label="订单号"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="rootOrderNo"
        label="销售出票单号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="orderSource"
        label="订单来源"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="sourceOrderNo"
        label="订单来源单号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="policyCode"
        label="政策代码"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="policyType"
        label="政策类型"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="orderType"
        label="订单类型"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="50"
      ></el-table-column>
      <el-table-column
        label="最晚出票时限"
        width="120"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.deadlineTicketTime" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.deadlineTicketTime,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="RefundChangeRule"
        label="退改签说明"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="0：销售订单,1：采购订单"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="voyageType"
        label="航程类型"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="amount"
        label="金额"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="pnr"
        label="PNR"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="bigPnr"
        label="大编"
        width="100"
      ></el-table-column>
      <!--     操作  按钮  需要 编辑 添加 删除  -->
      <el-table-column fixed="right" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button
            @click="handleUpdate(scope.row)"
            type="primary"
            size="mini"
          >编辑
          </el-button
          >
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
    import orderSearch from "./Search.vue";
    import orderEdit from "./Edit.vue";

    export default {
        name: "orderList",
        data() {
            return {
                lastId: "0",
                pageFlag: "next",
                pageSize: 10,
                total: 0,
                dialogVisible: false,
                tableData: [],
            };
        },
        methods: {
            handleSearch() {
                this.$store
                    .dispatch("order/getList", {})
                    .then(data => {
                        this.tableData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleCancel() {
            },
            handleSave() {
            },
            /*初始化用工列表中的生日日期格式*/
            initDate(dateStr, format) {
                if (null != dateStr) {
                    let date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return '';
                }
            }
        },
        computed:{
            formatDate() {
                return function (dateStr, format) {
                    return this.initDate(dateStr, format);
                }
            },
        },
        components: {
            orderEdit,
            orderSearch
        },
        created() {
            this.handleSearch();
        },
    };
</script>
