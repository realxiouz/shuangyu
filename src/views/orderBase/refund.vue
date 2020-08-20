<template>
  <div>
    <el-table :data="ps" @selection-change="onSelectionChange" border ref="table">
      <el-table-column type="selection" width="55" />
      <el-table-column label="乘客类型">
        <template v-slot="{row}">{{row.ageType|ageType}}</template>
      </el-table-column>
      <el-table-column label="姓名" prop="fullName" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="证件类型">
        <template v-slot="{row}">{{row.idCardType|cardType}}</template>
      </el-table-column>
      <el-table-column label="证件号" prop="idCardNo" />
    </el-table>
    <div style="margin-top:10px;">
      <el-button type="primary" @click="onConfirmRefund" :disabled="!this.selVal.length">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ps: {
      type: Array
    }
  },
  data() {
    return {
      selVal: []
    }
  },
  methods: {
    onSelectionChange(val) {
      this.selVal = val
    },
    onConfirmRefund() {
      if (this.selVal.length) {
        this.$emit('refund', this.selVal)
      }
    },
    allSelect() {
      this.$refs.table.toggleAllSelection()
    }
  }
}
</script>