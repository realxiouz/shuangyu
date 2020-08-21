<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="80px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="会员编号:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.memberNo"
              placeholder="请输入会员编号搜素..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="会员名称:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.memberName"
              placeholder="请输入会员名称搜素..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="会员类型:" prop="memberType">
            <el-select
              style="width: 100%;"
              v-model="formData.memberType"
              placeholder="请选择会员类型..."
              filterable
              clearable
            >
              <el-option
                v-for="item in memberTypeList"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="会员状态:" prop="status">
            <el-select
              style="width: 100%;"
              v-model="formData.status"
              placeholder="请选择会员状态..."
              filterable
              clearable
            >
              <el-option
                v-for="item in memberStatusList"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              ></el-option>
            </el-select>
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
      <el-button
        icon="el-icon-refresh"
        class="filter-item"
        type="primary"
        size="mini"
        @click="handleClear"
      >清空</el-button>
      <el-button type="text" size="mini" @click="handleMore">
        更多
        <i :class="switchIcon"></i>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
  import { MEMBER_TYPES, MEMBER_STATUS } from '@/utils/const'
  export default {
    name: "roleSearch",
    data() {
      return {
        more: false,
        formData: {
          memberNo: null,
          memberName: null,
          memberType: null,
          status: null
        },
        memberTypeList: MEMBER_TYPES,
        memberStatusList: MEMBER_STATUS
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
      initSearchForm() {
        return {
          memberNo: null,
          memberName: null,
          memberType: null,
          status: null
        };
      },
      handleClear() {
        this.formData = this.initSearchForm();
        this.$emit("onSearch", this.formData);
      },
      handleMore() {
        this.more = !this.more;
      }
    }
  };
</script>
