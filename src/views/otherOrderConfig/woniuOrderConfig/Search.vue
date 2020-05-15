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
              v-model="formData.tktno"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单日期:">
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
          <el-form-item v-show="more" label="乘机人:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.personName"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航班号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.flightNo"
              clearable
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
                placeholder="选择日期"
                :unlink-panels="true"
                v-model="formData.depDate"
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
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航程类型:">
            <el-select
              style="width: 100%;"
              clearable
              v-model="formData.voyageType"
              placeholder="请选择"
            >
              <el-option label="单程" value="0"></el-option>
              <el-option label="往返" value="1"></el-option>
              <el-option label="连程" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-if="more && orderType == 10" label="订单状态:">
            <el-select
              style="width: 100%;"
              clearable
              v-model="formData.orderStatus"
              placeholder="请选择"
            >
              <el-option label="订座成功等待支付" value="0"></el-option>
              <el-option label="支付成功等待出票" value="2"></el-option>
              <el-option label="出票完成" value="4"></el-option>
              <el-option label="已取消订单" value="7"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-if="more && orderType == 20" label="退票原因:">
            <el-select
              style="width: 100%;"
              clearable
              v-model="formData.refundType"
              placeholder="请选择"
            >
              <el-option label="自愿退票" value="1"></el-option>
              <el-option label="航变退票" value="2"></el-option>
              <el-option label="病退" value="3"></el-option>
              <!-- <el-option label="空" value="0"></el-option> -->
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
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "qunarOrderSearch",
  props: ["orderType"],
  data() {
    return {
      more: false,
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
        tktno: null,
        personName: null,
        cabin: null,
        flightNo: null,
        depDate: null,
        createTime: null,
        voyageType: null,
        refundType: null,
        orderStatus: null
      };
    },
    handleClear() {
      console.log("2222222");
      this.formData = this.initSearchForm();
    },
    handleMore() {
      this.more = !this.more;
    },
    handleExport() {
      this.$emit("onSearch", this.formData);
    }
  },
  attached() {
    console.log("beforeDestroy");
  }
};
</script>
