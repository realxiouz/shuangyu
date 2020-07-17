<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input placeholder="名称" v-model="formData.schedulerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="定时策略">
            <el-popover v-model="formData.cronPopover">
              <vue-cron @change="changeCron" @close="formData.cronPopover=false" i18n="cn"></vue-cron>
              <el-input slot="reference" @click="formData.cronPopover=true" v-model="formData.cron"
                        placeholder="请输入定时策略"></el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-for="(item, index) in formData.params" :key="index">
          <template v-if="item.valueType != 9">
            <el-form-item
              :prop="'params.' + index + '.value'"
              :label="item.name"
              :rules="[{ required: item.required, message: '请输入'+item.name, trigger: 'blur' }]">
              <el-input
                v-if="item.valueType ==0"
                v-model="item.value"
                :type="item.inputType"
                :maxlength="item.length">
              </el-input>
              <!-- 开关-->
              <el-switch v-if="item.valueType ==1" v-model="item.value"></el-switch>
              <!-- 数字-->
              <el-input-number
                v-if="item.valueType ==2"
                v-model="item.value"
                :min="item.min"
                :max="item.max"
                :step="item.step"
                :precision="item.precision"></el-input-number>
              <!-- 日期-->
              <el-date-picker
                v-if="item.valueType ==3"
                v-model="item.value"
                :type="item.inputType"
                :format="item.format"
                placeholder="选择日期"></el-date-picker>
              <!-- 时间-->
              <el-time-picker
                v-if="item.valueType ==4"
                arrow-control
                v-model="item.value"
                :picker-options="{selectableRange: '00:00:00 - 23:59:00' }">
              </el-time-picker>
              <!-- 评分-->
              <el-rate v-if="item.valueType ==5" v-model="item.value"></el-rate>
              <!-- 单选-->
              <el-radio-group v-if="item.valueType ==60" v-model="item.value">
                <el-radio
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name">{{attr.name}}
                </el-radio>
              </el-radio-group>
              <!-- 多选 非销售属性-->
              <!-- <el-checkbox-group
                v-if="item.valueType ==61 && !item.sku" v-model="item.value">
                <el-checkbox
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name">{{attr.name}}
                </el-checkbox>
              </el-checkbox-group> -->
              <!--选择器-->
              <el-select v-model="item.value" v-if="item.valueType ==62" :multiple="item.multiple">
                <el-option
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name"
                  :value="attr.code">
                </el-option>
              </el-select>
              <!-- 多选 非销售属性-->
              <el-checkbox-group
                v-if="item.valueType ==61"
                v-model="item.value">
                <el-checkbox
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.code">{{attr.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'edit',
    props: ["jobSchedulerId", 'updateFlag', 'copyFlag'],
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
            appName: 'wop-provider',
            addressType: 0,
            title: 'wop执行器'
          };
          let xxlJobInfo = {
            jobDesc: this.formData.schedulerName,
            jobCron: this.formData.cron,
            executorHandler: 'wopJobHandler'
          };
          data.xxlJobInfo = xxlJobInfo;
          data.xxlJobGroup = xxlJobGroup;
          data.jobScheduler = this.formData;
          url = "jobScheduler/addOneXxl";
        }
        /*this.$refs['form'].validate((valid) => {
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
        /*   }
         });*/
      },
      getParams() {
        if (!this.jobSchedulerId || this.jobSchedulerId != null || this.jobSchedulerId != '') {
          let searchForm = {
            tagId: '61886007158a4c40bd0f4f52fe2c6a90',
            tagCode: 'wop'
          }
          this.$store
            .dispatch("jobConfig/getList", {
              filter: searchForm
            })
            .then(data => {
              if (data) {
                this.formData.params = data;
                this.setFormRules(this.formData.params);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      getData() {
        if (this.jobSchedulerId && this.jobSchedulerId != null && this.jobSchedulerId != '') {
          this.$store
            .dispatch("jobScheduler/getOne", {
              jobSchedulerId: this.jobSchedulerId
            })
            .then(data => {
              if (data) {
                this.formData = data;
                if (!this.formData.params || this.formData.params.length < 1) {
                  this.getParams();
                }
                this.setFormRules(this.formData.params);
                if (this.copyFlag) {
                  this.formData.schedulerId = '';
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      getValues(params) {
        let data = {};
        if (params && params.length > 0) {
          for (var i = 0; i < params.length; i++) {
            data[params[i].code] = params[i].value;
          }
        }
        return data;
      },
    },
    created() {
      this.formData = this.defaultFormData();
      this.getParams();
      this.getData();
    }
  }
</script>
