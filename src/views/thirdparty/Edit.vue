<template>
  <div>
    <el-form ref="formData" :rules="formRules" :model="formData" label-width="110px">
      <el-form-item label="平台名称" prop="thirdName">
        <el-input v-model="formData.thirdName" placeholder="请输入平台名称"></el-input>
        <span>{{initUserId}}</span>
      </el-form-item>p
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">重 置</el-button>
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>

<script>
  function defaultData() {
    return {
      thirdName: ""
    };
  };
  export default {
    name: "thirdpartyEdit",
    props: ["initUserId"],
    data() {
      return {
        formData: defaultData(),
        formRules: {
          thirdName: [
            { required: true, message: "请输入平台名称", trigger: "blur" }
          ]
        }
      };
    },
    computed: {
      userId: function() {
        return this.initUserId;
      }
    },
    watch: {
      userId: function(newValue, oldValue) {
        console.log(newValue);
      }
    },
    methods: {
      resetForm() {
        this.formData = defaultData();
        console.log(defaultData());
      },
      loadForm() {
        console.log("loadForm");
      },
      handleSave() {
        this.$refs["formData"].validate((valid) => {
          console.log("valid" + valid);
          if (valid) {
            this.$store
              .dispatch("role/save", this.formData)
              .then(data => {
                console.log(data);
                this.loadData();
                this.loadTotal();
              })
              .catch(error => {
                console.log(error);
              });
            this.dialogVisible = false;
          }
        });
      }
    },
    mounted() {
      if (this.initUserId) {
        //load
      }
    }
  };
</script>

<style scoped>

</style>
