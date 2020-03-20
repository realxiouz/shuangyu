<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航段">
            <el-input v-model="formData.segment">
              <i class="el-icon-edit el-input__icon" slot="suffix" @click="segmentIconClick"></i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="出发地三字码">
            <el-input v-model="formData.dpt">
              <i class="el-icon-edit el-input__icon" slot="suffix" @click="dptIconClick"></i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="目的地三字码">
            <el-input v-model="formData.arr">
              <i class="el-icon-edit el-input__icon" slot="suffix" @click="arrIconClick"></i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航司二字码">
            <el-input v-model="formData.airlineCode">
              <i class="el-icon-edit el-input__icon" slot="suffix" @click="airlineCodeIconClick"></i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航司舱位" >
            <el-input v-model="formData.cabin">
              <i class="el-icon-edit el-input__icon" slot="suffix" @click="cabinIconClick"></i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more">
            <el-button type="primary" size="mini" @click="clearSearchForm">清除</el-button>
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
    clearSearchForm() {
      this.formData = this.defaultSearchFormData();
    },
    handleSearch() {
      if (this.formData.segment) {
        this.formData.segment = this.formData.segment.toUpperCase();
      }
      if (this.formData.dpt) {
        this.formData.dpt = this.formData.dpt.toUpperCase();
      }
      if (this.formData.arr) {
        this.formData.arr = this.formData.arr.toUpperCase();
      }
      if (this.formData.airlineCode) {
        this.formData.airlineCode = this.formData.airlineCode.toUpperCase();
      }
      if (this.formData.cabin) {
        this.formData.cabin = this.formData.cabin.toUpperCase();
      }
      this.$emit("onSearch", this.formData);
    },
    segmentIconClick() {
      this.formData.segment = null;
    },
    dptIconClick() {
      this.formData.dpt = null;
    },
    arrIconClick() {
      this.formData.arr = null;
    },
    airlineCodeIconClick() {
      this.formData.airlineCode = null;
    },
    cabinIconClick() {
      this.formData.cabin = null;
    }
  },
  mounted() {
    this.clearSearchForm();
  }
};
</script>
