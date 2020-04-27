<template>
  <div class="contentBox">
    <el-row style="margin-bottom:15px; margin-left:38px;">
      <el-button icon="el-icon-plus" type="primary" size="mini">导入</el-button>
    </el-row>
    <el-form ref="formData" :model="formData" label-width="110px" size="mini">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单号:" prop="sourceOrderNo">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单状态:">
            <el-select
              v-model="formData.orderType"
              clearable
              placeholder="订单状态"
              style="width: 100%"
            >
              <el-option
                v-for="item in orderType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="类型:" prop="orderType">
            <el-select v-model="formData.orderType" placeholder="请选择">
              <el-option label="出票" :value="0"></el-option>
              <el-option label="退票" :value="1"></el-option>
              <el-option label="改签" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item>
            <el-button type="primary" size="mini">选择派遣人</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { orderType } from "@/utils/status.js";
function defaultData() {
  return {
    orderType: orderType
  };
}
export default {
  name: "exportOrder",
  data() {
    return {
      formData: defaultData()
    };
  },
  methods: {}
};
</script>