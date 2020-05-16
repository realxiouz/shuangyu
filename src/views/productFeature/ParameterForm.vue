<template>
  <div>
    <el-form
      label-position="top"
      :center="true"
      :model="selfForm"
      :rules="parameterRule"
      ref="selfForm"
    >
      <el-form-item label="参数名称" prop="paramName" v-if="showParamName">
        <el-col :span="9">
          <el-input placeholder="请输入参数名称" v-model="selfForm.paramName" />
        </el-col>
      </el-form-item>

      <el-form-item label="数据类型">
        <el-select v-model="selfForm.valueType" @change="handleValueTypeChange">
          <el-option
            v-for="(item,index) in valueTypes"
            :key="index"
            :value="item.value"
          >{{item.value}}</el-option>
        </el-select>
      </el-form-item>
      <!-- 取值范围（min-max） -->
      <el-form-item label="取值范围" v-if="rangeType==0">
        <el-col :span="9">
          <el-form-item prop="min">
            <el-input placeholder="最小值" v-model="selfForm.min" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" style="text-align:center" :span="2">-</el-col>

        <el-col :span="9">
          <el-form-item prop="max">
            <el-input placeholder="最大值" v-model="selfForm.max" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- 枚举列表（值-描述） -->

      <el-form-item label="枚举项" v-if="rangeType==1">
        <el-row>
          <el-col :span="11">参数值</el-col>
          <el-col :span="11">参数描述</el-col>
        </el-row>

        <el-row v-for="(item,index) in selfForm.enumList" :key="index" style="margin-bottom:20px">
          <el-col :span="9">
            <el-form-item
              :prop="'enumList.' + index + '.value'"
              :key="item.key"
              :rules="[{required: true, message: '参数值不能为空', trigger: 'blur'}]"
            >
              <el-input placeholder="编号如0" v-model="item.value" />
            </el-form-item>
          </el-col>
          <el-col class="line" style="text-align:center" :span="2">~</el-col>
          <el-col :span="9">
            <el-form-item
              :prop="'enumList.' + index + '.desc'"
              :key="item.key"
              :rules="[{required: true, message: '描述不能为空', trigger: 'blur'}]"
            >
              <el-input placeholder="枚举项的描述" v-model="item.desc" />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-link
              type="primary"
              style="margin-left:1em"
              v-if="index!=0"
              @click="delEunm(index)"
            >删除</el-link>
          </el-col>
        </el-row>

        <el-row>
          <el-link type="primary" @click="addEnum">+添加枚举项</el-link>
        </el-row>
      </el-form-item>

      <el-form-item label="数据长度" v-if="rangeType==3">
        <el-col :span="9">
          <el-input placeholder="数据长度" type="number" v-model="selfForm.textLength" />
        </el-col>
        <el-col :span="2">
          <el-button disabled>字节</el-button>
        </el-col>
      </el-form-item>

      <!-- date -->
      <el-form-item label="时间格式" v-if="rangeType==4">
        <el-col :span="9">
          <el-input disabled value="String类型的UTC时间戳（毫秒）" />
        </el-col>
      </el-form-item>

      <el-form-item label="步长" prop="step">
        <el-col :span="9">
          <el-input placeholder="请输入步长" v-model="selfForm.step" type="number" />
        </el-col>
      </el-form-item>

      <el-form-item label="数据单位" prop="unit">
        <el-select v-model="selfForm.unit">
          <el-option
            v-for="(item,index) in unitTypes"
            :key="index"
            :value="item.value"
          >{{item.value}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="读写类型">
        <el-radio-group v-model="selfForm.readOrWrite" @change="changeReadWriteType">
          <el-radio label="读写">读写</el-radio>
          <el-radio label="只读">只读</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const unitTypes = [
  { value: "无 /", id: 0 },
  { value: "纳克每升 / ppt", id: 1 },
  { value: "微克每升 / ppb", id: 2 },
  { value: "微西每厘米 / uS/cm", id: 3 },
  { value: "牛顿每库仑 / N/C", id: 4 },
  { value: "伏特每米 / V/m", id: 5 },
  { value: "滴速 / ml/min", id: 6 },
  { value: "血压 / mmHg", id: 7 },
  { value: "血糖 / mmol/L", id: 8 },
  { value: "毫米每秒 / mm/s", id: 9 },
  { value: "转每分钟 / turn/m", id: 10 },
  { value: "次 / count", id: 11 },
  { value: "档 / gear", id: 12 },
  { value: "步 / stepCount", id: 13 },
  { value: "标准立方米每小时 / Nm3/h", id: 14 },
  { value: "千伏 / kV", id: 15 },
  { value: "千伏安 / KVA", id: 16 },
  { value: "千乏 / kvar", id: 17 },
  { value: "微瓦每平方厘米 / uw/cm2", id: 18 },
  { value: "只 / 只", id: 19 },
  { value: "相对湿度 / %RH", id: 20 },
  { value: "立方米每秒 / m³/s", id: 21 },
  { value: "公斤每秒 / kg/s", id: 22 },
  { value: "转每分钟 / r/min", id: 23 },
  { value: "吨每小时 / t/h", id: 24 },
  { value: "千卡每小时 / KCL/h", id: 25 },
  { value: "升每秒 / L/s", id: 26 },
  { value: "兆帕 / Mpa", id: 27 },
  { value: "立方米每小时 / m³/h", id: 28 },
  { value: "千乏时 / kvarh", id: 29 },
  { value: "千乏 / KVar", id: 30 },
  { value: "微克每升 / μg/L", id: 31 },
  { value: "千卡路里 / kcal", id: 32 },
  { value: "吉字节 / GB", id: 33 },
  { value: "兆字节 / MB", id: 34 },
  { value: "千字节 / KB", id: 35 },
  { value: "字节 / B", id: 36 },
  { value: "微克每平方分米每天 / μg/(d㎡·d)", id: 37 },
  { value: "百万分率 / ppm", id: 38 },
  { value: "像素 / pixel", id: 39 },
  { value: "照度 / Lux", id: 40 },
  { value: "重力加速度 / grav", id: 41 },
  { value: "分贝 / dB", id: 42 },
  { value: "百分比 / %", id: 43 },
  { value: "流明 / lm", id: 44 },
  { value: "比特 / bit", id: 45 },
  { value: "克每毫升 / g/mL", id: 46 },
  { value: "克每升 / g/L", id: 47 },
  { value: "毫克每升 / mg/L", id: 48 },
  { value: "微克每立方米 / μg/m³", id: 49 },
  { value: "毫克每立方米 / mg/m³", id: 50 },
  { value: "克每立方米 / g/m³", id: 51 },
  { value: "千克每立方米 / kg/m³", id: 52 },
  { value: "纳法 / nF", id: 53 },
  { value: "皮法 / pF", id: 54 },
  { value: "微法 / μF", id: 55 },
  { value: "法拉 / F", id: 56 },
  { value: "欧姆 / Ω", id: 57 },
  { value: "微安 / μA", id: 58 },
  { value: "毫安 / mA", id: 59 },
  { value: "千安 / kA", id: 60 },
  { value: "安培 / A", id: 61 },
  { value: "毫伏 / mV", id: 62 },
  { value: "伏特 / V", id: 63 },
  { value: "毫秒 / ms", id: 64 },
  { value: "秒 / s", id: 65 },
  { value: "分钟 / min", id: 66 },
  { value: "小时 / h", id: 67 },
  { value: "日 / day", id: 68 },
  { value: "周 / week", id: 69 },
  { value: "月 / month", id: 70 },
  { value: "年 / year", id: 71 },
  { value: "节 / kn", id: 72 },
  { value: "千米每小时 / km/h", id: 73 },
  { value: "米每秒 / m/s", id: 74 },
  { value: "秒 / ″", id: 75 },
  { value: "分 / ′", id: 76 },
  { value: "度 / °", id: 77 },
  { value: "弧度 / rad", id: 78 },
  { value: "赫兹 / Hz", id: 79 },
  { value: "微瓦 / μW", id: 80 },
  { value: "毫瓦 / mW", id: 81 },
  { value: "千瓦特 / kW", id: 82 },
  { value: "瓦特 / W", id: 83 },
  { value: "卡路里 / cal", id: 84 },
  { value: "千瓦时 / kW·h", id: 85 },
  { value: "瓦时 / Wh", id: 86 },
  { value: "电子伏 / eV", id: 87 },
  { value: "千焦 / kJ", id: 88 },
  { value: "焦耳 / J", id: 89 },
  { value: "华氏度 / ℉", id: 90 },
  { value: "开尔文 / K", id: 91 },
  { value: "吨 / t", id: 92 },
  { value: "摄氏度 / °C", id: 93 },
  { value: "毫帕 / mPa", id: 94 },
  { value: "百帕 / hPa", id: 95 },
  { value: "千帕 / kPa", id: 96 },
  { value: "帕斯卡 / Pa", id: 97 },
  { value: "毫克 / mg", id: 98 },
  { value: "克 / g", id: 99 },
  { value: "千克 / kg", id: 100 },
  { value: "牛 / N", id: 101 },
  { value: "毫升 / mL", id: 102 },
  { value: "升 / L", id: 103 },
  { value: "立方毫米 / mm³", id: 104 },
  { value: "立方厘米 / cm³", id: 105 },
  { value: "立方千米 / km³", id: 106 },
  { value: "立方米 / m³", id: 107 },
  { value: "公顷 / h㎡", id: 108 },
  { value: "平方厘米 / c㎡", id: 109 },
  { value: "平方毫米 / m㎡", id: 110 },
  { value: "平方千米 / k㎡", id: 111 },
  { value: "平方米 / ㎡", id: 112 },
  { value: "纳米 / nm", id: 113 },
  { value: "微米 / μm", id: 114 },
  { value: "毫米 / mm", id: 115 },
  { value: "厘米 / cm", id: 116 },
  { value: "分米 / dm", id: 117 },
  { value: "千米 / km", id: 118 },
  { value: "米 / m", id: 119 }
];

const ADD = "ADD";
const EDIT = "EDIT";

export default {
  name: "myMask",
  props: {
    showParamName: {
      default: () => false
    }
  },
  data() {
    const validateLength = (rule, value, callback) => {
      if (value < 1 || value > 512) {
        callback(new Error("元素个数应为1-512"));
      } else {
        callback();
      }
    };

    const compareVaule = (rule, value, callback) => {
      const minValue = this.selfForm.min;
      if (minValue >= value) {
        callback(new Error("最大值必须大于最小值"));
      } else {
        callback();
      }
    };

    return {
      isAddParam: false,
      selfForm: {
        description: "", //描述
        max: "", //最大值
        min: "", //最小值
        paramCode: "", //属性编码
        precision: "", //精度
        required: "", //boolean是否必填
        step: "", //步长
        unit: "无/",
        valueType: "int32",
        values: {},
        readwrite: true, //读写
        readonly: false, //只读
        readOrWrite: "读写",
        enumList: [{ value: "", desc: "" }],
        paramName: ""
      },

      valueTypes: [
        { value: "int32", desc: "(整数型)", id: 1 },
        { value: "float", desc: "(单精度浮点型)", id: 2 },
        { value: "double", desc: "(双精度浮点型)", id: 3 },
        { value: "enum", desc: "(枚举型)", id: 4 },
        { value: "text", desc: "(字符串)", id: 6 },
        { value: "date", desc: "(时间型)", id: 7 }
      ],
      parameterRule: {
        paramName: [
          { required: true, message: "请输入参数名称", trigger: "blur" }
        ],
        step: [{ required: true, message: "请输入步长", trigger: "blur" }],
        min: [{ required: true, message: "请输入最小值", trigger: "blur" }],
        max: [
          { required: true, message: "请输入最大值", trigger: "blur" },
          { validator: compareVaule, trigger: "blur" }
        ]
      },
      unitTypes,
      rangeType: 0
    };
  },
  methods: {
    // 设置表单数据 （编辑参数）
    setData(data) {
      this.selfForm.valueType = data.valueType;
      for (let key in data) {
        if (this.selfForm[key] != undefined) {
          if (key == "valueType") {
          } else if (key == "values") {
            const rangeType = this.rangeType;
            this.selfForm.values = data[key];
            if (rangeType == 0) {
              const { max, min } = data[key];
              this.selfForm.max = max;
              this.selfForm.min = min;
            }
            if (rangeType == 1) {
              this.selfForm.enumList = this.selfForm.values;
            }
          } else {
            this.selfForm[key] = data[key];
          }
        }
      }
    },

    // 处理数据类型切换
    handleValueTypeChange(e) {
      const sectionKey = ["int32", "float", "double"];
      let isSection = sectionKey.indexOf(e) != -1;

      if (isSection) {
        this.rangeType = 0;
        return;
      }

      if (e == "enum") {
        this.rangeType = 1;
        return;
      }

      if (e == "text") {
        this.rangeType = 3;
        return;
      }

      if (e == "date") {
        this.rangeType = 4;
        return;
      }
      this.rangeType = -1;
    },
    // 新增枚举数据
    addEnum() {
      this.selfForm.enumList.push({ value: "", desc: "" });
    },
    // 删除枚举数量
    delEunm(index) {
      this.selfForm.enumList.splice(index, 1);
    },
    // 表单验证
    checkForm(callback) {
      this.$refs.selfForm.validate(valid => {
        callback(valid);
      });
    },
    validate(callback) {
      this.$refs.selfForm.validate(valid => {
        callback(valid);
      });
    },
    // 转换读写转态
    changeReadWriteType(e) {
      const flag = e == "只读" ? true : false;
      this.selfForm.readonly = flag;
      this.selfForm.readwrite = !flag;
    },
    // 重置表单
    resetForm() {
      this.$refs.selfForm.resetFields();
    }
  }
};
</script>

<style>
</style>