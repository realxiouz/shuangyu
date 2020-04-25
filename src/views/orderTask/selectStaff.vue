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
  props: ["staffList"],
  data() {
    return {
      staffs: [],
      total: 0,
      staffId: ""
    };
  },

  methods: {
    handleConfirm() {
      if (this.staffId == "") {
        this.$notify({
          title: "提示",
          message: "请选择需要转单的员工",
          type: "warning",
          duration: 4500
        });
        return;
      }
      if (this.staffId == this.$store.state.loginInfo.staffId) {
        this.$notify({
          title: "提示",
          message: "不可以自己给自己转单，请选择其他员工。",
          type: "warning",
          duration: 4500
        });
        return;
      }
      this.$emit("onSave", this.staffId);
    },
    handleCurrentChange(row) {
      this.staffId = row.staffId;
    }
  }
};
</script>
