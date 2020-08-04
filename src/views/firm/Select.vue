<template>
  <div>
    <el-dialog
      title="请选择一个你的企业"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="30%"
      center
    >
      <select-firms
        v-if="dialogVisible"
        ref="selectFirms"
        :firms="$store.state.staff.loginInfo.firms"
        @onSelectFirm="onFirmIdChange"
      ></select-firms>
    </el-dialog>
  </div>
</template>
<script>

  import {resetRouter} from "@/router";
  import SelectFirms from "@/components/SelectFirms.vue";

  export default {
    components: {SelectFirms},
    data() {
      return {
        dialogVisible: true
      };
    },
    methods: {
      onFirmIdChange(firmId) {
        console.log(firmId)
        this.dialogVisible && (this.dialogVisible = false);
        this.$store.dispatch('staff/getLoginInfo', {firmId}).then(data => {
          if (data.firm && data.staffId) {
            resetRouter();
            this.$router.push({path: "/home"});
          }
        });
      }
    }
  };
</script>
