<template v-if="item.children">
  <el-submenu
    v-if="item.children && item.children.length > 0"
    :index="item.uri"
  >
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span slot="title">{{ item.title }}</span>
    </template>

    <template v-for="child in item.children">
      <sidebar-item
        v-if="child.children && child.children.length > 0"
        :item="child"
        :key="child.uri"
      />
      <el-menu-item v-else :key="child.uri" :index="child.uri">
        <i class="el-icon-location"></i>
        <span slot="title">{{ child.title }}</span>
      </el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item v-else :index="item.uri">
    <i class="el-icon-menu"></i>
    <span slot="title">{{ item.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
