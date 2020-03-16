<template>
  <div>
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="api名称">
      <el-input v-model="searchForm.apiName" placeholder="api名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search"  @click="$emit('onSearch',searchForm)">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit" @click="$emit('onAdd',)">添加</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
    export default {
        name: "apiSearch",
      data() {
        return {
          searchForm: {
            apiName: "",
          }
        };
      },
      methods:{


      },
    }
</script>

<style scoped>

</style>
