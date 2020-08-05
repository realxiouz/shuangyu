<template>
  <div class="home contentBox">
    <div>政策配置管理</div>
    <div class="page-back">
      <el-button-group>
        <el-button icon="el-icon-back" type="warning" @click="goBack"
          >返回</el-button
        >
        <el-button icon="el-icon-plus" type="primary" @click="handleSave"
          >保存</el-button
        >
      </el-button-group>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "orderPolicy"
};
</script>

<style scoped>
.el-row-item {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 20px 20px 0 0;
  width: 870px;
  margin-left: 20px;
}
.page-back {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
