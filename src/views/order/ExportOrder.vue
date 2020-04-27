<template>
  <div class="contentBox">
    <el-row style="margin-bottom:15px; margin-left:38px;">
      <el-button icon="el-icon-plus" @click="exportOrder" type="primary" size="mini">导入</el-button>
    </el-row>
    <el-form ref="formData" :model="formData" label-width="110px" size="mini">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单号:">
            <el-input v-model="formData.sourceOrderNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单状态:">
            <el-select
              v-model="formData.orderType"
              clearable
              placeholder="订单状态"
              style="width: 100%"
            >
              <el-option
                v-for="item in orderType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="类型:" prop="orderType">
            <el-select v-model="formData.historyOrCurrent" clearable placeholder="请选择">
              <el-option label="实时" :value="'0'"></el-option>
              <el-option label="历史" :value="'1'"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item>
            <el-button type="primary" @click="showStaffDialog" size="mini">选择派遣人</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-dialog
        title="选择派遣人"
        center
        :visible.sync="staffDialog"
        width="33%"
        :close-on-click-modal="false"
        :destroy-on-close="true"
      >
        <select-staff v-if="staffDialog" @onCancel="onCancel" @onSave="handleConfirm"></select-staff>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import selectStaff from "./selectStaff";

import { orderType } from "@/utils/status.js";

export default {
  name: "exportOrder",
  data() {
    return {
      formData: {
        firmId: "",
        historyOrCurrent: "",
        orderType: "",
        sourceOrderNo: "",
        staffId: ""
      },
      orderType: orderType,
      staffDialog: false,
      staffId: ""
    };
  },
  components: {
    selectStaff
  },
  methods: {
    onCancel() {
      this.staffDialog = false;
    },
    showStaffDialog() {
      this.staffDialog = true;
    },
    handleConfirm(id) {
      this.staffId = id;
      this.staffDialog = false;
    },
    exportOrder() {
      let params = { ...this.formData };
      params.staffId = this.staffId;
      params.firmId = this.$store.state.loginInfo.firm.firmId;
      if (params.sourceOrderNo == "") {
        this.$notify({
          title: "提示",
          message: "订单号不能为空！",
          type: "warning",
          duration: 4500
        });
        return;
      }
      if (params.orderType == "") {
        this.$notify({
          title: "提示",
          message: "请选择订单状态",
          type: "warning",
          duration: 4500
        });
        return;
      }
      if (params.historyOrCurrent == "") {
        this.$notify({
          title: "提示",
          message: "请选择类型",
          type: "warning",
          duration: 4500
        });
        return;
      }
      if (params.staffId == "") {
        this.$notify({
          title: "提示",
          message: "请选择需要派遣的员工",
          type: "warning",
          duration: 4500
        });
        return;
      }
      this.$store
        .dispatch("qunarOrderController/orderNonexist", params)
        .then(data => {
          if (data) {
            this.$message({
              type: "warning",
              message: data.msg
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>