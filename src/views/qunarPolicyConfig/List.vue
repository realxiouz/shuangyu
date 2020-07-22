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
      <el-table-column label="用户名称" align="center" prop="userName" />
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
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" :firmId="firmId" :openId="openId" @refresh="onRefresh"/>
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
        params: {
          firmId: this.fillFirmId(),
          openId: this.fillOpenId()
        },
        firmId: null,
        openId: null
      };
    },
    watch: {
      fill() {

      }
    },
    methods: {
      onBack(){
        if (this.$router.history.length <= 1) {
          this.$router.push({path: '/home'});
          return false;
        } else {
          this.$router.go(-1);
        }
      },
      fillFirmId(){
        let firmId = null;
        if(this.$route.params.firmId){
          firmId = this.$route.params.firmId;
        }
        return firmId;
      },
      fillOpenId(){
        let openId = null;
        if(this.$route.params.openId){
          openId = this.$route.params.openId;
        }
        return openId;
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
