<template>
  <div class="page-form">
    <el-form ref="policyForm"  :model="formData" label-width="120px" size="mini">
      <el-form-item label="政策编码:" prop="policyCode">
        <el-input v-model="formData.policyCode" onkeyup="this.value=this.value.toUpperCase()" placeholder="政策编码.."></el-input>
      </el-form-item>
      <el-form-item label="政策来源:" prop="policySource">
        <el-input v-model="formData.policySource" placeholder="政策编码.."></el-input>
      </el-form-item>
      <el-form-item label="票面价类型:" prop="discountType">
        <el-input v-model="formData.discountType" placeholder="票面价类型.."></el-input>
      </el-form-item>
      <el-form-item label="票面价/折扣:" prop="discountValue">
        <el-input v-model.number="formData.discountValue" placeholder="示例：七折填写0.7"></el-input>
      </el-form-item>
      <el-form-item label="CPA返点:" prop="returnPoint">
        <el-input v-model.number="formData.returnPoint" placeholder="CPA返点.."></el-input>
      </el-form-item>
      <el-form-item label="CPA留钱:" prop="returnPrice">
        <el-input v-model.number="formData.returnPrice" placeholder="CPA留钱.."></el-input>
      </el-form-item>
      <el-form-item label="销售起始日期:" prop="sellStartDate">
        <el-date-picker
          v-model="formData.sellStartDate"
          type="date"
          placeholder="销售起始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="销售结束日期:" prop="sellEndDate">
        <el-date-picker
          v-model="formData.sellEndDate"
          type="date"
          placeholder="销售结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出发日期:" prop="flightDate">
        <el-date-picker
          v-model="formData.flightDate"
          type="date"
          placeholder="出发日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="提前出票时限:" prop="advanceDays">
        <el-input v-model.number="formData.advanceDays" placeholder="示例：三天填写 3(天)"></el-input>
      </el-form-item>
      <el-form-item label="最早出票时限:" prop="earliestAdvanceDays">
        <el-input v-model.number="formData.earliestAdvanceDays" placeholder="示例：七天填写 7(天)"></el-input>
      </el-form-item>
      <el-form-item label="支持证件类型:" prop="cardType">
        <el-radio v-model="formData.cardType" :label="0">支持所有证件类型</el-radio>
        <el-radio v-model="formData.cardType" :label="1">只支持身份证购买</el-radio>
      </el-form-item>
      <el-form-item label="支持共享航班:" prop="shared">
        <el-radio v-model="formData.shared" :label="0">全部</el-radio>
        <el-radio v-model="formData.shared" :label="1">非共享</el-radio>
      </el-form-item>
      <el-form-item label="支持经停航班:" prop="stop">
        <el-radio v-model="formData.stop" :label="0">全部</el-radio>
        <el-radio v-model="formData.stop" :label="1">经停</el-radio>
        <el-radio v-model="formData.stop" :label="2">非经停</el-radio>
      </el-form-item>
      <el-form-item label="发票:" prop="xcd">
        <el-radio v-model="formData.xcd" :label="0">仅提供发票</el-radio>
        <el-radio v-model="formData.xcd" :label="1">行程单</el-radio>
        <el-radio v-model="formData.xcd" :label="2">行程单和差额发票</el-radio>
      </el-form-item>
      <el-form-item label="提前禁售时间:" prop="lockTime">
        <el-input v-model.number="formData.lockTime" placeholder="60-120(分钟)"></el-input>
      </el-form-item>
      <el-form-item label="渠道标签:" prop="tag">
        <el-input v-model="formData.tag" placeholder="渠道标签.."></el-input>
      </el-form-item>
      <el-form-item label="产品标签:" prop="productMark">
        <el-input v-model="formData.productMark" placeholder="产品标签.."></el-input>
      </el-form-item>
      <el-form-item label="政策标签:" prop="policyFlags">
        <el-select clearable multiple v-model="formData.roles" style="width: 100%;" placeholder="请选择">
          <el-option
            v-for="item in policyFlagList"
            :key="item"
            :label="item"
            :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="域名:" prop="domain">
        <el-input v-model="formData.domain" placeholder="域名.."></el-input>
      </el-form-item>
      <el-form-item label="舱位:" prop="cabin">
        <el-input v-model="formData.cabin" placeholder="舱位.."></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" style="text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>
