<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="110px" size="mini">
      <el-row>
        <el-col :span="15">
          <el-form-item label="平台名称" prop="openName" size="mini">
            <el-input v-model="formData.openName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="平台编码" prop="openCode" size="mini">
            <el-input v-model="formData.openCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="平台配置URL" prop="configUri" size="mini">
            <el-input v-model="formData.configUri"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="平台类型" prop="openType">
            <el-select v-model="formData.openType" placeholder="请选择平台类型" style="width: 100%">
              <el-option label="客户" :value=-1></el-option>
              <el-option label="客户/供应商" :value=0></el-option>
              <el-option label="供应商" :value=1></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-for="(ruleItem, index) in formData.configNavs"
        :key="formData.configNavs[index].key"
        id="rule-item"
        :gutter="10"
      >
        <el-col :span="10">
          <el-form-item class="rule-item" label-width="10px" style="width:100%">
            <el-input
              class="rule-item-input"
              v-model="formData.configNavs[index].name"
              placeholder="配置名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item class="rule-item" label-width="10px" style="width:100%">
            <el-input
              class="rule-item-input"
              v-model="formData.configNavs[index].uri"
              placeholder="配置路径"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label-width="10px" style="width:100%">
            <el-button
              v-if="index!=0"
              type="danger"
              icon="el-icon-remove-outline"
              @click="deleteRuleItem(index)"
            ></el-button>
            <el-button
              v-if="index==0"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="addRuleItem()"
            ></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            openName: "",
            openCode: "",
            configUri: "",
            openType: null,
            configNavs: [{}]
        }
    };
    export default {
        name: 'edit',
        data() {
            return {
                formData: defaultData(),
                rules: {
                    openName: [
                        {required: true, message: "请输入平台名称", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    openCode: [
                        {required: true, message: "请输入平台编码", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    configUri: [
                        {required: true, message: "请输入平台配置URL", trigger: "blur"},
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1到 20 个字符"
                        }
                    ],
                    openType: [
                        {required: true, message: "请x选择平台类型", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            deleteRuleItem(index) {
                this.formData.configNavs.splice(index, 1);
            },
            addRuleItem() {
                this.formData.configNavs.push({});
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$emit('onSave', this.formData);
                    }
                });
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("openPlatform/getOne", {id: id})
                        .then(data => {
                            this.formData = data;
                            this.dialogVisible = true;
                        }).catch(error => {
                        console.log(error);
                    });
                } else {
                    this.formData = defaultData();
                }
            },
        },
        created() {
            if (this.openId) {
                this.handleGetOne(this.openId);
            }
        },
        props: {
            openId: String,
        }
    }
</script>
<style>
  #rule-item .el-form-item__content {
    width: 100%;
  }

  .rule-item {
    width: 20%;
  }

  .rule-item-input {
    width: 100%;
  }
</style>
