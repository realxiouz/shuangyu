<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="thirdId" label="第三方" align="center"></el-table-column>
      <el-table-column prop="flag" label="标签" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  function defaultData() {
    return {
      thirdName: "",
      flag: ""
    }
  };
  export default {
    name: "paramEdit",
    props: ["markId", "flags"],
    data() {
      return {
        formData: defaultData(),
        tableData: []
      };
    },
    methods: {
      loadFlags() {
        if (this.flags != null) {
          var flagIds = "";
          this.flags.forEach(e => {
            flagIds += "," + e;
          });
          if (flagIds) {
            flagIds = flagIds.substring(1, flagIds.length);
          }
          this.$store
            .dispatch("productMark/getListByFlagIds", {flagIds: flagIds})
            .then(data => {
              this.tableData = data;
              console.log(this.firmList)
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
    mounted() {
      this.loadFlags();
    }
  }
  ;
</script>
