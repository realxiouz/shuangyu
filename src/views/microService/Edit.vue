<template>
  <div class="page-form">
    <el-dialog
      :title="code ? '服务编辑' : '服务添加'"
      width="800"
      center
      :visible.sync="dialogVisible"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-form
        ref="form"
        label-width="110px"
        size="mini"
        :model="formData"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务编码" prop="code" :rules="{required: true, message: '必须填写服务编码'}">
              <el-input placeholder="输入服务编码" v-model="formData.code" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务名称" prop="name" :rules="{required: true, message: '必须填写服务名称'}">
              <el-input placeholder="输入服务名称" v-model="formData.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仓库地址" prop="gitUrl">
              <el-input placeholder="输入仓库地址" v-model="formData.gitUrl" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="端口" prop="port" :rules="{required: true, message: '必须填写服务端口'}">
              <el-input-number placeholder="输入端口" v-model="formData.port" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-slider v-model="formData.sort" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="formData.remark" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="启动内存" prop="jvmOptions.xms" :rules="{required: true, message: '必须填写启动内存'}">
              <el-input placeholder="输入启动内存" v-model="formData.jvmOptions.xms" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大内存" prop="jvmOptions.xmx" :rules="{required: true, message: '必须填写最大内存'}">
              <el-input placeholder="输入最大内存" v-model="formData.jvmOptions.xmx" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年轻代" prop="jvmOptions.xmn" :rules="{required: true, message: '必须填写年轻代'}">
              <el-input placeholder="输入年轻代" v-model="formData.jvmOptions.xmn" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="线程堆栈" prop="jvmOptions.xss" :rules="{required: true, message: '必须填写线程堆栈'}">
              <el-input placeholder="输入线程的堆栈" v-model="formData.jvmOptions.xss" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监控端口" prop="jvmOptions.jmxremotePort" :rules="{required: true, message: '必须填写监控端口'}">
              <el-input-number placeholder="输入监控端口" v-model="formData.jvmOptions.jmxremotePort" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启动参数" prop="jvmOptions.jvmString" :rules="{required: true, message: '必须填写启动参数'}">
              <el-input placeholder="输入启动参数" v-model="formData.jvmOptions.jvmString" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div style="text-align:right;" slot="footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSave"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { VOUCHCHER_TEMPLATE_TABLE } from "@/utils/const";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: null
    }
  },
  data() {
    const numValidator = (rule, value, callback) => {
      let reg = /^[0-9]*$/g;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("只能输入数字！"));
      }
    };
    return {
      dialogVisible: false,
      formData: this.defaultFormData(),
      voucherGroupList: [],
      rules: {
        voucherGroupId: [
          { required: true, message: "请选择凭证字", trigger: "change" }
        ],
        voucherNum: [
          { required: true, message: "请输入凭证数", trigger: "change" },
          { validator: numValidator, trigger: "blur" }
        ],
        voucherDate: [
          { required: true, message: "请选择凭证日期", trigger: "change" }
        ],
        templateType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        templateName: [
          { required: true, message: "填写模板名称", trigger: "change" }
        ]
      },
      subjects: [],
      templates: VOUCHCHER_TEMPLATE_TABLE
    };
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
      if (val) {
        if (!this.code) {
          this.formData = this.defaultFormData();
        } else {
          this.loadData();
        }
      }
    }
  },
  methods: {
    handleOpen() {
      this.$emit("update:visible", true);
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("microService/saveData", this.formData)
            .then(() => {
              this.dialogVisible = false;
              this.$emit("refresh");
              this.$message({ type: "success", message: "保存成功" });
            });
        }
      });
    },
    defaultFormData() {
      return {
        code: "",
        gitUrl: "",
        name: "",
        pid: "",
        port: 0,
        remark: "",
        sort: 0,
        jvmOptions: {
          jvmString: "",
          jmxremotePort: "",
          remark: "",
          sort: "",
          xmn: "",
          xms: "",
          xmx: "",
          xss: "",
        }
      };
    },
    loadData() {
      this.$store
        .dispatch("microService/getOne", { code: this.code })
        .then(data => {
          this.formData = data;
        });
    }
  }
};
</script>
