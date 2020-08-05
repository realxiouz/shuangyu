<template>
  <div class="home contentBox">
    <h2>欢迎您!{{ this.$store.getters.fullName }}</h2>
  </div>
</template>

<script>

export default {
  name: "home"
};
</script>
