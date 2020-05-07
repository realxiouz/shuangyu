<template>
  <div>
    <order-search></order-search>
    <order-edit></order-edit>
  </div>
</template>

<script>
    import orderSearch from "./Search";
    import orderEdit from "./Edit";

    export default {
        components: {
            orderSearch,
            orderEdit
        }
    };
</script>
