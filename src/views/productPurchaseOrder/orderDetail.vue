<template>
  <div>
    <el-form ref="productForm" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-form-item label="商品选择:" prop="brandCode">
        <el-select v-model="formData.productId" filterable @change="selectedProduct" placeholder="请选择">
          <el-option
            v-for="item in productList"
            :key="item.productId"
            :label="item.productName"
            :value="item.productId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品编码:">
        <el-input v-model="formData.productCode" placeholder="商品编码.."></el-input>
      </el-form-item>
      <el-form-item label="商品名称:">
        <el-input v-model="formData.productName" placeholder="商品名称.."></el-input>
      </el-form-item>
      <el-form-item label="品牌:">
        <el-input v-model="formData.brandName" placeholder="品牌.."></el-input>
      </el-form-item>
      <el-form-item label="单价:" prop="price">
        <el-input v-model="formData.price" placeholder="示例：0.00" @change="computedAmount"></el-input>
      </el-form-item>
      <el-form-item label="数量:" prop="quantity">
        <el-input v-model.number="formData.quantity" placeholder="数量.." @input="computedAmount"></el-input>
      </el-form-item>
      <el-form-item label="金额:" prop="amount">
        {{formData.amount}}
      </el-form-item>
      <el-form-item label="描述:">
        {{formData.description}}
      </el-form-item>
    </el-form>

    <div style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['curProduct','detailUpdate'],
        data() {
            const valOfPrice = (rule, value, callback) => {
                const reg = /^[0-9]+(\.[0-9]{1,2})?$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error("请确认输入正确的价格！"));
                }
            };
            return {
                formData: {},
                productList: [],
                rules: {
                    quantity: [
                        {required: true, message: '请输入数量', trigger: 'blur'},
                        {type: 'number', message: '数量必须为数字'}
                    ],
                    price: [
                        {required: true, message: '请输入单价', trigger: 'blur'},
                        {validator: valOfPrice, message: '请确认输入正确的价格，最多两位小数！'}
                    ]
                }
            }
        },
        methods: {
            defaultFormData() {
                return {
                    //数量
                    quantity: 0,
                    //单价
                    price: 0,
                    //金额
                    amount: 0,
                    productCode: null,
                    productName: null,
                    brandName: null
                }
            },
            loadProducts() {
                this.$store.dispatch("product/getList", {filter: {}})
                    .then(data => {
                        this.productList = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            selectedProduct(item) {
                this.productList.forEach(product => {
                    if (item === product.productId) {
                        this.formData = product;
                    }
                })
            },
            computedAmount() {
                if (0 != this.formData.quantity){
                    this.formData.amount = parseFloat((this.formData.price * this.formData.quantity).toFixed(2));
                }
            },
            clearForm() {
                this.formData = this.defaultFormData();
            },
            handleConfirm() {
                this.$refs['productForm'].validate((valid) => {
                    if (valid) {
                        this.$emit('onConfirm', this.formData);
                    } else {
                        this.$message({type: "warning", message: "请将数据填写完整！"});
                        return false;
                    }
                });
            },
            initFormData(){
                this.clearForm();
                this.loadProducts();
                if (this.detailUpdate){
                    Object.assign(this.formData, this.curProduct);
                }
            }
        },
        created() {
            this.initFormData();
        }
    }
</script>
