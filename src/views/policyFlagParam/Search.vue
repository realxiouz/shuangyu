<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :span="10">
      <el-form :inline="true" :model="searchFrom">
<!--        <el-form-item label="参数标签">
          <el-input v-model="searchFrom.label" placeholder="标签名称"></el-input>
        </el-form-item>-->
        <el-form-item label="参数名称">
          <el-input v-model="searchFrom.name" placeholder="标签名称"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="10" class="search-tools">
      <el-button type="primary" icon="el-icon-search" @click="$emit('onSearch',searchFrom)">查询</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="$emit('onAdd')">添加</el-button>
    </el-col>
  </el-row>
</template>
<script>
    export default {
        name: 'flagParamSearch',
        data() {
            return {
                searchFrom: {
                    name: ''
                }
            }
        }
    }
</script>
