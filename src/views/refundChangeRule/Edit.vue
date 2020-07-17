<template>
  <div class="page-form">
    <el-form ref="form" :model="formData" :rules="verify" label-width="100px" size="mini">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="airlineCode" label="航司二字码:">
            <el-select
              v-bind:disabled="disabled"
              v-model="formData.airlineCode"
              style="width:100%"
              @change="initCabins"
              filterable
              allow-create
            >
              <el-option
                v-for="item in airlines"
                :key="item.airlineCode"
                :label="item.airlineName"
                :value="item.airlineCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="cabin" label="舱位:">
            <el-select
              v-bind:disabled="disabled"
              v-model="formData.cabin"
              style="width:100%"
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in cabins"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-for="(ruleItem, index) in formData.rules"
        :key="formData.rules[index].key"
        id="rule-item"
        :gutter="10"
      >
        <el-col :span="5">
          <el-form-item class="rule-item" label-width="10px" style="width:100%">
            <el-input
              class="rule-item-input"
              v-model="formData.rules[index].id"
              placeholder="退改规则标识（例如：T0  G0）"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item class="rule-item" label-width="10px" style="width:100%">
            <el-input
              class="rule-item-input"
              v-model="formData.rules[index].value"
              placeholder="退改规则值"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="rule-item" label-width="10px" style="width:100%">
            <el-input
              class="rule-item-input"
              v-model="formData.rules[index].label"
              placeholder="退改规则说明"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="rule-item" label-width="10px" style="width:100%">
            <el-select
              class="rule-item-input"
              v-model="formData.rules[index].category"
              filterable
              allow-create
              default-first-option
              placeholder="类别"
            >
              <el-option
                v-for="item in categorys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2" >
          <el-form-item label-width="10px" style="width:100%">
            <el-button
              v-if="index!=0"
              type="danger"
              icon="el-icon-remove-outline"
              @click="deleteRuleItem(index)"
            ></el-button>
            <el-button
              v-if="index==0"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="addRuleItem()"
            ></el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
function defaultData() {
  return {
    airlineCode: "",
    cabin: "",
    rules: [{}]
  };
}
export default {
  name: "refundChangeRuleEdit",
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
      disabled: false,
      categorys: [
        {
          label: "退票规则",
          value: 0
        },
        {
          label: "改签规则",
          value: 1
        }
      ],
      verify: {
        airlineCode: [
          { required: true, message: "请选择航司", trigger: "blur" }
        ],
        cabin: [{ required: true, message: "请选择舱位", trigger: "blur" }]
      }
    };
  },
  methods: {
    initAirlines() {
      this.$store
        .dispatch("airline/getList", {})
        .then(data => {
          this.airlines = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    initCabins(airlineCode) {
      this.formData.cabin = "";
      var cabinsArray = [];
      for (var i = 0; i < this.airlines.length; i++) {
        if (this.airlines[i].airlineCode == airlineCode) {
          cabinsArray = this.airlines[i].cabins;
          break;
        }
      }
      var _cabins = [{}];
      if (cabinsArray.length > 0) {
        for (var j = 0; j < cabinsArray.length; j++) {
          _cabins.push({ value: cabinsArray[j], label: cabinsArray[j] });
        }
      }
      this.cabins = _cabins;
    },
    addRuleItem() {
      this.formData.rules.push({});
    },
    deleteRuleItem(index) {
      this.formData.rules.splice(index, 1);
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("refundChangeRule/save", this.formData)
            .then(() => {
              this.$emit("onSave");
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    handleGetOne(id) {
      if (id) {
        this.$store
          .dispatch("refundChangeRule/getOne", { ruleId: id })
          .then(data => {
            this.formData = data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.formData = defaultData();
      }
    },
    clearForm() {
      this.formData = defaultData();
    }
  },
  created() {
    this.clearForm();
    this.initAirlines();
    if (this.ruleId) {
      this.disabled = true;
      this.handleGetOne(this.ruleId);
    }
  }
};
</script>
<style>
#rule-item .el-form-item__content {
  width: 100%;
}
.rule-item {
  width: 20%;
}
.rule-item-input {
  width: 100%;
}
</style>
