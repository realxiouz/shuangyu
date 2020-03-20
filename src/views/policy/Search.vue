<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="政策编码">
            <el-input class="filter-item" v-model="formData.policyCode" placeholder="政策编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="航司">
            <el-input class="filter-item" v-model="formData.airlineCode" placeholder="航司"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="舱位">
            <el-input class="filter-item" v-model="formData.cabin" placeholder="舱位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="起飞城市">
            <el-input class="filter-item" v-model="formData.dpt" placeholder="起飞城市"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="到达城市">
            <el-input class="filter-item" v-model="formData.arr" placeholder="到达城市"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="销售起始日期:">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formData.sellStartDate"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="销售结束日期:">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formData.sellEndDate"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="出发日期:">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formData.flightDate"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
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
  name: "policySearch",
  data() {
    return {
      more: false,
      formData: {
        policyCode: "",
        airlineCode: "",
        dpt: "",
        arr: "",
        cabin: "",
        sellStartDate: "",
        sellEndDate: "",
        flightDate: ""
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
    }
  }
};
</script>
<style>
label {
  display: inline-block;
  width: 120px;
}
</style>
