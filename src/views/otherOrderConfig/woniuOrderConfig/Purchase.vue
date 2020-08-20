<template>
  <div class="page">
    <el-row class="page-tools">
      <el-row style="margin-bottom:20px;font-size:20px">航班信息：</el-row>
      <el-row style="margin-bottom:20px;font-size:20px"><span>2020-08-21 北京-成都</span></el-row>
      <el-row type="flex" justify="space-between">
        <el-row type="flex" justify="start" style="width:80%">
          <el-col :span="4">
            <el-col style="font-size:20px">深圳航空</el-col>
            <el-row style="width:100%;margin-top:20px" type="flex" justify="start" :gutter="10">
              <el-col :span="8" class="text-black-9">ZH4102</el-col>
              <el-col :span="11" class="text-black-9">空客330(宽)</el-col>
              <el-col :span="5" style="color:#409EFF">共享</el-col>
            </el-row>
          </el-col>
          <el-row type="flex" style="margin-left:100px" >
            <el-col style="text-align:center">
              <el-col style="font-size:24px;font-weight:400">11:30</el-col>
              <el-col>首都机场T3</el-col>
            </el-col>
            <el-col style="margin-top:10px">
              <el-col class="text-black">3小时30分钟</el-col>
              <el-col class="text-black" style="color:#cccccc;">-------------------------------</el-col>
              <el-col class="text-black" >直飞</el-col>
            </el-col>
            <el-col style="text-align:center">
              <el-col style="font-size:24px;font-weight:400">15:00</el-col>
              <el-col>双流机场T2</el-col>
            </el-col>
          </el-row>
        </el-row>
        <el-row type="flex" justify="space-between" :gutter="20">
          <el-col style="color:#E6A23C;font-size:24px;font-weight:400"><span style="font-size:14px">￥</span>1526</el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="退改签说明" name="1">
            <el-row>退改签规则<span>(以下为成人退改签规则说明)</span></el-row>
            <el-row type="flex" justify="start" style="width:500px;margin-top:10px;border-bottom:1px solid #cccccc;padding-bottom:5px">
              <el-col :span="9">退改签时间点</el-col>
              <el-col :span="5">退票扣费</el-col>
              <el-col :span="5">改期加收手续费</el-col>
              <el-col :span="6">签转</el-col>
            </el-row>
            <el-row style="width:500px;margin-top:10px;border-bottom:1px solid #cccccc;padding-bottom:5px">
            <el-row type="flex" justify="start" style="width:500px;margin-top:10px;">
              <el-col :span="9">2020年08月14日 11:30前</el-col>
              <el-col :span="5">￥168/人</el-col>
              <el-col :span="5">￥83/人</el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row type="flex" justify="start" style="width:500px;margin-top:10px;">
              <el-col :span="9">2020年08月18日 11:30前</el-col>
              <el-col :span="5">￥333/人</el-col>
              <el-col :span="5">￥165/人</el-col>
              <el-col :span="6">不可签转</el-col>
            </el-row>
            <el-row type="flex" justify="start" style="width:500px;margin-top:10px;">
              <el-col :span="9">2020年08月21日 7:30前</el-col>
              <el-col :span="5">￥498/人</el-col>
              <el-col :span="5">￥330/人</el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row type="flex" justify="start" style="width:500px;margin-top:10px;">
              <el-col :span="9">2020年08月21日 7:30后</el-col>
              <el-col :span="5">￥663/人</el-col>
              <el-col :span="5">￥495/人</el-col>
              <el-col :span="6"></el-col>
            </el-row>
            </el-row>
            <el-row>
              <el-col>附加说明</el-col>
              <el-col>舱位(Q):票面￥1650</el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="行李额说明" name="2" >
            <div>手提行李：1件,5kg,20*40*55CM;托运行李：20KG,40*60*100CM;婴儿票行李:可以免费托运10KG,可免费托运一辆折叠式婴儿车或摇篮</div>
          </el-collapse-item>
          
        </el-collapse>
      </el-row>
    </el-row>
    <el-row class="page-tools">
      <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-table  :data="tableData" stripe border style="width: 100%">
        <el-table-column label="姓名">
          <template slot-scope="scope">
              <el-input placeholder="请输入姓名" />
          </template>
        </el-table-column>
        <el-table-column label="乘客类型">
          <template slot-scope="scope">
              <el-select >
                <el-option/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="scope">
              <el-input placeholder="请输入电话" />
          </template>
        </el-table-column>
        <el-table-column label="证件类型">
          <template slot-scope="scope">
              <el-select >
                <el-option/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="证件号">
          <template slot-scope="scope">
              <el-input placeholder="请输入电话" />
          </template>
        </el-table-column>
        
        <el-table-column>
          <template v-slot:header="{}">
            <el-button type="primary" @click="onAddPassanger">添加</el-button>
          </template>
          <template v-slot="{ $index }">
            <el-button type="danger" @click="onDelByInx($index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    </el-row>
    <el-row>
      <el-button type="warning">提交订单</el-button>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },]
      }
      
    },
    methods:{
      onAddPassanger() {
        this.tableData.push({
          fullName: "",
          ageType: 0,
          idCardType: "NI",
          idCardNo: "",
          phone: ""
        });
        this.$emit("input", this.value);
      },
      onDelByInx(inx) {
        this.tableData.splice(inx, 1);
        this.$emit("input", this.value);
      },
    }
  }
</script>
<style >
.el-form-item-list{
  height: 10px;
}
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

</style>
