<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" >
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
      :data="tableData"
      ref="tableData"
      @row-dblclick="onEdit"
      style="width: 100%;"
      size="mini"
      v-loading="loading"
      highlight-current-row
    >
      <el-table-column
        prop="airlineName"
        width="180"
        label="航司名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="airlineCode"
        width="180"
        label="航司二字码"
        align="center"
      ></el-table-column>
      <el-table-column prop="cabins" label="舱位" align="center">
        <template slot-scope="scope">
          <span v-html="formatcabins(scope.row.cabins)"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="360">
        <template slot-scope="scope">
          <el-button type="text" size="mini" class="btn-primary" @click="onEdit(scope.row.airlineCode)"
            >编辑</el-button
          >
          <el-button type="text" size="mini" class="btn-primary"
            @click="lookFlights(scope.row.flights)"
            >查看航班</el-button
          >
          <el-button type="text" size="mini" class="btn-primary"
            @click="lookSegments(scope.row.segments)"
            >查看航段</el-button
          >
          <el-button type="text" size="mini" class="btn-danger"
            @click="onDel(scope.row.airlineCode)"
            >删除</el-button
          >
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
    
    <el-dialog :title="lookTitle" :visible.sync="showInfo" width="30%">
      <look-lnfo
        v-if="showInfo"
        :flights="flightsInfo"
        :segments="segmentsInfo"
        :isFlights="isFlights"
        ref="form"
        @onCancel="handleCancel"
      ></look-lnfo>
    </el-dialog>
  </div>
</template>
<script>
import search from "./Search.vue";
import edit from "./Edit.vue";
import LookLnfo from "./LookLnfo.vue";
import { MIXIN_LIST } from "@/utils/mixin";

export default {
  data() {
    return {
      lookTitle: "",
      showInfo: false,
      isFlights: false,
      flightsInfo: "",
      segmentsInfo: "",
      airlineCode: "",
      keyName:'airlineCode',
      actions: {
        getPageList: 'airline/getPageList',
        removeOne: 'airline/removeOne'
      }
    };
  },
  components: {
    edit,
    search,
    LookLnfo
  },
  methods: {
    handleCancel() {
      this.dialogVisible = false;
      this.showInfo = false;
    },
    lookFlights(flights) {
      this.lookTitle = "查看航班信息";
      this.flightsInfo = flights;
      this.isFlights = true;
      this.showInfo = true;
    },
    lookSegments(segments) {
      this.lookTitle = "查看航段信息";
      this.segmentsInfo = segments;
      this.isFlights = false;
      this.showInfo = true;
    },
    formatcabins(data) {
      if (!data) {
        return "";
      }
      let str = "";
      data.forEach(item => {
        str += item + " , ";
      });
      return str.substring(0, str.length - 2);
    }
  },
  mixins: [MIXIN_LIST]
};
</script>
