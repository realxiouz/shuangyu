<template>


  <el-dialog :inline="true" title="订单航班信息" :visible.sync=dialogCreate width="70%">
    <el-form ref="form" :rules="rules" :model="formData" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="出发日期:" prop="FlightDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="formData.FlightDate"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航司:" prop="airLine">
            <el-input v-model="formData.airLine"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主航班号:" prop="actFlightCode">
            <el-input v-model="formData.actFlightCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航班号:" prop="flightCode">
            <el-input v-model="formData.flightCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="经停次数:" prop="stopCount">
            <el-input v-model="formData.stopCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出发地三字码:" prop="dpt">
            <el-input v-model="formData.dpt"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出发机场:" prop="dptAirport">
            <el-input v-modelr="formData.dptAirport"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出发航楼站:" prop="dptTerminal">
            <el-input v-model="formData.dptTerminal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="起飞时间:" prop="dptTime">
            <el-date-picker
              v-model="formData.dptTime"
              type="datetime"
              placeholder="选择起飞日期时间">
            </el-date-picker>

          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="到达地三字码:" prop="arr">
            <el-input v-model="formData.arr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="到达机场:" prop="arrAirport">
            <el-input v-model="formData.arrAirport"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="到达航站楼:" prop="arrTerminal">
            <el-input v-model="formData.arrTerminal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="到达时间:" prop="arrTime">
            <el-input v-model="formData.arrTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航程:" prop="distance">
            <el-input v-model="formData.distance"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="飞行时间:" prop="flightTimes">
            <el-input v-model="formData.flightTimes"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机建费:" prop="constructionFee">
            <el-input v-model="formData.constructionFee"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      `
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="燃油费:" prop="fuelTax">
            <el-input v-model="formData.fuelTax"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="儿童燃油费:" prop="childFuelTax">
            <el-input v-model="formData.childFuelTax"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机型:" prop="planeType">
            <el-input v-model="formData.planeType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机型全称:" prop="flightTypeFullName">
            <el-input v-model="formData.flightTypeFullName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="共享标记:" prop="shareFlag">
            <el-input v-model="formData.shareFlag"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="经停标记:" prop="stopFlag">
            <el-input v-model="formData.stopFlag"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="经停机场三字码:" prop="stopAirportCode">
            <el-input v-model="formData.stopAirportCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="餐食标记:" prop="meal">
            <el-input v-model="formData.meal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">

        <el-col :span="6">
          <el-form-item label="飞行周期:" prop="cycle">
            <el-input v-model="formData.cycle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="退改规则:" prop="RefundChangeRule">
            <el-input v-model="formData.RefundChangeRule"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  const defaultData = {
    //
    //航班字段
    FlightDate: '',//出发日期
    flightId: '',//主键唯一标识
    airLine: '',//航司
    actFlightCode: '',//主航班号
    flightCode: '',//航班号
    dpt: '',//出发地三字码
    dptAirport: '',//出发机场
    dptTerminal: '',//出发航楼站
    dptTime: '',//起飞时间
    arr: '',//到达地三字码
    arrAirport: '',//到达机场
    arrTerminal: '',//到达航站楼
    arrTime: '',//到达时间
    distance: '',//航程
    flightTimes: '',//飞行时间
    constructionFee: '',//机建费
    fuelTax: '',//燃油费
    childFuelTax: '',//儿童燃油费
    planeType: '',//机型
    flightTypeFullName: '',//机型全称
    shareFlag: '',//共享标记
    stopFlag: '',//经停标记
    stopAirportCode: '',//经停机场三字码
    meal: '',//餐食标记
    stopCount: '',//经停次数
    cycle: '',//飞行周期
    RefundChangeRule: '',//退改规则
    //
    roles: []
  };
  export default {
    name: "",
    data() {
      return {
        formData: defaultData,
        total: 0,
        tableData: null,
        dialogVisible: false,
        allRoles: [],
        paramsRoles: [],
        rules: {
          FlightDate: [
            {required: true, message: "请输入出发日期", trigger: "blur"},

          ],
        }
      };
    },
    methods: {
      handleCancel() {
        this.dialogCreate = false;
        this.$emit('success',false);
      }

    },
    props: ['dialogCreate']
  };


</script>
