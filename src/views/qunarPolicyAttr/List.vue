<template>
  <div class="">
    <div class="page-back">
      <el-button-group>
        <el-button type="primary" @click="handleBack">返回</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-button-group>
    </div>
    <el-tabs class="page-tabs" v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="预付政策" name="first">
        <el-form ref="form" label-width="110px" size="mini">
          <el-col>
            <el-table :data="tableData" border center>
              <el-table-column label="属性名称" prop="name" />
              <el-table-column label="默认数值" prop="defaultValue">
                <template slot-scope="scope" prop="defaultValue">
                  <el-input prop="defaultValue" v-if=" scope.row.valueType === 0 && scope.row.inputType === 'text' "  v-model="scope.row.defaultValue" placeholder="请输入默认数值"  />
                  <el-input prop="defaultValue" v-if=" scope.row.valueType === 0 &&  scope.row.inputType === 'textarea' "  v-model="scope.row.defaultValue" placeholder="请输入默认数值" type="textarea" :rows="3" />
                  <el-switch prop="defaultValue" v-if="scope.row.valueType === 1" v-model="scope.row.defaultValue" @click="handleValue" ></el-switch>
                  <el-input-number
                    prop="defaultValue"
                    v-if="scope.row.valueType === 2"
                    v-model="scope.row.defaultValue"
                    placeholder="请输入默认数值"
                    :min="scope.row.min"
                    :max="scope.row.max"
                    :step="scope.row.step"
                    :precision="scope.row.precision"
                    style="width: 100%;"
                  />
                  <el-date-picker
                    prop="defaultValue"
                    v-if="scope.row.valueType === 3"
                    v-model="scope.row.defaultValue"
                    :format="scope.row.format"
                    type="date"
                    placeholder="请选择默认数值"
                    style="width: 100%;"
                  />
                  <el-date-picker
                    prop="defaultValue"
                    v-if="scope.row.valueType === 4"
                    v-model="scope.row.defaultValue"
                    :format="scope.row.format"
                    type="datetime"
                    placeholder="请选择默认数值"
                    style="width: 100%;"
                  />
                  <el-time-picker
                    prop="defaultValue"
                    v-if="scope.row.valueType === 5"
                    v-model="scope.row.defaultValue"
                    :format="scope.row.format"
                    placeholder="请选择默认数值"
                    style="width: 100%;"
                  />
                  <el-input prop="defaultValue" v-if="scope.row.valueType === 6" v-model="scope.row.defaultValue" placeholder="请输入默认数值" />
                  <el-select
                    prop="defaultValue"
                    v-if="scope.row.valueType === 7"
                    v-model="scope.row.defaultValue"
                    placeholder="请选择默认数值"
                    clearable
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in scope.row.attributes"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                  <el-select
                    prop="defaultValue"
                    v-if="scope.row.valueType === 8"
                    v-model="scope.row.defaultValue"
                    placeholder="请选择默认数值"
                    style="width: 100%"
                    multiple
                  >
                    <el-option
                      v-for="item in scope.row.attributes"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="备注" prop="remark" />
            </el-table>
          </el-col>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="包机切位" name="second">
        <el-form ref="form" label-width="110px" size="mini">
          <el-col>
            <el-table :data="tableData" border center>
              <el-table-column label="属性名称" prop="name" />
              <el-table-column label="默认数值" prop="defaultValue">
                <template slot-scope="scope" prop="defaultValue">
                  <el-input prop="defaultValue" v-if=" scope.row.valueType === 0 && scope.row.inputType === 'text' "  v-model="scope.row.defaultValue" placeholder="请输入默认数值"  />
                  <el-input prop="defaultValue" v-if=" scope.row.valueType === 0 &&  scope.row.inputType === 'textarea' "  v-model="scope.row.defaultValue" placeholder="请输入默认数值" type="textarea" :rows="3" />
                  <el-switch prop="defaultValue" v-if="scope.row.valueType === 1" v-model="scope.row.defaultValue" @click="handleValue" ></el-switch>
                  <el-input-number
                    prop="defaultValue"
                    v-if="scope.row.valueType === 2"
                    v-model="scope.row.defaultValue"
                    placeholder="请输入默认数值"
                    :min="scope.row.min"
                    :max="scope.row.max"
                    :step="scope.row.step"
                    :precision="scope.row.precision"
                    style="width: 100%;"
                  />
                  <el-date-picker
                    prop="defaultValue"
                    v-if="scope.row.valueType === 3"
                    v-model="scope.row.defaultValue"
                    :format="scope.row.format"
                    type="date"
                    placeholder="请选择默认数值"
                    style="width: 100%;"
                  />
                  <el-date-picker
                    prop="defaultValue"
                    v-if="scope.row.valueType === 4"
                    v-model="scope.row.defaultValue"
                    :format="scope.row.format"
                    type="datetime"
                    placeholder="请选择默认数值"
                    style="width: 100%;"
                  />
                  <el-time-picker
                    prop="defaultValue"
                    v-if="scope.row.valueType === 5"
                    v-model="scope.row.defaultValue"
                    :format="scope.row.format"
                    placeholder="请选择默认数值"
                    style="width: 100%;"
                  />
                  <el-input prop="defaultValue" v-if="scope.row.valueType === 6" v-model="scope.row.defaultValue" placeholder="请输入默认数值" />
                  <el-select
                    prop="defaultValue"
                    v-if="scope.row.valueType === 7"
                    v-model="scope.row.defaultValue"
                    placeholder="请选择默认数值"
                    clearable
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in scope.row.attributes"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                  <el-select
                    prop="defaultValue"
                    v-if="scope.row.valueType === 8"
                    v-model="scope.row.defaultValue"
                    placeholder="请选择默认数值"
                    style="width: 100%"
                    multiple
                  >
                    <el-option
                      v-for="item in scope.row.attributes"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="备注" prop="remark" />
            </el-table>
          </el-col>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import edit from "./Edit";
