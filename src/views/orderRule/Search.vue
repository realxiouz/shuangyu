<template>
  <div>
    <el-form :inline="true" :model="formData">
      <el-form-item label="规则名称">
        <el-input v-model="formData.orderRuleName" placeholder="规则名称"></el-input>
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
    name: "orderRuleSearch",
    data() {
      return {
        formData: {
          orderRuleName: ""
        }
      };
    }
  };
</script>

<style scoped>

</style>
