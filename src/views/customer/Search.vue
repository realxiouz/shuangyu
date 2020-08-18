<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="90px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="客户名称：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.firmName"
              placeholder="请输入客户名称搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="客户代码：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.firmCode"
              placeholder="请输入客户代码搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="联系人：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.fullName"
              placeholder="请输入联系人搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="100px" label="联系人电话：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.phone"
              placeholder="请输入联系人电话搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="more" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="邮箱：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.email"
              placeholder="请输入联系人电话搜索..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="more" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="重要性：">
             <el-rate
             clearable
            @keyup.enter.native="$emit('onSearch', formData)"
            v-model="formData.priority"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          />
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
export default {
  data() {
    return {
      more: false,
      formData: {
        firmName: null,
        firmCode: null,
        fullName: null,
        phone:null,
        email:null,
        priority:null

      }
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
      // if ("" == this.formData.firmName){
      //     this.formData.firmName = null;
      // }
        this.$emit("onSearch", this.formData);
    }
  }
};
</script>
