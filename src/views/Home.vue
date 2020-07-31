<template>
  <div class="home contentBox">
    <h2>欢迎您!{{ $store.state.loginInfo.fullName }}</h2>
  </div>
</template>

<script>

export default {
  name: "home"
};
</script>
