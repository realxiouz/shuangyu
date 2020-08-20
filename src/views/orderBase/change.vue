<template>
  <div>
    <el-divider>原始商品信息</el-divider>
    <el-table :data="goods" max-height="250" border>
      <el-table-column label="商品编码" prop="productCode" show-overflow-tooltip />
      <el-table-column label="商品名称" prop="productName" />
      <el-table-column label="品牌" prop="brandName" />
      <el-table-column prop="skuName" label="属性名称" />
      <el-table-column prop="price" label="单价" />
      <el-table-column prop="quantity" label="数量" width="180">
        <template slot-scope="prop">
          <el-input-number v-model="prop.row.quantity" :min="1" disabled />
        </template>
      </el-table-column>
      <el-table-column label="计量单位" prop="unit" />
      <el-table-column prop="amount" label="金额" align="center">
        <template v-slot="{ row }">{{ row.price * row.quantity }}</template>
      </el-table-column>
    </el-table>
    <el-divider>商品信息</el-divider>
    <el-table :data="selGoods" max-height="250" border>
      <el-table-column label="商品编码" prop="productCode" show-overflow-tooltip />
      <el-table-column label="商品名称" prop="productName" />
      <el-table-column label="品牌" prop="brandName" />
      <el-table-column prop="skuName" label="属性名称" />
      <el-table-column prop="price" label="单价" />
      <el-table-column prop="quantity" label="数量" width="180">
        <template slot-scope="prop">
          <el-input-number v-model="prop.row.quantity" :min="1" />
        </template>
      </el-table-column>
      <el-table-column label="计量单位" prop="unit" />
      <el-table-column prop="amount" label="金额" align="center">
        <template v-slot="{ row }">{{ row.price * row.quantity }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot:header>
          <el-button @click="showTable = true" type="primary">添加商品</el-button>
        </template>
        <template v-slot="{ $index }">
          <el-button type="danger" @click="onDelFormTable($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider>乘客信息</el-divider>
    <el-table :data="ps" @selection-change="onSelectionChange" border ref="table">
      <el-table-column type="selection" width="55" />
      <el-table-column label="乘客类型">
        <template v-slot="{row}">{{row.ageType|ageType}}</template>
      </el-table-column>
      <el-table-column label="姓名" prop="fullName" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="证件类型">
        <template v-slot="{row}">{{row.idCardType|cardType}}</template>
      </el-table-column>
      <el-table-column label="证件号" prop="idCardNo" />
    </el-table>
    <div style="margin-top:10px;">
      <el-button type="primary" @click="onConfirmChange" :disabled="!selVal.length||!selGoods.length">确定</el-button>
    </div>


    <el-dialog
      title="商品明细"
      :visible.sync="showTable"
      width="60%"
      append-to-body
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
  </div>
</template>

<script>
import { MIXIN_LIST } from "@/utils/mixin";

export default {
  mixins: [MIXIN_LIST],
  props: {
    ps: {
      type: Array
    },
    goods: {
      type: Array,
    }
  },
  data() {
    return {
      selVal: [],
      showTable: false,

      actions: {
        getPageList: "productInventory/getPageList"
      },
      keyName: "inventoryId",
      searchForm: {},

      toBeSel: [],

      selGoods: [],
    };
  },
  methods: {
    onSelectionChange(val) {
      this.selVal = val;
    },
    onConfirmChange() {
      if (this.selVal.length && this.selGoods.length) {
        let arr = this.selGoods.map(i => {
          i.changeFlag = true
          i.changeProductId = i.productId
          return i
        })
        this.$emit("changeOrder", {
          passengers: this.selVal,
          orderDetails: [...this.goods, ...this.selGoods]
        });
      }
    },
    allSelect() {
      this.$refs.table.toggleAllSelection();
    },

    onAddConfirm() {
      this.toBeSel.forEach(i => {
        if (
          this.selGoods.findIndex(
            j => i.productId == j.productId && i.skuId == j.skuId
          ) == -1
        ) {
          i.quantity = 1;
          this.selGoods.push(i);
        }
      });
      this.showTable = false;
    },

    onSelChange(val) {
      this.toBeSel = val;
    },

    onDelFormTable(inx) {
      this.selGoods.splice(inx, 1);
    },
  }
};
</script>