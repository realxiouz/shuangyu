<template>
  <div class="page-form">
    <el-dialog
      :title="keyId ? '修改平台授权管理' : '添加平台授权管理'" width="30%" :visible.sync="dialogVisible" @open="onOpen" @close="onClose" >
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules" >
        <el-form-item label="企业名称：" prop="firmId">
          <el-select style="width: 100%;" v-model="formData.firmId" placeholder="请选择企业..." clearable filterable @change="changeFirm">
            <el-option v-for="item in firmData" :key="item.firm.firmId" :label="item.firm.firmName" :value="item.firm.firmId" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开放平台：" prop="openId">
          <el-select  style="width: 100%;" v-model="formData.openId" placeholder="请选择开放平台..." clearable filterable @change="changeOpenPlatform" >
            <el-option v-for="item in openPlatformData" :key="item.openId" :label="item.openName" :value="item.openId" ></el-option>
          </el-select>
        </el-form-item>
        
        <el-table  v-if="isNav && configNavData" :data="configNavData" border ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="navName" label="导航名称" width="300" align="center"></el-table-column>
          <el-table-column prop="navUrl" label="导航地址" width="300" align="center"> </el-table-column>
          <el-table-column prop="remark" label="备注" align="left" show-overflow-tooltip></el-table-column>
        </el-table>

      </el-form>
      <div style="text-align:right;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { MIXIN_EDIT } from "@/utils/mixin";
export default {
  mixins: [MIXIN_EDIT],
  data() {
    return {
      select:true,
      isNav:false,
      selOpenId: null,
      dialogVisible: false,
      openPlatformData: [],
      configNavData: [],
      selConfigNav: [],
      firmData: [],
      tableData:[],
      actions: {
        getOne: "firmOpenAuth/getOne",
        saveOne: "firmOpenAuth/saveOne"
      },
      rules: {
        openId: [{ required: true, message: "请选择开放平台" }],
        firmId: [{ required: true, message: "请选择企业名称" }]
      }
    };
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
      if (val) {
        this.isNav = false;
        this.selOpenId = null;
        this.openPlatformData = [];  
        this.configNavData = [];  
        this.selConfigNav = [];
        this.firmData = [];  
        this.loadOpenPlatform();
        this.loadFirm();
      }
    }
  },
  methods: {
    defaultFormData() {
      return {
        authId: null,
        openId: null,
        openCode: null,
        openName: null,
        firmId: null,
        firmName: null,
        configNavs:{
          navName:null,
          navUrl:null,
          remark:null
        }
      };
    },
    changeOpenPlatform(openId) {
      let that = this;
      if(openId){
        that.isNav = true;
        that.selOpenId = openId;
        if (that.openPlatformData && that.openPlatformData.length > 0) { 
          that.openPlatformData.forEach(function(obj) {
            if (obj.openId === openId) {
              that.formData.openCode = obj.openCode;
              that.formData.openName = obj.openName;
              that.configNavData = obj.configNavs;
              if(that.selConfigNav){
                  that.toggleSelection();
              }
            }
          });
        }
      }else{
          that.isNav = false;
      }
    },
    changeFirm(firmId) {
      let that = this;
      that.firmData.forEach(function(obj) {
        if (obj.firm.firmId === firmId) {
          that.formData.firmName = obj.firm.firmName;
        }
      });
    },
    loadOpenPlatform() {
      this.$store
        .dispatch("openPlatform/getList", {})
        .then(data => {
          this.openPlatformData = data;
          if(this.openPlatformData && this.openPlatformData.length > 0 && this.selOpenId){
            this.changeOpenPlatform(this.selOpenId)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadFirm() {
      this.$store
        .dispatch("firmMerchant/getList", {})
        .then(data => {
          this.firmData = data;
        })
        .catch(error => {
          console.log(error);
        });
    }, 
    beforeLoadData(data){ 
      if(data && data.openId){
          this.selOpenId = data.openId;
      }
      if(data && data.configNavs){
          this.selConfigNav = data.configNavs;
      }
      return data;
    },
    handleSelectionChange(val) {  
      this.formData.configNavs = val

    },
    toggleSelection(){
        let that = this; 
        if(that.selConfigNav && that.selConfigNav.length > 0){
          that.$nextTick(() => { 
            that.selConfigNav.forEach(selConfig => {
                that.configNavData.forEach(configNav => {
                  if(selConfig.navName === configNav.navName){
                    that.$refs.multipleTable.toggleRowSelection(configNav, true);
                  }
              }); 
            }); 
         });
        }
    }
  }
};
</script>
