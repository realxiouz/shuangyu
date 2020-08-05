<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" justify="space-between">
      <el-button icon="el-icon-back" type="warning" size="mini" @click="onBack">返回</el-button>
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      size="mini"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-bottom:15px;"
    >
      <el-table-column label="企业名称" align="center" prop="firmName" />
      <el-table-column label="平台名称" align="center" prop="openName" />
      <el-table-column label="用户账号" align="center" prop="username" />
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onEdit(scope.row.policyConfigId)">修改</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row.policyConfigId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
      @size-change="onSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
      @current-change="onCurrentChange"
      :current-page.sync="currentPage"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" :firmId="firmId" :merchantId="merchantId" :openId="openId" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        dialogVisible: false,
        keyName: 'policyConfigId',
        actions: {
          getPageList: 'qunarPolicyConfig/getPageList',
          removeOne: 'qunarPolicyConfig/removeOne'
        },
        firmId: localStorage.getItem("firmId"),
        merchantId: localStorage.getItem("merchantId"),
        openId: localStorage.getItem("openId"),
        params: this.fillParams(),
      };
    },
    methods: {
      onBack(){
        let lastName = localStorage.getItem("lastName");
        if(lastName){
          this.$router.push({name: lastName,});
          localStorage.removeItem("lastName");
        }else{
          this.$router.go(-1);
        }
      },
      fillParams(){
        let params = {};
        if(localStorage.getItem("firmId")){
          params.firmId = localStorage.getItem("firmId");
       //   params.firmId = this.$route.params.firmId;
        }
        if(localStorage.getItem("merchantId")){
          params.merchantId = localStorage.getItem("merchantId");
          //   params.merchantId = this.$route.params.merchantId;
        }
        if(localStorage.getItem("openId")){
          params.openId = localStorage.getItem("openId");
        //  params.openId = this.$route.params.openId;
        }
        return params;
      }
    },
    components: {
      edit,
      search
    }
  };
</script>

<style>
  .page-tools {
    margin-bottom: 10px;
  }
</style>
