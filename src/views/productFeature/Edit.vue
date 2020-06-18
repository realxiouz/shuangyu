<template>
  <div>
    <el-dialog title="添加" :visible.sync="dialogVisible" @open="handleOpen" @close="handleClose">
      <el-row type="flex" justify="space-between">
        <el-col :span="24">
          <el-form label-position="top" size="mini" :rules="formRules" :model="formData" ref="featureForm">
            <el-col :span="24">
              <el-form-item label="自定义功能">
                <el-radio-group v-model="formData.featureType">
                  <el-radio-button
                    :label="item.id"
                    v-for="(item,index) in featureTypes"
                    :key="index"
                  >{{item.value}}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="功能名称" prop="name">
                <el-input placeholder="请输入功能名称" v-model="formData.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="功能编码" prop="code">
                <el-input placeholder="请输入功能编码" v-model="formData.code"/>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="formData.featureType==0">
              <el-form-item label="数据类型">
                <el-select v-model="formData.valueType" @change="handleValueTypeChange" style="width: 100%">
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
            <el-col :span="24" v-if="formData.featureType==0 && formData.valueType==2">
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
              <el-form-item label="步长" v-if="formData.featureType==0 && formData.valueType==2" prop="step">
                <el-input placeholder="请输入步长" v-model="formData.step" type="number"/>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="formData.featureType==0 && formData.valueType==2">
              <el-form-item label="数据单位" prop="unit">
                <el-select v-model="formData.unit" style="width: 100%">
                  <el-option
                    v-for="(item,index) in unitTypes"
                    :key="index"
                    :value="item.value"
                  >{{item.value}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="formData.featureType==0 && formData.valueType>6">
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
            <el-col :span="24" v-if="formData.featureType==0">
              <el-form-item label="读写类型">
                <el-radio-group v-model="formData.readwrite">
                  <el-radio :label="0">读写</el-radio>
                  <el-radio :label="1">只读</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="formData.featureType==1">
              <el-form-item label="调用方式">
                <el-radio-group v-model="formData.callType">
                  <el-radio :label="0">异步</el-radio>
                  <el-radio :label="1">同步</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="formData.featureType==1">
              <el-form-item label="输入参数">
                <el-row v-for="(param,index) in formData.inputParams" :key="index">
                  <el-col :span="20">
                    参数名称：{{param.name}}
                  </el-col>
                  <el-col :span="2">
                    <el-link type="primary" @click="handleUpdateParam(0,index,param)">编辑</el-link>
                  </el-col>
                  <el-col :span="2">
                    <el-link type="primary" @click="handleDeleteParam(0,index)">删除</el-link>
                  </el-col>
                </el-row>
                <el-row>
                  <el-link type="primary" @click="handleAddParam(0)">+添加参数</el-link>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="formData.featureType==2">
              <el-form-item label="事件类型" prop="eventType">
                <el-radio-group v-model="formData.eventType">
                  <el-radio :label="0">信息</el-radio>
                  <el-radio :label="1">告警</el-radio>
                  <el-radio :label="2">故障</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="formData.featureType==1 || formData.featureType==2">
              <el-form-item label="输出参数">
                <el-row v-for="(param,index) in formData.outputParams" :key="index">
                  <el-col :span="20">
                    参数名称：{{param.name}}
                  </el-col>
                  <el-col :span="2">
                    <el-link type="primary" @click="handleUpdateParam(1,index,param)">编辑</el-link>
                  </el-col>
                  <el-col :span="2">
                    <el-link type="primary" @click="handleDeleteParam(1,index)">删除</el-link>
                  </el-col>
                </el-row>
                <el-row>
                  <el-link type="primary" @click="handleAddParam(1)">+添加参数</el-link>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input placeholder="请输入描述" type="textarea" v-model="formData.description"/>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
    </span>
    </el-dialog>
    <param-dialog :visible.sync="paramDialogVisible" :index="paramIndex" :param-type="paramType" :param-data="paramData"
                  @action-param="handleActionParam"/>
  </div>
</template>

<script>
  import paramDialog from "./Param";

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      featureId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dialogVisible: this.visible,
        paramDialogVisible: false,
        paramIndex: -1,
        paramType: 0,
        paramData: {},
        featureTypes: [
          {id: 0, value: "属性"},
          {id: 1, value: "服务"},
          {id: 2, value: "事件"}
        ],
        formData: this.defaultFormData(),
        valueTypes: [
          {code: 0, value: '文本'},
          {code: 1, value: '开关'},
          {code: 2, value: '数字'},
          {code: 3, value: '日期'},
          {code: 5, value: '时间'},
          {code: 6, value: '评分'},
          {code: 7, value: '单选'},
          {code: 8, value: '多选'},
          {code: 9, value: '下拉'}
        ],
        unitTypes: [
          {value: "无 /", id: 0},
          {value: "纳克每升 / ppt", id: 1},
          {value: "微克每升 / ppb", id: 2},
          {value: "微西每厘米 / uS/cm", id: 3}
        ]
      };
    },
    watch: {
      visible(val) {
        this.dialogVisible = val;
        if (!this._.isEmpty(this.featureId)) {
          this.loadData();
        }
      }
    },
    methods: {
      handleValueTypeChange(value) {
        switch (value) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          case 6:
            break;
          case 7:
            break;
          case 8:
            break;
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
      handleAddParam(type) {
        this.paramDialogVisible = true;
        this.paramType = type;
        this.paramIndex = -1;
      },
      handleUpdateParam(type, index, param) {
        this.paramDialogVisible = true;
        this.paramType = type;
        this.paramIndex = index;
        this.paramData = param;
      },
      handleDeleteParam(type, index) {
        if (type === 0) {
          this.formData.inputParams.splice(index, 1);
        }
        if (type === 1) {
          this.formData.outputParams.splice(index, 1);
        }
      },
      defaultFormData() {
        return {
          featureId: "", //功能id
          featureType: 0, //功能类型 0属性，1服务，2事件
          productId: "", //商品ID
          productName: "", //商品名称
          productCode: "", //商品编码
          name: "", //功能名称
          code: "", //功能编码
          max: null,
          min: null,
          precision: null,
          step: null,
          unit: '',
          inputType: '',
          valueType: 2,
          required: false,
          readonly: false,
          readwrite: 0,
          attributes: [],
          description: "",
          callType: 0,
          eventType: 0,
          input: "",
          inputParams: [],
          output: "",
          outputParams: [],
          remark: "", //备注
          sort: "", //排序号
        };
      },
      loadData() {

      },
      addItem() {
        this.formData.attributes.push({code: "", name: ""});
      },
      delItem(index) {
        this.formData.attributes.splice(index, 1);
      },
      handleOpen() {
        this.$emit('update:visible', true);
      },
      handleClose() {
        this.$emit('update:visible', false);
      }
    },
    components: {
      paramDialog
    },
  };
</script>

<style>
  .el-dialog {
    width: 500px;
    min-width: 500px;
  }
</style>
