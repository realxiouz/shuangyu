<template>
  <div class="page-form">
    <el-dialog
      :close-on-click-modal="false"
      title="添加"
      :visible.sync="dialogVisible"
      @open="handleOpen"
      @close="handleClose"
      width="500px"
    >
      <el-form label-position="top" size="mini" :model="formData" ref="featureForm">
        <el-col :span="24">
          <el-form-item label="属性名称" prop="name">
            <el-input placeholder="请输入属性名称" v-model="formData.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="属性编码" prop="code">
            <el-input placeholder="请输入属性编码" v-model="formData.code" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="数据类型">
            <el-select
              v-model="formData.valueType"
              @change="handleValueTypeChange"
              style="width: 100%"
            >
              <el-option
                v-for="(item,index) in valueTypes"
                :key="index"
                :label="item.value"
                :value="item.code"
              >{{item.value}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <template v-if="formData.valueType==0">
          <el-col :span="24">
            <el-form-item label="类型">
              <el-select v-model="formData.inputType" placeholder="选中输入类型">
                <el-option label="输入框" value="text"></el-option>
                <el-option label="文本域" value="textarea"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="最大长度">
              <el-input v-model="formData.length" placeholder="文本最大长度" />
            </el-form-item>
          </el-col>
        </template>
        <template v-if="formData.valueType==2">
          <el-col :span="24" >
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
          <el-col :span="24">
            <el-form-item label="步长" prop="step">
              <el-input placeholder="请输入步长" v-model="formData.step" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="数字类型">
              <el-select v-model="formData.type" placeholder="选中数字类型">
                <el-option label="Byte" value="Byte"></el-option>
                <el-option label="Short" value="Short"></el-option>
                <el-option label="Integer" value="Integer"></el-option>
                <el-option label="Long" value="Long"></el-option>
                <el-option label="Float" value="Float"></el-option>
                <el-option label="Double" value="Double"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
        <template v-if="formData.valueType==3||formData.valueType==4">
          <el-col :span="24">
            <el-form-item label="时间格式">
              <el-input v-model="formData.format" placeholder="输入时间格式,例如YYYY-MM-DD" />
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.valueType==3">
            <el-form-item label="类型">
              <el-select v-model="formData.inputType" placeholder="选中输入类型">
                <el-option label="日期" value="date"></el-option>
                <el-option label="日期时间" value="datetime"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="24" v-if="formData.valueType>6">
          <el-form-item label="属性项">
            <el-col :span="24">
              <el-row type="flex" justify="space-between">
                <el-col :span="9">
                  属性编码
                  <el-tooltip placement="top-start" effect="light">
                    <div slot="content">支持整型，取值范围：-2147483648 ~ 2147483647</div>
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="9">
                  属性描述
                  <el-tooltip placement="top" effect="light">
                    <div slot="content">
                      支持中文、英文大小写、数字下划线
                      <br />和短划线，必须以中文、英文或数字
                      <br />开头，不超过20个字符
                    </div>
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </el-col>
                <el-col :span="4"></el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-row
                class="attributes"
                type="flex"
                justify="space-between"
                v-for="(item,index) in formData.attributes"
                :key="index"
              >
                <el-col :span="9">
                  <el-form-item class="attr-item" :key="item.key">
                    <el-input placeholder="编号" v-model="item.code" />
                  </el-form-item>
                </el-col>
                <el-col :span="2" class="line">~</el-col>
                <el-col :span="9">
                  <el-form-item :key="item.key">
                    <el-input placeholder="描述" v-model="item.name" />
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
        <el-col :span="24" v-if="formData.valueType==61">
          <el-form-item label="是否销售属性">
            <el-switch v-model="formData.sku" :active-value="true" :inactive-value="false"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="formData.valueType==62">
          <el-form-item label="是否多选">
            <el-switch v-model="formData.multiple" :active-value="true" :inactive-value="false"
             @change="handleMultipleChange"
            ></el-switch>
          </el-form-item>
        </el-col>
        <!-- <template v-if="formData.valueType==9">
          <el-col :span="24">
            <el-form-item label="对象类型">
              <el-select v-model="formData.type" placeholder="选择类型">
                <el-option label="对象" value="Object"></el-option>
                <el-option label="对象数组" value="ObjectList" disabled></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template> -->
        <el-col :span="8">
          <el-form-item label="是否只读">
            <el-switch v-model="formData.readonly" :active-value="true" :inactive-value="false"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否必填">
            <el-switch v-model="formData.required" :active-value="true" :inactive-value="false"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否前端隐藏">
            <el-switch v-model="formData.hidden" :active-value="true" :inactive-value="false"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述">
            <el-input placeholder="请输入描述" type="textarea" v-model="formData.remark" />
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <param-dialog :visible.sync="paramDialogVisible" :index="paramIndex" :param-type="paramType" :param-data="paramData"
    @action-param="handleActionParam"/>-->
  </div>
</template>

<script>
// import paramDialog from "./Param";
import { PROPERTY_TABLE } from '@/utils/const'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    propertyId: {
      type: String,
      default: ""
    },
    categoryCode: {
      type: String,
      default: ""
    },
    categoryName: {
      type: String,
      default: ""
    },
    categoryPath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      paramIndex: -1,
      paramType: 0,
      formData: this.defaultFormData(),
      valueTypes: PROPERTY_TABLE
    };
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
      if (val) {
        if (this._.isEmpty(this.propertyId)) {
          this.formData = this.defaultFormData();
        } else {
          this.loadData();
        }
      }
    }
  },
  methods: {
    handleValueTypeChange(value) {
      switch (value) {
        case 0:
          this.formData.type = "String";
          break;
        case 1:
          this.formData.type = "Boolean";
          break;
        case 2:
          this.formData.type = "Integer";
          break;
        case 3:
        case 4:
          this.formData.type = "Date";
          break;
        case 5:
          this.formData.type = "Float";
          break;
        case 60:
          this.formData.type = "String";
          break;
        case 61:
          this.formData.type = "ArrayList";
          this.formData.multiple = true;
          break;
        case 62:
          this.formData.multiple = false;
          this.formData.type = "String";
        // case 9:
        //   this.formData.type = "Object";
        //   break;
      }
    },
    handleActionParam(param) {
      if (param) {
        if (param.type === 0) {
          if (param.index > -1) {
            this.formData.inputParams.splice(param.index, 1, param.data);
          } else {
            this.formData.inputParams.push(param.data);
          }
        }
        if (param.type === 1) {
          if (param.index > -1) {
            this.formData.outputParams.splice(param.index, 1, param.data);
          } else {
            this.formData.outputParams.push(param.data);
          }
        }
      }
    },
    handleSave() {
      if (this.categoryCode) {
        this.formData.categoryCode = this.categoryCode;
      }
      if (this.categoryName) {
        this.formData.categoryName = this.categoryName;
      }
      if (this.categoryPath) {
        this.formData.categoryPath = this.categoryPath;
      }
      this.$store
        .dispatch("productProperty/saveOne", this.formData)
        .then(data => {
          if (!this._.isEmpty(data)) {
            this.formData.propertyId = data;
          }
          this.dialogVisible = false;
          this.$emit("refresh");
          this.$message({ type: "success", message: "保存成功" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    defaultFormData() {
      return {
        propertyId: "", //功能id
        name: "", //功能名称
        code: "", //功能编码
        max: null,
        min: null,
        precision: null,
        step: null,
        unit: "",
        inputType: "",
        valueType: 0,
        type: "String",
        readonly: false,
        hidden: false,
        sku: false,
        multiple: false,
        required: false,
        attributes: [],
        callType: 0,
        eventType: 0,
        input: "",
        inputParams: [],
        output: "",
        outputParams: [],
        remark: "", //备注
        sort: "" //排序号
      };
    },
    loadData() {
      this.$store
        .dispatch("productProperty/getOne", { propertyId: this.propertyId })
        .then(result => {
          this.formData = result;
        });
    },
    addItem() {
      this.formData.attributes.push({ code: "", name: "" });
    },
    delItem(index) {
      this.formData.attributes.splice(index, 1);
    },
    handleOpen() {
      this.$emit("update:visible", true);
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    handleMultipleChange(val) {
      this.formData.type = val ? 'ArrayList' : 'String'
    }
  },
  components: {
    // paramDialog
  }
};
</script>
