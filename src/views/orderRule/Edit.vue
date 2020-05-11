<template>
  <div class="contentBox">
    <el-form ref="form" :rules="formRules" :model="formData" label-width="120px" size="mini">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="规则名称:" prop="ruleName">
            <el-input v-model="formData.ruleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="政策代码:" prop="policyCodes">
            <el-input type="textarea" :rows="1" v-model="_policyCodes"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="序号:" prop="sort">
            <el-input
              onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
              v-model="formData.sort"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <el-form-item label="是否调出票中:" prop="ticketing">
            <el-switch
              v-model="formData.ticketing"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="否"
              inactive-text="是"
              :active-value="false"
              :inactive-value="true"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-form-item label="是否自动抢票:" prop="autoGrabTicket">
            <el-switch
              v-model="formData.autoGrabTicket"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="否"
              inactive-text="是"
              :active-value="false"
              :inactive-value="true"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="任务类型:" prop="taskType">
            <el-select v-model="formData.taskType" placeholder="请选择" multiple style="width: 100%">
              <el-option
                v-for="item in taskTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="4" :xl="4">
          <el-form-item label="规则类型:" prop="ruleType">
            <el-switch
              v-model="formData.ruleType"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="系统"
              inactive-text="手工"
              :active-value="0"
              :inactive-value="1"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-form-item v-if="formData.ruleType==0" label="渠道:" prop="channel">
            <el-select v-model="formData.channel" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in channels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="排除"
                  inactive-text="指定"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="19">
              <el-form-item prop="values">
                <el-input v-model="_airlines" type="textarea" :rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="航线:">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="5">
              <el-form-item prop="inOrEx">
                <el-switch
                  v-model="formData.segments.inOrEx"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="排除"
                  inactive-text="指定"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="19">
              <el-form-item prop="values">
                <el-input v-model="_segments" type="textarea" :rows="1"></el-input>
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
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="排除"
                  inactive-text="指定"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="19">
              <el-form-item prop="values">
                <el-input v-model="_flights" type="textarea" :rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="舱位:">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="5">
              <el-form-item prop="inOrEx">
                <el-switch
                  v-model="formData.cabins.inOrEx"
                  active-color="#ff4949"
                  inactive-color="#13ce66"
                  active-text="排除"
                  inactive-text="指定"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="19">
              <el-form-item prop="values">
                <el-input v-model="_cabins" type="textarea" :rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row type="flex" justify="space-between">
        <el-col :xs="2" :sm="2" :md="1" :lg="1" :xl="1">
          <el-form-item label="负责人" prop="principalName"></el-form-item>
        </el-col>
        <el-col :xs="4" :sm="3" :md="2" :lg="1" :xl="1">
          <el-button type="primary" @click="selectPeople" size="mini">添加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table size="mini" :data="peopleData" style="width: 100%">
          <el-table-column prop="fullName" label="姓名" width="180" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop label="操作" align="center" width="180">
            <el-button type="primary" size="mini" @click="selectPeople">重新添加</el-button>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top:20px;margin-bottom:20px" type="flex" justify="space-between">
        <el-col :xs="2" :sm="2" :md="1" :lg="1" :xl="1">
          <el-form-item label="员工" prop="staffNames"></el-form-item>
        </el-col>
        <el-col :xs="4" :sm="3" :md="2" :lg="1" :xl="1">
          <el-button type="primary" @click="selectStaff" size="mini">添加</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;margin-bottom:20px">
        <el-table :data="staffData" style="width: 100%" size="mini">
          <el-table-column prop="fullName" label="姓名" width="180" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="handleRemove(scope.$index, scope.row)"
                type="danger"
                size="mini"
              >删除</el-button>
              <el-button type="primary" size="mini" @click="selectStaff">继续添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <div>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      <el-button size="mini" @click="resetForm">重 置</el-button>
      <el-button size="mini" @click="goBack">返回</el-button>
    </div>
    <el-dialog center title="员工信息" :visible.sync="dialogVisible" width="30%">
      <select-staff
        v-if="dialogVisible"
        ref="selectStaff"
        @onSelectStaff="onSelectStaff"
        @onStaffCancel="onStaffCancel"
        :checkbox-flag="checkboxFlag"
        :staffData="staffData"
      ></select-staff>
    </el-dialog>
  </div>
