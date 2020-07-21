<template>
  <div class="page-form">
    <el-dialog title="调度管理" width="40%" center :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-col :span="12">
          <el-form-item label="调度名称：" prop="schedulerName">
            <el-input v-model="formData.schedulerName" placeholder="请输入调度名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="定时策略" prop="cron">
            <el-popover v-model="formData.cronPopover">
              <vue-cron @change="handleCron" @close="formData.cronPopover=false" i18n="cn"></vue-cron>
              <el-input slot="reference" @click="formData.cronPopover=true" v-model="formData.cronVal" placeholder="请输入定时策略"></el-input>
            </el-popover>
          </el-form-item>
        </el-col>
      </el-form>
      <div style="text-align:right;">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      editSchedulerId: {
        type: String,
        default: null
      }
    },
    data() {
/*      const chineseValidator = (rule, value, callback) => {
        let reg = /^[\u4e00-\u9fa5]+$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入中文！"));
        }
      };*/
      return {
        dialogVisible: false,
        formData: this.defaultFormData(),
        rules: {
          schedulerName: [
            {required: true, message: "请输入调度名称"}
          ],
          cron: [
            {required: true, message: "请输入定时策略"}
          ]
        }
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (val) {
          if (this._.isEmpty(this.editSchedulerId)) {
            this.formData = this.defaultFormData();
          } else {
            this.loadData();
          }
          this.loadAttr();
        }
      }
    },
    methods: {
      handleCron(val) {
        this.formData.cronVal = val
      },
      handleOpen() {
        this.$emit('update:visible', true);
      },
      handleClose() {
        this.$emit('update:visible', false);
      },
      handleSwitch(){
        this.defaultFlag = !this.defaultFlag;
      },
      handleSave() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$store
              .dispatch("jobScheduler/saveOne", this.formData)
              .then(() => {
                if (!this._.isEmpty(this.editSchedulerId)) {
                  this.formData.schedulerId = this.editSchedulerId;
                }
                this.dialogVisible = false;
                this.$emit('refresh');
                this.$message({type: "success", message: "保存成功"});
              });
          }else{
            let that = this;
            let timer = window.setTimeout(function(){
              that.$nextTick(function () {
                that.$refs['form'].clearValidate();
                window.clearTimeout(timer);
              })
            }, 1000);
          }
        });
      },
      defaultFormData() {
        return {
          schedulerName: null,
          cronPopover: false,
          cronVal: null,
          attrList: []
        };
      },
      loadAttr(){
        this.$store
          .dispatch("qunarPolicyAttr/getList", {})
          .then(data => {
            console.log(data);
          });
      },
      loadData() {
        this.$store
          .dispatch("jobScheduler/getOne", {schedulerId: this.editSchedulerId})
          .then(data => {
            this.formData = data;
          });
      }
    }
  };
</script>
