<template>
  <div class="page-form">
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="调度名称" prop="schedulerName">
            <el-input placeholder="调度名称" v-model="formData.schedulerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="定时策略" prop="cron">
            <el-popover v-model="formData.cronPopover">
              <vue-cron @change="changeCron" @close="formData.cronPopover=false" i18n="cn"></vue-cron>
              <el-input slot="reference" @click="formData.cronPopover=true" v-model="formData.cron"
                        placeholder="请输入定时策略"></el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-for="(item, index) in formData.params" :key="index">
          <el-form-item :label="item.name" :prop="item.code">
            <!-- 数据类型（0文本，1开关，2数字，3日期，4日期时间，5时间，6评分，7单选，8多选，9选择器）-->
            <el-input v-if="item.valueType ==0" v-model="item.value"></el-input>
            <!-- 开关-->
            <el-switch v-if="item.valueType ==1" v-model="item.value"></el-switch>
            <!-- 数字-->
            <el-input-number v-if="item.valueType ==2" v-model.number="item.value"
                             :precision="item.precision"></el-input-number>
            <!-- 日期-->
            <el-date-picker v-if="item.valueType ==3" v-model="item.value" type="date"
                            placeholder="选择日期"></el-date-picker>
            <!-- 日期时间-->
            <el-date-picker v-if="item.valueType ==4" v-model="item.value" type="datetime"
                            placeholder="选择日期时间"></el-date-picker>
            <!-- 时间-->
            <el-time-picker v-if="item.valueType ==5" arrow-control v-model="item.value"
                            :picker-options="{selectableRange: '00:00:00 - 23:59:00'}"></el-time-picker>
            <!-- 评分-->
            <el-rate v-if="item.valueType ==6" v-model="item.value"></el-rate>
            <!-- 单选-->
            <el-radio-group v-if="item.valueType ==7" v-model="item.value">
              <el-radio v-for="(value, key) in item.attributes"
                        :key="key"
                        :label="key"
                        :value="key">
                {{value}}
              </el-radio>
            </el-radio-group>
            <!-- 多选 非销售属性-->
            <el-checkbox-group v-if="item.valueType ==8" v-model="item.value">
              <el-checkbox v-for="(value, key) in item.attributes"
                           :key="key"
                           :label="key"
                           :value="key"
              >
                {{value}}
              </el-checkbox>
            </el-checkbox-group>
            <!--选择器-->
            <el-select
              v-model="item.value"
              v-if="item.valueType ==9"
            >
              <el-option v-for="(value, key) in item.attributes"
                         :key="key"
                         :label="value"
                         :value="key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:right;">
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'edit',
    props: ["jobSchedulerId", 'updateFlag'],
    data() {
      return {
        formData: {},
        rules: {
          schedulerName: [
            {required: true, message: "必填", trigger: "blur"}
          ],
          cron: [
            {required: true, message: "必填", trigger: "blur"}
          ],
        }
      }
    },
    methods: {
      setFormRules(params) {
        if (params && params.length > 0) {
          for (let i = 0; i < params.length; i++) {
            let item = params[i];
            if (item.required) {
              this.rules[item.code] = [{required: true, message: "必填", trigger: "blur"}]
            }
          }
        }
      },
      defaultFormData() {
        return {
          params: [],
          values: {},
          schedulerId: '',
          schedulerName: '',
          jobInfoId: '',
          firmId: '',
          firmName: '',
          status: '',
          cron: '',
          tagId: '',
          tagName: '',
          tagCode: '',
          tagType: '',
          cronPopover: false
        };
      },
      changeCron(val) {
        this.formData.cron = val
      },
      handleSave() {
        let data = {};
        this.formData.values = this.getValues(this.formData.params);
        this.formData.status = 0;
        this.formData.tagId = this.formData.params[0].tagId;
        this.formData.tagName = this.formData.params[0].tagName;
        this.formData.tagCode = this.formData.params[0].tagCode;
        this.formData.tagType = this.formData.params[0].tagType;
        let url = '';
        if (this.updateFlag) {
          url = "jobScheduler/updateOne";
          data = this.formData;
        } else {
          let xxlJobGroup = {
            appName: 'qunar-tts-provider',
            addressType: 0,
            title: '去哪儿TTS'
          };
          let xxlJobInfo = {
            jobDesc: this.formData.schedulerName,
            jobCron: this.formData.cron,
            executorHandler: 'uploadPolicys'
          };
          data.xxlJobInfo = xxlJobInfo;
          data.xxlJobGroup = xxlJobGroup;
          data.jobScheduler = this.formData;
          url = "jobScheduler/addOneXxl";
        }
        /* this.$refs['form'].validate((valid) => {
           if (valid) {*/
        this.$store
          .dispatch(url, {
            jobScheduler: data,
            jobSchedulerId: this.formData.schedulerId
          })
          .then(() => {
            this.$emit('onSave')
          })
          .catch(error => {
            console.log(error);
          });
        this.$message({
          type: "success",
          message: "保存成功！"
        });
        /* }
          });*/
      },
      getParams() {
        let searchForm = {
          tagId: 'cd17704040f048c385730e9c6b72b90a',
          tagCode: 'policy'
        }
        this.$store
          .dispatch("jobConfig/getList", {
            filter: searchForm
          })
          .then(data => {
            if (data) {

              if (this.jobSchedulerId && this.jobSchedulerId != null && this.jobSchedulerId != '') {
                this.getData(data);
              } else {
                this.formData.params = data;
                this.setFormRules(this.formData.params);
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      getData(params) {
        this.$store
          .dispatch("jobScheduler/getOne", {
            jobSchedulerId: this.jobSchedulerId
          })
          .then(data => {
            if (data) {
              this.formData = data;
              for (let i = 0; i < params.length; i++) {
                for (let j = 0; j < data.params.length; j++) {
                  if (params[i].code == data.params[j].code) {
                    params[i].value = data.params[j].value;
                    break;
                  }
                }
              }
              this.formData.params = params;
              this.setFormRules(this.formData.params);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      getValues(params) {
        let data = {};
        if (params && params.length > 0) {
          for (let i = 0; i < params.length; i++) {
            data[params[i].code] = params[i].value;
          }
        }
        return data;
      },
    }
    ,
    created() {
      this.formData = this.defaultFormData();
      this.getParams();
    }
  }
</script>
