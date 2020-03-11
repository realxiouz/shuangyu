<template>
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="用户名">
      <el-input v-model="searchForm.user" placeholder="应用名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onSearch',searchForm)">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onAdd',true)">添加</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
    export default {
        name: 'policySearch',
        data() {
            return {
                searchForm:{
                    user:'',
                    domain:''
                }
            }
        }
    }
</script>
