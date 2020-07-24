<template>
  <div class="page">
    <!-- <search class="page-search" ref="search" @onSearch="onSearch"/> -->
    <el-row class="page-tools" style="margin-bottom:15px;margin-left:40px">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd"
        >添加</el-button
      >
    </el-row>
    <el-table
      class="page-table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-bottom: 15px;"
      size="mini"
      border
    >
      <el-table-column prop="totalAmount" label="成交金额" />
      <el-table-column label="详情">
        <template v-slot="{ row }">
          <el-table :data="row.passengers" border style="margin-top:10px;">
            <el-table-column label="乘客类型" width="70">
              <template v-slot="{ row }">
                <el-tag type="primary">{{ ageMap[row.ageType] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" />
            <el-table-column label="电话" prop="phone" width="120" />
            <el-table-column label="证件类型" width="90">
              <template v-slot="{ row }">
                <el-tag type="primary">{{ cardMap[row.idCardType] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="证件号" prop="idCardNo" />
          </el-table>
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
    />
  </div>
</template>

<script>
import { MIXIN_LIST } from "@/utils/mixin";
import { CARD_TYPES_MAP, AGE_TYPES_MAP } from "@/utils/const";
export default {
  mixins: [MIXIN_LIST],
  data() {
    return {
      cardMap: CARD_TYPES_MAP,
      ageMap: AGE_TYPES_MAP,

      keyId: "",
      keyName: "orderNo",
      actions: {
        getPageList: "productOrder/getPageList",
        removeOne: "productOrder/removeOne"
      },
      extraParam: {
        orderType: -1
      }
    };
  },
  created() {
    this.extraParam.orderType = this.$route.query.orderType || 100;
  },
  methods: {
    onAdd() {
      this.$router.push({
        name: 'orderBaseEdit',
        query: {
          orderType: this.extraParam.orderType
        }
      })
    }
  }
};
</script>

<style></style>
