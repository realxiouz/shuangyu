<template>
  <el-row type="flex" justify="space-between" align="bottom">
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-form :model="formData" label-width="60px" size="mini">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="昵称:">
            <el-input clearable v-model="formData.nickName" placeholder="请输入昵称..."></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="姓名:">
            <el-input clearable v-model="formData.fullName" placeholder="请输入姓名..."></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="75px" label="手机号:">
            <el-input clearable v-model="formData.phone" placeholder="请输入手机号..."></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label-width="90px" label="电子邮箱:">
            <el-input clearable v-model="formData.email" placeholder="请输入电子邮箱..."></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="more" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="角色:">
            <el-select style="width: 100%;" clearable multiple v-model="formData.roles" placeholder="请选择">
              <el-option
                v-for="item in roleData"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 更多条件 -->
        <el-col v-if="more" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="启用:">
            <el-select v-model="formData.enable" placeholder="请选择">
              <el-option
                v-for="item in enableOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
        @click="$emit('onSearch', formData)"
      >查询
      </el-button>
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
          fullName: "",
          phone: "",
          email: "",
          enable: null,
          roles: ""
        },
        enableOptions: [{
          value: null,
          label: '全部'
        }, {
          value: true,
          label: '已启用'
        }, {
          value: false,
          label: '未启用'
        }],
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
