<template>
  <el-container>
    <el-aside width="auto">
      <Sidebar :menuList="menuList" :collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
      </el-header>
      <el-main>
        <section class="app-home">
          <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
          </transition>
        </section>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/components/SideBar.vue";
// @ is an alias to /src
export default {
  name: "layout",
  components: { Sidebar },
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
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #304156;
  text-align: center;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body .el-container {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
