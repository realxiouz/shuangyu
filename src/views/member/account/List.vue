<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" highlight-current-row v-loading="loading" size="mini" :data="tableData">
      <el-table-column label="会员名称" align="center" prop="memberId" :formatter="formatMember"></el-table-column>
      <el-table-column label="账户编号" align="center" prop="accountNo"></el-table-column>
      <el-table-column label="账户类型" align="center" prop="accountType">
        <template slot-scope="scope">
          {{ accountTypeObj[scope.row.accountType] }}
        </template>
      </el-table-column>
      <el-table-column label="账户状态" align="center" prop="status">
        <template slot-scope="scope">
          {{ accountStatusObj[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column label="账户余额" align="center" prop="balance" :formatter="formatMoney"></el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row.accountId)" type="text" size="mini" class="btn-primary">编辑</el-button>
          <el-button @click="onDel(scope.row.accountId)" type="text" size="mini" class="btn-danger">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import {MIXIN_LIST} from "@/utils/mixin";
  import { MEMBER_TYPE_OBJ, MEMBER_STATUS_OBJ } from '@/utils/const'
  import edit from "./Edit";
  import search from "./Search";
  export default {
    mixins: [MIXIN_LIST],
    name: "memberAccount",
    data(){
      return{
        dialogVisible: false,
        keyName: 'accountId',
        actions: {
          getPageList: 'memberAccount/getPageList',
          removeOne: 'memberAccount/removeOne'
        },
        accountTypeObj: MEMBER_TYPE_OBJ,
        accountStatusObj: MEMBER_STATUS_OBJ,
        memberList: []
      }
    },
    methods: {
      getMemberList(){
        this.$store
          .dispatch("member/getList", {})
          .then(data => {
            if(data && data.length > 0){
              this.memberList = data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      formatMember(row){
        let that = this;
        let memberName = '';
        if(row.memberId){
          that.memberList.forEach(function(obj){
            if(row.memberId === obj.memberId){
              memberName = obj.memberName;
            }
          });
        }
        return memberName;
      },
      formatMoney(row){
        let balance = '0.00';
        if(row.balance){
          balance = parseFloat(row.balance).toFixed(2);
        }
        return balance;
      }
    },
    components: {
      edit,
      search
    },
    created() {
      this.getMemberList();
    }
  };
</script>
