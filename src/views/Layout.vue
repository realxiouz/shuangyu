<template>
  <el-container>
    <el-aside width="auto" v-show="isDisplay">
      <Sidebar :menuList="$store.getters.menus" :collapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header style="height:94px;padding:0 0;">
        <div class="app-header">
          <el-row
            type="flex"
            class="row-bg"
            justify="space-between"
            :gutter="20"
            style="overflow: hidden"
          >
            <el-col :xs="13" :sm="14" :md="16" :lg="19" :xl="20">
              <div class="grid-content bg-purple">
                <span class="menu-switch" v-bind:class="switchClass" @click="handleSwitch"/>
              </div>
              <div class="grid-content bg-purple">
                <el-breadcrumb class="menu-router" separator="/">
                  <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                    <router-link :to="item.path">
                      {{
                      item.meta.title
                      }}
                    </router-link>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-col>
            <div class="grid-content bg-purple firmClass">
              <span v-if="firmData && firmData.firmId != ''" style="margin-right:15px;">
                <el-button type="text" @click="skipOrderDetail" size="mini">
                  待处理
                  <el-badge :value="totalCount ? totalCount : '0'" :max="99"></el-badge>
                </el-button>
              </span>
              <!--              <span-->
              <!--                v-if="$store.getters.firm"-->
              <!--              >{{$store.getters.firm.firmName}}</span>-->
              <el-select
                v-if="$store.getters.firm"
                v-model="firmId"
                size="mini"
                style="width: 60%"
                placeholder="切换企业"
                @change="onFirmChange"
              >
                <el-option
                  v-for="item in $store.getters.firms"
                  :key="item.firmId"
                  :label="item.firmName"
                  :value="item.firmId"
                ></el-option>
              </el-select>
              <!--              </div>-->
            </div>
            <div class="grid-content bg-purple userClass">
              <span style="margin-right:10px; font-size:16px;">
                {{this.$store.getters.fullName}}
              </span>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  设置
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="personalEdit">个人资料</el-dropdown-item>
                  <el-dropdown-item command="personalEdit">安全设置</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-row>
          <div class="tags-view">
            <scroll-pane ref="scrollPane" class="tags-view-wrapper">
              <router-link
                :class="isActive(tag) ? 'active' : ''"
                class="tags-view-item"
                v-for="tag in tags"
                :key="tag.path"
                :to="tag.path"
                tag="span"
              >
                {{ tag.name }}
                <span
                  v-if="tag.name != '首页'"
                  @click.prevent.stop="handleClose(tag)"
                  class="el-icon-close"
                />
              </router-link>
            </scroll-pane>
          </div>
        </div>
      </el-header>
      <el-main>
        <section class="app-main">
          <transition name="fade-transform" mode="out-in">
            <div>
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
          </transition>
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Sidebar from "@/components/SideBar.vue";
  import ScrollPane from "@/components/TagsView/ScrollPane.vue";
  import {resetRouter} from "@/router";

  // @ is an alias to /src
  export default {
    name: "layout",
    components: {Sidebar, ScrollPane},
    data() {
      return {
        dialogVisible: false,
        isCollapse: false,
        isDisplay: true,
        firms: this.$store.getters.firms,
        firmId: this.$store.getters.firm ? this.$store.getters.firm.firmId : "",
        firmData: "",
        tags: [{
          name: "首页",
          closable: false,
          type: "",
          path: "/home"
        }],
        screenWidth: document.body.clientWidth,
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
      $route: function (to) {
        let tag = {
          name: to.meta.title,
          path: to.path,
          closable: true,
          type: "success"
        }
        this.tags.push(tag);
        let obj = {};
        this.tags = this.tags.reduce((cur, next) => {
          obj[next.path] ? "" : obj[next.path] = true && cur.push(next);
          return cur;
        }, []);
      }
    },
    methods: {
      isActive(route) {
        return route.path === this.$route.path;
      },
      handleSwitch() {
        if (this.screenWidth > 500) {
          this.isCollapse = !this.isCollapse;
        }
      },
      handleCommand(command) {
        switch (command) {
          case "logout":
            this.handleLogout();
            break;
          case "personalEdit":
            this.skipPersonalEdit();
            break;
        }
      },
      handleLogout() {
        this.$store
          .dispatch("user/signOut")
          .then(() => {
            resetRouter();
            this.$store.commit("staff/setLoginInfo", null);
            this.$router.push({path: "/login"});
          })
          .catch(() => {
          });
      },
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.$router.push({
          path: this.tags[this.tags.length - 1].path
        });
      },
      loadPendingTotal() {
        this.$store
          .dispatch("orderTask/getTotal", {
            filters: {taskStatus: "1"}
          })
          .then(data => {
            if (data) {
              this.totalCount = data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      skipOrderDetail() {
        this.$router.push({path: "/order/pending/task/list"});
      },
      skipPersonalEdit() {
        this.$router.push({
          path: "/user/personal/edit",
          query: {userId: this.$store.getters.userId}
        });
      },
      triggerPendingTotalTimer() {
        //先执行一次，然后触发定时器。
        this.loadPendingTotal();
        this.pendingTotalTimer = setInterval(() => {
          setTimeout(this.loadPendingTotal, 0);
        }, 60000);
      },
      onFirmChange(firmId) {
        this.$store.dispatch("staff/getLoginInfo", {firmId})
          .then(() => {
            resetRouter();
          });
      }
    },
    created() {
      this.triggerPendingTotalTimer();
    },
    beforeDestroy() {
      // 离开页面销毁定时器
      if (this.pendingTotalTimer) {
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
      right: 198px;
    }

    .userClass {
      position: absolute;
      line-height: 54px;
      right: 50px;
    }

    .menu-switch {
      display: inline-block;
      font-size: 28px;
    }

    .menu-router {
      padding: 20px;
    }

    .tags-view {
      height: 40px;
      line-height: 40px;

      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        border-radius: 4px;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;

        &:first-of-type {
          margin-left: 15px;
        }

        &:last-of-type {
          margin-right: 15px;
        }

        &.active {
          background-color: #67c23a;
          color: #fff;
          border-color: #67c23a;

          &::before {
            content: "";
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
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

<style lang="scss">
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 1px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
          font-size: 17px;
        }

        &:hover {
          background-color: #909399;
          color: #fff;
        }
      }
    }
  }
</style>
