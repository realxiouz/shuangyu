<template>
  <div>
    <div>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="商品类目:" size="mini">
          <el-input
            clearable
            @keyup.enter.native="$emit('onSearch', searchForm)"
            v-model="searchForm.categoryName"
            placeholder="请输入商品类目..."
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌名称:" size="mini">
          <el-input
            clearable
            @keyup.enter.native="$emit('onSearch', searchForm)"
            v-model="searchForm.brandName"
            placeholder="请输入品牌搜索..."
          ></el-input>
        </el-form-item>
        <!--        <el-form-item label="商品名称:" size="mini">
                  <el-input
                    clearable
                    @keyup.enter.native="$emit('onSearch', searchForm)"
                    v-model="searchForm.productName"
                    placeholder="请输入商品名称搜索..."
                  ></el-input>
                </el-form-item>-->
        <el-form-item label="商品编码:" size="mini">
          <el-input
            clearable
            @keyup.enter.native="$emit('onSearch', searchForm)"
            v-model="searchForm.productCode"
            placeholder="请输入商品名称搜索..."
          ></el-input>
        </el-form-item>
        <el-form-item size="mini">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="onSearch"
            >搜 索</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="productTable"
      :data="productList"
      @selection-change="handleSelectionChange"
      highlight-current-row
      size="mini"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        prop="productCode"
        label="商品编码"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="商品名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="categoryName"
        label="商品类目"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="brandName"
        label="品牌名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="maxStockQuantity"
        label="库存上线"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="minStockQuantity"
        label="库存下线"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="unit"
        label="计量单位"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuName"
        label="属性名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuId"
        label="sku"
        align="center"
      ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="onSizeChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      background
      layout="total,sizes,prev,next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
    <div style="text-align:right;margin-top: 20px;margin-right: 4%">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      productList: [],
      searchForm: {},
      selectedList: [],
      pageFlag: 1,
      pageSize: 10,
      lastId: null,
      total: 0
    };
  },
  methods: {
    /*翻前页*/
    handlePrevClick() {
      this.pageFlag = -1;
      this.lastId = this.productList[0].inventoryId;
      this.loadProducts();
    },
    /*翻后页*/
    handleNextClick() {
      this.pageFlag = 1;
      this.lastId = this.productList[this.productList.length - 1].inventoryId;
      this.loadProducts();
    },
    onSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadProducts();
    },
    onSearch() {
      this.loadProducts();
    },
    loadProducts() {
      if (this.lastId) {
        this.searchForm.lastId = this.lastId;
      }
      this.$store
        .dispatch("productInventory/getPageList", {
          pageFlag: this.pageFlag,
          pageSize: this.pageSize,
          filter: this.searchForm
        })
        .then(data => {
          if (data) {
            this.productList = data.rows;
            this.total = data.total;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSelectionChange(selection) {
      this.selectedList = selection;
    },
    handleConfirm() {
      let _selectedProductList = [];
      this.selectedList.forEach(item => {
        //库存
        item.stockQuantity = item.quantity;
        //数量
        item.quantity = 0;
        //金额
        item.amount = 0;
        _selectedProductList.push(item);
      });
      this.$emit("onConfirm", _selectedProductList);
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>
