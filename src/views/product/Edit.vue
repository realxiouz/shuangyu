<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
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
          <el-form-item label="商品类目">
            <el-cascader
              v-model="formData.categoryCode"
              style="width: 100%;"
              :options="categoryList"
              :props="{ label: 'categoryName', value: 'categoryCode' }"
              filterable
              @change="handleCategory"
            >
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-for="(item, index) in formData.properties" :key="index">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item :label="item.label">
            <!--非枚举-->
            <el-input v-if="!propertyData[index].enumProperty"
                      v-model="item.value"
            ></el-input>
            <!-- 枚举单选-->
            <el-select
              v-model="item.value"
              v-if="propertyData[index].enumProperty && !propertyData[index].multiple && !propertyData[index].sellProperty">
              <el-option v-for="item1 in propertyData[index].values"
                         :key="item1.code"
                         :label="item1.value"
                         :value="item1.value">
              </el-option>
            </el-select>
            <!-- 枚举多选-->
            <el-checkbox-group
              v-if="propertyData[index].enumProperty && propertyData[index].multiple && !propertyData[index].sellProperty"
              v-model="item.value">
              <el-checkbox v-for="item2 in propertyData[index].values" :key="item2.code"
                           :label="item2.value">{{item2.value}}
              </el-checkbox>
            </el-checkbox-group>
            <!-- 销售属性-->
            <el-checkbox-group
              v-if="propertyData[index].enumProperty && !propertyData[index].multiple && propertyData[index].sellProperty"
              v-model="item.value">
              <el-checkbox v-for="item3 in propertyData[index].values" :key="item3.code"
                           :label="item3.value" @change="(value)=>handleSku(value,item,item3)">{{item3.value}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="品牌编码" prop="brandCode">
            <el-select v-model="formData.brandCode" placeholder="品牌编码">
              <el-option v-for="(item,idx) in brandList"
                         :key="idx"
                         :label="item.brandName"
                         :value="item.brandCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
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
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="税率" prop="taxRate">
            <el-input v-model="formData.taxRate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="最小订单量" prop="miniOrderQuantity">
            <el-input v-model="formData.miniOrderQuantity"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="库存下限" prop="minStockQuantity">
            <el-input v-model="formData.minStockQuantity"></el-input>
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
            return {
                formData: {
                    properties: []
                },
                propertyData: [],
                categoryList: [],
                brandList: [],
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
                    ]
                }
            }
        },
        methods: {
            handleSku(value, item, item3) {
                console.log(value);
                console.log(item);
                console.log(item3);
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store
                            .dispatch("product/save", this.formData)
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
            handleGetOne(id) {
                this.$store
                    .dispatch("product/getOne", {productId: id})
                    .then(data => {
                        this.formData = data;
                        let param = {};
                        param.categoryCode = this.formData.categoryCode;
                        this.loadPropertyData(param);
                        this.dialogVisible = true;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadPropertyData(searchForm) {
                this.$store
                    .dispatch("productProperty/getList", {
                        filter: searchForm
                    })
                    .then(data => {
                        if (data) {
                            this.propertyData = data;
                            let properties = this.formData.properties;
                            this.formData.properties = [];
                            for (let i = 0, len = data.length; i < len; i++) {
                                if (data[i].enumProperty && (data[i].multiple || data[i].sellProperty)) {
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
            loadBrand() {
                this.$store.dispatch("brand/getList", {filters: {}})
                    .then(data => {
                        this.brandList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadTreeData() {
                this.$store
                    .dispatch("category/getTreeList", {filter: {categoryType: 9}})
                    .then(data => {
                        if (data) {
                            this.categoryList = this.getTreeData(data.data);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            getTreeData(data) {
                // 循环遍历json数据
                for (let i = 0, len = data.length; i < len; i++) {
                    if (data[i].children.length < 1) {
                        // children若为空数组，则将children设为undefined
                        data[i].children = undefined;
                    } else {
                        // children若不为空数组，则继续 递归调用 本方法
                        this.getTreeData(data[i].children);
                    }
                }
                return data;
            },
            handleCategory(category) {
                if (category) {
                    let code = category[category.length - 1];
                    this.formData.categoryCode = code;
                    let param = {};
                    param.categoryCode = code;
                    this.loadPropertyData(param);
                }
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
            }
            this.loadTreeData();
            this.loadBrand();
        }
    }
</script>
