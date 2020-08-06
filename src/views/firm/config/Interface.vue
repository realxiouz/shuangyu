<template>
  <div class="home contentBox">
    <div>订单接口管理</div>
    <div class="page-back">
      <el-button-group>
        <el-button icon="el-icon-back" type="warning" @click="goBack"
          >返回</el-button
        >
        <el-button icon="el-icon-plus" type="primary" @click="handleSave"
          >保存</el-button
        >
      </el-button-group>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row class="el-row-item">
        <el-col :span="12">
          <el-form-item label="域名:">
            <el-input placeholder="请输入域名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名:">
            <el-input placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码:">
            <el-input placeholder="请输入密码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="IP:">
            <el-input type="textarea" placeholder="请输入IP" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "orderInterface",
  data(){
    return{
      form: {
        name: "",
        type: [],
      }
    }
  },
  methods:{
    goBack() {
      let lastName = localStorage.getItem("lastName");
      if (lastName) {
        this.$router.push({ name: lastName });
        localStorage.removeItem("lastName");
      } else {
        this.$router.go(-1);
      }
    },
    handleSave( ) {},
  }
};
</script>

<style scoped>
.el-row-item {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 20px 20px 0 0;
  width: 870px;
  margin-left: 20px;
}
.page-back {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
