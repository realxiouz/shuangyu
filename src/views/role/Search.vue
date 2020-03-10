<template>
  <el-row align="left">
        <el-input v-model="keyword" placeholder="请输入角色名称" style="width: 20%; margin-right: 10px"></el-input>
        <el-button type="primary" @click="$emit('onSearch',keyword)">查询</el-button>
        <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
  </el-row>
</template>

<script>
  export default {
    name: "roleSearch",
    data() {
      return {
        keyword:''
      };
    }
  };
</script>
