<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改政策参数管理' : '添加政策参数管理'"  width="50%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-row class="el-row-item">
          <el-col :span="12">
            <el-form-item label="排列序号：" prop="sort">
              <el-input-number v-model="formData.sort" placeholder="请输入排列序号" :min="1" :step="1" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开放平台：" prop="openId">
              <el-select
                v-model="formData.openId"
                clearable
                placeholder="请选择开放平台"
                style="width: 100%"
                @change="handleOpenData"
              >
                <el-option
                  v-for="item in openList"
                  :key="item.openId"
                  :label="item.openName"
                  :value="item.openId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属性编码：" prop="code">
              <el-input v-model="formData.code" placeholder="请输入属性编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属性名称：" prop="name">
              <el-input v-model="formData.name" placeholder="请输入属性名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据类型：" prop="valueType">
              <el-select
                v-model="formData.valueType"
                clearable
                placeholder="请选择数据类型"
                style="width: 100%"
                @change="handleValueType"
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
          <el-col :span="12">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-input v-model="formData.defaultValue" placeholder="请输入默认数值" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 0">
            <el-form-item label="文本类型：" prop="inputType">
              <el-select
                v-model="formData.inputType"
                clearable
                placeholder="请选择文本类型"
                style="width: 100%"
                @change="handleInputType"
              >
                <el-option label="输入框" value="text"></el-option>
                <el-option label="文本域" value="textarea"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 0">
            <el-form-item label="文本长度：" prop="length">
              <el-input-number v-model="formData.length" placeholder="请输入文本长度" :min="0" :step="1" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 2">
            <el-form-item label="最小数值：" prop="min">
              <el-input-number v-model="formData.min" placeholder="请输入最小数值" :min="0" :step="1" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 2">
            <el-form-item label="最大数值：" prop="max">
              <el-input-number v-model="formData.max" placeholder="请输入最大数值" :min="0" :step="1" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 2">
            <el-form-item label="步长数值：" prop="step">
              <el-input-number v-model="formData.step" placeholder="请输入步长数值" :min="0" :step="1" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 2">
            <el-form-item label="精度数值：" prop="precision">
              <el-input-number v-model="formData.precision" placeholder="请输入精度数值" :min="0" :step="1" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 2">
            <el-form-item label="数字类型：" prop="type">
              <el-select
                v-model="formData.type"
                clearable
                placeholder="请选择数字类型"
                style="width: 100%"
                @change="handleType"
              >
                <el-option label="Byte" value="Byte"></el-option>
                <el-option label="Short" value="Short"></el-option>
                <el-option label="Integer" value="Integer"></el-option>
                <el-option label="Long" value="Long"></el-option>
                <el-option label="Float" value="Float"></el-option>
                <el-option label="Double" value="Double"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 3">
            <el-form-item label="日期类型：" prop="dateType">
              <el-select
                v-model="formData.dateType"
                clearable
                placeholder="请选择日期类型"
                style="width: 100%"
                @change="handleDateType"
              >
                <el-option label="日期" value="date"></el-option>
                <el-option label="日期时间" value="datetime"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.valueType === 3">
            <el-form-item label="日期格式：" prop="format">
              <el-input v-model="formData.format" placeholder="请输入日期格式" readonly disabled />
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.valueType === 4">
            <el-form-item label="时间格式：" prop="format">
              <el-input v-model="formData.format" placeholder="请输入时间格式" readonly disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="formData.valueType === 62">
            <el-form-item label="是否多选：">
              <el-switch v-model="formData.multiple" :active-value="true" :inactive-value="false" @change="handleMultipleChange"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="el-row-item" v-if="formData.valueType === 60 || formData.valueType === 61 || formData.valueType === 62">
          <el-row
            id="attributeCode"
            v-for="(attribute, index) in formData.attributes"
            :gutter="10"
            :key="attribute.id"
          >
            <el-col :span="10">
              <el-form-item label="标签编码：">
                <el-input v-model="attribute.code" placeholder="请输入标签编码" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="标签描述：">
                <el-input v-model="attribute.name" placeholder="请输入标签描述" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="3px">
                <el-button
                  v-if="index === 0"
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="addAttributes"
                ></el-button>
                <el-button
                  v-if="index !== 0"
                  type="danger"
                  icon="el-icon-remove-outline"
                  @click="deleteAttributes(index)"
                ></el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>

        <el-row class="el-row-item">
          <el-col :span="6">
            <el-form-item label="是否必填：" prop="required">
              <el-switch v-model="formData.required" @click="handleRequired"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否只读：" prop="readonly">
              <el-switch v-model="formData.readonly" @click="handleReadonly"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否禁用：" prop="disabled">
              <el-switch v-model="formData.disabled" @click="handleDisabled"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否隐藏：" prop="hidden">
              <el-switch v-model="formData.hidden" @click="handleHidden"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="el-row-item">
          <el-col :span="24">
            <el-form-item label="备注内容：" prop="remark">
              <el-input
                v-model="formData.remark"
                type="textarea"
                placeholder="请输入备注内容"
                :rows="3"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="el-row-item" v-if="formData.checkPolicyTags">
          <el-col :span="24">
            <el-form-item label="政策类型：" prop="checkedPolicyTags">
              <el-checkbox :indeterminate="formData.isIndeterminate" v-model="formData.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="formData.checkedPolicyTags" @change="handleCheckedChange">
                <el-checkbox v-for="checkPolicy in formData.checkPolicyTags" :label="checkPolicy" :key="checkPolicy">{{checkPolicy}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {MIXIN_EDIT} from "@/utils/mixin";
  import { PROPERTY_TABLE } from '@/utils/const';
  export default {
    mixins: [MIXIN_EDIT],
    props: {
      orderSort: {
        type: Number,
        default: 1
      }
    },
    data() {
      const numberValidator = (rule, value, callback) => {
        let reg = /^[0-9]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入数字！"));
        }
      };
      const codeValidator = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z_]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入字母或数字！"));
        }
      };
      return {
        dialogVisible: false,
        codeEnable: false,
        actions: {
          getOne: 'openPolicyAttr/getOne',
          saveOne: 'openPolicyAttr/saveOne'
        },
        openList: [],
        queryPolicyTags: [],
        backupPolicyTags: [
          {
            value: 'ONE_WAY_GENERAL_POLICY',
            label: '单程普通政策'
          },
          {
            value: 'ONE_WAY_SPECIAL_POLICY',
            label: '单程特价政策'
          },
          {
            value: 'ONE_WAY_APPLY_POLICY',
            label: '单程申请政策'
          },
          {
            value: 'ONE_WAY_PAY_POLICY',
            label: '单程预付政策'
          },
          {
            value: 'ONE_WAY_CHANGE_POLICY',
            label: '单程包机切位政策'
          },
          {
            value: 'RETURN_SPECIAL_POLICY',
            label: '往返特价政策'
          },
          {
            value: 'RETURN_PAY_POLICY',
            label: '往返预付政策'
          },
          {
            value: 'RETURN_GENERAL_POLICY',
            label: '往返普通政策'
          },
          {
            value: 'RETURN_CHANGE_POLICY',
            label: '往返包机切位政策'
          },
          {
            value: 'ALL_ONE_WAY_POLICY',
            label: '所有单程类型'
          },
          {
            value: 'ALL_RETURN_POLICY',
            label: '所有往返类型'
          },
          {
            value: 'NEW_ONE_WAY_CHANGE_POLICY',
            label: '新包机切位单程'
          }
        ],
        valueTypes: PROPERTY_TABLE,
        rules: {
          sort: [
            {required: true, message: "请输入排列序号"},
            {validator: numberValidator, trigger: 'blur'}
          ],
          openId: [
            {required: true, message: "请选择开放平台"},
          ],
          code: [
            {required: true, message: "请输入属性编码"},
            {
              min: 1,
              max: 30,
              message: "长度在 1到 30 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          name: [
            {required: true, message: "请输入属性名称"},
            {
              min: 1,
              max: 30,
              message: "长度在 1到 30 个字符"
            }
          ],
          valueType: [
            {required: true, message: "请选择数据类型"}
          ],
          checkedPolicyTags: [
            {required: true, message: "请选择政策类型"}
          ]
        }
      };
    },
    methods: {
      loadOpenData(){
        this.$store.dispatch('openPlatform/getList', {})
          .then(data => {
            this.openList = data;
          });
      },
      handleOpenData(val){
        if(val){
          let that = this;
          that.openList.forEach(function(obj){
            if(val === obj.openId){
              that.formData.openName = obj.openName;
            }
          });
        }
      },
      handleValueType(val){
        if(val){
          this.formData.valueType = val;

          if(this.formData.valueType === 3){
            this.formData.dateType = 'date';
            this.formData.format = 'yyyy-MM-dd';
          }else if(this.formData.valueType === 4){
            this.formData.format = 'HH:mm:ss';
          }
        }
        switch (val) {
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
            this.formData.multiple = false;
            break;
          case 61:
            this.formData.type = "ArrayList";
            this.formData.multiple = true;
            break;
          case 62:
            this.formData.multiple = false;
            this.formData.type = "String";
            break;
          default:
            break;
        }
      },
      handleInputType(val){
        if(val){
          this.formData.inputType = val;
        }
      },
      handleType(val){
        if(val){
          this.formData.type = val;
        }
      },
      handleDateType(val){
        if(val){
          this.formData.dateType = val;
          if(val === 'date'){
            this.formData.format = 'yyyy-MM-dd';
          }else if(val === 'datetime'){
            this.formData.format = 'yyyy-MM-dd HH:mm:ss';
          }
        }
      },
      handleMultipleChange(val) {
        this.formData.type = val ? 'ArrayList' : 'String'
      },
      handleCheckAllChange(flag) {
        this.formData.checkedPolicyTags = flag ? this.formData.checkPolicyTags : [];
        this.formData.isIndeterminate = flag;
        this.handleCheckFill();
      },
      handleCheckedChange(val) {
        let checkedCount = val.length;
        this.formData.checkAll = checkedCount === this.formData.checkPolicyTags.length;
        this.formData.isIndeterminate = checkedCount > 0 && checkedCount < this.formData.checkPolicyTags.length;
        this.formData.checkedPolicyTags = val;
        this.handleCheckFill();
      },
      handleCheckFill(){
        let that = this;
        that.formData.policyTags = [];
        if(that.formData.checkedPolicyTags && that.formData.checkedPolicyTags.length > 0){
          that.formData.checkedPolicyTags.forEach(function(value){
            that.backupPolicyTags.forEach(function(backupPolicyTag){
              if(value === backupPolicyTag.label){
                that.formData.policyTags.push(backupPolicyTag.value);
              }
            });
          });
        }
      },
      handleRequired(){
        this.formData.required = !this.formData.required;
      },
      handleReadonly(){
        this.formData.readonly = !this.formData.readonly;
      },
      handleDisabled(){
        this.formData.disabled = !this.formData.disabled;
      },
      handleHidden(){
        this.formData.hidden = !this.formData.hidden;
      },
      addAttributes(){
        let index = this.formData.attributes.length;
        this.formData.attributes.push({
          id: index + 1,
          code: null,
          name: null
        });
      },
      deleteAttributes(index){
        if(index){
          this.formData.attributes.splice(parseInt(index), 1);
        }
      },
      validateOther(){
        let flag = true;
        let msg = '';

        if(this.formData.valueType === 0){
          if(!this.formData.inputType){
            flag = false;
            msg = '请输入文本类型';
          }
          if(!this.formData.length){
            flag = false;
            msg = '请输入文本长度';
          }
        }

        if(this.formData.valueType === 2){
          if(null === this.formData.min || '' === this.formData.min){
            flag = false;
            msg = '请输入最小数值';
          }
          if(null === this.formData.max || '' === this.formData.max){
            flag = false;
            msg = '请输入最大数值';
          }
          if(null === this.formData.step || '' === this.formData.step){
            flag = false;
            msg = '请输入步长数值';
          }
          if(null === this.formData.precision || '' === this.formData.precision){
            flag = false;
            msg = '请输入精度数值';
          }
          if(!this.formData.type){
            flag = false;
            msg = '请选择数字类型';
          }
        }

        if(this.formData.valueType === 3){
          if(!this.formData.format){
            flag = false;
            msg = '请输入日期格式';
          }
          if(!this.formData.dateType){
            flag = false;
            msg = '请选择日期类型';
          }
        }

        if(this.formData.valueType === 4){
          if(!this.formData.format){
            flag = false;
            msg = '请输入时间格式';
          }
        }

        if(this.formData.attributes && this.formData.attributes.length > 0){
          if(this.formData.valueType === 60 || this.formData.valueType === 61 || this.formData.valueType === 62){
            let attributes = this.formData.attributes;
            attributes.forEach(function(obj){
              if(!obj.name){
                flag = false;
                msg = '请输入标签描述';
              }
              if(!obj.code){
                flag = false;
                msg = '请输入标签编码';
              }
            });
          }else{
            this.formData.attributes = null;
          }
          if(this.formData.valueType === 62){
            if(null === this.formData.multiple || '' === this.formData.multiple){
              flag = false;
              msg = '请选择是否多选';
            }
          }
        }

        if(!flag){
          this.$message({type: "warning", message: msg});
        }
        return flag;
      },
      beforeLoadData(data){
        let that = this;
        if(data.type === 'Date' && data.format === 'yyyy-MM-dd'){
          data.dateType = 'date';
        }else if(data.type === 'Date' && data.format === 'yyyy-MM-dd HH:mm:ss'){
          data.dateType = 'datetime';
        }
        data.isIndeterminate = that.defaultFormData().isIndeterminate;
        data.checkAll = that.defaultFormData().checkAll;
        data.checkedPolicyTags = that.defaultFormData().checkedPolicyTags;
        data.checkPolicyTags = that.defaultFormData().checkPolicyTags;
        if(data && data.policyTags && data.policyTags.length > 0){
          that.queryPolicyTags = [];
          data.policyTags.forEach(function(value){
            that.backupPolicyTags.forEach(function(backupPolicyTag){
              if(value === backupPolicyTag.value){
                that.queryPolicyTags.push(backupPolicyTag.label);
              }
            });
          });
        }
        if(!data.attributes){
          data.attributes = that.defaultFormData().attributes;
        }
        return data;
      },
      afterLoadData(){
        this.handleCheckedChange(this.queryPolicyTags);
      },
      defaultFormData() {
        return {
          policyAttrId: null,
          openId: null,
          openName: null,
          policyTags: [],
          sort: this.orderSort,
          code: null,
          name: null,
          valueType: null,
          type: null,
          defaultValue: null,
          inputType: null,
          length: 0,
          min: -999,
          max: 1,
          step: 1,
          precision: 0,
          format: null,
          attributes: [
            {
              id: 1,
              code: null,
              name: null
            }
          ],
          remark: null,
          required: false,
          readonly: false,
          disabled: false,
          hidden: false,
          multiple: false,
          merchantId: null,
          isIndeterminate: false,
          checkAll: false,
          checkedPolicyTags: [],
          checkPolicyTags: [
            '单程普通政策',
            '单程特价政策',
            '单程申请政策',
            '单程预付政策',
            '单程包机切位政策',
            '往返特价政策',
            '往返预付政策',
            '往返普通政策',
            '往返包机切位政策',
            '所有单程类型',
            '所有往返类型',
            '新包机切位单程'
          ]
        };
      }
    },
    created() {
      this.loadOpenData();
    }
  };
</script>

<style>
  .el-row-item{
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-bottom: 20px;
    padding: 20px 20px 0 0;
  }
</style>
