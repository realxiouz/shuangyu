<template>
  <el-container>
    <el-aside width="auto">
      <Sidebar :menuList="menuList" :collapse="isCollapse"/>
    </el-aside>
    <el-main>
      <div class="app-header">
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-radio-group v-model="isCollapse">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="15">
            <div class="grid-content bg-purple">&nbsp;</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-dropdown @command="handleCommand">
                <el-button type="primary">
                  设置<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
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
      },
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this.handleLogout();
            break;
        }

      },
      handleLogout() {
        this.$store
          .dispatch("user/signOut")
          .then(() => {
            this.$router.push({path: "/login"});
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
