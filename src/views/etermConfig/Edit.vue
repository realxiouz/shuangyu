<template>
  <div>
    <el-form :model="formData" label-width="110px" size="mini">
      <input type="hidden" v-model="formData.firmId"/>
      <el-form-item label="账号:">
        <el-input v-model="formData.etermAccount"></el-input>
      </el-form-item>
      <el-form-item v-if="!update" label="密码:">
        <el-input v-model="formData.etermPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input v-model="formData.etermAddress"></el-input>
      </el-form-item>
      <el-form-item label="端口:">
        <el-input v-model="formData.etermPort"></el-input>
      </el-form-item>
      <el-form-item label="Office号:">
        <el-input v-model="formData.etermOfficeId"></el-input>
      </el-form-item>
      <el-form-item label="Office适用范围:">
        <el-select v-model="formData.etermOfficeRange" placeholder="请选择Office适用范围.." style="width: 100%">
          <el-option
            v-for="item in etermOfficeRangeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Office无权航司:">
        <el-input v-model="formData.etermAirline"></el-input>
      </el-form-item>
      <el-form-item label="账号类型:">
        <el-select v-model="formData.etermAccountType" placeholder="请选择账号类型.." style="width: 100%">
          <el-option
            v-for="item in etermAccountTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作号（SI）:">
        <el-input v-model="formData.etermSi"></el-input>
      </el-form-item>
      <el-form-item label="工作号密码:">
        <el-input v-model="formData.etermSiPassword"></el-input>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="formData.etermRemark"></el-input>
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
        firmList: [],
        etermOfficeRangeList: [
          {
            label: '默认',
            value: '1'
          }, {
            label: '备选',
            value: '2'
          }, {
            label: '政策',
            value: '3'
          }
        ],
        etermAccountTypeList: [
          {
            label: '打票',
            value: '0'
          }, {
            label: '订座',
            value: '1'
          }, {
            label: 'AV',
            value: '2'
          }
        ],
      };
    },
    methods: {
      /*表单默认加载数据*/
      defaultFormData() {
        return {
          firmId: '',
          firmName:'',
          etermAccount: '',
          etermPassword: '',
          etermAddress: '',
          etermPort: '',
          etermOfficeId: '',
          etermOfficeRange: '',
          etermAirline: '',
          etermAccountType: '',
          etermSi: '',
          etermSiPassword: '',
          etermRemark: ''
        };
      },
      /*清除表单*/
      clearForm() {
        this.formData = this.defaultFormData();
      },
      /*对提交的数据进行类型格式*/
      handleConfirm() {
        this.$store
          .dispatch("etermConfig/save", {etermConfig:this.formData})
          .then(() => {
            this.$emit('onSave');
          })
          .catch(error => {
            console.log(error);
          });
        //this.$emit('onSave', this.formData);
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
