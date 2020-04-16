<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单号:">
            <el-input
              clearable
              v-model="formData.orderNo"
              @keyup.enter.native="$emit('onSearch', formData)"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="票号:">
            <el-input clearable v-model="formData.ticketNo" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="乘机人姓名:">
            <el-input clearable v-model="formData.name" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="乘机人证件号:">
            <el-input clearable v-model="formData.cardNo" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="PNR:">
            <el-input clearable v-model="formData.pnr" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="出发日期:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                :unlink-panels="true"
                placeholder="选择日期"
                v-model="formData.flightDate"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="销售出票单号:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.rootOrderNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="舱位:">
            <el-input clearable v-model="formData.cabin" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航班号:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.flightCode"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="总价:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startAmount"
                  placeholder="初始值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endAmount"
                  placeholder="结束值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="应收:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startReceivable"
                  placeholder="初始值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endReceivable"
                  placeholder="结束值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="实收:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startReceipt"
                  placeholder="初始值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endReceipt"
                  placeholder="结束值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="应付:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startPayable"
                  placeholder="初始值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endPayable"
                  placeholder="结束值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="实付:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startPayment"
                  placeholder="初始值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endPayment"
                  placeholder="结束值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="系统利润:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startSystemProfit"
                  placeholder="初始值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endSystemProfit"
                  placeholder="结束值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="业务利润:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startShouldProfit"
                  placeholder="初始值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endShouldProfit"
                  placeholder="结束值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="财务利润:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startProfit"
                  placeholder="初始值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endProfit"
                  placeholder="结束值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单日期:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :unlink-panels="true"
                type="daterange"
                placeholder="选择日期"
                v-model="formData.createTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="6">
          <el-form-item v-show="more" label="航程类型:">
            <el-radio-group v-model="formData.voyageType" style="width: 100%">
              <el-radio label="0">单程</el-radio>
              <el-radio label="1">往返</el-radio>
              <el-radio label="2">连程</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="$emit('onSearch', formData)"
      >查询</el-button>
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
        voyageType: "", //航程类型
        orderType: 0, //订单来源
        flightCode: "", //航班号
        flightDate: "", //出发日期
        cabin: "", //舱位
        status: "", //订单状态
        pnr: "", //PNR
        ticketNo: "", //票号
        orderNo: "", //订单号
        name: "", //乘机人姓名
        cardNo: "", //乘机人证件号
        createTime: ""
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
