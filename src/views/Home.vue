<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
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
// @ is an alias to /src
export default {
  name: "home",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="stylus">
.el-header, .el-footer
    background-color #B3C0D1
    color #333
    text-align center
    line-height 60px

.el-aside
    background-color #D3DCE6
    color #333
    text-align: center
    line-height: 200px

.el-main
    background-color #E9EEF3
    color #333
    text-align center
    line-height 160px


body .el-container
    height 100%


.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside
    line-height 260px


.el-container:nth-child(7) .el-aside
    line-height 320px
</style>
