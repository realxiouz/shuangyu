<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" style="margin-bottom:15px; margin-left:50px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table
      class="page-table"
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
        max-height="650"
        size="mini"
      >
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="segment" label="航段" width="100" align="center"></el-table-column>
        <el-table-column prop="dpt" label="出发地" align="center"></el-table-column>
        <el-table-column prop="arr" label="目的地" align="center"></el-table-column>
        <el-table-column prop="airlineCode" label="航司" width="100" align="center"></el-table-column>
        <el-table-column prop="cabin" label="舱位" width="100" align="center"></el-table-column>
        <el-table-column prop="price" label="价格" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.price)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roundTripPrice" label="往返价格" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatAmount(scope.row.roundTripPrice)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始日期" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.startDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.fareId)" type="primary" size="mini">编辑</el-button>
            <el-button @click="onDel(scope.row.fareId)" type="danger" size="mini">删除</el-button>
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
      dialogVisible: false,
      deleteForSearch: false,
      fareId:'',
      keyName:'fareId',
      actions: {
        getPageList: 'fare/getPageList',
        removeOne: 'fare/removeOne'
      }
    };
  },
  methods: {
   
    /*添加记录时完成数据填写或编辑记录时，点击对数据进行保存*/
    handleSave(formData) {
      this.dialogVisible = false;
      let url = "";
      if ("" != formData.fareId) {
        url = "fare/updateOne";
      } else {
        url = "fare/addOne";
      }
      this.$store
        .dispatch(url, formData)
        .then(() => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    
   
    
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (null != dateStr) {
        const date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    },
    formatAmount(amount) {
      if (!amount) {
        return "";
      }
      return "￥" + this.$numeral(amount).format("0.00");
    }
  },
  
  computed: {
    formatDate() {
      return function(dateStr, format) {
        return this.initDate(dateStr, format);
      };
    }
  },
 components: {
      edit,
      search
    },
};
</script>
