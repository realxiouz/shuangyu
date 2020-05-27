<template>
  <div>
    <el-form ref="owpForm" size="mini" :model="formData" label-width="110px" :rules="formRules">
      <input type="hidden" v-model="formData.id"/>
      <input type="hidden" v-model="formData.jobInfoId"/>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="政策代码前缀">
            <el-input placeholder="政策代码前缀" v-model="formData.policyCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="时间间隔">
            <el-input placeholder="时间间隔，大于0生效" v-model="formData.timeInterval"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Cron">
            <el-popover v-model="formData.cronPopover">
              <vue-cron @change="changeCron" @close="formData.cronPopover=false" i18n="cn"></vue-cron>
              <el-input slot="reference" @click="formData.cronPopover=true" v-model="formData.jobCron"
                        placeholder="请输入定时策略"></el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="班期限制">
            <el-input placeholder="1,2,3,4,5,6,7" v-model="_dayCondition"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="旅行开始日期">
            <el-input placeholder="2020-06-06" v-model="formData.startDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="旅行结束日期">
            <el-input placeholder="2020-06-06" v-model="formData.endDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="指定航线">
            <el-input placeholder="多个英文逗号分隔：PEK-KMG,KMG-PEK" v-model="_inRouters"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="排除航线">
            <el-input placeholder="多个英文逗号分隔：PEK-KMG,KMG-PEK" v-model="_exRouters"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="指定舱位">
            <el-input placeholder="多个英文逗号分隔：MU-Y-B,CA-Y-U" v-model="_inCabins"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="排除舱位">
            <el-input placeholder="多个英文逗号分隔：MU-Y-B,CA-Y-U" v-model="_exCabins"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="指定航司">
            <el-input placeholder="多个英文逗号分隔：MU,CA,SC" v-model="_inAirLines"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="排除航司">
            <el-input placeholder="多个英文逗号分隔：MU,CA,SC" v-model="_exAirLines"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="指定航班号">
            <el-input placeholder="多个英文逗号分隔：MU1234,CA1234,SC1234" v-model="_inFlightCodes"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="排除航班号">
            <el-input placeholder="多个英文逗号分隔：MU1234,CA1234,SC1234" v-model="_exFlightCodes"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'owpEdit',
    props: ["owpId", 'updateFlag'],
    data() {
      return {
        formData: {},
        formRules: {
          policyCode: {required: true, trigger: "blur"},
          jobCron: {required: true, trigger: "blur"},
        }
      }
    },
    methods: {
      defaultFormData() {
        return {
          id: '',
          jobInfoId: '',
          timeInterval: 0,
          inRouters: [],
          exRouters: [],
          inCabins: [],
          exCabins: [],
          inAirLines: [],
          exAirLines: [],
          inFlightCodes: [],
          exFlightCodes: [],
          startDate: '',
          endDate: '',
          dayCondition: [],
          policyCode: '',
          jobCron: '',
          cronPopover: false
        };
      },
      clearForm() {
        this.formData = this.defaultFormData();
      },
      loadOwpData() {
        if (this.owpId && this.owpId != '') {
          this.$store
            .dispatch("owp/getOne", {id: this.owpId})
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
      changeCron(val) {
        this.formData.jobCron = val
      },

      handleSave() {
        let url = '';
        if (this.updateFlag) {
          url = 'owp/updateOne/' + this.formData.id;

        } else {
          url = 'owp/addOne';
        }
        this.$store
          .dispatch(url, {owpConfig: this.formData})
          .then(() => {
            this.$emit("onSave");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    computed: {
      _inRouters: {
        get: function () {
          console.log("++++++", JSON.stringify(this.formData.inRouters));
          if (this.formData.inRouters.length > 0) {
            return this.formData.inRouters.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          console.log(newValue);
          this.formData.inRouters = newValue.split(',')
        }
      },
      _exRouters: {
        get: function () {
          if (this.formData.exRouters.length > 0) {
            return this.formData.exRouters.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          this.formData.exRouters = newValue.split(',')
        }
      },
      _inCabins: {
        get: function () {
          if (this.formData.inCabins.length > 0) {
            return this.formData.inCabins.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          this.formData.inCabins = newValue.split(',')
        }
      },
      _exCabins: {
        get: function () {
          if (this.formData.exCabins.length > 0) {
            return this.formData.exCabins.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          this.formData.exCabins = newValue.split(',')
        }
      },
      _inAirLines: {
        get: function () {
          if (this.formData.inAirLines.length > 0) {
            return this.formData.inAirLines.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          this.formData.inAirLines = newValue.split(',')
        }
      },
      _exAirLines: {
        get: function () {
          if (this.formData.exAirLines.length > 0) {
            return this.formData.exAirLines.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          this.formData.exAirLines = newValue.split(',')
        }
      },
      _inFlightCodes: {
        get: function () {
          if (this.formData.inFlightCodes.length > 0) {
            return this.formData.inFlightCodes.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          this.formData.inFlightCodes = newValue.split(',')
        }
      },
      _exFlightCodes: {
        get: function () {
          if (this.formData.exFlightCodes.length > 0) {
            return this.formData.exFlightCodes.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          this.formData.exFlightCodes = newValue.split(',')
        }
      },
      _dayCondition: {
        get: function () {
          if (this.formData.dayCondition.length > 0) {
            return this.formData.dayCondition.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          this.formData.dayCondition = newValue.split(',')
        }
      },
    },
    created() {
      this.clearForm();
      this.loadOwpData();
    },
  };

</script>
