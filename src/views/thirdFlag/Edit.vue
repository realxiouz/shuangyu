<template>

</template>
<script>
  export default {
      name:'thirdFlagEdit',
      data(){
          return{

          };
      },
      methods:{
          handleSave() {
              this.$refs["formData"].validate((valid) => {
                  if (valid) {
                      this.$emit("onSave", this.formData);
                  }
              });
      }
  }
</script>
