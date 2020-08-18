<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="14" :sm="15" :md="16" :lg="17" :xl="18">
      <el-form :model="formData" label-width="70px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="70px" label="订单号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.orderNo"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="80px" label="订单日期:">
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
          <el-form-item label="乘机人:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.name"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="政策代码:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.policySource"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航班号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.code"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="起飞机场:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.dep"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="落地机场:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.arr"
              clearable
              style="width: 100%"
            ></el-input>
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
          <el-form-item v-show="more" label="PNR:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.pnr"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="票号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.eticketNum"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单状态:">
            <el-select clearable v-model="formData.status" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in qunarStatus"
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
      >查询
      </el-button>
      <el-button
        icon="el-icon-refresh"
        class="filter-item"
        type="primary"
        size="mini"
        @click="handleClear"
      >清空
      </el-button>
       <el-button  icon="el-icon-download" type="primary" size="mini" @click="$emit('onExport', formData)">导单</el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
  import {qunarStatus} from "@/utils/orderFormdata.js";


  export default {
    name: "qunarOrderSearch",
    data() {
      return {
        more: false,
        qunarStatus: qunarStatus,
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
          name: null,
          cabin: null,
          createTime: null,
          policySource: null,
          dep:null,
          arr:null,
          code:null,
          pnr:null,
          eticketNum:null
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
