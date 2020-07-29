<template>
  <div class="page-form">
    <el-dialog :title="keyId!=''?'编辑航班信息':'添加航班'" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
    <el-form ref="form" :model="formData" label-width="120px" size="mini">
      <input type="hidden" v-model="formData.flightId"/>
      <el-form-item label="航司">
        <el-input type="text" v-model="formData.airlineCode" onkeyup="this.value=this.value.toUpperCase()" maxlength="2" placeholder="航司二字码"></el-input>
      </el-form-item>
      <el-form-item label="主航班号">
        <el-input type="text" v-model="formData.actFlightCode" onkeyup="this.value=this.value.toUpperCase()" maxlength="2" placeholder="主航班号"></el-input>
      </el-form-item>
      <el-form-item label="航班号">
        <el-input type="text" v-model="formData.flightCode" onkeyup="this.value=this.value.toUpperCase()" placeholder="航班号"></el-input>
      </el-form-item>
      <el-form-item label="出发地三字码">
        <el-input type="text" v-model="formData.dpt" onkeyup="this.value=this.value.toUpperCase()" maxlength="3" placeholder="出发地三字码"></el-input>
      </el-form-item>
      <el-form-item label="出发机场">
        <el-input type="text" v-model="formData.dptAirport" onkeyup="this.value=this.value.toUpperCase()" maxlength="3" placeholder="出发机场"></el-input>
      </el-form-item>
      <el-form-item label="出发航楼站">
        <el-input type="text" v-model="formData.dptTerminal" onkeyup="this.value=this.value.toUpperCase()" placeholder="出发航楼站"></el-input>
      </el-form-item>
      <el-form-item label="到达地三字码">
        <el-input type="text" v-model="formData.arr" onkeyup="this.value=this.value.toUpperCase()" maxlength="3" placeholder="到达地三字码"></el-input>
      </el-form-item>
      <el-form-item label="到达机场">
        <el-input type="text" v-model="formData.arrAirport" onkeyup="this.value=this.value.toUpperCase()" maxlength="3" placeholder="到达机场"></el-input>
      </el-form-item>
      <el-form-item label="到达航楼站">
        <el-input type="text" v-model="formData.arrTerminal" onkeyup="this.value=this.value.toUpperCase()" placeholder="到达航楼站"></el-input>
      </el-form-item>
      <el-form-item label="起飞时间">
        <el-time-select
          v-model="formData.dptTime"
          :picker-options="{
              start: '00:00',
              step: '00:05',
              end: '23:55'}"
          placeholder="选择时间"
          style="width: 100%;">
        </el-time-select>
      </el-form-item>
      <el-form-item label="到达时间">
        <el-time-select
          v-model="formData.arrTime"
          :picker-options="{
              start: '00:00',
              step: '00:05',
              end: '23:55'}"
          @change="selectArrTime"
          placeholder="选择时间"
          style="width: 100%;">
        </el-time-select>
      </el-form-item>
      <el-form-item label="航程">
        <el-input type="text" v-model="formData.distance" placeholder="航程"></el-input>
      </el-form-item>
      <el-form-item label="飞行时间">
        <el-input type="text" v-model="formData.flightTimes" placeholder="飞行时间"></el-input>
      </el-form-item>
      <el-form-item label="机建费">
        <el-input type="text" v-model="formData.constructionFee" placeholder="机建费"></el-input>
      </el-form-item>
      <el-form-item label="燃油费">
        <el-input type="text" v-model="formData.fuelTax" placeholder="燃油费"></el-input>
      </el-form-item>
      <el-form-item label="儿童燃油费">
        <el-input type="text" v-model="formData.childFuelTax" placeholder="儿童燃油费"></el-input>
      </el-form-item>
      <el-form-item label="机型">
        <el-input type="text" v-model="formData.planeType" onkeyup="this.value=this.value.toUpperCase()" placeholder="机型"></el-input>
      </el-form-item>
      <el-form-item label="机型全称">
        <el-input type="text" v-model="formData.flightTypeFullName" onkeyup="this.value=this.value.toUpperCase()" placeholder="机型全称"></el-input>
      </el-form-item>
      <el-form-item label="共享标记">
        <el-select v-model="formData.shareFlag" placeholder="是否共享标记" style="width: 100%;">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经停标记">
        <el-select v-model="formData.stopFlag" placeholder="请选择经停标记" style="width: 100%;">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经停机场三字码">
        <el-input v-model="airportCode" onkeyup="this.value=this.value.toUpperCase()" maxlength="3" style="width: 60%;" placeholder="经停机场三字码"></el-input><el-button @click="addAirport" style="margin-left: 5px">添加</el-button>
      </el-form-item>
      <div class="_tags-view" style="width: 77%;">
        <el-tag
          class="_tags-view-item"
          @close="tagClose(idx)"
          v-for="(tag,idx) in tags"
          :key="idx"
          closable="closable">
          {{tag}}
        </el-tag>
      </div>
      <el-form-item label="餐食标记">
        <el-select v-model="formData.meal" placeholder="餐食标记" style="width: 100%;">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经停次数">
        <el-input type="text" v-model="formData.stopCount" placeholder="经停次数"></el-input>
      </el-form-item>
      <el-form-item label="飞行周期">
        <el-input type="text" v-model="formData.cycle" placeholder="飞行周期"></el-input>
      </el-form-item>
      <el-form-item label="退票规则">
        <el-input type="text" v-model="formData.refundRule" placeholder="退票规则"></el-input>
      </el-form-item>
      <el-form-item label="改签规则">
        <el-input type="text" v-model="formData.changeRule" placeholder="改签规则"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {MIXIN_EDIT} from "@/utils/mixin";
    export default {
      mixins: [MIXIN_EDIT],
        name: 'airportEdit',
        props: ["update", "curNode"],
        data() {
            return {
                formData: {},
                airportCode: '',
                tags: [],
                actions: {
                  getOne: 'flight/getOne',
                  saveOne: 'flight/addOne'
                }
            }
        },
        methods: {
            defaultFormData() {
                return {
                    flightId: '',
                    airlineCode: '',
                    actFlightCode: '',
                    flightCode: '',
                    dpt: '',
                    dptAirport: '',
                    dptTerminal: '',
                    dptTime: '',
                    arr: '',
                    arrAirport: '',
                    arrTerminal: '',
                    arrTime: '',
                    distance: 0,
                    flightTimes: '',
                    constructionFee: 0,
                    fuelTax: 0,
                    childFuelTax: 0,
                    planeType: '',
                    flightTypeFullName: '',
                    shareFlag: false,
                    stopFlag: false,
                    stopAirportCode: [],
                    meal: false,
                    stopCount: 0,
                    cycle: '',
                    refundRule: '',
                    changeRule: ''
                };
            },
            addAirport(){
                let exit = true;
                for(let i = 0; i < this.tags.length; i++){
                    if (this.tags[i] === this.airportCode){
                        exit = false;
                        break;
                    }
                }
                if (exit){
                    this.tags.push(this.airportCode.toUpperCase());
                }
            },
           
            selectArrTime(){
                this.formData.flightTimes = this.computedTime( this.formData.dptTime, this.formData.arrTime);
            },
            //对时间进行格式化并返回格式化字符串
            computedTime(dptTime, arrTime){
                //截取字符串并转为Integer类型
                let dptHours = parseInt(dptTime.substring(0, dptTime.indexOf(':')));
                let dptMinutes = parseInt(dptTime.substr(dptTime.indexOf(':') + 1));
                let arrHours = parseInt(arrTime.substring(0, arrTime.indexOf(':')));
                let arrMinutes = parseInt(arrTime.substring(arrTime.indexOf(':') + 1));
                //将时间转为分钟
                let dptTotalMinutes = dptHours * 60 + dptMinutes;
                let arrTotalMinutes = arrHours * 60 + arrMinutes;
                let tmpTime = 0;
                //进行计算
                if (dptTotalMinutes > arrTotalMinutes)
                    tmpTime = 1440 - Math.abs(dptTotalMinutes - arrTotalMinutes);
                else
                    tmpTime = arrTotalMinutes - dptTotalMinutes;
                if(tmpTime % 60 < 10)
                  return "" + Math.floor(tmpTime / 60) + ":0" + tmpTime % 60;
                else
                    return "" + Math.floor(tmpTime / 60) + ":" + tmpTime % 60;
            },
            clearForm() {
                this.formData = this.defaultFormData();
            },
            tagClose(idx){
                this.tags.splice(idx, 1);
            }
        },
        created() {
            this.clearForm();
            if (this.update){
                Object.assign(this.formData,this.curNode);
                if (this.curNode.stopAirportCode)
                  this.tags = this.formData.stopAirportCode.concat();
            }
        }
    }
</script>

<style>
  ._tags-view {
    height: 80px;
    width: 330px;
    margin: 5px 0px 10px 120px;
    padding-top: 6px;
    border: 1px solid #edeff0;
  }

  ._tags-view-item {
    margin: 0 3px 2px 0;
    cursor: pointer;
    height: 22px;
    line-height: 26px;
  }
</style>