<script>
    export default {
        name: "policyEdit",
        props: ["policyId"],
        data() {
            return {
                formData: {},
                policyFlagList: ["MD", "DOM","TB","NEC"],
                rules: {
                    policyCode: [
                        {required: true, message: "请输入政策编码", trigger: "blur"}
                    ],
                    policySource: [
                        {required: true, message: "请输入政策来源", trigger: "blur"}
                    ],
                    discountType: [
                        {required: true, message: "请输入票面价类型", trigger: "blur"}
                    ],
                    discountValue: [
                        {required: true, message: "请输入票面价/折扣", trigger: "blur"},
                        {type: 'number', message: '请填写数字'}
                    ],
                    returnPoint: [
                        {required: true, message: "请输入CPA返点", trigger: "blur"},
                        {type: 'number', message: '请填写数字'}
                    ],
                    returnPrice: [
                        {required: true, message: "请输入CPA留钱", trigger: "blur"},
                        {type: 'number', message: '请填写数字'}
                    ],
                    sellStartDate: [
                        {required: true, message: "请选择销售起始日期", trigger: "blur"}
                    ],
                    sellEndDate: [
                        {required: true, message: "请选择销售结束日期", trigger: "blur"}
                    ],
                    flightDate: [
                        {required: true, message: "请选择出发日期", trigger: "blur"}
                    ],
                    advanceDays: [
                        {required: true, message: "请输入提前出票时限", trigger: "blur"},
                        {type: 'number', message: '请填写数字'}
                    ],
                    earliestAdvanceDays: [
                        {required: true, message: "请输入最早出票时限", trigger: "blur"},
                        {type: 'number', message: '请填写数字'}
                    ],
                    xcd: [
                        {required: true, message: "请选择发票类型", trigger: "blur"}
                    ],
                    cardType: [
                        {required: true, message: "请选择支持证件类型", trigger: "blur"}
                    ],
                    shared: [
                        {required: true, message: "请选择共享航班", trigger: "blur"}
                    ],
                    stop: [
                        {required: true, message: "请选择经停航班", trigger: "blur"}
                    ],
                    lockTime: [
                        {required: true, message: "请输入提前禁售时间", trigger: "blur"},
                        {type: 'number', message: '请填写数字'}
                    ],
                    tag: [
                        {required: true, message: "请输入渠道标签", trigger: "blur"}
                    ],
                    productMark: [
                        {required: true, message: "请输入产品标签", trigger: "blur"}
                    ],
                    cabin: [
                        {required: true, message: "请输入舱位", trigger: "blur"}
                    ],
                    domain: [
                        {required: true, message: "请输入域名", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            defaultFormData(){
              return {
                  //政策ID
                  policyId: '',
                  //政策编码
                  policyCode: '',
                  //政策来源
                  policySource: '',
                  //票面价类型
                  discountType: '',
                  //票面价/折扣
                  discountValue: 1,
                  //CPA返点
                  returnPoint: 0,
                  //CPA留钱
                  returnPrice: 0,
                  //销售起始日期
                  sellStartDate: null,
                  //销售结束日期
                  sellEndDate: null,
                  //出发日期
                  flightDate: null,
                  //提前出票时限
                  advanceDays: 0,
                  //最早出票时限
                  earliestAdvanceDays: 0,
                  //0，仅提供发票1，行程单2，行程单和差额发票
                  xcd: 0,
                  //0， 支持所有证件类型，1，只支持身份证购买
                  cardType: 0,
                  //是否支持共享航班(全部、非共享)
                  shared: 0,
                  //是否支持经停航班(全部、经停、非经停)
                  stop: 0,
                  //提前禁售时间（分钟60-120）
                  lockTime: 0,
                  //渠道标签
                  tag: '',
                  //产品标签
                  productMark: '',
                  //政策标签
                  policyFlags: [],
                  //域名
                  domain: '',
                  //舱位
                  cabin: ''
              };
            },
            loadPolicy(policyId) {
                this.$store
                    .dispatch("policy/getOne", {policyId: policyId})
                    .then(data => {
                        this.formData = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            handleConfirm() {
                this.$refs['policyForm'].validate((valid) => {
                    if (valid) {
                        if (this.formData.sellStartDate){
                            this.formData.sellStartDate = this.formData.sellStartDate.getTime();
                        }
                        if (this.formData.sellEndDate){
                            this.formData.sellEndDate = this.formData.sellEndDate.getTime();
                        }
                        if (this.formData.flightDate){
                            this.formData.flightDate = this.formData.flightDate.getTime();
                        }
                        this.formData.policyCode = this.formData.policyCode.toUpperCase();
                        this.$emit('onSave', this.formData);
                    } else {
                        this.$message({type: "warning", message: "请完整填写数据！"});
                        return false;
                    }
                });
            },
            clearForm(){
              this.formData = this.defaultFormData();
            },
            initFormData(){
                if (this.policyId){
                    this.loadPolicy();
                }else{
                    this.clearForm();
                }
            }
        },
        created() {
            this.initFormData();
        }
    }
</script>
