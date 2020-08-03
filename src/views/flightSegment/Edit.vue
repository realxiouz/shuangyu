<template>
  <div class="page-form">
    <el-dialog :title="keyId ?'编辑航段信息':'添加航段信息'" center :visible.sync="dialogVisible" width="30%" @open="onOpen" @close="onClose">
    <el-form ref="form" :model="formData" :rule="rules" label-width="110px" size="mini">
      <el-form-item prop="dpt" label="出发地:">
        <el-input v-bind:disabled="disabled" v-model="formData.dpt"></el-input>
      </el-form-item>
      <el-form-item prop="arr" label="目的地:">
        <el-input v-bind:disabled="disabled" v-model="formData.arr"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
import {MIXIN_EDIT} from "@/utils/mixin";
function defaultData() {
  return {
    dpt: "",
    arr: "",
    flights: [],
    airlines: []
  };
}
export default {
  mixins: [MIXIN_EDIT],
   props: {
    segment: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      formData: defaultData(),
      disabled: false,
      actions: {
        getOne: 'flightSegment/getOne',
        saveOne: 'flightSegment/save'
      },
      rules: {
        dpt: [
          { required: true, message: "请输入出发地三字码", trigger: "blur" },
          {
            min: 3,
            max: 3,
            message: "长度为3字符"
          }
        ],
        arr: [
          { required: true, message: "请输入目的地三字码", trigger: "blur" },
          {
            min: 3,
            max: 3,
            message: "长度为3字符"
          }
        ]
      }
    };
  },
  methods: {
    beforeLoadData(data) {
      console.log(data);
      return data;
    }
  }
};
</script>
