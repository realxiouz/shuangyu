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
            <!--            <el-form-item label="商品类目">-->
            <!--              <el-cascader-->
            <!--                v-model="formData.categoryCode"-->
            <!--                style="width: 100%;"-->
            <!--                :options="categoryList"-->
            <!--                :props="{ label: 'categoryName', value: 'categoryCode' }"-->
            <!--                filterable-->
            <!--                @change="handleCategory"-->
            <!--              >-->
            <!--              </el-cascader>-->
            <!--            </el-form-item>-->
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="属性编码" prop="propertyCode">
              <el-input v-model="formData.propertyCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="属性标题" prop="propertyLabel">
              <el-input v-model="formData.propertyLabel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否销售属性" prop="sellProperty">
              <el-switch v-model="formData.sellProperty" :active-value=true :inactive-value=false></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否枚举属性" prop="enumProperty">
              <el-switch v-model="formData.enumProperty" :active-value=true :inactive-value=false></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否必填">
              <el-switch v-model="formData.required" :active-value=true :inactive-value=false></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否多选" prop="multiple">
              <el-switch v-model="formData.multiple" :active-value=true :inactive-value=false></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加属性值</el-button>
        <el-table
          :data="formData.values"
          style="width: 100%;margin-bottom: 15px;"
          size="mini"
          border
        >
          <el-table-column prop="propertyValueCode" label="编码" align="center"></el-table-column>
          <el-table-column prop="propertyValue" label="值" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="350">
            <template slot-scope="scope">
              <el-button type="danger" size="mini"
                         @click="valueRemove(scope.row.propertyValueCode,scope.$index,formData.values)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="属性值" :visible.sync="dialogVisible" width="20%">
          <el-form ref="form" :model="formValue" label-width="90px">
            <el-form-item label="编码">
              <el-input v-model="formValue.propertyValueCode"></el-input>
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
    </el-card>
    <div slot="footer" style="text-align:center;">
      <el-button size="mini" type="primary" @click="handleCancel">取消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            categoryCode: "",
            categoryName: "",
            categoryPath: "",
            propertyCode: "",
            propertyLabel: "",
            propertyName: "",
            sellProperty: false,
            enumProperty: false,
            required: false,
            multiple: false,
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
                propertyId: '',
                categoryList: [],
                rules: {
                    categoryName: [
                        {required: true, message: "请输入商品类目", trigger: "blur"},
                    ],
                    propertyName: [
                        {required: true, message: "请输入属性名称", trigger: "blur"},
                    ],
                    propertyCode: [
                        {required: true, message: "请输入属性编码", trigger: "blur"},
                    ],
                    propertyLabel: [
                        {required: true, message: "请输入属性标题", trigger: "blur"},
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
            handleCancel() {
                this.goBack();
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store
                            .dispatch("productProperty/save", this.formData)
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
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("productProperty/getOne", {propertyId: id})
                        .then(data => {
                            this.formData = data;
                        }).catch(error => {
                        console.log(error);
                    });
                } else {
                    this.formData = defaultData();
                }
            },
            valueRemove(id, index, rows) {
                this.$confirm("此操作将删除该条记录, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        rows.splice(index, 1);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            handleAdd() {
                this.dialogVisible = true;
            },
            valueCancel() {
                this.dialogVisible = false;
            },
            valueSave() {
                if (!this.formValue.propertyValueCode || !this.formValue.propertyValue) {
                    this.$message("请填写完整属性信息！")
                    return false;
                }
                this.formData.values.push(this.formValue);
                this.dialogVisible = false;
                this.formValue = {};
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
                for (var i = 0; i < data.length; i++) {
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
                if (category) {
                    let code = category[category.length - 1];
                    this.formData.categoryCode = code;
                }
            },
        },
        created() {
            if (this.$route.query.propertyId) {
                this.propertyId = this.$route.query.propertyId;
                this.handleGetOne(this.$route.query.propertyId);
            }
            if (this.$route.query.categoryCode) {
                this.formData.categoryCode = this.$route.query.categoryCode;
            }
            if (this.$route.query.categoryName) {
                this.formData.categoryName = this.$route.query.categoryName;
            }
            if (this.$route.query.categoryPath) {
                this.formData.categoryPath = this.$route.query.categoryPath;
            }
            this.loadTreeData();
        }
    }
</script>
