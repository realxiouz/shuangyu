<template>
  <div class="page-form">
    <el-dialog :title="keyId ? '修改开放平台管理' : '添加开放平台管理'"  width="24%" center :visible.sync="dialogVisible" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="110px" size="mini" :model="formData" :rules="rules">
        <el-row class="el-row-item">
          <el-form-item label="平台编码：" prop="openCode">
            <el-input v-model="formData.openCode" placeholder="请输入平台编码" :disabled="codeEnable" />
          </el-form-item>
          <el-form-item label="平台名称：" prop="openName">
            <el-input v-model="formData.openName" placeholder="请输入平台名称" />
          </el-form-item>
          <el-form-item label="平台类型：" prop="openType">
            <el-select v-model="formData.openType" placeholder="请选择平台类型" style="width: 100%">
              <el-option label="客户" :value="-1"></el-option>
              <el-option label="客户/供应商" :value="0"></el-option>
              <el-option label="供应商" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配置地址：" prop="openUrl">
            <el-input v-model="formData.openUrl" placeholder="请输入配置地址" />
          </el-form-item>
        </el-row>

        <el-row class="el-row-item">
          <el-row
            id="configNavId"
            v-for="(configNav, index) in formData.configNavs"
            :gutter="10"
            :key="configNav.configNavId"
          >
            <el-col :span="10">
              <el-form-item label-width="12px">
                <el-input v-model="configNav.configNavName" placeholder="请输入导航名称" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="12px">
                <el-input v-model="configNav.configNavUrl" placeholder="请输入导航地址" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="6px">
                <el-button
                  v-if="index === 0"
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="addConfigNav"
                ></el-button>
                <el-button
                  v-if="index !== 0"
                  type="danger"
                  icon="el-icon-remove-outline"
                  @click="deleteConfigNav(index)"
                ></el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
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
          getOne: 'openPlatform/getOne',
          saveOne: 'openPlatform/saveOne'
        },
        rules: {
          openCode: [
            {required: true, message: "请输入平台编码"},
            {
              min: 1,
              max: 20,
              message: "长度在 1 到 20 个字符"
            },
            {validator: codeValidator, trigger: 'blur'}
          ],
          openName: [
            {required: true, message: "请输入平台名称"},
            {
              min: 1,
              max: 20,
              message: "长度在 1 到 20 个字符"
            }
          ],
          openType: [
            {required: true, message: "请选择平台类型"},
          ],
          openUrl: [
            {required: true, message: "请输入配置地址"},
          ]
        }
      };
    },
    watch: {
      visible(val) {
        if (val) {
          if(this.keyId){
            this.codeEnable = true;
          }
        }
      }
    },
    methods: {
      defaultFormData() {
        return {
          openId: null,
          openCode: null,
          openName: null,
          openType: null,
          openUrl: null,
          configNavs: [
            {
              configNavId: null,
              configNavName: null,
              configNavUrl: null
            }
          ]
        };
      },
      addConfigNav(){
        this.formData.configNavs.push({
          configNavId: null,
          configNavName: null,
          configNavUrl: null
        });
      },
      deleteConfigNav(index){
        if(index){
          this.formData.configNavs.splice(parseInt(index), 1);
        }
      },
      beforeLoadData(data) {
        if(data && !data.configNavs){
          data.configNavs = [
            {
              configNavId: null,
              configNavName: null,
              configNavUrl: null
            }
          ]
        }
        return data;
      }
    }
  };
</script>

<style>
  .el-row-item{
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-bottom: 20px;
    padding: 20px 20px 0 0;
  }
</style>
