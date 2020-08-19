<template>
  <div>
    <el-steps :active="step" finish-status="success" style="margin-bottom:20px;">
      <el-step title="查询航班信息"></el-step>
      <el-step title="添加乘机人"></el-step>
      <el-step title="下单"></el-step>
      <el-step title="支付"></el-step>
    </el-steps>
   
    <div v-show="step == 0" >
      <el-form :inline="true" label-position="top" :model="form" style="margin-bottom:20px;margin-left:15px">
        <el-form-item label="出发城市">
          <el-input v-model="form.dpt" :disabled="!!orderNo" />
        </el-form-item>
        <el-form-item label="到达城市">
          <el-input v-model="form.arr" :disabled="!!orderNo" />
        </el-form-item>
        <el-form-item label="出发时间">
          <el-date-picker v-model="form.date" :disabled="!!orderNo" />
        </el-form-item>
        <el-form-item label="操作">
          <el-button @click="onSearch">搜索</el-button>
          <!-- <el-button @click="$router.push('/product/purchase/order/edit?isAdd=1')">补单</el-button> -->
          <el-button @click="step++">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-table
        row-key="id"
        :data="flightData"
        :expand-row-keys="expandRowKeys"
        v-loading="loading"
        size="mini"
        highlight-current-row
        @expand-change="expandChange"
        style="width: 100%;"
        ref="refTable"
        fit
      >
        <el-table-column label="主航班号">
          <template v-slot="{row}">{{getPropertyByCode(row.propertyItems, 'actFlightCode')}}</template>
        </el-table-column>
        <el-table-column label="航班号">
          <template v-slot="{row}">{{getPropertyByCode(row.propertyItems, 'flightCode')}}</template>
        </el-table-column>
        <el-table-column label="出发时间">
          <template v-slot="{row}">{{getPropertyByCode(row.propertyItems, 'dptTime')}}</template>
        </el-table-column>
        <el-table-column label="到达时间">
          <template v-slot="{row}">{{getPropertyByCode(row.propertyItems, 'arrTime')}}</template>
        </el-table-column>
        <el-table-column label="出发地">
          <template v-slot="{row}">{{getPropertyByCode(row.propertyItems, 'dpt')}}</template>
        </el-table-column>
        <el-table-column label="到达地">
          <template v-slot="{row}">{{getPropertyByCode(row.propertyItems, 'arr')}}</template>
        </el-table-column>
        <el-table-column label="航司">
          <template v-slot="{row}">{{getPropertyByCode(row.propertyItems, 'airlineCode')}}</template>
        </el-table-column>
        <el-table-column label="机建/燃油">
          <template
            v-slot="{row}"
          >{{getPropertyByCode(row.propertyItems, 'constructionFee')}}/{{getPropertyByCode(row.propertyItems, 'fuelTax')}}</template>
        </el-table-column>
        <el-table-column prop="supplierName" label="供应商" width="100" align="center" />

        <el-table-column prop="codeShare" label="是否共享" width="80" align="center">
          <template v-slot="{row}">{{getPropertyByCode(row.propertyItems, 'shareFlag')}}</template>
        </el-table-column>
        <el-table-column width="80" label="预定" align="center" type="expand">
          <template v-slot="{row}">
            <el-table v-if="row.offerPrice" border :data="row.offerPrice">
              <el-table-column :label="getPropertyName(row.propertyItems, 'exTrack')">
                <template v-slot="{row}">
                  {{getPropertyByCode(row.propertyItems, 'exTrack')}}
                </template>
              </el-table-column>
              <el-table-column :label="getPropertyName(row.propertyItems, 'barePrice')">
                <template v-slot="{row}">
                  {{getPropertyByCode(row.propertyItems, 'barePrice')}}
                </template>
              </el-table-column>
              <el-table-column :label="getPropertyName(row.propertyItems, 'returnText')" show-overflow-tooltip>
                <template v-slot="{row}">
                  {{getPropertyByCode(row.propertyItems, 'returnText')}}
                </template>
              </el-table-column>
              <el-table-column :label="getPropertyName(row.propertyItems, 'changeText')" show-overflow-tooltip>
                <template v-slot="{row}">
                  {{getPropertyByCode(row.propertyItems, 'changeText')}}
                </template>
              </el-table-column>
              
              <el-table-column label="操作">
                <template v-slot="{row}">
                  <el-button type="text" @click="onPreviewBuy(row)">预定</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div v-else style="text-align: center;">航班报价搜素中...</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-row v-show="step == 1" :gutter="20" >
      <el-col :span="16">
        <el-form :disabled="!!orderNo">
          <passengers ref="passengers" v-model="ps" />
        </el-form>
        <el-button-group>
          <el-button @click="step--">上一步</el-button>
          <el-button @click="onConfirm" :disabled="!ps.length">提交订单</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>

    <div v-show="step == 2" >
      <el-button @click="onOrder">下单</el-button>
    </div>
    <div v-show="step==3" >
      <el-button @click="step=0">支付</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Passengers from "@/components/Passengers";

