<template>
  <div class="page">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="资产">
        <subject-content v-if="0 === category" :category="category" />
      </el-tab-pane>
      <el-tab-pane label="负债">
        <subject-content v-if="1 === category" :category="category" />
      </el-tab-pane>
      <el-tab-pane label="权益">
        <subject-content v-if="2 === category" :category="category" />
      </el-tab-pane>
      <el-tab-pane label="成本">
        <subject-content v-if="3 === category" :category="category" />
      </el-tab-pane>
      <el-tab-pane label="损益">
        <subject-content v-if="4 === category" :category="category" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import subjectContent from "./Content.vue";
  import {MIXIN_LIST} from "@/utils/mixin";
  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        category: 0
      };
    },
    methods: {
      handleClick(item) {
        this.category = parseInt(item.index);
      }
    },
    components: {
      subjectContent
    }
  };
</script>
