<template>
  <div class="page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>模拟订单通知</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="orderNotify">通知</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="调用地址">
          <el-input v-model="formData.notifyUrl"></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="formData.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="状态编码">
          <el-select v-model="formData.changeCode" placeholder="请选择状态编码">
            <el-option label="0101" value="shanghai"></el-option>
            <el-option label="0102" value="beijing"></el-option>
            <el-option label="0103" value="shanghai"></el-option>
            <el-option label="0104" value="beijing"></el-option>
            <el-option label="0204" value="shanghai"></el-option>
            <el-option label="0202" value="beijing"></el-option>
            <el-option label="0201" value="shanghai"></el-option>
            <el-option label="0301" value="beijing"></el-option>
            <el-option label="0401" value="beijing"></el-option>
            <el-option label="0402" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "List",
    data() {
      return {
        formData: {
          orderNo: "",
          changeCode: "",
          notifyUrl:""
        }
      };
    },
    methods: {
      // 获得详情
      orderNotify() {
        this.$store
          .dispatch("manage/notify", {orderNo:this.orderNo,changeCode:this.changeCode,notifyUrl:this.notifyUrl})
          .then(data => {
            if(data){
              this.$message({
                type: "success",
                message: "调用成功！"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
</script>
