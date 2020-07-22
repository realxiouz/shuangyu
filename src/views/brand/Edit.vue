<template>
  <div class="page-form">
    <el-dialog :title="keyId=''?'编辑品牌信息':'添加品牌信息'" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
        <el-form-item label="品牌编码：" prop="brandCode">
          <el-input v-model="formData.brandCode" placeholder="请输入品牌编码.."></el-input>
        </el-form-item>
        <el-form-item label="品牌名称：" prop="brandName">
          <el-input v-model="formData.brandName" placeholder="请输入品牌编码.."></el-input>
        </el-form-item>
        <el-form-item label="商品类目：" prop="categoryCode">
          <el-cascader 
          background
            v-model="formData.categoryCode"
            style="width: 100%;"
            :options="categoryList"
            :props="{ label: 'categoryName', value: 'categoryCode' }"
            @change="selectedCategory">
          </el-cascader>
        </el-form-item>
        <el-form-item label="品牌故事：">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.brandStory"
                    placeholder="请输入品牌故事.."></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="formData.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入描述.."></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
       </span>

    </el-dialog>
  </div>
</template>

<script>
    import {MIXIN_EDIT} from "@/utils/mixin";
    export default {
        mixins: [MIXIN_EDIT],
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            brandId: {
                type: String,
                default: ''
            }
        },
        data() {
            const brandCode = (rule, value, callback) => {
                let reg = /^[0-9a-zA-Z]*$/g;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error("只能输入字母或数字！"));
                }
            };
            return {
                formData: this.defaultFormData(),
                dialogVisible: this.visible,
                categoryList: [],
                //用于记录和查找所选中的商品类别
                tempCategoryList: [],
                actions: {
                    getOne: 'brand/getOne',
                    saveOne: 'brand/saveOne'
                },
                rules: {
                    brandCode: [
                        {required: true, message: "请输入品牌编码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        },
                        {validator: brandCode, trigger: 'blur'}
                    ],
                    brandName: [
                        {required: true, message: "请输入品牌名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    categoryCode: [
                        {required: true, message: "请输入品牌名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ]
                }
            };
        },
        watch: {
            visible(val) {
                this.dialogVisible = val;
                if (this._.isEmpty(this.brandId)) {
                    this.clearForm();
                } else {
                    this.loadData();
                }
            }
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
            loadCategory() {
                this.$store.dispatch("category/getTreeList", {filter: {categoryType: 9}})
                    .then(data => {
                        this.categoryList = this.generateTreeData(data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
          
            selectedCategory(selected) {
                //选取最后的节点
                const code = selected[selected.length - 1];
                this.formData.categoryCode = code;
                //找到所选择的对象
                this.tempCategoryList.forEach(item => {
                    if (code == item.categoryCode) {
                        this.formData.categoryName = item.categoryName;
                        this.formData.categoryPath = item.path;
                    }
                })
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
            this.loadCategory();
        }
    };
</script>
<style>
  .el-dialog {
    width: 500px;
    min-width: 500px;
  }
</style>
