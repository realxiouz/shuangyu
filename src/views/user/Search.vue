<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="110px" size="mini">
        
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="用户昵称:">
            <el-input clearable v-model="formData.nickName" placeholder="请输入用户昵称搜索..."></el-input>
          </el-form-item>
        </el-col>

        <!-- 角色 -->
        <!-- <el-col v-if="more" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="角色:">
            <el-select
              style="width: 100%;"
              clearable
              multiple
              v-model="formData.roles"
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleData"
                :key="item.roleName"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->

          <!-- 更多条件 -->
          <el-col v-if="more" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="是否启用:">
              <el-switch v-model="formData.enable"></el-switch>
            </el-form-item>
          </el-col>
          <!--  -->
      </el-form>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="search-tools">
      <el-button
        icon="el-icon-search"
        class="filter-item"
        type="primary"
        size="mini"
        @click="toSearch"
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
  name: "userSearch",
  data() {
    return {
      more: false,
      formData: {
        nickName: "",
        enable: true,
        roles: ""
      },
      roleData: []
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
  created() {
    this.loadRoles();
  },
  methods: {
    handleMore() {
      this.more = !this.more;
    },
    toSearch() {
      let data = {};
      if (!this.more) {
        data = { nickName: this.formData.nickName };
      } else {
        data = this.formData;
      }
      this.$emit("onSearch", data);
    },
    loadRoles() {
      this.$store
        .dispatch("role/getList", {})
        .then(data => {
          this.roleData = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
