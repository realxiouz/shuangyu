<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :span="20">
      <el-form :inline="true" :model="formData">
        <el-form-item label="平台名称">
          <el-input v-model="formData.thirdName" placeholder="平台名称"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4" class="search-tools">
      <el-button type="primary" @click="$emit('onSearch',formData)">查询</el-button>
      <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
      <el-button type="primary" @click="handleMore">更多</el-button>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "thirdpartySearch",
    data() {
      return {
        more: false,
        formData: {
          thirdName: "",
        }
      };
    },
    methods: {
      handleMore() {
        this.more = !this.more;
      }
    }
  };
</script>

<style scoped>

</style>
