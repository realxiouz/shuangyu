<template>
  <div>
    <el-form :model="formData" ref="form" :rules="rules" label-width="110px" size="mini">
      <el-form-item label="仓库编码:" prop="warehouseCode">
        <el-input
          v-model="formData.warehouseCode"
          onkeyup="this.value=this.value.toUpperCase()"
          :disabled="update"
          placeholder="请输入仓库编码..."
        ></el-input>
      </el-form-item>
      <el-form-item label="仓库名称:" prop="warehouseName">
        <el-input v-model="formData.warehouseName" placeholder="请输入仓库名称..."></el-input>
      </el-form-item>
      <el-form-item label="联系人:">
        <el-input v-model="formData.contact" placeholder="请输入联系人..."></el-input>
      </el-form-item>
      <el-form-item label="联系人电话:">
        <el-input v-model="formData.phone" placeholder="请输入联系人电话..."></el-input>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input v-model="formData.address" placeholder="请输入地址..."></el-input>
      </el-form-item>
      <el-form-item label="库管">
        <el-select
          style="width: 100%;"
          clearable
          multiple
          v-model="formData.userIds"
          placeholder="请选择"
        >
          <!--<el-option
            v-for="item in []"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
          ></el-option>-->
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["curNode", "update"],
  data() {
    const codeValidator = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]*$/g;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("只能输入字母或数字！"));
      }
    };
    return {
      formData: {},
      currencyList: [],
      subjectList: [],
      subject: null,
      rules: {
        warehouseCode: [
          { required: true, message: "请输入仓库编码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          },
          { validator: codeValidator, trigger: "blur" }
        ],
        warehouseName: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1到 20 个字符"
          }
        ]
      }
    };
  },
  methods: {
    /*表单默认加载数据*/
    defaultFormData() {
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
    },
    /*清除表单*/
    clearForm() {
      this.formData = this.defaultFormData();
    },
    /*对提交的数据进行类型格式*/
    handleConfirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.formData.warehouseCode && !"" != this.formData.warehouseCode)
            this.formData.warehouseCode = this.formData.warehouseCode.toUpperCase();
          this.$emit("onSave", this.formData);
        }
      });
    },
    initFormData() {
      this.clearForm();
      if (this.update) {
        Object.assign(this.formData, this.curNode);
      }
    }
  },
  created() {
    this.initFormData();
  }
};
</script>
