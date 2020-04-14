<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="80px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="资金账号">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.bankAccount"
              placeholder="请输入资金账号.."
              size
            ></el-input>
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
        @click="handleConfirm"
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
  name: "fundAccountSearch",
  data() {
    return {
      more: false,
      formData: {
          bankAccount: null
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
      handleConfirm(){
          if(!this.formData.bankAccount || '' === this.formData.bankAccount)
              this.formData.bankAccount = null;
          this.$emit("onSearch",this.formData)
      }
  }
};
</script>
