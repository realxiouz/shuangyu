<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="17" :md="18" :lg="19" :xl="20">
      <el-form :model="formData" label-width="80px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单号:">
            <el-input
              v-model="formData.orderNo"
              @keyup.enter.native="$emit('onSearch', formData)"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="源单号:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.sourceOrderNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="80px" label="订单类型:">
            <el-select clearable v-model="formData.orderType" placeholder="全部" style="width: 100%">
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
          <el-form-item label-width="80px" v-show="more" label="订单分类:">
            <el-select
              style="width: 100%;"
              clearable
              collapse-tags
              v-model="formData.category"
              placeholder="请选择"
            >
              <el-option label="销售单" value="0"></el-option>
              <el-option label="采购单" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单日期:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                :unlink-panels="true"
                placeholder="选择日期"
                v-model="formData.createTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="政策代码:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.policyCode"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="票号:">
            <el-input v-model="formData.ticketNo" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="乘机人:">
            <el-input v-model="formData.name" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="供应商:">
            <el-select
              clearable
              filterable
              placeholder="请选择供应商"
              v-model="formData.merchantId"
              style="width: 100%"
            >
              <el-option
                v-for="item in supplierData"
                :key="item.merchantId"
                :label="item.firm.firmName"
                :value="item.merchantId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="客户:">
            <el-input v-model="formData.orderSource" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="100px" v-show="more" label="销售出票单号:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.rootOrderNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="100px" v-show="more" label="乘机人证件号:">
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
          <el-form-item v-show="more" label="舱位:">
            <el-input clearable v-model="formData.cabin" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航程类型:">
            <el-select
              style="width: 100%;"
              clearable
              collapse-tags
              v-model="formData.voyageType"
              placeholder="请选择"
            >
              <el-option label="单程" value="0"></el-option>
              <el-option label="往返" value="1"></el-option>
              <el-option label="连程" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="总价:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startAmount"
                  placeholder="最小值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endAmount"
                  placeholder="最大值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="应收金额:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startReceivable"
                  placeholder="最小值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endReceivable"
                  placeholder="最大值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="实收金额:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startReceipt"
                  placeholder="最小值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endReceipt"
                  placeholder="最大值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="应付金额:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startPayable"
                  placeholder="最小值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endPayable"
                  placeholder="最大值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="实付金额:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.startPayment"
                  placeholder="最小值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endPayment"
                  placeholder="最大值"
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
                  placeholder="最小值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endSystemProfit"
                  placeholder="最大值"
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
                  placeholder="最小值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endShouldProfit"
                  placeholder="最大值"
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
                  placeholder="最小值"
                  style="width: 100%"
                ></el-input>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-input
                  clearable
                  v-model="formData.endProfit"
                  placeholder="最大值"
                  style="width: 100%"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4" class="search-tools">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="$emit('onSearch', formData)"
      >查询</el-button>
      <el-button
        icon="el-icon-refresh"
        class="filter-item"
        type="primary"
        size="mini"
        @click="handleClear"
      >清空</el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
import { orderType } from "@/utils/status.js";

export default {
  name: "orderReportSearch",
  data() {
    return {
      more: false,
      formData: this.initSearchForm(),
      supplierData: [],
      orderType: orderType
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
    initSearchForm() {
      return {
        voyageType: null, //航程类型
        orderType: null, //订单来源
        flightCode: null, //航班号
        flightDate: null, //出发日期
        cabin: null, //舱位
        status: null, //订单状态
        pnr: null, //PNR
        ticketNo: null, //票号
        orderNo: null, //订单号
        name: null, //乘机人姓名
        cardNo: null, //乘机人证件号
        createTime: null,
        rootOrderNo: null
      };
    },
    handleClear() {
      this.formData = this.initSearchForm();
    },
    handleMore() {
      this.more = !this.more;
    },
    // 获取供应商
    getSupplier() {
      this.$store
        .dispatch("firmMerchant/getList", {
          filter: { merchantType: 0 }
        })
        .then(data => {
          this.supplierData = data;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  },
  watch: {
    more(val, newVal) {
      if (!newVal) {
        this.getSupplier();
      }
    }
  }
};
</script>

<style scoped></style>
