<template>
  <div class="page-form">
     <el-dialog :title="keyId ?'编辑航司信息':'添加航司信息'" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
    <el-form ref="form" :model="formData" :rules="rules" label-width="110px" size="mini">
      <el-form-item prop="airlineName" label="航司名称:">
        <el-input v-model="formData.airlineName"></el-input>
      </el-form-item>
      <el-form-item prop="airlineCode" label="航司二字码:">
        <el-input v-bind:disabled="disabled" v-model="formData.airlineCode"></el-input>
      </el-form-item>
      <el-form-item prop="_cabins" label="舱位:">
        <el-input v-model="_cabins"></el-input>
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
    airlineCode: "",
    airlineName: "",
    cabins: [],
    flights: [],
    segments: [],
    actions: {
          getOne: 'airline/getOne',
          saveOne: 'airline/save'
        }
  };
}
export default {
  mixins: [MIXIN_EDIT],
  name: "airlineEdit",
 
  data() {
    return {
      formData: defaultData(),
      disabled: false,
      rules: {
        airlineName: [
          { required: true, message: "请输入航司名称", trigger: "blur" }
        ],
        airlineCode: [
          { required: true, message: "请输入航司二字码", trigger: "blur" },
          {
            min: 2,
            max: 2,
            message: "长度为2字符"
          }
        ]
      }
    };
  },
  computed: {
    _cabins: {
      get: function() {
        if (this.formData.cabins) {
          return this.formData.cabins.join(" , ");
        }
      },
      set: function(newValue) {
        if (newValue) {
          this.formData.cabins = newValue.split(" , ");
        }
      }
    }
  },
  methods: {
   
    clearForm() {
      this.formData = defaultData();
    }
  },
  created() {
    this.clearForm();
    if (this.airlineCode) {
      this.disabled = true;
      this.handleGetOne(this.airlineCode);
    }
  }
};
</script>
