<template>
  <div>
    <el-steps :active="step" finish-status="success" style="margin-bottom:20px;">
      <el-step title="查询航班信息"></el-step>
      <el-step title="添加乘机人"></el-step>
      <el-step title="下单"></el-step>
      <el-step title="支付"></el-step>
    </el-steps>
    <transition-group name="el-zoom-in-top">
      <div v-show="step == 0" :key="0">
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
          @row-click="clickRowHandle"
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
          <el-table-column prop="providerName" label="供应商" width="100" align="center"></el-table-column>

          <el-table-column prop="codeShare" label="是否共享" width="80" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.codeShare}}</span>
            </template>
          </el-table-column>
          <el-table-column width="80" label="预定" align="center" type="expand">
            <template slot-scope="props">
              <!-- <div v-if="props.row.offerPrice">
                <el-row
                  type="flex"
                  justify="center"
                  v-for="(item,index) in props.row.offerPrice"
                  :key="index"
                >
                  <el-col style="text-align:center;line-height:38px;line-width: 50px">
                    <span>舱位：{{ item.cabin }}</span>
                  </el-col>
                  <el-col style="text-align:center;line-height:38px;">
                    <span>域名：{{ item.domain!=undefined?item.domain.split(".")[0]:"" }}</span>
                  </el-col>
                  <el-col style="text-align:center;line-height:38px;">
                    <span>包装类型：{{ item.prtag }}</span>
                  </el-col>
                  <el-col style="text-align:center;line-height:38px;">
                    <span>舱位等级：{{ formatCabinType(item.cabinType) }}</span>
                  </el-col>
                  <el-col style="text-align:center;line-height:38px;">
                    <span>证件类型：{{ formatPriceCardType(item.cardType) }}</span>
                  </el-col>
                  <el-col style="text-align:center;line-height:38px;">
                    <span>剩余座位数：{{ item.cabinCount }}</span>
                  </el-col>
                  <el-col style="text-align:center;line-height:38px;">
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">{{ item.returnText }}</div>
                      <el-button>退票规则</el-button>
                    </el-tooltip>
                  </el-col>
                  <el-col style="text-align:center;line-height:38px;">
                    <el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content">{{ item.changeText }}</div>
                      <el-button>改签规则</el-button>
                    </el-tooltip>
                  </el-col>
                  <el-col style="text-align:center;line-height:38px;">
                    <span>票面价：{{ item.vppr }}</span>
                  </el-col>
                  <el-col style="text-align:center;line-height:38px;">
                    <span>采购价：{{ item.price }}</span>
                  </el-col>
                  <el-col style="text-align:right;line-height:38px;">
                    <span>
                      <el-button
                        type="primary"
                        style="margin-top:10px;"
                        @click="predetermineOrder(props.row,item)"
                        size="mini"
                      >预定</el-button>
                    </span>
                  </el-col>
                </el-row>
              </div> -->
              <el-table v-if="props.row.offerPrice" border :data="props.row.offerPrice">
                <el-table-column label="操作">
                  <template v-slot="{row}">
                    <el-button type="text">预定</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <div v-else-if="props.row.returnCode=='F'" style="text-align: center;">无数据</div> -->
              <div v-else style="text-align: center;">航班报价搜素中...</div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-row v-show="step == 1" :gutter="20" :key="1">
        <el-col :span="16">
          <!-- <el-form>
            <el-row>
              <el-col :span="16">
                <el-form-item>
                  <el-input v-model="formPassenger.fullName" placeholder="填写乘客姓名" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-select v-model="formPassenger.ageType">
                    <el-option v-for="i in ageTypes" :key="i.value" :label="i.label" :value="i.value" placeholder="乘客类型"  />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-select v-model="formPassenger.idCardType">
                    <el-option v-for="i in cardTypes" :key="i.value" :label="i.label" :value="i.value" placeholder="证件类型"  />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item>
                  <el-input v-model="formPassenger.idCardNo" placeholder="填写乘客证件号" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item>
                  <el-input v-model="formPassenger.phone" placeholder="乘客电话" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="passengers" border style="margin-top:10px;" @selection-change="onPassengerChange">
            <el-table-column label="选择" type="selection" />
            <el-table-column label="乘客类型" width="70">
              <template v-slot="{ row }">
                <el-tag type="primary">{{ ageMap[row.ageType] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" />
            <el-table-column label="电话" prop="phone" width="120" />
            <el-table-column label="证件类型" width="90">
              <template v-slot="{ row }">
                <el-tag type="primary">{{ cardMap[row.idCardType] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="证件号" prop="idCardNo" />
          </el-table>-->
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

      <div v-show="step == 2" :key="2">
        <el-button @click="step++">下单</el-button>
      </div>
      <div v-show="step==3" :key="3">
        <el-button @click="step=0">支付</el-button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CARD_TYPES_MAP,
  AGE_TYPES_MAP,
  AGE_TYPES,
  CARD_TYPES
} from "@/utils/const";
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
      ageMap: AGE_TYPES_MAP,
      cardMap: CARD_TYPES_MAP,
      selPassengers: [],
      ageTypes: AGE_TYPES,
      cardTypes: CARD_TYPES,

      flightData: [],
      loading: false,
      expandRowKeys: [],
      orderNo: false,

      ps: []
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
    getOrderFlight(flightInfo) {
      this.$store
        .dispatch("order/getOrderFlight", flightInfo)
        .then(data => {
          if (data) {
            var lengthData = data.length;
            for (var i = 0; i < lengthData; i++) {
              data[i].providerName = "蜗牛";
              data[i].arfTof = data[i].arf + "/" + data[i].tof;
              data[i].dptArr = data[i].dptAirport + "--" + data[i].arrAirport;
              data[i].dptArrTxt = data[i].dpt + "--" + data[i].arr;
              data[i].allBarePrice = (
                Number(data[i].arf) +
                Number(data[i].tof) +
                Number(data[i].barePrice)
              ).toFixed(2);
              if (data[i].exTrack == "djjj" && !data[i].codeShare) {
                var foflight = this.deepClone(data[i]);
                foflight.providerName = "51Book";
                foflight.exTrack = "51Book";
                foflight.barePrice = "获取中";
                foflight.arfTof = "获取中";
                foflight.allBarePrice = "获取中";
                let flightPrice51 = {
                  arrCode: foflight.arr,
                  depCode: foflight.dpt,
                  dateTime: foflight.flightDate,
                  // cabin: this.orderData.flights[0].cabin,
                  flightNo: foflight.flightNum
                };
                this.$store
                  .dispatch("order/get51FlightPrice", flightPrice51)
                  .then(data => {
                    if (data) {
                      if (data.return.returnCode == "S") {
                        foflight.barePrice = (
                          Number(
                            data.return.flightDataList[0].seatAndPolicyList[0]
                              .ticketPrice
                          ) -
                          Number(
                            Number(
                              data.return.flightDataList[0].seatAndPolicyList[0]
                                .ticketPrice
                            ) *
                              Number(
                                data.return.flightDataList[0]
                                  .seatAndPolicyList[0].policyList[0]
                                  .commisionPoint
                              )
                          ) -
                          Number(
                            data.return.flightDataList[0].seatAndPolicyList[0]
                              .policyList[0].param1
                          )
                        ).toFixed(2);
                        foflight.arfTof =
                          Number(
                            data.return.flightDataList[0].adultAirportTax
                          ) +
                          "/" +
                          Number(data.return.flightDataList[0].adultFuelTax);
                        foflight.allBarePrice = (
                          Number(
                            data.return.flightDataList[0].adultAirportTax
                          ) +
                          Number(data.return.flightDataList[0].adultFuelTax) +
                          Number(foflight.barePrice)
                        ).toFixed(2);
                      } else {
                        foflight.barePrice = "获取失败";
                        foflight.arfTof = "获取失败";
                        foflight.allBarePrice = "获取失败";
                      }
                    }
                  });
                data.push(foflight);
              }
            }
            for (var j = 0; j < data.length; j++) {
              data[j].id = j;
            }
            this.flightData = data;
            this.loading = false;
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
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
    deepClone(data) {
      const type = this.judgeType(data);
      let obj;
      if (type === "array") {
        obj = [];
      } else if (type === "object") {
        obj = {};
      } else {
        // 不再具有下一层次
        return data;
      }
      if (type === "array") {
        for (let i = 0, len = data.length; i < len; i++) {
          obj.push(this.deepClone(data[i]));
        }
      } else if (type === "object") {
        // 对原型上的方法也拷贝了....
        for (const key in data) {
          obj[key] = this.deepClone(data[key]);
        }
      }
      return obj;
    },
    judgeType(obj) {
      // tostring会返回对应不同的标签的构造函数
      const toString = Object.prototype.toString;
      const map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
      };
      if (obj instanceof Element) {
        return "element";
      }
      return map[toString.call(obj)];
    },
    clickRowHandle(row) {
      // let flightPrice = {
      //   arr: row.arr,
      //   dpt: row.dpt,
      //   date: row.flightDate,
      //   ex_track: row.exTrack,
      //   flightNum: row.flightNum
      // };
      // if (!row.offerPrice) {
      //   if (row.providerName == "蜗牛") {
      //     this.getFlightPrice(flightPrice);
      //   }
      //   if (row.providerName == "51Book") {
      //     this.get51FlightPrice(row);
      //   }
      // }
      // if () {

      // }
      let data = {
        orderNo: this.orderNo,
        flightNo: this.getPropertyByCode(row.propertyItems, 'flightCode')
      }
      this.$store.dispatch('policyProduct/searchFlightPrice', data).then(data => {
        // row.offerPrice = [{}, {}]
      })
      setTimeout(_ => {
        row.offerPrice = [{}, {}]
      }, 300)
      // row.
      this.$refs.refTable.toggleRowExpansion(row);
    },
    expandChange(row, expanded) {
      if (expanded) {
        if (row.providerName == "蜗牛") {
          this.getFlightPrice2(row);
        }
        if (row.providerName == "51Book") {
          this.get51FlightPrice(row);
        }
      }
    },
    getFlightPrice2(row) {
      let flightPrice = {
        arr: row.arr,
        dpt: row.dpt,
        date: row.flightDate,
        ex_track: row.exTrack,
        flightNum: row.flightNum
      };
      if (!row.offerPrice) {
        this.$store
          .dispatch("order/getFlightPrice", flightPrice)
          .then(data => {
            if (data) {
              this.$set(row, "offerPrice", data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    formatCabinType(val) {
      if (val === 0) {
        return "经济舱";
      }
      if (val === 1) {
        return "头等舱";
      }
      if (val === 2) {
        return "商务舱";
      }
      if (val === 3) {
        return "经济舱精选";
      }
      if (val === 4) {
        return "经济舱y舱";
      }
      if (val === 5) {
        return "超值头等舱";
      }
      return "";
    },
    formatPriceCardType(val) {
      if (val === 0) {
        return "所有证件";
      }
      if (val === 1) {
        return "身份证";
      }
      return "";
    },
    predetermineOrder() {
      this.step++;
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
    }
  },
  computed: {
    ...mapState("ticket", ["info", "passengers"])
  },
  components: {
    Passengers
  }
};
</script>

<style></style>
