<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" style="margin-bottom:15px;margin-left:40px">
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="onAdd"
        >添加</el-button
      >
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-bottom: 15px;"
      size="mini"
    >
      <el-table-column
        prop="appName"
        label="应用名称"
        align="center"
      ></el-table-column>
      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            @change="handleSwitch(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="350">
        <template slot-scope="scope">
          <el-button
            @click="onEdit(scope.row.appId)"
            type="primary"
            size="mini"
            >编辑</el-button
          >
          <el-button
            @click.native.prevent="
              onDel(scope.row.appId, scope.$index, tableData)
            "
            type="danger"
            size="mini"
            >删除
          </el-button>
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
    
      <edit :visible.sync="dialogVisible" :app-id="appId" :key-name="keyName" @refresh="onRefresh"/>
    
  </div>
</template>
<script>
 import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

export default {
  mixins: [MIXIN_LIST],
  name: "appList",
  data() {
    return {
      deleteForSearch: false,
      appId: "",
      keyName:'appId',
      actions: {
          getPageList: 'app/getPageList',
          removeOne: 'app/removeOne'
        }
    };
  },
  methods: {
    
   
    handleSwitch(row) {
      row.enable = row.enable ? true : false;
      this.$store
        .dispatch("app/updateOne", row)
        .then(() => {})
        .catch(error => {
          console.log(error);
        });
    },
  },
  components: {
      edit,
      search
    },
};
</script>
