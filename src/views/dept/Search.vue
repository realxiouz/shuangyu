<template>
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="部门名称">
      <el-input v-model="searchForm.deptName" placeholder="请输入部门名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onSearch',searchForm)">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "deptSearch",
        data() {
            return {
                searchForm: {
                    deptName: ''
                }
            }
        }
    };
</script>


