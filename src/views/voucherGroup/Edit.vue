<template>
  <div class="page-form">
    <el-dialog title="凭证字管理" width="24%" center :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="凭证字：" prop="voucherGroupName">
          <el-input v-model="formData.voucherGroupName" placeholder="请输入凭证字" />
        </el-form-item>
        <el-form-item label="标题：" prop="voucherGroupTitle">
          <el-input v-model="formData.voucherGroupTitle" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="是否默认：" prop="defaultFlag">
          <el-switch v-model="formData.defaultFlag" @click="handleSwitch"></el-switch>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      editGroupId: {
        type: String,
        default: null
      }
    },
    data() {
      const chineseValidator = (rule, value, callback) => {
        let reg = /^[\u4e00-\u9fa5]+$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入中文！"));
        }
      };
      return {
        dialogVisible: false,
        formData: this.defaultFormData(),
        rules: {
          voucherGroupName: [
            {required: true, message: "请输入凭证字", trigger: "blur"},
            {
              min: 1,
              max: 1,
              message: "长度 1 个字符"
            },
            {validator: chineseValidator, trigger: 'blur'}
          ],
          voucherGroupTitle: [
            {required: true, message: "请输入标题", trigger: "blur"},
            {
              min: 1,
              max: 8,
              message: "长度在 1到 8 个字符"
            },
            {validator: chineseValidator, trigger: 'blur'}
          ]
        }
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (val) {
          if (this._.isEmpty(this.editGroupId)) {
            this.formData = this.defaultFormData();
          } else {
            this.loadData();
          }
        }
      }
    },
    methods: {
      handleOpen() {
        this.$emit('update:visible', true);
      },
      handleClose() {
        this.$emit('update:visible', false);
      },
      handleSwitch(){
        this.defaultFlag = !this.defaultFlag;
      },
      handleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$store
              .dispatch("voucherGroup/saveOne", this.formData)
              .then(() => {
                if (!this._.isEmpty(this.editGroupId)) {
                  this.formData.voucherGroupId = this.editGroupId;
                }
                this.dialogVisible = false;
                this.$emit('refresh');
                this.$message({type: "success", message: "保存成功"});
              });
          }
        });
      },
      defaultFormData() {
        return {
          voucherGroupId: null,
          voucherGroupName: null,
          voucherGroupTitle: null,
          defaultFlag: null
        };
      },
      loadData() {
        this.$store
          .dispatch("voucherGroup/getOne", {voucherGroupId: this.editGroupId})
          .then(data => {
            this.formData = data;
          });
      }
    }
  };
</script>
