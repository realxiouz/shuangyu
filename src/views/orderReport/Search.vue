<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="17" :md="18" :lg="19" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单分类:">
            <el-select
              style="width: 100%;"
              clearable
              collapse-tags
              @change="selectCategory"
              v-model="formData.category"
              placeholder="请选择"
            >
              <el-option label="销售单" value="0"></el-option>
              <el-option label="采购单" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="!showData" label="订单日期:">
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
          <el-form-item v-show="showData" label="采购日期:">
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
          <el-form-item v-show="more" label="源单号:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.sourceOrderNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单类型:">
            <el-select clearable v-model="formData.orderType" placeholder="请选择" style="width: 100%">
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
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.orderSource"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="平台账号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.accountId"
              clearable
              style="width: 100%"
            ></el-input>
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
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.ticketNo"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="乘机人:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.name"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="乘机人证件号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              clearable
              v-model="formData.cardNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="PNR:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              clearable
              v-model="formData.pnr"
              style="width: 100%"
            ></el-input>
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
          <el-form-item v-show="more" label="航司:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.airlineCode"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="舱位:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              clearable
              v-model="formData.cabin"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航班日期:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                :unlink-panels="true"
                v-model="formData.flightDate"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
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
                  @keyup.enter.native="$emit('onSearch', formData)"
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
                  @keyup.enter.native="$emit('onSearch', formData)"
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
                  @keyup.enter.native="$emit('onSearch', formData)"
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
                  @keyup.enter.native="$emit('onSearch', formData)"
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
                  @keyup.enter.native="$emit('onSearch', formData)"
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
                  @keyup.enter.native="$emit('onSearch', formData)"
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
                  @keyup.enter.native="$emit('onSearch', formData)"
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
                  @keyup.enter.native="$emit('onSearch', formData)"
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
      orderType: orderType,
      showData: false
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
        orderNo: null,
        createTime: null,
        sourceOrderNo: null,
        orderType: null,
        category: null,
        merchantId: null,
        orderSource: null,
        accountId: null,
        ticketNo: null,
        name: null,
        cardNo: null,
        pnr: null,
        flightCode: null,
        airlineCode: null,
        cabin: null,
        voyageType: null,
        startAmount: null,
        endAmount: null,
        startReceivable: null,
        endReceivable: null,
        startReceipt: null,
        endReceipt: null,
        startPayable: null,
        endPayable: null,
        startPayment: null,
        endPayment: null,
        startSystemProfit: null,
        endSystemProfit: null,
        startShouldProfit: null,
        endShouldProfit: null,
        startProfit: null,
        endProfit: null
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
    },
    selectCategory(value) {
      console.log(value);
      if (value == "0") {
        this.showData = true;
      } else {
        this.showData = false;
      }
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
