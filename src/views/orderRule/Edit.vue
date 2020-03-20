<template>
  <div>
    <el-form ref="form" :rules="formRules" :model="formData" label-width="120px">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="规则名称:" prop="ruleName">
            <el-input v-model="formData.ruleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="政策代码:" prop="policyCode">
            <el-input v-model="formData.policyCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="序号:" prop="sort">
            <el-input v-model="formData.sort"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="是否调出票中:" prop="ticketing">
            <el-switch
              v-model="formData.ticketing"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
              active-value=true
              inactive-value=false
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="航司:">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="5">
              <el-form-item prop="inOrEx">
                <el-switch
                  v-model="formData.airlines.inOrEx"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="排除"
                  inactive-text="指定"
                  active-value=1
                  inactive-value=0>
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="19">
              <el-form-item prop="values">
                <el-input v-model="formData.airlines.values" type="textarea" :rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="航线:">
            <el-col xs="24" :sm="24" :md="12" :lg="8" :xl="5">
              <el-form-item prop="inOrEx">
                <el-switch
                  v-model="formData.segments.inOrEx"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="排除"
                  inactive-text="指定"
                  active-value=1
                  inactive-value=0>
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col xs="24" :sm="24" :md="12" :lg="16" :xl="19">
              <el-form-item prop="values">
                <el-input v-model="formData.segments.values" type="textarea" :rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="航班:">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="5">
              <el-form-item prop="inOrEx">
                <el-switch
                  v-model="formData.flights.inOrEx"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="排除"
                  inactive-text="指定"
                  active-value=1
                  inactive-value=0>
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="19">
              <el-form-item prop="values">
                <el-input v-model="formData.flights.values" type="textarea" :rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="舱位:">
            <el-col xs="24" :sm="24" :md="12" :lg="8" :xl="5">
              <el-form-item prop="inOrEx">
                <el-switch
                  v-model="formData.cabins.inOrEx"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="排除"
                  inactive-text="指定"
                  active-value=1
                  inactive-value=0>
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col xs="24" :sm="24" :md="12" :lg="16" :xl="19">
              <el-form-item prop="values">
                <el-input v-model="formData.cabins.values" type="textarea" :rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-form-item label="规则类型:" prop="formData.ruleType" :rows="1">
            <el-select v-model="formData.ruleType" placeholder="请选择" :rows="1">
              <el-option
                v-for="item in ruleTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-form-item label="任务类型:" prop="formData.taskType">
            <el-switch
              v-model="formData.taskType"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="系统"
              inactive-text="手工"
              active-value=1
              inactive-value=0>
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col v-if="formData.taskType==1" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-form-item label="规则类型:" prop="formData.channel">
            <el-select v-model="formData.channel" placeholder="请选择">
              <el-option
                v-for="item in channels"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-form-item label="是否自动抢票:" prop="formData.autoGrabTicket">
            <el-switch
              v-model="formData.autoGrabTicket"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
              active-value=true
              inactive-value=false>
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="规则类型:" prop="formData.ruleTypes">
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
      <el-row type="flex" justify="space-between">
        <el-col :xs="2" :sm="2" :md="1" :lg="1" :xl="1">
          <el-form-item label="负责人" prop="principalName">
          </el-form-item>
        </el-col>
        <el-col :xs="4" :sm="3" :md="2" :lg="1" :xl="1">
          <el-button type="primary" @click="selectPeople" size="mini">添加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="peopleData"
          style="width: 100%">
          <el-table-column
            prop="fullName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作">
            <el-button type="primary" size="mini" @click="selectPeople">重新添加</el-button>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top:20px;margin-bottom:20px" type="flex" justify="space-between">
        <el-col :xs="2" :sm="2" :md="1" :lg="1" :xl="1">
          <el-form-item label="员工" prop="staffNames">
          </el-form-item>
        </el-col>
        <el-col :xs="4" :sm="3" :md="2" :lg="1" :xl="1">
          <el-button type="primary" @click="selectStaff" size="mini">添加</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;margin-bottom:20px">
        <el-table
          :data="staffData"
          style="width: 100%">
          <el-table-column
            prop="fullName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="handleRemove(scope.$index, scope.row)"
                type="danger"
                size="mini"
              >
                删除
              </el-button>
              <el-button type="primary" size="mini" @click="selectStaff">继续添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <div>
      <el-button type="primary" @click="handleSave">确 定</el-button>
      <el-button @click="resetForm">重 置</el-button>
      <el-button @click="goBack">返回</el-button>
    </div>
    <el-dialog title="员工信息" :visible.sync="dialogVisible" width="30%">
      <select-staff v-if="dialogVisible" ref="selectStaff" @onSelectStaff="onSelectStaff" @onStaffCancel="onStaffCancel"
                    :checkbox-flag="checkboxFlag" :staffData="staffData">
      </select-staff>
    </el-dialog>
  </div>
</template>
<script>
  import selectStaff from "../../components/SelectStaffs.vue";

  function defaultData() {
    return {
      ruleName: "",
      ruleType: 1,
      taskType: 0,
      ticketing: false,
      airlines: {},
      segments: {},
      flights: {},
      cabins: {},
      policyCode: "",
      staffs: [],
      nextStaffId: "",
      principalName: "",
      staffNames: "",
      principal: "",
      autoGrabTicket:false
    };
  }

  export default {
    name: "orderRuleEdit",
    data() {
      return {
        formData: defaultData(),
        dialogVisible: false,
        checkboxFlag: false,
        peopleData: [],
        staffData: [],
        ruleTypes: [
          {label: "出票", value: 1},
          {label: "退票", value: 2},
          {label: "改签", value: 3},
          {label: "消息", value: 4},
          {label: "质检", value: 5},
          {label: "补单", value: 6},
          {label: "补单号", value: 7}
        ],
        channels:[
          {label: "蜗牛", value: 1},
          {label: "BSP", value: 2}
        ],
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
        params.airlines.values = this.formData.airlines.values.split(",");
        params.segments.values = this.formData.segments.values.split(",");
        params.flights.values = this.formData.flights.values.split(",");
        params.cabins.values = this.formData.cabins.values.split(",");
        console.log(params);
        if (params){
          return;

        }
        this.$store
          .dispatch("orderRule/save", params)
          .then(data => {
            console.log(data);
            this.lastId = "0";
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
      onSelectStaff(params) {
        if (!this.checkboxFlag) {
          var tempData = [];
          tempData.push(params);
          this.peopleData = tempData;
        } else {
          this.staffData = params;
        }
        this.dialogVisible = false;
      },
      onStaffCancel() {
        this.dialogVisible = false;
      },
      selectStaff() {
        this.checkboxFlag = true;
        this.dialogVisible = true;
      },
      selectPeople() {
        this.checkboxFlag = false;
        this.dialogVisible = true;
      },
      handleRemove(index, row) {
        console.log(row);
        this.staffData.splice(index, 1);
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
    margin-bottom: 20px;
  }
</style>
