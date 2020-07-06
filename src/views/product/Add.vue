<template>
  <div class="bigBox">
    <div class="contentBox">
      <div id="goBack" @click="goBack">
        <el-page-header></el-page-header>
      </div>
      <br/>
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
            v-for="(item, index) in formData.propertyList"
            :key="index">
            <el-form-item
              :prop="'propertyList.' + index + '.value'"
              :label="item.name"
              :rules="[{ required: true, message: '请输入'+item.name, trigger: 'blur' }]">
              <el-input
                v-if="item.valueType ==0"
                v-model="item.value"
                :type="item.inputType"
                :maxlength="item.length">
              </el-input>
              <!-- 开关-->
              <el-switch v-if="item.valueType ==1" v-model="item.value"></el-switch>
              <!-- 数字-->
              <el-input-number
                v-if="item.valueType ==2"
                v-model="item.value"
                :min="item.min"
                :max="item.max"
                :step="item.step"
                :precision="item.precision"></el-input-number>
              <!-- 日期-->
              <el-date-picker
                v-if="item.valueType ==3"
                v-model="item.value"
                :type="item.inputType"
                :format="item.format"
                placeholder="选择日期"></el-date-picker>
              <!-- 时间-->
              <el-time-picker
                v-if="item.valueType ==4"
                arrow-control
                v-model="item.value"
                :picker-options="{selectableRange: '00:00:00 - 23:59:00' }">
              </el-time-picker>
              <!-- 评分-->
              <el-rate v-if="item.valueType ==5" v-model="item.value"></el-rate>
              <!-- 单选-->
              <el-radio-group v-if="item.valueType ==60" v-model="item.value">
                <el-radio
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name">{{attr.name}}
                </el-radio>
              </el-radio-group>
              <!-- 多选 非销售属性-->
              <el-checkbox-group
                v-if="item.valueType ==61 && !item.sku" v-model="item.value">
                <el-checkbox
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name">{{attr.name}}
                </el-checkbox>
              </el-checkbox-group>
              <!--选择器-->
              <el-select v-model="item.value" v-if="item.valueType ==62" :multiple="item.multiple">
                <el-option
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name"
                  :value="attr.code">
                </el-option>
              </el-select>
              <!-- 多选 非销售属性-->
              <el-checkbox-group
                v-if="item.valueType ==61 && !item.sku"
                v-model="item.value">
                <el-checkbox
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.code">{{attr.name}}
                </el-checkbox>
              </el-checkbox-group>
              <!-- 多选 销售属性-->
              <el-checkbox-group
                v-if="item.valueType ==61 && item.sku"
                v-model="item.value"
                @change="handleSku(index)">
                <el-checkbox
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.code">{{attr.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="品牌编码" prop="brandCode">
              <el-select v-model="formData.brandCode" placeholder="品牌编码" @change="handleBrandName">
                <el-option
                  v-for="(item,index) in brandList"
                  :key="index"
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
              <el-input type="textarea" :rows="3" v-model="formData.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column v-for="(item, index) in tableColumns" :key="index" align="center" :prop="item.code"
                         :label="item.name" width="180"></el-table-column>
        <el-table-column align="center" prop="quantity" label="数量" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.quantity"></el-input-number>
          </template>
        </el-table-column>
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
      <br/>
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
        formData: this.defaultFormData(),
        categoryList: [],
        brandList: [],
        dataList: [],
        tableColumns: [],
        rules: {
          productCode: [
            {required: true, message: "请输入商品编码", trigger: "blur"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: productCode, trigger: "blur"}
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
          unit: [
            {required: true, message: "请输入计量单位", trigger: "blur"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到20 个字符"
            }
          ]
        }
      };
    },
    methods: {
      /*表单默认加载数据*/
      defaultFormData() {
        return {
          propertyList: [],
          propertyItems: [],
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
        let object = this.brandList.find(item => {
          return item.brandCode === id;
        });
        this.formData.brandName = object.brandName;
      },
      handleSku(index) {
        this.formData.propertyList[index].skuItems = this.getPropertySkuItems(this.formData.propertyList[index]);
        console.log(this.formData.propertyList[index].skuItems);
        let array = [];
        let columns = [];
        for (let i = 0, len = this.formData.propertyList.length; i < len; i++) {
          let property = this.formData.propertyList[i];
          if (property.sku) {
            let skuItems = property.skuItems;
            if (skuItems.length > 0) {
              array.push(skuItems);
              const {code, name} = property;
              let column = {code, name};
              columns.push(column)
            }
          }
        }
        this.tableColumns = columns;
        console.log(columns);
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
              let items = [];
              let codes = [];
              let names = [];
              for (let j = 0; j < skuIds[i].length; j++) {
                let item1 = skuIds[i][j];
                codes.push(item1.vcode);
                names.push(item1.vname);
                let property = this.formData.propertyList.find(p => {
                  return p.code == item1.code;
                });
                let _property = Object.assign({}, property);
                _property.type = "String";
                _property.value = item1.vname;
                items.push(this.getPropertyItem(_property));
                row[item1.code] = item1.vname;
              }
              row.propertyItems = items;
              row.skuCode = codes;
              row.skuName = names.join(" ");
              row.skuId = codes.join("-");
            } else {
              let codes = [];
              let item2 = skuIds[i];
              row.skuName = item2.vname;
              row.skuId = item2.vcode;
              codes.push(item2.vcode);
              row.skuCode = codes;
            }
            this.dataList.push(row);
          }
        }
        console.log(this.dataList);
      },
      getPropertySkuItems(property) {
        let items = [];
        property.value.forEach(code => {
          let value = property.attributes.find(attr => {
            return attr.code === code;
          });
          items.push({code: property.code, vcode: value.code, vname: value.name});
        });
        return items;
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
            });
          });
          return res;
        });
      },
      getPropertyItems(excludeSku) {
        let items = [];
        for (let i = 0; i < this.formData.propertyList.length; i++) {
          let property = this.formData.propertyList[i];
          let item = this.getPropertyItem(property);
          if (property.sku === excludeSku) {
            continue;
          }
          items.push(item)
        }
      },
      getPropertyItem(property) {
        const {code, name, type, value, sku} = property;
        let item = {code, name, type, sku, _string: value};
        switch (property.type) {
          case "Date":
            item._string = this.$moment(property.value).format(property.format);
            item._date = this.$moment(property.value).toDate();
            item._long = this.$moment(property.value).valueOf();
            break;
          case "ArrayList":
            item._array = property.value;
            break;
          case "Boolean":
            item._bool = property.value;
            break;
          case "Byte":
            item._byte = property.value;
            break;
          case "Short":
            item._short = property.value;
            break;
          case "Integer":
            item._int = property.value;
            break;
          case "Long":
            item._long = property.value;
            break;
          case "Float":
            item._float = property.value;
            break;
          case "Double":
            item._double = property.value;
            break;
        }
        return item;
      },
      handleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.formData.propertyItems = this.getPropertyItems();
            this.$store
              .dispatch("product/save", {
                skuList: this.dataList,
                product: this.formData
              })
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
      }
      ,
      handleCancel() {
        this.goBack();
      }
      ,
      handleGetOne(id) {
        this.$store
          .dispatch("product/getOne", {productId: id})
          .then(data => {
            this.formData = data;
            let param = {};
            param.categoryCode = this.formData.categoryCode;
            this.loadPropertyList(param);
          })
          .catch(error => {
            console.log(error);
          });
      }
      ,
      loadPropertyList(searchForm) {
        this.$store
          .dispatch("productProperty/getList", {
            filter: searchForm
          })
          .then(data => {
            if (data) {

              for (let i = 0, len = data.length; i < len; i++) {
                switch (data[i].type) {
                  case "ArrayList":
                    data[i].value = [];
                    break;
                  case "String":
                  case "Date":
                    data[i].value = "";
                    break;
                  case "Boolean":
                    data[i].value = false;
                    break;
                  case "Byte":
                  case "Short":
                  case "Integer":
                  case "Long":
                  case "Float":
                  case "Double":
                    data[i].value = 0;
                    break;
                }
              }
              this.formData.propertyList = data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      ,
      getValue(values) {
        let array = [];
        for (let key in values) {
          array.push(values[key]);
        }
        return array;
      }
      ,
      loadBrand() {
        this.$store
          .dispatch("brand/getList", {filters: {}})
          .then(data => {
            this.brandList = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
      ,
      loadTreeData() {
        this.$store
          .dispatch("firmCategory/getTreeList", {
            filter: {categoryType: "PRODUCT"}
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
      }
      ,
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
      }
      ,
      handleCategory(category) {
        let labelValue = this.$refs.categoryCascader.getCheckedNodes()[0]
          .pathLabels;
        if (labelValue.length > 0) {
          this.formData.categoryName = labelValue[0];
        }
        if (category) {
          let code = category[category.length - 1];
          this.formData.categoryCode = code;
          let param = {};
          param.categoryCode = code;
          this.loadPropertyList(param);
        }
      }
      ,
      //跳转回列表页面
      goBack() {
        if (this.$router.history.length <= 1) {
          this.$router.push({path: "/home"});
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
      this.loadTreeData();
      this.loadBrand();
    }
  }
  ;
</script>
