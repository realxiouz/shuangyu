<template>
  <div>
    <el-form ref="policyForm" size="mini" :model="formData" label-width="110px" :rules="formRules">
      <input type="hidden" v-model="formData.attrId"/>
      <div>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input placeholder="名称" v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input placeholder="编码" v-model="formData.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分组" prop="group">
              <el-input placeholder="分组" v-model="formData.group"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据类型:" prop="valueType">
              <el-select
                v-model="formData.valueType"
                clearable
                placeholder="数据类型"
                style="width: 100%"
                @change="valueTypeChange"
              >
                <el-option
                  v-for="item in valueTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="formData.valueType==2" :span="12">
            <el-form-item label="精度" prop="precision">
              <el-input-number placeholder="精度" v-model="formData.precision" controls-position="right" :min="0"
                               :precision="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col v-if="formData.valueType==2" :span="12">
            <el-form-item label="最小值" prop="min">
              <el-input-number placeholder="最小值" v-model="formData.min" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col v-if="formData.valueType==2" :span="12">
            <el-form-item label="最大值" prop="max">
              <el-input-number placeholder="最大值" v-model="formData.max" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col v-if="formData.valueType==2" :span="12">
            <el-form-item label="步长" prop="step">
              <el-input-number placeholder="步长" v-model="formData.step" controls-position="right"
                               :precision="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="默认值" prop="value">
              <el-input placeholder="默认值" v-model="formData.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序号" prop="sort">
              <el-input-number placeholder="排序号" v-model="formData.sort" controls-position="right"
                               :precision="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input placeholder="备注" v-model="formData.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否必填" prop="required">
              <el-switch v-model="formData.required" :active-value=true :inactive-value=false></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否只读" prop="readonly">
              <el-switch v-model="formData.readonly" :active-value=true :inactive-value=false></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否禁用" prop="readonly">
              <el-switch v-model="formData.disabled" :active-value=true :inactive-value=false></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="4">
          <el-form-item label="前端隐藏" prop="readonly">
            <el-switch v-model="formData.hidden" :active-value=true :inactive-value=false></el-switch>
          </el-form-item>
        </el-col>
      </div>
      <div>
        <el-row :gutter="10" v-if="formData.valueType ==0">
          <el-col :span="12">
            <el-form-item label="示例:">
              <el-input v-model="test.input" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="formData.valueType ==1">
          <el-col :span="12">
            <el-form-item label="示例:">
              <el-switch
                v-model="test.switchValue"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="formData.valueType ==2">
          <el-col :span="12">
            <el-form-item label="示例:">
              <el-input-number></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="formData.valueType ==3">
          <el-col :span="12">
            <el-form-item label="示例:">
              <el-date-picker
                v-model="test.time1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="formData.valueType ==4">
          <el-col :span="12">
            <el-form-item label="示例:">
              <el-date-picker
                v-model="test.time2"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="formData.valueType ==5">
          <el-col :span="12">
            <el-form-item label="示例:">
              <el-time-select
                v-model="test.time3"
                :picker-options="{start: '012:30',step: '00:15', end: '112:30'}"
                placeholder="选择时间">
              </el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="formData.valueType ==6">
          <el-col :span="12">
            <el-form-item label="示例:">
              <el-rate v-model="test.rateValue"></el-rate>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="formData.valueType ==7">
          <el-col :span="12">
            <el-form-item label="示例:">
              <el-radio v-model="test.radio" label="1">单选项1</el-radio>
              <el-radio v-model="test.radio" label="2">单选项2</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="formData.valueType ==8">
          <el-col :span="12">
            <el-form-item label="示例:">
              <el-checkbox v-model="test.checked1">多选框1</el-checkbox>
              <el-checkbox v-model="test.checked2">多选框2</el-checkbox>
              <el-checkbox v-model="test.checked3">多选框3</el-checkbox>
              <el-checkbox v-model="test.checked4">多选框4</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="formData.valueType ==9">
          <el-col :span="12">
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
      </div>
      <el-row v-if="showAddValues">
        <el-row
          v-for="(item, index) in values"
          :key="item.index"
          :gutter="10"
        >
          <el-col :span="11">
            <el-form-item label-width="10px" style="width:100%">
              <el-input v-model="item.label" placeholder="label"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label-width="10px" style="width:100%">
              <el-input v-model="item.value" placeholder="value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="10px" style="width:100%">
              <el-button
                v-if="index!=0"
                type="danger"
                icon="el-icon-remove-outline"
                @click="deleteRuleItem(index)"
              ></el-button>
              <el-button
                v-if="index==0"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="addRuleItem()"
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align: center">
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
      <el-button size="mini" @click="$emit('onCancel')">取消</el-button>
    </div>
  </div>
