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
        :gutter="10"
        v-for="(item, index) in formData.productPropertyItems"
        :key="index"
      >
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item :label="item.name +'：'">
            <span>{{item.value}}</span>
            <!--            <span v-if="propertyList[index].valueType ==3">{{formatDate(item.value,'YYYY-MM-DD')}}</span>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="品牌编码：">
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
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="规格：">
            <span>{{formData.specification}}</span>
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
      <el-button size="mini" @click="onCancel">返 回</el-button>
    </div>
  </div>
</template>
<script>
    import {MIXIN_EDIT} from "@/utils/mixin";
    export default {
      mixins: [MIXIN_EDIT],
        name: "edit",
        data() {
            return {
                formData: {
                    productPropertyItems: []
                },
                propertyList: [],
                actions: {
                  getOne: 'productInventory/getOne',
                  saveOne: 'productInventory/saveOne'
                }
            };
        },
        methods: {
            //跳转回列表页面
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: "/home"});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            },
            onCancel() {
                this.goBack();
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
        }
    };
</script>
