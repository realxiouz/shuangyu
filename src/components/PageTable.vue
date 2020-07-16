<template>
  <div class="page">
    <slot name="search"></slot>
    <slot name="tool"></slot>
    <slot></slot>
    <slot name="pagination">
      <el-pagination
        class="page-footer"
        background
        prev-text="上一页"
        next-text="下一页"
        :total="total"
        @prev-click="onPrev"
        @next-click="onNext"
        @size-change="onSizeChange"
        layout="total,sizes,prev,next"
        :page-size="pageSizes[0]"
        :page-sizes="pageSizes"
      ></el-pagination>
    </slot>
  </div>
</template>

<script>
import { MIXIN_LIST } from "@/utils/mixin";

export default {
  mixins: [MIXIN_LIST]
};
</script>

<style></style>
