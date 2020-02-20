<template>
  <el-container>
    <el-aside width="auto">
      <Sidebar :menuList="menuList" :collapse="isCollapse"/>
    </el-aside>
    <el-main>
      <div class="app-header">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <span class="nav-switch" v-bind:class="switchClass" @click="handleSwitch"/>
              <el-breadcrumb class="nav-router" separator="/" >
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">

            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    设置<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
        <div class="tags-view">
          <el-tag
            class="tags-view-item"
            v-for="tag in tags"
            :key="tag.name"
            :closable="tag.closable"
            :type="tag.type">
            {{tag.name}}
          </el-tag>
        </div>
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
    components: { Sidebar },
    data() {
      return {
        isCollapse: false,
        tags: [
          { name: "首页", closable: false, type: "" },
          { name: "用户管理", closable: true, type: "success" },
          { name: "添加用户", closable: true, type: "info" }
        ]
      };
    },
    computed: {
      switchClass() {
        if (this.isCollapse)
          return "el-icon-s-unfold";
        else return "el-icon-s-fold";
      },
      key() {
        return this.$router.path;
      },
      menuList() {
        console.log(this.$router.options.routes);
        return this.$router.options.routes;
      }
    },
    methods: {
      handleSwitch() {
        this.isCollapse = !this.isCollapse;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleLink(route) {
        console.log(route);
        this.$router.push(route.path);
      },
      handleCommand(command) {
        switch (command) {
          case "logout":
            this.handleLogout();
            break;
        }

      },
      handleLogout() {
        this.$store
          .dispatch("user/signOut")
          .then(() => {
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
          });
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
      height: 80px;
      overflow: hidden;
      position: relative;
      background: #fff;
      -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

      .grid-content {
        height: 50px;
        display: table-cell;
        vertical-align: middle;
      }

      .nav-switch {
        display: inline-block;
        font-size: 28px;
      }

      .nav-router
      {
        display: inline-block;
        height: 18px;
      }

      .tags-view-item {
        margin: 0 5px;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
      }
    }

    .app-main {
      padding: 20px;
    }
  }

  body .el-container {
    height: 100%;
  }
</style>
