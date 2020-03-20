<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.fareId" />
      <el-form-item label="航段">
        <el-input v-model="formData.segment"></el-input>
      </el-form-item>
      <el-form-item label="出发地三字码">
        <el-input v-model="formData.dpt"></el-input>
      </el-form-item>
      <el-form-item label="目的地三字码">
        <el-input v-model="formData.arr"></el-input>
      </el-form-item>
      <el-form-item label="航司二字码">
        <el-input v-model="formData.airlineCode"></el-input>
      </el-form-item>
      <el-form-item label="航司舱位">
        <el-input v-model="formData.cabin"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="formData.price"></el-input>
      </el-form-item>
      <el-form-item label="往返价格">
        <el-input v-model="formData.roundTripPrice"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="formData.startDate"
          type="datetime"
          style="width:100%"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["curNode"],
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    /*表单默认加载数据*/
    defaultFormData() {
      return {
        fareId: "",
        segment: "",
        dpt: "",
        arr: "",
        airlineCode: "",
        cabin: "",
        price: null,
        roundTripPrice: null,
        startDate: null
      };
    },
    /*清除表单*/
    clearForm() {
      this.formData = this.defaultFormData();
    },
    /*对提交的数据进行类型格式*/
    handleConfirm() {
      this.formData.segment = this.formData.segment.toUpperCase();
      this.formData.dpt = this.formData.dpt.toUpperCase();
      this.formData.arr = this.formData.arr.toUpperCase();
      this.formData.airlineCode = this.formData.airlineCode.toUpperCase();
      this.formData.cabin = this.formData.cabin.toUpperCase();
      if ("number" != typeof this.formData.startDate) {
        this.formData.startDate = this.formData.startDate.getTime();
      }
      this.$emit("onSave", this.formData);
    },
    initFormData() {
      this.clearForm();
      if ("" != this.curNode.fareId) {
        this.formData = this.curNode;
      }
    }
  },
  created() {
    this.initFormData();
  }
};
</script>
