<template>
  <div class="page">
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" highlight-current-row v-loading="loading">
      <el-table-column label="用户id"  align="center"></el-table-column>
      <el-table-column label="支付密码" align="center"></el-table-column>
      <el-table-column label="会员id"  align="center"></el-table-column>
      <el-table-column label="会员编号" align="center"></el-table-column>
      <el-table-column label="操作"  align="center" width="280">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row.userId)" type="text" size="mini" class="btn-primary">编辑</el-button>
          <el-button @click="onDel(scope.row.userId)" type="text" size="mini" class="btn-danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {MIXIN_LIST} from "@/utils/mixin";
  export default {
    mixins: [MIXIN_LIST],
    name: "operator"
  };
</script>
