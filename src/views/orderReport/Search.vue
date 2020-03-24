<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="80px" size="mini">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="订单号:">
              <el-input v-model="formData.orderNo" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="应收:">
              <el-input v-model="formData.receivable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="应付:">
              <el-input v-model="formData.payable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="实收:">
              <el-input v-model="formData.receipt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item v-show="more" label="实付:">
              <el-input v-model="formData.payment"></el-input>
            </el-form-item>
          </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="利润:">
            <el-input v-model="formData.systemProfit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="采购订单:">
            <el-input v-model="formData.orderNo"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button type="primary" icon="el-icon-search" size="mini" @click="$emit('onSearch', formData)">查询</el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "orderReportSearch",
        data() {
            return {
                more: false,
                formData: {
                    receivable: "",
                    payable: "",
                    receipt: "",
                    payment: "",
                    systemProfit: "",
                    orderNo: ""
                }
            };
        },
        computed: {
            switchIcon() {
                if (!this.more) {
                    return "el-icon-arrow-down el-icon--right";
                } else {
                    return "el-icon-arrow-up el-icon--right";
                }
            }
        },
        methods: {
            handleMore() {
                this.more = !this.more;
            }
        }
    };
</script>

<style scoped></style>
