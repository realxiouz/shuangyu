<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="110px" size="mini">
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="交易时间:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                :unlink-panels="true"
                placeholder="选择日期"
                v-model="formData.transactionTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>-->
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item prop="startTransactionTime" label="交易时间:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择初始日期"
                  v-model="formData.startTransactionTime"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择结束日期"
                  v-model="formData.endTransactionTime"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="交易完成时间:">
            <el-col>
              <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                :unlink-panels="true"
                placeholder="选择日期"
                v-model="formData.finishTime"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>-->
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item prop="startFinishTime" label="业务完结时间:">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择初始日期"
                  v-model="formData.startFinishTime"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择结束日期"
                  v-model="formData.endFinishTime"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="条件:">
            <el-radio-group v-model="formData.dateRange" style="width: 100%">
              <el-select
                style="width: 100%;"
                clearable
                v-model="formData.dateRange"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dateRangeValue"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单分类:">
            <el-select
              style="width: 100%;"
              clearable
              collapse-tags
              v-model="formData.category"
              placeholder="请选择"
            >
              <el-option label="销售单" value="0"></el-option>
              <el-option label="采购单" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="订单类型:">
            <el-select clearable v-model="formData.orderType" placeholder="全部" style="width: 100%">
              <el-option label="出票完成" value="10"></el-option>
              <el-option label="改签完成" value="30"></el-option>
              <el-option label="二次改签" value="31"></el-option>
              <el-option label="退票完成" value="20"></el-option>
              <el-option label="二次退票" value="21"></el-option>
              <el-option label="退差" value="22"></el-option>
              <el-option label="退改" value="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="平台账号:">
            <el-input
              @keyup.enter.native="handleSearch"
              v-model="formData.accountId"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="handleSearch"
      >查询</el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "orderReportSearch",
  data() {
    var validateTransactionTime = (rule, value, callback) => {
      if (value > this.formData.endTransactionTime) {
        callback(new Error("开始日期不能大于结束日期!"));
      } else {
        callback();
      }
    };
    var validateFinishTime = (rule, value, callback) => {
      if (value > this.formData.endFinishTime) {
        callback(new Error("开始日期不能大于结束日期!"));
      } else {
        callback();
      }
    };
    return {
      more: false,
      formData: {
        transactionTime: "",
        dateRange: "",
        finishTime: ""
      },
      formRules: {
        startTransactionTime: [
          { validator: validateTransactionTime, trigger: "blur" }
        ],
        startFinishTime: [{ validator: validateFinishTime, trigger: "blur" }]
      },
      dateRangeValue: [
        {
          value: "year",
          label: "按年查询"
        },
        {
          value: "month",
          label: "按月查询"
        },
        {
          value: "week",
          label: "按周查询"
        },
        {
          value: "day",
          label: "按日查询"
        }
      ]
    };
  },
  computed: {
    switchIcon() {
      if (!this.more) {
        return "el-icon-arrow-down el-icon--right";
      } else {
        return "el-icon-arrow-up el-icon--right";
      }
    }
  },
  methods: {
    handleMore() {
      this.more = !this.more;
    },
    handleSearch(){
      this.$refs.form.validate((valid)=>{
        if(valid){
          this.$emit('onSearch', this.formData)
        }

      })

    }
  }
};
</script>

<style scoped></style>
