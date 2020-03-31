<template>
  <div class="contentBox">
    <el-row>
      <el-col :xs="16" :sm="18" :md="18" :lg="20" :xl="20">
        <el-form ref="form" :model="formData" size="mini" :rules="rules" label-width="110px">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item prop="schedulerName" label="调度名称:">
              <el-input v-model="formData.schedulerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item prop="cron" label="时间表达式:">
              <el-input v-model="formData.cron"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item prop="remark" label="备注:">
              <el-input v-model="formData.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      ref="paramTable"
      size="mini"
      :data="tableData"
      style="width: 100%;"
      v-bind:row-style="{height:'10px'}"
      border
      default-expand-all
    >
      <el-table-column prop="label" label="参数名称" width="200" align="center"></el-table-column>
      <el-table-column prop="defaultValue" label="参数值" width="450" align="center">
        <template slot-scope="scope">
          <el-date-picker
            v-if="scope.row.label.indexOf('日期') !=-1"
            v-model="scope.row.defaultValue"
            type="date"
            placeholder="选择日期"
            style="width:100%"
          ></el-date-picker>
          <el-input
            v-else
            placeholder="请输入内容"
            v-model="scope.row.defaultValue"
            v-bind:type="scope.row.inputType"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="required" label="是否必须" align="center" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.required" style="color: red">必填</span>
          <span v-else>非必填</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="参数说明">
        <template slot-scope="scope">
          <span style="color: red">{{scope.row.remark}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:15px;">
      <el-button type="primary" size="mini" @click="handleSave">保存</el-button>
      <el-button type="primary" size="mini" @click="handleSaveStart">保存并启动</el-button>
      <el-button type="primary" size="mini" @click="goBack">返回</el-button>
    </div>
  </div>
</template>
<script>
function defaultData() {
  return {
    cron: "",
    schedulerName: "",
    remark: "",
    thirdId: "55e7ae33b24748f1b1022a305dd40ac7",
    apiId: "f7b566a333284551910f8c9fedb979ba1"
  };
}

export default {
  name: "ttsSchedulerEdit",
  data() {
    return {
      formData: defaultData(),
      loading: true,
      tableData: [],
      copyFlag: false,
      rules: {
        schedulerName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        cron: [{ required: true, message: "请输入时间表达式", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleGetOne(id) {
      if (id) {
        this.$store
          .dispatch("ttsScheduler/getOne", { schedulerId: id })
          .then(data => {
            if (data) {
              this.formData = data;
              this.tableData = this.formData.params;
            }
            this.loading = false;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.formData = defaultData();
      }
    },
    getDefaultParam() {
      this.$store
        .dispatch("ttsScheduler/getParamList", {
          searchForm: {
            thirdId: "55e7ae33b24748f1b1022a305dd40ac7",
            apiId: "f7b566a333284551910f8c9fedb979ba1"
          }
        })
        .then(data => {
          this.tableData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSaveStart() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(this.copyFlag);
          if (this.copyFlag) {
            this.formData.schedulerId = null;
          }
          this.formData.params = this.tableData;
          this.$store
            .dispatch("ttsScheduler/saveAndStart", this.formData)
            .then(() => {
              this.goBack();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.copyFlag) {
            this.formData.schedulerId = null;
          }
          this.formData.params = this.tableData;
          this.$store
            .dispatch("ttsScheduler/save", this.formData)
            .then(() => {
              this.goBack();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  },
  created() {
    const { schedulerId } = this.$route.params;
    const { copyFlag } = this.$route.params;
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
