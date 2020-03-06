<template>
  <div class="sidebar-container">
    <el-scrollbar>
      <el-menu
        router
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse="collapse"
      >
        <sidebar-item v-for="menu in menuList" :key="menu.uri" :item="menu"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import SidebarItem from "./SidebarItem";

  export default {
    name: "Sidebar",
    components: { SidebarItem },
    props: {
      menuList: {
        type: Array,
        required: true
      },
      collapse: {
        type: Boolean,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .sidebar-container {
    transition: width 0.28s;
    height: 100%;
    overflow: hidden;

    .el-scrollbar {
      background-color: #304156;
    }
  }

</style>
