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
      this.staffs = val;
    },
    handleCurrentChange(val) {
      this.staffs = {};
      this.staffs = val;
    },

    toggleSelection(rows) {
      if (rows) {
        this.staffList.forEach(item => {
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].staffId == item.staffId) {
              this.$refs.staffList.toggleRowSelection(item, true);
            }
          }
        });
      }
    }
  },
  updated() {
    if (this.checkboxFlag){
      this.$nextTick(() => {
        this.toggleSelection(this.staffData);
      });
    }
  },
  created() {
    this.loadData();
  },
};
</script>
