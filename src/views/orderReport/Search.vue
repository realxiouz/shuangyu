<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :span="20">
      <el-form
        :inline="true"
        :model="searchForm"
        :label-position="labelPosition"
        label-width="110px"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="应收:">
              <el-input
                v-model="formData.namePhone"
                style="width: 230px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应付:">
              <el-input
                v-model="formData.namePhone"
                style="width: 230px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实收:">
              <el-input v-model="formData.namePhone" style="width: 230px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实付:">
              <el-input v-model="formData.namePhone" style="width: 230px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="利润:">
              <el-input
                v-model="formData.nameAirplane"
                style="width: 230px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购订单:">
              <el-input
                v-model="formData.orderNumber"
                style="width: 230px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="handleSearch">查询</el-button>-->
<!--        </el-form-item>-->
        <!--      <el-form-item>-->
        <!--        <el-button type="primary" @click="handleAdd">添加</el-button>-->
        <!--      </el-form-item>-->
      </el-form>
    </el-col>
    <el-col :span="4" class="search-tools">
      <el-button type="primary" @click="$emit('onSearch', formData)"
        >查询</el-button
      >
      <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
      <el-button type="primary" @click="handleMore">更多</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "orderReportSearch",
  data() {
    return {
      more: false,
      formData: {
        fullName: "",
        gender: ""
      }
    };
  },
  methods: {
    handleMore() {
      this.more = !this.more;
    }
  }
};
</script>

<style scoped></style>
