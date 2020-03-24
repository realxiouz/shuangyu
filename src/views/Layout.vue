<template>
  <el-container>
    <el-aside width="auto" v-show="isDisplay">
      <Sidebar :menuList="menus" :collapse="isCollapse" />
    </el-aside>
    <el-main>
      <div class="app-header">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :xs="18" :sm="17" :md="16" :lg="15" :xl="20">
            <div class="grid-content bg-purple">
              <span class="nav-switch" v-bind:class="switchClass" @click="handleSwitch" />
            </div>
            <div class="grid-content bg-purple">
              <el-breadcrumb class="nav-router" separator="/">
                <!-- <el-breadcrumb-item>
                  <router-link to="/home">活动管理</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                <el-breadcrumb-item >活动详情</el-breadcrumb-item>-->
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                  <router-link :to="item.path">{{ item.meta.title }}</router-link>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>
          <el-col :xs="6" :sm="5" :md="4" :lg="3" :xl="2">
            <div class="grid-content bg-purple">
              <span
                style="margin-right:10px; font-size:16px;"
              >{{this.$store.state.loginInfo.fullName}}</span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  设置
                  <i class="el-icon-arrow-down el-icon--right"></i>
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
            size="mini"
            @close="handleClose(tag)"
            v-for="tag in tags"
            :key="tag.name"
            :closable="tag.closable"
            :type="tag.type"
          >
            <router-link :to="tag.path">{{tag.name}}</router-link>
          </el-tag>
        </div>
        <!-- <el-page-header content="添加用户"></el-page-header> -->
      </div>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
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
      isDisplay: true,
      tags: [
        { name: "首页", closable: false, type: "", path: "/home" }
        // { name: "用户管理", closable: true, type: "success" },
        // { name: "添加用户", closable: true, type: "info" }
      ],
      screenWidth: document.body.clientWidth,
      menus: []
    };
  },
  computed: {
    switchClass() {
      if (this.isCollapse) return "el-icon-s-unfold";
      else return "el-icon-s-fold";
    },
    key() {
      return this.$router.path;
    }
  },
  watch: {
    screenWidth(val) {
      if (val <= 500) {
        this.isDisplay = false;
      } else {
        this.isDisplay = true;
      }
      if (val < 760) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
    $route() {
      this.getTag();
    }
  },
  methods: {
    handleSwitch() {
      if (this.screenWidth > 500) {
        this.isCollapse = !this.isCollapse;
      }
    },
    buildTree(pid, navs) {
      let menus = [];
      for (let i = 0; i < navs.length; i++) {
        if (navs[i].pid === pid) {
          menus.push(navs[i]);
        }
      }
      if (menus.length > 0) {
        for (let i = 0; i < menus.length; i++) {
          let children = this.buildTree(menus[i].navId, navs);
          menus[i].children = children;
        }
      }
      return menus;
    },
    getLoginInfo() {
      this.$store
        .dispatch("getLoginInfo", { firmId: null })
        .then(data => {
          this.menus = this.buildTree(null, data.navs);
        })
        .catch(error => {
          console.log(error);
        });
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
        .catch(() => {});
    },
    getTag() {
      let tag = {
        name: "",
        path: "",
        closable: true,
        type: "success"
      };
      let matched = this.$route.matched;
      matched.forEach(item => {
        tag = {
          name: item.meta.title,
          path: item.path,
          closable: true,
          type: "success"
        };
        this.tags.push(tag);
      });
      let obj = {};
      this.tags = this.tags.reduce((item, next) => {
        obj[next.name] ? "" : (obj[next.name] = true && item.push(next));
        return item;
      }, []);
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  },
  created() {
    this.getLoginInfo();
  },
  mounted() {
    const _this = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        _this.screenWidth = window.screenWidth;
      })();
    };
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  height: 100%;
  padding: 0;
  color: #333;
  background-color: #f0f2f5;

  .app-header {
    height: 94px;
    overflow: hidden;
    position: relative;
    background: #fff;
    -webkit-box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.08);
    box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.08);

    .el-page-header {
      padding-left: 20px;
      line-height: 32px;
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
      border-top: 1px solid #edeff0;
      border-bottom: 1px solid #edeff0;

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
    // padding: 15px;
    background-color: #ffffff;
  }
}

body .el-container {
  height: 100%;
}
</style>
