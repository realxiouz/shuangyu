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
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加属性值</el-button>
          <el-table
            :data="formData.values"
            style="width: 100%;margin-bottom: 15px;"
            size="mini"
          >
            <el-table-column prop="propertyCode" label="编码" align="center"></el-table-column>
            <el-table-column prop="propertyValue" label="值" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="350">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="valueRemove(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        <el-dialog title="属性值" :visible.sync="dialogVisible" width="20%">
          <el-form ref="form" :model="formValue" label-width="90px">
            <el-form-item label="编码">
              <el-input v-model="formValue.propertyCode"></el-input>
            </el-form-item>
            <el-form-item label="值">
              <el-input v-model="formValue.propertyValue"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="valueCancel">取 消</el-button>
            <el-button type="primary" @click="valueSave">确 定</el-button>
          </div>
        </el-dialog>
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
            categoryName: "",
            propertyName: "",
            isSellProperty: false,
            isEnumProperty: false,
            required: false,
            isMultiple: false,
            values: []
        }
    };
    export default {
        name: 'edit',
        data() {
            return {
                formData: defaultData(),
                dialogVisible: false,
                formValue: {},
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
                        .dispatch("app/getOne", {propertyId: id})
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
            valueRemove(idx) {
                this.values.splice(idx, 1);
            },
            handleAdd() {
                this.dialogVisible = true;
            },
            valueCancel() {
                this.dialogVisible = false;
            },
            valueSave() {
                if (!this.formValue.propertyCode || !this.formValue.propertyValue) {
                    this.$message("请填写完整属性信息！")
                    return false;
                }
                this.formData.values.push(this.formValue);
                this.dialogVisible = false;
                this.formValue = {};
            }
        },
        created() {
            if (this.$route.query.propertyId) {
                this.handleGetOne(this.propertyId);
            }
            if (this.$route.query.categoryName) {
                this.formData.categoryName = this.$route.query.categoryName;
            }
        },
        props: {
            propertyId: String,
        }
    }
</script>