export default {
  created() {
    // this.$store.dispatch("airport/getList", {}).then(r => {
    // });
    this.orderNo = this.$route.query.orderNo;
    if (this.orderNo) {
      let { dpt, arr, dptTime, flightCode, flightDate } = this.info;
      this.form = {
        arr,
        dpt,
        date: flightDate
      };
      this.getData();
    }
    this.ps = !this.orderNo ? [] : this.passengers;
  },
  data() {
    return {
      form: {
        arr: "",
        dpt: "",
        date: ""
      },
      formPassenger: {
        fullName: "",
        ageType: "",
        idCardType: "",
        idCardNo: "",
        phone: ""
      },
      step: 0,
      selPassengers: [],

      flightData: [],
      loading: false,
      expandRowKeys: [],
      orderNo: '',

      ps: [],
      merchantId: '',
    };
  },
  methods: {
    onSearch() {
      this.getData();
    },
    getData() {
      let actionName = this.orderNo
        ? "policyProduct/getListByNo"
        : "policyProduct/getList";
      let payload = this.orderNo ? { sellerOrderNo: this.orderNo } : this.form;
      this.$store.dispatch(actionName, payload).then(data => {
        this.flightData = data;
      });
    },
    onPassengerChange(val) {
      this.selPassengers = val;
    },
    onConfirm() {
      if (this.$refs.passengers.validate()) {
        this.step++;
      }
    },
    expandChange(row, expanded) {
      this.merchantId = row.supplierId
      this.getPrice(row)
    },
    getPrice(row) {
      if (row.offerPrice) {
        return
      }
      let data = {
        orderNo: this.orderNo,
        flightNo: this.getPropertyByCode(row.propertyItems, 'flightCode')
      }
      this.$store.dispatch('policyProduct/searchFlightPrice', data).then(data => {
        this.$set(row, 'offerPrice', data)
      })
    },
    getPropertyByCode(arr, code) {
      let item = arr.find(i => i.code == code);
      return item ? this.getValByType(item) : "";
    },
    getValByType(i) {
      switch (i.type) {
        case "String":
          return i["_string"];
        case "Boolean":
          return i["_bool"];
        case "ArrayList":
          return i["_array"].join(",");
        case "Double":
          return i["_double"];
        case "Float":
          return i["_float"];
        case "Integer":
          return i["_int"];
        case "Byte":
          return i["_byte"];
        case "Short":
          return i["_short"];
        case "Long":
          return i["_long"];
        case "Date":
          return this.$moment(i["_date"]).format(i.format || "YYYY-MM-DD");
        default:
          return i["_string"];
      }
    },
    getPropertyName(arr, code) {
      let item = arr.find(i => i.code == code)
      return item ? item.name : ""
    },
    onPreviewBuy(i) {
      this.orderItem = i
      this.step++
    },
    onOrder() {
      let data = {
        ...this.orderItem,
        parentNo: this.parentNo,
        passengers: this.ps,
        merchantId: this.merchantId,
      }
      this.$store.dispatch('policyProduct/order', data).then(data => {
        
      } )
    },
  },
  computed: {
    ...mapState("ticket", ["info", "passengers", "parentNo"])
  },
  components: {
    Passengers
  }
};
</script>

<style></style>
