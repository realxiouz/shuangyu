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
        <el-form-item :v-if=" formData.propertyItems.length >0 "
                      v-for="(item, index) in formData.propertyItems" :key="index"
                      :label="item.name">
          <!-- 多选 销售属性-->
          <el-checkbox-group
            v-if="propertyList[index].valueType ==8 && propertyList[index].sku"
            v-model="item.value">
            <el-checkbox v-for="item4 in propertyList[index].attributes" :key="item4.code"
                         :label="item4.code+','+item4.name" @change="handleSku">{{item4.name}}
            </el-checkbox>
          </el-checkbox-group>
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
                propertyList: [],
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
                        if (data) {
                            this.formData = data;
                            if (this.formData.categoryCode) {
                                let param = {};
                                param.categoryCode = this.formData.categoryCode;
                                this.loadPropertyList(param);
                            }
                        }
                    }).catch(error => {
                    console.log(error);
                });
            },
            handleOpen() {
                this.$emit('update:visible', true);
            },
            handleClose() {
                this.$emit('update:visible', false);
            },
            loadPropertyList(searchForm) {
                this.$store
                    .dispatch("productProperty/getList", {
                        filter: searchForm
                    })
                    .then(data => {
                        if (data) {
                            this.propertyList = data;
                            this.formData.propertyItems = [];
                            for (let i = 0, len = data.length; i < len; i++) {
                                if (data[i].valueType === 61) {
                                    this.formData.propertyItems.push({
                                        name: data[i].name,
                                        code: data[i].code,
                                        sku: data[i].sku,
                                        value: []
                                    });
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleSku() {
                let array = [];
                for (let i = 0, len = this.formData.propertyItems.length; i < len; i++) {
                    if (this.formData.propertyItems[i].sku) {
                        let value = this.formData.propertyItems[i].value;
                        if (value.length > 0) {
                            array.push(value);
                        }
                    }
                }
                this.dataList = [];
                if (array.length > 0) {
                    let skuIds = this.calcDescartes(array);
                    for (let i = 0; i < skuIds.length; i++) {
                        let row = {};
                        row.productCode = this.formData.productCode;
                        row.productName = this.formData.productName;
                        row.categoryName = this.formData.categoryName;
                        row.brandName = this.formData.brandName;
                        row.unit = this.formData.unit;
                        if (Array.isArray(skuIds[i])) {
                            let codes = [];
                            let names = [];
                            for (let j = 0; j < skuIds[i].length; j++) {
                                let item1 = skuIds[i][j].split(",");
                                codes.push(item1[0]);
                                names.push(item1[1]);
                            }
                            row.skuCode = codes;
                            row.skuName = names.join(" ");
                            row.skuId = codes.join(",");
                        } else {
                            let codes = [];
                            let item2 = skuIds[i].split(",");
                            row.skuName = item2[1];
                            row.skuId = item2[0];
                            codes.push(item2[0]);
                            row.skuCode = codes;
                        }
                        this.dataList.push(row)
                    }
                } else {
                    this.dataList.push(this.formData);
                }
            },
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
