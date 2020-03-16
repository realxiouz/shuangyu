<template>
  <div>
    <el-form ref="form" :inline="true" :model="formData" label-width="110px">
      <el-form-item prop="airlineName" label="调度名称">
        <el-input v-model="formData.schedulerName"></el-input>
      </el-form-item>
      <el-form-item prop="airlineCode" label="时间表达式">
        <el-input v-model="formData.cron"></el-input>
      </el-form-item>
    </el-form>
    <el-table ref="paramTable" :data="tableData" style="width: 100%;" border default-expand-all>
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
          <span v-if="scope.row.required">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="参数说明"
      ></el-table-column>
    </el-table>
    <div>
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button type="primary" @click="handleSave">保存并启动</el-button>
      <el-button @click="resetForm">重 置</el-button>
      <el-button @click="goBack">返回</el-button>
    </div>
  </div>
</template>
<script>
  function defaultData() {
    return {
      cron: "",
      schedulerName: "",
    };
  }

  export default {
    name: "thirdApiSchedulerEdit",
    data() {
      return {
        formData: defaultData(),
        tableData: [
          {label:'参数一',name:'param1',defaultValue:'1',remark:'1111',required:true,inputType:'text'},
          {label:'参数二',name:'param2',defaultValue:'2',remark:'2222',required:false,inputType:'textarea'},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true,inputType:'number'},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true,inputType:'password'},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数三',name:'param3',defaultValue:'3',remark:'3333',required:true},
          {label:'参数四',name:'param4',defaultValue:'4',remark:'4444',required:false}
        ]
      };
    },
    methods: {
      handleGetOne(id) {
        if (id) {
          this.$store
            .dispatch("thirdApiScheduler/getOne", {airlineCode: id})
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
      resetForm() {
        this.formData = defaultData();
      },
      goBack() {
        this.$router.go(-1);
      },
      handleSave() {
        this.formData.params = this.tableData;
        console.log(this.formData);
        this.$store
          .dispatch("thirdApiScheduler/save", this.formData)
          .then(data => {
            console.log(data);
            this.lastId = "0";
            this.loadData();
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
    mounted() {
      const {schedulerId} = this.$route.params;
      if (schedulerId) {
        this.handleGetOne(schedulerId);
      }
    }
  };
</script>
<style scoped>
  .el-form-item {
    margin-bottom: 20px;
  }
</style>
