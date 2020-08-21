<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="searchFlight"/>
    <el-row class="page-tools" type="flex" justify="space-between" style="width:100%;">
      <el-col :span="8" style="margin-top:10px">
      <el-row type="flex" justify="start" :gutter="20" >
        <el-col >
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              起飞时间<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              起飞机场<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              航空公司<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              机型<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col><el-checkbox style="padding-right:10px;margin-top:-5px" />直飞</el-col>
      </el-row>
      </el-col>
      <el-col :span="4"  style="margin-top:20px">
        <el-row type="flex" justify="space-between">
          <el-col>起飞时间</el-col>
          <el-col>价格排序</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-for="(item,index) in flightData" :key="index" class="page-tools">
      <el-collapse  class="page-tools" >
        <el-collapse-item name="1">
          <span class="collapse-title" slot="title" style="width:100%">
            <el-row type="flex" justify="space-between">
              <el-row type="flex" justify="start" style="width:80%">
                <el-col :span="4">
                  <el-col style="font-size:20px">{{item.carrier}}</el-col>
                  <el-row style="width:100%;margin-top:20px" type="flex" justify="start" :gutter="10">
                    <el-col :span="8" class="text-black-9">{{item.flightNum}}</el-col>
                    <el-col :span="11" class="text-black-9">{{item.flightTypeFullName}}</el-col>
                    <el-col v-if="item.codeShare==true" :span="5" style="color:#409EFF">共享</el-col>
                  </el-row>
                </el-col>
                <el-row type="flex" style="margin-left:100px" >
                  <el-col style="text-align:center">
                    <el-col style="font-size:24px;font-weight:400">{{item.dptTime}}</el-col>
                    <el-col>{{item.dptAirport}}</el-col>
                  </el-col>
                  <el-col style="margin-top:10px">
                    <el-col class="text-black">{{item.flightTimes}}</el-col>
                    <el-col class="text-black" style="color:#cccccc;">-------------------------------</el-col>
                    <el-col v-if="item.stop==false" class="text-black" >直飞</el-col>
                  </el-col>
                  <el-col style="text-align:center">
                    <el-col style="font-size:24px;font-weight:400">{{item.arrTime}}</el-col>
                    <el-col>{{item.arrAirport}}</el-col>
                  </el-col>
                </el-row>
              </el-row>
              <el-row type="flex" justify="space-between" :gutter="20">
                <el-col style="color:#E6A23C;font-size:24px;font-weight:400"><span style="font-size:14px">￥</span>{{item.barePrice}}</el-col>
                <el-col>
                  <!-- <el-button type="warning" plain v-if="this.activeNames.indexOf('1')!=-1" icon="el-icon-caret-top">收起</el-button> -->
                <el-button type="warning" icon="el-icon-caret-bottom" @click="bookFlight(item)">预订</el-button>
                </el-col>
              </el-row>
            </el-row>
          </span>
          <div class="collapse-item-wrap"  style="padding: 20px">
            <el-row class="collapse-item-header" type="flex" justify="space-between" style="width:100%">
              <el-row type="flex" justify="start" style="width:15%" :gutter="20" >
                <el-col v-if="item.meal==true" :span="7">有餐食</el-col>
                <el-col :span="9">机建￥{{item.arf}}</el-col>
                <el-col :span="8">燃油￥{{item.tof}}</el-col>
              </el-row>
              <el-row type="flex" justify="start" style="width:30%" :gutter="20">
                <el-col :span="7">余票数</el-col>
                <el-col :span="9">票面价格</el-col>
                <el-col :span="8">销售价格</el-col>
                <el-col :span="8"></el-col>
                <el-col :span="8"></el-col>
              </el-row>
            </el-row>
            <el-row v-for="(item,index) in priceData" :key="index" class="collapse-item-info" type="flex" justify="space-between" style="width:100%">
              <el-row type="flex" justify="start" style="width:50%;"  >
                <el-col :span="3" class="info-text">精品特惠</el-col>
                <el-col :span="3" v-if="cabinType==0" class="info-text">经济舱</el-col>
                <el-col :span="3" v-else-if="item.cabinType==1" class="info-text">头等舱</el-col>
                <el-col :span="3" v-else-if="item.cabinType==2" class="info-text">商务舱</el-col>
                <el-col :span="3" v-else-if="item.cabinType==3" class="info-text">经济舱精选</el-col>
                <el-col :span="3" v-else-if="item.cabinType==4" class="info-text">经济舱Y舱</el-col>
                <el-col :span="3" v-else-if="item.cabinType==5" class="info-text">超值头等舱</el-col>
                <el-col :span="3" v-else class="info-text">未配置</el-col>
                <el-col :span="2" class="info-text">{{item.cabin}}舱</el-col>
                <el-col :span="3" style="color:#409EFF">
                  <el-tooltip placement="bottom" effect="light" >
                    <div slot="content" style="width：600px">
                      <el-row>退改签规则<span>(以下为成人退改签规则说明)</span></el-row>
                      <el-row>
                        <el-col>退票规则：</el-col>
                        <el-col>{{item.returnText}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col>改签规则：</el-col>
                        <el-col>{{item.changeText}}</el-col>
                      </el-row>
                    </div>
                    <el-col style="color:#409EFF">退改签规则</el-col>
                  </el-tooltip></el-col>
                <el-col :span="2" >
                  <el-tooltip placement="bottom" effect="light">
                    <div slot="content">{{item.luggage}}</div>
                    <el-col style="color:#409EFF">行李额</el-col>
                  </el-tooltip>
                </el-col>
                <el-col :span="7">
                  
                  <el-tag type="info" v-if="item.exTrack=='djjj'">甄选低价</el-tag>
                  <el-tag v-else type="info">优选</el-tag>
                </el-col>
              </el-row>
              <el-row type="flex" justify="end" style="width:50%;"  >
                <el-col :span="3" v-if="item.cabinCount=='A'" >余票充足</el-col>
                <el-col :span="3" v-else >{{item.cabinCount}}</el-col>
                <el-col :span="3" style="color:#E6A23C;font-size:22px;font-weight:400"><span style="font-size:14px">￥</span>{{item.vppr}}</el-col>
                <el-col :span="3" style="color:#E6A23C;font-size:22px;font-weight:400"><span style="font-size:14px">￥</span>{{item.barePrice}}</el-col>
                <el-col :span="3" style="color:#E6A23C;font-size:22px;font-weight:400"><span style="font-size:14px"></span></el-col>
                <el-col :span="2"><el-button type="warning">购买</el-button></el-col>
              </el-row>
            </el-row>
          </div>
          
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </div>
</template>
<script>
import search from "./BookSearch";
 import {MIXIN_LIST} from "@/utils/mixin";
export default {
  mixins: [MIXIN_LIST],
  name:"queryBook",
  data(){
    return{
      activeNames: [],
      flightData:{},
      priceData:[],
      searchParams:null
    }
  },
  components: {
    search
  },
  methods:{
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      searchFlight(params){
      if(params.dptDay!=""){
        params.dptDay=this.$moment(params.dptDay).format("YYYY-MM-DD");
      }
      this.searchParams=params;
      this.$store
       .dispatch("woniuOrderConfig/getFlight", {
         filter: params
       })
       .then(data => {
         if (data) {
            if (data) {
              this.flightData = data;
              this.activeNames = Number(this.flightData.length)
              console.log(this.flightData)
            }
            this.loading = false;
         }
       })
       .catch(error => {
         console.log(error);
       });
      },
      bookFlight(flight){
        const params = this.searchParams;
        if(flight.flightNum){
          params.flightCode = flight.flightNum;
        }
        console.log(params)
        this.$store
       .dispatch("woniuOrderConfig/getPrice", {
         filter: params
       })
       .then(data => {
         if (data) {
            if (data) {
              this.priceData = data;
              console.log(this.priceData)
            }
            this.loading = false;
         }
       })
       .catch(error => {
         console.log(error);
       });
      }
  },
}
</script>
<style >
.el-collapse{
  border-top: none;
  border-bottom: none;
}
.el-collapse-item__header{
  border-bottom: none;
  line-height: 30px;
}
.text-black{
  color:#666666;
  text-align:center;
  line-height:10px
}
.text-black-9{
  color:#999999;
}
.el-icon-arrow-right:before{
  content: "";
}
.el-collapse-item__wrap{
  border-bottom: none;
}
.collapse-item-wrap{
  margin-top: 20px;
  border-top: 1px solid #cccccc;
}
.collapse-item-header{
  padding-bottom: 10px;
  border-bottom: 1px dashed #cccccc;
}
.collapse-item-info{
  padding-bottom: 30px;
  padding-top: 30px;
  border-bottom: 1px dashed #cccccc;
}
.info-text{
  font-size: 18px;
}
</style>
