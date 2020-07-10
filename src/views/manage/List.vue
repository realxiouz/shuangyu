<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="8">
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
              <el-select v-model="formData.changeCode" placeholder="请选择状态编码" style="width: 100%">
                <el-option label="支付成功等待出票(订座成功等待支付)" value="0101"></el-option>
                <el-option label="支付成功等待出票(未出票申请退款)" value="0102"></el-option>
                <el-option label="支付成功等待出票(订单取消)" value="0103"></el-option>
                <el-option label="支付成功等待出票(等待座位确认)" value="0104"></el-option>
                <el-option label="出票完成" value="0204"></el-option>
                <el-option label="未出票申请退款(出票中)" value="0202"></el-option>
                <el-option label="未出票申请退款(支付成功等待出票)" value="0201"></el-option>
                <el-option label="退票申请中(出票完成)" value="0301"></el-option>
                <el-option label="改期申请中(出票完成)" value="0401"></el-option>
                <el-option label="改期申请中(未知)" value="0402"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8"></el-col>
      <el-col :span="8"></el-col>
    </el-row>
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
                    notifyUrl: ""
                }
            };
        },
        methods: {
            // 获得详情
            orderNotify() {
                this.$store
                    .dispatch("manage/notify", {
                        orderNo: this.formData.orderNo,
                        changeCode: this.formData.changeCode,
                        notifyUrl: this.formData.notifyUrl
                    })
                    .then(data => {
                        if (data) {
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
