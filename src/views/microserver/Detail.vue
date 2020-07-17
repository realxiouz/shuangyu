<template>
  <div>
    <div class="page-back">
      <el-button-group>
        <el-button type="primary" @click="handleBack">返回</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-button-group>
    </div>
    <div class="form-wrap">
      <el-form ref="form" label-width="110px" size="mini" :model="formData">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="服务编码"
              prop="code"
              :rules="{ required: true, message: '必须填写服务编码' }"
            >
              <el-input placeholder="输入服务编码" v-model="formData.code" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="服务名称"
              prop="name"
              :rules="{ required: true, message: '必须填写服务名称' }"
            >
              <el-input placeholder="输入服务名称" v-model="formData.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仓库地址" prop="gitUrl">
              <el-input placeholder="输入仓库地址" v-model="formData.gitUrl" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="端口"
              prop="port"
              :rules="{ required: true, message: '必须填写服务端口' }"
            >
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

          <el-col :span="24">
            <el-table :data="formData.jvmOptions" :height="800" border>
              <el-table-column width="100" label="分组" prop="group" />
              <el-table-column label="选项" prop="option" />
              <el-table-column label="值">
                <template v-slot="{ row }">
                  <el-input v-model="row.value" />
                </template>
              </el-table-column>
              <el-table-column label="描述" prop="description" />
            </el-table>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import jvmOptions from "@/data/jvm.json";

export default {
  data() {
    return {
      dialogVisible: false,
      formData: this.defaultFormData()
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
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("microserver/saveData", this.formData)
            .then(() => {
              this.$message({ type: "success", message: "保存成功" });
              this.handleBack()
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
        jvmOptions
      };
    },
    loadData() {
      if (this.code) {
        this.$store
          .dispatch("microserver/getOne", { code: this.code })
          .then(data => {
            this.formData = data;
          });
      } else {
        this.formData = this.defaultFormData();
      }
    },
    handleBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.code = this.$route.query.code;
    this.loadData();
  }
};
</script>

<style>
.page-back {
  padding: 10px;
}
.form-wrap {
  max-width: 1000px;
  padding: 10px;
}
</style>
