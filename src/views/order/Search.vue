<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.orderNo"
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
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="乘机人姓名:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.name"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="乘机人证件号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.cardNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="PNR:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.pnr"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单状态:">
            <el-select clearable v-model="formData.status" placeholder="全部" style="width: 100%">
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
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
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
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.cabin"
              style="width: 100%"
            ></el-input>
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
          <el-form-item v-show="more" label="订单类型:">
            <el-select clearable v-model="formData.orderType" placeholder="全部" style="width: 100%">
              <el-option label="出票完成" value="10"></el-option>
              <el-option label="改签完成" value="30"></el-option>
              <el-option label="二次改签" value="31"></el-option>
              <el-option label="退票完成" value="20"></el-option>
              <el-option label="二次退票" value="21"></el-option>
              <el-option label="退差" value="22"></el-option>
              <el-option label="退改" value="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="资金账号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.fundAccount"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="平台账号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.accountId"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="pid:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.pid"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="path:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.path"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="销售出票单号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.rootOrderNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="业务订单编号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.linkOrderNo"
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单创建日期:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
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
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="交易时间:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                placeholder="选择日期"
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
          <el-form-item v-show="more" label="为空查询:">
            <el-select
              style="width: 100%;"
              clearable
              multiple 
              v-model="formData.emptyData"
              placeholder="请选择"
            >
              <el-option
                v-for="item in emptyData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
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
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        icon="el-icon-search"
        class="filter-item"
        type="primary"
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
  name: "orderSearch",
  data() {
    return {
      more: false,
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
        createTime: "",
        finishTime: "",
        transactionTime: ""
      },
      // pid,path,level,rootOrderNo,linkOrderNo
      emptyData: [
         {
          value: "rootOrderNo",
          label: "rootOrderNo"
        },{
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
        },
        {
          value: "pid",
          label: "pid"
        },
        {
          value: "path",
          label: "path"
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
    handleMore() {
      this.more = !this.more;
    }
  }
};
</script>
