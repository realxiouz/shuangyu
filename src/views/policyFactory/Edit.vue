<template>
  <div class="page-form">
    <el-dialog :title="keyId!=''?'编辑':'添加'" width="40%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {MIXIN_EDIT} from "@/utils/mixin";
  export default {
    mixins: [MIXIN_EDIT],
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
        actions: {
          getOne: 'jobScheduler/getOne',
          saveOne: 'jobScheduler/saveOne'
        },
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
     
      handleSwitch(){
        this.defaultFlag = !this.defaultFlag;
      },
      defaultFormData() {
        return {
          schedulerName: '',
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
      
    }
  };
</script>
