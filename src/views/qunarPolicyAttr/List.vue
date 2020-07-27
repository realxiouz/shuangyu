<template>
  <div class="">
    <!-- <search class="page-search" ref="search" @onSearch="onSearch" />
    <el-row class="page-tools" type="flex" justify="space-between">
      <el-button icon="el-icon-back" type="warning" size="mini" @click="onBack">返回</el-button>
    </el-row>
    <el-table
      class="page-table"
      size="mini"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-bottom:15px;"
    >
      <el-table-column label="排列序号" align="center" prop="sort" />
      <el-table-column label="平台名称" align="center" prop="openName" />
      <el-table-column label="属性编码" align="center" prop="code" />
      <el-table-column label="属性名称" align="center" prop="name" />
      <el-table-column label="数据类型" align="center" prop="valueType" :formatter="formatValueType" />
      <el-table-column label="是否必填" align="center" prop="required">
        <template slot-scope="scope">
          <span> {{scope.row.required ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否只读" align="center" prop="readonly">
        <template slot-scope="scope">
          <span> {{scope.row.readonly ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否禁用" align="center" prop="disabled">
        <template slot-scope="scope">
          <span> {{scope.row.disabled ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否隐藏" align="center" prop="hidden">
        <template slot-scope="scope">
          <span> {{scope.row.hidden ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onEdit(scope.row.openPolicyAttrId)">设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
      @size-change="onSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @refresh="onRefresh"/> -->
    <div class="page-back">
      <el-button-group>
        <el-button type="primary" @click="handleBack">返回</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-button-group>
    </div>
    <el-form ref="form" label-width="110px" size="mini" >
    <el-col >
        <el-table :data="tableData"  border center>
          <el-table-column  label="属性名称" prop="name" />
          <el-table-column label="默认数值" prop="defaultValue">
            <template slot-scope="scope" prop="defaultValue">
              <el-input prop="defaultValue" v-if="scope.row.valueType === 0 && scope.row.inputType === 'text'" v-model="scope.row.defaultValue" placeholder="请输入默认数值" />
              <el-input prop="defaultValue" v-if="scope.row.valueType === 0 && scope.row.inputType === 'textarea'" v-model="scope.row.defaultValue" placeholder="请输入默认数值" type="textarea" :rows="3" />
              <el-switch prop="defaultValue" v-if="scope.row.valueType === 1" v-model="scope.row.defaultValue" @click="handleValue"></el-switch>
              <el-input-number prop="defaultValue" v-if="scope.row.valueType === 2" v-model="scope.row.defaultValue" placeholder="请输入默认数值" :min="scope.row.min" :max="scope.row.max" :step="scope.row.step" :precision="scope.row.precision" style="width: 100%;" />
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
  </div>
</template>

<script>
  import edit from "./Edit";
  import search from "./Search";
  import {MIXIN_LIST} from "@/utils/mixin";

  export default {
    mixins: [MIXIN_LIST],
    data() {
      return {
        dialogVisible: false,
        keyName: 'openPolicyAttrId',
        actions: {
          getPageList: 'openPolicyAttr/getPageList',
          removeOne: 'openPolicyAttr/removeOne'
        },
        valueTypes: [
          {
            value: 0,
            label: '文本'
          },
          {
            value: 1,
            label: '开关'
          },
          {
            value: 2,
            label: '数字'
          },
          {
            value: 3,
            label: '日期'
          },
          {
            value: 4,
            label: '日期时间'
          },
          {
            value: 5,
            label: '时间'
          },
          {
            value: 6,
            label: '评分'
          },
          {
            value: 7,
            label: '单选'
          },
          {
            value: 8,
            label: '多选'
          }
        ],
      };
    },
    methods: {
      handleBack() {
      this.$router.go(-1)
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("openPolicyAttr/saveOne", this.formData)
            .then(() => {
              this.$message({ type: "success", message: "保存成功" });
              this.handleBack()
            });
        }
      });
    },
      onBack(){
        let lastName = localStorage.getItem("lastName");
        if(lastName){
          this.$router.push({name: lastName,});
          localStorage.removeItem("lastName");
        }else{
          this.$router.go(-1);
        }
      },
      formatValueType(row){
        let valueType = '';
        this.valueTypes.forEach(function(obj){
          if(row.valueType === obj.value){
            valueType = obj.label;
          }
        });
        return valueType;
      }
    },
    components: {
      edit,
      search
    },
  };
</script>

<style>
  .page-tools {
    margin-bottom: 10px;
  }
</style>