import search from "./Search";
import { MIXIN_LIST } from "@/utils/mixin";

export default {
  mixins: [MIXIN_LIST],
  data() {
    return {
      dialogVisible: false,
      keyName: "openPolicyAttrId",
      activeName:'first',
      actions: {
        getPageList: "openPolicyAttr/getPageList",
        removeOne: "openPolicyAttr/removeOne"
      },
      valueTypes: [
        {
          value: 0,
          label: "文本"
        },
        {
          value: 1,
          label: "开关"
        },
        {
          value: 2,
          label: "数字"
        },
        {
          value: 3,
          label: "日期"
        },
        {
          value: 4,
          label: "日期时间"
        },
        {
          value: 5,
          label: "时间"
        },
        {
          value: 6,
          label: "评分"
        },
        {
          value: 7,
          label: "单选"
        },
        {
          value: 8,
          label: "多选"
        }
      ]
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
     handleClick(tab, event) {
        console.log(tab, event);
      },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("openPolicyAttr/saveOne", this.formData)
            .then(() => {
              this.$message({ type: "success", message: "保存成功" });
              this.handleBack();
            });
        }
      });
    },
    onBack() {
      let lastName = localStorage.getItem("lastName");
      if (lastName) {
        this.$router.push({ name: lastName });
        localStorage.removeItem("lastName");
      } else {
        this.$router.go(-1);
      }
    },
    formatValueType(row) {
      let valueType = "";
      this.valueTypes.forEach(function(obj) {
        if (row.valueType === obj.value) {
          valueType = obj.label;
        }
      });
      return valueType;
    }
  },
  components: {
    edit,
    search
  }
};
</script>

<style>
.page-tools {
  margin-bottom: 10px;
}
.page-tabs{
  margin-top: 10px;
}
</style>
