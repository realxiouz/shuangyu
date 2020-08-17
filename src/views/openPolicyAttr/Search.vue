<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="80px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="平台名称:">
            <el-input
              clearable
              placeholder="请输入平台名称搜索..."
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.openName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="属性编码:">
            <el-input
              clearable
              placeholder="请输入属性编码搜索..."
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.code"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="属性名称:">
            <el-input
              clearable
              placeholder="请输入属性名称搜索..."
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="政策类型:">
            <el-select
              v-model="formData.policyType"
              clearable
              placeholder="请选择政策类型"
              style="width: 100%"
            >
              <el-option
                v-for="item in policyTags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="是否必填：" v-show="more" label-width="120px">
            <el-radio-group v-model="formData.required">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
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
        @click="onSearch"
      >查询
      </el-button>
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
  export default {
    name: "search",
    data() {
      return {
        more: false,
        formData: {
          openName: null,
          code: null,
          name: null,
          policyType: null,
          required: null
        },
        policyTags: [
          {
            value: 'ONE_WAY_GENERAL_POLICY',
            label: '单程普通政策'
          },
          {
            value: 'ONE_WAY_SPECIAL_POLICY',
            label: '单程特价政策'
          },
          {
            value: 'ONE_WAY_APPLY_POLICY',
            label: '单程申请政策'
          },
          {
            value: 'ONE_WAY_PAY_POLICY',
            label: '单程预付政策'
          },
          {
            value: 'ONE_WAY_CHANGE_POLICY',
            label: '单程包机切位政策'
          },
          {
            value: 'RETURN_SPECIAL_POLICY',
            label: '往返特价政策'
          },
          {
            value: 'RETURN_PAY_POLICY',
            label: '往返预付政策'
          },
          {
            value: 'RETURN_GENERAL_POLICY',
            label: '往返普通政策'
          },
          {
            value: 'RETURN_CHANGE_POLICY',
            label: '往返包机切位政策'
          },
          {
            value: 'ALL_ONE_WAY_POLICY',
            label: '所有单程类型'
          },
          {
            value: 'ALL_RETURN_POLICY',
            label: '所有往返类型'
          },
          {
            value: 'NEW_ONE_WAY_CHANGE_POLICY',
            label: '新包机切位单程'
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
      initSearchForm() {
        return {
          openName: null,
          code: null,
          name: null,
          policyType: null,
          required: null
        };
      },
      onSearch() {
        this.$emit("onSearch", this.formData);
      },
      handleClear() {
        this.formData = this.initSearchForm();
        this.onSearch();
      },
      handleMore() {
        this.more = !this.more;
      }
    }
  };
</script>

<style>
  .el-radio-group label {
    width: 60px;
    margin-right: 0;
  }
</style>
