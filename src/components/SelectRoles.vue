<template>
  <div>
    <el-table :data="tableData" style="width: 100%;margin-bottom:15px">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        align="center"
        tooltip-effect="dark"
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
        pageFlag: "next",
        pageSize: 10,
        lastId: "0",
        tableData: []
      };
    },
    created(){
      this.loadData();
    },
    methods:{
      loadData(){
        this.$store
          .dispatch("role/getPageList", {pageFlag: this.pageFlag, pageSize: this.pageSize, lastId: this.lastId, filter: {}})
          .then(data => {
            this.tableData = data;
          })
          .catch(error => {
            console.log(error);
          });
      }

    }
  };
</script>

<style scoped>

</style>
