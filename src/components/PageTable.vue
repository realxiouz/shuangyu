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
        @prev-click="handlePrev"
        @next-click="handleNext"
        @size-change="handleSizeChange"
        layout="total,sizes,prev,next"
        :page-size="pageSizes[0]"
        :page-sizes="pageSizes"
      ></el-pagination>
    </slot>
  </div>
</template>

<script>
import { MIXIN_TABLE } from "@/utils/mixin";

export default {
  mixins: [MIXIN_TABLE]
};
</script>

<style></style>
