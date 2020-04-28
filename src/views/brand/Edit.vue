<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <el-form-item label="品牌编码：">
        <el-input v-model="formData.brandCode" placeholder="请输入品牌编码.."></el-input>
      </el-form-item>
      <el-form-item label="品牌名称：">
        <el-input v-model="formData.brandName" placeholder="请输入品牌编码.."></el-input>
      </el-form-item>
      <el-form-item label="商品类目：">
        <el-input v-model="formData.categoryCode" placeholder="请输入商品类目.."></el-input>
      </el-form-item>
      <el-form-item label="品牌故事：">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.brandStory" placeholder="请输入品牌故事.."></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="formData.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入描述.."></el-input>
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
        props: ["curNode", "update"],
        data() {
            return {
                formData: {}
            };
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    brandId: '',
                    //品牌编码
                    brandCode: "",
                    //品牌名称
                    brandName: "",
                    //商品类目（编码）
                    categoryCode: "",
                    //商品类目名称）
                    categoryName: "",
                    //商品类目（树）
                    categoryPath: "",
                    //品牌logo
                    brandLogo: '',
                    //品牌故事
                    brandStory: '',
                    //描述
                    description: ''
                };
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
            /*对提交的数据进行类型格式*/
            handleConfirm() {
                this.$emit("onSave", this.formData);
            },
            initFormData() {
                this.clearForm();
                if (this.update) {
                    Object.assign(this.formData,this.curNode);
                }
            }
        },
        created() {
            this.initFormData();
        }
    };
</script>
