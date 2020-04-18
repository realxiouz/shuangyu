<template>
  <div>
    <el-form ref="formData" :model="formData" label-width="110px" size="mini">
      <el-form-item label="开放平台">
        <el-select v-model="formData.openId" placeholder="请选择" style="width:100%" @change="selectOpen">
          <el-option
            v-for="(item,idx) in openList"
            :key="idx"
            :label="item.openName"
            :value="item.openId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="API">
        <el-select v-model="formData.apiId" placeholder="请选择" style="width:100%" @change="selectApi" :disabled="!selectedOpen">
          <el-option
            v-for="(item, idx) in apiList"
            :key="idx"
            :label="item.method"
            :value="item.apiId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接口标签:" prop="label">
        <el-input v-model="formData.label" placeholder="请输入接口标签"></el-input>
      </el-form-item>
      <el-form-item label="接口名称:" prop="name">
        <el-input v-model="formData.name" placeholder="请输入接口名称"></el-input>
      </el-form-item>
      <el-form-item label="默认值:" prop="defaultValue">
        <el-input v-model="formData.defaultValue" placeholder="请输入默认值"></el-input>
      </el-form-item>
      <el-form-item label="参数分组">
        <el-input v-model="formData.defaultValue" placeholder="请输入默认值"></el-input>
      </el-form-item>
      <el-form-item label="是否必须:" >
        <el-select v-model="formData.required" placeholder="请选择" style="width:100%">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input type="textarea" :rows="3" v-model="formData.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right;">
      <el-button size="mini" @click="$emit('onCancel')">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "paramEdit",
    props: ["curNode", "update"],
    data() {
      return {
        formData: {},
        openList: [],
        apiList: [],
          selectedOpen: false,
        /*formRules: {
          thirdId: [
            {required: true, message: "请选择第三方平台", trigger: "blur"}
          ],
          apiId: [
            {required: true, message: "请选择政策", trigger: "blur"}
          ],
          label: [
            {required: true, message: "请参数标签", trigger: "blur"}
          ],
          name: [
            {required: true, message: "请选择参数名称", trigger: "blur"}
          ],
          defaultValue: [
            {required: true, message: "请输入默认值", trigger: "blur"}
          ]
        }*/
      };
    },
    methods: {
      defaultFormData() {
        return {
            //主键
            paramId: '',
            //开放平台
            openId: '',
            //API
            apiId: '',
            //开放平台名称
            openName: '',
            //API链接url
            url: '',
            //API方法名称
            method: '',
            //参数标签
            label: '',
            //参数名称
            name: '',
            //参数值
            defaultValue: '',
            //是否必须
            required: '',
            //参数分组
            group: ''
        }
      },
      clearForm() {
          this.selectedOpen = false;
          this.formData = this.defaultFormData();
      },
        selectOpen(openId){
          this.openList.forEach( item => {
              if (openId === item.openId){
                  //当前所选择的open平台
                  this.selectedOpen = true;
                  this.formData.domain = item.domain;
                  this.formData.openName = item.openName;
              }
          })
            this.$store
                .dispatch("openApiService/getList", {filter: {openId: openId}})
                .then(data => {
                    this.apiList = data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        selectApi(apiId){
          this.apiList.forEach(item => {
              if (apiId === item.apiId){
                  this.formData.url = item.url;
                  this.formData.method = item.method;
              }
          })
        },
        handleConfirm(){
            this.$emit('onSave',this.formData);
        },
        loadOpenList(){
            this.$store
                .dispatch("open/getList", {filters: {}})
                .then(data => {
                    this.openList = data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
      changeSwitch() {
        this.formData.enable = !this.formData.enable;
      },
    },
    created() {
        this.clearForm();
        this.loadOpenList();
      if (this.update) {
        Object.assign(this.formData, this.curNode);
      }
    }
  };
</script>
