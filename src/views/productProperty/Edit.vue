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
            <el-form-item label="属性类型:" prop="valueType">
              <!-- 数据类型（0文本，1开关，2数字，3日期，4日期时间，5时间，6评分，7单选，8多选，9选择器）-->
              <el-select clearable v-model="formData.valueType" placeholder="全部" style="width: 100%"
                         @change="valueTypeChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==8">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否销售属性" prop="isSku">
              <el-switch v-model="formData.isSku" :active-value=true :inactive-value=false
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==2">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="精度" prop="precision">
              <el-input v-model="formData.precision" @change="changeNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==0">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:" prop="precision">
              <el-input v-model="test.input" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==1">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:">
              <el-switch
                v-model="test.switchValue"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==2">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:">
              <el-input-number v-model="test.num" :precision="formData.precision"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==3">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:">
              <el-date-picker
                v-model="test.time1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==4">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:">
              <el-date-picker
                v-model="test.time2"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==5">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:">
              <el-time-select
                v-model="test.time3"
                :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30'
  }"
                placeholder="选择时间">
              </el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==6">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:">
              <el-rate v-model="test.rateValue"></el-rate>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==7">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:">
              <el-radio v-model="test.radio" label="1">单选项1</el-radio>
              <el-radio v-model="test.radio" label="2">单选项2</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==8">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:">
              <el-checkbox v-model="test.checked1">多选框1</el-checkbox>
              <el-checkbox v-model="test.checked2">多选框2</el-checkbox>
              <el-checkbox v-model="test.checked3">多选框3</el-checkbox>
              <el-checkbox v-model="test.checked4">多选框4</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="valueType ==9">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="示例:">
              <el-select
                style="width: 100%;"
                clearable
                collapse-tags
                v-model="test.selectValue"
                placeholder="请选择"
              >
                <el-option label="选项1" value="0"></el-option>
                <el-option label="选项2" value="1"></el-option>
                <el-option label="选项3" value="1"></el-option>
                <el-option label="选项4" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-show="showAddValues">
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加属性值</el-button>
          <el-table
            :data="formData.values"
            style="width: 100%;margin-bottom: 15px;"
            size="mini"
            border
          >
            <el-table-column prop="code" label="编码" align="center"></el-table-column>
            <el-table-column prop="value" label="值" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="350">
              <template slot-scope="scope">
                <el-button type="danger" size="mini"
                           @click="valueRemove(scope.row.code,scope.$index,formData.values)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="属性值" :visible.sync="dialogVisible" width="20%">
          <el-form ref="form" :model="formValue" label-width="90px">
            <el-form-item label="编码">
              <el-input v-model="formValue.code"></el-input>
            </el-form-item>
            <el-form-item label="值">
              <el-input v-model="formValue.value"></el-input>
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
            precision: 0,
            isSku: false,
            valueType: '',
            values: []
        }
    };
    export default {
        name: 'edit',
        data() {
            return {
                formData: defaultData(),
                dialogVisible: false,
                showAddValues: false,
                formValue: {},
                propertyId: '',
                valueType: '',
                test: {},
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
                    , valueType: [
                        {required: true, message: "请选择属性类型", trigger: "blur"},
                    ]
                },
                options: [{
                    value: 0,
                    label: '文本'
                },
                    {
                        value: 1,
                        label: '开关'
                    },
                    {
                        value: 2,
                        label: '数字'
                    },
                    {
                        value: 3,
                        label: '日期'
                    },
                    {
                        value: 4,
                        label: '日期时间'
                    },
                    {
                        value: 5,
                        label: '时间'
                    },
                    {
                        value: 6,
                        label: '评分'
                    },
                    {
                        value: 7,
                        label: '单选'
                    },
                    {
                        value: 8,
                        label: '多选'
                    },
                    {
                        value: 9,
                        label: '选择器'
                    }]
            }
        },
        methods: {
            changeNum(value) {
                this.formData.precision = value;
            },
            valueTypeChange(value) {
                console.log(typeof value);
                this.valueType = value;
                if (value == 7 || value == 8 || value == 9) {
                    this.showAddValues = true;
                } else {
                    this.showAddValues = false;
                    this.formData.values = [];
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
                            this.valueTypeChange(this.formData.valueType);
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
                if (!this.formValue.code || !this.formValue.value) {
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
