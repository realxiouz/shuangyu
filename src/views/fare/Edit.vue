<template>
  <div class="page-form">
     <el-dialog :title="keyId!=''?'编辑票价信息':'添加票价信息'" :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
    <el-form ref="form" :model="formData" label-width="110px" size="mini">
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import {MIXIN_EDIT} from "@/utils/mixin";
export default {
  mixins: [MIXIN_EDIT],
  data() {
    return {
      formData: {},
      fareId:'',
      actions: {
          getOne: 'fare/getOne',
          saveOne: 'fare/addOne'
        }
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
        startDate: null,
        
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
      if (
        this.formData.startDate &&
        "number" != typeof this.formData.startDate
      ) {
        this.formData.startDate = this.formData.startDate.getTime();
      }
      this.$emit("onSave", this.formData);
    },

    onSave() {
      this.$refs['form'].validate(valid => {
      if (valid ) {
          let actionName = this.keyId ? 'fare/updateOne' : 'fare/addOne'
          this.$store
          .dispatch(actionName, this.formData)
          .then(id => {
              this.dialogVisible = false;
              this.$emit('refresh');
              this.$message({ type: 'success', message: '保存成功' });
              this.keyId ? this.$emit('updata') : this.$emit('add')
              
          })
          // eslint-disable-next-line no-unused-vars
          .finally(_ => {
              this.afterSave();
          });
      }
      });
    }
    
  },
};
</script>
