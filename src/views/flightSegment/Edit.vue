<template>
  <div>
    <el-form ref="form" :model="formData" :rules="rules" label-width="110px" size="mini">
      <el-form-item prop="dpt" label="出发地:">
        <el-input v-bind:disabled="disabled" v-model="formData.dpt"></el-input>
      </el-form-item>
      <el-form-item prop="arr" label="目的地:">
        <el-input v-bind:disabled="disabled" v-model="formData.arr"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
function defaultData() {
  return {
    dpt: "",
    arr: "",
    flights: [],
    airlines: []
  };
}
export default {
  name: "segmentEdit",
  props: {
    segment: {
      String,
      required: true
    }
  },
  data() {
    return {
      formData: defaultData(),
      disabled: false,
      rules: {
        dpt: [
          { required: true, message: "请输入出发地三字码", trigger: "blur" },
          {
            min: 3,
            max: 3,
            message: "长度为3字符"
          }
        ],
        arr: [
          { required: true, message: "请输入目的地三字码", trigger: "blur" },
          {
            min: 3,
            max: 3,
            message: "长度为3字符"
          }
        ]
      }
    };
  },
  methods: {
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("flightSegment/save", this.formData)
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
          .dispatch("flightSegment/getOne", { segment: id })
          .then(data => {
            this.formData = data;
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
    if (this.segment) {
      this.disabled = true;
      this.handleGetOne(this.segment);
    }
  }
};
</script>
