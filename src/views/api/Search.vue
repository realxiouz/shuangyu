<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="70px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="api名称:">
            <el-input
              clearable
              @keyup.enter.native="toSearch"
              v-model="formData.apiName"
              placeholder="请输入api名称搜索..."
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col v-if="more" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="是否启用:">
            <el-switch v-model="formData.enable"></el-switch>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        icon="el-icon-search"
        class="filter-item"
        type="primary"
        size="mini"
        @click="toSearch"
      >查询</el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "apiSearch",
  data() {
    return {
      more: false,
      formData: {
        apiName: ""
      }
    };
  },
  computed: {
    switchIcon() {
      if (!this.more) {
        return "el-icon-arrow-down el-icon--right";
      } else {
        return "el-icon-arrow-up el-icon--right";
      }
    }
  },
  methods: {
    handleMore() {
      this.more = !this.more;
    },
    toSearch() {
      let data = {};
      if (!this.more) {
        data = { apiName: this.formData.apiName };
      } else {
        data = this.formData;
      }
      this.$emit("onSearch", data);
    }
  }
};
</script>

<style scoped>
</style>
