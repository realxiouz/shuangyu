<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="80px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="会员名称:">
            <el-select
              style="width: 100%;"
              v-model="formData.memberId"
              placeholder="请选择会员名称..."
              filterable
              clearable
            >
              <el-option
                v-for="item in memberList"
                :key="item.memberId"
                :label="item.memberName"
                :value="item.memberId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="账户编号:">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.accountNo"
              placeholder="请输入账户编号搜素..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="账户类型:">
            <el-select
              style="width: 100%;"
              v-model="formData.accountType"
              placeholder="请选择账户类型..."
              filterable
              clearable
            >
              <el-option
                v-for="item in accountTypeList"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="账户状态:" prop="status">
            <el-select
              style="width: 100%;"
              v-model="formData.status"
              placeholder="请选择账户状态..."
              filterable
              clearable
            >
              <el-option
                v-for="item in accountStatusList"
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
          memberId: null,
          accountNo: null,
          accountType: null,
          status: null
        },
        accountTypeList: MEMBER_TYPES,
        accountStatusList: MEMBER_STATUS,
        memberList: []
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
      getMemberList(){
        this.$store
          .dispatch("member/getList", {})
          .then(data => {
            if(data && data.length > 0){
              this.memberList = data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      initSearchForm() {
        return {
          memberId: null,
          accountNo: null,
          accountType: null,
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
    },
    created() {
      this.getMemberList();
    }
  };
</script>
