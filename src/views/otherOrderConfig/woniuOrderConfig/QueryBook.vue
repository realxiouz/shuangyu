<template>
  <div class="page">
    <div class="page-tools">
      <el-form ref="form">
        <el-row type="flex" justify="space-between" :gutter="20">
          <el-col :span="22">
            <el-col :span="3">
              <el-form-item label="出发城市:"></el-form-item>
              <el-input style="width: 100%;" placeholder="请输入起飞机场三字码"></el-input>
            </el-col>
            <el-col style="margin-top:50px" :span="1"><span>—></span></el-col>
            <el-col :span="3">
              <el-form-item label="到达城市:"> </el-form-item>
              <el-input style="width: 100%" placeholder="请输入到达机场三字码"></el-input>
            </el-col>
            <el-col :span="3">
              <el-form-item label="起飞日期:"> </el-form-item>
              <el-input style="width: 100%" placeholder="请输入起飞日期"></el-input>
            </el-col>
            <el-col :span="3">
              <el-form-item label="报价类型:"> </el-form-item>
              <el-input style="width: 100%" placeholder="请输入报价类型"></el-input>
            </el-col>
          </el-col>
          <el-col :span="2">
            <el-button icon="el-icon-search" class="filter-item" type="primary" size="mini"  >查询</el-button>
          </el-col>

        </el-row>
      </el-form>
    </div>
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-col :span="20">
        <el-menu  class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">起飞时间</el-menu-item>
          <el-submenu index="2">
            <template slot="title">起飞机场</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">航空公司</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">机型</template>
            <el-menu-item index="4-1">选项1</el-menu-item>
          </el-submenu>
          <el-menu-item index="1"><el-checkbox style="padding-right:10px;margin-top:-5px" />起飞时间</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4"  style="margin-top:20px">
        <el-row type="flex" justify="space-between">
          <el-col>起飞时间</el-col>
          <el-col>价格排序</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="page-tools">
      <el-collapse class="page-tools">
        <el-collapse-item >
          <span class="collapse-title" slot="title" style="width:100%">
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
                <el-col><el-button type="warning" v-if="this.activeNames.indexOf('1')!=-1" icon="el-icon-caret-bottom">预订</el-button>
                <el-button type="warning" v-else icon="el-icon-caret-top">收起</el-button></el-col>
              </el-row>
            </el-row>
          </span>
          <div class="collapse-item-wrap" style="padding: 20px">
            <el-row class="collapse-item-header" type="flex" justify="space-between" style="width:100%">
              <el-row type="flex" justify="start" style="width:15%" :gutter="20" >
                <el-col :span="7">有餐食</el-col>
                <el-col :span="9">机建￥50</el-col>
                <el-col :span="8">燃油￥0</el-col>
              </el-row>
              <el-row type="flex" justify="start" style="width:30%" :gutter="20">
                <el-col :span="7">余票数</el-col>
                <el-col :span="9">票面价格</el-col>
                <el-col :span="8">销售价格</el-col>
                <el-col :span="8">优惠金额</el-col>
                <el-col :span="8"></el-col>
              </el-row>
            </el-row>
            <el-row class="collapse-item-info" type="flex" justify="space-between" style="width:100%">
              <el-row type="flex" justify="start" style="width:50%;"  >
                <el-col :span="3" class="info-text">精品特惠</el-col>
                <el-col :span="3" class="info-text">经济舱</el-col>
                <el-col :span="2" class="info-text">Q舱</el-col>
                <el-col :span="2" style="color:#409EFF">退改签规则</el-col>
                <el-col :span="2" style="color:#409EFF">行李额</el-col>
                <el-col :span="7">
                  <el-tag type="info">行李单+差额发票</el-tag>
                  <el-tag type="info">甄选低价</el-tag>
                </el-col>
              </el-row>
              <el-row type="flex" justify="end" style="width:50%;"  >
                <el-col :span="3" >余票充足</el-col>
                <el-col :span="3" style="color:#E6A23C;font-size:22px;font-weight:400"><span style="font-size:14px">￥</span>1650</el-col>
                <el-col :span="3" style="color:#E6A23C;font-size:22px;font-weight:400"><span style="font-size:14px">￥</span>1642</el-col>
                <el-col :span="3" style="color:#E6A23C;font-size:22px;font-weight:400"><span style="font-size:14px">￥</span>8</el-col>
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
export default {
  name:"queryBook",
  data(){
    return{
      activeNames: ["1"]
    }
    
  }
}
</script>
<style >
.el-menu.el-menu--horizontal{
  border-bottom: none;
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
  height: 100px;
  line-height: 100px;
  border-bottom: 1px dashed #cccccc;
}
.info-text{
  font-size: 18px;
}
</style>
