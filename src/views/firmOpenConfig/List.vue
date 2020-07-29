<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch" />
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
      <el-table-column label="企业名称" align="center" :formatter="formatFirmName" />
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
  </div>
</template>

<script>
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        dialogVisible: false,
        keyName: 'firmId',
        actions: {
          getPageList: 'firm/getConfigPageList'
        }
      };
    },
    methods: {
      formatFirmName(row){
        let firmName = '';
        if(row && row.firm && row.firm.firmName){
          firmName = row.firm.firmName;
        }
        return firmName;
      },
      detailsOnClick(configNavUrl, item) {
        let lastName = this.$router.history.current.name;
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("domain", item.firm.domain);
        localStorage.setItem("firmId", item.firm.firmId);
        localStorage.setItem("openId", item.openId);
/*        this.$router.push(
          {
            name: configNavName,
            params: {domain: item.firm.domain, firmId: item.firm.firmId, openId: item.openId}
          }
        );*/
        this.$router.push(
          {
            path: configNavUrl
          }
        );
      }
    },
    components: {
      search
    },
  };
</script>
