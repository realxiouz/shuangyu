<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="17" :md="18" :lg="19" :xl="20">
      <el-form label-width="60px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="应用名称:">
            <el-input v-model="formData.appName" placeholder="请输入应用名称搜索..."></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4" class="search-tools">
      <el-button
        icon="el-icon-search"
        class="filter-item"
        type="primary"
        size="mini"
        @click="handleConfirm"
      >查询</el-button>
      <el-button
        icon="el-icon-refresh"
        class="filter-item"
        type="primary"
        size="mini"
        @click="handleClear"
      >清空</el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: "fundAccountSearch",
    data() {
      return {
        more: false,
        formData: {
          appName: null
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
      initSearchForm() {
        return {
          appName: null
        };
      },
      handleClear() {
        this.formData = this.initSearchForm();
        this.handleConfirm();
      },
      handleMore() {
        this.more = !this.more;
      },
      handleConfirm() {
        if (!this.formData.appName || "" === this.formData.appName) {
          this.formData.appName = null;
        }
        this.$emit("onSearch", this.formData);
      }
    }
  };
</script>
