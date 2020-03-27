<template>
  <div>
    <el-table
      v-if="checkboxFlag"
      ref="staffList"
      :data="staffList"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="fullName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
    </el-table>
    <el-table
      v-else
      size="mini"
      ref="staffList2"
      :data="staffList"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="fullName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
    </el-table>
    <div style="margin-top: 20px;text-align:right">
      <el-button size="mini" @click="$emit('onStaffCancel')">取 消</el-button>

      <el-button size="mini" type="primary" @click="$emit('onSelectStaff',staffs)">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectStaff",
  props: {
    checkboxFlag: {
      type: Boolean,
      required: true
    },
    staffData: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      staffs: [],
      total: 0,
      staffList: []
    };
  },
  mounted() {
    if (
      this.$store.state.loginInfo.firm &&
      this.$store.state.loginInfo.firm.firmId &&
      this.$store.state.loginInfo.firm.firmId != null
    ) {
      this.loadData();
    }
    this.toggleSelection(this.staffData);
  },
  methods: {
    loadData() {
      this.$store
        .dispatch("staff/getList", { filter: {} })
        .then(data => {
          this.staffList = data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSelectionChange(val) {
      // this.staffs = [];
      this.staffs = val;
      console.log(this.staffs);
    },
    handleCurrentChange(val) {
      this.staffs = {};
      this.staffs = val;
      console.log(this.staffs);
    },
    toggleSelection(rows) {
      if (rows) {
        this.staffs = rows;
        rows.forEach(row => {
          this.$refs.staffList.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.staffList.clearSelection();
      }
    }
  }
};
</script>
