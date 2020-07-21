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
      <el-table-column label="企业名称" align="center" prop="firmName" />
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
      detailsOnClick(configNavUrl, item) {
        this.$router.push(
          {
            path: configNavUrl,
            query: {domain: item.firm.domain, openId: item.openId, firmId: item.firm.firmId}
          }
        );
      }
    },
    components: {
      search
    },
  };
</script>
