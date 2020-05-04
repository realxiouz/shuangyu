<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="商品类目">
            <el-input v-model="formData.categoryName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="商品编码" prop="productCode">
            <el-input v-model="formData.productCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="商品名称" prop="productName">
            <el-input v-model="formData.productName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="品牌编码" prop="brandCode">
            <el-select v-model="formData.brandCode" placeholder="品牌编码" @change="handleBrandName">
              <el-option v-for="(item,idx) in brandList"
                         :key="idx"
                         :label="item.brandName"
                         :value="item.brandCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="计量单位" prop="unit">
            <el-input v-model="formData.unit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="库存上限" prop="maxStockQuantity">
            <el-input-number v-model="formData.maxStockQuantity"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="库存下限" prop="minStockQuantity">
            <el-input-number v-model="formData.minStockQuantity"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="单价" prop="price">
            <el-input-number v-model="formData.price" :precision="2" :step="0.1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="成本" prop="cost">
            <el-input-number v-model="formData.cost" :precision="2" :step="0.1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="数量" prop="quantity">
            <el-input-number v-model="formData.quantity"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button size="mini" @click="handleCancel">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>

    export default {
        name: 'edit',
        data() {
            return {
                formData: {},
                brandList: [],
                categoryList: [],
                propertyList: [],
                rules: {
                    productCode: [
                        {required: true, message: "请输入商品编码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    productName: [
                        {required: true, message: "请输入商品名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    brandCode: [
                        {required: true, message: "请选择品牌", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    unit: [
                        {required: true, message: "请输入计量单位", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    maxStockQuantity: [
                        {required: true, message: "请输入库存上限", trigger: "blur"}
                    ],
                    minStockQuantity: [
                        {required: true, message: "请输入库存下限", trigger: "blur"}
                    ],
                    cost: [
                        {required: true, message: "请输入成本", trigger: "blur"}
                    ],
                    price: [
                        {required: true, message: "请输入单价", trigger: "blur"}
                    ],
                    quantity: [
                        {required: true, message: "请输入数量", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            loadBrand() {
                this.$store.dispatch("brand/getList", {filters: {}})
                    .then(data => {
                        this.brandList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store
                            .dispatch("productStockKeeping/save", this.formData)
                            .then(data => {
                                this.formData = data;
                            }).catch(error => {
                            console.log(error);
                        });
                    }
                });
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("productStockKeeping/getOne", {stockId: id})
                        .then(data => {
                            if (data) {
                                this.formData = data;
                                let param = {};
                                param.categoryCode = this.formData.categoryCode;
                                this.loadPropertyList(param);
                            }
                        }).catch(error => {
                        console.log(error);
                    });
                }
            },
            handleBrandName(id) {
                let object = {};
                object = this.brandList.find((item) => {
                    return item.brandCode === id;
                });
                this.formData.brandName = object.brandName;
            },
            //跳转回列表页面
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: '/home'});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            },
            handleCancel() {
                this.goBack();
            },
            loadPropertyList(searchForm) {
                this.$store
                    .dispatch("productProperty/getList", {
                        filter: searchForm
                    })
                    .then(data => {
                        if (data) {
                            this.propertyList = data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
        created() {
            if (this.$route.query.stockId) {
                this.handleGetOne(this.$route.query.stockId);
            }
            this.loadBrand();
        }
    }
</script>
