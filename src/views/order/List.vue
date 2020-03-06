<template>
  <div class="order-container">
<!--    <orderEdit > </orderEdit>-->
    <order-search  @onSearch="handleCancel" @onAdd="handleSave"></order-search>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" border
              default-expand-all>
      <el-table-column
        prop="orderNumber"
        label="订单号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="flightType"
        label="类型"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="orderDate"
        label="订单日期"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="takeOffArrive"
        label="起飞-到达"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="flightDateNumber"
        label="航班日期/航班号"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="PNR"
        label="PNR"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="totalPriceNumber"
        label="总价/人数"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="policyId"
        label="政策ID"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="balance"
        label="是否退差额"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="lockingPeople"
        label="锁定人"
        width="100"
      ></el-table-column>

      <!--     操作  按钮  需要 编辑 添加 删除  -->
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300">
        <template slot-scope="scope">

          <el-button @click="handleUpdate(scope.row.deptId)" type="primary" size="mini">编辑</el-button>
          <el-button  type="danger" size="mini">删除
          </el-button>
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
      :total="total">
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
        tableData: null,
        labelPosition: 'left',
        searchForm: {},
        allRoles: [],
        paramsRoles: [],
      };
    },
    methods: {
      handleCancel(params) {
        console.log(params);
        // this.dialogVisible = false;
      },
      handleSave() {
        this.$router.push('/order/Edit_');

      }
    },
    addUser() {
      this.dialogVisible = false;
    },


    mounted() {
      this.loadData();
    },
    components: {
      orderEdit,
      orderSearch

    }

  };
</script>


