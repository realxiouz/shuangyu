<template>
  <div>
    <el-form ref="jobConfigForm" size="mini" :model="formData" label-width="110px" :rules="formRules">
      <input type="hidden" v-model="formData.configId"/>
      <div>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="请选择标签:" prop="tagCode">
              <el-select
                v-model="formData.tagCode"
                clearable
                placeholder="标签编码"
                style="width: 100%"
                @change="tagCodeChange"
              >
                <el-option
                  v-for="item in jobTagData"
                  :key="item.tagCode"
                  :label="item.tagName"
                  :value="item.tagCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
        <el-row :gutter="10" v-if="formData.valueType ==12">
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
  export default {
    name: 'jobConfigEdit',
    props: ["jobConfigId", 'updateFlag'],
    data() {
      return {
        formData: {},
        dialogVisible: false,
        showAddValues: false,
        values: [{
          label: '',
          value: ''
        }],
        tagTypes: [
          {
            label: "工厂",
            value: 1
          }
        ],
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
            value: 12,
            label: '多选'
          },
          {
            value: 9,
            label: '选择器'
          }
        ],
        jobTagData: [],
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
        }
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
          sort: 0
        };
      },
      clearForm() {
        this.formData = this.defaultFormData();
      },
      loadJobConfigData() {
        if (this.jobConfigId && this.jobConfigId != '') {
          this.$store
            .dispatch("jobConfig/getOne", {jobConfigId: this.jobConfigId})
            .then(data => {
              if (data.code == 0) {
                this.formData = data.data;
                if (this.formData.valueType == 7 || this.formData.valueType == 12 || this.formData.valueType == 9) {
                  this.showAddValues = true;
                  this.values = [];
                } else {
                  this.showAddValues = false;
                }
                let attributes = this.formData.attributes;
                for (var attr in attributes) {
                  if (attributes[attr] != undefined && attributes[attr] != null && attributes[attr] != '') {
                    let value = {
                      label: attr,
                      value: attributes[attr]
                    };
                    this.values.push(value);
                  }
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      loadJobTagData() {
        this.$store
          .dispatch("jobTag/getList", {})
          .then(data => {
            this.jobTagData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      valueTypeChange(value) {
        if (value == 7 || value == 12 || value == 9) {
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
      tagCodeChange() {
        let tagCode = this.formData.tagCode;
        for (var i = 0; i < this.jobTagData.length; i++) {
          if (tagCode == this.jobTagData[i].tagCode) {
            this.formData.tagType = this.jobTagData[i].tagType;
            this.formData.tagName = this.jobTagData[i].tagName;
            this.formData.tagId = this.jobTagData[i].tagId;
          }
        }
      },
      handleSave() {
        let valueTypeFlag = false;
        if (this.formData.valueType == 7 || this.formData.valueType == 12 || this.formData.valueType == 9) {
          valueTypeFlag = true;
        }
        if (!valueTypeFlag) {
          this.values = [];
        }
        if (this.formData.valueType == 12) {
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
        var validFlag = false;
        this.$refs["jobConfigForm"].validate(valid => {
          if (!valid) {
            validFlag = true;
            return false;
          }
        });
        if (validFlag) {
          return;
        }
        let url = '';
        if (this.updateFlag) {
          url = 'jobConfig/updateOne';
        } else {
          url = 'jobConfig/addOne';
        }
        this.$store
          .dispatch(url, {jobConfigId: this.jobConfigId, jobConfig: this.formData})
          .then(() => {
            this.$emit("onSave");
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
    created() {
      this.clearForm();
      this.loadJobConfigData();
      this.loadJobTagData();
    },
  };

</script>
<style>
  .el-input-number--mini {
    width: 100%;
  }
</style>
