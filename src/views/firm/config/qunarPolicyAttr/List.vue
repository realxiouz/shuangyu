<template>
  <div class="">
    <search class="page-search" style="margin-top:5px" ref="search" @onSearch="onSearch" :policyType="params.policyType"/>
    <el-tabs
      class="page-tabs"
      v-model="activeName"
      type="border-card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="单程预付政策" name="ONE_WAY_PAY_POLICY">
        <el-table
          :cell-style="rowClass"
          :header-cell-style="headClass"
          height="800"
          :data="tableData"
          border
          center
        >
          <el-table-column label="是否必填" prop="required" width="75" center>
            <template slot-scope="scope">
              <font v-if="scope.row.required === true" color="red">是</font>
              <font v-else-if="scope.row.required === false">否</font>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark" />
          <el-table-column label="属性编码" prop="code" width="150" center>
            <template slot-scope="scope">
              <font class="el-code">{{scope.row.code}}</font>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="name" width="250" center />
          <el-table-column label="默认数值" prop="defaultValue" width="500">
            <template slot-scope="scope" prop="defaultValue">
              <el-input
                class="el-input"
                prop="defaultValue"
                v-if="
                  scope.row.valueType === 0 && scope.row.inputType === 'text'
                "
                v-model="scope.row.defaultValue"
                placeholder="请输入默认数值"
              />
              <el-input
                prop="defaultValue"
                v-if="
                  scope.row.valueType === 0 &&
                    scope.row.inputType === 'textarea'
                "
                v-model="scope.row.defaultValue"
                placeholder="请输入默认数值"
                type="textarea"
                :rows="3"
              />
              <el-switch
                prop="defaultValue"
                v-if="scope.row.valueType === 1"
                v-model="scope.row.defaultValue"
                @click="handleValue"
              ></el-switch>
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
                :value-format="scope.row.format"
                type="date"
                placeholder="请选择默认数值"
                style="width: 100%;"
              />
              <el-time-picker
                prop="defaultValue"
                v-if="scope.row.valueType === 4"
                v-model="scope.row.defaultValue"
                :format="scope.row.format"
                :value-format="scope.row.format"
                placeholder="请选择默认数值"
                style="width: 100%;"
              >
              </el-time-picker>
              <el-input
                prop="defaultValue"
                v-if="scope.row.valueType === 5"
                v-model="scope.row.defaultValue"
                placeholder="请输入默认数值"
              />
              <el-select
                prop="defaultValue"
                v-if="scope.row.valueType === 60 || scope.row.valueType === 62"
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
                v-if="scope.row.valueType === 61"
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
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="新包机切位政策" name="NEW_ONE_WAY_CHANGE_POLICY">
        <el-table
          :cell-style="rowClass"
          :header-cell-style="headClass"
          height="800"
          :data="tableData"
          border
          center
        >
          <el-table-column label="是否必填" prop="required" width="75" center>
            <template slot-scope="scope">
              <font v-if="scope.row.required === true" color="red">是</font>
              <font v-else-if="scope.row.required === false">否</font>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="left" prop="remark" />
          <el-table-column label="属性编码" prop="code" width="150" center>
            <template slot-scope="scope">
              <font class="el-code">{{scope.row.code}}</font>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="name" width="250" center />
          <el-table-column label="默认数值" prop="defaultValue" width="500">
            <template slot-scope="scope" prop="defaultValue">
              <el-input
                class="el-input"
                prop="defaultValue"
                v-if="
                  scope.row.valueType === 0 && scope.row.inputType === 'text'
                "
                v-model="scope.row.defaultValue"
                placeholder="请输入默认数值"
              />
              <el-input
                prop="defaultValue"
                v-if="
                  scope.row.valueType === 0 &&
                    scope.row.inputType === 'textarea'
                "
                v-model="scope.row.defaultValue"
                placeholder="请输入默认数值"
                type="textarea"
                :rows="3"
              />
              <el-switch
                prop="defaultValue"
                v-if="scope.row.valueType === 1"
                v-model="scope.row.defaultValue"
                @click="handleValue"
              ></el-switch>
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
                :value-format="scope.row.format"
                type="date"
                placeholder="请选择默认数值"
                style="width: 100%;"
              />
              <el-time-picker
                prop="defaultValue"
                v-if="scope.row.valueType === 4"
                v-model="scope.row.defaultValue"
                :format="scope.row.format"
                :value-format="scope.row.format"
                placeholder="请选择默认数值"
                style="width: 100%;"
              >
              </el-time-picker>
              <el-input
                prop="defaultValue"
                v-if="scope.row.valueType === 5"
                v-model="scope.row.defaultValue"
                placeholder="请输入默认数值"
              />
              <el-select
                prop="defaultValue"
                v-if="scope.row.valueType === 60 || scope.row.valueType === 62"
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
                v-if="scope.row.valueType === 61"
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
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="page-back">
      <el-button-group>
        <!-- <el-button icon="el-icon-back" type="warning" @click="handleBack"
          >返回</el-button
        > -->
        <el-button icon="el-icon-plus" type="primary" @click="handleSave"
          >保存</el-button
        >
      </el-button-group>
    </div>
  </div>
