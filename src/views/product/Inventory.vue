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
    <edit :visible.sync="dialogVisible" :inventory-id="inventoryId" @onSave="handleSave"/>
  </div>
</template>
<script>
    import edit from "./EditInventory.vue";

    export default {
        name: 'inventory',
        data() {
            return {
                dataList: [],
                inventoryId: '',
                dialogVisible: false,
            }
        },
        methods: {
            loadData() {
                this.$store
                    .dispatch("productInventory/getList", {productId: this.$route.query.productId})
                    .then(data => {
                        this.dataList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            handleAdd() {
                this.dialogVisible = true;
            },
            handleUpdate(inventoryId) {
                this.dialogVisible = true;
                this.inventoryId = inventoryId;
            },
            handleRemove(id, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.dispatch("productInventory/removeOne", {inventoryId: id}).then(() => {
                            if (1 === this.tableData.length) {
                                this.prevClick();
                            } else {
                                this.loadData();
                            }
                            rows.splice(index, 1);
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            handleSave(formData) {
                if (this.inventoryId) {
                    this.$store
                        .dispatch("productInventory/updateOne", {inventoryId: formData.inventoryId, data: formData})
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    this.$message({
                        type: "success",
                        message: "更新成功！"
                    });
                } else {
                    this.$store
                        .dispatch("productInventory/addOne", formData)
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    this.$message({
                        type: "success",
                        message: "添加成功！"
                    });
                }
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
                this.loadData();
            }
        },
        components: {
            edit
        }
    }
</script>
