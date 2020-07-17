<template>
  <div class="page-form">
    <el-form ref="jobConfigForm" size="mini" :model="formData" label-width="110px">
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
            <el-form-item label="属性名称" prop="name">
              <el-input placeholder="请输入属性名称" v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属性编码" prop="code">
              <el-input placeholder="请输入属性编码" v-model="formData.code"></el-input>
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
                @change="handleValueTypeChange"
              >
                <el-option
                  v-for="item in valueTypes"
                  :key="item.code"
                  :label="item.value"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <template v-if="formData.valueType==0">
            <el-col :span="12">
              <el-form-item label="类型">
                <el-select v-model="formData.inputType" placeholder="选中输入类型">
                  <el-option label="输入框" value="text"></el-option>
                  <el-option label="文本域" value="textarea"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="最大长度">
                <el-input v-model="formData.length" placeholder="文本最大长度" />
              </el-form-item>
            </el-col>
          </template>
          <template v-if="formData.valueType==2">
            <el-col :span="24" >
              <el-form-item label="取值范围">
                <el-col :span="11">
                  <el-input placeholder="最小值" v-model="formData.min" type="number"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input placeholder="最大值" v-model="formData.max" type="number"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="步长" prop="step">
                <el-input placeholder="请输入步长" v-model="formData.step" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="数字类型">
                <el-select v-model="formData.type" placeholder="选中数字类型">
                  <el-option label="Byte" value="Byte"></el-option>
                  <el-option label="Short" value="Short"></el-option>
                  <el-option label="Integer" value="Integer"></el-option>
                  <el-option label="Long" value="Long"></el-option>
                  <el-option label="Float" value="Float"></el-option>
                  <el-option label="Double" value="Double"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <template v-if="formData.valueType==3||formData.valueType==4">
            <el-col :span="24">
              <el-form-item label="时间格式">
                <el-input v-model="formData.format" placeholder="输入时间格式,例如YYYY-MM-DD" />
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="formData.valueType==3">
              <el-form-item label="类型">
                <el-select v-model="formData.inputType" placeholder="选中输入类型">
                  <el-option label="日期" value="date"></el-option>
                  <el-option label="日期时间" value="datetime"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="24" v-if="formData.valueType>6">
            <el-form-item label="属性项">
              <el-col :span="24">
                <el-row type="flex" justify="space-between">
                  <el-col :span="9">
                    属性编码
                    <el-tooltip placement="top-start" effect="light">
                      <div slot="content">支持整型，取值范围：-2147483648 ~ 2147483647</div>
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="2"></el-col>
                  <el-col :span="9">
                    属性描述
                    <el-tooltip placement="top" effect="light">
                      <div slot="content">
                        支持中文、英文大小写、数字下划线
                        <br />和短划线，必须以中文、英文或数字
                        <br />开头，不超过20个字符
                      </div>
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="4"></el-col>
                </el-row>
              </el-col>
              <el-col :span="24">
                <el-row
                  class="attributes"
                  type="flex"
                  justify="space-between"
                  v-for="(item,index) in formData.attributes"
                  :key="index"
                >
                  <el-col :span="9">
                    <el-form-item class="attr-item" :key="item.key">
                      <el-input placeholder="编号" v-model="item.code" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="2" class="line">~</el-col>
                  <el-col :span="9">
                    <el-form-item :key="item.key">
                      <el-input placeholder="描述" v-model="item.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="line">
                    <el-link type="primary" @click="delItem(index)">删除</el-link>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="24">
                <el-link type="primary" @click="addItem">+添加属性项</el-link>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.valueType==62">
            <el-form-item label="是否多选">
              <el-switch v-model="formData.multiple" :active-value="true" :inactive-value="false"
                         @change="handleMultipleChange"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否只读">
              <el-switch v-model="formData.readonly" :active-value="true" :inactive-value="false"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否必填">
              <el-switch v-model="formData.required" :active-value="true" :inactive-value="false"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否前端隐藏">
              <el-switch v-model="formData.hidden" :active-value="true" :inactive-value="false"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input placeholder="请输入描述" type="textarea" v-model="formData.remark" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div slot="footer" style="text-align: center">
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
      <el-button size="mini" @click="$emit('onCancel')">取消</el-button>
    </div>
  </div>
</template>
<script>
  import { PROPERTY_TABLE } from '@/utils/const'
  export default {
    name: 'jobConfigEdit',
    props: ["jobConfigId", 'updateFlag'],
    data() {
      return {
        formData: {},
        dialogVisible: false,
        valueTypes: PROPERTY_TABLE,
        jobTagData: []
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
          max: null,
          min: null,
          precision: null,
          step: null,
          unit: "",
          inputType: "",
          type: "String",
          readonly: false,
          hidden: false,
          multiple: false,
          required: false,
          attributes: [],
          callType: 0,
          eventType: 0,
          input: "",
          inputParams: [],
          output: "",
          outputParams: [],
          remark: "",
          sort: ""
        };
      },
      clearForm(){
        this.formData = this.defaultFormData();
      },
      loadJobConfigData() {
        if (this.jobConfigId && this.jobConfigId != '') {
          this.$store
            .dispatch("jobConfig/getOne", {jobConfigId: this.jobConfigId})
            .then(data => {
              this.formData = data;
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
      handleValueTypeChange(value) {
        switch (value) {
          case 0:
            this.formData.type = "String";
            break;
          case 1:
            this.formData.type = "Boolean";
            break;
          case 2:
            this.formData.type = "Integer";
            break;
          case 3:
          case 4:
            this.formData.type = "Date";
            break;
          case 5:
            this.formData.type = "Float";
            break;
          case 60:
            this.formData.type = "String";
            break;
          case 61:
            this.formData.type = "ArrayList";
            this.formData.multiple = true;
            break;
          case 62:
            this.formData.multiple = false;
            this.formData.type = "String";
        }
        console.log(value)
      },
      addItem() {
        this.formData.attributes.push({ code: "", name: "" });
      },
      delItem(index) {
        this.formData.attributes.splice(index, 1);
      },
      handleMultipleChange(val) {
        this.formData.type = val ? 'ArrayList' : 'String'
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
