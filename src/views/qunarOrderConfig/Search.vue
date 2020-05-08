<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="14" :sm="15" :md="16" :lg="17" :xl="18">
      <el-form :model="formData" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.orderNo"
              style="width: 100%"
              clearable
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
          <el-form-item label="票号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.ticketNo"
              style="width: 100%"
              clearable
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
          <el-form-item v-show="more" label="订单分类:">
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
          <el-form-item v-show="more" label="订单创建日期:">
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
          <el-form-item v-show="more" label="订单类型:">
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
          <el-form-item v-show="more" label="乘机人姓名:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.name"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="出发日期:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                placeholder="选择日期"
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
          <el-form-item v-show="more" label="乘机人证件号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.cardNo"
              clearable
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
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.flightCode"
              clearable
              style="width: 100%"
            ></el-input>
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
          <el-form-item v-show="more" label="舱位:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.cabin"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="资金账号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.fundAccount"
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
          <el-form-item v-show="more" label="pid:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.pid"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="path:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.path"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="销售出票单号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              clearable
              v-model="formData.rootOrderNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="业务订单编号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              clearable
              v-model="formData.linkOrderNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="交易时间:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                placeholder="选择日期"
                :unlink-panels="true"
                v-model="formData.transactionTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="业务完结时间:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                :unlink-panels="true"
                placeholder="选择日期"
                v-model="formData.finishTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="最晚出票时限:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                :unlink-panels="true"
                placeholder="选择日期"
                v-model="formData.deadlineTicketTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="最晚退票时限:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                :unlink-panels="true"
                placeholder="选择日期"
                v-model="formData.deadlineReturnTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="最晚改签时限:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                :unlink-panels="true"
                placeholder="选择日期"
                v-model="formData.deadlineChangeTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="异常查询:">
            <el-select
              style="width: 100%;"
              clearable
              multiple
              collapse-tags
              v-model="formData.emptyData"
              placeholder="请选择"
            >
              <el-option
                v-for="item in emptyDataValue"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="10" :sm="9" :md="8" :lg="7" :xl="6" class="search-tools">
      <el-button
        icon="el-icon-search"
        class="filter-item"
        type="primary"
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
      <el-button type="primary" size="mini" @click="handleExport">导单</el-button>
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
  name: "orderSearch",
  data() {
    return {
      more: false,
      orderType: orderType,
      supplierData: [],
      formData: {
        voyageType: "", //航程类型
        orderType: "", //订单来源
        flightCode: "", //航班号
        flightDate: "", //出发日期
        cabin: "", //舱位
        status: "", //订单状态
        pnr: "", //PNR
        ticketNo: "", //票号
        orderNo: "", //订单号
        name: "", //乘机人姓名
        cardNo: "", //乘机人证件号
        rootOrderNo: "",
        linkOrderNo: "",
        sourceOrderNo: "",
        createTime: "",
        finishTime: "",
        transactionTime: "",
        emptyData: "",
        exportFlag: 0
      },
      emptyDataValue: [
        {
          value: "pid",
          label: "pid"
        },
        {
          value: "ticketNo",
          label: "ticketNo"
        },
        {
          value: "path",
          label: "path"
        },
        {
          value: "rootOrderNo",
          label: "rootOrderNo"
        },
        {
          value: "linkOrderNo",
          label: "linkOrderNo"
        },
        {
          value: "fundAccount",
          label: "fundAccount"
        },
        {
          value: "accountId",
          label: "accountId"
        }
      ]
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
        ticketNo: null,
        sourceOrderNo: null,
        name: null,
        cardNo: null,
        pnr: null,
        cabin: null,
        flightCode: null,
        fundAccount: null,
        accountId: null,
        pid: null,
        path: null,
        rootOrderNo: null,
        linkOrderNo: null,
        category: null,
        orderType: null,
        flightDate: null,
        createTime: null,
        transactionTime: null,
        finishTime: null,
        deadlineTicketTime: null,
        deadlineReturnTime: null,
        deadlineChangeTime: null,
        voyageType: null
      };
    },
    handleClear() {
      this.formData = this.initSearchForm();
    },
    handleMore() {
      this.more = !this.more;
    },
    handleExport() {
      this.formData.exportFlag = 1;
      this.$emit("onSearch", this.formData);
      this.formData.exportFlag = 0;
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
