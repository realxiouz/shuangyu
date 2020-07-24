<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" style="margin-bottom:15px;margin-left:22px;">
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
      style="width: 100%;margin-bottom:15px;"
    >
      <el-table-column
        prop="airline"
        label="航司"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="airlines"
        label="可迁转航司"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="before"
        label="非自愿改签之前"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="after"
        label="非自愿改签之后"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="airline"
        label="航司"
        align="center"
      ></el-table-column>
      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
          <span>{{ formatEnable(scope.row.enable) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row)" type="primary" size="mini"
            >编辑</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="danger" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"></edit>
    
  </div>
</template>

<script>
import search from "./Search";
import edit from "./Edit";
import {MIXIN_LIST} from "@/utils/mixin";

export default {
  mixins: [MIXIN_LIST],
  data() {
    return {
      dialogVisible: false,
      /*记录当前进行操作的节点*/
      curNode: {},
      keyName:'flightId',
      update: false,
      deleteValue: false,
      searchForm: {},
      actions: {
        getPageList: 'airlineChange/getList',
        removeOne: 'airlineChange/removeOne'
      }
    };
  },
  components: {
    search,
    edit
  },
  methods: {
   
    /*对航司迁转信息进行删除*/
    handleDelete(row) {
      this.open(
        this.delete,
        row.airline,
        "此操作将删除航司迁转信息, 是否继续?"
      );
    },
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (dateStr && dateStr > 0) {
        const date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    formatEnable(enable) {
      if (enable) {
        return "启用";
      }
      return "未启用";
    }
  },
  
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
