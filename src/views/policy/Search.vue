<template>
  <div class="filter-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="政策编码">
        <el-input class="filter-item" v-model="searchForm.policyCode" placeholder="政策编码"></el-input>
      </el-form-item>
      <el-form-item label="航司">
        <el-input class="filter-item" v-model="searchForm.airlineCode" placeholder="航司"></el-input>
      </el-form-item>
      <el-form-item label="舱位">
        <el-input class="filter-item" v-model="searchForm.cabin" placeholder="舱位"></el-input>
      </el-form-item>
      <el-form-item label="起飞城市">
        <el-input class="filter-item" v-model="searchForm.dpt" placeholder="起飞城市"></el-input>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-input class="filter-item" v-model="searchForm.arr" placeholder="到达城市"></el-input>
      </el-form-item>
      <el-form-item label="销售起始日期:">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="searchForm.sellStartDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="销售结束日期:">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="searchForm.sellEndDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="出发日期:">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="searchForm.flightDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" class="filter-item" type="primary" @click="$emit('onSearch',searchForm)">查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-edit" class="filter-item" type="primary" @click="$emit('onAdd',true)">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default {
        name: 'policySearch',
        data() {
            return {
                searchForm: {
                    policyCode: '',
                    airlineCode: '',
                    dpt: '',
                    arr: '',
                    cabin: '',
                    sellStartDate: '',
                    sellEndDate: '',
                    flightDate: '',
                }
            }
        }
    }
</script>
<style>
  label{
    display:inline-block;
    width:120px;
  }
</style>
