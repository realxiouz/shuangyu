<template>
  <div class="sticky" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: Number
    },
    bottom: {
      type: Number
    }
  },
  computed: {
    style() {
      if (this.top) {
        return {top: `${this.top}px`};
      } else if (this.bottom) {
        return {bottom: `${this.bottom}px`};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  z-index: 100;
}
</style>