<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="14" :sm="15" :md="16" :lg="17" :xl="18">
      <el-form :model="formData" label-width="80px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="5">
          <el-form-item label="出发城市:">
            <el-input
              placeholder="请输入起飞机场三字码"
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.dpt"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="5">
          <el-form-item label="到达城市:">
            <el-input 
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.arr"
              placeholder="请输入到达机场三字码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="起飞日期:">
            <el-date-picker
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.dptDay"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="5">
          <el-form-item label="报价类型:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.exTrack"
              style="width: 100%"
              placeholder="请输入报价类型"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="5">
          <el-form-item label="供应商:">
            <el-select v-model="formData.merchantId" placeholder="请选择供应商">
              <el-option
                v-for="item in supplierList"
                :key="item.merchantId"
                :label="item.merchantName"
                :value="item.merchantId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="10" :sm="9" :md="8" :lg="7" :xl="6" class="search-tools">
      <el-button
        icon="el-icon-search"
        class="filter-item"
        type="primary"
        size="mini"
        @click="$emit('onSearch', formData)"
        >查询</el-button
      >
      <el-button
        icon="el-icon-refresh"
        class="filter-item"
        type="primary"
        size="mini"
        @click="handleClear"
        >清空</el-button
      >
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      more: false,
      formData: this.initSearchForm(),
      supplierList:[],
      merchantId:''
    };
  },
  computed: {
    switchIcon() {
      if (!this.more) {
        return "el-icon-arrow-down el-icon--right";
      } else {
        return "el-icon-arrow-up el-icon--right";
      }
    }
  },
  created(){
    this.loadSupplierList()
  },
  methods: {
    initSearchForm() {
      return {
        dpt: null,
        arr: null,
        dptDay: null,
        exTrack: null,
        merchantId:null
      };
    },
    loadSupplierList(){
      this.$store
        .dispatch("firmMerchant/getSupplierList", {})
        .then(data => {
          if (data) {
             if (data) {
               this.supplierList = data;
               this.merchantId = data.merchantId
             }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClear() {
      this.formData = this.initSearchForm();
    },
    handleMore() {
      this.more = !this.more;
    },
    handleExport() {
      this.$emit("onSearch", this.formData);
    }
  }
};
</script>
