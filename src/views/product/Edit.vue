<template>
  <div>
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
      <el-row :gutter="10" v-for="(item, index) in formData.properties" :key="index">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item :label="item.label">
            <!-- 数据类型（0文本，1开关，2数字，3日期，4日期时间，5时间，6评分，7单选，8多选，9选择器）-->
            <el-input v-if="propertyList[index].valueType ==0"
                      v-model="item.value"
            ></el-input>
            <!-- 开关-->
            <el-switch v-if="propertyList[index].valueType ==1"
                       v-model="item.value">
            </el-switch>
            <!-- 数字-->
            <el-input-number v-if="propertyList[index].valueType ==2"
                             v-model="item.value" :precision="propertyList[index].precision"></el-input-number>
            <!-- 日期-->
            <el-date-picker
              v-if="propertyList[index].valueType ==3"
              v-model="item.value"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <!-- 日期时间-->
            <el-date-picker
              v-if="propertyList[index].valueType ==4"
              v-model="item.value"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <!-- 时间-->
            <el-time-picker
              v-if="propertyList[index].valueType ==5"
              arrow-control
              v-model="item.value"
              :picker-options="{
      selectableRange: '00:00:00 - 23:59:00'
    }"
            >
            </el-time-picker>
            <!-- 评分-->
            <el-rate
              v-if="propertyList[index].valueType ==6"
              v-model="item.value"></el-rate>
            <!-- 单选-->
            <el-radio-group
              v-if="propertyList[index].valueType ==7"
              v-model="item.value">
              <el-radio v-for="item1 in propertyList[index].values" :key="item1.code"
                        :label="item1.value">{{item1.value}}
              </el-radio>

            </el-radio-group>
            <!-- 多选 非销售属性-->
            <el-checkbox-group
              v-if="propertyList[index].valueType ==8 && !propertyList[index].sku"
              v-model="item.value">
              <el-checkbox v-for="item2 in propertyList[index].values" :key="item2.code"
                           :label="item2.value">{{item2.value}}
              </el-checkbox>
            </el-checkbox-group>
            <!--选择器-->
            <el-select
              v-model="item.value"
              v-if="propertyList[index].valueType ==9">
              <el-option v-for="item3 in propertyList[index].values"
                         :key="item3.code"
                         :label="item3.value"
                         :value="item3.value">
              </el-option>
            </el-select>
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
      <el-row :gutter="10" v-if="formData.skuName">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="SKU名称" prop="skuName">
            <el-input v-model="formData.skuName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="计量单位" prop="unit">
            <el-input v-model="formData.unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="最小订单量" prop="miniOrderQuantity">
            <el-input-number v-model="formData.miniOrderQuantity"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="规格" prop="specification">
            <el-input v-model="formData.specification"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="税率" prop="taxRate">
            <el-input v-model="formData.taxRate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="毛利率" prop="grossMargin">
            <el-input v-model="formData.grossMargin"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="供应商名称" prop="supplierName">
            <el-input v-model="formData.supplierName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="不可销售" prop="notSaleable">
            <el-switch v-model="formData.notSaleable" :active-value=true :inactive-value=false></el-switch>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="不可采购" prop="notBuyable">
            <el-switch v-model="formData.notBuyable" :active-value=true :inactive-value=false></el-switch>
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
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="描述" prop="description">
            <el-input type="textarea"
                      :rows="3" v-model="formData.description"></el-input>
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
            const productCode = (rule, value, callback) => {
                let reg = /^[0-9a-zA-Z]*$/g;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error("只能输入字母或数字！"));
                }
            };
            return {
                formData: {
                    properties: []
                },
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
                    properties: [],
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
                            .dispatch("product/update", this.formData)
                            .then(() => {
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        this.$message({
                            type: "success",
                            message: "更新成功！"
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
                            this.loadPropertyList(param);
                        }
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadPropertyList(searchForm) {
                this.$store
                    .dispatch("productProperty/getList", {
                        filter: searchForm
                    })
                    .then(data => {
                        if (data) {
                            this.propertyList = data;
                            let properties = this.formData.properties;
                            this.formData.properties = [];
                            for (let i = 0, len = data.length; i < len; i++) {
                                if (data[i].sku) {
                                    continue;
                                }
                                if (data[i].valueType > 6) {
                                    this.formData.properties.push({
                                        label: data[i].propertyLabel,
                                        code: data[i].propertyCode,
                                        value: this.getValue(data[i].propertyCode, properties, [])
                                    });
                                } else {
                                    this.formData.properties.push({
                                        label: data[i].propertyLabel,
                                        code: data[i].propertyCode,
                                        value: this.getValue(data[i].propertyCode, properties, '')
                                    });
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getValue(code, properties, defaultValue) {
                for (let i = 0, len = properties.length; i < len; i++) {
                    if (properties[i].code == code) {
                        return properties[i].value;
                    }
                }
                return defaultValue;
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
