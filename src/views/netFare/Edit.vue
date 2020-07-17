<template>
  <div class="page-form">
    <el-form :model="formData" label-width="110px" size="mini">
      <el-form-item label="航班号">
        <el-input v-model="formData.flightCode" @input="toUpperCase"></el-input>
      </el-form-item>
      <el-form-item label="票价标签">
        <el-select
          v-model="formData.tag"
          placeholder="请选择票价标签.."
          style="width: 100%"
        >
          <el-option label="折扣" value="0"></el-option>
          <el-option label="反点" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="折扣">
        <el-input
          v-if="'0' != formData.tag"
          v-model="formData.discount"
          placeholder="请输入反点.."
        ></el-input>
        <el-select
          v-if="'0' === formData.tag"
          v-model="formData.discount"
          placeholder="请选择折扣.."
          style="width: 100%"
        >
          <el-option
            v-for="(item, idx) in discountValue"
            :key="item"
            :label="1 === item ? '全价' : ' ' + idx + ' 折'"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="formData.endDate"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 100%"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["curNode", "update"],
  data() {
    return {
      formData: {},
      discountValue: [1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
    };
  },
  methods: {
    /*表单默认加载数据*/
    defaultFormData() {
      return {
        //航班号
        flightCode: "",
        //折扣
        discount: 1.0,
        //结束日期
        endDate: new Date(),
        //票价标签
        tag: "0"
      };
    },
    /*清除表单*/
    clearForm() {
      this.formData = this.defaultFormData();
    },
    /*对提交的数据进行类型格式*/
    handleConfirm() {
      if (this.formData.endDate && "number" != typeof this.formData.endDate) {
        this.formData.endDate = this.formData.endDate.getTime();
      }
      this.$emit("onSave", this.formData);
    },
    initFormData() {
      this.clearForm();
      if (this.update) {
        Object.assign(this.formData, this.curNode);
      }
    },
    toUpperCase() {
      this.formData.flightCode = this.formData.flightCode.toUpperCase();
    }
  },
  created() {
    this.initFormData();
  }
};
</script>
