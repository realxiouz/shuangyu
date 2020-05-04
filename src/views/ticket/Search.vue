<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单号:">
            <el-input
              v-model="formData.orderNo"
              @keyup.enter.native="$emit('onSearch', formData)"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="票号:">
            <el-input v-model="formData.ticketNo" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="乘机人姓名:">
            <el-input v-model="formData.name" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="乘机人证件号:">
            <el-input v-model="formData.cardNo" style="width: 100%"></el-input>
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
          <el-form-item v-show="more" label="舱位:">
            <el-input v-model="formData.cabin" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航班号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.flightCode"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单状态:">
            <el-select
              clearable
              v-model="formData.orderStatus"
              placeholder="全部"
              style="width: 100%"
            >
              <el-option label="下单成功" value="1"></el-option>
              <el-option label="支付成功等待出票" value="2"></el-option>
              <el-option label="出票中" value="3"></el-option>
              <el-option label="出票完成" value="4"></el-option>
              <el-option label="订单取消" value="5"></el-option>
              <el-option label="未出票申请退款" value="10"></el-option>
              <el-option label="退票申请中" value="11"></el-option>
              <el-option label="退票完成等待退款" value="12"></el-option>
              <el-option label="退款完成" value="13"></el-option>
              <el-option label="退款驳回" value="19"></el-option>
              <el-option label="退票申请中" value="20"></el-option>
              <el-option label="改签完成" value="21"></el-option>
              <el-option label="改签驳回" value="29"></el-option>
              <el-option label="等待座位确认" value="40"></el-option>
              <el-option label="订座成功等待价格确认" value="41"></el-option>
              <el-option label="蜗牛订单号错误" value="50"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
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
        </el-col> -->
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="$emit('onSearch', formData)"
      >查询
      </el-button>
      <el-button icon="el-icon-refresh" class="filter-item" type="primary" size="mini" @click="handleClear">清空
      </el-button>
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
                formData: this.initSearchForm(),
                emptyDataValue: [
                    {
                        value: "ticketNo",
                        label: "ticketNo"
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
                    orderType: null, //订单来源
                    flightCode: null, //航班号
                    flightDate: null, //出发日期
                    cabin: null, //舱位
                    ticketNo: null, //票号
                    orderNo: null, //订单号
                    name: null, //乘机人姓名
                    cardNo: null, //乘机人证件号
                    orderStatus: null,
                    emptyData: null
                };
            },
            handleClear() {
                this.formData = this.initSearchForm();
            },
            handleMore() {
                this.more = !this.more;
            }
        }
    };
</script>

<style scoped></style>
