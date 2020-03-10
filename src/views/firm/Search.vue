<template>
  <div>
    <el-input v-model="keyword" style="width: 300px; margin-left: 50px;" placeholder="请输入企业名称..">
      <i class="el-icon-edit el-input__icon"
         slot="suffix"
         @click="handleIconClick">
      </i>
    </el-input>
    <el-button type="primary" icon="el-icon-search" @click="$emit('onSearch',keyword)"></el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keyword: ''
      };
    },
    methods: {
      /*清空搜索框内的关键字*/
      handleIconClick() {
        this.keyword = "";
      }
    }
  };
</script>
