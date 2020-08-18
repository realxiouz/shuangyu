<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      style="width:100%;"
      size="mini"
    >
      <el-table-column prop="roleName" label="角色名称" align="left" width="200"></el-table-column>
      <el-table-column label="角色类型" align="center" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.roleType==0">平台</span>
          <span v-else-if="scope.row.roleType==1">企业</span>
          <span v-else-if="scope.row.roleType==-1">默认</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" :fit='true'></el-table-column>
      <el-table-column label="是否启用" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" @change="onEnable(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row.roleId)" type="text" size="mini" class="btn-primary">编辑</el-button>
          <el-button @click="onDel(scope.row.roleId)" type="text" size="mini" class="btn-danger">删除</el-button>
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
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"></edit>
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
        roleId: "",
        dialogVisible: false,
        deleteForSearch: false,
        keyId: '',
        keyName: 'roleId',
        actions: {
          getPageList: 'role/getPageList',
          removeOne: 'role/removeOne'
        }
      };
    },
    methods: {
      onEnable(row) {
        row.enable = row.enable ? true : false;
        this.$store
            .dispatch("role/updateOne", {
                roleId: row.roleId,
                data: {
                    enable: row.enable
                }
            })
            .then(() => {
                this.$message({
                    message: "更新成功",
                    type: "success"
                });
                this.loadData();
            })
            .catch(error => {
                console.log(error);
            });
    },
    },
    components: {
      edit,
      search
    }
  };
</script>
