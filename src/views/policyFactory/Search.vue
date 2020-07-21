<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="80px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="调度名称:">
            <el-input
              clearable
              placeholder="请输入调度名称..."
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.schedulerName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="xxlJobId:">
            <el-input
              clearable
              placeholder="请输入xxlJobId..."
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.jobInfoId"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="状态:">
            <el-select
              v-model="formData.status"
              clearable
              placeholder="请选择状态..."
              style="width: 100%"
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
          schedulerName: null,
          jobInfoId: null,
          status: null
        },
        statusList:[
          {
            label: "已启动",
            value: 1
          },{
            label: "未启动",
            value: 0
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
          schedulerName: null,
          jobInfoId: null,
          status: null
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
