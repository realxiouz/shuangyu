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
          <el-form-item label="票号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.ticketNo"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
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
        </el-col> -->
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单分类:">
            <el-select style="width: 100%;" clearable v-model="formData.category" placeholder="请选择">
              <el-option label="销售单" value="0"></el-option>
              <el-option label="采购单" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单状态:">
            <el-select clearable v-model="formData.orderType" placeholder="全部" style="width: 100%">
              <el-option label="出票" value="10"></el-option>
              <el-option label="退票" value="20"></el-option>
              <el-option label="改签" value="30"></el-option>
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
      <!-- <el-button type="primary" size="mini" @click="handleExport">导单</el-button> -->
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
  name: "qunarOrderSearch",
  data() {
    return {
      more: false,
      orderType: orderType,
      formData: this.initSearchForm()
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
        cabin: null,
        flightCode: null,
        category: null,
        orderType: null,
        flightDate: null,
        createTime: null,
        voyageType: null,
        policyCode: null,
        airlineCode: null
      };
    },
    handleClear() {
      this.formData = this.initSearchForm();
    },
    handleMore() {
      this.more = !this.more;
    },
    handleExport() {
      this.$emit("onSearch", this.formData);
    }
  }
};
</script>
