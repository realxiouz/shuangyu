<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="roleName"
        label="角色名称"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "selectRoles",
    props: ["firmId"],
    data() {
      return {
        tableData: []
      };
    }
  };
</script>

<style scoped>

</style>
