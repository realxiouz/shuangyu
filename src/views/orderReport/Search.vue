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
          <el-form-item v-show="more" label="PNR:">
            <el-input v-model="formData.pnr" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单状态:">
            <el-select v-model="formData.status" placeholder="全部" style="width: 100%">
              <el-option label="出票中" value="3"></el-option>
              <el-option label="出票完成" value="4"></el-option>
              <el-option label="退票完成" value="13"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="出发日期:">
            <el-col>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.flightDate"
                style="width: 100%;"
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
            <el-input v-model="formData.flightCode" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单来源:">
            <el-select v-model="formData.orderSource" placeholder="全部" style="width: 100%">
              <el-option label="去哪网" value="qunawang"></el-option>
              <el-option label="飞猪" value="feizhu"></el-option>
            </el-select>
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
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单日期:">
            <el-col>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.createTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
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
                    voyageType: "", //航程类型
                    orderSource: "", //订单来源
                    flightCode: "", //航班号
                    flightDate: "", //出发日期
                    cabin: "", //舱位
                    status: "", //订单状态
                    pnr: "", //PNR
                    ticketNo: "", //票号
                    orderNo: "", //订单号
                    name: "", //乘机人姓名
                    cardNo: "",//乘机人证件号
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