</template>
<script>
  function defaultData() {
    return {
      formData: {},
      dialogVisible: false,
      showAddValues: false,
      values: [{
        label: '',
        value: ''
      }],
      valueTypes: [
        {
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
        }
      ],
      test: {},
      formRules: {
        code: {required: true, trigger: "blur", massage: '必填'},
        name: {required: true, trigger: "blur", massage: '必填'},
        tagCode: {required: true, trigger: "blur", massage: '必填'},
        valueType: {type: 'number', required: true, trigger: "blur", massage: '必填'},
        precision: {type: 'number', required: true, trigger: "blur", massage: '必填'},
        min: {type: 'number', required: true, trigger: "blur", massage: '必填'},
        max: {type: 'number', required: true, trigger: "blur", massage: '必填'},
        step: {type: 'number', required: true, trigger: "blur", massage: '必填'},
      },
    }
  };
  export default {
    name: 'edit',
    props: ["merchantId", "merchantDomain","attrId"],
    data() {
      return {
        formData: {},
        dialogVisible: false,
        showAddValues: false,
        values: [{
          label: '',
          value: ''
        }],
        valueTypes: [
          {
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
          }
        ],
        test: {},
        formRules: {
          code: {required: true, trigger: "blur", massage: '必填'},
          name: {required: true, trigger: "blur", massage: '必填'},
          tagCode: {required: true, trigger: "blur", massage: '必填'},
          valueType: {type: 'number', required: true, trigger: "blur", massage: '必填'},
          precision: {type: 'number', required: true, trigger: "blur", massage: '必填'},
          min: {type: 'number', required: true, trigger: "blur", massage: '必填'},
          max: {type: 'number', required: true, trigger: "blur", massage: '必填'},
          step: {type: 'number', required: true, trigger: "blur", massage: '必填'},
          sort: {type: 'number', required: true, trigger: "blur", massage: '必填'},
        },
      }
    },
    methods: {
      defaultFormData() {
        return {
          tagId: '',
          tagName: '',
          tagCode: '',
          tagType: '',
          name: '',
          code: '',
          group: '',
          valueType: '',
          precision: undefined,
          min: undefined,
          max: undefined,
          step: undefined,
          readonly: false,
          disabled: false,
          required: false,
          value: '',
          attributes: {},
          remark: '',
          sort: 0,
          hidden:false
        };
      },
      clearForm() {
        this.formData = this.defaultFormData();
      },
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
      addRuleItem() {
        this.values.push({
          label: '',
          value: ''
        });
      },
      deleteRuleItem(index) {
        this.values.splice(index, 1);
      },
      handleSave() {
        let valueTypeFlag = false;
        if (this.formData.valueType == 7 || this.formData.valueType == 8 || this.formData.valueType == 9) {
          valueTypeFlag = true;
        }
        if (!valueTypeFlag) {
          this.values = [];
        }
        if (this.formData.valueType == 8) {
          this.formData.value = [];
        }
        if (this.values && this.values.length > 0) {
          let attributes = {};
          for (var i = 0; i < this.values.length; i++) {
            if (this.values[i].label && this.values[i].label != undefined && this.values[i].label != '') {
              attributes[this.values[i].value] = this.values[i].label;
            }
          }
          this.formData.attributes = attributes;

        }
        this.formData.merchantId = this.merchantId;
        this.formData.merchantDomain = this.merchantDomain;
        var validFlag = false;
        this.$refs["policyForm"].validate(valid => {
          if (!valid) {
            validFlag = true;
            return false;
          }
        });
        if (validFlag) {
          return;
        }
        this.$store
          .dispatch('qunarPolicyAttr/save',  this.formData)
          .then(() => {
            this.$emit("onSave");
          })
          .catch(error => {
            console.log(error);
          });
      },
      getOne() {
        if (this.attrId && this.attrId != '') {
          this.$store
            .dispatch("qunarPolicyAttr/getOne", this.attrId)
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
    },
    created() {
      this.clearForm();
      this.getOne();
    }
  }
</script>
<style>
  .el-input-number--mini {
    width: 100%;
  }
</style>
