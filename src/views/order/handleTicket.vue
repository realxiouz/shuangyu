<template>
  <div>
    <el-table :data="passengerData" size="mini" highlight-current-row style="width: 100%;" fit>
      <el-table-column prop="name" label="姓名" width="80" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" width="50" align="center"></el-table-column>
      <el-table-column
        prop="ageType"
        :formatter="formatAgeType"
        label="乘机人类型"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column prop="cardType" :formatter="formatCardType" label="乘机人证件类型" align="center"></el-table-column>
      <el-table-column prop="cardNo" label="乘机人证件号" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cardNo"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ticketNo" label="票号" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ticketNo"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-form :model="formData" label-width="110px" size="mini" style="margin-top:15px;">
      <el-row>
        <el-col :span="12">
          <el-form-item label="出发地:">
            <span>{{dpt}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达城市:">
            <span>{{arr}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="航班号:">
            <span>{{flightCode}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出发日期:">
            <span>{{formatDate(flightDate,'YYYY-MM-DD')}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出发时间:">
            <span>{{dptTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达时间:">
            <span>{{arrTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="仓位代码:">
            <span>{{cabin}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="渠道:">
            <el-select
              clearable
              filterable
              @change="selectSource"
              placeholder="请选择渠道"
              v-model="formData.orderSource"
              style="width: 100%"
            >
              <el-option label="蜗牛" value="QUNAR_OPEN"></el-option>
              <el-option label="BSP" value="bsp"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原单号:">
            <el-input :disabled="this.sourceFlag" v-model="formData.sourceOrderNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单日期:">
            <el-date-picker
              :disabled="this.sourceFlag"
              type="datetime"
              placeholder="选择日期"
              v-model="formData.createTime"
              style="width: 100%;"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单状态:">
            <el-select
              :disabled="this.sourceFlag"
              v-model="formData.status"
              clearable
              placeholder="请选择订单状态"
              style="width: 100%"
            >
              <el-option
                v-for="item in statusData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="支付金额:">
            <el-input :disabled="this.sourceFlag" v-model="formData.transactionAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="利润金额:">
            <el-input :disabled="this.sourceFlag" v-model="formData.profit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="使用账号:">
            <el-input :disabled="this.sourceFlag" v-model="formData.fundAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:">
            <el-input :disabled="this.sourceFlag" v-model="formData.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="12">
          <el-form-item label="资金平台:">
            <el-select
              v-model=""
              filterable
              clearable
              placeholder="请选择资金平台"
              style="width: 100%"
            >
              <el-option label="平台1" value="0"></el-option>
              <el-option label="平台2" value="1"></el-option>
              <el-option label="平台3" value="2"></el-option>
              <el-option label="平台4" value="3"></el-option>
              <el-option label="平台5" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="12">
          <el-form-item label="资金账号:">
            <el-select
              v-model="formData.accountId"
              filterable
              clearable
              placeholder="请选择资金账号"
              style="width: 100%"
            >
              <el-option
                v-for="item in accountData"
                :key="item.accountId"
                :label="item.accountName"
                :value="item.accountId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="this.sourceFlag" label="蜗牛账号:">
            <el-select v-model="formData.userNameType" filterable clearable placeholder="请选择蜗牛账号" style="width: 100%">
              <el-option label="15025130712" value="1"></el-option>
              <el-option label="13700600184" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="margin-top: 25px;text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button
        size="mini"
        v-if="this.passengerData[0].orderSource=='QUNAR_OPEN'"
        type="primary"
        @click="handleSaveTicket"
      >保存并贴票</el-button>
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { formatAgeType, formatCardType } from "@/utils/status.js";
export default {
  name: "handleTicket",
  props: ["passengerData", "flightData"],
  data() {
    return {
      arr: this.flightData[0].arr,
      dpt: this.flightData[0].dpt,
      flightCode: this.flightData[0].flightCode,
      dptTime: this.flightData[0].dptTime,
      arrTime: this.flightData[0].arrTime,
      flightDate: this.flightData[0].flightDate,
      cabin: this.flightData[0].cabin,
      sourceFlag: false,
      accountData: [],
      formData: {
        status: "",
        remark: "",
        orderSource: "",
        fundAccount: "",
        createTime: "",
        ticketNoFlag: "0",
        userNameType:""
      },
      statusData: [
        {
          value: "1",
          label: "下单成功"
        },
        {
          value: "2",
          label: "下支付成功等待出票单成功"
        },
        {
          value: "3",
          label: "出票中"
        },
        {
          value: "4",
          label: "出票完成"
        },
        {
          value: "5",
          label: "订单取消"
        },
        {
          value: "10",
          label: "未出票申请退款"
        },
        {
          value: "11",
          label: "退票申请中"
        },
        {
          value: "12",
          label: "退票完成等待退款"
        },
        {
          value: "13",
          label: "退款完成"
        },
        {
          value: "19",
          label: "退款驳回"
        },
        {
          value: "20",
          label: "退票申请中"
        },
        {
          value: "21",
          label: "改签完成"
        },
        {
          value: "29",
          label: "改签驳回"
        },
        {
          value: "40",
          label: "等待座位确认"
        },
        {
          value: "41",
          label: "订座成功等待价格确认"
        },
        {
          value: "50",
          label: "蜗牛订单号错误"
        }
      ]
    };
  },
  methods: {
    formatAgeType,
    formatCardType,
    // 保存并贴票
    handleSaveTicket() {
      this.formData.ticketNoFlag = "1";
      this.$emit("onSaveTicket", this.formData);
    },
    // 判断选中渠道是否是蜗牛
    selectSource(value) {
      // console.log(value);
      if (value == "QUNAR_OPEN") {
        this.sourceFlag = true;
      } else {
        this.sourceFlag = false;
      }
    },
    // 获取资金账号
    getFinance() {
      this.$store
        .dispatch("fundAccount/getList", {
          filter: {}
        })
        .then(data => {
          this.accountData = data.data;
          // console.log(data);
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    // 保存
    handleSave() {
      this.formData.flightData = this.flightData;
      this.formData.passengers = this.passengerData;
      this.$emit("onSave", this.formData);
    },
    // 日期格式化
    initDate(dateStr, format) {
      if (dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    }
  },
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  },
  created() {
    this.getFinance();
    // console.log(this.passengerData);
  }
};
</script>
