<template>
  <div class="bigBox">
    <div class="searchBox">
      <firm-search @onSearch="handleSearch"></firm-search>
    </div>
    <div class="contentBox">
      <!--
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      -->
      <el-table
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
        @size-change="handleSizeChange"
        @prev-click="handlePrev"
        @next-click="handleNext"
        background
        layout="total,sizes,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSizes[0]"
        :page-sizes="pageSizes"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import firmEdit from "./Edit";
  import firmSearch from "./Search";
  import { MIXIN_TABLE } from "@/utils/mixin";

  export default {
    data() {
      return {
        beanIdName: "firmId",
        actionName: 'firm/getConfigPageList',
        firmId: "",
      };
    },
    methods: {
      detailsOnClick(uri, item) {
        this.$router.push({
          path: uri,
          query: {domain: item.firm.domain, openId: item.openId, firmId: item.firm.firmId}
        });
      },
      //账户类型格式化值
      accountTypeFormat(row) {
        switch (row.accountType) {
          case 0:
            return "现金";
          case 1:
            return "银行存款";
          case 2:
            return "支付宝";
          case 3:
            return "微信支付";
          case 4:
            return "汇付";
          case 5:
            return "易宝";
        }
      },
      //客户类型格式化值
      merchantTypeFormat(row) {
        switch (row.accountType) {
          case 0:
            return "现金";
          case 1:
            return "银行存款";
          case 2:
            return "支付宝";
        }
      },
      firmNameFormat(row) {
        return row.firm.firmName;
      }
      //企业名称
    },
    components: {
      firmSearch
    },
    mixins: [MIXIN_TABLE]

  };
</script>
