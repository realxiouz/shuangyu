<template>
  <el-row type="flex" justify="space-between" align="bottom">
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
        <el-col :span="24">
          <el-form-item label="取值范围" v-if="formData.valueType==2">
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
        <el-col :span="24">
          <el-form-item label="属性项" v-if="formData.valueType>6">
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
              <el-row class="attributes" type="flex" justify="space-between" v-for="(item,index) in formData.attributes"
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
</template>

<script>
  export default {
    name: "param",
    props: {},
    data() {
      return {
        formData: {
          code: '',
          name: '',
          inputType: '',
          description: '',
          max: '',
          min: '',
          precision: '',
          step: '',
          unit: '',
          valueType: 2,
          values: {},
          required: false,
          readonly: false,
          readwrite: true,
          attributes: []
        },
        formRules: {
          code: {required: true, message: "请输入参数编码", trigger: "blur"},
          name: {required: true, message: "请输入参数名称", trigger: "blur"}
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
    methods: {
      handleValueTypeChange(value) {
        if (value > 6) {
          if (this.formData.attributes.length == 0) {
            this.addItem();
          }
        }
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