</template>

<script>
import { MIXIN_LIST } from "@/utils/mixin";
import { PROPERTY_TABLE } from '@/utils/const';
import search from "./Search"
export default {
  mixins: [MIXIN_LIST],
  data() {
    return {
      dialogVisible: false,
      keyName: "openPolicyAttrId",
      activeName: "ONE_WAY_PAY_POLICY",
      actions: {
        getList: "openPolicyAttr/getList"
      },
      params: {
        policyType: "ONE_WAY_PAY_POLICY"
      },
      valueTypes: PROPERTY_TABLE,
      rules: {
        name: [{ required: true, message: "请输入默认数值" }]
      }
    };
  },
  components: {
    search
  },
  methods: {
    handleBack() {
      let lastName = localStorage.getItem("lastName");
      if (lastName) {
        this.$router.push({ name: lastName });
        localStorage.removeItem("lastName");
      } else {
        this.$router.go(-1);
      }
    },
    handleClick(tab) {
      this.params.policyType = tab.name;
      this.loadData();
    },
    handleSave() {
      let that = this;
      let flag = true;
      let formData = new FormData();
      that.tableData.forEach(function(obj) {
        if (flag) {
          if (
            obj.required &&
            (null == obj.defaultValue || "" === obj.defaultValue)
          ) {
            flag = false;
            that.$message({ type: "warning", message: obj.name + "是必填项" });
            return;
          }
          obj.policyTag = that.params.policyType;
          delete obj.policyTags;
          if (obj.defaultValue && obj.defaultValue.length < 1) {
            obj.defaultValue = null;
          }
          obj.firmId = null;
          if (localStorage.getItem("firmId")) {
            obj.firmId = localStorage.getItem("firmId");
          }
          obj.merchantId = null;
          if (localStorage.getItem("merchantId")) {
            obj.merchantId = localStorage.getItem("merchantId");
          }
          formData.append("qunarPolicyAttrList", JSON.stringify(obj));
          if (that.tableData.length === 1) {
            formData.append("qunarPolicyAttrList", "");
          }
        }
      });
      if (!flag) {
        return;
      }
      that.$store.dispatch("qunarPolicyAttr/save", formData).then(() => {
        that.$message({ type: "success", message: "保存成功" });
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
        if (row.valueType === obj.code) {
          valueType = obj.value;
        }
      });
      return valueType;
    },
    beforeLoadData(data) {
      if(data && data.length > 0){
        data.forEach(function(obj){
          if(obj.multiple && null != obj.defaultValue && '' !== obj.defaultValue){
            obj.defaultValue = [obj.defaultValue];
          }
        });
      }
      return data;
    },
    afterLoadData() {
      this.$store
        .dispatch("qunarPolicyAttr/getList", {
          ...this.params,
          ...(this.extraParam || {})
        })
        .then(data => {
          if (data && data.length > 0) {
            let that = this;
            data.forEach(function(qunarAttr) {
              if(qunarAttr.multiple && null != qunarAttr.defaultValue && '' !== qunarAttr.defaultValue){
                qunarAttr.defaultValue = [qunarAttr.defaultValue];
              }
              that.tableData.forEach(function(openAttr) {
                if (openAttr.code === qunarAttr.code) {
                  if (!(parseInt(qunarAttr.valueType) === 2 && qunarAttr.min >= 0 && "0" === qunarAttr.defaultValue)) {
                    openAttr.defaultValue = qunarAttr.defaultValue;
                  } else if (!qunarAttr.defaultValue) {
                    openAttr.defaultValue = qunarAttr.defaultValue;
                  }
                }
              });
            });
          }
        });
    },
    rowClass() {
      return "text-align:center;";
    },
    headClass() {
      return "text-align: center;";
    }
  }
};
</script>

<style scoped>
  .page-back {
    line-height: 50px;
    margin-left: 10px;
  }
  .page-back button {
    margin-right: 10px !important;
  }
  .el-required{
    color: #ff0000;
  }
  .el-code{
    color: #0cccff;
  }
</style>
