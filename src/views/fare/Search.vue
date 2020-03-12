<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row>
        <el-form-item label="航段">
        <el-input v-model="searchForm.segment">
          <i class="el-icon-edit el-input__icon"
             slot="suffix"
             @click="segmentIconClick">
          </i>
        </el-input>
      </el-form-item>
        <el-form-item label="出发地三字码">
          <el-input v-model="searchForm.dpt">
            <i class="el-icon-edit el-input__icon"
               slot="suffix"
               @click="dptIconClick">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="目的地三字码">
          <el-input v-model="searchForm.arr">
            <i class="el-icon-edit el-input__icon"
               slot="suffix"
               @click="arrIconClick">
            </i>
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="航司二字码">
          <el-input v-model="searchForm.airlineCode">
            <i class="el-icon-edit el-input__icon"
               slot="suffix"
               @click="airlineCodeIconClick">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="航司舱位">
          <el-input v-model="searchForm.cabin">
            <i class="el-icon-edit el-input__icon"
               slot="suffix"
               @click="cabinIconClick">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="primary" @click="clearSearchForm">清除</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "userSearch",
    data() {
      return {
        searchForm: {}
      };
    },
    methods:{
      defaultSearchFormData(){
        return {
          segment: null,
          dpt: null,
          arr: null,
          airlineCode: null,
          cabin: null
        };
      },
      clearSearchForm(){
        this.searchForm = this.defaultSearchFormData();
      },
      handleSearch(){
        if (this.searchForm.segment){
          this.searchForm.segment = this.searchForm.segment.toUpperCase();
        }
        if (this.searchForm.dpt){
          this.searchForm.dpt = this.searchForm.dpt.toUpperCase();
        }
        if (this.searchForm.arr){
          this.searchForm.arr = this.searchForm.arr.toUpperCase();
        }
        if (this.searchForm.airlineCode){
          this.searchForm.airlineCode = this.searchForm.airlineCode.toUpperCase();
        }
        if (this.searchForm.cabin){
          this.searchForm.cabin = this.searchForm.cabin.toUpperCase();
        }
        this.$emit('onSearch',this.searchForm)
      },
      segmentIconClick(){
        this.searchForm.segment = null;
      },
      dptIconClick(){
        this.searchForm.dpt = null;
      },
      arrIconClick(){
        this.searchForm.arr = null;
      },
      airlineCodeIconClick(){
        this.searchForm.airlineCode = null;
      },
      cabinIconClick(){
        this.searchForm.cabin = null;
      }
    },
    mounted() {
      this.clearSearchForm();
    }
  };
</script>
