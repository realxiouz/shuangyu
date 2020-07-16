<template>
  <div class="page-form">
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
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
function defaultData() {
  return {
    airlineCode: "",
    airlineName: "",
    cabins: [],
    flights: [],
    segments: []
  };
}
export default {
  name: "airlineEdit",
  props: {
    airlineCode: {
      String,
      required: true
    }
  },
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
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("airline/save", this.formData)
            .then(() => {
              this.$emit("onSave");
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    handleGetOne(id) {
      if (id) {
        this.$store
          .dispatch("airline/getOne", { airlineCode: id })
          .then(data => {
            this.formData = data;
            this.formData.cabinNames = this.formData.cabins.join(",");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.formData = defaultData();
      }
    },
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
