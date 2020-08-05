<template>
  <div class="page">
    <div >
      <el-tabs :tab-position="tabPosition" style="min-height: 200px;">
        <el-tab-pane label="订单通知管理">
          <div class="page-back">
            <el-button-group>
              <el-button icon="el-icon-back" type="warning" @click="goBack">返回</el-button>
              <el-button icon="el-icon-plus" type="primary" @click="handleSave">保存</el-button>
            </el-button-group>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-row class="el-row-item">
              <el-col :span="12">
                <el-form-item label="域名:">
                  <el-input placeholder="请输入导航名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="安全码：">
                  <el-input placeholder="请输入导航地址" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="消息通知地址：">
                  <el-input type="textarea" placeholder="请输入导航地址" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="订单接口管理">配置管理</el-tab-pane>
        <el-tab-pane label="订单更新管理">角色管理</el-tab-pane>
        <el-tab-pane label="政策配置管理">政策配置管理</el-tab-pane>
        <el-tab-pane label="政策导入管理">政策导入管理</el-tab-pane>
      </el-tabs>
      <el-row class="el-row-right"> </el-row>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onClick(index) {
      this.current = index;
      console.log(index);
    },
    goBack() {
      if (this.$router.history.length <= 1) {
        this.$router.push({ path: "/home" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    handleSave() {},
    handleCheckAll(val) {
      this.tabsCheckeds = val ? this.tabsOptions : [];
      this.isIndeterminate = false;
    },
    handleChange(val) {
      if (val && val.length > 0) {
        let num = val.length - 1;
        let selObj = val[num];
        this.current = this.getIndexByArray(this.tabsOptions, selObj);
        this.selTab = selObj;
      }
      let checkedCount = val.length;
      this.checkAll = checkedCount === this.tabsOptions.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tabsOptions.length;
    },
    getIndexByArray(array, selObj) {
      if (array && array.length > 0 && selObj) {
        let num = 0;
        let index = -1;
        array.forEach(obj => {
          if (obj === selObj) {
            index = num;
          }
          num++;
        });
        return index;
      }
    }
  },
  data() {
    return {
      tabPosition: "left",
      current: 0,
      checked: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  }
};
</script>
<style scoped>
.page{
}
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
}
</style>
