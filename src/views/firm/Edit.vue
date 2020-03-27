<template>
  <div>
    <el-form size="mini" label-width="120px" v-show="hasStep">
      <!--   企业ID  -->
      <input type="hidden" v-model="formData.firmId"/>
      <el-form-item label="企业名称">
        <el-input
          type="text"
          placeholder="请输入企业名称"
          v-model="formData.firmName">
        </el-input>
      </el-form-item>
      <el-form-item label="企业代码">
        <el-input
          type="text"
          placeholder="请输入企业代码"
          v-model="formData.firmCode">
        </el-input>
      </el-form-item>
      <el-form-item label="域名">
        <el-input
          type="text"
          placeholder="请输入域名"
          v-model="formData.domain">
        </el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input
          type="text"
          placeholder="请输入联系人"
          v-model="formData.contactPerson">
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          type="text"
          placeholder="请输入联系电话"
          v-model="formData.phone">
        </el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input
          type="text"
          placeholder="请输入联系电子邮箱"
          v-model="formData.email">
        </el-input>
      </el-form-item>
      <el-form-item label="机构所在地">
        <el-input
          type="text"
          placeholder="请输入机构所在地"
          v-model="formData.location">
        </el-input>
      </el-form-item>
      <el-form-item label="行政区代码">
        <el-input
          type="text"
          placeholder="请输入行政区代码"
          v-model="formData.districtCode">
        </el-input>
      </el-form-item>
      <el-form-item label="行政区">
        <el-input
          type="text"
          placeholder="请输入行政区"
          v-model.number="formData.distinct">
        </el-input>
      </el-form-item>
      <el-form-item label="钉钉appKey">
        <el-input
          type="text"
          placeholder="请输入钉钉appKey"
          v-model="formData.ddAppKey">
        </el-input>
      </el-form-item>
      <el-form-item label="钉钉appSecret">
        <el-input
          type="text"
          placeholder="请输入钉钉appSecret"
          v-model="formData.ddAppSecret">
        </el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="formData.type" placeholder="请输入类别" style="width: 100%">
          <el-option label="类别一" :value=0></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <el-transfer v-model="formData.roles" :data="transData" :props="transferProps" v-show="!hasStep" style="width: 100%"/>
    <div slot="footer" class="dialog-footer" style="margin-top:10px;text-align:right">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button v-show="hasStep" size="mini" type="primary" @click="nextStep">下一步</el-button>
      <el-button v-show="!hasStep" size="mini" type="primary" @click="prevStep">上一步</el-button>
      <el-button v-show="!hasStep" size="mini" type="primary" @click="$emit('onSave',formData)">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        /*当前进行操作的企业节点*/
        props: ['curNode'],
        data() {
            return {
                /*所有的可操作的角色信息*/
                transData: [],
                formData: {},
                hasStep: true,
                transferProps: {
                    key: 'roleId',
                    label: 'roleName'
                }
            };
        },
        methods: {
            defaultFormData() {
                return {
                    firmId: '',
                    firmName: '',
                    firmCode: '',
                    location: '',
                    districtCode: '',
                    distinct: null,
                    contactPerson: '',
                    phone: '',
                    email: '',
                    deleteFlag: true,
                    ddAppKey: '',
                    ddAppSecret: '',
                    domain: '',
                    type: 0,
                    remark: '',
                    roles: []
                };
            },
            /*加载所有的角色信息*/
            loadRoles() {
                this.clearRoles();
                this.$store
                    .dispatch('role/getMany')
                    .then(data => {
                        this.transData = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            nextStep() {
                this.hasStep = false;
            },
            prevStep() {
                this.hasStep = true;
            },
            /*清除穿梭框内的数据*/
            clearRoles() {
                this.transData = [];
            },
            clearForm() {
                this.formData = this.defaultFormData();
            },
            /*初始化表单*/
            initFormData() {
                this.hasStep = true;
                if (this.curNode.firmName) {
                    this.formData = this.curNode;
                } else {
                    this.clearForm();
                }
                this.loadRoles();
            }
        },
        watch: {
            curNode() {
                this.initFormData();
            }
        },
        created() {
            this.initFormData();
        }
    };
</script>
