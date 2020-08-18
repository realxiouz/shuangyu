<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="24" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form label-width="65px" size="mini" @keydown.enter.native="handleConfirm">
        <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
          <el-form-item label="订单号:">
            <el-input v-model="formData.orderNo" placeholder="订单号.." clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="100px" label="经办人姓名:">
            <el-input v-model="formData.staffName" placeholder="经办人姓名.." clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="80px" label="单据日期:">
            <el-date-picker
              v-model="formData.orderDate"
              type="date"
              placeholder="单据日期.."
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="6">
          <el-form-item label="客户:">
            <el-input v-model="formData.merchantId" placeholder="客户.." clearable></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>

    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button icon="el-icon-search" class="filter-item" type="primary" size="mini"
        @click="handleConfirm">查询</el-button>
      <el-button icon="el-icon-refresh" class="filter-item" type="primary" size="mini" @click="handleClear">清空</el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
    export default {
        name: "brandSearch",
        data() {
            return {
                more: false,
                formData: {}
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
        methods: {
            initSearchForm(){
                return {
                    //订单号
                    orderNo: null,
                    //经办人姓名
                    staffName: null,
                    //单据日期
                    orderDate: null,
                    //客户
                    merchantId: null
                };
            },
            handleMore() {
                this.more = !this.more;
            },
            handleClear(){
                this.formData = this.initSearchForm();
            },
            //trim(),没有值时赋值为null;
            handleConfirm(){
                let _formData = Object.assign({}, this.formData);
                for (let key in _formData){
                    if(_formData[key] && '' != _formData[key]){
                        if ('string' == typeof _formData[key]){
                            _formData[key] = _formData[key].trim();
                        }
                        if ('orderDate' === key){
                            _formData[key] = _formData[key].getTime();
                            console.log(_formData[key]);
                        }
                    } else {
                        _formData[key] = null;
                    }
                }
                this.$emit("onSearch",_formData)
            }
        }
    };
</script>
