<template>
  <div>
    <el-form ref="owpForm" size="mini" :model="formData" label-width="110px" :rules="formRules">
      <input type="hidden" v-model="formData.id"/>
      <input type="hidden" v-model="formData.jobInfoId"/>
      <el-form-item label="时间间隔" prop="timeInterval">
        <el-input placeholder="时间间隔，大于0生效" v-model="formData.timeInterval"></el-input>
      </el-form-item>
      <el-form-item label="Cron" prop="jobCron">
        <el-input placeholder="cron表达式" v-model="formData.jobCron"></el-input>
      </el-form-item>
      <el-form-item label="指定航线" prop="inRouters">
        <el-input placeholder="多个英文逗号分隔：PEK-KMG,KMG-PEK" v-model="formData.inRouters"></el-input>
      </el-form-item>
      <el-form-item label="排除航线" prop="exRouters">
        <el-input placeholder="多个英文逗号分隔：PEK-KMG,KMG-PEK" v-model="formData.exRouters"></el-input>
      </el-form-item>
      <el-form-item label="指定舱位" prop="inCabins">
        <el-input placeholder="多个英文逗号分隔：MU-Y-B,CA-Y-U" v-model="formData.inCabins"></el-input>
      </el-form-item>
      <el-form-item label="排除舱位" prop="exCabins">
        <el-input placeholder="多个英文逗号分隔：MU-Y-B,CA-Y-U" v-model="formData.exCabins"></el-input>
      </el-form-item>
      <el-form-item label="指定航司" prop="inAirLines">
        <el-input placeholder="多个英文逗号分隔：MU,CA,SC" v-model="formData.inAirLines"></el-input>
      </el-form-item>
      <el-form-item label="排除航司" prop="exAirLines">
        <el-input placeholder="多个英文逗号分隔：MU,CA,SC" v-model="formData.exAirLines"></el-input>
      </el-form-item>
      <el-form-item label="指定航班号" prop="inFlightCodes">
        <el-input placeholder="多个英文逗号分隔：MU1234,CA1234,SC1234" v-model="formData.inFlightCodes"></el-input>
      </el-form-item>
      <el-form-item label="排除航班号" prop="exFlightCodes">
        <el-input placeholder="多个英文逗号分隔：MU1234,CA1234,SC1234" v-model="formData.exFlightCodes"></el-input>
      </el-form-item>
      <el-form-item label="旅行开始日期" prop="startDate">
        <el-input placeholder="2020-06-06" v-model="formData.startDate"></el-input>
      </el-form-item>
      <el-form-item label="旅行结束日期" prop="endDate">
        <el-input placeholder="2020-06-06" v-model="formData.endDate"></el-input>
      </el-form-item>
      <el-form-item label="班期限制" prop="dayCondition">
        <el-input placeholder="1,2,3,4,5,6,7" v-model="formData.dayCondition"></el-input>
      </el-form-item>
      <el-form-item label="政策代码前缀" prop="policyCode">
        <el-input placeholder="政策代码前缀" v-model="formData.policyCode"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'owpEdit',
    props: ["owpData"],
    data() {
      return {
        formData: {},
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
          jobCron: ''
        };
      },
    },
    computed: {
      _inRouters: {
        get: function () {
          if (this.formData.inRouters.length > 0) {
            return this.formData.inRouters.join(',')
          } else {
            return '';
          }
        },
        set: function (newValue) {
          this.formData.inRouters = newValue.split(',')
        }
      }
    }
  }

</script>
