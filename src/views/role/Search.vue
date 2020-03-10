<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :span="20">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="姓名">
          <el-input v-model="searchForm.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
      <el-col :span="4" class="search-tools">
        <el-button type="primary" @click="$emit('onSearch',searchForm)">查询</el-button>
        <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
      </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "roleSearch",
    data() {
      return {
        more: false,
        searchForm: {
          roleName: "",
        }
      };
    }
  };
</script>

<style scoped>

</style>
