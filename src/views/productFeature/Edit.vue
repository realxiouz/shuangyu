<template>
  <div>
    <el-form label-position="top" size="mini" :rules="formRules" :model="formData" ref="featureForm">
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

      <el-form-item label="功能名称" prop="name">
        <el-col :span="12">
          <el-input placeholder="请输入您的公共功能名称" v-model="formData.name"/>
        </el-col>
      </el-form-item>

      <el-form-item label="标识符" prop="code">
        <el-col :span="12">
          <el-input placeholder="请输入您的标识符" v-model="formData.code"/>
        </el-col>
      </el-form-item>

      <el-form-item label="数据类型">
        <el-select v-model="formData.valueType" @change="handleValueTypeChange">
          <el-option
            v-for="(item,index) in valueTypes"
            :key="index"
            :label="item.value"
            :value="item.code"
          >{{item.value}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="取值范围" v-if="formData.valueType==2">
        <el-col :span="9">
          <el-form-item prop="min">
            <el-input placeholder="最小值" v-model="formData.min" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" style="text-align:center" :span="2">-</el-col>

        <el-col :span="9">
          <el-form-item prop="max">
            <el-input placeholder="最大值" v-model="formData.max" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="步长" v-if="formData.valueType==2" prop="step">
        <el-col :span="9">
          <el-input placeholder="请输入步长" v-model="formData.step" type="number"/>
        </el-col>
      </el-form-item>

      <el-form-item label="数据单位" prop="unit">
        <el-select v-model="formData.unit">
          <el-option
            v-for="(item,index) in unitTypes"
            :key="index"
            :value="item.value"
          >{{item.value}}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="读写类型">
        <el-radio-group v-model="formData.readOrWrite">
          <el-radio label="读写">读写</el-radio>
          <el-radio label="只读">只读</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form
        label-position="top"
        v-if="showServer"
        ref="server-form"
        :model="serverForm"
        :rules="serverRule"
      >
        <el-form-item :label="'调用方式'+serverForm.callType">
          <el-radio-group v-model="serverForm.callType">
            <el-radio :label="0">异步</el-radio>
            <el-radio :label="1">同步</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="输入参数" prop="input" style="border:1px solid">
          <el-row v-for="(param,index) in serverForm.inputParams" :key="index">
            <el-col :span="12">
              <el-link>参数名称：{{param.paramName}}</el-link>
              <div style="float:right">
                <el-link @click="editParamByIndex('serverForm.inputParams',index)">编辑</el-link>
                <span>|</span>
                <el-link @click="removeParamByIndex('serverForm.inputParams',index)">删除</el-link>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-link type="primary" @click="toAddParam('serverForm.inputParams')">+添加参数</el-link>
          </el-row>
        </el-form-item>

        <el-form-item label="输出参数 serverForm" prop="output">
          <el-row v-for="(param,index) in serverForm.outputParams" :key="index">
            <el-col :span="12">
              <el-link>参数名称：{{param.paramName}}</el-link>
              <div style="float:right">
                <el-link @click="editParamByIndex('serverForm.outputParams',index)">编辑</el-link>
                <span>|</span>
                <el-link @click="removeParamByIndex('serverForm.outputParams',index)">删除</el-link>
              </div>
            </el-col>
          </el-row>

          <el-link type="primary" @click="toAddParam('serverForm.outputParams')">+添加参数</el-link>
        </el-form-item>
      </el-form>
      <!-- 事件 -->
      <!-- ----------------------------------------------------------------------- -->
      <el-form
        label-position="top"
        v-if="showEvent"
        :model="eventForm"
        ref="event-form"
        :rules="eventRule"
      >
        <el-form-item label="事件类型" prop="eventType">
          <el-radio-group v-model="eventForm.eventType">
            <el-radio label="0">信息</el-radio>
            <el-radio label="1">告警</el-radio>
            <el-radio label="2">故障</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="输出参数 eventForm" prop="output">
          <el-row v-for="(param,index) in eventForm.outputParams" :key="index">
            <el-col :span="12">
              <el-link>参数名称：{{param.paramName}}</el-link>
              <div style="float:right">
                <el-link @click="editParamByIndex('eventForm.outputParams',index)">编辑</el-link>
                <span>|</span>
                <el-link @click="removeParamByIndex('eventForm.outputParams',index)">删除</el-link>
              </div>
            </el-col>
          </el-row>

          <el-link type="primary" @click="toAddParam('eventForm.outputParams')">+添加参数</el-link>
        </el-form-item>
      </el-form>
      <!-- ----------------------------------------------------------------------- -->

      <el-form-item
        label="描述"
        prop="description"
        :rules="[{required: true, message: '描述不能为空', trigger: 'blur'}]"
      >
        <el-input placeholder="请输入描述" type="textarea" v-model="commonForm.description"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="checkForm">确 定</el-button>
      </span>
    <!-- 参数弹窗 -->
    <el-dialog :visible.sync="isAddParam" :title="parameterTitle">
      <param-form ref="mask-form-box"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddParam = false">取 消</el-button>
        <el-button type="primary" @click="handleAddParam">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import paramForm from "./Param";

  const ADD = "ADD";
  const EDIT = "EDIT";
  export default {
    data() {
      const validateSign = (rule, value, callback) => {
        var signRe = /^[a-zA-Z_][a-zA-Z0-9_]{4,20}$/;
        if (signRe.test(value)) {
          callback();
        } else {
          callback(new Error("不能数字开头，支持中英文下划线，5-20位"));
        }
      };

      return {
        dialogVisible: false,
        featureTypes: [
          {id: 0, value: "属性"},
          {id: 1, value: "服务"},
          {id: 2, value: "事件"}
        ],
        tableData: [],
        total: 0,
        showMask: false,
        isAddParam: false,
        currentParamList: "",
        currentPage: 1,
        pageSize: 8,
        handleType: ADD,
        handleParamType: ADD,
        currentParamIndex: -1,
        // 属性表单
        formData: {
          featureId: "", //功能id
          featureType: 0, //功能类型 0属性，1服务，2事件
          productId: "", //商品ID
          productName: "", //商品名称
          productCode: "", //商品编码
          name: "", //功能名称
          code: "", //功能编码
          remark: "", //备注
          sort: "", //排序号
          required: true,
          description: "",
          callType: 0,
          eventType: 0,
          input: "",
          inputParams: [],
          output: "",
          outputParams: []
        },
        formRules: {
          featureName: [
            {required: true, message: "请输入您的公共功能名称", trigger: "blur"}
          ],
          featureCode: [
            {required: true, message: "请输入标志符", trigger: "blur"},
            {validator: validateSign, trigger: "input"}
          ]
        },
        serverRule: {
          input: [
            {required: true, message: "请添加输入参数", trigger: "change"}
          ],
          output: [
            {required: true, message: "请添加输出参数111", trigger: "change"}
          ]
        },
        eventRule: {
          output: [
            {required: true, message: "请添加输出参数", trigger: "change"}
          ]
        },
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
          {value: "微西每厘米 / uS/cm", id: 3},
          {value: "牛顿每库仑 / N/C", id: 4},
          {value: "伏特每米 / V/m", id: 5},
          {value: "滴速 / ml/min", id: 6},
          {value: "血压 / mmHg", id: 7},
          {value: "血糖 / mmol/L", id: 8},
          {value: "毫米每秒 / mm/s", id: 9},
          {value: "转每分钟 / turn/m", id: 10},
          {value: "次 / count", id: 11},
          {value: "档 / gear", id: 12},
          {value: "步 / stepCount", id: 13},
          {value: "标准立方米每小时 / Nm3/h", id: 14},
          {value: "千伏 / kV", id: 15},
          {value: "千伏安 / KVA", id: 16},
          {value: "千乏 / kvar", id: 17},
          {value: "微瓦每平方厘米 / uw/cm2", id: 18},
          {value: "只 / 只", id: 19},
          {value: "相对湿度 / %RH", id: 20},
          {value: "立方米每秒 / m³/s", id: 21},
          {value: "公斤每秒 / kg/s", id: 22},
          {value: "转每分钟 / r/min", id: 23},
          {value: "吨每小时 / t/h", id: 24},
          {value: "千卡每小时 / KCL/h", id: 25},
          {value: "升每秒 / L/s", id: 26},
          {value: "兆帕 / Mpa", id: 27},
          {value: "立方米每小时 / m³/h", id: 28},
          {value: "千乏时 / kvarh", id: 29},
          {value: "千乏 / KVar", id: 30},
          {value: "微克每升 / μg/L", id: 31},
          {value: "千卡路里 / kcal", id: 32},
          {value: "吉字节 / GB", id: 33},
          {value: "兆字节 / MB", id: 34},
          {value: "千字节 / KB", id: 35},
          {value: "字节 / B", id: 36},
          {value: "微克每平方分米每天 / μg/(d㎡·d)", id: 37},
          {value: "百万分率 / ppm", id: 38},
          {value: "像素 / pixel", id: 39},
          {value: "照度 / Lux", id: 40},
          {value: "重力加速度 / grav", id: 41},
          {value: "分贝 / dB", id: 42},
          {value: "百分比 / %", id: 43},
          {value: "流明 / lm", id: 44},
          {value: "比特 / bit", id: 45},
          {value: "克每毫升 / g/mL", id: 46},
          {value: "克每升 / g/L", id: 47},
          {value: "毫克每升 / mg/L", id: 48},
          {value: "微克每立方米 / μg/m³", id: 49},
          {value: "毫克每立方米 / mg/m³", id: 50},
          {value: "克每立方米 / g/m³", id: 51},
          {value: "千克每立方米 / kg/m³", id: 52},
          {value: "纳法 / nF", id: 53},
          {value: "皮法 / pF", id: 54},
          {value: "微法 / μF", id: 55},
          {value: "法拉 / F", id: 56},
          {value: "欧姆 / Ω", id: 57},
          {value: "微安 / μA", id: 58},
          {value: "毫安 / mA", id: 59},
          {value: "千安 / kA", id: 60},
          {value: "安培 / A", id: 61},
          {value: "毫伏 / mV", id: 62},
          {value: "伏特 / V", id: 63},
          {value: "毫秒 / ms", id: 64},
          {value: "秒 / s", id: 65},
          {value: "分钟 / min", id: 66},
          {value: "小时 / h", id: 67},
          {value: "日 / day", id: 68},
          {value: "周 / week", id: 69},
          {value: "月 / month", id: 70},
          {value: "年 / year", id: 71},
          {value: "节 / kn", id: 72},
          {value: "千米每小时 / km/h", id: 73},
          {value: "米每秒 / m/s", id: 74},
          {value: "秒 / ″", id: 75},
          {value: "分 / ′", id: 76},
          {value: "度 / °", id: 77},
          {value: "弧度 / rad", id: 78},
          {value: "赫兹 / Hz", id: 79},
          {value: "微瓦 / μW", id: 80},
          {value: "毫瓦 / mW", id: 81},
          {value: "千瓦特 / kW", id: 82},
          {value: "瓦特 / W", id: 83},
          {value: "卡路里 / cal", id: 84},
          {value: "千瓦时 / kW·h", id: 85},
          {value: "瓦时 / Wh", id: 86},
          {value: "电子伏 / eV", id: 87},
          {value: "千焦 / kJ", id: 88},
          {value: "焦耳 / J", id: 89},
          {value: "华氏度 / ℉", id: 90},
          {value: "开尔文 / K", id: 91},
          {value: "吨 / t", id: 92},
          {value: "摄氏度 / °C", id: 93},
          {value: "毫帕 / mPa", id: 94},
          {value: "百帕 / hPa", id: 95},
          {value: "千帕 / kPa", id: 96},
          {value: "帕斯卡 / Pa", id: 97},
          {value: "毫克 / mg", id: 98},
          {value: "克 / g", id: 99},
          {value: "千克 / kg", id: 100},
          {value: "牛 / N", id: 101},
          {value: "毫升 / mL", id: 102},
          {value: "升 / L", id: 103},
          {value: "立方毫米 / mm³", id: 104},
          {value: "立方厘米 / cm³", id: 105},
          {value: "立方千米 / km³", id: 106},
          {value: "立方米 / m³", id: 107},
          {value: "公顷 / h㎡", id: 108},
          {value: "平方厘米 / c㎡", id: 109},
          {value: "平方毫米 / m㎡", id: 110},
          {value: "平方千米 / k㎡", id: 111},
          {value: "平方米 / ㎡", id: 112},
          {value: "纳米 / nm", id: 113},
          {value: "微米 / μm", id: 114},
          {value: "毫米 / mm", id: 115},
          {value: "厘米 / cm", id: 116},
          {value: "分米 / dm", id: 117},
          {value: "千米 / km", id: 118},
          {value: "米 / m", id: 119}
        ]
      };
    },
    computed: {
      //是否在当前弹窗显示参数表单，而不是弹窗
      showParameterFromInline() {
        return this.formData.featureType == 0;
      },
      // 服务
      showServer() {
        return this.formData.featureType == 1;
      },
      // 事件
      showEvent() {
        return this.formData.featureType == 2;
      },
      // 当前title
      myTitle() {
        return this.handleType == "ADD" ? "新增功能" : "修改功能";
      },
      // 参数titile
      parameterTitle() {
        return this.handleParamType == "ADD" ? "新增参数" : "修改参数";
      }
    },
    watch: {
      serverForm(newValue, oldValue) {
        console.log(newValue, oldValue);
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
      handleEditFeature(data) {
        this.showMask = true;
        this.resetMainForm();
        // 属性功能
        const {
          featureType,
          featureId,
          featureName,
          description,
          callType,
          inputParams,
          outputParams,
          featureCode,
          eventType
        } = data;
        this.commonForm.featureName = featureName;
        this.commonForm.featureId = featureId;
        this.commonForm.featureType = featureType;
        this.commonForm.featureCode = featureCode;
        this.commonForm.description = description;
        this.handleType = EDIT;

        if (featureType == 0) {
          this.$nextTick(() => {
            this.$refs["base-form-box"].setData(data);
          });
        }
        if (featureType == 1) {
          this.serverForm.callType = callType;
          this.serverForm.inputParams = inputParams;
          this.serverForm.outputParams = outputParams;
          this.serverForm.input = 1;
          this.serverForm.output = 1;
        }
        if (featureType == 2) {
          this.eventForm.eventType = eventType;
          this.eventForm.outputParams = outputParams;
          this.serverForm.out = 1;
        }
      },
      // 新增功能
      handleAddFeature() {
        this.showMask = true;
        this.resetMainForm();
        this.handleType = ADD;
      },
      // 充重置所有表单
      resetMainForm() {
        this.commonForm = {
          featureId: "", //功能id
          featureName: "", //功能名称
          featureType: 0, //功能类型 0属性，1服务，2事件
          featureCode: "", //功能编码
          productId: "", //商品ID
          productName: "", //商品名称
          remark: "", //备注
          productCode: "", //商品编码
          sort: "", //排序号
          required: true,
          description: ""
        };
        this.customReset();
      },

      customReset() {
        this.commonForm = {
          featureId: "", //功能id
          featureName: "", //功能名称
          featureType: 0, //功能类型 0属性，1服务，2事件
          featureCode: "", //功能编码
          productId: "", //商品ID
          productName: "", //商品名称
          remark: "", //备注
          productCode: "", //商品编码
          sort: "", //排序号
          required: true
        };
        //   服务表单
        this.serverForm = {
          callType: 0,
          input: "",
          inputParams: [],
          output: "",
          outputParams: []
        };
        //   事件表单
        this.eventForm = {
          eventType: "0",
          output: "",
          outputParams: []
        };
      },
      // 处理新增的参数
      handleAddParam() {
        const childResult = this.getChildFormData("mask-form-box");
        const [form, paramList] = this.currentParamList;
        const realKey = paramList.replace("Params", "");
        if (this.handleParamType == ADD) {
          this[form][paramList].push(childResult);
        } else if (this.handleParamType == EDIT) {
          this.$set(this[form][paramList], this.currentParamIndex, childResult);
        }
        this[form][realKey] = JSON.stringify(this[form][paramList]);
        this.isAddParam = false;
      },
      // 新增参数
      toAddParam(key) {
        this.currentParamList = key.split(".");
        this.isAddParam = true;
        this.handleParamType = ADD;
        this.$refs["mask-form-box"] && this.$refs["mask-form-box"].resetForm();
      },
      // 编辑新增参数
      editParamByIndex(key, index) {
        this.currentParamList = key.split(".");
        const [form, paramList] = this.currentParamList;
        this.isAddParam = true;
        this.handleParamType = EDIT;
        this.currentParamIndex = index;
        this.$nextTick(() => {
          this.$refs["mask-form-box"].setData(this[form][paramList][index]);
        });
      },
      // 删除参数
      removeParamByIndex(key, index) {
        this.currentParamList = key.split(".");
        const [form, paramList] = this.currentParamList;
        const realKey = paramList.replace("Params", "");
        this[form][realKey] = this[form][paramList];
        this[form][paramList].splice(index, 1);
      },
      // 提交
      checkForm() {
        if (this.showParameterFromInline) {
          this.checkBaseFrom();
        }
        if (this.showServer) {
          this.checkServerFrom();
        }
        if (this.showEvent) {
          this.checkEventFrom();
        }
      },

      validateFroms(arr) {
        let promiseList = [];
        let promiseValidate = form =>
          new Promise((resolve, reject) => {
            this.$refs[form].validate(result => result && resolve("__success__"));
          });
        arr.forEach(item => promiseList.push(promiseValidate(item)));
        return Promise.all(promiseList);
      },
      // 属性表单
      async checkBaseFrom() {
        await this.validateFroms(["common-form", "base-form-box"]);
        const childResult = this.getChildFormData("base-form-box");
        const param = Object.assign({}, childResult, this.commonForm);
        this.handleFeature(param);
      },
      // 服务表单
      async checkServerFrom() {
        await this.validateFroms(["common-form", "server-form"]);
        const param = Object.assign({}, this.commonForm, this.serverForm);
        this.handleFeature(param);
      },
      // 事件表单
      async checkEventFrom() {
        await this.validateFroms(["common-form", "event-form"]);
        const param = Object.assign({}, this.commonForm, this.selfData);
        this.handleFeature(param);
      },
      // 新增功能

      handleFeature(feature) {
        // 判断当前的事件类型是新增还是编辑
        if (this.handleType == ADD) {
          this.$store.dispatch("productFeature/addOne", feature).then(result => {
            this.handleCompelete("提交成功！");
          });
        } else if ((this.handleType = EDIT)) {
          this.$store
            .dispatch("productFeature/editFeatureById", feature)
            .then(result => {
              this.handleCompelete("修改成功！");
            });
        }
      },

      handleCompelete(message) {
        this.$message({
          message,
          type: "success"
        });
        this.resetMainForm();
        this.$emit("handleCompelete");
        this.showMask = false;
      },
      // 取消编辑
      cancelEdit() {
        this.resetMainForm();
        this.showMask = false;
      },
      // 获取数据表单的结果
      getChildFormData(ref) {
        const child = this.$refs[ref];
        const result = JSON.parse(JSON.stringify(child.selfForm));
        const {valueType, enumList, max, min} = result;
        const rangeType = child.rangeType;
        if (rangeType == 0) {
          result.values = {max, min};
        }
        if (rangeType == 1) {
          result.values = enumList;
        }
        delete result.readOrWrite;
        delete result.enumList;
        return result;
      }
    },
    components: {
      paramForm
    },
  };
</script>

<style>
  .el-dialog {
    width: 380px;
    min-width: 380px;
  }
</style>
