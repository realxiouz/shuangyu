<template>
  <div>
    <div id="goBack" @click="goBack">
      <el-page-header></el-page-header>
    </div>
    <el-card class="contentBox">
      <div slot="header">
        <span>调度参数管理</span>
      </div>
      <el-form ref="jobConfigForm" size="mini" :model="formData" label-width="110px" :rules="formRules">
        <input type="hidden" v-model="formData.configId"/>
        <div>
          <el-row :gutter="5">
            <!-- <el-col :span="8">
               <el-form-item label="标签类别:" prop="tagType">
                 <el-select
                   v-model="formData.tagType"
                   clearable
                   placeholder="标签类别"
                   style="width: 100%"
                 >
                   <el-option
                     v-for="item in tagTypes"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"
                   ></el-option>
                 </el-select>
               </el-form-item>
             </el-col>
             <el-col :span="8">
               <el-form-item label="标签名称" prop="tagName">
                 <el-input placeholder="标签名称" v-model="formData.tagName"></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="8">
               <el-form-item label="标签编码" prop="tagCode">
                 <el-input placeholder="标签编码" v-model="formData.tagCode"></el-input>
               </el-form-item>
             </el-col>-->
            <el-col :span="8">
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
            <el-col :span="8">
              <el-form-item label="名称" prop="name">
                <el-input placeholder="名称" v-model="formData.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="编码" prop="code">
                <el-input placeholder="编码" v-model="formData.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分组" prop="group">
                <el-input placeholder="分组" v-model="formData.group"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
            <el-col :span="8">
              <el-form-item label="精度" prop="precision">
                <el-input placeholder="精度" v-model="formData.precision"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最小值" prop="min">
                <el-input placeholder="最小值" v-model="formData.min"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最大值" prop="max">
                <el-input placeholder="最大值" v-model="formData.max"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="步长" prop="step">
                <el-input placeholder="步长" v-model="formData.step"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="是否必填" prop="required">
                <el-switch v-model="formData.required" :active-value=true :inactive-value=false></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="是否只读" prop="readonly">
                <el-switch v-model="formData.readonly" :active-value=true :inactive-value=false></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="是否禁用" prop="readonly">
                <el-switch v-model="formData.disabled" :active-value=true :inactive-value=false></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="默认值" prop="value">
                <el-input placeholder="默认值" v-model="formData.value"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注" prop="remark">
                <el-input placeholder="备注" v-model="formData.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row :gutter="10" v-if="valueType ==0">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="示例:" prop="precision">
                <el-input v-model="test.input" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="valueType ==1">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="示例:">
                <el-switch
                  v-model="test.switchValue"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="valueType ==2">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="示例:">
                <el-input-number v-model="test.num" :precision="formData.precision"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="valueType ==3">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="示例:">
                <el-date-picker
                  v-model="test.time1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="valueType ==4">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="示例:">
                <el-date-picker
                  v-model="test.time2"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="valueType ==5">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="示例:">
                <el-time-select
                  v-model="test.time3"
                  :picker-options="{start: '08:30',step: '00:15', end: '18:30'}"
                  placeholder="选择时间">
                </el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="valueType ==6">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="示例:">
                <el-rate v-model="test.rateValue"></el-rate>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="valueType ==7">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="示例:">
                <el-radio v-model="test.radio" label="1">单选项1</el-radio>
                <el-radio v-model="test.radio" label="2">单选项2</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="valueType ==8">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="示例:">
                <el-checkbox v-model="test.checked1">多选框1</el-checkbox>
                <el-checkbox v-model="test.checked2">多选框2</el-checkbox>
                <el-checkbox v-model="test.checked3">多选框3</el-checkbox>
                <el-checkbox v-model="test.checked4">多选框4</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="valueType ==9">
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
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
      </el-form>
      <el-dialog title="属性值" :visible.sync="dialogVisible" width="20%">
        <el-form ref="form" :model="formValue" label-width="90px">
          <el-form-item label="编码">
            <el-input v-model="formValue.code"></el-input>
          </el-form-item>
          <el-form-item label="值">
            <el-input v-model="formValue.value"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="valueCancel">取 消</el-button>
          <el-button type="primary" @click="valueSave">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <div slot="footer" style="text-align:center;">
      <el-button size="mini" type="primary" @click="handleCancel">取消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
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
        formValue: {},
        dialogVisible: false,
        showAddValues: false,
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
            value: 8,
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
          tagType: {required: true, trigger: "blur"},
          tagName: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"},
         /* tagCode: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"},
          tagCode: {required: true, trigger: "blur"},*/
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
          precision: '',
          min: '',
          max: '',
          step: '',
          readonly: '',
          disabled: '',
          value: '',
          attributes: [],
          remark: '',
          sort: 0
        };
      },
      clearForm() {
        this.formData = this.defaultFormData();
      },
      loadJobConfigData() {
        console.log(this.jobConfigId)
        if (this.jobConfigId && this.jobConfigId != '') {
          this.$store
            .dispatch("jobConfig/getOne", {jobConfigId: this.jobConfigId})
            .then(data => {
              if (data.code == 0) {
                this.formData = data.data;
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      loadJobTagData() {
        console.log(this.jobConfigId)
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
        this.valueType = value;
        if (value == 7 || value == 8 || value == 9) {
          this.showAddValues = true;
        } else {
          this.showAddValues = false;
        }
      },
      //跳转回列表页面
      goBack() {
        if (this.$router.history.length <= 1) {
          this.$router.push({path: '/home'});
          return false;
        } else {
          this.$router.go(-1);
        }
      },
      handleCancel() {
        this.goBack();
      },
      handleSave() {
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
      valueEdit(rows) {
        this.formValue = {};
        this.formValue = rows;
        this.dialogVisible = true;
      },
      valueRemove(id, index, rows) {
        this.$confirm("此操作将删除该条记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            rows.splice(index, 1);
          })
          .catch(err => {
            console.error(err);
          });
      },
      handleAdd() {
        this.dialogVisible = true;
      },
      valueCancel() {
        this.dialogVisible = false;
      },
      valueSave() {
        if (!this.formValue.code || !this.formValue.value) {
          this.$message("请填写完整属性信息！")
          return false;
        }
        this.values.push(this.formValue);
        this.dialogVisible = false;
        this.formValue = {};
      },
    },
    created() {
      this.clearForm();
      this.loadJobConfigData();
      this.loadJobTagData();
    },
  };

</script>
