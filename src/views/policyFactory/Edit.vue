<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改政策管理' : '添加政策管理'"  width="50%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
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
          <el-col :span="12" v-for="(item, index) in formData.jobConfigList" :key="index">
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 0 && item.inputType === 'text'">
              <el-input v-model="item.value" :placeholder="'请输入' + item.name" />
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 0 && item.inputType === 'textarea'">
              <el-input v-model="item.value" :placeholder="'请输入' + item.name" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 1">
              <el-switch v-model="item.value"></el-switch>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 2">
              <el-input-number v-model="item.value" :placeholder="'请输入' + item.name" :min="item.min" :max="item.max" :step="item.step" :precision="item.precision" style="width: 100%;" />
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
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 5">
              <el-time-picker
                 v-model="item.value"
                 :format="item.format"
                 :placeholder="'请选择' + item.name"
                 style="width: 100%;"
              >
              </el-time-picker>
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 6">
              <el-input  v-model="item.value" :placeholder="'请输入' + item.name" />
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 7">
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
            </el-form-item>
            <el-form-item :label="item.name + '：'" :prop="'jobConfigList.' + index + '.value'" :rules="[{ required: item.required, message: '请输入' + item.name, trigger: 'change' }]" v-if="item.valueType === 8">
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
    data() {
      return {
        dialogVisible: false,
        actions: {
          getOne: 'jobScheduler/getOne',
          saveOne: this.getJobMethod()
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
            {required: true, message: "请选择定时策略"},
          ]
        },
        cronPopover: false
      };
    },
    watch: {
      visible(val) {
        if(val){
          this.loadJobConfig();
        }
      }
    },
    methods: {
      getJobMethod(){
        let method;
        if(this.keyId){
          method = "jobScheduler/updateOne";
        }else{
          method = "jobScheduler/addOneXxl";
        }
        return method;
      },
      loadJobConfig(){
        this.$store
          .dispatch("jobConfig/getList", {tagCode: "policy"})
          .then(data => {
            this.formData.jobConfigList = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSwitch(){
        this.defaultFlag = !this.defaultFlag;
      },
      handleCron(val) {
        this.formData.cron = val
      },
      beforeLoadData(data) {
        if(data){
          console.log(data);
        }
        return data;
      },
      beforeSave(data) {
        let formData = {};
        if(null === data.status || '' === data.status){
          data.status = 0
        }
        let tag = this.formData.jobConfigList[0];
        data.params = this.getValues(data.jobConfigList);
        data.tagId = tag.tagId;
        data.tagCode = tag.tagCode;
        data.tagName = tag.tagName;
        data.tagType = tag.tagType;
        if(this.keyId){
          formData = data;
        }else{
          let xxlJobGroup = {
            appName: 'policy-provider',
            addressType: 0,
            title: '政策执行器'
          };
          let xxlJobInfo = {
            jobDesc: data.schedulerName,
            jobCron: data.cron,
            executorHandler: 'policyJobHandler'
          };
          formData.xxlJobGroup = xxlJobGroup;
          formData.xxlJobInfo = xxlJobInfo;
          formData.jobScheduler = data;
        }
        return {
          jobScheduler: formData,
          jobSchedulerId: data.schedulerId
        };
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
          jobConfigList: []
        };
      }
    }
  };
</script>
