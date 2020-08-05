<template>
  <div class="home contentBox">
    <div>
      <transition name="fade-transform" mode="out-in">
        <div>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

  export default {
    name: "firmConfig"
  };
</script>
