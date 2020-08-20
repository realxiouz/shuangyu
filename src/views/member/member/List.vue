<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" highlight-current-row v-loading="loading">
      <el-table-column label="会员编号" align="center"></el-table-column>
      <el-table-column label="会员名称"  align="center"></el-table-column>
      <el-table-column label="类型"  align="center"></el-table-column>
      <el-table-column label="状态"  align="center"></el-table-column>
      <el-table-column label="操作"  align="center" width="280">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row.userId)" type="text" size="mini" class="btn-primary">编辑</el-button>
          <el-button @click="onDel(scope.row.userId)" type="text" size="mini" class="btn-danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"/>
  </div>
</template>

<script>
  import {MIXIN_LIST} from "@/utils/mixin";
  import edit from "./Edit";
  import search from "./Search";
  export default {
    mixins: [MIXIN_LIST],
    name: "member",
    data(){
      return{
        keyId: '',
        keyName: 'userId',
      }
    },
    components: {
      edit,
      search
    },
  };
</script>
