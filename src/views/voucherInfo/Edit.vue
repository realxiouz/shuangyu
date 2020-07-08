<template>
  <div class="page-form">
    <el-dialog title="凭证字管理" width="24%" center :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-form-item label="凭证字：" prop="voucherGroupId">
          <el-select v-model="formData.voucherGroupId" style="width: 100%;"  placeholder="请选择凭证字">
            <el-option
              v-for="(item,idx) in voucherGroupList"
              :key="idx"
              :label="item.name + ' - ' + item.title"
              :value="item.voucherGroupId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="凭证数：" prop="num">
          <el-input v-model="formData.num" placeholder="请输入凭证数" />
        </el-form-item>
        <el-form-item label="凭证日期:">
          <el-date-picker v-model="formData.date" type="date" placeholder="请选择凭证日期" style="width: 100%;"></el-date-picker>
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
      editInfoId: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        dialogVisible: false,
        formData: this.defaultFormData(),
        voucherGroupList: [],
        rules: {

        }
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (val) {
          if (this._.isEmpty(this.editInfoId)) {
            this.formData = this.defaultFormData();
          } else {
            this.loadData();
          }
          this.loadVoucherGroup();
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
      handleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$store
              .dispatch("voucherInfo/saveOne", this.formData)
              .then(() => {
                if (!this._.isEmpty(this.editInfoId)) {
                  this.formData.voucherInfoId = this.editInfoId;
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
          num: null,
          date: null
        };
      },
      loadVoucherGroup() {
        this.$store
          .dispatch("voucherGroup/getList", { filter: {} })
          .then(data => {
            console.log(data);
            this.voucherGroupList = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      loadData() {
        this.$store
          .dispatch("voucherInfo/getOne", {voucherInfoId: this.editInfoId})
          .then(data => {
            this.formData = data;
          });
      }
    }
  };
</script>
