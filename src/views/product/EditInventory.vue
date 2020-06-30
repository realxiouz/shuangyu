<template>
  <div class="bigBox">
    <div class="contentBox">
      <div id="goBack" @click="goBack">
        <el-page-header></el-page-header>
      </div>
      <br>
      <el-table
        :data="dataList"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="productCode"
          label="编号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="productName"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="categoryName"
          label="商品分类"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="brandName"
          label="品牌"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="skuName"
          label="属性名称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="quantity"
          label="数量"
          width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.quantity"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="maxStockQuantity"
          label="库存上限"
          width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.maxStockQuantity"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="minStockQuantity"
          label="库存下限"
          width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.minStockQuantity"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="unit"
          label="计量单位"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="cost"
          label="成本"
          width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.cost" :precision="2" :step="0.1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="price"
          label="零售价"
          width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.price" :precision="2" :step="0.1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="skuId"
          label="SKU_ID"
          >
        </el-table-column>
      </el-table>
      <br>
      <div slot="footer" style="text-align:center;">
        <el-button size="mini" @click="handleCancel">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'EditInventory',
        data() {
            return {
                dataList: [],
            }
        },
        methods: {
            loadData(productId) {
                this.$store
                    .dispatch("productInventory/getList", {productId: productId})
                    .then(data => {
                        this.dataList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store
                            .dispatch("product/save", {
                                skuList: this.dataList,
                                product: this.formData
                            })
                            .then(() => {
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        this.$message({
                            type: "success",
                            message: "保存成功！"
                        });
                        this.goBack();
                    }
                });
            },
            handleCancel() {
                this.goBack();
            },
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: '/home'});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            }
        },
        created() {
            if (this.$route.query.productId) {
                this.loadData(this.$route.query.productId);
            }
        }
    }
</script>
