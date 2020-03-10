<template>
  <div>
    <el-form ref="form" :model="formData" :rules="verify" label-width="90px" :inline="true">
      <el-form-item prop="airlineCode" label="航司二字码">
        <el-select v-model="formData.airlineCode" @change="initCabins" filterable allow-create>
          <el-option
            v-for="item in airlines"
            :key="item.airlineCode"
            :label="item.airlineName"
            :value="item.airlineCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="cabin" label="舱位">
        <el-select v-model="formData.cabin" filterable allow-create default-first-option>
          <el-option
            v-for="item in cabins"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-row v-for="(ruleItem, index) in formData.rules" :key="formData.rules[index].key">
        <el-form-item>
          <el-input v-model="formData.rules[index].id" placeholder="退改规则标识（例如：T0  G0）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.rules[index].value" placeholder="退改规则值"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.rules[index].label" placeholder="退改规则说明"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.rules[index].category" placeholder="类别"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="index!=0" type="danger" class="el-icon-remove-outline"
                     @click="deleteRuleItem(index)"></el-button>
          <el-button v-if="index==0" type="primary" class="el-icon-circle-plus-outline"
                     @click="addRuleItem()"></el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSave">确 定</el-button>
      <el-button @click="$emit('onCancel')">取 消</el-button>
    </div>
  </div>
</template>
<script>

  function defaultData() {
    return {
      airlineCode: '',
      cabin: '',
      rules: [{}]
    };
  };
  export default {
    name: 'refundChangeRuleEdit',
    props: {
      ruleId: {
        String,
        required: true
      }
    },
    data() {
      return {
        formData: defaultData(),
        airlines: [{}],
        cabins: [{}],
        verify: {
          airlineCode: [
            {required: true, message: "请选择航司", trigger: "blur"}
          ],
          cabin: [
            {required: true, message: "请选择舱位", trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      initAirlines() {
        this.$store
          .dispatch('airline/getList', {})
          .then(data => {
            this.airlines = data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      initCabins(airlineCode) {
        this.formData.cabin = '';
        var cabinsArr = [];
        for (var i = 0; i < this.airlines.length; i++) {
          if (this.airlines[i].airlineCode == airlineCode) {
            cabinsArr = this.airlines[i].cabins.split(",");
            break;
          }
        }
        var _cabins = [{}];
        if (cabinsArr.length > 0) {
          for (var j = 0; j < cabinsArr.length; j++) {
            _cabins.push({value: cabinsArr[j], label: cabinsArr[j]});
          }
        }
        this.cabins=_cabins;
      },
      addRuleItem() {
        this.formData.rules.push({});
      },
      deleteRuleItem(index) {
        this.formData.rules.splice(index, 1);
      },
      handleSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store
              .dispatch('refundChangeRule/save', this.formData)
              .then(() => {
                this.$emit("onSave");
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
      },
      handleGetOne(id) {
        if (id) {
          this.$store
            .dispatch("refundChangeRule/getOne", {ruleId:id})
            .then(data => {
              this.formData = data;
            }).catch(error => {
            console.log(error);
          });
        } else {
          this.formData = defaultData();
        }
      },
      clearForm() {
        this.formData = defaultData();
      },
    },
    created() {
      this.clearForm();
      this.initAirlines();
      if (this.ruleId) {
        this.handleGetOne(this.ruleId);
      }
    }
  }
</script>
