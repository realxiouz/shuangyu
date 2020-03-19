<template>
  <div>
    <el-form
      :inline="true"
      :model="searchForm"
      label-width="100"
      size="mini"
    >
      <el-form-item label="订单号:">
        <el-input
          v-model="searchForm.orderNo"
          style="width: 230px"
        ></el-input>
      </el-form-item>
      <el-form-item label="票号:">
        <el-input
          v-model="searchForm.rootOrderNo"
          style="width: 230px"
        ></el-input>
      </el-form-item>
      <el-form-item label="乘机人姓名:">
        <el-input
          v-model="searchForm.name"
          style="width: 230px"
        ></el-input>
      </el-form-item>
      <el-form-item label="乘机人证件号:">
        <el-input
          v-model="searchForm.cardNo"
          style="width: 230px"
        ></el-input>
      </el-form-item>
      <el-form-item label="PNR:">
        <el-input v-model="searchForm.pnr"></el-input>
      </el-form-item>
      <el-form-item label="订单状态:">
        <el-select v-model="searchForm.status" placeholder="全部">
          <el-option label="出票中" value="0"></el-option>
          <el-option label="退票完成" value="1"></el-option>
          <el-option label="出票完成" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出发日期:">
        <el-col>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="searchForm.flightDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="舱位:">
        <el-input v-model="searchForm.cabin"></el-input>
      </el-form-item>
      <el-form-item label="航班号:">
        <el-input v-model="searchForm.flightCode"></el-input>
      </el-form-item>
      <el-form-item label="订单类型:">
        <el-select v-model="searchForm.orderType" placeholder="选择类型">
          <el-option label="测试1" value="1"></el-option>
          <el-option label="测试2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单来源:">
        <el-select v-model="searchForm.orderSource" placeholder="全部">
          <el-option label="去哪网" value="qunawang"></el-option>
          <el-option label="飞猪" value="feizhu"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="航程类型:">
        <el-radio-group v-model="searchForm.voyageType">
          <el-radio label="单程" value="0">单程</el-radio>
          <el-radio label="往返" value="1">往返</el-radio>
          <el-radio label="连程" value="2">连程</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" class="filter-item" type="primary" @click="$emit('onSearch',searchForm)">查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-edit" class="filter-item" type="primary" @click="$emit('onAdd',true)">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "orderSearch",
        data() {
            return {
                labelPosition: "left",
                searchForm: {
                    orderType: "", //订单类型
                    voyageType: "", //航程类型
                    orderSource: "", //订单来源
                    flightCode: "", //航班号
                    flightDate: "", //出发日期
                    cabin: "", //舱位
                    status: "", //订单状态
                    pnr: "", //PNR
                    rootOrderNo: "", //票号
                    orderNo: "", //订单号
                    name: "", //乘机人姓名
                    cardNo: "" //乘机人证件号
                }
            };
        }
    };
</script>
