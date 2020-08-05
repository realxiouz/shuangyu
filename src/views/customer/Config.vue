<template>
  <div class="page">
    <div class="page-back">
      <el-button-group>
        <el-button icon="el-icon-back" type="warning" @click="goBack"
          >返回</el-button
        >
        <el-button icon="el-icon-plus" type="primary" @click="handleSave"
          >保存</el-button
        >
      </el-button-group>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row class="">
        <el-col :span="6">
          <el-form-item label="客户名称:">
            <el-input v-model="form.name" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="平台名称:">
            <el-input v-model="form.name" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="content">
      <el-row class="el-row-left">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
          <el-checkbox-group v-model="tabsCheckeds" @change="handleChange">
            <el-checkbox v-for="tabsOption in tabsOptions" :label="tabsOption" :key="tabsOption" class="el-row-child">{{tabsOption}}</el-checkbox>
          </el-checkbox-group>
      </el-row>
      <el-row class="el-row-right">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row class="el-row-item">
            <el-col :span="24">
              <el-form-item style="text-align:center;">
                  <el-tag v-model="selTab">{{selTab}}</el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-input placeholder="请输入导航名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-input placeholder="请输入导航地址" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    onClick(index){ 
      this.current = index
      console.log(index)
    },
    goBack() {
      if (this.$router.history.length <= 1) {
        this.$router.push({ path: "/home" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    handleSave(){

    },
    handleCheckAll(val) {
      this.tabsCheckeds = val ? this.tabsOptions : [];
      this.isIndeterminate = false;
    },
    handleChange(val) { 
      if(val && val.length > 0){
        let num = val.length - 1;
        let selObj = val[num];
        this.current = this.getIndexByArray(this.tabsOptions, selObj);
        this.selTab = selObj;
      }
      let checkedCount = val.length;
      this.checkAll = checkedCount === this.tabsOptions.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tabsOptions.length;
    },
    getIndexByArray(array, selObj){
       if(array && array.length > 0 && selObj){
         let num = 0;
         let index = -1;
         array.forEach(obj => {
           if(obj === selObj){
             index = num;
           }
           num++;
         });
         return index;
       } 
    }
  },
  data() {
    return {
      tabPosition: "left",
      current:0,
      checked:false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      tabsOptions:["订单通知管理","订单接口管理","订单更新管理","政策配置管理","政策参数管理"],
      tabsCheckeds:["订单通知管理"],
      checkAll: false,
      isIndeterminate: true,
      selTab: "订单通知管理"
    };
  },
};
</script>
<style scoped>
.el-row-item {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 20px 20px 0 0;
  width: 870px;
  margin-left: 20px;
}
.page-back {
  margin-bottom: 20px;
}
.content{
  height: 500px;
  /* display: flex;
  justify-content: flex-start; */
}
.el-row-left {
  width: auto;
  line-height: 40px;
  float: left;
  border-right: 1px solid #ddd;
  padding-right: 20px;
}
.el-row-left .el-row-child{
  width: auto;
  display: block;
}
.el-row-right {
  height: auto;
  float: left;
}
.active{
  color: #409EFF;
}
</style>
