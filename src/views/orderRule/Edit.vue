<template>
  <div>
    <el-form ref="form" :rules="formRules" :model="formData" :inline="true" class="demo-form-inline"
             label-width="110px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model="formData.ruleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="序号" prop="sort">
            <el-input v-model="formData.sort"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否调用出票中" prop="isTicketing">
            <el-radio-group v-model="formData.isTicketing">
              <el-radio :label=true>是</el-radio>
              <el-radio :label=false>否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="政策代码" prop="sort">
            <el-input v-model="formData.policyCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="规则类型" prop="formData.ruleTypes">
            <el-checkbox-group v-model="formData.ruleTypes">
              <el-checkbox :label=3 name="ruleTypes">出票</el-checkbox>
              <el-checkbox :label=10 name="ruleTypes">未出票申请退款</el-checkbox>
              <el-checkbox :label=11 name="ruleTypes">退票</el-checkbox>
              <el-checkbox :label=20 name="ruleTypes">改签</el-checkbox>
              <el-checkbox :label=4 name="ruleTypes">消息</el-checkbox>
              <el-checkbox :label=5 name="ruleTypes">质检</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="指定或排除航司" prop="inOrEx">
            <el-radio-group v-model="formData.airlines.inOrEx">
              <el-radio :label=0>指定</el-radio>
              <el-radio :label=1>排除</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="航司" prop="values">
            <el-input v-model="formData.airlines.values" type="textarea" :rows="2" style="width: 400px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="指定或排除航线" prop="inOrEx">
            <el-radio-group v-model="formData.segments.inOrEx">
              <el-radio :label=0>指定</el-radio>
              <el-radio :label=1>排除</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="航线" prop="values">
            <el-input v-model="formData.segments.values" type="textarea" :rows="2" style="width: 400px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="指定或排除航班" prop="inOrEx">
            <el-radio-group v-model="formData.flights.inOrEx">
              <el-radio :label=0>指定</el-radio>
              <el-radio :label=1>排除</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="航班" prop="values">
            <el-input v-model="formData.flights.values" type="textarea" :rows="2" style="width: 400px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="指定或排除舱位" prop="inOrEx">
            <el-radio-group v-model="formData.cabins.inOrEx">
              <el-radio :label=0>指定</el-radio>
              <el-radio :label=1>排除</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="舱位" prop="values">
            <el-input v-model="formData.cabins.values" type="textarea" :rows="2" style="width: 400px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="负责人" prop="responsibleStaffName">
            <el-button type="primary" @click="selectPeople">选择</el-button>
            <el-input v-model="formData.responsibleStaffName" type="textarea" :rows="2" style="width: 800px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="员工" prop="staffNames">
            <el-button type="primary" @click="selectStaff">选择</el-button>
            <el-input v-model="formData.staffNames" type="textarea" :rows="2" style="width: 800px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-button type="primary" @click="handleSave">确 定</el-button>
      <el-button @click="resetForm">重 置</el-button>
      <el-button @click="goBack">返回</el-button>
    </div>
    <el-dialog title="员工信息" :visible.sync="dialogVisible" width="30%">
      <select-staff v-if="dialogVisible" ref="selectStaff" @onSelectStaff="onSelectStaff" @onStaffCancel="onStaffCancel"
                    :checkbox-flag="checkboxFlag">
      </select-staff>
    </el-dialog>

  </div>
</template>
<script>
  import selectStaff from "../../components/SelectStaff.vue";

  function defaultData() {
    return {
      ruleName: '',
      ruleTypes: [],
      isTicketing: '',
      airlines: {},
      segments: {},
      flights: {},
      cabins: {},
      policyCode: '',
      staffs: [],
      nextStaffId: '',
      responsibleStaffName: '',
      staffNames: '',
      responsibleStaff: ''
    };
  };
  export default {
    name: "orderRuleEdit",
    data() {
      return {
        formData: defaultData(),
        dialogVisible: false,
        checkboxFlag: false,
        formRules: {
          ruleName: [
            {required: true, message: "请输入规则名称", trigger: "blur"}
          ],
          policyCode: [
            {required: true, message: "请输入政策代码", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      resetForm() {
        this.formData = defaultData();
      },
      goBack() {
        this.$router.go(-1);
      },
      loadForm() {
        console.log("loadForm");
      },
      handleSave() {
        var params = JSON.parse(JSON.stringify(this.formData));
        console.log(this.formData);
        console.log(params);
        params.airlines.values = this.formData.airlines.values.split(',');
        params.segments.values = this.formData.segments.values.split(',');
        params.flights.values = this.formData.flights.values.split(',');
        params.cabins.values = this.formData.cabins.values.split(',');
        console.log(params);
        this.$store
          .dispatch('orderRule/save', params)
          .then(data => {
            console.log(data);
            this.lastId = '0';
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      onSelectStaff(params) {
        if (this.checkboxFlag) {
          if (params != null && params != undefined && params.length > 0) {
            var staffNames = [];
            this.formData.staffs = [];
            for (var i = 0; i < params.length; i++) {
              var staff = params[i];
              staffNames.push(staff.fullName);
              this.formData.staffs.push(staff.staffId);
            }
            this.formData.staffNames = staffNames.join(",");
          }
        } else {
          if (params != null && params != undefined) {
            this.formData.responsibleStaffName = params.fullName;
            this.formData.responsibleStaff = params.staffId;
          }
        }
        this.dialogVisible = false
      },
      onStaffCancel() {
        this.dialogVisible = false
      },
      selectStaff() {
        this.checkboxFlag = true;
        this.dialogVisible = true;
      },
      selectPeople() {
        this.checkboxFlag = false;
        this.dialogVisible = true;
      }
    },
    mounted() {
      const paramData = this.$route.params;
      if (Object.keys(paramData).length > 0) {
        this.formData = JSON.parse(JSON.stringify(paramData));
      }
    },
    components: {
      selectStaff
    }
  };
</script>
<style scoped>
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
