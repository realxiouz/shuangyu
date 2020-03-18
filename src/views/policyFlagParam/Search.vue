<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :span="20">
      <el-form :inline="true" :model="searchData">
        <el-form-item label="标签名称">
          <el-input v-model="searchData.flag" placeholder="标签名称"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4" class="search-tools">
      <el-button type="primary" icon="el-icon-search"  @click="$emit('onSearch',searchData)">查询</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="$emit('onAdd')">添加</el-button>
    </el-col>
  </el-row>
</template>
<script>
    export default {
        name:'flagParamSearch',
        data(){
            return{
                searchData:{
                    flag:''
                }
            }
        }
    }
</script>
