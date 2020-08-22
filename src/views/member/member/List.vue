<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" highlight-current-row v-loading="loading" size="mini" :data="tableData">
      <el-table-column label="会员编号" align="center" prop="memberNo"></el-table-column>
      <el-table-column label="会员名称" align="center" prop="memberName"></el-table-column>
      <el-table-column label="会员类型" align="center" prop="memberType">
        <template slot-scope="scope">
          {{ memberTypeObj[scope.row.memberType] }}
        </template>
      </el-table-column>
      <el-table-column label="会员状态" align="center" prop="status">
        <template slot-scope="scope">
          {{ memberStatusObj[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row.memberId)" type="text" size="mini" class="btn-primary">编辑</el-button>
          <el-button @click="onDel(scope.row.memberId)" type="text" size="mini" class="btn-danger">删除</el-button>
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
    name: "member",
    data(){
      return{
        dialogVisible: false,
        keyName: 'memberId',
        actions: {
          getPageList: 'member/getPageList',
          removeOne: 'member/removeOne'
        },
        memberTypeObj: MEMBER_TYPE_OBJ,
        memberStatusObj: MEMBER_STATUS_OBJ
      }
    },
    components: {
      edit,
      search
    }
  };
</script>
