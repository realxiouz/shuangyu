<template>
  <div>
    <el-form :model="formData" ref="fillOutChangeForm" :rules="formRules" label-width="110px" size="mini" style="margin-top:15px;">
      <el-row>
        <el-col :span="8">
          <el-form-item label="供应商:" prop="orderSource">
            <el-select
              clearable
              filterable
              @change="selectSource"
              placeholder="请选择供应商"
              v-model="formData.orderSource"
              style="width: 100%"
            >
              <el-option label="蜗牛" value="QUNAR_OPEN"></el-option>
              <el-option label="BSP" value="bsp"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单号:">
            <el-input clearable v-model="formData.sourceOrderNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item v-show="this.isWoniu">
            <el-radio-group @change="radioChange" v-model="formData.radio" style="width:100%">
              <el-radio label="1">导单</el-radio>
              <el-radio label="2">补单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="this.isWoniu && this.isWoniuTicket">
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单类型:" prop="orderType">
              <el-select
                v-model="formData.orderType"
                clearable
                placeholder="订单类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额:" prop="amount">
              <el-input clearable v-model="formData.amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资金账号:" prop="fundAccountId">
              <el-select
                v-model="formData.fundAccountId"
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
          <el-col :span="8">
            <el-form-item label="蜗牛账号:" prop="userNameType">
              <el-select
                v-model="formData.userNameType"
                filterable
                clearable
                placeholder="请选择蜗牛账号"
                style="width: 100%"
              >
                <el-option label="15025130712" value="1"></el-option>
                <el-option label="13700600184" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单日期:" prop="createTime">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="formData.createTime"
                style="width: 100%;"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单类型:" prop="orderType">
              <el-select
                v-model="formData.orderType"
                clearable
                placeholder="订单类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in orderType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额:"  prop="amount">
              <el-input clearable v-model="formData.amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="利润金额:" prop="profit">
              <el-input clearable v-model="formData.profit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="平台账号:">
              <el-input clearable v-model="formData.accountId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资金账号:" prop="fundAccount">
              <el-select
                v-model="formData.fundAccount"
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
          <el-col :span="8">
            <el-form-item label="出发地:" prop="dpt">
              <el-input clearable v-model="formData.dpt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到达城市:" prop="arr">
              <el-input clearable v-model="formData.arr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="航班号:" prop="flightCode">
              <el-input clearable v-model="formData.flightCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出发日期:" prop="flightDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formData.flightDate"
                style="width: 100%;"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出发时间:" prop="dptTime">
              <el-time-select
                v-model="formData.dptTime"
                :picker-options="{
                start: '00:00',
                step: '00:05',
                end: '23:55'}"
                placeholder="出发时间"
                style="width: 100%;"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到达时间:">
              <el-time-select
                v-model="formData.arrTime"
                :picker-options="{
                start: '00:00',
                step: '00:05',
                end: '23:55'}"
                placeholder="到达时间"
                style="width: 100%;"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="舱位代码:">
              <el-input clearable v-model="formData.cabin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注:">
              <el-input clearable v-model="formData.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-table
          :data="formData.orderDetailList"
          @selection-change="handleSelectionChange"
          size="mini"
          highlight-current-row
          style="width: 100%;"
          fit
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>
          <el-table-column prop="gender" label="性别" width="50" align="center"></el-table-column>
          <el-table-column
            prop="ageType"
            :formatter="formatAgeType"
            label="乘机人类型"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="cardType"
            :formatter="formatCardType"
            label="乘机人证件类型"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column prop="amount" label="价格" align="center" width="150">
            <template slot-scope="scope">
              <el-input clearable v-model="scope.row.amount"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="cardNo" label="乘机人证件号" align="center" width="220">
            <template slot-scope="scope">
              <el-input clearable v-model="scope.row.cardNo"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="ticketNo" label="票号" align="center">
            <template slot-scope="scope">
              <el-input clearable v-model="scope.row.ticketNo"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>

    <div style="margin-top: 25px;text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {
    formatAgeType,
    formatCardType,
    statusData
  } from "@/utils/status.js";

  export default {
    name: "fillOutChange",
    props: ["fillOutChangeData","sellAmount","taskType"],
    data() {
      return {
        selectStatusDataFlag: false,
        isWoniu: false,
        orderType: [
          {
            value: 30,
            label: "改签"
          },
          {
            value: 31,
            label: "二次改签"
          }
        ],
        isWoniuTicket: true,
        formData: {},
        accountData: [],
        statusData: statusData,
        selectOrderDetailList: [],
        formRules: {
          orderType: [
            {required: true, message: "必填项", trigger: "change"}
          ],
          orderSource: [
            {required: true, message: "必填项", trigger: "change"}
          ],
          fundAccountId: [
            {required: true, message: "必填项", trigger: "change"}
          ],
          userNameType: [
            {required: true, message: "必填项", trigger: "change"}
          ],
          amount: [
            {required: true, message: "必填项！", trigger: "blur"}
          ],
          createTime: [
            {required: true, message: "必填项！", trigger: "blur"}
          ],
          fundAccount: [
            {required: true, message: "必填项！", trigger: "blur"}
          ],
          profit: [
            {required: true, message: "必填项！", trigger: "blur"}
          ],
          dpt: [
            {required: true, message: "必填项！", trigger: "blur"}
          ],
          arr: [
            {required: true, message: "必填项！", trigger: "blur"}
          ],
          flightCode: [
            {required: true, message: "必填项！", trigger: "blur"}
          ],
          flightDate: [
            {required: true, message: "必填项！", trigger: "blur"}
          ],
          dptTime: [
            {required: true, message: "必填项！", trigger: "blur"}
          ],
        }
      };
    },
    methods: {
      formatAgeType,
      formatCardType,
      // 默认数据
      defaultFormData() {
        var _orderDetailList = [];
        this.fillOutChangeData.orderDetailList.forEach(item => {
          item.amount = '';
          _orderDetailList.push(item);
        });
        return {
          orderDetailList: _orderDetailList,
          arr: "",
          dpt: "",
          flightCode: "",
          dptTime: "",
          arrTime: "",
          flightDate: "",
          cabin: "",
          radio: "2",
          userNameType: "",
          accountId: "",
          profit: ""

        };
      },
      clearForm() {
        this.formData = this.defaultFormData();
      },
      //判断是蜗牛导单还是出票
      radioChange(value) {
        if (value == "2") {
          this.radio = "2";
          this.isWoniuTicket = false;
        } else {
          this.radio = "1";
          this.isWoniuTicket = true;
        }
      },
      // 判断选中渠道是否是蜗牛
      selectSource(value) {
        if (value == "QUNAR_OPEN") {
          this.isWoniu = true;
          if (this.formData.radio=="1"){
            this.isWoniuTicket = true;
          }else {
            this.isWoniuTicket = false;
          }
        } else {
          this.isWoniu = false;
        }
      },
      handleSelectionChange(row) {
        this.selectOrderDetailList = row;
      },
      // 获取资金账号
      getFinance() {
        this.$store
          .dispatch("fundAccount/getList", {
            filter: {}
          })
          .then(data => {
            this.accountData = data;
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
          });
      },
      // 保存
      handleSave() {
        var validFlag = false;
        this.$refs["fillOutChangeForm"].validate((valid) => {
          if (!valid) {
            console.log('error submit!!');
            validFlag = true;
            return false;
          }});
        if (validFlag){
          return;
        }
        this.formData.flightData = this.flightData;
        this.formData.passengers = this.selectOrderDetailList;
        this.formData.orderDetailList = this.selectOrderDetailList;
        this.formData.pid = this.fillOutChangeData.orderNo;
        if (this.formData.radio != "1" && this.taskType==3) {
          if (this.selectOrderDetailList.length<1){
            this.$notify({
              title: "提示",
              message: "请选择人！",
              type: "warning",
              duration: 4500
            });
            return;
          }
          var flag =false;
          let amountTotal = 0;
          this.formData.passengers.forEach(item => {
            if (item.amount && item.amount!='' && Number(item.amount)<0){
              amountTotal += Number(item.amount);
            }else {
              flag = true;
            }
          });
          if (flag){
            this.$notify({
              title: "提示",
              message: "填写人的金额,且为负数！",
              type: "warning",
              duration: 4500
            });
            return;
          }
          if (amountTotal != this.formData.amount) {
            this.$notify({
              title: "提示",
              message: "金额填写错误，请重新填写！",
              type: "warning",
              duration: 4500
            });
            return;
          }
          let _profit = 0;
          _profit = Number(this.formData.amount) + Number(this.sellAmount);
          debugger;
          if (_profit != this.formData.profit) {
            this.$notify({
              title: "提示",
              message: "利润金额计算错误，请重新计算！",
              type: "warning",
              duration: 4500
            });
            return;
          }
        }
        this.$emit("onSave", this.formData);
      }
    },
    created() {
      this.clearForm();
      this.getFinance();
      /*if (this.fillOutChangeData.orderSource == "QUNAR_OPEN") {
        this.isWoniu = true;
      }*/
    }
  };
</script>
