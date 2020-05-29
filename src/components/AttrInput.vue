<template>
  <el-row>
    <el-col :span="24">
      <el-input v-if="valueType===0" v-model="value" :disabled="disabled"></el-input>
      <el-switch v-if="valueType===1" v-model="value" :disabled="disabled"></el-switch>
      <el-input-number v-if="valueType===2" v-model="value" :disabled="disabled" :max="max" :min="min" :step="step"
                       :precision="precision"></el-input-number>
      <el-date-picker v-if="valueType===3" v-model="value" type="date" placeholder="选择日期"
                      :disabled="disabled"></el-date-picker>
      <el-date-picker v-if="valueType===4" v-model="value" type="datetime" placeholder="选择日期时间"
                      :disabled="disabled"></el-date-picker>
      <el-time-picker v-if="valueType===5" arrow-control v-model="value" :disabled="disabled"
                      :picker-options="{selectableRange: '00:00:00 - 23:59:00'}"></el-time-picker>
      <el-rate v-if="valueType===6" v-model="value" :disabled="disabled"></el-rate>
      <el-radio-group v-if="valueType===7" v-model="value" :disabled="disabled">
        <el-radio v-for="attr in attributes" :key="attr.code" :label="attr.value">{{attr.value}}</el-radio>
      </el-radio-group>
      <el-checkbox-group v-if="valueType===8" v-model="value" :disabled="disabled">
        <el-checkbox v-for="attr in attributes" :key="attr.code" :label="attr.value">{{attr.value}}</el-checkbox>
      </el-checkbox-group>
      <el-select v-model="value" v-if="valueType===9" :disabled="disabled">
        <el-option v-for="attr in attributes" :key="attr.code" :label="attr.value" :value="attr.value"></el-option>
      </el-select>
    </el-col>
    <el-col v-if="valueType===2" :span="6">
      <el-input-number v-if="valueType===2" v-model="step" :controls="false"
                       :precision="0"></el-input-number>
    </el-col>
    <el-col v-if="valueType===2" :span="6">
      <el-input-number v-if="valueType===2" v-model="max" :controls="false"
                       :precision="0"></el-input-number>
    </el-col>
    <el-col v-if="valueType===2" :span="6">
      <el-input-number v-if="valueType===2" v-model="min" :controls="false"
                       :precision="0"></el-input-number>
    </el-col>
    <el-col v-if="valueType===2" :span="6">
      <el-input-number v-if="valueType===2" v-model="precision" :controls="false"
                       :precision="0"></el-input-number>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "AttrInput",
    props: {
      valueType: {
        type: Number,
        required: true
      },
      attributes: Array,
      step: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      value: {},
      disabled: Boolean,
      precision: {
        type: Number,
        validator(val) {
          return val >= 0 && val === parseInt(val, 10);
        }
      }
    },
    data() {
      return {
        currentValue: {},
      }
    }
  }
</script>

<style scoped>

</style>
