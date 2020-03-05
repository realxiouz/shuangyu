<template>
  <div>
    <el-form :inline="true" :model="formData">
      <el-form-item label="姓名">
        <el-input v-model="formData.fullName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formData.gender" placeholder="性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
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
    name: "userSearch",
    data() {
      return {
        formData: {
          fullName: "",
          gender: ""
        }
      };
    }
  };
</script>

<style scoped>

</style>
