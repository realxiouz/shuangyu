<template>
  <div>
    <el-form ref="form" :model="formData" :rules="rules" :inline="true" label-width="110px">
      <el-form-item prop="schedulerName" label="调度名称">
        <el-input v-model="formData.schedulerName"></el-input>
      </el-form-item>
      <el-form-item prop="cron" label="时间表达式">
        <el-input v-model="formData.cron"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <el-table ref="paramTable" :data="tableData" style="width: 100%;" v-bind:row-style="{height:'10px'}" border
              default-expand-all>
      <el-table-column
        prop="label"
        label="参数名称"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="defaultValue"
        label="参数值"
        width="700"
      >
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.defaultValue" v-bind:type="scope.row.inputType"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="required"
        label="是否必须"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.required" style="color: red">必填</span>
          <span v-else>非必填</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="参数说明"
      >
        <template slot-scope="scope">
          <span style="color: red">{{scope.row.remark}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button type="primary" @click="handleSaveStart">保存并启动</el-button>
      <el-button @click="goBack">返回</el-button>
    </div>
  </div>
</template>
<script>
  function defaultData() {
    return {
      cron: "",
      schedulerName: "",
      remark: "",
      thirdId: "75236f25898047b3b1a317735a4c46e5",
      apiId: "f7b566a333284551910f8c9fedb979ba"
    };
  }

  export default {
    name: "tgqProductEdit",
    data() {
      return {
        formData: defaultData(),
        tableData: [],
        copyFlag: false,
        rules: {
          schedulerName: [
            {required: true, message: "请输入名称", trigger: "blur"}
          ],
          cron: [
            {required: true, message: "请输入时间表达式", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      handleGetOne(id) {
        if (id) {
          this.$store
            .dispatch("tgqProduct/getOne", {schedulerId: id})
            .then(data => {
              this.formData = data;
              this.tableData = this.formData.params;
            }).catch(error => {
            console.log(error);
          });
        } else {
          this.formData = defaultData();
        }
      },
      getDefaultParam() {
        this.$store
          .dispatch("tgqProduct/getParamList", {
            searchForm: {
              thirdId: '75236f25898047b3b1a317735a4c46e5',
              apiId: '625cbf4f5aa94ee9b4ede0771e8a8bfb'
            }
          })
          .then(data => {
            this.tableData = data;
          }).catch(error => {
          console.log(error);
        });
      },
      handleSaveStart() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            console.log(this.copyFlag);
            if (this.copyFlag) {
              this.formData.schedulerId = null;
            }
            this.formData.params = this.tableData;
            this.$store
              .dispatch("tgqProduct/saveAndStart", this.formData)
              .then(() => {
                this.goBack();
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      handleSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.copyFlag) {
              this.formData.schedulerId = null;
            }
            this.formData.params = this.tableData;
            this.$store
              .dispatch("tgqProduct/save", this.formData)
              .then(() => {
                this.goBack();
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
      }
    },
    created() {
      const {schedulerId} = this.$route.params;
      const {copyFlag} = this.$route.params;
      console.log(copyFlag);
      this.copyFlag = copyFlag;
      if (schedulerId) {
        this.handleGetOne(schedulerId);
      } else {
        this.getDefaultParam();
      }
    }
  };
</script>
<style scoped>
  .el-form-item {
    margin-bottom: 20px;
  }
</style>
