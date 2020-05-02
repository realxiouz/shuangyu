<template>
  <el-container>
    <el-aside width="auto" v-show="isDisplay">
      <Sidebar v-loading="loading" :menuList="menus" :collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header style="height:94px;padding:0 0;">
        <div class="app-header">
          <el-row type="flex" class="row-bg" justify="space-between" :gutter="20" style="overflow: hidden">
            <el-col :xs="13" :sm="14" :md="16" :lg="19" :xl="20">
              <div class="grid-content bg-purple">
                <span class="nav-switch" v-bind:class="switchClass" @click="handleSwitch" />
              </div>
              <div class="grid-content bg-purple">
                <el-breadcrumb class="nav-router" separator="/">
                  <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                    <router-link :to="item.path">{{ item.meta.title }}</router-link>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="grid-content">
                <el-button @click="skipOrderDetail" size="mini">
                  待处理
                  <el-badge :value="totalCount?totalCount:'0'" :max="99"></el-badge>
                </el-button>
              </div>
            </el-col>
              <div class="grid-content">
                <el-button @click="skipOrderDetail" size="mini">
                  待处理
                  <el-badge :value="totalCount?totalCount:'0'" :max="99"></el-badge>
                </el-button>
              </div>
              <div class="grid-content bg-purple firmClass">
                <span
                  v-if="this.$store.state.loginInfo.firm"
                >{{this.$store.state.loginInfo.firm.firmName}}</span>
              </div>
              <div class="grid-content bg-purple userClass">
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
          </el-row>
          <div class="tags-view">
            <el-tag
              class="tags-view-item"
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
      </el-header>
      <el-main>
        <section class="app-main">
          <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
          </transition>
        </section>
        <div>
          <el-dialog
            title="请选择一个你的企业"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
            :show-close="false"
            width="30%"
            center
          >
            <select-firms
              v-if="dialogVisible"
              ref="selectFirms"
              :firms="firms"
              @onSelectFirm="getLoginInfo"
            ></select-firms>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/components/SideBar.vue";
import SelectFirms from "@/components/SelectFirms.vue";
// @ is an alias to /src
export default {
  name: "layout",
  components: { Sidebar, SelectFirms },
  data() {
    return {
      dialogVisible: false,
      isCollapse: false,
      isDisplay: true,
      loading: true,
      firms: [],
      tags: [
        // { name: "首页", closable: false, type: "", path: "/home" }
        // { name: "用户管理", closable: true, type: "success" },
        // { name: "添加用户", closable: true, type: "info" }
      ],
      screenWidth: document.body.clientWidth,
      menus: [],
        //待处理任务总量
        totalCount: 0,
        //待处理任务总数加载触发定时器
        pendingTotalTimer: null
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
    getLoginInfo(firmId) {
      this.dialogVisible = false;
      this.$store
        .dispatch("getLoginInfo", { firmId: firmId })
        .then(data => {
          if (data.firms.length > 1 && this._.isEmpty(data.staffId)) {
            this.firms = data.firms;
            this.dialogVisible = true;
          } else {
            this.menus = this.buildTree(null, data.navs);
            this.loading = false;
          }
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
        name: "首页",
        closable: false,
        type: "",
        path: "/home"
      };
      let matched = this.$route.matched;
      matched.forEach(item => {
        if (item.parent != undefined) {
          tag = {
            name: item.meta.title,
            path: item.path,
            closable: true,
            type: "success"
          };
        }
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
    },
      loadPendingTotal() {
          this.$store
              .dispatch("orderTaskTotal/getPendingTotal", {
                  filters: {}
              })
              .then(data => {
                  if (data) {
                      this.totalCount = data.totalCount;
                  }
              })
              .catch(error => {
                  console.log(error);
              });
      },
      skipOrderDetail(){
          this.$router.push({path: '/order/total/detail'});
      },
      triggerPendingTotalTimer(){
          //先执行一次，然后触发定时器。
          this.loadPendingTotal();
          this.pendingTotalTimer = setInterval(() => {
              this.loadPendingTotal();
          }, 60000);
      },
  },
  created() {
    this.getLoginInfo(null);
    this.getTag();
    this.triggerPendingTotalTimer();
  },
  beforeDestroy() {
      // 离开页面销毁定时器
      if (this.pendingTotalTimer){
          clearInterval(this.pendingTotalTimer);
      }
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
}

.app-header {
  height: 94px;
  overflow: hidden;
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0px 6px 6px rgba(0, 21, 41, 0.08);
  box-shadow: 0px 6px 6px rgba(0, 21, 41, 0.08);

  .el-page-header {
    padding-left: 20px;
    line-height: 32px;
  }

  .grid-content {
    height: 40px;
    display: table-cell;
    vertical-align: middle;
  }
  .firmClass {
    position: absolute;
    // top: 15px;
    line-height: 54px;
    right: 158px;
  }
  .userClass{
    position: absolute;
    line-height: 54px;
    right: 20px;
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

body .el-container {
  height: 100%;
}
</style>
