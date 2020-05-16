<template>
  <div v-if="showMask">
    <!-- 功能列表弹窗 -->
    <el-dialog :title="myTitle" :visible.sync="showMask">
      <el-form label-position="top" :rules="baseRule" :model="commonForm" ref="common-form">
        <el-form-item label="自定义功能">
          <el-radio-group v-model="commonForm.featureType">
            <el-radio-button
              :label="item.id"
              v-for="(item,index) in featureCate"
              :key="index"
            >{{item.value}}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="功能名称" prop="featureName">
          <el-col :span="12">
            <el-input placeholder="请输入您的公共功能名称" v-model="commonForm.featureName" />
          </el-col>
        </el-form-item>

        <el-form-item label="标识符" prop="featureCode">
          <el-col :span="12">
            <el-input placeholder="请输入您的标识符" v-model="commonForm.featureCode" />
          </el-col>
        </el-form-item>

        <!-- 属性 -->
        <!-- ----------------------------------------------------------------------- -->
        <parameter-form ref="base-form-box" v-if="showParameterFromInline" />
        <!-- 服务 -->
        <!-- ----------------------------------------------------------------------- -->
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
          <el-input placeholder="请输入描述" type="textarea" v-model="commonForm.description" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="checkForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 参数弹窗 -->
    <el-dialog :visible.sync="isAddParam" :title="parameterTitle">
      <parameter-form ref="mask-form-box" :show-param-name="true" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddParam = false">取 消</el-button>
        <el-button type="primary" @click="handleAddParam">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import parameterForm from "./ParameterForm";
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
      featureCate: [
        { id: 0, value: "属性" },
        { id: 1, value: "服务" },
        { id: 2, value: "事件" }
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
      commonForm: {
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
      },
      //   服务表单
      serverForm: {
        callType: 0,
        input: "",
        inputParams: [],
        output: "",
        outputParams: []
      },
      //   事件表单
      eventForm: {
        eventType: 0,
        output: "",
        outputParams: []
      },

      baseRule: {
        featureName: [
          { required: true, message: "请输入您的公共功能名称", trigger: "blur" }
        ],
        featureCode: [
          { required: true, message: "请输入标志符", trigger: "blur" },
          { validator: validateSign, trigger: "input" }
        ]
      },

      serverRule: {
        input: [
          { required: true, message: "请添加输入参数", trigger: "change" }
        ],
        output: [
          { required: true, message: "请添加输出参数111", trigger: "change" }
        ]
      },
      eventRule: {
        output: [
          { required: true, message: "请添加输出参数", trigger: "change" }
        ]
      }
    };
  },
  methods: {
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
      const { valueType, enumList, max, min } = result;
      const rangeType = child.rangeType;
      if (rangeType == 0) {
        result.values = { max, min };
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
    parameterForm
  },
  computed: {
    //是否在当前弹窗显示参数表单，而不是弹窗
    showParameterFromInline() {
      return this.commonForm.featureType == 0;
    },
    // 服务
    showServer() {
      return this.commonForm.featureType == 1;
    },
    // 事件
    showEvent() {
      return this.commonForm.featureType == 2;
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
  }
};
</script>

<style>
</style>