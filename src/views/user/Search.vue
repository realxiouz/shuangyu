<template>
  <el-container style="margin-bottom: 5px">
    <el-input v-model="keyword" style="width: 300px; margin:0 10px 0 50px ;" placeholder="请输入用户名..">
      <i class="el-icon-edit el-input__icon"
         slot="suffix"
         @click="$emit('onIconClick',keyword)">
      </i>
    </el-input>
    <el-button type="primary" @click="$emit('onSearch',keyword)">查询</el-button>
    <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
  </el-container>
</template>

<script>
  export default {
    name: "userSearch",
    data() {
      return {
        keyword: ''
      };
    }
  };
</script>
