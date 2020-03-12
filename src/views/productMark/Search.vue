<template>
  <el-row align="left">
    <el-select v-model="firmId" placeholder="请选择">
      <el-option
        v-for="item in firmList"
        :key="item.firmId"
        :label="item.firmName"
        :value="item.firmId">
      </el-option>
    </el-select>
    <el-button type="primary" @click="$emit('onSearch',firmId)">查询</el-button>
    <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
  </el-row>
</template>

<script>
  export default {
    name: "productMarkSearch",
    data() {
      return {
        firmId: '',
        firmList:[]
      };
    },
    methods: {
      loadFirms() {
        this.$store
          .dispatch("productMark/getFirmList"
          )
          .then(data => {
            this.firmList = data;
            console.log(this.firmList)
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    mounted() {
      this.loadFirms();
    }
  };
</script>
