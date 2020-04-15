<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <el-form-item label="仓库编码">
        <el-input v-model="formData.code" onkeyup="this.value=this.value.toUpperCase()" :disabled="update" placeholder="请输入仓库编码.."></el-input>
      </el-form-item>
      <el-form-item label="仓库名称">
        <el-input v-model="formData.name" placeholder="请输入仓库名称.."></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formData.address" placeholder="请输入地址.."></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="formData.contact" placeholder="请输入联系人.."></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="formData.phone" placeholder="请输入联系人.."></el-input>
      </el-form-item>
      <el-form-item label="库管">
        <el-select style="width: 100%;" clearable multiple v-model="formData.userIds" placeholder="请选择">
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
            return {
                formData: {},
                currencyList: [],
                subjectList: [],
                subject: null
            };
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    //仓库编码
                    code: '',
                    //仓库名称
                    name: '',
                    //地址
                    address: '',
                    //联系电话
                    phone: '',
                    //联系人
                    contact: '',
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
                if (this.formData.code && !'' != this.formData.code)
                    this.formData.code  = this.formData.code.toUpperCase();
                this.$emit("onSave", this.formData);
            },
            initFormData() {
                this.clearForm();
                if (this.update) {
                    Object.assign(this.formData,this.curNode);
                }
            }
        },
        created() {
            this.initFormData();
        }
    };
</script>
