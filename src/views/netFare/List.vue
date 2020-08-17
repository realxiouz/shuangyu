<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        size="mini"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;"
        fit
      >
        <el-table-column prop="flightCode" label="航班号" width="300" align="center"></el-table-column>
        <el-table-column label="票价标签" width="300" align="center">
          <template slot-scope="scope">
            <span>{{initDiscountTag(scope.row.tag)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="折扣" width="300" align="center">
          <template slot-scope="scope">
            <span>{{initDiscount(scope.row.tag, scope.row.discount)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束日期" width="300" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.endDate" class="el-icon-time"></i>
            <span>{{initDate(scope.row.endDate,'YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.flightCode)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button @click="onDel(scope.row.flightCode)" type="text" size="mini" class="btn-danger">删除</el-button>
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
      flightCode:'',
      dialogVisible: false,
      keyName:'flightCode',
      /*记录当前进行操作的节点*/
      deleteForSearch: false,
      actions: {
        getPageList: 'netFare/getPageList',
        removeOne: 'netFare/removeOne'
      }
    };
  },
  components: {
    search,
    edit
  },
  methods: {
    initDate(dateStr, format) {
      if (dateStr && dateStr > 0) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    initDiscountTag(tag) {
      if ("0" === tag) {
        return "折扣";
      } else {
        return "反点";
      }
    },
    initDiscount(tag, discount) {
      if ("0" === tag) {
        return 1 === discount ? "全价" : " " + discount * 10 + " 折";
      } else {
        return discount;
      }
    }
  },
 
};
</script>
