<template>
  <div class="contentBox">
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="商品编码：">
            <span>{{formData.productCode}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="商品名称：">
            <span>{{formData.productName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="商品类目：">
            <span>{{formData.categoryName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="propertyList.length > 0"
        :gutter="10"
        v-for="(item, index) in formData.productPropertyItems"
        :key="index"
      >
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item :label="item.label +'：'">
            <span v-if="propertyList[index].valueType !=3">{{item.value}}</span>
            <!--            <span v-if="propertyList[index].valueType ==3">{{formatDate(item.value,'YYYY-MM-DD')}}</span>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="品牌编码">
            <span>{{formData.brandName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="计量单位：">
            <span>{{formData.unit}}</span>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="最小订单量：">
            <span>{{formData.miniOrderQuantity}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="规格：">
            <span>{{formData.specification}}</span>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="税率：">
            <span>{{formData.taxRate}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="毛利率：">
            <span>{{formData.grossMargin}}</span>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="供应商名称：">
            <span>{{formData.supplierName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="不可销售：">
            <el-switch v-model="formData.notSaleable" :active-value="true" :inactive-value="false" disabled></el-switch>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="不可采购：">
            <el-switch v-model="formData.notBuyable" :active-value="true" :inactive-value="false" disabled></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="库存上限：">
            <span>{{formData.maxStockQuantity}}</span>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="库存下限：">
            <span>{{formData.minStockQuantity}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="单价：">
            <span>{{formData.price}}</span>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="成本：">
            <span>{{formData.cost}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="数量：" prop="quantity">
            <span>{{formData.quantity}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="描述：">
            <span>{{formData.description}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button size="mini" @click="handleCancel">返 回</el-button>
    </div>
  </div>
</template>
<script>
    export default {
        name: "edit",
        data() {
            return {
                formData: {
                    productPropertyItems: []
                },
                propertyList: [],
            };
        },
        methods: {
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("productInventory/getOne", {inventoryId: id})
                        .then(data => {
                            if (data) {
                                this.formData = data;
                                let param = {};
                                param.categoryCode = this.formData.categoryCode;
                                this.loadPropertyList(param);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            //跳转回列表页面
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: "/home"});
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
                            if (this.propertyList.length > 0) {
                                for (let i = 0, len = this.propertyList.length; i < len; i++) {
                                    if (this.propertyList[i].valueType > 6) {
                                        this.propertyList[i].values = this.getValueArray(
                                            this.propertyList[i].values
                                        );
                                    }
                                }
                                let properties = this.formData.productPropertyItems;
                                this.formData.productPropertyItems = [];
                                for (let i = 0, len = data.length; i < len; i++) {
                                    this.formData.productPropertyItems.push({
                                        label: data[i].propertyLabel,
                                        code: data[i].propertyCode,
                                        sku: data[i].sku,
                                        value: this.getValue(data[i].propertyCode, properties, "")
                                    });
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getValueArray(values) {
                let array = [];
                for (let key in values) {
                    let data = {};
                    data.code = key;
                    data.value = values[key];
                    array.push(data);
                }
                return array;
            },
            getValue(code, properties, defaultValue) {
                for (let i = 0, len = properties.length; i < len; i++) {
                    if (properties[i].code == code) {
                        return properties[i].value;
                    }
                }
                return defaultValue;
            },
            // 格式化日期
            initDate(dateStr, format) {
                if (dateStr > 0) {
                    let date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return "";
                }
            }
        },
        computed: {
            formatDate() {
                return function (dateStr, format) {
                    return this.initDate(dateStr, format);
                };
            }
        },
        created() {
            if (this.$route.query.inventoryId) {
                this.handleGetOne(this.$route.query.inventoryId);
            }
            this.loadBrand();
        }
    };
</script>
