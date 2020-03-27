<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :inline="true" label-width="110px" size="mini">
        <el-form-item label="机场名称查询">
          <el-input v-model="searchForm.airportName" placeholder="请输入机场名称.."></el-input>
        </el-form-item>
        <el-form-item label="机场三字码查询">
          <el-input v-model="searchForm.airportCode" placeholder="请输入机场三字码.."></el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button icon="el-icon-search" class="filter-item" type="primary" size="mini" @click="$emit('onSearch', searchForm)">
        查询
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "airportSearch",
  data() {
    return {
        searchForm: {
            airportName: "",
            airportCode: ''
        }
    };
  }
};
</script>
