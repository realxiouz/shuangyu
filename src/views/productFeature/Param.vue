<template>
  <el-dialog title="添加" :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
    <el-row type="flex" justify="space-between">
      <el-col :span="24">
        <el-form
          size="mini"
          ref="paramForm"
          label-width="80px"
          label-position="top"
          :model="formData"
          :rules="formRules"
        >
          <el-col :span="24">
            <el-form-item label="参数名称" prop="name">
              <el-input placeholder="请输入参数名称" v-model="formData.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="参数编码" prop="code">
              <el-input placeholder="请输入参数编码" v-model="formData.code"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="数据类型">
              <el-select v-model="formData.valueType" @change="handleValueTypeChange" style="width: 100%;">
                <el-option
                  v-for="(item,index) in valueTypes"
                  :key="index"
                  :label="item.value"
                  :value="item.code"
                >{{item.value}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.valueType==2">
            <el-form-item label="取值范围">
              <el-col :span="11">
                <el-input placeholder="最小值" v-model="formData.min" type="number"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input placeholder="最大值" v-model="formData.max" type="number"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.valueType==2">
            <el-form-item label="步长">
              <el-input placeholder="请输入步长" v-model="formData.step" type="number"/>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.valueType==2">
            <el-form-item label="数据单位">
              <el-select v-model="formData.unit" style="width: 100%;">
                <el-option
                  v-for="(item,index) in unitTypes"
                  :key="index"
                  :value="item.value"
                >{{item.value}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.valueType>6">
            <el-form-item label="属性项">
              <el-col :span="24">
                <el-row type="flex" justify="space-between">
                  <el-col :span="9">属性编码
                    <el-tooltip placement="top-start" effect="light">
                      <div slot="content">支持整型，取值范围：-2147483648 ~ 2147483647</div>
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="2"></el-col>
                  <el-col :span="9">属性描述
                    <el-tooltip placement="top" effect="light">
                      <div slot="content">支持中文、英文大小写、数字下划线<br/>和短划线，必须以中文、英文或数字<br/>开头，不超过20个字符</div>
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="4"></el-col>
                </el-row>
              </el-col>
              <el-col :span="24">
                <el-row class="attributes" type="flex" justify="space-between"
                        v-for="(item,index) in formData.attributes"
                        :key="index">
                  <el-col :span="9">
                    <el-form-item class="attr-item" :key="item.key">
                      <el-input placeholder="编号" v-model="item.code"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2" class="line">~</el-col>
                  <el-col :span="9">
                    <el-form-item :key="item.key">
                      <el-input placeholder="描述" v-model="item.name"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="line">
                    <el-link type="primary" @click="delItem(index)">删除</el-link>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="24">
                <el-link type="primary" @click="addItem">+添加属性项</el-link>
              </el-col>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { PROPERTY_TABLE } from '@/utils/const';
  export default {
    name: "paramForm",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: -1
      },
      paramType: {
        type: Number,
        default: 0
      },
      paramData: Object
    },
    data() {
      return {
        dialogVisible: this.visible,
        formData: this.defaultFormData(),
        formRules: {
          code: {required: true, message: "请输入参数编码", trigger: "blur"},
          name: {required: true, message: "请输入参数名称", trigger: "blur"}
        },
        valueTypes: PROPERTY_TABLE,
        unitTypes: [
          {value: "无 /", id: 0},
          {value: "纳克每升 / ppt", id: 1},
          {value: "微克每升 / ppb", id: 2},
          {value: "微西每厘米 / uS/cm", id: 3},
          {value: "牛顿每库仑 / N/C", id: 4}
        ]
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (this.index > -1) {
          this.formData = this.paramData;
        } else {
          this.formData = this.defaultFormData();
        }
      }
    },
    methods: {
      handleValueTypeChange(value) {
        if (value > 6) {
          if (this.formData.attributes.length == 0) {
            this.addItem();
          }
        }
      },
      handleSave() {
        this.$emit('action-param', {index: this.index, type: this.paramType, data: this.formData});
        this.dialogVisible = false;
      },
      handleOpen() {
        this.$emit('update:visible', true);
      },
      handleClose() {
        this.$emit('update:visible', false);
      },
      defaultFormData() {
        return {
          code: '',
          name: '',
          inputType: '',
          description: '',
          max: null,
          min: null,
          precision: '',
          step: null,
          unit: '',
          valueType: 2,
          required: false,
          readonly: false,
          readwrite: 0,
          attributes: []
        };
      },
      addItem() {
        this.formData.attributes.push({code: "", name: ""});
      },
      delItem(index) {
        this.formData.attributes.splice(index, 1);
      },
      checkForm(callback) {
        this.$refs.paramForm.validate(valid => {
          callback(valid);
        });
      },
      validate(callback) {
        this.$refs.paramForm.validate(valid => {
          callback(valid);
        });
      },
      resetForm() {
        this.$refs.paramForm.resetFields();
      }
    }
  };
</script>
<style>
  .line, .caption {
    text-align: center;
  }

  .attributes .el-form-item {
    margin-bottom: 5px;
  }
</style>
