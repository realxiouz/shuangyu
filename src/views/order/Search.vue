<template>
  <div>
    <el-form
      :inline="true"
      :model="formData"
      :label-position="labelPosition"
      label-width="100%"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="起始日期:">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formData.startDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束日期:">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formData.endDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="特殊查询:">
            <el-select v-model="formData.specialQuery" placeholder="全部">
              <el-option label="测试1" value="shanghai"></el-option>
              <el-option label="测试2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人电话:">
            <el-input v-model="formData.namePhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="乘机人姓名:">
            <el-input
              v-model="formData.nameAirplane"
              style="width: 230px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单号:">
            <el-input
              v-model="formData.orderNumber"
              style="width: 230px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="票号:">
            <el-input
              v-model="formData.ticketNumber"
              style="width: 230px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="PNR:">
            <el-input v-model="formData.PNR"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单状态:">
            <el-select v-model="formData.orderStatus" placeholder="全部">
              <el-option label="出票中" value="ing"></el-option>
              <el-option label="退票完成" value="exit"></el-option>
              <el-option label="出票完成" value="ok"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航班起始日期:">
            <el-col>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.flightStartDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航班截止日期:">
            <el-col>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.flightEndDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航班号:">
            <el-input v-model="formData.flightNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单类型:">
            <el-select v-model="formData.orderType" placeholder="选择类型">
              <el-option label="测试1" value="1"></el-option>
              <el-option label="测试2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单来源:">
            <el-select v-model="formData.orderSource" placeholder="全部">
              <el-option label="去哪网" value="qunawang"></el-option>
              <el-option label="飞猪" value="feizhu"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航程类型:">
            <el-radio-group v-model="formData.flightType">
              <el-radio v-model="radio" label="单程">单程</el-radio>
              <el-radio v-model="radio" label="往返">往返</el-radio>
              <el-radio v-model="radio" label="全部">全部</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="$emit('onSearch', formData)"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
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
      formData: {
        orderType: "", //订单类型
        flightType: "", //航程类型
        orderSource: "", //订单来源
        flightNumber: "", //航班号
        flightEndDate: "", //航班截止日期
        flightStartDate: "", //航班起始日期
        orderStatus: "", //订单状态
        PNR: "", //PNR
        ticketNumber: "", //票号
        orderNumber: "", //订单号
        nameAirplane: "", //乘机人姓名
        namePhone: "", //联系人电话
        specialQuery: "", //特殊查询
        endDate: "", //结束日期
        startDate: "" //起始日期
      }
    };
  }
};
</script>
