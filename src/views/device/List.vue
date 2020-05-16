<template>
  <div class="contentBox">
    <el-row>
      <el-row>测试</el-row>
      <el-col :span="15">
        <el-form :model="user" ref="user">
          <el-form-item
            label="username"
            prop="name"
            :rules="[{required: true,message: 'username is required',trigger:'blur'}]"
          >
            <el-input v-model="user.name" />
          </el-form-item>

          <el-form :model="attributes" :label-position="'top'" ref="attributes">
            <el-form-item
              label="sex"
              prop="sex"
              :rules="[{required: true,message: 'please select sex',trigger:'blur'}]"
            >
              <el-select v-model="attributes.sex" style="width:100%">
                <el-option label="man" value="man"></el-option>
                <el-option label="woman" value="woman"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form :model="interest" :label-position="'top'" ref="interest">
            <el-form-item
              label="main interest"
              prop="main"
              :rules="[{required: true,message: 'please select main interest',trigger:'blur'}]"
            >
              <el-select v-model="interest.main" style="width:100%">
                <el-option label="运动" value="运动"></el-option>
                <el-option label="艺术" value="艺术"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form-item
            label="tel"
            prop="tel"
            :rules="[
              {required: true,message: 'tel is require',trigger:'blur'},
            ]"
          >
            <el-input v-model="user.tel" />
          </el-form-item>

          <el-form :model="note" :label-position="'top'" ref="note">
            <el-form-item
              label="main note"
              prop="main"
              :rules="[
              {required: true,message: ' main note is require',trigger:'blur'},
            ]"
            >
              <el-input v-model="note.main" />
            </el-form-item>
          </el-form>
        </el-form>

        <el-row>
          <el-button type="primary" @click="submit">验证</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        tel: ""
      },
      attributes: {
        sex: ""
      },
      interest: {
        main: ""
      },
      note: {
        main: ""
      }
    };
  },
  methods: {
    async submit() {
      let validateByFormName = form =>
        new Promise((resolve, reject) => {
          this.$refs[form].validate(result => {
            result && resolve("__success__");
          });
        });
      let formList = [
        validateByFormName("user"),
        validateByFormName("attributes"),
        validateByFormName("interest"),
        validateByFormName("note"),
      ];
      await Promise.all(formList);
    }
  }
};
</script>
