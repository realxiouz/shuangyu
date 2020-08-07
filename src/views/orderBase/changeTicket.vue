<template>
  <div>
    <el-form
      :rules="formRules"
      :model="formData"
      label-width="110px"
      size="mini"
      style="margin-top:15px;"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="乘客:">
            <span>{{formatPassengers(orderDetailList)}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="航班:">
            <!-- <span>{{changeDataTop.airDivision+changeDataTop.flightNum}}</span> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起飞日期:">
            <!-- <span>{{changeDataTop.flightDate}}</span> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="舱位:">
            <!-- <span>{{changeDataTop.cabin}}</span> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="改签原因:">
        <!-- <span>{{changeDataTop.reason}}</span> -->
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="changeCauseId" label="改签原因:">
            <el-select
              clearable
              v-model="formData.changeCauseId"
              placeholder="请选择退票原因"
              @change="selectTgqReasons"
              style="width: 100%"
            >
              <el-option
                v-for="item in tgqReasons"
                :key="item.code"
                :label="item.msg"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="改签备注:" prop="applyRemarks">
            <el-input placeholder="请输入改签备注..." v-model="formData.applyRemarks"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="改签费:" prop="totalAmount">
            <!--<el-input placeholder="请输入改签费..." v-model="formData.totalAmount"></el-input>-->
            <el-input-number v-model="formData.totalAmount" controls-position="right" :precision="2"
                             placeholder="请输入改签费..."></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="profit" label="利润金额:">
            <!--<el-input placeholder="请输入利润金额..." v-model="formData.profit"></el-input>-->
            <el-input-number v-model="formData.profit" controls-position="right" :precision="2"
                             placeholder="请输入利润金额..."></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item v-model="formData.refundData" label-width="auto">
        <label class="el-form-item__label" style="color:#606266; width:110px;">乘车人:</label>
        <el-table
          :data="passagersChange"
          highlight-current-row
          ref="changePassage"
          @selection-change="handlePassagersChange"
          size="mini"
          fit
          style="width: 100%;"
        >
          <el-table-column :selectable="selectable" type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="cardType" :formatter="formatCardType" label="证件类型" align="center"></el-table-column>
          <el-table-column prop="cardNo" label="证件号" align="center"></el-table-column>
          <el-table-column :formatter="formatAgeType" prop="ageType" label="乘机人类型" align="center"></el-table-column>
          <el-table-column label="价格" align="center">
            <template slot-scope="scope">
              <span>{{formatAmount(scope.row.amount)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ticketNo" label="票号" align="center"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-model="formData.flightData" label-width="auto">
        <label class="el-form-item__label" style="color:#606266; width:110px;">航班信息：</label>
        <el-table
          :data="formData.changeFlightSegmentList"
          ref="changeFlight"
          size="mini"
          highlight-current-row
          @selection-change="handleFlightChange"
          fit
          style="width: 100%;"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="actFlightNo" width="70" label="航班号" align="center"></el-table-column>
          <el-table-column prop="dptAirportCode" width="60" label="出发地" align="center"></el-table-column>
          <el-table-column prop="arrAirportCode" width="60" label="目的地" align="center"></el-table-column>
          <el-table-column prop="changeDate" label="起飞日期" align="center"></el-table-column>
          <el-table-column prop="startTime" label="起飞时间" align="center"></el-table-column>
          <el-table-column prop="endTime" label="到达时间" align="center"></el-table-column>
          <el-table-column prop="cabinCode" label="舱位" width="70" align="center"></el-table-column>
          <el-table-column prop="cabinStatus" label="数显" width="70" align="center"></el-table-column>
          <el-table-column prop="gqFee" label="手续费" width="70" align="center">
            <template slot-scope="scope">
              <span>{{formatAmount(scope.row.gqFee)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="upgradeFee" label="升舱费" width="60" align="center">
            <template slot-scope="scope">
              <span>{{formatAmount(scope.row.upgradeFee)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="allFee" label="总金额" width="80" align="center">
            <template slot-scope="scope">
              <span>{{formatAmount(scope.row.allFee)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="childGqFee" label="儿童改签费" align="center">
            <template slot-scope="scope">
              <span>{{formatAmount(scope.row.childGqFee)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="childUpgradeFee" label="儿童升舱费" align="center">
            <template slot-scope="scope">
              <span>{{formatAmount(scope.row.childUpgradeFee)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="销售退改说明:">
        <span v-if="this.tgqText" v-html="refundChangeRule"></span>
        <span v-else>暂无数据</span>
      </el-form-item>

      <el-form-item label="蜗牛退改说明:">
        <span v-if="this.tgqText" v-html="this.tgqText"></span>
        <span v-if="this.reason" style="color:red;">{{this.reason}}</span>
        <span v-if="!this.tgqText && !this.reason">暂无数据</span>
      </el-form-item>
    </el-form>
    <div style="margin-top: 25px;text-align: right;">
      <!-- <el-button size="mini" @click="$parent">取 消</el-button> -->
      <el-button size="mini" @click="handleSave" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
  import {formatAgeType, formatCardType} from "@/utils/status.js";

  export default {
    name: "changeTicket",
    props: ["changeData", "changeDataTop", "sellAmount", "refundChangeRule"],
    data() {
      return {
        changeDataResult: [],
        tgqReasons: "",
        reason: "",
        tgqText: "",
        orderDetailList: "",
        passagersChange: [],
        formData: {
          appKey: "",
          changeFlightSegmentList: [],
          passengerIds: "",
          flightData: "",
          changePassagers: "",
          applyRemarks: "",
          totalAmount: ""
        },
        formRules: {
          changeCauseId: [
            {required: true, message: "请选择改签原因", trigger: "change"}
          ],
          profit: [
            {
              required: true,
              message: "请选择填写利润金额！",
              trigger: "blur"
            }
          ],
          applyRemarks: [
            {
              required: true,
              message: "必填！",
              trigger: "blur"
            }
          ],
          totalAmount: [
            {
              required: true,
              message: "必填！",
              trigger: "blur"
            }
          ]
        }
      };
    },
    methods: {
      formatCardType,
      formatAgeType,
      // 判断乘客是否可以改签
      selectable(row, index) {
        if (row.canChange) {
          return true;
        } else {
          return false;
        }
      },

      // 乘客表格复选框选中处理
      handlePassagersChange(rows) {
        let str = "";
        rows.forEach(row => {
          str += row.id + ",";
        });
        str = str.substring(0, str.length - 1);
        this.formData.passengerIds = str;
        this.formData.changePassagers = rows;
      },
      // 航班表格选择复选框选中处理
      handleFlightChange(rows) {
        this.formData.flightData = rows;
      },
      // 改签查询
      changeSearchData(params) {
        // this.$store
        //   .dispatch("order/changeSearch", params)
        //   .then(data => {
        //     if (data) {
        //       this.formData.appKey = data.appKey;
        //       this.changeDataResult = data.result;
        //       if (this.orderDetailList) {
        //         for (let i = 0; i < this.orderDetailList.length; i++) {
        //           data.result.forEach(item => {
        //             if (this.orderDetailList[i].name.indexOf(item.name) != -1) {
        //               this.orderDetailList[i]["id"] = item.id;
        //               this.orderDetailList[i]["canChange"] =
        //                 item.changeSearchResult.canChange;
        //             }
        //           });
        //         }
        //         this.passagersChange = this.orderDetailList;
        //       }
        //       if (data.result.length > 0) {
        //         if (data.result[0].changeSearchResult.tgqReasons) {
        //           this.tgqReasons = data.result[0].changeSearchResult.tgqReasons;
        //         }
        //         if (data.result[0].changeSearchResult.changeRuleInfo) {
        //           this.tgqText =
        //             data.result[0].changeSearchResult.changeRuleInfo.tgqText;
        //         }
        //         if (data.result[0].changeSearchResult.reason) {
        //           this.reason = data.result[0].changeSearchResult.reason;
        //         }
        //       }
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      },
      // 改签申请
      handleSave() {
        console.log(this.formData, "formData");
        if (this.formData.changePassagers.length < 1) {
          this.$notify({
            title: "提示",
            message: "请选择需要改签的乘客",
            type: "warning",
            duration: 4500
          });
          return;
        }
        if (this.formData.flightData.length == 0) {
          this.$notify({
            title: "提示",
            message: "请选择需要改签的航班",
            type: "warning",
            duration: 4500
          });
          return;
        }
        if (this.formData.flightData.length > 1) {
          this.$notify({
            title: "提示",
            message: "改签航班只能选择一个",
            type: "warning",
            duration: 4500
          });
          return;
        }
        // let adultCount = 0;
        // let childCount = 0;

        // this.formData.changePassagers.forEach(item => {
        //   if (item.ageType == "0") {
        //     adultCount += 1;
        //   } else if (item.ageType == "1") {
        //     childCount += 1;
        //   }
        // });
        // let adultFee = 0;
        // if (adultCount > 0) {
        //   adultFee =
        //     Number(this.formData.flightData[0].gqFee) * adultCount +
        //     Number(this.formData.flightData[0].upgradeFee) * adultCount;
        // }
        // let childFee = 0;
        // if (childCount > 0) {
        //   childFee =
        //     Number(this.formData.flightData[0].childGqFee) * childCount +
        //     Number(this.formData.flightData[0].childUpgradeFee) * childCount;
        // }
        // let totalCount = adultFee + childFee;
        // if (totalCount != this.formData.totalAmount) {
        //   this.$notify({
        //     title: "提示",
        //     message: "改签费计算错误",
        //     type: "warning",
        //     duration: 4500
        //   });
        //   return;
        // }
        // let _profit = 0;
        // console.log("changeTotalAmount:" + this.formData.totalAmount);
        // console.log("changeSellAmount:" + this.sellAmount);
        // _profit = Number(this.sellAmount) - Number(this.formData.totalAmount);
        // if (_profit != this.formData.profit) {
        //   this.$notify({
        //     title: "提示",
        //     message: "利润金额计算错误，请重新计算！",
        //     type: "warning",
        //     duration: 4500
        //   });
        //   return;
        // }
        this.$emit("onSavechange", this.formData);
      },
      // 改签原因选中处理
      selectTgqReasons(value) {
        let code = value;
        let flightNo =
          this.changeDataTop.airDivision + this.changeDataTop.flightNum;
        let actFlightNo = "";
        this.tgqReasons.forEach(item => {
          if (item.code === code) {
            if (item.changeFlightSegmentList) {
              this.formData.changeFlightSegmentList =
                item.changeFlightSegmentList;
            }
          }
        });
        this.formData.changeFlightSegmentList.forEach(item => {
          if (item.flightNo == flightNo) {
            actFlightNo = item.actFlightNo;
          }
        });
        var _arr = [];
        this.formData.changeFlightSegmentList.forEach(item => {
          if (item.actFlightNo == actFlightNo) {
            _arr.push(item);
          }
        });
        this.formData.changeFlightSegmentList = _arr;
      },

      // 格式化日期
      initDate(dateStr, format) {
        if (dateStr > 0) {
          let date = new Date(dateStr);
          return this.$moment(date).format(format);
        } else {
          return "";
        }
      },
      // 格式化乘客
      formatPassengers(data) {
        if (!data || data.length == 0) {
          return "";
        }
        let str = "";
        data.forEach(item => {
          str += item.name + " / ";
        });

        return str.substring(0, str.length - 2);
      },
      // 格式化航班日期
      formatFlightDate(data) {
        if (!data || data.length == 0) {
          return "";
        }
        return this.initDate(data[0].flightDate, "YYYY-MM-DD");
      },
      // 格式化金额
      formatAmount(amount) {
        if (!amount) {
          return "￥0.00";
        }
        return "￥" + this.$numeral(amount).format("0.00");
      }
    },
    created() {
      // let params = {};
      // params.purchaseOrderNo = this.changeData.sourceOrderNo;
      // params.changeDptDate = this.changeDataTop.flightDate;
      // let arr = [];
      // for (let i = 0; i < this.changeDataTop.passagers.length; i++) {
      //   this.changeData.orderDetailList.forEach(item => {
      //     if (this.changeDataTop.passagers[i].cardNo.indexOf(item.cardNo) != -1) {
      //       arr.push(item);
      //     }
      //   });
      // }
      // this.orderDetailList = arr;
      // this.changeSearchData(params);
      // console.log(this.sellAmount, "sellAmount");
    }
  };
</script>
<style>
  .el-input-number--mini {
    width: 100%;
    line-height: 26px;
  }
</style>
