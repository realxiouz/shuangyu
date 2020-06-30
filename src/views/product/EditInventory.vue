<template>
  <div class="bigBox">
    <div class="contentBox">
      <div id="goBack" @click="goBack">
        <el-page-header></el-page-header>
      </div>
      <br>
      <el-row style="margin-bottom:15px;margin-left:40px">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加库存</el-button>
      </el-row>
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
        ></el-table-column>
        <el-table-column
          align="center"
          prop="maxStockQuantity"
          label="库存上限"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="minStockQuantity"
          label="库存下限"
        ></el-table-column>
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
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="price"
          label="零售价"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="skuId"
          label="SKU_ID"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.inventoryId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.inventoryId,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
            handleAdd() {
            },
            handleUpdate() {
            },
            handleRemove() {
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
