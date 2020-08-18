<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="100px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="供应商名称：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.firmName"
              placeholder="请输入供应商名称搜索.."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="供应商代码：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.firmCode"
              placeholder="请输入供应商代码搜索.."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="70px" label="联系人：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.fullName"
              placeholder="请输入联系人搜索.."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="联系人电话：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.phone"
              placeholder="请输入联系人电话搜索.."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="60px" label="邮箱：">
            <el-input
              clearable
              @keyup.enter.native="$emit('onSearch', formData)"
              v-model="formData.email"
              placeholder="请输入邮箱搜索.."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="70px" label="重要性：">
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
        firmName: "",
        firmCode:"",
        fullName:'',
        phone:'',
        email:'',
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
    }
  }
};
</script>
