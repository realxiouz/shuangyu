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
    <div slot="footer" class="dialog-footer" style=" margin-top:15px;text-align:right;">
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
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
    },
    handleSave() {
      this.$emit("onSave", this.firmId);
    },
    
  }
};
</script>

<style scoped>
</style>
