<template>
  <div class="bigBox">
    <div class="contentBox">
      <div id="goBack" @click="goBack">
        <el-page-header></el-page-header>
      </div>
      <el-steps :active="step" finish-status="success">
        <el-step title="基础属性"></el-step>
        <el-step title="类目属性"></el-step>
        <el-step title="sku属性"></el-step>
      </el-steps>
      <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
        <el-row :gutter="10" v-show="step==0">
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
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="计量单位" prop="unit">
              <el-input v-model="formData.unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="规格" prop="specification">
              <el-input v-model="formData.specification"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" :rows="3" v-model="formData.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item
              prop="notSaleable"
              label="不可销售"
              :rules="[]"
            >
              <el-switch v-model="formData.notSaleable" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item
              prop="notBuyable"
              label="不可采购"
              :rules="[]"
            >
              <el-switch
                v-model="formData.notBuyable" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item
              prop="taxRate"
              label="税率"
              :rules="[]"
            >
              <el-input-number v-model="formData.taxRate" :precision="2" :step="0.1" :max="100"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item
              prop="miniOrderQuantity"
              label="最小订单量"
              :rules="[]"
            >
              <el-input-number v-model="formData.miniOrderQuantity"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item
              prop="grossMargin"
              label="毛利率"
              :rules="[]"
            >
              <el-input-number v-model="formData.grossMargin"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item
              prop="warehouse"
              label="仓库"
              :rules="[]"
            >
              <el-cascader
                ref="warehouseCascader"
                v-model="formData.warehouse"
                style="width: 100%;"
                :options="warehouseData"
                :props="{ label: 'warehouseName', value: 'warehouseId' }"
                filterable
                @change="handleWarehouseChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row :gutter="10" v-show="step==1">
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="6"
            :xl="6"
            v-for="(item, index) in formData.propertyList"
            :key="index">
            <template v-if="item.valueType != 9">
              <el-form-item
                :prop="'propertyList.' + index + '.value'"
                :label="item.name"
                :rules="[{ required: item.required, message: '请输入'+item.name, trigger: 'blur' }]">
                <el-input
                  v-if="item.valueType ==0"
                  v-model="item.value"
                  :type="item.inputType"
                  :maxlength="item.length">
                </el-input>
                <el-switch v-if="item.valueType ==1" v-model="item.value"></el-switch>
                <el-input-number
                  v-if="item.valueType ==2"
                  v-model="item.value"
                  :min="item.min"
                  :max="item.max"
                  :step="item.step"
                  :precision="item.precision"></el-input-number>
                <el-date-picker
                  v-if="item.valueType ==3"
                  v-model="item.value"
                  :type="item.inputType"
                  :format="item.format"
                  placeholder="选择日期"></el-date-picker>
                <el-time-picker
                  v-if="item.valueType ==4"
                  arrow-control
                  v-model="item.value"
                  :picker-options="{selectableRange: '00:00:00 - 23:59:00' }">
                </el-time-picker>
                <el-rate v-if="item.valueType ==5" v-model="item.value"></el-rate>
                <el-radio-group v-if="item.valueType ==60" v-model="item.value">
                  <el-radio
                    v-for="attr in item.attributes"
                    :key="attr.code"
                    :label="attr.name">{{attr.name}}
                  </el-radio>
                </el-radio-group>
                <el-select v-model="item.value" v-if="item.valueType ==62" :multiple="item.multiple">
                  <el-option
                    v-for="attr in item.attributes"
                    :key="attr.code"
                    :label="attr.name"
                    :value="attr.code">
                  </el-option>
                </el-select>
                <el-checkbox-group
                  v-if="item.valueType ==61 && !item.sku"
                  v-model="item.value">
                  <el-checkbox
                    v-for="attr in item.attributes"
                    :key="attr.code"
                    :label="attr.code">{{attr.name}}
                  </el-checkbox>
                </el-checkbox-group>
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
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-show="step==2">
          <template v-if="!formData.sku">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item
                prop="quantity"
                label="产品数量"
                :rules="[]"
              >
                <el-input-number v-model="formData.quantity"/>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item
                prop="cost"
                label="成本"
                :rules="[]"
              >
                <el-input-number v-model="formData.cost" :precision="2" :step="0.1"/>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-form-item
                prop="price"
                label="价格"
                :rules="[]"
              >
                <el-input-number v-model="formData.productPrice" :precision="2" :step="0.1"/>
              </el-form-item>
            </el-col>
          </template>
          <el-table v-else :data="dataList" border style="width: 100%">
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
        </el-row>
      </el-form>
      <div style="text-align:center;">
        <el-button size="mini" @click="step--" v-if="step>0">上一步</el-button>
        <el-button size="mini" @click="onNext" v-if="step<2">下一步</el-button>
        <el-button type="primary" size="mini" v-if="step==2" @click="handleSave" >确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Add',
  data() {
    const productCode = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z_]*$/g
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入字母或数字！'))
      }
    }
    return {
      formData: this.defaultFormData(),
      categoryList: [],
      brandList: [],
      dataList: [],
      tableColumns: [],
      rules: {
        productCode: [
          { required: true, message: '请输入商品编码', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1到 20 个字符'
          },
          { validator: productCode, trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1到20 个字符'
          }
        ],
        brandCode: [
          { required: true, message: '请选择一个品牌', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1到20 个字符'
          }
        ],
        unit: [
          { required: true, message: '请输入计量单位', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1到20 个字符'
          }
        ]
      },

      warehouseData: [],

      step: 0,
    }
  },
  methods: {
    /* 表单默认加载数据*/
    defaultFormData() {
      return {
        propertyList: [],
        propertyItems: [],
        productCode: '',
        productName: '',
        categoryCode: '',
        categoryName: '',
        unit: '',
        brandCode: '',
        brandName: '',
        specification: '',
        description: '',

        sku: false
      }
    },
    handleBrandName(id) {
      const object = this.brandList.find(item => {
        return item.brandCode === id
      })
      this.formData.brandName = object.brandName
    },
    handleSku(index) {
      this.formData.propertyList[index].skuItems = this.getPropertySkuItems(this.formData.propertyList[index])
      const array = []
      const columns = []
      for (let i = 0, len = this.formData.propertyList.length; i < len; i++) {
        const property = this.formData.propertyList[i]
        if (property.sku) {
          const skuItems = property.skuItems
          if (skuItems && skuItems.length > 0) {
            array.push(skuItems)
            const { code, name } = property
            const column = { code, name }
            columns.push(column)
          }
        }
      }
      this.tableColumns = columns
      console.log(columns)
      this.dataList = []
      if (array.length > 0) {
        const skuIds = this.calcDescartes(array)
        for (let i = 0; i < skuIds.length; i++) {
          const row = {}
          row.productCode = this.formData.productCode
          row.productName = this.formData.productName
          row.categoryName = this.formData.categoryName
          row.brandName = this.formData.brandName
          row.unit = this.formData.unit
          if (Array.isArray(skuIds[i])) {
            const items = []
            const codes = []
            const names = []
            for (let j = 0; j < skuIds[i].length; j++) {
              const item1 = skuIds[i][j]
              codes.push(item1.vcode)
              names.push(item1.vname)
              const property = this.formData.propertyList.find(p => {
                return p.code == item1.code
              })
              const _property = Object.assign({}, property)
              _property.type = 'String'
              _property.value = item1.vname
              items.push(this.getPropertyItem(_property))
              row[item1.code] = item1.vname
            }
            row.propertyItems = items
            row.skuCode = codes
            row.skuName = names
            row.skuId = codes.join('-')
          } else {
            const codes = []
            const item2 = skuIds[i]
            row.skuName = item2.vname
            row.skuId = item2.vcode
            codes.push(item2.vcode)
            row.skuCode = codes
          }
          this.dataList.push(row)
        }
      }
      console.log(this.dataList)
    },
    getPropertySkuItems(property) {
      const items = []
      property.value.forEach(code => {
        const value = property.attributes.find(attr => {
          return attr.code === code
        })
        items.push({ code: property.code, vcode: value.code, vname: value.name })
      })
      return items
    },
    calcDescartes(array) {
      if (array.length < 2) return array[0] || []
      return [].reduce.call(array, function(col, set) {
        const res = []
        col.forEach(function(c) {
          set.forEach(function(s) {
            const t = [].concat(Array.isArray(c) ? c : [c])
            t.push(s)
            res.push(t)
          })
        })
        return res
      })
    },
    getPropertyItems(excludeSku) {
      const items = []
      const arr = this.formData.propertyList
      for (let i = 0; i < arr.length; i++) {
        const property = arr[i]
        const item = this.getPropertyItem(property)
        if (property.sku === excludeSku) {
          continue
        }
        items.push(item)
      }
      return items
    },
    getPropertyItem(property, objVal = {}) {
      const { code, name, type, value, sku, hidden } = property
      const item = { code, name, type, sku, _string: value + '', hidden }
      switch (property.type) {
        case 'Date':
          item._string = this.$moment(property.value).format(property.format)
          item._date = this.$moment(property.value).toDate()
          item._long = this.$moment(property.value).valueOf()
          break
        case 'ArrayList':
          item._array = property.value
          break
        case 'Boolean':
          item._bool = property.value
          break
        case 'Byte':
          item._byte = property.value
          break
        case 'Short':
          item._short = property.value
          break
        case 'Integer':
          item._int = property.value
          break
        case 'Long':
          item._long = property.value
          break
        case 'Float':
          item._float = property.value
          break
        case 'Double':
          item._double = property.value
          break
          // case "Object":
          //   item._object = objVal
          //   break
      }
      return item
    },
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.formData.propertyItems = this.getPropertyItems()
          delete this.formData.propertyList
          this.$store
            .dispatch('product/save', {
              skuList: this.dataList,
              product: this.formData
            })
            .then(() => {
              this.$message({
                type: 'success',
                message: '保存成功！'
              })
              this.goBack()
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    onNext() {
      if(this.step == 0) {
        if (!this.formData.categoryCode) {
          this.$message.warning('必须选择商品类目')
          return
        }
      }
      this.step++
    },
    handleGetOne(id) {
      this.$store
        .dispatch('product/getOne', { productId: id })
        .then(data => {
          
          const param = {}
          param.categoryCode = data.categoryCode
          this.loadPropertyList(param, data.propertyItems)
          this.$nextTick(_ => {
            this.formData = {...this.formData, ...data}
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getValueByType(i, arr) {
      let bean
      if (arr && arr.length) {
        bean = arr.find(bean => bean.code == i.code)
      }
      switch(i.type) {
        case "String":
          i.value = (bean && bean._string) || ''
          break
        case "Boolean":
          i.value = (bean && bean._bool) || false
            break
        case 'ArrayList':
          i.value = (bean && bean._array) || []
          break
        case 'Date':
          i.value = (bean && bean._date) || ''
          break
        case 'Byte':
          i.value = (bean && bean._byte) || 0
          break
        case 'Short':
          i.value = (bean && bean._short) || 0
          break
        case 'Integer':
          i.value = (bean && bean._int) || 0
          break
        case 'Long':
          i.value = (bean && bean._long) || 0
          break
        case 'Float':
          i.value = (bean && bean._float) || 0
          break
        case 'Double':
          i.value = (bean && bean._double) || 0
          break
        default:
          i.value = undefined
      } 
      return i
    },
    loadPropertyList(searchForm, arr=[]) {
      this.$store
        .dispatch('productProperty/getList', {
          filter: searchForm
        })
        .then(data => {
          if (data) {
            // for (let i = 0, len = data.length; i < len; i++) {
            //   switch (data[i].type) {
            //     case 'ArrayList':
            //       data[i].value = []
            //       break
            //     case 'String':
            //     case 'Date':
            //       data[i].value = ''
            //       break
            //     case 'Boolean':
            //       data[i].value = false
            //       break
            //     case 'Byte':
            //     case 'Short':
            //     case 'Integer':
            //     case 'Long':
            //     case 'Float':
            //     case 'Double':
            //       data[i].value = 0
            //       break
            //   }
            // }

            this.formData.propertyList = data.map(i => this.getValueByType(i, arr))

            this.formData.sku = data.some(i => i.sku)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getValue(values) {
      const array = []
      for (const key in values) {
        array.push(values[key])
      }
      return array
    },
    loadBrand() {
      this.$store
        .dispatch('brand/getList', { filters: {}})
        .then(data => {
          this.brandList = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadTreeData() {
      this.$store
        .dispatch('firmCategory/getTreeList', {
          filter: { categoryType: 'PRODUCT' }
        })
        .then(data => {
          if (data) {
            this.categoryList = this.getTreeData(data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTreeData(data) {
      // 循环遍历json数据
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children)
        }
      }
      return data
    },
    handleCategory(category) {
      const labelValue = this.$refs.categoryCascader.getCheckedNodes()[0]
        .pathLabels
      if (labelValue.length > 0) {
        this.formData.categoryName = labelValue[0]
      }
      if (category) {
        const code = category[category.length - 1]
        this.formData.categoryCode = code
        const param = {}
        param.categoryCode = code
        this.loadPropertyList(param)
      }
    },
    handleWarehouseChange() {
      const arr = this.$refs.warehouseCascader.getCheckedNodes()
      const data = arr.length ? arr[0].data : {}
      this.formData.warehouseId = data.warehouseId
      this.formData.warehouseCode = data.warehouseCode
      this.formData.warehouseName = data.warehouseName
    },
    // 跳转回列表页面
    goBack() {
      if (this.$router.history.length <= 1) {
        this.$router.push({ path: '/home' })
        return false
      } else {
        this.$router.go(-1)
      }
    },

    loadWarehouseData() {
      this.$store.dispatch('warehouse/getTreeList', { filter: {}})
        .then(d => {
          this.warehouseData = this.getTreeData(d)
        })
        .finally(_ => {

        })
    }
  },
  created() {
    if (this.$route.query.productId) {
      this.handleGetOne(this.$route.query.productId)
    } else {
      this.formData = this.defaultFormData()
    }
    this.loadTreeData()
    this.loadBrand()
    this.loadWarehouseData()
  }
}

</script>
