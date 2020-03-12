<template>
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="政策编码">
      <el-input v-model="searchForm.policyCode" placeholder="政策编码"></el-input>
    </el-form-item>
    <el-form-item label="航司">
      <el-input v-model="searchForm.airlineCode" placeholder="航司"></el-input>
    </el-form-item>
    <el-form-item label="舱位">
      <el-input v-model="searchForm.cabin" placeholder="舱位"></el-input>
    </el-form-item>
    <el-form-item label="起飞城市">
      <el-input v-model="searchForm.dpt" placeholder="起飞城市"></el-input>
    </el-form-item>
    <el-form-item label="到达城市">
      <el-input v-model="searchForm.arr" placeholder="到达城市"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onSearch',searchForm)">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('onAdd',true)">添加</el-button>
    </el-form-item>
  </el-form>
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
                    cabin:''
                }
            }
        }
    }
</script>
