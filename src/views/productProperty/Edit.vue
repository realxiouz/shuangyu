<template>
  <div>
    <div id="goBack" @click="goBack">
      <el-page-header></el-page-header>
    </div>
    <el-card class="contentBox">
      <div slot="header">
        <span>商品属性管理</span>
      </div>
      <el-form ref="form" :rules="rules" :model="formData" label-width="130px" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="商品类目" prop="categoryName">
              <el-input v-model="formData.categoryName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="属性名称" prop="propertyName">
              <el-input v-model="formData.propertyName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否销售属性" prop="isSellProperty">
              <el-checkbox v-model="formData.isSellProperty"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否枚举属性" prop="isEnumProperty">
              <el-checkbox v-model="formData.isEnumProperty"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否必填" prop="required">
              <el-checkbox v-model="formData.required"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否多选" prop="isMultiple">
              <el-checkbox v-model="formData.isMultiple"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:right;">
        <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
    function defaultData() {
        return {
            appId: "",
            appName: "",
            enable: true
        }
    };
    export default {
        name: 'appEdit',
        data() {
            return {
                formData: defaultData(),
                rules: {
                    categoryName: [
                        {required: true, message: "请输入商品类目", trigger: "blur"},
                    ],
                    propertyName: [
                        {required: true, message: "请输入属性名称", trigger: "blur"},
                    ]
                }
            }
        },
        methods: {
            //跳转回列表页面
            goBack() {
                if (this.$router.history.length <= 1) {
                    this.$router.push({path: '/home'});
                    return false;
                } else {
                    this.$router.go(-1);
                }
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$emit('onSave', this.formData);
                    }
                });
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("app/getOne", {appId: id})
                        .then(data => {
                            this.formData = data;
                            this.dialogVisible = true;
                        }).catch(error => {
                        console.log(error);
                    });
                } else {
                    this.formData = defaultData();
                }
            },
        },
        created() {
            if (this.appId) {
                this.handleGetOne(this.appId);
            }
        },
        props: {
            appId: String,
        }
    }
</script>
