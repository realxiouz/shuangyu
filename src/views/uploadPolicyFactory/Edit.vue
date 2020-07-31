<template>
  <div class="page-form">
    <el-dialog :title="keyId ? copyFlag ? '复制政策管理' : '修改政策管理' : '添加政策管理'"  width="50%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="调度名称：" prop="schedulerName">
              <el-input placeholder="请输入调度名称" v-model="formData.schedulerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="定时策略：" prop="cron">
              <el-popover v-model="cronPopover">
                <vue-cron @change="handleCron" @close="cronPopover=false" i18n="cn"></vue-cron>
                <el-input placeholder="请输入定时策略" v-model="formData.cron" slot="reference" @click="cronPopover=true"></el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称：" prop="merchantId">
              <el-select
                style="width: 100%;"
                v-model="formData.merchantId"
                placeholder="请选择企业"
                filterable
                @change="handleFirm"
              >
                <el-option
                  v-for="item in firmData"
                  :key="item.firm.firmId"
                  :label="item.firm.firmName"
                  :value="item.firm.firmId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户账号：" prop="policyConfigId">
              <el-select
                style="width: 100%;"
                v-model="formData.policyConfigId"
                placeholder="请选择账号"
                filterable
              >
                <el-option
                  v-for="item in policyConfigData"
                  :key="item.policyConfigId"
                  :label="item.username"
                  :value="item.policyConfigId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-for="(item, index) in formData.jobConfigList" :key="index">
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 0 && item.inputType === 'text'">
              <el-input v-model="item.value" :placeholder="'请输入' + item.name" />
              <el-aside class="el-aside-red" v-if="item.remark" :title="item.remark">{{'* ' + item.remark}}</el-aside>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 0 && item.inputType === 'textarea'">
              <el-input v-model="item.value" :placeholder="'请输入' + item.name" type="textarea" :rows="3" />
              <el-aside class="el-aside-red" v-if="item.remark" :title="item.remark">{{'* ' + item.remark}}</el-aside>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 1">
              <el-switch v-model="item.value"></el-switch>
              <el-aside class="el-aside-red" v-if="item.remark" :title="item.remark">{{'* ' + item.remark}}</el-aside>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 2">
              <el-input-number v-model="item.value" :placeholder="'请输入' + item.name" :min="item.min" :max="item.max" :step="item.step" :precision="item.precision" style="width: 100%;" />
              <el-aside class="el-aside-red" v-if="item.remark" :title="item.remark">{{'* ' + item.remark}}</el-aside>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 3">
              <el-date-picker
                 v-model="item.value"
                 :format="item.format"
                 :placeholder="'请选择' + item.name"
                 type="date"
                 style="width: 100%;"
              >
              </el-date-picker>
              <el-aside class="el-aside-red" v-if="item.remark" :title="item.remark">{{'* ' + item.remark}}</el-aside>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 4">
              <el-date-picker
                 v-model="item.value"
                 :format="item.format"
                 :placeholder="'请选择' + item.name"
                 type="datetime"
                 style="width: 100%;"
              >
              </el-date-picker>
              <el-aside class="el-aside-red" v-if="item.remark" :title="item.remark">{{'* ' + item.remark}}</el-aside>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 5">
              <el-input  v-model="item.value" :placeholder="'请输入' + item.name" />
              <el-aside class="el-aside-red" v-if="item.remark" :title="item.remark">{{'* ' + item.remark}}</el-aside>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 60 || item.valueType === 62">
              <el-select
                 v-model="item.value"
                 :placeholder="'请选择' + item.name"
                 clearable
                 style="width: 100%"
              >
                <el-option
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name"
                  :value="attr.code"
                ></el-option>
              </el-select>
              <el-aside class="el-aside-red" v-if="item.remark" :title="item.remark">{{'* ' + item.remark}}</el-aside>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 61">
              <el-select
                 v-model="item.value"
                 :placeholder="'请选择' + item.name"
                 style="width: 100%"
                 multiple
              >
                <el-option
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name"
                  :value="attr.code"
                ></el-option>
              </el-select>
              <el-aside class="el-aside-red" v-if="item.remark" :title="item.remark">{{'* ' + item.remark}}</el-aside>
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
  export default {
    mixins: [MIXIN_EDIT],
    props: {
      copyFlag: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        actions: {
          getOne: 'jobScheduler/getOne',
          saveOne: null
        },
        rules: {
          schedulerName: [
            {required: true, message: "请输入调度名称"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            }
          ],
          cron: [
            {required: true, message: "请选择定时策略"}
          ],
          merchantId: [
            {required: true, message: "请选择企业名称"}
          ],
          policyConfigId: [
            {required: true, message: "请选择用户账号"}
          ]
        },
        firmData: [],
        policyConfigData: [],
        jobConfigArray: [],
        cronPopover: false
      };
    },
    watch: {
      visible(val) {
        if(val){
          this.loadFirm();
          this.loadJobConfig();
          if(this.keyId && this.copyFlag){
            this.actions.saveOne = "jobScheduler/addOneXxl";
          }else if(this.keyId && !this.copyFlag){
            this.actions.saveOne = "jobScheduler/updateOne";
          }else{
            this.actions.saveOne = "jobScheduler/addOneXxl";
          }
        }
      }
    },
    methods: {
      loadFirm(){
        this.$store
          .dispatch("firm/getConfigList", {})
          .then(data => {
            this.firmData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadQunarPolicyConfig(firmId){
        this.$store
          .dispatch("qunarPolicyConfig/getList", {firmId: firmId})
          .then(data => {
              this.policyConfigData = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadJobConfig(){
        let that = this;
        that.$store
          .dispatch("jobConfig/getList", {tagCode: "policy"})
          .then(data => {
            let timer = window.setTimeout(function(){
              that.formData.jobConfigList = data;
              that.setValues();
              window.clearTimeout(timer);
            }, 300);
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleFirm(val){
        if(val){
          this.loadQunarPolicyConfig(val);
        }
      },
      handleSwitch(){
        this.defaultFlag = !this.defaultFlag;
      },
      handleCron(val) {
        console.log(val);
        this.formData.cron = val
      },
      beforeSave(data) {
        let formObj = {};
        if(null === data.status || '' === data.status){
          data.status = 0
        }
        let tag = this.formData.jobConfigList[0];
        let jobConfigArray = data.jobConfigList;
        jobConfigArray.push({
          code: "merchantId",
          name: "授权企业",
          value: this.formData.merchantId,
          type: "String"
        });
        jobConfigArray.push({
          code: "policyConfigId",
          name: "平台配置",
          value: this.formData.policyConfigId,
          type: "String"
        });
        data.params = this.getValues(jobConfigArray);
        data.tagId = tag.tagId;
        data.tagCode = tag.tagCode;
        data.tagName = tag.tagName;
        data.tagType = tag.tagType;
        if(this.copyFlag){
          data.schedulerId = null;
        }
        if(this.keyId && !this.copyFlag){
          formObj = data;
        }else{
          let xxlJobGroup = {
            appName: 'policy-provider',
            addressType: 0,
            title: '政策执行器'
          };
          let xxlJobInfo = {
            jobDesc: data.schedulerName,
            jobCron: data.cron,
            executorHandler: 'uploadPolicyJobHandler'
          };
          formObj.xxlJobGroup = xxlJobGroup;
          formObj.xxlJobInfo = xxlJobInfo;
          formObj.jobScheduler = data;
        }
        return {
          jobScheduler: formObj,
          jobSchedulerId: data.schedulerId
        };
      },
      beforeLoadData(data) {
        data.merchantId = null;
        data.policyConfigId = null;
        data.jobConfigList = [];
        return data;
      },
      setValues(){
        let that = this;
        that.formData.jobConfigList.forEach(function(jobConfig){
          that.formData.params.forEach(function(param){
            if(param.code === 'merchantId'){
              that.formData.merchantId = param._string;
              that.loadQunarPolicyConfig(that.formData.merchantId)
            }else if(param.code === 'policyConfigId'){
              that.formData.policyConfigId = param._string;
            }else if(jobConfig.code === param.code){
              switch (param.type) {
                case "Date":
                  jobConfig.value = that.$moment(param._string).toDate();
                  break;
                case "ArrayList":
                  jobConfig.value = param._array;
                  break;
                case "Boolean":
                  jobConfig.value = param._bool;
                  break;
                case "Byte":
                  jobConfig.value = param._byte;
                  break;
                case "Short":
                  jobConfig.value = param._short;
                  break;
                case "Integer":
                  jobConfig.value = param._int;
                  break;
                case "Long":
                  jobConfig.value = param._long;
                  break;
                case "Float":
                  jobConfig.value = param._float;
                  break;
                case "Double":
                  jobConfig.value = param._double;
                  break;
                case "String":
                  jobConfig.value = param._string;
                  break;
              }
            }
          });
        });
      },
      getValues(jobConfigList) {
        let that = this;
        let params = [];
        jobConfigList.forEach(function(obj){
          params.push(that.getPropertyItem(obj));
        });
        return params;
      },
      getPropertyItem(property) {
        const {code, name, type, value, hidden} = property;
        let item = {code, name, type, _string: value + '', hidden};
        switch (property.type) {
          case "Date":
            item._string = this.$moment(property.value).format(property.format);
            item._date = this.$moment(property.value).toDate();
            item._long = this.$moment(property.value).valueOf();
            break;
          case "ArrayList":
            item._array = property.value;
            break;
          case "Boolean":
            item._bool = property.value;
            break;
          case "Byte":
            item._byte = property.value;
            break;
          case "Short":
            item._short = property.value;
            break;
          case "Integer":
            item._int = property.value;
            break;
          case "Long":
            item._long = property.value;
            break;
          case "Float":
            item._float = property.value;
            break;
          case "Double":
            item._double = property.value;
            break;
          case "String":
            item._string = property.value;
            break;
          default:
            break;
        }
        return item;
      },
      defaultFormData() {
        return {
          schedulerId: null,
          schedulerName: null,
          jobInfoId: null,
          firmId: null,
          firmName: null,
          params: [],
          status: null,
          cron: null,
          tagId: null,
          tagName: null,
          tagCode: null,
          tagType: null,
          merchantId: null,
          policyConfigId: null,
          jobConfigList: []
        };
      }
    }
  };
</script>

<style>
  .el-aside-red{
    width: 100%;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    color: #0e9aff;
    font-size: 12px;
    cursor: help;
  }
</style>
