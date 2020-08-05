<template>
  <div class="page-form">
    <el-dialog :title="'设置政策参数管理'"  width="50%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-row class="el-row-item">
          
          <el-col :span="12">
            <el-form-item label="属性名称：" prop="name">
              <el-input v-model="formData.name" placeholder="请输入属性名称" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="el-row-item">
          <el-col :span="12">
            <el-form-item label="数据类型：" prop="valueType">
              <el-select
                v-model="formData.valueType"
                style="width: 100%"
                :disabled="true"
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
          <el-col :span="12" v-if="formData.valueType === 0 && formData.inputType === 'text'">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-input v-model="formData.defaultValue" placeholder="请输入默认数值" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 0 && formData.inputType === 'textarea'">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-input v-model="formData.defaultValue" placeholder="请输入默认数值" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="formData.valueType === 1">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-switch v-model="formData.defaultValue" @click="handleValue"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 2">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-input-number v-model="formData.defaultValue" placeholder="请输入默认数值" :min="formData.min" :max="formData.max" :step="formData.step" :precision="formData.precision" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 3">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-date-picker
                v-model="formData.defaultValue"
                :format="formData.format"
                type="date"
                placeholder="请选择默认数值"
                style="width: 100%;"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 4">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-time-picker
                v-model="formData.defaultValue"
                :format="formData.format"
                placeholder="请选择默认数值"
                style="width: 100%;"
              >
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 5">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-input v-model="formData.defaultValue" placeholder="请输入默认数值" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 60 || formData.valueType === 62">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-select
                v-model="formData.defaultValue"
                placeholder="请选择默认数值"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="item in formData.attributes"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.valueType === 61">
            <el-form-item label="默认数值：" prop="defaultValue">
              <el-select
                v-model="formData.defaultValue"
                placeholder="请选择默认数值"
                style="width: 100%"
                multiple
              >
                <el-option
                  v-for="item in formData.attributes"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="el-row-item">
          <el-col :span="6">
            <el-form-item label="是否必填：" prop="required">
              <el-switch v-model="formData.required" :disabled="true"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否只读：" prop="readonly">
              <el-switch v-model="formData.readonly" :disabled="true"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否禁用：" prop="disabled">
              <el-switch v-model="formData.disabled" :disabled="true"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否隐藏：" prop="hidden">
              <el-switch v-model="formData.hidden" :disabled="true"></el-switch>
            </el-form-item>
          </el-col>
        </el-row> 

        <el-row class="el-row-item" v-if="formData.checkPolicyTags">
          <el-col :span="24">
            <el-form-item label="政策类型：" prop="checkedPolicyTags">
              <el-checkbox :indeterminate="formData.isIndeterminate" v-model="formData.checkAll" :disabled="true">全选</el-checkbox>
              <el-checkbox-group v-model="formData.checkedPolicyTags">
                <el-checkbox v-for="checkPolicy in formData.checkPolicyTags" :label="checkPolicy" :key="checkPolicy" :disabled="true">{{checkPolicy}}</el-checkbox>
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
    data() {
      return {
        dialogVisible: false,
        codeEnable: false,
        actions: {
          getOne: 'openPolicyAttr/getOne',
          saveOne: 'qunarPolicyAttr/save'
        },
        firmId: null,
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

        }
      };
    },
    methods: {
      loadQunarPolicyAttr(){
        this.$store.dispatch('qunarPolicyAttr/getList', {code: this.formData.code})
          .then(data => {
            if(data && data.length > 0 && data[0].defaultValue){
              this.formData.defaultValue = data[0].defaultValue;
            }
          });
      },
      handleValue(){
        this.formData.defaultValue = !this.formData.defaultValue;
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
      beforeLoadData(data){
        let that = this;
        data.isIndeterminate = that.defaultFormData().isIndeterminate;
        data.checkAll = that.defaultFormData().checkAll;
        data.checkedPolicyTags = that.defaultFormData().checkedPolicyTags;
        data.checkPolicyTags = that.defaultFormData().checkPolicyTags;
        if(data && data.policyTags && data.policyTags.length > 0){
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
        if(data.valueType === 8 && data.defaultValue){
          data.defaultValue = [data.defaultValue];
        }
        return data;
      },
      afterLoadData(){
        this.loadQunarPolicyAttr();
        this.handleCheckedChange(this.queryPolicyTags);
      },
      beforeSave(data) {
        data.forEach(function(obj){

        });
        return data;
      },
      defaultFormData() {
        return {
          policyAttrId: null,
          sort: null,
          firmId: null,
          merchantId: null,
          policyTags: [],
          code: null,
          name: null,
          valueType: null,
          defaultValue: null,
          inputType: null,
          length: 0,
          min: 0,
          max: 0,
          step: 0,
          precision: 0,
          format: null,
          attributes: [
            {
              code: null,
              name: null
            }
          ],
          remark: null,
          required: false,
          readonly: false,
          disabled: false,
          hidden: false,
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
