<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="源单号:">
            <el-input
              clearable
              v-model="formData.sourceOrderNo"
              @keyup.enter.native="$emit('onSearch', formData)"
              placeholder="请输入源单号搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="任务类型:">
            <el-select style="width: 100%;" clearable v-model="formData.taskType" placeholder="请选择">
              <el-option
                v-for="item in taskTypeValue"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="开始时间:">
            <el-date-picker
              type="date"
              :unlink-panels="true"
              placeholder="选择日期"
              v-model="formData.startCreateTime"
              style="width: 100%;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="结束时间:">
            <el-date-picker
              type="date"
              :unlink-panels="true"
              placeholder="选择日期"
              v-model="formData.endCreateTime"
              style="width: 100%;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="乘机人姓名:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.name"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="乘机人证件号:">
            <el-input
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.cardNo"
              clearable
              style="width: 100%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="任务名称:">
            <el-input
              clearable
              v-model="formData.taskName"
              @keyup.enter.native="$emit('onSearch', formData)"
              placeholder="请输入任务名称搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="政策代码:">
            <el-input
              clearable
              v-model="formData.policyCode"
              @keyup.enter.native="$emit('onSearch', formData)"
              placeholder="请输入政策代码搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航班号:">
            <el-input
              clearable
              v-model="formData.flightCode"
              @keyup.enter.native="$emit('onSearch', formData)"
              placeholder="请输入航班号搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="出发地:">
            <el-input
              clearable
              v-model="formData.dpt"
              @keyup.enter.native="$emit('onSearch', formData)"
              placeholder="请输入出发地搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="到达地:">
            <el-input
              clearable
              v-model="formData.arr"
              @keyup.enter.native="$emit('onSearch', formData)"
              placeholder="请输入到达地搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item v-show="more" label="航班日期:">
            <el-date-picker
              v-model="formData.flightDate"
              type="date"
              value-format="timestamp"
              placeholder="出发日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        icon="el-icon-search"
        class="filter-item"
        type="primary"
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
import { taskTypeValue, taskStatusValue } from "@/utils/status.js";
export default {
  name: "userSearch",
  data() {
    return {
      more: false,
      formData: {
        taskNo: "",
        taskName: "",
        taskType: "",
        taskStatus: "",
        startCreateTime: "",
        endCreateTime: "",
        name:"",
        cardNo:""
      },
      taskTypeValue: taskTypeValue,
      taskStatusValue: taskStatusValue
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
