<template>
  <div class="page-form">
    <el-dialog
      :title="keyId!= '' ? '编辑仓库信息' : '添加仓库信息'"
      :visible.sync="dialogVisible"
      @open="onOpen"
      @close="onClose"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        label-width="110px"
        size="mini"
      >
        <el-form-item label="仓库编码:" prop="warehouseCode">
          <el-input
            v-model="formData.warehouseCode"
            placeholder="请输入仓库编码..."
            :disabled="codeEnabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库名称:" prop="warehouseName">
          <el-input
            v-model="formData.warehouseName"
            placeholder="请输入仓库名称..."
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-input
            v-model="formData.contact"
            placeholder="请输入联系人..."
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人电话:" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入联系人电话..."
          ></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input
            v-model="formData.address"
            placeholder="请输入地址..."
          ></el-input>
        </el-form-item>
        <el-form-item label="库管">
          <el-select
            style="width: 100%;"
            clearable
            multiple
            v-model="formData.userIds"
            placeholder="请选择"
          >
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { MIXIN_EDIT } from "@/utils/mixin";
function defaultData() {
  return {
    //仓库编码
    warehouseCode: "",
    //仓库名称
    warehouseName: "",
    //地址
    address: "",
    //联系电话
    phone: "",
    //联系人
    contact: "",
    //库管
    userIds: []
  };
}

export default {
  mixins: [MIXIN_EDIT],
  name: "warehouseEdit",
  props: {
    pid: {
      type: String,
      default: null
    }
  },
  data() {
    const codeValidator = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z_]*$/g;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("只能输入字母或数字！"));
      }
    };
    const phoneValidator = (rule, value, callback) => {
      if (value) {
        let reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号码！"));
          return;
        }
      }
      callback();
    };
    return {
      codeEnabled: false,
      formData: null,
      firmList: [],
      newDialogVisible: false,
      actions: {
        getOne: "warehouse/getOne",
        saveOne: "warehouse/saveOne"
      },
      rules: {
        warehouseCode: [
          { required: true, message: "请输入仓库编码" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          },
          { validator: codeValidator, trigger: "blur" }
        ],
        warehouseName: [
          { required: true, message: "请输入仓库名称" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          }
        ],
        phone: [
          { required: false, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          },
          { validator: phoneValidator, trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.formData = defaultData();
        if (this.pid) {
          this.formData.pid = this.pid;
        }
        if(this.keyId){
          this.codeEnabled = true;
        }else{
          this.codeEnabled = false;
        }
      }
    }
  },
  methods: {

  }
};
</script>
