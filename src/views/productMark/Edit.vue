<template>
  <div class="page-form">
    <el-dialog
        title="资金账号信息"
        center
        :visible.sync="dialogVisible"
        @open="onOpen" @close="onClose"
        width="28%"
      >
    <el-form :model="formData" label-width="110px" size="mini">
      <el-form-item label="产品标签">
        <el-input v-model="formData.markId" placeholder="请输入产品标签.." :disabled="update"></el-input>
      </el-form-item>
      <el-form-item label="供应商">
        <el-select v-model="formData.openId" placeholder="请选择供应商.." @change="handleSelect" style="width: 100%">
          <el-option
            v-for="item in providerList"
            :key="item.firmId"
            :label="item.firmName"
            :value="item.firmId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="域名">
        <el-input v-model="formData.domain" disabled placeholder="供应商域名.."></el-input>
      </el-form-item>
      <el-form-item label="政策标签">
        <el-select v-model="formData.policyFlags" placeholder="请选择政策标签.." clearable multiple style="width: 100%">
          <el-option
            v-for="item in policyFlagList"
            :key="item.flagId"
            :label="item.flagId"
            :value="item.flagId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button size="mini" @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" size="mini" @click="onSave">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
    import {MIXIN_EDIT} from "@/utils/mixin";
    export default {
      mixins: [MIXIN_EDIT],
        props: ["curNode", "update"],
        data() {
            return {
                formData: {},
                providerList: [],
                policyFlagList: [],
                actions: {
                  getOne: 'productMark/getOne',
                  saveOne: 'productMark/updateOne'
                }
            };
        },
        methods: {
            /*表单默认加载数据*/
            defaultFormData() {
                return {
                    //产品标签
                    markId: "",
                    //供应商
                    openId: "",
                    //供应商名称
                    openName: "",
                    //供应商域名
                    domain: "",
                    //政策标签
                    policyFlags: []
                };
            },
            loadProviders(){
                this.$store.dispatch("firm/getList", { filters: {pid: this.$store.getters.firm.firmId, type: 1} })
                    .then(data => {
                        this.providerList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            loadPolicyFlags(){
                this.$store.dispatch("policyFlag/getList", {filters: {}})
                    .then(data => {
                        this.policyFlagList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            /*清除表单*/
            clearForm() {
                this.formData = this.defaultFormData();
            },
            handleSelect(openId){
                this.providerList.forEach( item => {
                    if (openId === item.openId){
                        this.formData.openName = item.openName;
                        this.formData.domain = item.domain;
                    }
                })
            },
            /*对提交的数据进行类型格式*/
           
            initFormData() {
                this.clearForm();
                this.loadProviders();
                this.loadPolicyFlags();
                if (this.update) {
                    Object.assign(this.formData,this.curNode);
                }
            }
        },
        created() {
            this.initFormData();
        }
    };
</script>
