<template>
  <div>
    <el-table
      :data="firms"
      style="width: 100%"
      size="mini"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column prop="firmName" label="企业名称" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SelectFirms",
  props: ["firms"],
  data() {
    return {
      firmId: ""
    };
  },
  methods: {
    handleCurrentChange(row) {
      this.firmId = row.firmId;
      this.$emit("onSelectFirm", this.firmId);
    },
   
  }
};
</script>

<style scoped>
</style>
