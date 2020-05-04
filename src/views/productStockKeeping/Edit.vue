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
        <el-form-item label="商品类目" prop="categoryCode">
          <el-cascader
            ref="categoryCascader"
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
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-form-item label="计量单位" prop="unit">
          <el-input v-model="formData.unit"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-form-item label="库存上限" prop="maxStockQuantity">
          <el-input v-model="formData.maxStockQuantity"></el-input>
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
        <el-form-item label="单价" prop="price">
          <el-input v-model="formData.price"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-form-item label="成本" prop="cost">
          <el-input v-model="formData.cost"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="formData.quantity"></el-input>
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
                rules: {
                    appName: [
                        {required: true, message: "请输入应用名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 10,
                            message: "长度在 1到 10 个字符"
                        }
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
                            this.formData = data;
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
            handleCategory() {
                let labelValue = this.$refs.categoryCascader.getCheckedNodes()[0].pathLabels;
                if (labelValue.length > 0) {
                    this.formData.categoryName = labelValue[0];
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
            },
            handleCancel() {
                this.goBack();
            }
        },
        created() {
            if (this.$route.query.stockId) {
                this.handleGetOne(this.$route.query.stockId);
            }
            this.loadTreeData();
            this.loadBrand();
        }
    }
</script>
