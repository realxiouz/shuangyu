<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form label-width="60px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航段:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.segment"
              placeholder="示例：（ CSX-PEK ）"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="出发地三字码:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.dpt"
              placeholder="出发地三字码"
            ></el-input>
          </el-form-item>
        </el-col>-->
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="目的地三字码:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.arr"
              placeholder="目的地三字码"
            ></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航司:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.airlineCode"
              placeholder="航司"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="舱位:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.cabin"
              placeholder="舱位"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more">
            <span>提示：亲，没有更多查询条件了 ^-^</span>
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
        @click="$emit('onSearch', formData)"
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
  name: "userSearch",
  data() {
    return {
      more: false,
      formData: {}
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
    defaultSearchFormData() {
      return {
        segment: null,
        dpt: null,
        arr: null,
        airlineCode: null,
        cabin: null
      };
    },
    handleMore() {
      this.more = !this.more;
    },

    onSearch() {
      if (this.formData.segment && "" != this.formData.segment) {
        this.formData.segment = this.formData.segment.toUpperCase();
      } else {
        this.formData.segment = null;
      }
      if (this.formData.dpt && "" != this.formData.dpt) {
        this.formData.dpt = this.formData.dpt.toUpperCase();
      } else {
        this.formData.dpt = null;
      }
      if (this.formData.arr && "" != this.formData.arr) {
        this.formData.arr = this.formData.arr.toUpperCase();
      } else {
        this.formData.arr = null;
      }
      if (this.formData.airlineCode && "" != this.formData.airlineCode) {
        this.formData.airlineCode = this.formData.airlineCode.toUpperCase();
      } else {
        this.formData.airlineCode = null;
      }
      if (this.formData.cabin && "" != this.formData.cabin) {
        this.formData.cabin = this.formData.cabin.toUpperCase();
      } else {
        this.formData.cabin = null;
      }
      this.$emit("onSearch", this.formData);
    }
  }
};
</script>
