<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改调度标签管理' : '添加调度标签管理'"  width="24%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="标签类别:" prop="tagType">
            <el-select
              v-model="formData.tagType"
              clearable
              placeholder="请选择标签类别"
              style="width: 100%"
            >
              <el-option
                v-for="item in tagTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="标签编码" prop="tagCode">
            <el-input placeholder="请输入标签编码" v-model="formData.tagCode" :disabled="codeEnable"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="标签名称" prop="tagName">
            <el-input placeholder="请输入标签名称" v-model="formData.tagName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="备注" prop="remark">
            <el-input placeholder="请输入备注" v-model="formData.remark" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div style="text-align:right;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {MIXIN_EDIT} from "@/utils/mixin";
  export default {
    mixins: [MIXIN_EDIT],
    data() {
      const codeValidator = (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z]*$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("只能输入字母或数字！"));
        }
      };
      return {
        dialogVisible: false,
        codeEnable: false,
        actions: {
          getOne: 'jobTag/getOne',
          saveOne: 'jobTag/saveOne'
        },
        tagTypes:[
          {
            label:"工厂",
            value:1
          },
          {
            label:"政策",
            value:2
          },
          {
            label:"其他",
            value:9
          }
        ],
        rules: {
          tagType: [
            {required: true, message: "请选择标签类别"}
          ],
          tagCode: [
            {required: true, message: "请输入标签编码"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          tagName: [
            {required: true, message: "请输入标签名称"},
            {
              min: 1,
              max: 20,
              message: "长度在 1到 20 个字符"
            }
          ]
        }
      };
    },
    watch: {
      visible(val) {
        if (val) {
          this.codeEnable = false;
          if(this.keyId){
            this.codeEnable = true;
          }
        }
      }
    },
    methods: {
      defaultFormData() {
        return {
          tagId: null,
          tagName: null,
          tagCode: null,
          tagType: null,
          remark: null
        };
      }
    }
  };
</script>
