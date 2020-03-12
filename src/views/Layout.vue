<template>
  <el-container>
    <el-aside width="auto" :style="{display:display}">
      <Sidebar :menuList="menuList" :collapse="isCollapse"/>
    </el-aside>
    <el-main>
      <div class="app-header">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <span class="nav-switch" v-bind:class="switchClass" @click="handleSwitch"/>
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
        <el-breadcrumb class="nav-router" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-page-header @back="goBack" content="添加用户">
        </el-page-header>
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
        ],
        display:"block",
        fullWidth:document.documentElement.clientWidth

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
        return this.$router.options.routes;
      }
    },
    created(){
      window.addEventListener('resize', this.handleResize)
    },
    methods: {
      goBack() {
      },
      handleResize (event) {
        // console.log(this.fullWidth)
        this.fullWidth = document.documentElement.clientWidth
        if(this.fullWidth<501){
          this.display="none"
        }else if (this.fullWidth<1000){
          this.display="block"
          this.isCollapse = true;
        }else {
          this.isCollapse = false;
        }
      },
      handleSwitch() {
        this.display="block"

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

  .el-main {
    height: 100%;
    padding: 0;
    color: #333;
    background-color: #F0F2F5;

    .app-header {
      height: 175px;
      overflow: hidden;
      position: relative;
      background: #fff;
      -webkit-box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.08);
      box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.08);

      .el-page-header {
        padding-left: 20px;
      }

      .grid-content {
        height: 40px;
        display: table-cell;
        vertical-align: middle;
      }

      .nav-switch {
        display: inline-block;
        font-size: 28px;
      }

      .nav-router {
        padding: 20px;
      }

      .tags-view {
        height: 40px;
        padding-top: 6px;
        border-top: 1px solid #EDEFF0;
        border-bottom: 1px solid #EDEFF0;

        .tags-view-item {
          margin: 0 5px;
          cursor: pointer;
          height: 26px;
          line-height: 26px;
        }
      }


    }

    .app-main {
      margin: 15px;
      padding: 15px;
      background-color: #ffffff;
    }
  }

  body .el-container {
    height: 100%;
  }
</style>
