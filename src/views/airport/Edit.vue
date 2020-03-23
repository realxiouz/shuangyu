<template>
  <div>
    <el-form ref="form" :model="formData" :rules="rules" label-width="110px" size="mini">
      <el-form-item prop="airportCode" label="三字码">
        <el-input v-bind:disabled="disabled" v-model="formData.airportCode" maxlength = "3"></el-input>
      </el-form-item>
      <el-form-item prop="airportName" label="机场名称">
        <el-input v-model="formData.airportName"></el-input>
      </el-form-item>
      <el-form-item prop="airportCity" label="机场所在城市">
        <el-input v-model="formData.airportCity"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
  function defaultData() {
    return {
      airportCode: '',
      airportName: '',
      airportCity: ''
    };
  };
  export default {
    name: 'airportEdit',
    props: {
      airportCode: {
        String,
        required: true
      }
    },
    data() {
      return {
        formData: defaultData(),
        disabled:false,
        rules: {
          airportName: [
            {required: true, message: "请输入机场名称", trigger: "blur"}
          ],
          airportCity: [
            {required: true, message: "请输入机场城市名称", trigger: "blur"}
          ],
          airportCode: [
            {required: true, message: "请输入机场三字码", trigger: "blur"},
            {
              min: 3,
              max: 3,
              message: '长度为3字符'
            }
          ]
        }
      }
    },
    methods: {
      handleSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store
              .dispatch('airport/save', this.formData)
              .then(() => {
                this.$emit("onSave");
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
      },
      handleGetOne(id) {
        if (id) {
          this.$store
            .dispatch("airport/getOne", {airportCode:id})
            .then(data => {
              this.formData = data;
            }).catch(error => {
            console.log(error);
          });
        } else {
          this.formData = defaultData();
        }
      },
      clearForm() {
        this.formData = defaultData();
      },
    },
    created() {
      this.clearForm();
      if (this.airportCode) {
        this.disabled = true;
        this.handleGetOne(this.airportCode);
      }
    }
  }
</script>
