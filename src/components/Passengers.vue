<template>
  <el-row>
    <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
      <el-table :data="value" border>
        <el-table-column label="乘客类型">
          <template v-slot="{ row }">
            <el-select v-model="row.ageType">
              <el-option
                v-for="(i, inx) in ageTypes"
                :key="inx"
                :label="i.label"
                :value="i.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template v-slot="{ row }">
            <el-input v-model="row.fullName" />
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template v-slot="{ row }">
            <el-input v-model="row.phone" />
          </template>
        </el-table-column>
        <el-table-column label="证件类型">
          <template v-slot="{ row }">
            <el-select v-model="row.idCardType">
              <el-option
                v-for="(i, inx) in cardTypes"
                :key="inx"
                :label="i.label"
                :value="i.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="证件号">
          <template v-slot="{ row }">
            <el-input v-model="row.idCardNo" />
          </template>
        </el-table-column>
        <el-table-column>
          <template v-slot:header="{}">
            <el-button type="primary" @click="onAddPassanger">添加</el-button>
          </template>
          <template v-slot="{ $index }">
            <el-button type="danger" @click="onDelByInx($index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { AGE_TYPES, CARD_TYPES } from "@/utils/const";

export default {
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      cardTypes: CARD_TYPES,
      ageTypes: AGE_TYPES
    };
  },
  methods: {
    onDelByInx(inx) {
      this.value.splice(inx, 1);
      this.$emit("input", this.value);
    },
    onAddPassanger() {
      this.value.push({
        fullName: "",
        ageType: 0,
        idCardType: "NI",
        idCardNo: "",
        phone: ""
      });
      this.$emit("input", this.value);
    },
    validate() {
      for (const i of this.value) {
        if (!i.fullName) {
          return false
        }
      }
      return true
    }
  }
};
</script>