</template>
<script>
import selectStaff from "../../components/SelectStaffs.vue";

function defaultData() {
  return {
    ruleName: "",
    ruleType: 1,
    taskType: [],
    ticketing: false,
    airlines: {
      inOrEx: 0,
      values: [],
      remark: ""
    },
    segments: {
      inOrEx: 0,
      values: [],
      remark: ""
    },
    flights: {
      inOrEx: 0,
      values: [],
      remark: ""
    },
    cabins: {
      inOrEx: 0,
      values: [],
      remark: ""
    },
    policyCodes: [],
    staffs: [],
    nextStaffId: "",
    principalName: "",
    staffNames: "",
    principal: "",
    autoGrabTicket: false
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
      staffIdList: [],
      taskTypes: [
        { label: "出票", value: 1 },
        { label: "退票", value: 2 },
        { label: "改签", value: 3 },
        { label: "未出票申请退款", value: 4 },
        { label: "消息", value: 5 },
        { label: "质检", value: 6 },
        { label: "补单", value: 11 },
        { label: "填写单号", value: 12 }
      ],
      channels: [
        { label: "蜗牛", value: 1 },
        { label: "BSP", value: 2 }
      ],
      formRules: {
        ruleName: [
          { required: true, message: "请输入规则名称", trigger: "blur" }
        ],
        sort: [{ required: true, message: "请输入序号", trigger: "blur" }],
        policyCodes: [
          { required: true, message: "请输入政策代码", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    _airlines: {
      get: function() {
        return this.formData.airlines.values.join(",");
      },
      set: function(newValue) {
        this.formData.airlines.values = newValue.split(",");
      }
    },
    _segments: {
      get: function() {
        return this.formData.segments.values.join(",");
      },
      set: function(newValue) {
        this.formData.segments.values = newValue.split(",");
      }
    },
    _flights: {
      get: function() {
        return this.formData.flights.values.join(",");
      },
      set: function(newValue) {
        this.formData.flights.values = newValue.split(",");
      }
    },
    _cabins: {
      get: function() {
        return this.formData.cabins.values.join(",");
      },
      set: function(newValue) {
        this.formData.cabins.values = newValue.split(",");
      }
    },
    _policyCodes: {
      get: function() {
        return this.formData.policyCodes.join(",");
      },
      set: function(newValue) {
        this.formData.policyCodes = newValue.split(",");
      }
    }
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
    loadStaffData(flag) {
      this.$store
        .dispatch("staff/getMany", {
          staffIdList: JSON.stringify(this.staffIdList)
        })
        .then(data => {
          if (flag == "1") {
            this.peopleData = data;
          } else {
            this.staffData = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSave() {
      var staffs = [];
      if (this.formData.ruleType == 1) {
        if (this.peopleData.length > 0) {
          this.formData.principal = this.peopleData[0].staffId;
        } else {
          this.$message.error("必须选择负责人");
          return;
        }
        if (this.staffData.length > 0) {
          for (var i = 0; i < this.staffData.length; i++) {
            staffs.push(this.staffData[i].staffId);
          }
        } else {
          this.$message.error("必须选择员工");
          return;
        }
      }
      this.formData.staffs = staffs;
      this.$store
        .dispatch("orderRule/save", this.formData)
        .then(() => {
          this.goBack();
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
    let paramData = this.$route.params;
    if (Object.keys(paramData).length > 0) {
      this.formData = JSON.parse(JSON.stringify(paramData));
      if (this.formData.principal && this.formData.principal != null) {
        this.staffIdList = [];
        this.staffIdList.push(this.formData.principal);
        this.loadStaffData("1");
      }
      if (
        this.formData.staffs &&
        this.formData.staffs != null &&
        this.formData.staffs.length > 0
      ) {
        this.staffIdList = [];
        this.staffIdList = this.formData.staffs;
        this.loadStaffData("0");
      }
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
