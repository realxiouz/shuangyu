<template>
  <div>
    <el-table
      size="mini"
      ref="staffList2"
      :data="staffList"
      highlight-current-row
      style="width: 100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="fullName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
    </el-table>
    <div style="margin-top: 20px;text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "taskSelectStaff",
  data() {
    return {
      staffs: [],
      total: 0,
      staffList: [],
      staffData:"",
      staffId: ""
    };
  },

  methods: {
    handleConfirm() {
      if (this.staffData == "") {
        this.$notify({
          title: "提示",
          message: "请选择需要派遣的员工",
          type: "warning",
          duration: 4500
        });
        return;
      }
      this.$emit("onSave", this.staffData);
    },
    handleCurrentChange(row) {
      this.staffData = row;
    },
    loadData() {
      this.$store
        .dispatch("orderStaff/getOnlineList", { filter: {} })
        .then(data => {
          this.staffList = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.loadData();
  }
};
</script>
