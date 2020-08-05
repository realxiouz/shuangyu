<template>
  <div class="home contentBox">
    <div class="left">
      <el-tabs :tab-position="tabPosition" style="min-height: 200px;">
        <el-tab-pane label="订单通知管理"></el-tab-pane>
        <el-tab-pane label="订单接口管理"></el-tab-pane>
        <el-tab-pane label="订单更新管理"></el-tab-pane>
        <el-tab-pane label="政策配置管理"></el-tab-pane>
        <el-tab-pane label="政策导入管理"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="right" >
      <transition name="fade-transform" mode="out-in">
        <div>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

  export default {
    name: "firmConfig",
    data() {
    return {
      tabPosition: "left",
      current: 0,
      checked: false,
      form: {
        name: "",
        type: [],
      }
    };
  },
  methods: {
    goBack() {
      let lastName = localStorage.getItem("lastName");
      if (lastName) {
        this.$router.push({ name: lastName });
        localStorage.removeItem("lastName");
      } else {
        this.$router.go(-1);
      }
    },
    handleSave( ) {},
  },
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
}
.left{
  float: left;
}
.right{
  margin-top: -20px;
  margin-left: 150px;
}
.contentBox{
  min-height: 260px;
}
</style>