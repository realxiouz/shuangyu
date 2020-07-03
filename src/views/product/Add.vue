<template>
  <div class="bigBox">
    <div class="contentBox">
      <div id="goBack" @click="goBack">
        <el-page-header></el-page-header>
      </div>
      <br />
      <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="商品编码" prop="productCode">
              <el-input v-model="formData.productCode" @change="handleUpdate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="商品名称" prop="productName">
              <el-input v-model="formData.productName" @change="handleUpdate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="商品类目" prop="categoryCode">
              <el-cascader
                ref="categoryCascader"
                v-model="formData.categoryCode"
                style="width: 100%;"
                :options="categoryList"
                :props="{ label: 'categoryName', value: 'categoryCode' }"
                filterable
                @change="handleCategory"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="6"
            :xl="6"
            v-for="(item, index) in formData.productPropertyItems"
            :key="index"
          >
            <!-- 'domains.' + index + '.value' -->
            <el-form-item
              :label="item.name"
              :rules="makeRules(propertyList[index])"
              :prop="`productPropertyItems.${index}._${item.type}`"
            >
              <el-input
                v-if="propertyList[index].valueType ==0"
                v-model="item[`_${item.type}`]"
                :type="propertyList[index].inputType"
              ></el-input>
              <!-- 开关-->
              <el-switch v-if="propertyList[index].valueType ==1" v-model="item[`_${item.type}`]"></el-switch>
              <!-- 数字-->
              <el-input-number
                v-if="propertyList[index].valueType ==2"
                v-model="item[`_${item.type}`]"
                :precision="propertyList[index].precision"
              ></el-input-number>
              <!-- 日期-->
              <el-date-picker
                v-if="propertyList[index].valueType ==3"
                v-model="item[`_${item.type}`]"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
              <!-- 日期时间-->
              <!-- <el-date-picker
                v-if="propertyList[index].valueType ==4"
                v-model="item[`_${item.type}`]"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker> -->
              <!-- 时间-->
              <el-time-picker
                v-if="propertyList[index].valueType ==4"
                arrow-control
                v-model="item[`_${item.type}`]"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:00'
                }"
              ></el-time-picker>
              <!-- 评分-->
              <el-rate v-if="propertyList[index].valueType ==5" v-model="item[`_${item.type}`]"></el-rate>
              <!-- 单选-->
              <el-radio-group v-if="propertyList[index].valueType ==60" v-model="item[`_${item.type}`]">
                <el-radio
                  v-for="item1 in propertyList[index].attributes"
                  :key="item1.code"
                  :label="item1.name"
                >{{item1.name}}</el-radio>
              </el-radio-group>
              <!-- 多选 非销售属性-->
              <el-checkbox-group
                v-if="propertyList[index].valueType ==61 && !propertyList[index].sku"
                v-model="item[`_${item.type}`]"
              >
                <el-checkbox
                  v-for="item2 in propertyList[index].attributes"
                  :key="item2.code"
                  :label="item2.name"
                >{{item2.name}}</el-checkbox>
              </el-checkbox-group>
              <!--选择器-->
              <el-select v-model="item[`_${item.type}`]" v-if="propertyList[index].valueType ==62" :multiple="propertyList[index].multiple">
                <el-option
                  v-for="(i, inx) in propertyList[index].attributes"
                  :key="inx"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
              <!-- 多选 销售属性-->
              <el-checkbox-group
                v-if="propertyList[index].valueType ==61 && propertyList[index].sku"
                v-model="item[`_${item.type}`]"
              >
                <el-checkbox
                  v-for="item4 in propertyList[index].attributes"
                  :key="item4.code"
                  :label="item4.code+','+item4.name"
                  @change="handleSku"
                >{{item4.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="品牌编码" prop="brandCode">
              <el-select v-model="formData.brandCode" placeholder="品牌编码" @change="handleBrandName">
                <el-option
                  v-for="(item,idx) in brandList"
                  :key="idx"
                  :label="item.brandName"
                  :value="item.brandCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="计量单位" prop="unit">
              <el-input v-model="formData.unit" @change="handleUpdate"></el-input>
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
              <el-input type="textarea" :rows="3" v-model="formData.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column align="center" prop="productCode" label="编号" width="180"></el-table-column>
        <el-table-column align="center" prop="productName" label="名称" width="200"></el-table-column>
        <el-table-column align="center" prop="categoryName" label="商品分类" width="180"></el-table-column>
        <el-table-column align="center" prop="brandName" label="品牌" width="180"></el-table-column>
        <el-table-column align="center" prop="skuName" label="属性名称" width="180"></el-table-column>
        <el-table-column align="center" prop="quantity" label="数量" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.quantity"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="maxStockQuantity" label="库存上限" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.maxStockQuantity"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="minStockQuantity" label="库存下限" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.minStockQuantity"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="unit" label="计量单位" width="180"></el-table-column>
        <el-table-column align="center" prop="cost" label="成本" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.cost" :precision="2" :step="0.1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="price" label="零售价" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.price" :precision="2" :step="0.1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="skuId" label="SKU_ID" width="180"></el-table-column>
      </el-table>
      <br />
      <div slot="footer" style="text-align:center;">
        <el-button size="mini" @click="handleCancel">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "add",
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
        productPropertyItems: [],
        properties: {}
      },
      propertyList: [],
      categoryList: [],
      brandList: [],
      dataList: [],
      rules: {
        productCode: [
          { required: true, message: "请输入商品编码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          },
          { validator: productCode, trigger: "blur" }
        ],
        productName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到20 个字符"
          }
        ],
        brandCode: [
          { required: true, message: "请选择一个品牌", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到20 个字符"
          }
        ],
        categoryCode: [
          { required: true, message: "请选择商品类目", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到20 个字符"
          }
        ],
        unit: [
          { required: true, message: "请输入计量单位", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到20 个字符"
          }
        ]
      },


      productForm: {
        brandCode: '',
        brandId: '',
        brandName: '',
        categoryCode: '',
        categoryName: '',
        categoryPath: '',
        description: '',
        productCode: '',
        productId: '',
        productName: '',
        propertyItems: [],
        remark: '',
        sort: '',
        specification: '',
        unit: '',
        
      }
    };
  },
  methods: {
    /*表单默认加载数据*/
    defaultFormData() {
      return {
        productPropertyItems: [],
        properties: {},
        productCode: "",
        productName: "",
        categoryCode: "",
        categoryName: "",
        unit: "",
        brandCode: "",
        brandName: "",
        specification: "",
        description: "",
        skuName: [],
        skuCode: [],
        skuId: ""
      };
    },
    handleBrandName(id) {
      let object = {};
      object = this.brandList.find(item => {
        return item.brandCode === id;
      });
      this.formData.brandName = object.brandName;
      this.handleUpdate();
    },
    handleUpdate() {
      for (let i = 0, len = this.dataList.length; i < len; i++) {
        this.dataList[i].productCode = this.formData.productCode;
        this.dataList[i].productName = this.formData.productName;
        this.dataList[i].categoryName = this.formData.categoryName;
        this.dataList[i].brandName = this.formData.brandName;
        this.dataList[i].unit = this.formData.unit;
      }
    },
    handleSku() {
      let array = [];
      for (
        let i = 0, len = this.formData.productPropertyItems.length;
        i < len;
        i++
      ) {
        if (this.formData.productPropertyItems[i].sku) {
          let value = this.formData.productPropertyItems[i].value;
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
          this.dataList.push(row);
        }
      } else {
        this.dataList.push(this.formData);
      }
    },
    calcDescartes(array) {
      if (array.length < 2) return array[0] || [];
      return [].reduce.call(array, function(col, set) {
        let res = [];
        col.forEach(function(c) {
          set.forEach(function(s) {
            let t = [].concat(Array.isArray(c) ? c : [c]);
            t.push(s);
            res.push(t);
          });
        });
        return res;
      });
    },
    handleSaveData() {
      for (let i = 0, len = this.dataList.length; i < len; i++) {
        this.dataList[i].productCode = this.formData.productCode;
        this.dataList[i].productName = this.formData.productName;
        this.dataList[i].categoryCode = this.formData.categoryCode;
        this.dataList[i].categoryName = this.formData.categoryName;
        this.dataList[i].brandCode = this.formData.brandCode;
        this.dataList[i].brandName = this.formData.brandName;
        this.dataList[i].unit = this.formData.unit;
        this.dataList[i].specification = this.formData.specification;
        this.dataList[i].description = this.formData.description;
        this.dataList[i].notSaleable = this.formData.notSaleable;
        this.dataList[i].notBuyable = this.formData.notBuyable;
        this.dataList[i].taxRate = this.formData.taxRate;
        this.dataList[i].grossMargin = this.formData.grossMargin;
        this.dataList[i].supplierId = this.formData.supplierId;
        this.dataList[i].supplierName = this.formData.supplierName;
        if (
          this.dataList[i].skuName.length > 0 ||
          this.dataList[i].skuId.length > 0
        ) {
          let skuNames = this.dataList[i].skuName.split(" ");
          const properties = {};
          const productPropertyItems = [];
          for (
            let i = 0, len = this.formData.productPropertyItems.length;
            i < len;
            i++
          ) {
            let propertyItems = {};
            propertyItems.code = this.formData.productPropertyItems[i].code;
            propertyItems.name = this.formData.productPropertyItems[i].label;
            propertyItems.sku = this.formData.productPropertyItems[i].sku;
            //sku
            if (this.formData.productPropertyItems[i].sku) {
              if (this.formData.productPropertyItems[i].value.length > 0) {
                let map = this.formData.productPropertyItems[i].value;
                for (let key in map) {
                  for (let j = 0, len = skuNames.length; j < len; j++) {
                    let array = map[key].split(",");
                    if (array[1] == skuNames[j]) {
                      properties[this.formData.productPropertyItems[i].code] =
                        skuNames[j];
                      propertyItems.value = skuNames[j];
                    }
                  }
                }
              }
            } else {
              //非sku
              properties[
                this.formData.productPropertyItems[i].code
              ] = this.formData.productPropertyItems[i].value;
              propertyItems.value = this.formData.productPropertyItems[i].value;
            }
            productPropertyItems.push(propertyItems);
          }

          this.dataList[i].propertyItems = productPropertyItems;
          this.dataList[i].skuName = skuNames;
          this.dataList[i].properties = properties;
        } else {
          //非sku
          if (this.formData.productPropertyItems.length > 0) {
            const properties = {};
            for (
              let i = 0, len = this.formData.productPropertyItems.length;
              i < len;
              i++
            ) {
              properties[
                this.formData.productPropertyItems[i].code
              ] = this.formData.productPropertyItems[i].value;
            }
            this.dataList[i].properties = properties;
          }
        }
      }
      if (this.formData.productPropertyItems.length > 0) {
        const properties = {};
        const productPropertyItems = [];
        for (
          let i = 0, len = this.formData.productPropertyItems.length;
          i < len;
          i++
        ) {
          let propertyItems = {};
          propertyItems.code = this.formData.productPropertyItems[i].code;
          propertyItems.name = this.formData.productPropertyItems[i].label;
          propertyItems.sku = this.formData.productPropertyItems[i].sku;
          if (this.formData.productPropertyItems[i].sku) {
            let valueArray = this.formData.productPropertyItems[i].value;
            let values = {};
            for (let i = 0, len = valueArray.length; i < len; i++) {
              let item2 = valueArray[i].split(",");
              values[item2[0]] = item2[1];
            }
            properties[this.formData.productPropertyItems[i].code] = values;
            propertyItems.value = values;
          } else {
            properties[
              this.formData.productPropertyItems[i].code
            ] = this.formData.productPropertyItems[i].value;
            propertyItems.value = this.formData.productPropertyItems[i].value;
          }
          productPropertyItems.push(propertyItems);
        }
        this.formData.properties = properties;
        this.formData.propertyItems = productPropertyItems;
      }
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.handleSaveData();
          this.$store
            .dispatch("product/save", {
              skuList: this.dataList,
              product: this.formData
            })
            .then(() => {})
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
        .dispatch("product/getOne", { productId: id })
        .then(data => {
          this.formData = data;
          let param = {};
          param.categoryCode = this.formData.categoryCode;
          this.loadPropertyList(param);
        })
        .catch(error => {
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
            
            this.formData.productPropertyItems = [];
            for (let i = 0, len = data.length; i < len; i++) {
              this.formData.productPropertyItems.push(this.makePropertyItem(data[i]))
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getValue(values) {
      let array = [];
      for (let key in values) {
        array.push(values[key]);
      }
      return array;
    },
    loadBrand() {
      this.$store
        .dispatch("brand/getList", { filters: {} })
        .then(data => {
          this.brandList = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadTreeData() {
      this.$store
        .dispatch("firmCategory/getTreeList", {
          filter: { categoryType: "PRODUCT" }
        })
        .then(data => {
          if (data) {
            this.categoryList = this.getTreeData(data);
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
      let labelValue = this.$refs.categoryCascader.getCheckedNodes()[0]
        .pathLabels;
      if (labelValue.length > 0) {
        this.formData.categoryName = labelValue[0];
      }
      this.handleUpdate();
      if (category) {
        let code = category[category.length - 1];
        this.formData.categoryCode = code;
        let param = {};
        param.categoryCode = code;
        this.loadPropertyList(param);
      }
    },
    //跳转回列表页面
    goBack() {
      if (this.$router.history.length <= 1) {
        this.$router.push({ path: "/home" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },

    makeRules(i) {
      if (!i.required) {
        return []
      } else {
        return [
          { required: true, message: `必须填写${i.name}字段`, trigger: "blur" }
        ]
      }
    },
    makePropertyItem(i) {
      let {code, hidden, name, sku, type, } = i
      let obj = {code, hidden, name, sku, type}
      obj[`_${type}`] = this.makeDefaultValByType(type)
      console.log(obj)
      return obj
    },
    makeDefaultValByType(type) {
      let d
      switch(type){
        case 'string':
          d = null
          break
        case 'bool':
          d = false
          break
        case 'int':
        case 'byte':
        case 'short':
        case 'long':
          d = 0
          break
        case 'date':
          d = null
          break
        case 'float':
        case 'double':
          d = 0.0
          break
        case 'array':
          d = []
          break
      }
      return d
    }
  },
  created() {
    if (this.$route.query.productId) {
      this.handleGetOne(this.$route.query.productId);
    } else {
      this.formData = this.defaultFormData();
      this.dataList.push(this.defaultFormData());
    }
    this.loadTreeData();
    this.loadBrand();
  }
};
</script>
