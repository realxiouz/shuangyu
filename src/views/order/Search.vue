<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="searchForm" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="乘机人姓名:">
            <el-input v-model="searchForm.passengerName" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单号:">
            <el-input v-model="searchForm.orderNo" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="票号:">
            <el-input v-model="searchForm.rootOrderNo" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="PNR:">
            <el-input v-model="searchForm.pnr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单状态:">
            <el-select v-model="searchForm.status" placeholder="全部" style="width: 100%;">
              <el-option label="出票中" value="ing"></el-option>
              <el-option label="退票完成" value="exit"></el-option>
              <el-option label="出票完成" value="ok"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航班起始日期:">
            <el-col>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="searchForm.flightStartDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航班截止日期:">
            <el-col>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="searchForm.flightEndDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航班号:">
            <el-input v-model="searchForm.flightCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单类型:">
            <el-select v-model="searchForm.orderType" placeholder="选择类型" style="width: 100%;">
              <el-option label="测试1" value="1"></el-option>
              <el-option label="测试2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单来源:">
            <el-select v-model="searchForm.orderSource" placeholder="全部" style="width: 100%;">
              <el-option label="去哪网" value="qunawang"></el-option>
              <el-option label="飞猪" value="feizhu"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="18" :lg="10" :xl="10">
          <el-form-item label="航程类型:">
            <el-radio-group v-model="searchForm.voyageType">
              <el-radio label="单程" value="0">单程</el-radio>
              <el-radio label="往返" value="1">往返</el-radio>
              <el-radio label="连程" value="2">连程</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button type="primary" size="mini" @click="$emit('onSearch', searchForm)">查询</el-button>
      <el-button type="primary" size="mini" @click="$emit('onAdd')">添加</el-button>
    </el-col>
  </el-row>
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
        dptTime: "", //航班起飞时间
        arrTime: "", //航班到达时间
        status: "", //订单状态
        pnr: "", //PNR
        rootOrderNo: "", //票号
        orderNo: "", //订单号
        passengerName: "" //乘机人姓名
      }
    };
  }
};
</script>
