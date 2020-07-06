<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="17" :md="18" :lg="19" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="仓库编码">
            <el-input clearable v-model="formData.warehouseCode" placeholder="请输入仓库编码.."></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="仓库名称">
            <el-input clearable v-model="formData.warehouseName" placeholder="请输入仓库名称.."></el-input>
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
    initSearchForm() {
      return {
        warehouseCode: null,
        warehouseName: null
      };
    },
    handleMore() {
      this.more = !this.more;
    },
    handleClear() {
      this.formData = this.initSearchForm();
    },
    //trim(),没有值时赋值为null;
    handleConfirm() {
      let _formData = Object.assign({}, this.formData);
      for (let key in _formData) {
        if (_formData[key] && "" !== _formData[key]) {
          _formData[key] = _formData[key].trim();
        } else {
          _formData[key] = null;
        }
      }
      this.$emit("onSearch", _formData);
    }
  }
};
</script>
