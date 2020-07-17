<template>
  <div class="page-form">
      <div id="goBack" @click="goBack">
        <el-page-header></el-page-header>
      </div>
      <br>
      <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="商品编码" prop="productCode">
              <el-input v-model="formData.productCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="商品名称" prop="productName">
              <el-input v-model="formData.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="商品类目" prop="categoryName">
              <el-input v-model="formData.categoryName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="品牌编码" prop="brandName">
              <el-input v-model="formData.brandName" disabled></el-input>
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
            <el-form-item label="规格" prop="specification">
              <el-input v-model="formData.specification"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="描述" prop="description">
              <el-input type="textarea"
                        :rows="3" v-model="formData.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <br>
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
            const productCode = (rule, value, callback) => {
                let reg = /^[0-9a-zA-Z]*$/g;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error("只能输入字母或数字！"));
                }
            };
            return {
                formData: {},
                propertyList: [],
                categoryList: [],
                brandList: [],
                rules: {
                    productCode: [
                        {required: true, message: "请输入商品编码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        },
                        {validator: productCode, trigger: 'blur'}
                    ],
                    productName: [
                        {required: true, message: "请输入商品名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到20 个字符"
                        }
                    ],
                    brandCode: [
                        {required: true, message: "请选择一个品牌", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到20 个字符"
                        }
                    ],
                    categoryCode: [
                        {required: true, message: "请选择商品类目", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到20 个字符"
                        }
                    ],
                    unit: [{required: true, message: "请输入计量单位", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到20 个字符"
                        }],
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
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    productPropertyItems: [],
                    productCode: "",
                    productName: "",
                    categoryCode: "",
                    categoryName: "",
                    unit: "",
                    brandCode: "",
                    brandName: "",
                    specification: "",
                    description: "",
                    skuName: "",
                    skuId: ""
                };
            },
            calcDescartes(array) {
                if (array.length < 2) return array[0] || [];
                return [].reduce.call(array, function (col, set) {
                    let res = [];
                    col.forEach(function (c) {
                        set.forEach(function (s) {
                            let t = [].concat(Array.isArray(c) ? c : [c]);
                            t.push(s);
                            res.push(t);
                        })
                    });
                    return res;
                });
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store
                            .dispatch("product/updateOne", {
                                productId: this.$route.query.productId,
                                data: this.formData
                            })
                            .then(() => {
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        this.goBack();
                    }
                });
            },
            handleCancel() {
                this.goBack();
            },
            handleGetOne(id) {
                this.$store
                    .dispatch("product/getOne", {productId: id})
                    .then(data => {
                        this.formData = data;
                        if (this.formData.skuId == null || this.formData.skuId == "") {
                            let param = {};
                            param.categoryCode = this.formData.categoryCode;
                        }
                    }).catch(error => {
                    console.log(error);
                });
            },
            //跳转回列表页面
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
                this.handleGetOne(this.$route.query.productId);
            } else {
                this.formData = this.defaultFormData();
            }
        }
    }
</script>
