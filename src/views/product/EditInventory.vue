<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose" :close-on-click-modal="false">
      <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
        <el-form-item label="编号：" prop="productCode">
          <el-input v-model="formData.productCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="productName">
          <el-input v-model="formData.productName" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品分类：" prop="categoryName">
          <el-input v-model="formData.categoryName" disabled></el-input>
        </el-form-item>
        <el-form-item label="品牌：" prop="brandName">
          <el-input v-model="formData.brandName" disabled></el-input>
        </el-form-item>
        <el-form-item label="数量：" prop="quantity">
          <el-input-number v-model="formData.quantity" placeholder="请输入数量.."></el-input-number>
        </el-form-item>
        <el-form-item label="库存下限：" prop="minStockQuantity">
          <el-input-number v-model="formData.minStockQuantity" placeholder="请输入数量.."></el-input-number>
        </el-form-item>
        <el-form-item label="库存上限：" prop="maxStockQuantity">
          <el-input-number v-model="formData.maxStockQuantity" placeholder="请输入数量.."></el-input-number>
        </el-form-item>
        <el-form-item label="成本：" prop="cost">
          <el-input v-model="formData.cost" placeholder="请输入数量.."></el-input>
        </el-form-item>
        <el-form-item label="零售价：" prop="price">
          <el-input v-model="formData.price" placeholder="请输入数量.."></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
       </span>

    </el-dialog>
  </div>
</template>
<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            inventoryId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                formData: this.defaultFormData(),
                dialogVisible: this.visible,
                //用于记录和查找所选中的商品类别
                rules: {
                    quantity: [
                        {required: true, message: "请输入数量", trigger: "blur"}
                    ],
                    maxStockQuantity: [
                        {required: true, message: "请输入库存上限", trigger: "blur"}

                    ],
                    minStockQuantity: [
                        {required: true, message: "请输入库存下限", trigger: "blur"},
                    ],
                    cost: [
                        {required: true, message: "请输入成本", trigger: "blur"},
                    ],
                    price: [
                        {required: true, message: "请输入零售价", trigger: "blur"},
                    ],
                }
            };
        },
        watch: {
            visible(val) {
                this.dialogVisible = val;
                if (this._.isEmpty(this.inventoryId)) {
                    this.clearForm();
                } else {
                    this.loadData();
                }
            }
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    inventoryId: '',
                    //品牌编码
                    brandCode: "",
                    //品牌名称
                    brandName: "",
                    //商品类目（编码）
                    categoryCode: "",
                    //商品类目名称）
                    categoryName: "",
                    //商品类目（树）
                    categoryPath: "",
                    //品牌logo
                    maxStockQuantity: '',
                    //品牌故事
                    minStockQuantity: '',
                    cost: '',
                    price: '',
                    quantity: '',
                    skuCode: '',
                    skuName: '',
                    skuId: '',
                    properties: {},
                    propertyItems: [],
                    //描述
                    description: ''
                };
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
            handleConfirm() {
                this.dialogVisible = false;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$emit("onSave", this.formData);
                    }
                })
            },
            loadData() {
                this.$store
                    .dispatch("productInventory/getOne", {inventoryId: this.inventoryId})
                    .then(data => {
                        this.formData = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            handleOpen() {
                this.$emit('update:visible', true);
            },
            handleClose() {
                this.$emit('update:visible', false);
            }
        },
        created() {
            // this.loadCategory();
        }
    };
</script>
<style>
  .el-dialog {
    width: 500px;
    min-width: 500px;
  }
</style>
