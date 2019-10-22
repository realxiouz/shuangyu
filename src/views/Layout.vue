<template>
  <el-container>
    <el-aside width="auto">
      <Sidebar :menuList="menuList" :collapse="isCollapse"/>
    </el-aside>
    <el-main>
      <div class="app-header">
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
      </div>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key"/>
        </transition>
      </section>
    </el-main>
  </el-container>
</template>

<script>
  import Sidebar from "@/components/SideBar.vue";
  // @ is an alias to /src
  export default {
    name: "layout",
    components: {Sidebar},
    data() {
      return {
        isCollapse: false
      };
    },
    computed: {
      key() {
        return this.$router.path;
      },
      menuList() {
        console.log(this.$router.options.routes);
        return this.$router.options.routes;
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleLink(route) {
        console.log(route);
        this.$router.push(route.path);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #304156;
    color: #304156;
    overflow: hidden;
  }

  .el-main {
    height: 100%;
    padding: 0;
    color: #333;

    .app-header {
      height: 50px;
      overflow: hidden;
      position: relative;
      background: #fff;
      -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }

    .app-main {
      padding: 20px;
    }
  }

  body .el-container {
    height: 100%;
  }
</style>
