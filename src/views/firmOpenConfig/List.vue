<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="handleSearch" />
    <el-table class="page-table" :data="tableData">
      <el-table-column label="配置" type="expand">
        <template slot-scope="props">
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="2" v-for="(item,index) in props.row.configNavList" :key="index">
              <el-button  type="primary" @click="detailsOnClick(item.configNavUrl, props.row)">{{ item.configNavName }}</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="开放平台编码" align="center" prop="openCode" />
      <el-table-column label="开放平台名称" align="center" prop="openName" />
      <el-table-column label="企业名称" align="center" prop="firmName" :formatter="formatFirmName" />
    </el-table>
    <el-pagination
      class="page-footer"
      background
      layout="total,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
      @prev-click="handlePrev"
      @next-click="handleNext"
    ></el-pagination>
  </div>
</template>

<script>
  import search from "./Search";

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
