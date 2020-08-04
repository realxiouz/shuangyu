<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px;margin-left:10px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
        class="page-table"
        v-loading="loading"
        size="mini"
        :data="tableData"
        ref="tableData"
        @row-dblclick="onEdit"
        highlight-current-row
        style="width: 100%;margin-bottom:15px;"
      >
        <el-table-column prop="dpt" label="出发地" align="center"></el-table-column>
        <el-table-column prop="arr" label="目的地" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="360">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.segment)" type="primary" size="mini">编辑</el-button>
            <el-button @click="lookFlights(scope.row.flights)" type="primary" size="small">查看航班</el-button>
            <el-button @click="lookSegments(scope.row.airlines)" type="primary" size="small">查看航司</el-button>
            <el-button @click="onDel(scope.row.segment)" type="danger" size="mini">删除</el-button>
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
      
      <el-dialog :title="lookTitle" center :visible.sync="showInfo" width="30%">
        <look-lnfo
          v-if="showInfo"
          :flights="flightsInfo"
          :airlines="airlinesInfo"
          :isFlights="isFlights"
          ref="form"
          @onCancel="handleCancel"
        ></look-lnfo>
      </el-dialog>
    </div>
</template>
<script>
import edit from "./Edit";
import search from "./Search";
import LookLnfo from "./LookLnfo.vue";
import {MIXIN_LIST} from "@/utils/mixin";

export default {
  mixins: [MIXIN_LIST],
  data() {
    return {
      segment: "",
      keyName:'segment',
      keyId:'',
      dialogVisible: false,
      deleteForSearch: false,
      showInfo: false,
      isFlights: false,
      lookTitle: "",
      flightsInfo: "",
      airlinesInfo: "",
      actions: {
        getPageList: 'flightSegment/getPageList',
        removeOne: 'flightSegment/removeOne'
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
    lookSegments(airlines) {
      this.lookTitle = "查看航司信息";
      this.airlinesInfo = airlines;
      this.isFlights = false;
      this.showInfo = true;
    },
   
  },
 
};
</script>
