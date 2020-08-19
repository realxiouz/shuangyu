<template>
  <div class="c-card">
    <div v-if="$slots.title||title" class="c-title">
      <slot v-if="$slots.title" name="title" />
      <div v-else>{{title}}</div>
    </div>
    <div class="c-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.c-card{
  background: #fff;
  margin-bottom: 15px;
  .c-title{
    padding: 15px;
    border-bottom: 1px solid #e1e1e1;
  }
  .c-body{
    padding: 15px;
  }
}
</style>