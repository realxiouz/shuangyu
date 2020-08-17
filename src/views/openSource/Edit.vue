<template>
  <div>
    <el-form ref="form" :model="formData" label-width="110px" size="mini">
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="名称" :rules="[{required: true, message: '必填', trigger: 'blur'}]">
            <el-input placeholder="名称" v-model="formData.schedulerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="定时策略" :rules="[{required: true, message: '必填', trigger: 'blur'}]">
            <el-popover v-model="formData.cronPopover">
              <vue-cron @change="changeCron" @close="formData.cronPopover=false" i18n="cn"></vue-cron>
              <el-input slot="reference" @click="formData.cronPopover=true" v-model="formData.cron"
                        placeholder="请输入定时策略"></el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-for="(item, index) in formData.attrList" :key="index">
          <template v-if="item.valueType != 9">
            <el-form-item
              :prop="'attrList.' + index + '.value'"
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
                :precision="item.precision"
                style="width: 100%"></el-input-number>
              <!-- 日期-->
              <el-date-picker
                v-if="item.valueType ==3"
                v-model="item.value"
                :type="item.inputType"
                :format="item.format"
                placeholder="选择日期"
                style="width: 100%"></el-date-picker>
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
              <el-checkbox-group
                v-if="item.valueType ==61" v-model="item.value">
                <el-checkbox
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name">{{attr.name}}
                </el-checkbox>
              </el-checkbox-group>
              <!--选择器-->
              <el-select v-model="item.value" v-if="item.valueType ==62" :multiple="item.multiple">
                <el-option
                  v-for="attr in item.attributes"
                  :key="attr.code"
                  :label="attr.name"
                  :value="attr.code"
                  style="width: 100%">
                </el-option>
              </el-select>
              <!-- &lt;!&ndash; 多选 非销售属性&ndash;&gt;
               <el-checkbox-group
                 v-if="item.valueType ==61"
                 v-model="item.value">
                 <el-checkbox
                   v-for="attr in item.attributes"
                   :key="attr.code"
                   :label="attr.code">{{attr.name}}
                 </el-checkbox>
               </el-checkbox-group>-->
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
       <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
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
      defaultFormData() {
        return {
          params: [],
          attrList: [],
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
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let data = {};
            this.formData.params = this.getValues(this.formData.attrList);
            this.formData.status = 0;
            this.formData.tagId = this.formData.attrList[0].tagId;
            this.formData.tagName = this.formData.attrList[0].tagName;
            this.formData.tagCode = this.formData.attrList[0].tagCode;
            this.formData.tagType = this.formData.attrList[0].tagType;
            delete this.formData.attrList;
            let url = '';
            if (this.updateFlag) {
              url = "jobScheduler/updateOne";
              data = this.formData;
            } else {
              let xxlJobGroup = {
                appName: 'qunar-open-source-provider',
                addressType: 0,
                title: 'openSource'
              };
              let xxlJobInfo = {
                jobDesc: this.formData.schedulerName,
                jobCron: this.formData.cron,
                executorHandler: 'openSourceJobHandler'
              };
              data.xxlJobInfo = xxlJobInfo;
              data.xxlJobGroup = xxlJobGroup;
              data.jobScheduler = this.formData;
              url = "jobScheduler/addOneXxl";
            }
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
          }
        });
      },
      getParams() {
        let searchForm = {
          tagId: '42f1907a9eef433fabd8b5a34fa5e931',
          tagCode: 'openSource'
        }
        this.$store
          .dispatch("jobConfig/getList", searchForm)
          .then(data => {
            if (data) {
              this.formData.attrList = data;
              this.getData();
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      getData() {
        if (this.jobSchedulerId && this.jobSchedulerId != null && this.jobSchedulerId != '') {
          this.$store
            .dispatch("jobScheduler/getOne", {
              jobSchedulerId: this.jobSchedulerId
            })
            .then(data => {
              if (data) {
                let attrList = this.formData.attrList;
                this.formData = data;
                this.formData.attrList = attrList;
                if (this.formData.params && this.formData.params.length > 0) {
                  this.setValues(this.formData.params);
                }
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
      setValues(params) {
        let attrList = this.formData.attrList;
        for (let i = 0; i < attrList.length; i++) {
          for (let j = 0; j < params.length; j++) {
            if (attrList[i].code == params[j].code) {
              switch (params[j].type) {
                case "Date":
                  attrList[i].value = params[j]._date;
                  break;
                case "ArrayList":
                  attrList[i].value = params[j]._array;
                  break;
                case "Boolean":
                  attrList[i].value = params[j]._bool;
                  break;
                case "Byte":
                  attrList[i].value = params[j]._byte;
                  break;
                case "Short":
                  attrList[i].value = params[j]._short;
                  break;
                case "Integer":
                  attrList[i].value = params[j]._int;
                  break;
                case "Long":
                  attrList[i].value = params[j]._long;
                  break;
                case "Float":
                  attrList[i].value = params[j]._float;
                  break;
                case "Double":
                  attrList[i].value = params[j]._double;
                  break;
                case "String":
                  attrList[i].value = params[j]._string;
                  break;
              }
            }
          }
        }
        this.formData.attrList = attrList;
        return attrList;
      },
      getValues(attrList) {
        let params = [];
        if (attrList && attrList.length > 0) {
          for (var i = 0; i < attrList.length; i++) {
            params.push(this.getPropertyItem(attrList[i]))
          }
        }
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
        }
        return item;
      },
    },
    created() {
      this.formData = this.defaultFormData();
      //if (!this.jobSchedulerId && this.jobSchedulerId == null && this.jobSchedulerId == '') {
      this.getParams();
      //}
      //this.getData();
    }
  }
</script>
