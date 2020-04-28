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
        <el-cascader
          v-model="formData.categoryCode"
          style="width: 100%;"
          placeholder="可通过科目名称搜索.."
          :options="categoryList"
          :props="{ label: 'categoryName', value: 'categoryCode' }"
          @change="selectedCategory">
        </el-cascader>
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
                formData: {},
                categoryList: [],
                //用于记录和查找所选中的商品类别
                tempCategoryList: []
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
            loadCategory(){
                this.$store.dispatch("category/getTreeList", {filter: {categoryType: 9}})
                    .then(data => {
                        this.categoryList = this.generateTreeData(data.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
            /*对提交的数据进行类型格式*/
            handleConfirm() {
                this.$emit("onSave", this.formData);
            },
            selectedCategory(selected){
                //选取最后的节点
                const code = selected[selected.length - 1];
                this.formData.categoryCode = code;
                //找到所选择的对象
                this.tempCategoryList.forEach(item => {
                    if (code == item.categoryCode){
                        this.formData.categoryName = item.categoryName;
                        this.formData.categoryPath = item.path;
                    }
                })
            },
            initFormData() {
                this.clearForm();
                this.loadCategory();
                if (this.update) {
                    Object.assign(this.formData,this.curNode);
                }
            },
            generateTreeData(data) {
                // 循环遍历json数据
                for (let i = 0; i < data.length; i++) {
                    this.tempCategoryList.push(data[i]);
                    if (data[i].children.length < 1) {
                        // children若为空数组，则将children设为undefined
                        data[i].children = undefined;
                    } else {
                        // children若不为空数组，则继续 递归调用 本方法
                        this.generateTreeData(data[i].children);
                    }
                }
                return data;
            },
        },
        created() {
            this.initFormData();
        }
    };
</script>
