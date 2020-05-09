<template>
  <div>
    <el-table ref="productTable" :data="productList" @selection-change="handleSelectionChange" highlight-current-row size="mini">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="productCode" label="商品编码" align="center"></el-table-column>
      <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="categoryName" label="商品类目" align="center"></el-table-column>
      <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
      <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
      <el-table-column prop="maxStockQuantity" label="库存上线" align="center"></el-table-column>
      <el-table-column prop="minStockQuantity" label="库存下线" align="center"></el-table-column>
      <el-table-column prop="unit" label="计量单位" align="center"></el-table-column>
      <el-table-column prop="price" label="单价" align="center"></el-table-column>
      <el-table-column prop="cost" label="成本" align="center"></el-table-column>
      <el-table-column prop="skuName" label="属性名称" align="center"></el-table-column>
      <el-table-column prop="skuId" label="sku" align="center"></el-table-column>
    </el-table>

    <div style="text-align:right;margin-top: 20px;margin-right: 4%">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['orderDetails'],
        data() {
            return {
                formData: {},
                productList: [],
                filter: {},
                selectedList: []
            }
        },
        methods: {
            loadProducts() {
                this.$store
                    .dispatch("productInventory/getList", {filter: this.filter})
                    .then(data => {
                        this.productList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleSelectionChange(selection){
                this.selectedList = selection;
            },
            handleConfirm() {
                this.$emit('onConfirm', this.selectedList);
            },
            clearSelectedList(){
                this.selectedList = [];
            }
        },
        created() {
            this.loadProducts();
        }
    }
</script>
