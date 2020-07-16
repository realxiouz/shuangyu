<template>
  <div class="page-form">
    <el-dialog title="开放平台管理" width="24%" center :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-row>
          <el-form-item label="平台编码：" prop="openCode">
            <el-input v-model="formData.openCode" placeholder="请输入平台编码" />
          </el-form-item>
          <el-form-item label="平台名称：" prop="openName">
            <el-input v-model="formData.openName" placeholder="请输入平台名称" />
          </el-form-item>
          <el-form-item label="平台类型" prop="openType">
            <el-select v-model="formData.openType" placeholder="请选择平台类型" style="width: 100%">
              <el-option label="客户" :value='-1'></el-option>
              <el-option label="客户/供应商" :value='0'></el-option>
              <el-option label="供应商" :value='1'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配置地址：" prop="openUrl">
            <el-input v-model="formData.openUrl" placeholder="请输入配置地址" />
          </el-form-item>
        </el-row>

        <el-row
          v-for="(configNav, index) in formData.configNavList"
          :key="configNav.configNavId"
          id="configNavId"
          :gutter="10"
        >
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-input v-model="configNav.configNavName" placeholder="配置导航名称" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-input v-model="configNav.configNavUrl" placeholder="配置导航地址" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="3px">
              <el-button
                v-if="index === 0"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="addConfigNav"
              ></el-button>
              <el-button
                v-if="index !== 0"
                type="danger"
                icon="el-icon-remove-outline"
                @click="deleteConfigNav(index)"
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      editOpenId: {
        type: String,
        default: null
      }
    },
    data() {
      const codeValidator = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入字母或数字！"));
        }
      };
      return {
        dialogVisible: false,
        formData: this.defaultFormData(),
        rules: {
          openCode: [
            {required: true, message: "请输入平台编码", trigger: "change"},
            {
              min: 1,
              max: 20,
              message: "长度在 1 到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          openName: [
            {required: true, message: "请输入平台名称", trigger: "change"},
            {
              min: 1,
              max: 20,
              message: "长度在 1 到 20 个字符"
            }
          ],
          openType: [
            {required: true, message: "请选择平台类型", trigger: "change"},
          ],
          openUrl: [
            {required: true, message: "请输入配置地址", trigger: "change"},
          ]
        }
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (val) {
          if (this._.isEmpty(this.editOpenId)) {
            this.formData = this.defaultFormData();
          } else {
            this.loadData();
          }
        }
      }
    },
    methods: {
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
              .dispatch("openPlatform/saveOne", this.formData)
              .then(() => {
                if (!this._.isEmpty(this.editOpenId)) {
                  this.formData.openId = this.editOpenId;
                }
                this.dialogVisible = false;
                this.$emit('refresh');
                this.$message({type: "success", message: "保存成功"});
              });
          }
        });
      },
      defaultFormData() {
        return {
          openId: null,
          openCode: null,
          openName: null,
          openType: null,
          openUrl: null,
          configNavList: [{
            configNavId: null,
            configNavName: null,
            configNavUrl: null
          }]
        };
      },
      addConfigNav(){
        this.formData.configNavList.push({
          configNavId: null,
          configNavName: null,
          configNavUrl: null
        });
      },
      deleteConfigNav(index){
        if(index){
          this.formData.configNavList.splice(parseInt(index), 1);
        }
      },
      loadData() {
        this.$store
          .dispatch("openPlatform/getOne", {openId: this.editOpenId})
          .then(data => {
            this.formData = data;
          });
      }
    }
  };
</script>
