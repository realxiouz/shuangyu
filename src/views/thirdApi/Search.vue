<template>
  <div>
    <el-row type="flex" justify="space-between" align="bottom">
      <el-col :span="20">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="api名称">
            <el-input v-model="searchForm.apiName" placeholder="api名称"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" class="search-tools">
        <el-button type="primary" icon="el-icon-search" @click="$emit('onSearch',searchForm)">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$emit('onAdd')">添加</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "thirdapiSearch",
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
