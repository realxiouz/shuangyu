<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="300px" size="mini" align="center">
      <el-row :gutter="18">
        <el-form-item label="客户" prop="merchantId">
          <el-select
            v-model="formData.merchantId"
            placeholder="请选择客户.."
            style="width: 100%"
          >
            <el-option
              v-for="item in openList"
              :key="item.merchantId"
              :label="item.firm.firmName"
              :value="item.merchantId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="客户域名" prop="merchantDomain">
          <el-input v-model="formData.merchantDomain"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18">
        <!--          <el-col :xs="36" :sm="24" :md="24" :lg="18" :xl="18">-->
        <el-form-item label="参数名称" prop="paramName" align="left">
          <el-input v-model="formData.paramName"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18">
        <el-form-item label="参数编码" prop="paramCode">
          <el-input v-model="formData.paramCode"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18">
        <el-form-item label="数据类型:" prop="valueType">
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
      </el-row>
      <el-row :gutter="18" v-if="valueType ==2">
        <el-form-item label="精度" prop="precision">
          <el-input v-model="formData.precision" @change="changeNum"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==2">
        <el-form-item label="最小值:">
          <el-input v-model="formData.min" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==2">
        <el-form-item label="最大值:">
          <el-input v-model="formData.max" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==2">
        <el-form-item label="步长:">
          <el-input v-model="formData.step" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==0">
        <el-form-item label="示例:" prop="precision">
          <el-input v-model="test.input" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==1">
        <el-form-item label="示例:">
          <el-switch
            v-model="test.switchValue"
          >
          </el-switch>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==2">
        <el-form-item label="示例:">
          <el-input-number v-model="test.num" :precision="formData.precision"></el-input-number>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==3">
        <el-form-item label="示例:">
          <el-date-picker
            v-model="test.time1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==4">
        <el-form-item label="示例:">
          <el-date-picker
            v-model="test.time2"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==5">
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
      </el-row>
      <el-row :gutter="18" v-if="valueType ==6">
        <el-form-item label="示例:">
          <el-rate v-model="test.rateValue"></el-rate>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==7">
        <el-form-item label="示例:">
          <el-radio v-model="test.radio" label="1">单选项1</el-radio>
          <el-radio v-model="test.radio" label="2">单选项2</el-radio>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==8">
        <el-form-item label="示例:">
          <el-checkbox v-model="test.checked1">多选框1</el-checkbox>
          <el-checkbox v-model="test.checked2">多选框2</el-checkbox>
          <el-checkbox v-model="test.checked3">多选框3</el-checkbox>
          <el-checkbox v-model="test.checked4">多选框4</el-checkbox>
        </el-form-item>
      </el-row>
      <el-row :gutter="18" v-if="valueType ==9">
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
      </el-row>
      <div v-show="showAddValues">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加属性值</el-button>
        <el-table
          :data="values"
          style="width: 100%;margin-bottom: 15px;"
          size="mini"
          border
        >
          <el-table-column prop="code" label="编码" align="center"></el-table-column>
          <el-table-column prop="value" label="值" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="350">
            <template slot-scope="scope">
              <el-button type="primary" size="mini"
                         @click="valueEdit(scope.row)">编辑
              </el-button>
              <el-button type="danger" size="mini"
                         @click="valueRemove(scope.row.code,scope.$index,values)">删除
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
      <el-row :gutter="18">
        <el-form-item label="是否必填:">
          <el-select v-model="formData.required">
            <el-option label="是" :value=true></el-option>
            <el-option label="否" :value=false></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row :gutter="18">
        <el-form-item label="计量单位:">
          <el-input v-model="formData.unit" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18">
        <el-form-item label="默认值:">
          <el-input v-model="formData.defaultValue" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="18">
        <el-form-item label="描述:">
          <el-input v-model="formData.description" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <div slot="footer" style="text-align:right;">
      <el-button size="mini" type="primary" @click="handleCancel">取消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>
<script>
  function defaultData() {
    return {
      merchantId: '',
      merchantDomain: '',
      paramName: "",
      paramCode: "",
      propertyName: "",
      precision: 0,
      required: true,
      unit: '',
      valueType: '',
      defaultValue: '',
      description: ''
    }
  };
  export default {
    name: 'edit',
    props: ["merchantId", "paramId"],
    data() {
      const categoryCode = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入字母或数字！"));
        }
      };
      return {
        formData: defaultData(),
        dialogVisible: false,
        showAddValues: false,
        formValue: {},
        propertyId: '',
        valueType: '',
        test: {},
        values: [],
        categoryList: [],
        openList: [],
        rules: {
          merchantId: [
            {required: true, message: "客户不能为空!", trigger: "blur"}
          ],
          merchantDomain: [
            {required: true, message: "客户域名不能为空!", trigger: "blur"}
          ],
          paramName: [
            {required: true, message: "参数名称不能为空!", trigger: "blur"}
          ],
          paramCode: [
            {required: true, message: "参数编码不能为空!", trigger: "blur"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: categoryCode, trigger: 'blur'}
          ],
          defaultValue: [
            {required: true, message: "默认在不能为空！", trigger: "blur"}
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
        if (value > 0) {
          this.formData.precision = value;
        }
      },
      valueTypeChange(value) {
        this.valueType = value;
        if (value == 7 || value == 8 || value == 9) {
          this.showAddValues = true;
        } else {
          this.showAddValues = false;
        }
      },
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
            if (this.values.length > 0) {
              let map = {};
              for (let i = 0, len = this.values.length; i < len; i++) {
                map[this.values[i].code] = this.values[i].value;
              }
              this.formData.values = map;
            }
            this.$emit("onSave", this.formData);
          }
        });
      },
      getOne(id) {
        if (id) {
          this.$store
            .dispatch("qunarPolicyParam/getOne", id)
            .then(data => {
              if (data) {
                this.formData = data;
                this.valueTypeChange(this.formData.valueType);
                if (data.values != null) {
                  let array = [];
                  let map = data.values;
                  for (let key in map) {
                    let data = {};
                    data.code = key;
                    data.value = map[key];
                    array.push(data)
                  }
                  this.values = array;
                }
              }
            }).catch(error => {
            console.log(error);
          });
        } else {
          this.formData = defaultData();
        }
      },
      valueEdit(rows) {
        this.formValue = {};
        this.formValue = rows;
        this.dialogVisible = true;
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
      valueCancel() {
        this.dialogVisible = false;
      },
      valueSave() {
        if (!this.formValue.code || !this.formValue.value) {
          this.$message("请填写完整属性信息！")
          return false;
        }
        this.values.push(this.formValue);
        this.dialogVisible = false;
        this.formValue = {};
      },
      //加载平台信息
      loadMerchants() {
        this.$store
          .dispatch("firmMerchant/getList", {
            filter: {merchantType: 0}
          })
          .then(data => {
            this.openList = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleCategory(category) {
        if (category) {
          let code = category[category.length - 1];
          this.formData.categoryCode = code;
        }
      },
    },

    created() {
      if (this.merchantId) {
        this.loadMerchants();
      } else {
        this.loadMerchants();
      }
      if (this.paramId) {
        this.getOne(this.paramId);
      }
    }
  }
</script>
