<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <el-row class="page-tools" >
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
      </el-row>
      <el-table class="page-table" v-loading="loading" :data="tableData" highlight-current-row size="mini" style="width: 100%;" fit>
        <el-table-column label="序号" type="index" width="60" align="center">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="airlineCode" label="航司" width="80" align="center"></el-table-column>
        <el-table-column prop="dpt" label="出发地" align="center"></el-table-column>
        <el-table-column prop="arr" label="到达地" align="center"></el-table-column>
        <el-table-column prop="actFlightCode" label="主航班号" width="100" align="center"></el-table-column>
        <el-table-column prop="flightCode" label="航班号" width="100" align="center"></el-table-column>
        <el-table-column prop="cabin" label="舱位" width="80" align="center"></el-table-column>
        <el-table-column prop="discountValue" label="票面价/折扣" width="100" align="center"></el-table-column>
        <el-table-column label="销售起始日期" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.sellStartDate" class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.sellStartDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售结束日期" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.sellEndDate" class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.sellEndDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出发日期" width="100" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.flightDate" class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.flightDate,'YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="earliestAdvanceDays" label="最早出票时限" width="100"></el-table-column>
        <el-table-column prop="policyCode" label="政策编码" width="100" align="center"></el-table-column>
        <el-table-column prop="policySource" label="政策来源" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.policyId)" type="text" size="mini" class="btn-primary">编辑</el-button>
            <el-button @click="onDel(scope.row.policyId)" type="text" size="mini" class="btn-danger">删除</el-button>
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
  name: "policyList",
  data() {
    return {
      dialogVisible: false,
      policyId: "",
      keyName:'policyId',
      searchParams: {},
      actions: {
          getList: 'policy/getList',
          removeOne: 'policy/removeOne'
        }
    };
  },
  methods: {
    loadTotal(params) {
      this.$store
        .dispatch("policy/getTotal", {
          filters: params
        })
        .then(data => {
          this.total = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*初始化用工列表中的生日日期格式*/
    initDate(dateStr, format) {
      if (null != dateStr) {
        let date = new Date(dateStr);
        return this.$moment(date).format(format);
      } else {
        return "";
      }
    }
  },
  created() {
    this.loadTotal();
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
  }
};
</script>
