<template>
  <div>
    <el-form ref="form" :rules="rules" :model="formData" label-width="120px" size="mini">
      <el-form-item label="航司" prop="airlineCode">
        <el-input v-model="formData.airlineCode"></el-input>
      </el-form-item>
      <el-form-item label="出发地三字码" prop="dpt">
        <el-input v-model="formData.dpt"></el-input>
      </el-form-item>
      <el-form-item label="到达地三字码" prop="arr">
        <el-input v-model.number="formData.arr"></el-input>
      </el-form-item>
      <el-form-item label="主航班号" prop="actFlightCode">
        <el-input v-model.number="formData.actFlightCode"></el-input>
      </el-form-item>
      <el-form-item label="航班号" prop="flightCode">
        <el-input v-model.number="formData.flightCode"></el-input>
      </el-form-item>
      <el-form-item label="舱位" prop="cabin">
        <el-input v-model.number="formData.cabin"></el-input>
      </el-form-item>
      <el-form-item label="票面价/折扣" prop="discountValue">
        <el-input v-model.number="formData.discountValue"></el-input>
      </el-form-item>
      <el-form-item label="销售起始日期:" prop="sellStartDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.sellStartDate"
          @change="getTimeSellStartDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="销售结束日期:" prop="sellEndDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.sellEndDate"
          @change="getTimeSellEndDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="出发日期:" prop="flightDate">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.flightDate"
          @change="getTimeFlightDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="最早出票时限" prop="earliestAdvanceDays">
        <el-input v-model.number="formData.earliestAdvanceDays"></el-input>
      </el-form-item>
      <el-form-item label="政策编码" prop="policyCode">
        <el-input v-model.number="formData.policyCode"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
    function defaultData() {
        return {
            airlineCode: '',
            dpt: '',
            arr: '',
            actFlightCode: '',
            flightCode: '',
            cabin: '',
            discountValue: '',
            sellStartDate: '',
            sellEndDate: '',
            flightDate: '',
            earliestAdvanceDays: '',
            policyCode: '',
        }
    };
    export default {
        name: "policyEdit",
        data() {
            return {
                formData: defaultData(),
                rules: {
                    airlineCode: [
                        {required: true, message: "请输入航司", trigger: "blur"},
                    ],
                    dpt: [
                        {required: true, message: "请输入出发地三字码", trigger: "blur"},
                    ],
                    arr: [
                        {required: true, message: "请输入到达地三字码", trigger: "blur"},
                    ],
                    actFlightCode: [
                        {required: true, message: "请输入主航班号", trigger: "blur"},
                    ],
                    flightCode: [
                        {required: true, message: "请输入航班号", trigger: "blur"},
                    ],
                    cabin: [
                        {required: true, message: "请输入舱位", trigger: "blur"},
                    ],
                    discountValue: [
                        {required: true, message: "票面价/折扣", trigger: "blur"},
                    ],
                    sellStartDate: [
                        {required: true, message: "请选择销售起始日期", trigger: "blur"},
                    ],
                    sellEndDate: [
                        {required: true, message: "请选择销售结束日期", trigger: "blur"},
                    ],
                    flightDate: [
                        {required: true, message: "请选择出发日期", trigger: "blur"},
                    ],
                    policyCode: [
                        {required: true, message: "请输入政策编码", trigger: "blur"},
                    ]
                }
            }
        },
        methods: {
            handleGetOne(policyId) {
                this.$store
                    .dispatch("policy/getOne", {policyId: policyId})
                    .then(data => {
                        this.formData = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$emit('onSave', this.formData);
                    }
                });
            },
            getTimeSellStartDate(date) {
                this.formData.sellStartDate = date.getTime();
            },
            getTimeSellEndDate(date) {
                this.formData.sellEndDate = date.getTime();
            },
            getTimeFlightDate(date) {
                this.formData.flightDate = date.getTime();
            }
        },
        created() {
            if (this.policyId) {
                this.handleGetOne(this.policyId);
            } else {
                this.formData = defaultData();
            }
        },
        props: {
            policyId: String,
        }
    }
</script>
