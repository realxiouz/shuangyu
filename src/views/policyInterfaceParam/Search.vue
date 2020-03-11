<template>
  <el-row align="left">
<!--    <el-button type="primary" @click="$emit('onSearch')">查询</el-button>-->
    <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
  </el-row>
</template>

<script>
  export default {
    name: "paramSearch",
    data() {
      return {
        name: '',
        thirdId: '',
        policyId: '',
        policys: [],
        thirdPartys: []
      };
    },
    methods: {
      initSelectData: function () {
        this.$store
          .dispatch("policyInterfaceParam/getThirdPartyList")
          .then(data => {
            this.thirdPartys = data;
          })
          .catch(error => {
            console.log(error);
          });
        this.$store
          .dispatch("policyInterfaceParam/getPolicyEnumList")
          .then(data => {
            this.policys = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
    created() {
      this.initSelectData();
    }
  };
</script>
