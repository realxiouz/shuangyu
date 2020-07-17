<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
      <!--
      <el-row class="page-tools" style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      -->
      <el-table
      class="page-table"
        highlight-current-row
        v-loading="loading"
        size="mini"
        :data="tableData"
      >
        <el-table-column label="配置" type="expand">
          <template slot-scope="props">
            <el-row>
              <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="3" v-for="(item,index) in props.row.configNavs" :key="index">
                <el-button  type="primary" @click="detailsOnClick(item.uri,props.row)">{{ item.name }}</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="firm" label="企业名称" :formatter="firmNameFormat" align="left" sortable></el-table-column>
        <el-table-column prop="openName" label="开发平台名称" align="left" sortable width="180"></el-table-column>
        <!--
        <el-table-column prop="accountName" label="收款人户名" align="left" sortable width="180"></el-table-column>
        <el-table-column prop="accountType" label="资金账号类型" :formatter="accountTypeFormat" align="center" width="100"></el-table-column>
        <el-table-column prop="bankAccount" label="银行账号" align="center" width="180"></el-table-column>
        <el-table-column prop="bankName" label="银行名称" align="center" width="180"></el-table-column>
        <el-table-column prop="categoryCode" label="类别编码" align="center" width="180"></el-table-column>
        <el-table-column prop="categoryName" label="类别名称" align="center" width="180"></el-table-column>
        <el-table-column prop="domain" label="企业域名" align="center" width="180"></el-table-column>
        <el-table-column prop="financeEmail" label="联系人电子邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="financeName" label="财务联系人" align="center" width="180"></el-table-column>
        <el-table-column prop="financePhone" label="联系人电话" align="center" width="180"></el-table-column>
        <el-table-column prop="merchantDomain" label="商户(客户/供应商)域名" align="center" width="180"></el-table-column>
        <el-table-column prop="merchantType" label="类型" :formatter="merchantTypeFormat" align="center" width="180"></el-table-column>
        <el-table-column prop="openCode" label="开放平台编码" align="center" width="180"></el-table-column>
        <el-table-column prop="openName" label="开放平台名称" align="center" width="180"></el-table-column>
        <el-table-column prop="paymentType" label="付款方式" align="center" width="180"></el-table-column>
        <el-table-column prop="priority" label="重要性" align="center" width="180"></el-table-column>
        <el-table-column prop="paymentType" label="付款方式" align="center" width="180"></el-table-column>
        <el-table-column prop="staffName" label="负责人姓名" align="center" width="180"></el-table-column>
        <el-table-column prop="taxNo" label="税务登记号" align="center" width="180"></el-table-column>
        <el-table-column prop="taxRate" label="税率" align="center" width="180"></el-table-column>
        -->
      </el-table>
      <el-pagination
        class="page-footer"
        @size-change="onSizeChange"
        @prev-click="onPrev"
        @next-click="onNext"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSizes[0]"
        :page-sizes="pageSizes"
        :total="total"
      ></el-pagination>
    </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import { MIXIN_LIST } from "@/utils/mixin";


  export default {
    data() {
      return {
        dialogVisible: false,
        pageFlag: 0,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        loading: true,
        params: {},
      };
    },
    methods: {
      formatFirmName(rows) {
        let firmName = '';
        if(rows.firm && rows.firm.firmName){
          firmName = rows.firm.firmName;
        }
        return firmName;
      },
      detailsOnClick(configNavUrl, item) {
        this.$router.push({
          path: configNavUrl,
          query: {domain: item.firm.domain, openId: item.openId, firmId: item.firm.firmId}
        });
      },
      getList() {
        if (this.lastId) {
          this.params.lastId = this.lastId;
        }
        this.$store
          .dispatch("firm/getConfigPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            lastId: this.lastId,
            params: this.params
          })
          .then(result => {
            if (result && result.rows && result.rows.length > 0) {
              this.tableData = result.rows;
              this.total = result.total;
            } else {
              this.tableData = [];
              this.total = 0;
            }
          });
      },
      loadData() {
        this.getList();
      },
      handleSearch(params) {
        this.params = params;
        this.pageFlag = 0;
        this.lastId = null;
        this.loadData();
      },
      handleRefresh() {
        this.handleSearch();
      },
      handlePrev() {
        this.pageFlag = -1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[0].firmId;
        }
        this.loadData();
      },
      handleNext() {
        this.pageFlag = 1;
        if (this.tableData.length > 0) {
          this.lastId = this.tableData[this.tableData.length - 1].firmId;
        }
        this.loadData();
      },
    },
    components: {
      search
    },
    created() {
      this.loadData();
    }
  };
</script>

<style>
  .page-tools {
    margin-bottom: 10px;
  }
</style>
