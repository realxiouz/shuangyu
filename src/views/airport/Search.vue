<template>
  <div>
    <el-form :inline="true" :model="formData">
      <el-form-item label="机场三字码">
        <el-input v-model="formData.airportCode" placeholder="机场三字码"></el-input>
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
  export default {
    name: "airportSearch",
    data() {
      return {
        formData: {
          airportCode: ""
        }
      };
    }
  };
</script>
