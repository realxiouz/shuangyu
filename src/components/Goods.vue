<template>
  <el-row>
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-table :data="value" max-height="250" border>
        <el-table-column
          label="商品编码"
          prop="productCode"
          show-overflow-tooltip
        />
        <el-table-column label="商品名称" prop="productName" />
        <el-table-column label="品牌" prop="brandName" />
        <el-table-column prop="skuName" label="属性名称" />
        <el-table-column prop="price" label="单价" />
        <el-table-column prop="quantity" label="数量" width="180">
          <template slot-scope="prop">
            <el-input-number v-model="prop.row.quantity" :min="1" @change="calcTotal" />
          </template>
        </el-table-column>
        <el-table-column label="计量单位" prop="unit" />
        <el-table-column prop="amount" label="金额" align="center">
          <template v-slot="{ row }">
            {{ row.price * row.quantity }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:header>
            <el-button @click="showTable = true" type="primary"
              >添加商品</el-button
            >
          </template>
          <template v-slot="{ $index }">
            <el-button type="danger" @click="onDelFormTable($index)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog
      title="商品明细"
      :visible.sync="showTable"
      :close-on-click-modal="false"
      width="60%"
    >
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="商品类目:">
          <el-input
            clearable
            @keyup.enter.native="onSearch(searchForm)"
            v-model="searchForm.categoryName"
            placeholder="请输入商品类目..."
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌名称:">
          <el-input
            clearable
            @keyup.enter.native="onSearch(searchForm)"
            v-model="searchForm.brandName"
            placeholder="请输入品牌搜索..."
          ></el-input>
        </el-form-item>
        <el-form-item label="商品编码:">
          <el-input
            clearable
            @keyup.enter.native="onSearch(searchForm)"
            v-model="searchForm.productCode"
            placeholder="请输入商品名称搜索..."
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="onSearch(searchForm)"
            >搜 索</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border @selection-change="onSelChange">
        <el-table-column type="selection" />
        <el-table-column
          label="商品编码"
          prop="productCode"
          show-overflow-tooltip
        />
        <el-table-column label="商品名称" prop="productName" />
        <el-table-column label="商品类目" prop="categoryName" />
        <el-table-column label="品牌名称" prop="brandName" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column label="计量单位" prop="unit" />
        <el-table-column prop="price" label="单价" />
        <el-table-column prop="skuName" label="属性名称" />
        <el-table-column prop="skuId" label="sku" />
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
      <template v-slot:footer>
        <el-button-group>
          <el-button @click="showTable = false">取 消</el-button>
          <el-button type="primary" @click="onAddConfirm">确 定</el-button>
        </el-button-group>
      </template>
    </el-dialog>
  </el-row>
</template>

<script>
import { MIXIN_LIST } from "@/utils/mixin";
export default {
  mixins: [MIXIN_LIST],
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      actions: {
        getPageList: "productInventory/getPageList"
      },
      keyName: "inventoryId",
      searchForm: {},

      showTable: false,

      toBeSel: []
    };
  },
  methods: {
    onSelChange(val) {
      this.toBeSel = val;
    },
    onAddConfirm() {
      this.toBeSel.forEach(i => {
        if (
          this.value.findIndex(
            j => i.productId == j.productId && i.skuId == j.skuId
          ) == -1
        ) {
          i.quantity = 1;
          this.value.push(i);
        }
      });
      this.$emit("input", this.value);
      this.showTable = false;
      this.calcTotal();
    },
    onDelFormTable(inx) {
      this.value.splice(inx, 1);
      this.$emit("input", this.value);
      this.calcTotal();
    },
    calcTotal() {
      this.$emit(
        "total",
        this.value.reduce((pre, cur) => pre + cur.price * cur.quantity, 0)
      );
    }
  }
};
</script>

<style></style>
