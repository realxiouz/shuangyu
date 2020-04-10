<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
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
        </el-col> -->
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item  label="时间:">
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
        </el-col> -->
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item  label="业务完结时间:">
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
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="$emit('onSearch', formData)"
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
    return {
      more: false,
      formData: {
        transactionTime: "",
        dateRange: "",
        finishTime: ""
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
          label: "按天查询"
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
    }
  }
};
</script>

<style scoped></style>
