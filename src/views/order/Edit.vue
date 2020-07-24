<template>
  <div class="order-container">
    <el-form :inline="true" ref="form" :rules="rules" :model="formData">
      <el-form-item label="订单号:" prop="orderNo">
        <el-input v-model="formData.orderNo"></el-input>
      </el-form-item>
      <el-form-item label="票号:" prop="rootOrderNo">
        <el-input v-model="formData.rootOrderNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('onSearch',formData)">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {MIXIN_EDIT} from "@/utils/mixin";
  function defaultData() {
    return {
      orderNo: '',
      rootOrderNo: ""
    };
  };
  export default {
    mixins: [MIXIN_EDIT],
    name: "orderEdit",

    data() {
      return {
        formData: defaultData,
      };
    }
  };
</script>

