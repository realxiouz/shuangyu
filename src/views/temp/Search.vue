<template>
  <el-row type="flex" class="row-bg" justify="space-between" align="bottom">
    <el-col :span="20">
      <el-form :inline="true" :model="formData">
        <el-form-item label="姓名">
          <el-input v-model="formData.fullName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formData.gender" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formData.fullName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="more" label="性别">
          <el-select v-model="formData.gender" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="more" label="姓名">
          <el-input v-model="formData.fullName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="more" label="性别">
          <el-select v-model="formData.gender" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="more" label="姓名">
          <el-input v-model="formData.fullName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="more" label="性别">
          <el-select v-model="formData.gender" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="more" label="姓名">
          <el-input v-model="formData.fullName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="more" label="性别">
          <el-select v-model="formData.gender" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="more" label="姓名">
          <el-input v-model="formData.fullName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="more" label="性别">
          <el-select v-model="formData.gender" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="more" label="姓名">
          <el-input v-model="formData.fullName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="more" label="性别">
          <el-select v-model="formData.gender" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4" class="search-tools">
      <el-button type="primary" @click="$emit('onSearch',formData)">查询</el-button>
      <el-button type="primary" @click="$emit('onAdd')">添加</el-button>
      <el-button type="primary" @click="handleMore">更多</el-button>
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
          fullName: "",
          gender: ""
        }
      };
    },
    methods: {
      handleMore() {
        this.more = !this.more;
      }
    }
  };
</script>

<style scoped>

</style>
